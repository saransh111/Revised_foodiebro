import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import No_Dish from './No_dish';
import Getdishes from './Getdishes';

export default function Content() {
  const [dishes, setDishes] = useState(null);
  const [search, setSearch] = useState("");
  const { register, handleSubmit } = useForm();
  
  useEffect(() => {
    getData();
  }, [search]);

  async function getData() {
    const response = await axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s=" + search);
    console.log(response);
    setDishes(response.data.meals);
    console.log(response.data.meals); // Log the response data to the console
  }

  const onSubmit = data => {
    console.log(data);
    setSearch(data.Search);
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center mb-8">
        <input
          type="text"
          placeholder="Search Something..."
          {...register("Search")}
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="submit"
          value="Search"
          className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>
      {
        dishes ? (dishes.length ? <Getdishes dishes={dishes} /> : <No_Dish />) : <div className="text-center text-gray-500">Please search for a dish.</div>
      }
    </div>
  );
}
