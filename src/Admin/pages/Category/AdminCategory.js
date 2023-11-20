import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../AdminNavbar";
import AdminDashboard from "../../../components/AdminDashboard";
import { ToastContainer } from "react-toastify";
import { NavLink } from "react-router-dom";
const AdminCategory = () => {
    
    const [categoryData, setCategoryData] = useState([]);
   
    const getUser = () => {
        axios.get(`http://localhost:8000/category`)
            .then((res) => {
                setCategoryData(res.data);
            }).catch((err) => {
                console.log(err);
                return false;
            })
    }
    const deleteData = (id) => {
        axios.delete(`http://localhost:8000/category/${id}`)
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
                        <h4 className="text-center">Category</h4>
                        <div className="row justify-content-end">
                            <div className="col-lg-1">
                                <NavLink to={`/admin/addcategory`}>
                                    <button className="d-flex btn btn-primary btn-sm">Add</button>
                                </NavLink>
                               
                            </div>
                            
                        </div>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    categoryData.map((val) => {
                                        return (
                                            <tr>
                                                <td>{val.id}</td>
                                                <td>{val.category_name}</td>
                                                
                                                <td>
                                                    <button onClick={ () => deleteData(val.id) } className='btn btn-danger btn-sm'>Delete</button>

                                                    <NavLink to={`/admin/editcategory/${val.id}`}>
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
export default AdminCategory;