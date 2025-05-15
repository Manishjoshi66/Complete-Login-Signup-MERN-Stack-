import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handlerror, handlescucess } from '../utils'
const Login = () => {

    const[login ,setlogin] = useState({
       
        email: '',
        password : ''

    })
    const navigate = useNavigate();
    const handlechange =(e) =>{
        const {name , value} = e.target ;
        console.log(name,value);
        const colpsignipinfo = {...login};
        colpsignipinfo[name] = value ;
        setlogin(colpsignipinfo);
    }

    const handlelogin = async (e)=>{
        e.preventDefault();
        const{ email , password} = login ;
        if( !email || !password){
            return handlerror(' email ,password are required');
        }
        try{
           const url = "http://localhost:8080/auth/login";
           const response =  await fetch(url,{
            method :"POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(login)
           
        });
        const result = await response.json();
        const { success , message,jwtToken,name ,error} = result ;
        if(success){
            handlescucess(message);
            localStorage.setItem('token',jwtToken);
            localStorage.setItem('loggedinuser',name);
            setTimeout(()=>{
                navigate('/home')
            },1000)
        }
        else if(error){
            const details = error?.details[0].message;
            handlerror(details);
        }
        else if(!success){
            handlerror(message);
        }
        }
        catch(err){
            handlerror(err);
        }
    }
  return (
    <div className='container'>
        <h1>login  up</h1>
        <form onSubmit={handlelogin}>
            
            <div>
                <label htmlFor='email'>email</label>
                <input onChange={handlechange} type='text' name='email' autoFocus placeholder='Enter your email' value={login.email}></input>
            </div>
            <div>
                <label htmlFor='password'>password</label>
                <input  onChange={handlechange} type='text' name='password' autoFocus placeholder='Enter your password' value={login.password}></input>
            </div>
            <button type='submit'>Login</button>
            <span>Don't  have an account ?
                <Link to="/signup">sign up</Link>
            </span>
        </form>
        <ToastContainer/>
        
    </div>
  )
}

export default Login