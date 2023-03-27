import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Jumbotron from '../components/cards/Jumbotron';

const Register = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [address,setAddress]=useState("");

    const handleSubmit=async(e)=>{
      e.preventDefault();
      try{
        const {data}=await axios.post('http://localhost:8000/api/v1/register',{
          name,
          email,
          password,
          address
        
        });
        console.log(data);
        if(data?.error){
          toast.error(data.error)
        }else{
          
          toast.success("Registaion successfully");
        }
      }catch(error){
        console.log(error)
        toast.error("Registation failed, try again");
      }

    }
    return (
        <div>
            <Jumbotron title="Register" subTitle="Welcome to Register Page"/>
            <div className="container mt-5">
              <div className="row">
                <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                className='form-control mb-4 p-2'
                placeholder='Enter your name'
                value={name}
                onChange={(e)=>setName(e.target.value)}
                autoFocus
                />
                <input 
                type="email"
                className="form-control mb-4 p-2"
                placeholder='Enter your email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}

                />
                <input
                type="password"
                className="form-control mb-4 p-2"
                placeholder='Enter your password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                <input
                type="address"
                className="form-control mb-4 p-2"
                placeholder='Enter your address'
                value={address}
                onChange={(e)=>setAddress(e.target.value)}
                />
                <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </form>
            </div>
            </div>
            </div>
        </div>
    );
};

export default Register;