import { useEffect, useState } from "react";
import cartService from "../Appwrite/CartService";
import StripeCheckout from "react-stripe-checkout";
import authService from "../Appwrite/auth";

export default function CartItems() {
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  async function fetchCartItems(email) {
    try {
      const items = await cartService.getCart(email);
      setCartItems(items);

      let sum = items.reduce((acc, item) => acc + item.Price, 0);
      setTotalCost(sum);
    } catch (error) {
      console.error("Failed to fetch cart items", error);
    }
  }

  async function getEmail() {
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
      const user = await getEmail();
      if (user && user.email) {
        fetchCartItems(user.email);
      }
    }
    fetchUserData();
  }, []);

  async function removeItemFromCart(dish) {
    try {
      const user = await getEmail();
      await cartService.deleteItemFromCart(user.email, dish);
      fetchCartItems(user.email);
    } catch (error) {
      console.error("Failed to remove item from cart", error);
    }
  }

  const makePayment = token => {
    const body = {
      token,
      product
    };
    const headers = {
      "Content-Type": "application/json"
    };

    return fetch(`http://localhost:3000/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    })
      .then(response => {
        setRes("true");
        console.log("RESPONSE ", response);
        const { status } = response;
        console.log("STATUS ", status);
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Cart</h2>
      <ul className="space-y-4">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((cartItem, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-4 bg-white shadow-sm rounded-lg hover:shadow-md transition-shadow duration-300"
            >
              <span className="text-lg font-semibold text-gray-700">{cartItem.DishName}</span>
              <span className="text-gray-500">${cartItem.Price.toFixed(2)}</span>
              <button
                onClick={() => removeItemFromCart(cartItem.DishName)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-lg transition-colors duration-300"
              >
                Remove
              </button>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500 py-4">Your cart is empty.</li>
        )}
      </ul>
      <div className="flex justify-between items-center mt-6 p-4 bg-white shadow-sm rounded-lg">
        <div>
          <span className="text-xl font-bold text-gray-700">TOTAL: ${totalCost.toFixed(2)}</span>
        </div>
        <StripeCheckout
          stripeKey="pk_test_51JyhF1SGZNht59Jn6x8w9LRZ5lncxOdJ8UfhQLGSoBUyNpREgVCUqCrjJ8Dvz8gzCSgFzboGehYoORlzEaLdGU9l007s2U5PrZ"
          token={makePayment}
          name="BILL PAYMENT"
          amount={totalCost * 100} // Stripe expects the amount in cents
          shippingAddress
          billingAddress
        >
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105">
            Checkout
          </button>
        </StripeCheckout>
      </div>
    </div>
  );
}
