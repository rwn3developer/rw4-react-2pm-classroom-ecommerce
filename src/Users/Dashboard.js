import React, { useEffect, useState } from 'react'

import CommonDashboard from '../components/CommonDashboard'
import { useAuth } from '../context/Auth'
import axios from 'axios'
import AdminDashboard from '../components/AdminDashboard'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useState([]);
    const [order, setOrder] = useState([]);
    const navigate = useNavigate();


    const allCart = () => {
        axios.get(`http://localhost:8000/carts?userId=${auth.id}`)
            .then((res) => {
                setCart(res.data)
            }).catch((err) => {
                console.log(err);
                return false;
            })
    }
    const allOrder = () => {
        axios.get(`http://localhost:8000/orders?userId=${auth.id}`)
            .then((res) => {
                setOrder(res.data)
            }).catch((err) => {
                console.log(err);
                return false;
            })
    }

    useEffect(() => {
        if(!auth){
           navigate('/');
        }
        allCart();
        allOrder();
    }, [])

    return (
        <div>
            <div className='container'>
                <div className='row mt-5'>
                    <div className='col-lg-3'>
                        {
                            auth.role === "admin" ? (
                                <AdminDashboard />
                            ) : (
                                <CommonDashboard />
                            )
                        }

                    </div>

                    {
                        auth.role === "admin" ? (
                            <div className='col-lg-9'>
                                <div className='p-3'>
                                    <h5>Name :- {auth.name}</h5>
                                    <h5>Email :- {auth.email}</h5>
                                    <h5>Contact :- {auth.contact}</h5>
                                </div>
                            </div>
                        ) : (
                            <div className='col-lg-9'>
                                <div className='p-3'>
                                    <h5>Name :- {auth.name}</h5>
                                    <h5>Email :- {auth.email}</h5>
                                    <h5>Contact :- {auth.contact}</h5>

                                </div>

                                <div className='row p-3'>
                                    <div className='col-lg-6'>

                                        <div className='text-center text-white p-5 w-75' style={{ backgroundColor: "orange" }}>
                                            <h5>Total Cart :- {cart?.length}</h5>
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div className='text-center text-white p-5 w-75' style={{ backgroundColor: "orange" }}>
                                            <h5>Total Order :- {order?.length}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default Dashboard