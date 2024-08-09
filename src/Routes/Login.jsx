import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import authService from "../Appwrite/auth";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    try {
      const userData = await authService.login({
        email: data.Email,
        password: data.Password,
      });
      if (userData) {
        const currentUserData = await authService.getCurrentUser();
        console.log(JSON.stringify(currentUserData));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setError("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("Email", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.Email && <p className="text-red-500 mt-1">Email is required</p>}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("Password", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.Password && <p className="text-red-500 mt-1">Password is required</p>}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
          <button class="flex items-center justify-center w-full max-w-xs mx-auto bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-300">
            <svg class="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path fill="#4285F4" d="M46.04 24.3c0-1.54-.14-3-.38-4.44H24v8.4h12.44c-.54 2.82-2.1 5.2-4.46 6.8v5.64h7.18c4.22-3.88 6.68-9.6 6.68-16.4z"/>
              <path fill="#34A853" d="M24 48c6.04 0 11.1-1.98 14.8-5.36l-7.18-5.64c-2.02 1.36-4.62 2.16-7.62 2.16-5.86 0-10.82-3.94-12.6-9.24H3.8v5.88C7.52 42.32 15.28 48 24 48z"/>
              <path fill="#FBBC05" d="M11.4 29.92c-.5-1.36-.8-2.8-.8-4.32s.3-2.96.8-4.32V15.4H3.8C2.32 18.24 1.52 21.5 1.52 24.6s.8 6.36 2.28 9.2l7.6-5.88z"/>
              <path fill="#EA4335" d="M24 9.44c3.28 0 6.2 1.12 8.52 3.34l6.28-6.28C34.92 2.88 29.96 1 24 1 15.28 1 7.52 6.68 3.8 14.16l7.6 5.88C13.18 14.96 18.14 11 24 11z"/>
            </svg>
            <span>Login with Google</span>
          </button>

          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}
