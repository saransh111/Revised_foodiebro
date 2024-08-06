import React from 'react';
import { useNavigate } from "react-router-dom";

export default function TopBar(props) {
  const navigate = useNavigate();

  function loginbutton() {
    navigate('/login');
  }

  function registerbutton() {
    navigate('/register');
  }

  function mycartbutton() {
    navigate('/Cart');
  }

  function signOut() {
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload(); // to refresh the state in parent component
  }

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="flex flex-row">
      {!props.LoggedIn ? (
        <div>
          <button onClick={loginbutton}>Login</button>
          <button onClick={registerbutton}>Register</button>
        </div>
      ) : (
        <div>
          <div>Hi {user ? user.name : 'User'}</div>
          <button onClick={signOut}>Sign Out</button>
          <button onClick={mycartbutton}>My Cart</button>
        </div>
      )}
    </div>
  );
}
