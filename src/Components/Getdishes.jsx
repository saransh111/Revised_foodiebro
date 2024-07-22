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
            dishes && dishes.map((dish) => 
                <div>
                    <span>{dish.strMeal+"  "}{dish.strTags+"  "}
                    <button>Add to Cart</button></span>
                </div>) 
        }
      </ul>
    </div>
  );
}