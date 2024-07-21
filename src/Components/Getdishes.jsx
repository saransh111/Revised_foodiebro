import { useState, useEffect } from "react";

export default function Getdishes(props) {
  const [dishes, setDishes] = useState(null);

  useEffect(() => {
    setDishes(props.dishes);
  }, [props.dishes]);

  return (
    <div>
      <ul>
        {
            dishes && dishes.map((dish) => <li key={dish.idMeal}>{dish.strMeal}<button>Add to Cart</button></li>) 
        }
      </ul>
    </div>
  );
}