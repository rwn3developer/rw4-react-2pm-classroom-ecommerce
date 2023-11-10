import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AdminViewProduct = () => {


    const [product, setProduct] = useState([]);
    const [marketstatus, setMarketStatus] = useState(["trending", "latest", "upcomming", "best"])
    const [selectMarketStatus, setSelectMarketStatus] = useState("");
    const [status, setStatus] = useState("");

    //serch product start
    const [searchproduct, setSearchProduct] = useState("")

     //serch product start


    //pagination start
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(4);

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
        <div className="ps-5 col-lg-12 pt-2">
            <div style={{ boxShadow: '3px 3px 5px 6px #ccc' }} className="mt-3 p-5">
                <h3 className="text-center">View Product</h3>
                <div className='row mt-3 mb-3'>
                    <div className='col-lg-4'>
                        <input type='text' value={searchproduct} onChange={handleSearch} className='form-control' placeholder='search product' />
                    </div>
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

            <button className="btn btn-primary mt-5">
                <NavLink to={`/admin/product`} className="text-white">Add Product</NavLink>
            </button>
            <ToastContainer />
        </div>
    )
}

export default AdminViewProduct