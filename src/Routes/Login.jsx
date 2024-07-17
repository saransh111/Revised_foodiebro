import React, { useRef } from 'react';
import "./Login.css";
import { useForm } from "react-hook-form";

export default function Login(){
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);
    }
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder='EmailId' {...register("UserName", { required: true, maxLength: 20 })} />
        <br/>
        <input placeholder='Password' type='password' id="Password" {...register("Password", { pattern: /^[A-Za-z]+$/i })} />
        <br/>
        <input type="submit" />
        </form>
      </div>
    )
}