import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../AdminNavbar";
import AdminDashboard from "../../../components/AdminDashboard";
import { ToastContainer } from "react-toastify";
import { NavLink, useParams } from "react-router-dom";
const AdminEditSlider = () => {
    const {id} = useParams();
    const [slider, setSlider] = useState("");
    const [record,setRecord] = useState({});

    const handleSubmit = () => {
        axios.put(`http://localhost:8000/slider/${id}`, {
            image: slider
        })
            .then((res) => {
                alert("Slider successfully Update");
                setSlider("");
            }).catch((err) => {
                console.log(err);
                return false;
            })

    }

    const getSingleRecord = () => {
        axios.get(`http://localhost:8000/slider/${id}`)
            .then((res) => {
                setSlider(res.data.image);
            }).catch((err) => {
                console.log(err);
                return false;
            })
    }

    useEffect(()=>{
        getSingleRecord();
    },[])


    return (
        <div className='container'>
            <div className='row mt-5'>
                <div className='col-lg-3'>
                    <AdminDashboard />
                </div>
                <div className='col-lg-9'>
                    <div style={{ boxShadow: '3px 3px 5px 6px #ccc' }} className="mt-3 p-5">
                        <h4 className="text-center">Edit Slider</h4>
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
                            <img className="mt-3" src={slider} height="100"/>
                        </div>
                        <button type="button" onClick={() => handleSubmit()} className="btn btn-success">Submit</button>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}
export default AdminEditSlider;