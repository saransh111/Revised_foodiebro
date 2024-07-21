import { useEffect, useState } from "react"
import axios from 'axios'
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Register from "./Routes/Register";
import { Routes,Route,BrowserRouter } from "react-router-dom";
import Cart from "./Routes/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
