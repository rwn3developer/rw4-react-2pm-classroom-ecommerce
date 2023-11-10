import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Auth';

const Login = () => {
    
    const [auth,setAuth] = useAuth();

    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = async() => {
       

       try{
        let users = await axios.get(`http://localhost:8000/users?email=${email}&&password=${password}`);
        
       if(users.data.length !== 0){

            localStorage.setItem('checkUserLogin',JSON.stringify(users.data[0]));
            setAuth(users.data[0])
            setEmail("");
            setPassword(""); 
                
       }else{
        alert("Email and Password not valid");
        navigate('/')
       }
       
      
       }catch(err){
        console.log(err);
        return false;
       }
    }

    return (
        <>
            <div className='container'>
                <h1 className='text-center p-5'>User Login</h1>
                <div className='row p-5' style={{border : '1px solid gray'}}>
                    <div className='col-lg-9'>
                        <form className='fs-5'>
                        <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="text" name='email' onChange={ (e) => setEmail(e.target.value) } value={email}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" /> 
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" name='password' onChange={ (e) => setPassword(e.target.value) } value={password} className="form-control" id="exampleInputPassword1" />
                            </div>
                           
                            <button type="button" onClick={ () => handleSubmit() } className="btn btn-primary">Submit</button>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Login