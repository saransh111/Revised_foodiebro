import React, { useRef } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

export default function Login(){
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const onSubmit = data => {
        console.log(data);
        
        if(localStorage.getItem('token')){
            navigate('/');
        }
    }
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder='EmailId' {...register("UserName", { required: true, maxLength: 20 })} />
        <br/>
        <input placeholder='Password' type='password' id="Password" {...register("Password", { required: true,pattern: /^[A-Za-z]+$/i })} />
        <br/>
        <input type="submit" />
        </form>
      </div>
    )
}