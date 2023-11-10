import axios from 'axios';
import React, { useState } from 'react'

const Register = () => {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const handleSubmit = () => {
        
        let users = axios.post(`http://localhost:8000/users`,{
            name : name,
            email : email,
            password : password
        });

        if(users){
            console.log("User successfully register");
            setName("");
            setEmail("");
            setPassword("");

        }else{
            console.log("User not Register");
            return false;
        }
    }


    return (
        <>
            <div className='container'>
                <h1 className='text-center p-5'>User Register</h1>
                <div className='row p-5' style={{border : '1px solid gray'}}>
                    <div className='col-lg-9'>
                        <form className='fs-5'>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                                <input type="email" name='name' onChange={ (e) => setName(e.target.value) } value={name} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" /> 
                            </div>
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

export default Register