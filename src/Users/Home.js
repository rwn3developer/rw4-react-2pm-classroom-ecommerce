import axios from "axios"
import { useEffect, useState } from "react"
import Slider from "./Slider";

const Home = () => {
    const [product, setProduct] = useState([]);
    const [electronics,setElectronics] = useState([]);
    const [mobile,setMobile] = useState([]);

    const getAllProduct = async() => {
        axios.get(`http://localhost:8000/products?category=mobile&&status=instock&&marketstatus=best`)
        .then((res) => {
            setProduct(res.data);
        }).catch((err) => { 
            console.log(err);
            return false;
        })
    }
    const getAllElectronics  = () => { 
        axios.get(`http://localhost:8000/products?category=eletronics&&status=instock&&marketstatus=best`)
        .then((res)=>{
            let ans = res.data.filter((val,i)=>{
                if(i < 5){
                    return val.category === "eletronics"
                }
                
            })
                setElectronics(ans)
            
            
        }).catch((err)=>{
            console.log(err);  
            return false;
        })
    } 
    const getAllMobile  = () => { 
        axios.get(`http://localhost:8000/products?category=mobile&&status=instock`)
        .then((res)=>{
            // let ans = res.data.filter((val)=>{
            //     return val.category === "mobile"
            // })
            setMobile(res.data.slice(0,4));
        }).catch((err)=>{
            console.log(err);  
            return false;
        })
    }                                                                 


    useEffect(() => {
        getAllProduct();
        getAllElectronics();
        getAllMobile();
        
    },[]);


    return (
        <>
            <Slider />
            <div  className="container p-5">
                <h2 className="pb-5">Best of Electronics</h2>
                <div className="row">
                    {
                        electronics.map((val) => {
                            return (
                                <div className="col-md-3 pb-4">
                                    <div className="card" style={{ width: '18rem',padding:'15px' }}>
                                        <img style={{height:'200px',objectFit:'contain'}} src={val.image} className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title">Name :- {val.name}</h5>
                                            <hr/>
                                            <h5 className="card-title">Price :- {val.price}</h5>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div  className="container p-5">
                <h2 className="pb-5">Best of Mobile</h2>
                <div className="row">
                    {
                        mobile.map((val) => {
                            return (
                                <div className="col-md-3 pb-4">
                                    <div className="card" style={{ width: '18rem',padding:'15px' }}>
                                        <img style={{height:'200px',objectFit:'contain'}} src={val.image} className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title">Name :- {val.name}</h5>
                                            <hr/>
                                            <h5 className="card-title">Price :- {val.price}</h5>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>

    )
}

export default Home