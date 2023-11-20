import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/Auth';

const Product = () => {

  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [status, setStatus] = useState("");

  //pagination start
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(6);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = product.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(product.length / recordsPerPage)
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);
  //pagination end

  //search product start
  const [searchproduct, setSearchProduct] = useState("")
  //search product end

  const allProduct = () => {
    axios.get(`http://localhost:8000/products?status=instock`)
      .then((res) => {
        setProduct(res.data)
      }).catch((err) => {
        console.log(err);
        return false;
      })
  }

  const allCategory = () => {
    axios.get(`http://localhost:8000/category`)
      .then((res) => {
        setCategory(res.data)
      }).catch((err) => {
        console.log(err);
        return false;
      })
  }

  const categoryFilter = (category) => {
    if (category === "all") {
      allProduct();
    } else {
      axios.get(`http://localhost:8000/products?category=${category}&status=instock`).then((res) => {
        setProduct(res.data);
      }).catch((err) => {
        console.log(err);
        return false;
      })
    }
  }


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

  //search product start
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchProduct(searchTerm)
    const filteredItems = product.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProduct(filteredItems);
  }
  //search product start

  useEffect(() => {
    fetch(`http://localhost:8000/products?marketstatus=${status}&status=instock`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch((err) => {
        console.log(err);
        return false
      }) 
  }, [status])

  useEffect(() => {
    setProduct(currentRecords);
    allProduct();
    allCategory();
  }, []) 

  return (
    <>
      <div className="container p-5">
        <h2 className="pb-5 text-center">All Product</h2>



        <div className="row p-5" style={{boxShadow : '1px 1px 5px 2px gray'}}>

          <div className='col-lg-3'>
            <h5>Category Filter</h5>
            <hr />
            <div className="card" style={{ width: '16rem' }}>

              <ul className="list-group list-group-flush">
                {
                  category.map((val) => {
                    return (
                      <>
                        <li className="list-group-item">
                          <button onClick={() => categoryFilter(val.category_name)} style={{ width: '100%' }} type="button" class="btn btn-outline-primary">{val.category_name}</button>
                        </li>

                      </>
                    )
                  })
                }
                <li className="list-group-item">
                  <button onClick={() => categoryFilter("all")} style={{ width: '100%' }} type="button" class="btn btn-outline-primary">All</button>
                </li>
              </ul>

            </div>

          </div>

          <div className='col-lg-9 row'>





            <div className='d-flex justify-content-between mb-3'>

              <div className='d-flex  justify-content-start'>
                <input type='text' value={searchproduct} onChange={handleSearch} className='form-control' placeholder='search product' />
              </div>

              <select className='w-25 form-control'>
                <option>--- Price wise filter----</option>
                <option value="best">low to high</option>
                <option value="upcomming">high to low</option>
              </select>

              <select onChange={(e) => setStatus(e.target.value)} className='w-25 form-control'>
                <option>--- select status----</option>
                <option value="best">Best</option>
                <option value="upcomming">Upcomming</option>
                <option value="trending">Trending</option>
                <option value="latest">latest</option>
              </select>
            </div>

            {
              currentRecords.map((val) => {
                return (
                  <div className="col-lg-4 pb-3">
                    <div className="card" style={{padding: '15px' }}>
                      <img style={{ height: '200px', objectFit: 'contain' }} src={val.image} className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">Name :- {val.name}</h5>
                        <hr />
                        <h5 className="card-title">Price :- {val.price}</h5>
                      </div>
                      <div className='btn btn-primary'>
                        <Link to={`/product_details/${val.id}`} className='text-white' style={{ textDecoration: 'none' }}>
                          <h6 className='p-0 m-0'>VIEW MORE</h6>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>

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
      </div>
    </>
  )
}

export default Product