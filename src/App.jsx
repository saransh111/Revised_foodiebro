import { useEffect, useState } from "react"
import axios from 'axios'
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Register from "./Routes/Register";
import { Routes,Route,BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
