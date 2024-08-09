import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import authService from "../Appwrite/auth";
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            id="firstName"
            placeholder="First Name"
            {...register("firstName", { required: true, maxLength: 20 })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            id="lastName"
            placeholder="Last Name"
            {...register("lastName", { required: true, maxLength: 20 })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            {...register("Email", { required: true })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            {...register("Password", { required: true })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="reTypePassword" className="block text-sm font-medium text-gray-700">ReType Password</label>
          <input
            id="reTypePassword"
            type="password"
            placeholder="ReType Password"
            {...register("ReType_Password", { required: true })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </form>
    </div>
  );
}
