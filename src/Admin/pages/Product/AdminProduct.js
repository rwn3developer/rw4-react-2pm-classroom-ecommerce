import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../AdminNavbar";
import AdminDashboard from "../../../components/AdminDashboard";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminProduct = () => {

    const [product, setProduct] = useState([]);
    const [marketstatus, setMarketStatus] = useState(["trending", "latest", "upcomming", "best"])
    const [selectMarketStatus, setSelectMarketStatus] = useState("");
    const [status, setStatus] = useState("");

    //serch product start
    const [searchproduct, setSearchProduct] = useState("")

    //serch product start


    //pagination start
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(6);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = product.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(product.length / recordsPerPage)
    const pageNumbers = [...Array(nPages + 1).keys()].slice(1);
    //pagination end




    const changeMarketStatus = (upid, value) => {
        axios.patch(`http://localhost:8000/products/${upid}`, {
            marketstatus: value
        }).then((res) => {
            toast.success("Status successfully update");
        }).catch((err) => {
            return false;
        })
    }

    const inStock = (upid, value) => {
        axios.patch(`http://localhost:8000/products/${upid}`, {
            status: value
        }).then((res) => {
            toast.success("Status successfully update");
            getAllProduct();
        }).catch((err) => {
            return false;
        })
    }

    const outStock = (upid, value) => {
        axios.patch(`http://localhost:8000/products/${upid}`, {
            status: value
        }).then((res) => {
            toast.success("Status successfully update");
            getAllProduct();
        }).catch((err) => {
            return false;
        })
    }

    const getAllProduct = () => {
        axios.get(`http://localhost:8000/products`)
            .then((res) => {
                setProduct(res.data);
            }).catch((err) => {
                console.log(err);
                return false;
            })
    }

    const deleteRecord = (id) => {
        axios.delete(`http://localhost:8000/products/${id}`)
            .then((res) => {
                alert("Product successfully delete")
                getAllProduct();
            }).catch((err) => {
                console.log(err);
                return false;
        })
    }

    //product search start
    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setSearchProduct(searchTerm)
        const filteredItems = product.filter((user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setProduct(filteredItems);
    }

    //product search end 

    //pagination next previous page
    const goToNextPage = () => {
        if (currentPage !== nPages)
            setCurrentPage(currentPage + 1)
    }

    const goToPrevPage = () => {
        if (currentPage !== 1)
            setCurrentPage(currentPage - 1)
    }
    //pagination next previous page

    useEffect(() => {
        setProduct(currentRecords)
        getAllProduct();
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
                                <NavLink to={`/admin/addproduct`}>
                                    <button className="d-flex btn btn-primary btn-sm">Add</button>
                                </NavLink>
                            </div>
                           
                        </div>
                        <div className="mt-3 mb-3 w-50">
                                <input type="search" onChange={handleSearch} value={searchproduct} className="form-control" name="search" placeholder="Product search here"/>
                            </div>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Market Status</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentRecords.map((val) => {
                                        return (
                                            <tr>
                                                <td>{val.id}</td>
                                                <td>{val.name}</td>
                                                <td>{val.price}</td>
                                                <td>
                                                    <select onChange={(e) => changeMarketStatus(val.id, e.target.value)} className='form-control'>
                                                        <option value="">select market status</option>
                                                        {
                                                            marketstatus.map((item) => {

                                                                return (val.marketstatus === item ? <option value={val.marketstatus} selected>{val.marketstatus}</option> : <option>{item}</option>)

                                                            })
                                                        }
                                                    </select>
                                                </td>
                                                <td>
                                                    {
                                                        val.status === "instock" ? (<button onClick={() => inStock(val.id, "outstock")} className='btn btn-success btn-sm'>Instock</button>) : (<button onClick={() => outStock(val.id, "instock")} className='btn btn-danger btn-sm'>Outstock</button>)
                                                    }

                                                </td>
                                                <td>
                                                    <button onClick={ (e) => deleteRecord(val.id) } className="btn btn-danger btn-sm">Delete</button>
                                                    <button className="ms-2 btn btn-primary btn-sm">Edit</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>

                        {/* pagination start */}
                        <nav className='mt-5'>
                            <ul className='pagination justify-content-center'>
                                <li className="page-item">
                                    <a className="page-link"
                                        onClick={goToPrevPage}
                                    >
                                        Previous
                                    </a>
                                </li>
                                {pageNumbers.map(pgNumber => (
                                    <li key={pgNumber}
                                        className={`page-item ${currentPage == pgNumber ? 'active' : ''} `} >
                                        <a onClick={() => setCurrentPage(pgNumber)}
                                            className='page-link'
                                        >
                                            {pgNumber}
                                        </a>
                                    </li>
                                ))}
                                <li className="page-item">
                                    <a className="page-link"
                                        onClick={goToNextPage}
                                    >
                                        Next
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        {/* pagination end */}
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}
export default AdminProduct;