import React from 'react'
import { NavLink } from 'react-router-dom'
import Userauth from '../Users/Userauth'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Auth'


const Header = () => {

    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();



    const logout = () => {
        setAuth("")
        localStorage.removeItem('checkUserLogin')
        navigate('/');
    }
    return (
        <>
            <div className='container-fluid bg-primary'>
                <div className='container'>
                    <nav className="navbar navbar-expand-lg p-0">
                        <div className="container-fluid">
                            <NavLink to='/' className="navbar-brand text-white fs-2">Flipcart App</NavLink>

                            {/* <input className='form-control' style={{width :'20%'}} type='text' placeholder='search product'/> */}


                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div className="collapse navbar-collapse custom-nav">
                                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 fs-5">
                                    {!auth ? (<>
                                        <li className="nav-item">
                                            <NavLink to='/login' className="nav-link active  text-white" aria-current="page" >Login</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to='/register' className="nav-link active  text-white" aria-current="page" >Register</NavLink>
                                        </li>
                                    </>) : (
                                        <>
                                            {
                                                auth.role === "admin" ?
                                                    (
                                                        <div>
                                                            <div className="dropdown mt-2">
                                                                <button className="btn btn-warning btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                    {auth.name}
                                                                </button>
                                                                <ul className="dropdown-menu p-0">

                                                                    <li className="nav-item dropdown-item p-0">
                                                                        <NavLink to={`/dashboard`} className="p-2 nav-link active  text-white" aria-current="page" >
                                                                            <li><button className='btn btn-info btn-sm w-100'>Dashboard</button></li>
                                                                        </NavLink>
                                                                    </li>

                                                                   
                                                                    <li className="nav-item dropdown-item p-0">
                                                                        <NavLink className="p-2 nav-link active  text-white" aria-current="page" >
                                                                            <li><button className='btn btn-info btn-sm w-100'>Password Changed</button></li>
                                                                        </NavLink>
                                                                    </li>

                                                                    <li className="nav-item dropdown-item p-0">
                                                                        <NavLink onClick={() => logout()} className="p-2 nav-link active  text-white" aria-current="page" >
                                                                            <li><button className='btn btn-info btn-sm w-100'>Logout</button></li>
                                                                        </NavLink>
                                                                    </li>

                                                                    
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="dropdown mt-2">
                                                            <button className="btn btn-warning btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                {auth.name}
                                                            </button>
                                                            <ul className="dropdown-menu p-0">

                                                                <li className="nav-item dropdown-item p-0">
                                                                    <NavLink to={`/dashboard`} className="p-2 nav-link active  text-white" aria-current="page" >
                                                                        <li><button className='btn btn-info btn-sm w-100'>Dashboard</button></li>
                                                                    </NavLink>
                                                                </li>
                                                                
                                                                <li className="nav-item dropdown-item p-0">
                                                                    <NavLink className="p-2 nav-link active  text-white" aria-current="page" >
                                                                        <li><button className='btn btn-info btn-sm w-100'>Password Changed</button></li>
                                                                    </NavLink>
                                                                </li>

                                                                <li className="nav-item dropdown-item p-0">
                                                                    <NavLink onClick={() => logout()} className="p-2 nav-link active  text-white" aria-current="page" >
                                                                        <li><button className='btn btn-info btn-sm w-100'>Logout</button></li>
                                                                    </NavLink>
                                                                </li>

                                                            </ul>
                                                        </div>
                                                    )
                                            }


                                        </>
                                    )
                                    }

                                    
                                        <li className="nav-item">
                                            <NavLink to='/' className="nav-link active  text-white" aria-current="page" >Home</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to='/product' className="nav-link text-white">Product</NavLink>
                                        </li>



                                        <li className="nav-item">
                                            <NavLink to={`/cart`} className="nav-link text-white" >Cart</NavLink>
                                        </li>

                                        <li className="nav-item">
                                            <NavLink className="nav-link text-white" href="#">Contact</NavLink>
                                        </li>


                                </ul>

                            </div>
                        </div>
                    </nav>
                </div>
            </div>

        </>
    )
}

export default Header