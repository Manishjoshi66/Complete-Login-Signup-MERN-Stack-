import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handlerror, handlescucess } from '../utils'
const Signup = () => {

    const[signup ,setsignup] = useState({
        name : '',
        email: '',
        password : ''

    })
    const navigate = useNavigate();
    const handlechange =(e) =>{
        const {name , value} = e.target ;
        console.log(name,value);
        const colpsignipinfo = {...signup};
        colpsignipinfo[name] = value ;
        setsignup(colpsignipinfo);
    }

    const handlesignup = async (e)=>{
        e.preventDefault();
        const{name , email , password} = signup ;
        if(!name || !email || !password){
            return handlerror('name , email ,password are required');
        }
        try{
           const url = "http://localhost:8080/auth/signup";
           const response =  await fetch(url,{
            method :"POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(signup)
           
        });
        const result = await response.json();
        const { success , message,error} = result ;
        if(success){
            handlescucess(message);
            setTimeout(()=>{
                navigate('/login')
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
        <h1>Sign up</h1>
        <form onSubmit={handlesignup}>
            <div>
                <label htmlFor='name'>name</label>
                <input  onChange={handlechange} type='text' name='name' autoFocus placeholder='Enter your name' value={signup.name}></input>
            </div>
            <div>
                <label htmlFor='email'>email</label>
                <input onChange={handlechange} type='text' name='email' autoFocus placeholder='Enter your email' value={signup.email}></input>
            </div>
            <div>
                <label htmlFor='password'>password</label>
                <input  onChange={handlechange} type='text' name='password' autoFocus placeholder='Enter your password' value={signup.password}></input>
            </div>
            <button type='submit'>Sign up</button>
            <span>Already have an account ?
                <Link to="/login">Login</Link>
            </span>
        </form>
        <ToastContainer/>
        
    </div>
  )
}

export default Signup