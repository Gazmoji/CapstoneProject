import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage.jsx";
import NewGame from "./components/NewGame.jsx";
import Leaderboard from "./components/Leaderboard.jsx";
import BeginGame from "./components/BeginGame.jsx";
import SlidePuzzle from "./components/SlidePuzzle.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/newgame" element={<NewGame />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/game" element={<BeginGame />} />
        <Route path="/slider" element={<SlidePuzzle />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
