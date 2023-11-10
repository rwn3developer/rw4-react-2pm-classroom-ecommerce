import React from 'react'
import './adminheader.css'
import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
    return (

        <>
        <div className='container-fluid bg-dark text-white'>
            <div className='row p-3'>
                <h5 className='text-center  m-0'>Welcome to Admin</h5>
            </div>
        </div>

       
            <div  className='row'>
                <div  style={{minHeight : '90vh',backgroundColor:'#36454F'}} className='admin-nav col-lg-2'>
                    <ul>
                        <li>
                                <NavLink to={`/admin/dashboard`}>
                                    <div style={{border:'1px solid white'}} className='w-100 p-1'>Dashboard</div>
                                </NavLink>
                        </li>
                        <li>
                                <NavLink to={`/admin/user`}>
                                    <div style={{border:'1px solid white'}} className='w-100 p-1'>Users</div>
                                </NavLink>
                        </li>
                        <li>
                                <NavLink>
                                    <div style={{border:'1px solid white'}} className='w-100 p-1'>Slider</div>
                                </NavLink>
                        </li>
                        <li>
                                <NavLink to={`/admin/category`}>
                                    <div style={{border:'1px solid white'}} className='w-100 p-1'>Category</div>
                                </NavLink>
                        </li>
                        <li>
                                <NavLink to={`/admin/product`}>
                                    <div style={{border:'1px solid white'}} className='w-100 p-1'>Product</div>
                                </NavLink>
                        </li>

                       
                       
                    </ul>
                </div>

                <div className='col-lg-8'>
                       <Outlet/>
                </div>
            </div>
        
           
    </>

    )
}

export default AdminLayout