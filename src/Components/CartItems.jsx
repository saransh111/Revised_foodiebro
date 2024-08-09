import { useEffect, useState } from "react";
import cartService from "../Appwrite/CartService";
import authService from "../Appwrite/auth";

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

  async function getemail() {
    try {
      const userdata = await authService.getCurrentUser();
      return userdata;
    } catch (error) {
      console.error('Failed to fetch user data', error);
      return null;
    }
  }

  useEffect(() => {
    async function fetchUserData() {
      const user = await getemail();
      if (user && user.email) {
        fetchCartItems(user.email);
      }
    }
    fetchUserData();
  }, []);

  async function removeItemFromCart(dish) {
    try {
      const user = await getemail();
      await cartService.DeleteItemFromCart(user.email, dish);
      fetchCartItems(user.email);
    } catch (error) {
      console.error("Failed to remove item from cart", error);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <ul className="space-y-4">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((cartItem, index) => (
            <li key={index} className="flex items-center justify-between p-4 bg-white shadow rounded-lg">
              <span className="text-lg font-semibold">{cartItem.DishName}</span>
              <span className="text-gray-600">${cartItem.Price.toFixed(2)}</span>
              <button
                onClick={() => removeItemFromCart(cartItem.DishName)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
              >
                Remove
              </button>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500">Your cart is empty.</li>
        )}
      </ul>
    </div>
  );
}
