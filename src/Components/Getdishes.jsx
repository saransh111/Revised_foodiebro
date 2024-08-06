import { useState, useEffect } from "react";
import cartService from "../Appwrite/CartService";

export default function Getdishes(props) {
  const [dishes, setDishes] = useState(null);

  useEffect(() => {
    setDishes(props.dishes);
  }, [props.dishes]);
  async function foodadder(dishname){
    const user = localStorage.getItem('user');
    if (user) {
      const userDetails = JSON.parse(localStorage.getItem('user'));
      console.log(userDetails.email);
      console.log(dishname);
      await cartService.addtocart(userDetails.email, dishname,100);
    }
    else{
        alert("you are not logged in ");
    }
  }
  return (
    <div>
      <ul>
        {
            dishes && dishes.map((dish) => 
                <div>
                    <span>{dish.strMeal+"  "}{dish.strTags+"  "}
                    <button onClick={() => foodadder(dish.strMeal)}>Add to Cart</button>
                    </span>
                </div>) 
        }
      </ul>
    </div>
  );
}