import {useEffect, useState} from "react";
import axios from "axios";
import "./UpdateData.css";
import {Navigate, useParams} from "react-router-dom";
import validator from "validator/es";
import url from "../Url/url";
import Swal from 'sweetalert2'

function UpdateData() {
    const [detailMhs, setDetailMhs] = useState({
        nama : '',
        nim : '',
        handphone : '',
    });

    const [alertUpdate, setAlert] = useState(false);
    const [errorMessage, setMessage] = useState({});

    const patternRegex = {
      nama : /^[a-zA-Z ]+$/i,
        nim : /^[\w.]+$/i,
    };

    let {idMhs}  = useParams();

    useEffect(() => {
        axios.get(`${url}/${idMhs}`)
            .then((success) => {
                setDetailMhs(success.data);
            })
    },[]);


    const getValue = () => {
      if ((detailMhs.nama === '' || detailMhs.nim === '' || detailMhs.handphone === '')) {
          Swal.fire({
              icon: 'error',
              text: 'Periksa Inputan Lagi',
          });
          return false
      } else {
         if (!patternRegex.nama.test(detailMhs.nama) || !patternRegex.nim.test(detailMhs.nim)
         || !validator.isMobilePhone(detailMhs.handphone, 'id-ID')) {
             Swal.fire({
                 icon: 'error',
                 text: 'Periksa Inputan Lagi',
             });
             return false
         } else {
             const idMhs = detailMhs['_id'];
             const dataUpdate = {
                 nama : detailMhs.nama,
                 nim : detailMhs.nim,
                 handphone : detailMhs.handphone,
             };

             axios.put(`${url}/${idMhs}`, dataUpdate)
                 .then((success) => {
                    if (success.data.hasOwnProperty('error')) {
                        setMessage(success.data.error);
                    } else {
                        Swal.fire(
                            'Good job!',
                            success.data.success,
                            'success'
                        ).then(r => setAlert(true));
                    }
                 })
                 .catch((error) => {
                    console.log(error);
                 });
         }
      }
    };

    return (
        <form className={"font w-6/12 mx-auto mt-3 grid grid-flow-row p-2 sm:overflow-hidden sm:w-11/12"}>
            <h1 className={"text-xl text-center font-bold"}>Ubah Data</h1>
            <label htmlFor="nama">Nama : </label>
            <div className="flex relative border-b-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="mt-2 h-5 w-5 text-slate-400 absolute inset-y-0 left-0" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                <input onChange={(e) => {setDetailMhs({...detailMhs, nama : e.target.value})}} value={detailMhs.nama ?? ''} className={"ml-6 p-2 w-full"} type="text" id={"nama"} placeholder={"Masukkan Nama"} />
                {
                    !patternRegex.nama.test(detailMhs.nama) ?
                        <p className={'text-red-600'}>Nama tidak boleh mengandung selain huruf dan spasi atau inputan kosong</p>
                        :
                        ''
                }
            </div>

            <label className={"mt-2"} htmlFor="nim">NIM : </label>
            <div className="flex relative border-b-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="mt-2 h-5 w-5 text-slate-400 absolute inset-y-0 left-0" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
                </svg>
                <input  onChange={(e) => setDetailMhs({...detailMhs, nim : e.target.value})} value={detailMhs.nim ?? ''} className={"ml-6 p-2 w-full"} type="text" id={"nim"} placeholder={"Masukkan NIM"} />
                {
                    !patternRegex.nim.test(detailMhs.nim) ?
                        <p className={'text-red-600'}>NIM hanya boleh mengandung kombinasi huruf, angka dan titik atau inputan kosong</p>
                        :
                        ''
                }
                {
                    errorMessage.hasOwnProperty('code') && errorMessage.code === 11000 ?
                        <p className={'text-red-600'}>NIM {errorMessage.keyValue.nim} telah digunakan</p>
                        :
                        ''
                }
            </div>

            <label className={"mt-2"} htmlFor="handphone">No Hp : </label>
            <div className="flex relative border-b-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="mt-2 h-5 w-5 text-slate-400 absolute inset-y-0 left-0" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <input  onChange={(e) => setDetailMhs({...detailMhs, handphone : e.target.value})} value={detailMhs.handphone ?? ''} className={"ml-6 p-2 w-full"} type="text" id={"handphone"} placeholder={"Masukkan No. Handphone"} />
                {
                    !validator.isMobilePhone(detailMhs.handphone,'id-ID') ?
                        <p className={'text-red-600'}>Bukan Format Indonesia atau inputan kosong </p>
                        :
                        ''
                }
            </div>
            <div className="button-submit mt-5 grid justify-center">
                <div className="btn">
                    <button onClick={getValue} className={`bg-green-500 p-2 rounded-lg`} type={"button"}>Update Data</button>
                </div>
            </div>
            {
                alertUpdate === true ?
                    <Navigate to={'/'} replace={true}/>
                    :
                    ''
            }
        </form>
    )
}

export default UpdateData