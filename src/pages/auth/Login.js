import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Jumbotron from '../../components/cards/Jumbotron';
import { useAuth } from '../../context/auth';


const Login = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  //hook
  const [auth,setAuth]=useAuth();
  
  const handleSubmit=async(e)=>{
      e.preventDefault();
      try{
        const {data}=await axios.post('http://localhost:8000/api/v1/login',{
          email,
          password
        });
        if(data?.error){
          toast.error(data.error);
        }else{
          localStorage.setItem("auth",JSON.stringify(data));
          setAuth({...auth,token:data.token,user:data.user});
          toast.success("Login successful");
        }
      }catch(error){
        toast.error("Login failed,try again")
      }
  }
    return (
        <div>
            <Jumbotron title={Login}/>
            <div className="container mt-5">
              <div className="row">
                <div className="col-md-6 offset-md-3">
                  <form onSubmit={handleSubmit}>
                    <input
                    type="email"
                    className="form-control mb-4 p-2"
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    autoFocus
                    />
                    <input 
                    type="password"
                    className="form-control mb-4 p-2"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}/>
                    <button className='btn btn-primary' type="submit">Login</button>
                  </form>
            </div> 
            </div>
            </div>       
        </div>
    );
};

export default Login;