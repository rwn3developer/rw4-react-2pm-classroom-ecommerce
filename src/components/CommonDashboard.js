import React from 'react'
import { NavLink } from 'react-router-dom'

const CommonDashboard = () => {
    return (
        <div className="list-group">
            <a className="list-group-item list-group-item-action" aria-current="true">
                <NavLink to={`/dashboard`} style={{ textDecoration: 'none' }} className="text-dark">Dashboard</NavLink>
            </a>
            <a className="list-group-item list-group-item-action" aria-current="true">
                <NavLink to={`/dashboard-cart`} style={{ textDecoration: 'none' }} className="text-dark">Cart</NavLink>
            </a>
            <a className="list-group-item list-group-item-action">
                <NavLink to={`/dashboard-order`} style={{ textDecoration: 'none' }} className="text-dark">Order</NavLink>
            </a>
            <a className="list-group-item list-group-item-action">
                <NavLink to={`/dashboard-profile`} style={{ textDecoration: 'none' }} className="text-dark">Profile</NavLink>
            </a>
        </div>
    )
}

export default CommonDashboard