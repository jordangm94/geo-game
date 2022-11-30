import { useEffect, useState } from "react";
import axios from "axios";

import './App.css';
<<<<<<< HEAD
import { Route, Routes, Navigate } from "react-router-dom";
=======
import { Route, Routes, useNavigate } from "react-router-dom";
>>>>>>> master

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Leaderboard from "./pages/Leaderboard";
import Game from './pages/Game';
import React from 'react';

function App() {
  const [user, setUser] = useState(null);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.post("/api/authenticate", {}).then(response => {
      if (!response.data.error) {
        console.log("hello");
        setUser(response.data.user.user_name);
      }
    });
  }, []);

  return (
    <>
      <Navbar loggedInUser={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register setUser={setUser} />} />
        <Route path="/leaderboard" element={user ? <Leaderboard /> : <Navigate to="/login" />} />
        <Route path="/game" element={user ? <Game /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;