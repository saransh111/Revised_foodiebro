// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Button } from 'react-bootstrap';
// import { useForm } from "react-hook-form";
// import No_Dish from './No_dish';
// import Getdishes from './Getdishes';

// export default function Content() {
//   const [dishes, setdishes] = useState(null);
//   const [search,setSearch]=useState("");
//   const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
//     useEffect(() => {
//         getData();
//     }, [search]);

//     async function getData() {
//         const response = await axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s="+search);
//         console.log(response);
//         setdishes(response.data);
//         console.log(response.data); // Log the response data to the console
//     }
    
//     const onSubmit = data1 => {
//         console.log(data1);
//         setSearch(data1.Search);
//     }

//     return (
//         <div>
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <input placeholder='Search Something...' {...register("Search")} />
//                 <input type="submit"/>
//             </form>
//             {
//                 data.length ? <No_Dish/>: <Getdishes dishes={dishes}/>
//             }
//         </div>
//     );
// }

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

  const onSubmit = data1 => {
    console.log(data1);
    setSearch(data1.Search);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder='Search Something...' {...register("Search")} />
        <input type="submit" value="Search" />
      </form>
      {
        dishes ? (dishes.length ? <Getdishes dishes={dishes} /> : <No_Dish />) : <div>Please search for a dish.</div>
      }
    </div>
  );
}
