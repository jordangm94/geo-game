import { useEffect, useState } from "react";
import axios from "axios";

import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";

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
    axios.get("/api/authenticate").then(response => {
      if (response.data.loggedIn) {
        setUser(response.data.username);
        console.log(response.data.username);
      }
    });
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </>
  );
}

export default App;