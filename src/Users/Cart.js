import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import Userauth from './Userauth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Auth';


const Cart = () => {



    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [orderId, setOrderID] = useState([]);
    const [mulipleOrder, setMultipleOrder] = useState([]);




    const getAllCart = () => {
        if (!Userauth()) {
            alert("Please Login")
            navigate('/product');
        } else {
            axios.get(`http://localhost:8000/carts?userId=${Userauth().id}`)
                .then((res) => {
                    setCart(res.data)
                }).catch((err) => {
                    console.log(err);
                    return false;
                })
        }

    }

    const editCart = (id, qty) => {
        let edit = cart.map((val) => {
            if (val.id == id) {
                return {
                    ...val,
                    qty: qty
                }
            }
            return val
        })
        setCart(edit)

        let editCart = edit.find((val) => {
            return val.id == id
        })

        axios.patch(`http://localhost:8000/carts/${editCart.id}`, {
            qty: parseInt(editCart.qty)
        })
            .then((res) => {
                alert("Cart successfully Edit")
            }).catch((err) => {
                console.log(err);
                return false;
            })
    }

    const removeCart = (id) => {
        axios.delete(`http://localhost:8000/carts/${id}`)
            .then((res) => {
                alert("Cart successfully delete");
                getAllCart();
            }).then((err) => {
                console.log(err);
                return false;
            })
    }

    const handleCheckboxChange = (checked, id) => {
        // console.log(id);
        // console.log(checked);

        //multiple order add in ordertbl
        if (checked) {
            let a = [...orderId, id];
            a.map((item) => {
                axios.get(`http://localhost:8000/carts/${item}`)
                    .then((res) => {
                        setMultipleOrder([...mulipleOrder, res.data])
                    }).catch((err) => {
                        return false;
                        console.log(err);
                    })
            })
        }


    }

    const userOrder = () => {
        if(mulipleOrder.length === 0){
            cart.map((item) => {
                axios.post(`http://localhost:8000/orders`, {
                    name: item.name,
                    price: item.price,
                    qty: item.qty,
                    image: item.image,
                    category: item.category,
                    productId: item.productId,
                    userId: item.userId,
                }).then((res) => {
                   
                }).catch((err) => {
                    console.log(err);
                    return false;
                })
            })
        }else{
            mulipleOrder.map((item) => {
                axios.post(`http://localhost:8000/orders`, {
                    name: item.name,
                    price: item.price,
                    qty: item.qty,
                    image: item.image,
                    category: item.category,
                    productId: item.productId,
                    userId: item.userId,
                }).then((res) => {
                    
                }).catch((err) => {
                    console.log(err);
                    return false;
                })

                axios.delete(`http://localhost:8000/carts/${item.id}`)
                .then((res)=>{
                    getAllCart();
                }).catch((err)=>{
                    console.log(err);
                    return false;
                })
            })
        }
        alert("Successfully Order")
        
    }



    useEffect(() => {
        getAllCart();
    }, [])

    return (

        <>
            <div className='container'>
                <h2 className='text-center p-4'>Cart</h2>

                <div style={{boxShadow : '1px 1px 10px gray' }} className='col-lg-4 p-4 mb-5'>
                               <h4>User Name :- {Userauth()?.name}</h4>
                               <h4>User Email :- {Userauth()?.email}</h4>
                               

                               
                </div>

                <div className='row justify-content-between'>

                    {
                        cart.length === 0 ? (

                            <div>
                                <h3 className='text-center'>No Cart Record</h3>
                            </div>

                        ) : (
                            cart.map((val) => {

                                return (
                                    <div className="card p-4 mb-5" style={{ maxWidth: '70%' }}>
                                        <input onChange={(e) => handleCheckboxChange(e.target.checked, val.id)} type='checkbox' />
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img src={val.image} className="img-fluid rounded-start" alt="..." />
                                            </div>
                                            <div className="col-md-4">
                                                <div className="card-body ps-5">
                                                    <h4 className="card-title">{val.name}</h4>
                                                    <hr />
                                                    <h4 className="card-title">Price :- {val.price}</h4>
                                                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                                    <hr />
                                                    Qty :- <input type='number' onChange={(e) => editCart(val.id, e.target.value)} value={val.qty} />
                                                    <hr />
                                                    <button onClick={() => removeCart(val.id)} className='btn btn-danger me-2 w-50'>Delete</button>

                                                    {/* <button onClick={ (e) => editCart(val.id,e.target.value) } className='btn btn-primary w-25'>Edit</button> */}
                                                </div>
                                            </div>



                                        </div>

                                    </div>

                                )
                            })
                        )

                    }







                </div>



                <div className='row mt-5 mb-5'>
                    <button onClick={() => userOrder()} className='btn btn-success w-25'>Order</button>
                </div>
            </div>
        </>

    )
}

export default Cart