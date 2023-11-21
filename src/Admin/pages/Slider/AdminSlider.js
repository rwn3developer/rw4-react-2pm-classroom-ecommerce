import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../AdminNavbar";
import AdminDashboard from "../../../components/AdminDashboard";
import { ToastContainer } from "react-toastify";
import { NavLink } from "react-router-dom";
const Slider = () => {
    
    const [slider, setSlider] = useState([]);
   
    const getUser = () => {
        axios.get(`http://localhost:8000/slider`)
            .then((res) => {
                setSlider(res.data);
            }).catch((err) => {
                console.log(err);
                return false;
            })
    }
    const deleteData = (id) => {
        axios.delete(`http://localhost:8000/slider/${id}`)
            .then((res) => {
                alert("Category delete");
    
                getUser();
            }).catch((err) => {
                console.log(err);
                return false;
            })
    }
    useEffect(() => {
        getUser();
    }, [])
    return (
        <div className='container'>
            <div className='row mt-5'>
                <div className='col-lg-3'>
                    <AdminDashboard />
                </div>
                <div className='col-lg-9'>
                    <div style={{ boxShadow: '3px 3px 5px 6px #ccc' }} className="mt-3 p-5">
                        <h4 className="text-center">Slider</h4>
                        <div className="row justify-content-end">
                            <div className="col-lg-1">
                                <NavLink to={`/admin/addslider`}>
                                    <button className="d-flex btn btn-primary btn-sm">Add</button>
                                </NavLink>
                               
                            </div>
                            
                        </div>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    slider.map((val,i) => {i = i +1
                                        return (
                                            <tr>
                                                <td>{i}</td>
                                                <td>
                                                    <img src={val.image} height="100"/>
                                                </td>
                                                
                                                <td>
                                                    <button onClick={ () => deleteData(val.id) } className='btn btn-danger btn-sm'>Delete</button>

                                                    <NavLink to={`/admin/editslider/${val.id}`}>
                                                        <button className='ms-2 btn btn-success btn-sm'>Edit</button>
                                                    </NavLink>

                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}
export default Slider;