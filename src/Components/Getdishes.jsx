import { useState, useEffect } from "react";
import cartService from "../Appwrite/CartService";
import authService from '../Appwrite/auth';

export default function Getdishes(props) {
  const [dishes, setDishes] = useState(null);

  useEffect(() => {
    setDishes(props.dishes);
  }, [props.dishes]);

  async function foodAdder(dishName) {
    const user = await authService.getCurrentUser();
    if (user) {
      console.log(user.email);
      console.log(dishName);
      await cartService.addtocart(user.email, dishName, 100);
    } else {
      alert("You are not logged in.");
    }
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <ul className="space-y-4">
        {dishes && dishes.length ? (
          dishes.map((dish, index) => (
            <li key={index} className="flex items-center justify-between p-4 bg-white shadow rounded-lg">
              <div className="text-lg font-semibold">{dish.strMeal}</div>
              <div className="text-sm text-gray-500">{dish.strTags}</div>
              <button
                onClick={() => foodAdder(dish.strMeal)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded"
              >
                Add to Cart
              </button>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500">No dishes available.</li>
        )}
      </ul>
    </div>
  );
}
