import React from 'react'
import { NavLink } from 'react-router-dom'
import { User } from '../Admin/pages/User'

const AdminDashboard = () => {
    return (
        <div className="list-group">
            <a className="list-group-item list-group-item-action" aria-current="true">
                <NavLink to={`/dashboard`} style={{ textDecoration: 'none' }} className="text-dark">Dashboard</NavLink>
            </a>
            <a className="list-group-item list-group-item-action" aria-current="true">
                <NavLink to={`/admin/user`} style={{ textDecoration: 'none' }} className="text-dark">Users</NavLink>
            </a>
            <a className="list-group-item list-group-item-action">
                <NavLink to={`/admin/category`} style={{ textDecoration: 'none' }} className="text-dark">Category</NavLink>
            </a>
            <a className="list-group-item list-group-item-action">
                <NavLink to={`/admin/slider`} style={{ textDecoration: 'none' }} className="text-dark">Slider</NavLink>
            </a>
            <a className="list-group-item list-group-item-action">
                <NavLink to={`/admin/product`} style={{ textDecoration: 'none' }} className="text-dark">Product</NavLink>
            </a>
            <a className="list-group-item list-group-item-action">
                <NavLink to={`/dashboard-profile`} style={{ textDecoration: 'none' }} className="text-dark">Profile</NavLink>
            </a>
        </div>
    )
}

export default AdminDashboard