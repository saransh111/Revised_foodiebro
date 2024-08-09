import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import authService from '../Appwrite/auth';

export default function TopBar(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const loginbutton = () => {
    navigate('/login');
  };

  const registerbutton = () => {
    navigate('/register');
  };

  const mycartbutton = () => {
    navigate('/Cart');
  };

  const signOut = async () => {
    console.log("signout_clicked");
    await authService.logout();
    window.location.reload();
  };

  const getemail = async () => {
    try {
      const userdata = await authService.getCurrentUser();
      return userdata;
    } catch (error) {
      console.error('Failed to fetch user data', error);
      return null;
    }
  };

  useEffect(() => {
    async function fetchUser() {
      const currentuser = await getemail();
      console.log("current user", currentuser);
      setUser(currentuser);
    }

    fetchUser();
  }, []);

  return (
    <div className="bg-gray-800 text-white py-4 px-6 flex items-center justify-between">
      <div className="flex space-x-4">
        {!props.LoggedIn ? (
          <>
            <button
              onClick={loginbutton}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              Login
            </button>
            <button
              onClick={registerbutton}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
            >
              Register
            </button>
          </>
        ) : (
          <>
            <div className="text-lg font-semibold">Hi, {user ? user.name : 'User'}</div>
            <button
              onClick={signOut}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
            >
              Sign Out
            </button>
            <button
              onClick={mycartbutton}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded"
            >
              My Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
}
