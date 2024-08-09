import { useEffect, useState } from "react";
import TopBar from "../Components/Topbar";
import Content from "../Components/Content";
import Footer from "../Components/Footer";
import authService from "../Appwrite/auth";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuthentication() {
      console.log("Checking authentication status");
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          console.log("User is authenticated");
          setIsAuthenticated(true);
        } else {
          console.log("User is not authenticated");
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
      console.log("Authentication check complete");
    }

    checkAuthentication();
  }, []);

  return (
    <div>
      <TopBar LoggedIn={isAuthenticated} />
      <Content />
      {/* <Footer /> */}
    </div>
  );
}
