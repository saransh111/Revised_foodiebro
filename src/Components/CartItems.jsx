import { useEffect, useState } from "react";
import cartService from "../Appwrite/CartService";

export default function CartItems() {
  const [cartItems, setCartItems] = useState([]);

  async function fetchCartItems(email) {
    try {
      const items = await cartService.getCart(email);
      setCartItems(items);
    } catch (error) {
      console.error("Failed to fetch cart items", error);
    }
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.email) {
      fetchCartItems(user.email);
    }
  }, []); // Dependency array is empty to run only once on mount

  async function removeItemFromCart(dish) {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      await cartService.DeleteItemFromCart(user.email, dish);
      fetchCartItems(user.email); // Refresh the cart items after deletion
    } catch (error) {
      console.error("Failed to remove item from cart", error);
    }
  }

  return (
    <div>
      <ul>
        {cartItems && cartItems.map((cartItem, index) => (
          <li key={index}>
            <span>
              {cartItem.DishName} {cartItem.Price} 
              <button onClick={() => removeItemFromCart(cartItem.DishName)}>Remove from cart</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
