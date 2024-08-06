import { useEffect, useState } from "react"
import axios from 'axios'
import TopBar from "../Components/Topbar";
import CartItems from "../Components/CartItems";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log("Checking authentication status");
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    }
    else{
        navigate("/");
    }
  }, []);

  return (
    <div>
      <TopBar LoggedIn={isAuthenticated} />
      <CartItems/>
      {/* <Footer /> */}
    </div>
  );
}

