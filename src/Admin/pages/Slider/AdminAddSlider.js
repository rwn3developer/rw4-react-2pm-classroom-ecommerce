import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../AdminNavbar";
import AdminDashboard from "../../../components/AdminDashboard";
import { ToastContainer } from "react-toastify";
import { NavLink } from "react-router-dom";
const AdminAddSlider = () => {
    const [slider, setSlider] = useState("");

    const handleSubmit = () => {
        axios.post(`http://localhost:8000/slider`, {
            image: slider
        })
            .then((res) => {
                alert("Slider successfully add");
                setSlider("");
            }).catch((err) => {
                console.log(err);
                return false;
            })

    }


    return (
        <div className='container'>
            <div className='row mt-5'>
                <div className='col-lg-3'>
                    <AdminDashboard />
                </div>
                <div className='col-lg-9'>
                    <div style={{ boxShadow: '3px 3px 5px 6px #ccc' }} className="mt-3 p-5">
                        <h4 className="text-center">Add Slider</h4>
                        <div className="row justify-content-end">
                            <div className="col-lg-1">
                                <NavLink to={`/admin/slider`}>
                                    <button className="d-flex btn btn-primary btn-sm">View</button>
                                </NavLink>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label" >Slider</label>
                            <input type="text" name="slider" onChange={(e) => setSlider(e.target.value)} className="form-control" value={slider} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <button type="button" onClick={() => handleSubmit()} className="btn btn-success">Submit</button>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}
export default AdminAddSlider;