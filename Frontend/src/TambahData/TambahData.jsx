import React, {Component} from "react";
import "./TambahData.css"
import validator from "validator/es";
import axios from "axios";
import url from "../Url/url";
// import swal from "sweetalert";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";


class TambahData extends Component{

    constructor(props) {
        super(props);
        this.state = {
            error : {
                nama : '',
                noHp : '',
                nim : '',
            },
            value : {
                nama : '',
                noHp : '',
                nim : '',
            },
            success : '',
        };
        this.addData = this.addData.bind(this);
    }

    componentDidMount() {

    }


    addData() {
        if (this.state.error.nama !== '' || this.state.error.noHp !== '' || this.state.error.nim !== '') {
            Swal.fire({
                icon: 'error',
                text: 'Periksa Inputan Lagi',
            });
            return false
        } else {
            if (this.state.value.nama === '' || this.state.value.noHp === '' || this.state.value.nim === '') {
                Swal.fire({
                    icon: 'error',
                    text: 'Periksa Inputan Lagi',
                });
                return false
            }

            axios.post(`${url}/post`, {
                nama : this.state.value.nama,
                nim : this.state.value.nim,
                handphone : this.state.value.noHp
            })
                .then(success => {
                    if (success.hasOwnProperty('data') && success.data.error === 'NIM already exist') {
                        this.setState(prevState => ({
                            error : {
                                ...prevState.error,
                                nim : 'NIM already exist'
                            }
                        }));
                    } else {
                        Swal.fire({
                            icon: 'success',
                            text: 'Data behasil Ditambahkan',
                        });
                        this.setState(prevState => ({
                            error : {
                                ...prevState.error,
                                nim : ''
                            },
                            value : {
                                ...prevState.value,
                                nama : '',
                                noHp : '',
                                nim : '',
                            },
                            success : 'OK',
                        }));
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    handleChange (valueInput, whatsInput) {
        if (!validator.isMobilePhone(valueInput,'id-ID') && whatsInput === 'noHp') {
            this.setState(prevState => ({
                error : {
                    ...prevState.error,
                    noHp : 'Bukan Format Indonesia atau inputan kosong'
                }
            }))
        } else if (!valueInput.match(/^[\w.]+$/gmi) && whatsInput === 'nim') {
            this.setState(prevState => ({
                error : {
                    ...prevState.error,
                    nim : 'NIM hanya boleh mengandung kombinasi huruf, angka dan titik atau inputan kosong'
                }
            }));
        } else if (!valueInput.match(/^[a-zA-Z ]+$/gm) && whatsInput === 'nama') {
            this.setState(prevState => ({
                error : {
                    ...prevState.error,
                    nama : 'Nama tidak boleh mengandung selain huruf dan spasi atau inputan kosong'
                }
            }));
        } else {

            this.setState(prevState => ({
                error : {
                    ...prevState.error,
                    nama : '',
                    noHp : '',
                    nim : '',
                }
            }));

            if (whatsInput === 'nama') {
                this.setState(prevState => ({
                    value : {
                        ...prevState.value,
                        nama : valueInput,
                    }
                }));
            } else if (whatsInput === 'noHp') {
                this.setState(prevState => ({
                    value : {
                        ...prevState.value,
                        noHp : valueInput,
                    }
                }));
            } else {
                this.setState(prevState => ({
                    value : {
                        ...prevState.value,
                        nim : valueInput,
                    }
                }));
            }
        }
    }

    render() {
        let successs = this.state.success;
        return (
            <form className={"font w-6/12 mx-auto mt-3 grid grid-flow-row p-2 sm:overflow-hidden sm:w-11/12"}>
                <h1 className={"text-xl text-center font-bold"}>Tambah Data</h1>
                <label htmlFor="nama">Nama : </label>
                <div className="flex relative border-b-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mt-2 h-5 w-5 text-slate-400 absolute inset-y-0 left-0" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    <input onChange={event => this.handleChange(event.target.value, 'nama')} className={"ml-6 p-2 w-full"} type="text" id={"nama"} placeholder={"Masukkan Nama"} />
                    {
                        this.state.error.nama.length > 0 ?
                            <p className={'text-red-600'}>{this.state.error.nama}</p>
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
                    <input onChange={event => this.handleChange(event.target.value, 'nim')} className={"ml-6 p-2 w-full"} type="text" id={"nim"} placeholder={"Masukkan NIM"} />
                    {
                        this.state.error.nim.length > 0 ?
                            <p className={'text-red-600'}>{this.state.error.nim}</p>
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
                    <input onChange={event => this.handleChange(event.target.value, 'noHp')} className={"ml-6 p-2 w-full"} type="text" id={"handphone"} placeholder={"Masukkan No. Handphone"} />
                    {
                        this.state.error.noHp.length > 0 ?
                            <p className={'text-red-600'}>{this.state.error.noHp}</p>
                            :
                            ''
                    }
                </div>
                <div className="button-submit mt-5 grid justify-center">
                    <div className="btn">
                        <button onClick={this.addData} className={`bg-green-500 p-2 rounded-lg`} type={"button"}>Tambah Data</button>
                    </div>
                </div>
                {
                    successs === "OK" ?
                        <Navigate to={"/"} replace={true}/> :
                        ''
                }
            </form>
        )
    }
}

export default TambahData;