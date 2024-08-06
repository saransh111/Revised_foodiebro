import React, { useRef,useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import authService from "../Appwrite/auth";

export default function Login(){
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [error,setError] = useState("");
    const onSubmit = data => {
      console.log("hi gaya");
      console.log(data);
      localStorage.setItem('user', JSON.stringify({email: data.Email}));
      console.log(data);
      navigate("/");
    }
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
      <input type="Email" placeholder="Email" {...register("Email", { required: true })} />
      <br />
      <input placeholder="Password" type="password" {...register("Password", { required: true })} />
      <br />
      <input type="submit" />
      <br />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
    )
}