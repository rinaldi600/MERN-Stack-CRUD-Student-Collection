import "./Detail.css";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Profile from "../img/ryoji-iwata-n31JPLu8_Pw-unsplash.jpg"
import axios from "axios";


function Detail(props) {

    let [detailMhs, getDetailMhs] = useState({});
    let params = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/mhs/${params.idMhs}`)
            .then((success) => {
                getDetailMhs(success.data);
            })
            .catch((error) => {
                console.log(error)
            });
    },[]);

    console.log(detailMhs);

    if (detailMhs.hasOwnProperty('error')) {
        console.log(detailMhs.error)
    }

    return (
        detailMhs.hasOwnProperty('error') ?
        <h1>{detailMhs.error}</h1>
            :
        <div className={"font flex sm:w-full md:w-9/12 w-6/12 mx-auto mt-5 border-2 rounded-lg"}>
            <div className={"w-full relative"}>
                <img className={"h-full w-full"} src={Profile} alt=""/>
            </div>
            <div className={"w-full text-lg"}>
                <h1 className={"mt-10 ml-10"}>{detailMhs.nama}</h1>
                <p className={"ml-10"}>Gg. Pasteur No. 83, Kediri 90775, JaBar</p>
                <p className={"ml-10"}>{detailMhs.nim}</p>
                <p className={"ml-10"}>{detailMhs.handphone}</p>
            </div>
        </div>
    );
}

export default Detail;