import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import checkUserLogin from './Userauth';
const ProductDetails = () => {
    const navigate = useNavigate();
    const { productId } = useParams();
    const [product, setProduct] = useState({});

    const getSingleProductRecord = async () => {
        try {
            let single = await axios.get(`http://localhost:8000/products/${productId}`);
            if (single) {
                setProduct(single.data)
            } else {
                console.log("record not fetch");
                return false;
            }

        } catch (err) {
            console.log(err);
            return false;
        }
    }

    const Addtocart = (productId) => {
        if (!checkUserLogin()) {
            alert("Please Login Bro");
            navigate('/login');
        } else {
            axios.get(`http://localhost:8000/carts?productId=${productId}&userId=${checkUserLogin().id}`)
                .then((res) => {
                    if (res.data.length > 0) {
                        alert("Product already add in cart")
                        return false
                    } else {
                        axios.get(`http://localhost:8000/products/${productId}`)
                            .then((res) => {
                                console.log(res.data);
                                axios.post(`http://localhost:8000/carts`, {
                                    name: res.data.name,
                                    price: res.data.price,
                                    qty: parseInt(res.data.qty),
                                    image: res.data.image,
                                    category: res.data.category,
                                    productId: productId,
                                    userId: checkUserLogin().id
                                }).then((res) => {
                                    alert("Product successfully add");
                                }).catch((err) => {
                                    console.log(err);
                                    return false;
                                })
                            }).catch((err) => {
                                console.log(err);
                                return false;
                            })
                    }
                }).catch((err) => {
                    console.log(err);
                    return false;
                })
        }
    }

    useEffect(() => {
        getSingleProductRecord();
    }, []);

    return (
        <>
            <div className='container'>
                <h1 className='pt-3 pb-3 text-center'>Product Details</h1>
                <div className='row p-5'>
                    <div className='col-lg-9 p-4' style={{ border: '1px solid gray', borderRadius: '10px' }}>
                        <div className='row'>
                            <div className="col-lg-3">
                                <img src={product.image} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-lg-6">
                                <div className="card-body">
                                    <h5 className="card-title pb-2">Name :- {product.name}</h5>
                                    <hr></hr>
                                    <h5 className="card-title pb-2">Price :- {product.price}</h5>
                                    <hr></hr>
                                    <p className="card-text pb-2">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    <hr></hr>
                                    <button onClick={() => Addtocart(product.id)} className='btn btn-success w-50'>Add To Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>





                </div>
            </div>
        </>
    )
}

export default ProductDetails