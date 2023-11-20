import React from 'react'
import CommonDashboard from '../components/CommonDashboard'
import { useState ,useEffect } from 'react';
import { useAuth } from '../context/Auth';
import axios from 'axios';

const DashboardOrder = () => {

    const [auth,setAuth] = useAuth();
    const [cart,setCart] = useState([]);
    const [order,setOrder] = useState([]);
    const [finaltotal,setFinalTotal] = useState(0);

    const allCart = () => {
        axios.get(`http://localhost:8000/carts?userId=${auth.id}`) 
                .then((res) => {
                    console.log(res.data);
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
    
    useEffect(()=>{
        allCart();
        allOrder();
    },[])

    return (
        
        <div className='container'>
        <div className='row mt-5'>
            <div className='col-lg-3'>
                <CommonDashboard />
            </div>

            <div className='col-lg-9'>
                <div className='p-3'>
                    <h4>Welcome To Order</h4>

                    <div className='mt-4'>
                    <h5>Name :- {auth?.name}</h5>
                    <h5>Email :- {auth?.email}</h5> 
                    <h5>Contact :- {auth.contact}</h5>
                    </div>
                </div>

                <div className='row p-3'>
                    <div className='col-lg-9'>
                        <table className="table table   table-hover"> 
                           <thead className='table table-success'>
                                <tr>
                                    <th>No</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>

                            <tbody>
                                
                                {  
                                     
                                    order.map((val,i)=>{i=i+1 
                                        
                                        return (
                                            <tr>
                                                <td>{i}</td>
                                                <td>
                                                    <img src={val.image} width="100"/>
                                                </td>
                                                <td>{val.name}</td>
                                                <td>{val.price}</td>
                                                <td>{val.price * val.qty}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>

                        </table>
                        <div>
                            <h5>Total :- {finaltotal}</h5>
                        </div>
                    </div>
                    
                </div>
            </div>

        </div>
    </div>
       
    )
}

export default DashboardOrder