import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {Routes, Route, Link, Navigate} from "react-router-dom";
import * as ReactDOM from "react-dom";
import Swal from 'sweetalert2'
import url from "../Url/url";
import ReactPaginate from "react-paginate";
import "./Home.css"

function Home() {
    const [dataMhs, getData] = useState([]);

    const [dataPagination, setDataPagination] = useState({
        perPage : 5,
        page : 0,
        pages : 0,
    });

    const [statePage, setStatePage] = useState(false);
    const [keyword, setKeyword] = useState("");
    const idMhs = useRef(null);

    useEffect(async () => {
        if (keyword === "") {
            await fetchDataMhs();
        }

        await axios.get(`${url}/search/${keyword}`)
            .then((success) => {
                if (success.data.hasOwnProperty('error')) {
                    return false
                }

                getData(success.data);

                if (success.status === 200) {
                    setDataPagination({...dataPagination, pages : Math.ceil(success.data.length / dataPagination.perPage)})
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [keyword]);

    const fetchDataMhs = async () => {
        await axios.get('http://127.0.0.1:5000/mhs')
            .then((success) => {
                getData(success.data);

                if (success.status === 200) {
                    setDataPagination({...dataPagination, pages : Math.ceil(success.data.length / dataPagination.perPage)})
                }
                
            }).catch((error) => {
                console.log(error);
            });
    };

    const getValue = (e) => {
        const idMhsCurrent = ReactDOM.findDOMNode(e).parentNode.children[1].value;

        Swal.fire({
            title: 'Apakah Anda Ingin Menghapus Data Ini ?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Confirm',
            denyButtonText: `Cancel`,
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${url}/delete/${idMhsCurrent}`)
                    .then(async (success) => {
                        await Swal.fire('Success', '', 'success');
                        await fetchDataMhs();
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            } else if (result.isDenied) {
                Swal.fire('Data Batal Dihapus', '', 'info')
            }
        })

    };

    const handlePageClick = (event) => {
        console.log(event.selected);
        setDataPagination({...dataPagination, page: event.selected});
        setStatePage(true);
    };

    return (
        <div className={"mt-12 w-full sm:overflow-x-auto"}>
            <div className="w-80 search flex justify-center mx-auto items-center mb-9 p-1 gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <div className="input w-full">
                    <input onChange={(e) => setKeyword(e.target.value)} placeholder={"Masukkan Keyword"} className={"w-72 h-10 text-black"} type="text"/>
                </div>
            </div>
            <table className="font m-auto table-auto border-collapse border border-black w-8/12" cellPadding={10}>
                <thead>
                <tr>
                    <th className={"border-r border-black"}>Nama</th>
                    <th className={"border-r border-black"}>NIM</th>
                    <th className={"border-r border-black"}>Handphone</th>
                    <th className={"border-r border-black"}>Detail</th>
                    <th className={"border-r border-black"}>Aksi</th>
                </tr>
                </thead>
                <tbody>
                {
                    dataMhs.length === 0 ?
                        <td colSpan={6} className={"border-r border-black border-t text-center"}>Data Tidak Ditemukan</td>
                            :
                            ''
                }
                {
                    dataMhs.slice(dataPagination.page * dataPagination.perPage, (dataPagination.page + 1) * dataPagination.perPage)
                        .map((mhs, index) => (
                                <tr className={"text-center border border-black"}>
                                    <td className={"border-r border-black"}>{mhs.nama}</td>
                                    <td className={"border-r border-black"}>{mhs.nim}</td>
                                    <td className={"border-r border-black"}>{mhs.handphone}</td>
                                    <td className={"border-r border-black"}>
                                        <Link className={"hover:text-violet-800"} to={`/detail/${mhs._id}`}>Detail</Link>
                                    </td>
                                    <td className={"border-r border-black"}>
                                        <Link className={"hover:text-violet-800 mr-2"} to={`/update/${mhs._id}`}>Update</Link>
                                        <input ref={idMhs} value={mhs._id} type="hidden"/>
                                        <button onClick={(e) => getValue(e.target)} className={"hover:text-violet-800"}>Hapus</button>
                                    </td>
                                </tr>
                        ))
                }
                </tbody>
            </table>
            <ReactPaginate
                previousLabel={'prev'}
                nextLabel={'next'}
                pageCount={dataPagination.pages}
                onPageChange={(e) => handlePageClick(e)}
                containerClassName={'pagination'}
                activeLinkClassName = {'page-active'}
                activeClassName={'active'}
            />
        </div>
    )
}

export default Home;