import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../Components/Topbar";
import CartItems from "../Components/CartItems";
import authService from "../Appwrite/auth";

export default function Cart() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuthentication() {
      console.log("Checking authentication status");
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          setIsAuthenticated(true);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
        navigate("/login");
      }
    }

    checkAuthentication();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <TopBar LoggedIn={isAuthenticated} />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>
        <CartItems />
      </div>
      {/* <Footer /> */}
    </div>
  );
}
