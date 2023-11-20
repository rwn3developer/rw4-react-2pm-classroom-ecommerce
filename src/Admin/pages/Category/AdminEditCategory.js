import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../AdminNavbar";
import AdminDashboard from "../../../components/AdminDashboard";
import { ToastContainer } from "react-toastify";
import { NavLink, useNavigate, useParams } from "react-router-dom";
const AdminEditCategory = () => {
    const {id} = useParams();
    const [category, setCategory] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
       
            axios.put(`http://localhost:8000/category/${id}`, {
                category_name: category
            })
                .then((res) => {
                    alert("Category successfully Update");
                    setCategory("");
                        navigate('/admin/category')
                }).catch((err) => {
                    console.log(err);
                    return false;
                })
        
    }
   
    
    useEffect(() => {
        axios.get(`http://localhost:8000/category/${id}`)
        .then((res) => {
            setCategory(res.data.category_name); 
        }).catch((err) => {
            console.log(err);
            return false;
        })
    }, [])
    return (
        <div className='container'>
            <div className='row mt-5'>
                <div className='col-lg-3'>
                    <AdminDashboard />
                </div>
                <div className='col-lg-9'>
                    <div style={{ boxShadow: '3px 3px 5px 6px #ccc' }} className="mt-3 p-5">
                        <h4 className="text-center">Add Category</h4>
                        <div className="row justify-content-end">
                            <div className="col-lg-1">
                                <NavLink to={`/admin/category`}>
                                    <button className="d-flex btn btn-primary btn-sm">View</button>
                                </NavLink>

                            </div>

                        </div>


                       
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1"  className="form-label" >Category</label>
                                <input type="text" name="category" onChange={ (e) => setCategory(e.target.value) } className="form-control" value={category} id="exampleInputEmail1" aria-describedby="emailHelp" />
                                
                            </div>
                           
            
                            <button type="button" onClick={ () => handleSubmit() } className="btn btn-success">Submit</button>
                       




                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}
export default AdminEditCategory;