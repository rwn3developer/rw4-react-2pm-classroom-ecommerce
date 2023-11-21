import { useEffect, useState } from "react";
import axios from "axios";

import AdminDashboard from "../../../components/AdminDashboard";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminAddProduct = () => {

    const [category, setCategory] = useState([]);

    const [categoryname, setCategoryName] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [qty, setQty] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [marketstatus, setMarketStatus] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = () => {
        axios.post(`http://localhost:8000/products`, {
            name: name,
            price: price,
            qty: qty,
            desc: description,
            image: image,
            category: categoryname,
            marketstatus: marketstatus,
            status: status
        })
            .then((res) => {
                alert("Product successfully Add");
                setCategoryName("");
                setName("");
                setPrice("");
                setQty("");
                setDescription("");
                setImage("");
                setMarketStatus("");
                setStatus("");
            }).catch((err) => {
                console.log(err);
                return false;
            })


    }






    useEffect(() => {
        axios.get(`http://localhost:8000/category`)
            .then((res) => {
                setCategory(res.data);
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
                        <h4 className="text-center">Products</h4>
                        <div className="row justify-content-end">
                            <div className="col-lg-1">
                                <NavLink to={`/admin/product`}>
                                    <button className="d-flex btn btn-primary btn-sm">View</button>
                                </NavLink>
                            </div>
                        </div>

                        <form>
                            <div className="row">
                                <div className="col-lg-5">
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Category</label>
                                        <select name="category" onChange={(e) => setCategoryName(e.target.value)} className="form-control">
                                            <option value="">---Select Category---</option>
                                            {
                                                category.map((item) => {
                                                    return (
                                                        <option value={item.category_name}>{item.category_name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Product Name</label>
                                        <input type="text" name="name" onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Product Price</label>
                                        <input type="number" name="price" onChange={(e) => setPrice(e.target.value)} className="form-control" id="exampleInputPassword1" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Product Qty</label>
                                        <input type="number" name="qty" onChange={(e) => setQty(e.target.value)} className="form-control" id="exampleInputPassword1" />
                                    </div>
                                </div>
                                <div className="col-lg-5">
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Product Image Url</label>
                                        <input type="text" name="image" onChange={(e) => setImage(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Product Description</label>
                                        <input type="text" name="description" onChange={(e) => setDescription(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Product Market Status</label>
                                        <select name="marketstatus" onChange={(e) => setMarketStatus(e.target.value)} className="form-control">
                                            <option value="">---Select Market Status---</option>
                                            <option value="trending">Trending</option>
                                            <option value="latest">Latest</option>
                                            <option value="upcomming">Upcomming</option>
                                            <option value="best">Best</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Status</label>
                                        <select onChange={(e) => setStatus(e.target.value)} className="form-control">
                                            <option value="">---Select Status---</option>
                                            <option value="instock">Instock</option>
                                            <option value="outstock">Outstock</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <button type="button" onClick={() => handleSubmit()} className="btn btn-primary">Submit</button>
                        </form>

                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}

export default AdminAddProduct