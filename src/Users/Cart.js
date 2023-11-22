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
    const [mdelete,setMDelete] = useState([]);




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

    const handleMultipleDelete = (checked,value) => {
        let all = [...mdelete];
       if(checked){
            all.push(value)
       }else{
            all = all.filter(val => val !== value)
       }
       setMDelete(all);
    }

    const multipleDelete = () => {
        mdelete.map((val)=>{
            axios.delete(`http://localhost:8000/carts/${val}`).
            then((res)=>{
                alert("Cart successfully delete");
            }).catch((err)=>{
                console.log(err);
                return false;
            })
        })
        getAllCart();
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

    // const userOrder = () => {
    //     if(mulipleOrder.length === 0){
    //         cart.map((item) => {
    //             axios.post(`http://localhost:8000/orders`, {
    //                 name: item.name,
    //                 price: item.price,
    //                 qty: item.qty,
    //                 image: item.image,
    //                 category: item.category,
    //                 productId: item.productId,
    //                 userId: item.userId,
    //             }).then((res) => {
                   
    //             }).catch((err) => {
    //                 console.log(err);
    //                 return false;
    //             })
    //         })
    //     }else{
    //         mulipleOrder.map((item) => {
    //             axios.post(`http://localhost:8000/orders`, {
    //                 name: item.name,
    //                 price: item.price,
    //                 qty: item.qty,
    //                 image: item.image,
    //                 category: item.category,
    //                 productId: item.productId,
    //                 userId: item.userId,
    //             }).then((res) => {
                    
    //             }).catch((err) => {
    //                 console.log(err);
    //                 return false;
    //             })

    //             axios.delete(`http://localhost:8000/carts/${item.id}`)
    //             .then((res)=>{
    //                 getAllCart();
    //             }).catch((err)=>{
    //                 console.log(err);
    //                 return false;
    //             })
    //         })
    //     }
    //     alert("Successfully Order")
        
    // }



    useEffect(() => {
        getAllCart();
    }, [])

    return (

        <>
            <div className='container'>
                <h2 className='text-center p-4'>Cart</h2>

                <div style={{boxShadow : '1px 1px 10px gray' }} className='col-lg-4 p-4 mb-5'>
                               <h5>Name :- {Userauth()?.name}</h5>
                               <h5>Email :- {Userauth()?.email}</h5>
                               

                               
                </div>
               
                <table className="table table-hover">
                            <thead className='table table-info'>
                                <tr>
                                    <th>
                                        <button onClick={ () => multipleDelete() } className='btn btn-danger btn-sm'>Delete</button>
                                    </th>
                                    <th scope="col">Id</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cart.map((val) => {
                                        return (
                                            <tr>
                                                <td><input onChange={ (e) => handleMultipleDelete(e.target.checked,val.id) } type='checkbox'/></td>
                                                <td>{val.id}</td>
                                                <td>
                                                    <img src={val.image} width="100"/>
                                                </td>
                                                <td>{val.name}</td>
                                                <td>{val.price}</td>
                                                
                                                
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>



                <div className='row mt-5 mb-5'>
                    <button className='btn btn-success w-25'>Order</button>
                </div>
            </div>
        </>

    )
}

export default Cart