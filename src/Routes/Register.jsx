import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import authService from "../Appwrite/auth";
import { v4 } from "uuid";
import { useState } from "react";

export default function App() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    authService.logout();
    console.log(data);
    if (data.Password === data.ReType_Password) {
      try {
        const userData = await authService.createAccount({
          name: data.firstName,
          email: data.Email,
          password: data.Password,
        });
        console.log(userData);

        if (userData) {
          const currentUserData = await authService.getCurrentUser();
          console.log(JSON.stringify(currentUserData));
          localStorage.setItem('user', JSON.stringify(currentUserData));
          console.log(currentUserData);
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="First Name" {...register("firstName", { required: true, maxLength: 20 })} />
      <br />
      <input placeholder="Last Name" {...register("lastName", { required: true, maxLength: 20 })} />
      <br />
      <input type="Email" placeholder="Email" {...register("Email", { required: true })} />
      <br />
      <input placeholder="Password" type="password" {...register("Password", { required: true })} />
      <br />
      <input type="password" placeholder="ReType Password" {...register("ReType_Password", { required: true })} />
      <br />
      <input type="submit" />
      <br />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
