import { useEffect, useState } from "react"
import axios from 'axios'
import TopBar from "../Components/Topbar";
import Content from "../Components/Content";
import Footer from "../Components/Footer";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log("Checking authentication status");
    const user = localStorage.getItem('user');
    if (user) {
      console.log("ho gaya")
      setIsAuthenticated(true);
    }
    console.log("Authentication check complete");
  }, []);

  return (
    <div>
      <TopBar LoggedIn={isAuthenticated} />
      <Content />
      {/* <Footer /> */}
    </div>
  );
}

