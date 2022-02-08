import "./Navbar.css";
import {Routes, Route, Link} from "react-router-dom";
import Home from "../Home/Home";
import TambahData from "../TambahData/TambahData";
import NotFound from "../NotFound/NotFound";
import {Fragment} from "react";
import Detail from "../Detail/Detail";
import UpdateData from "../Update/UpdateData";

function Navbar(props) {


    return (
        <Fragment>
            <div className={"h-14 bg-orange-500 text-white grid grid-flow-col justify-center items-center gap-4"}>
                <div>
                    <Link to="/">Home</Link>
                </div>
                <div>
                    <Link to="/tambahdata">Tambah Data</Link>
                </div>
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tambahdata" element={<TambahData />} />
                <Route path="/detail/:idMhs" element={<Detail />} />
                <Route path="/update/:idMhs" element={<UpdateData />} />
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </Fragment>

    );
}

export default Navbar;