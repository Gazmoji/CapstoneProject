import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage.jsx";
import NewGame from "./components/NewGame.jsx";
import Leaderboard from "./components/Leaderboard.jsx";
import BeginGame from "./components/BeginGame.jsx";
import CabinRoute from "./components/CabinRoute.jsx";
import ForestRoute from "./components/ForestRoute.jsx";
import SlidePuzzle from "./components/SlidePuzzle.jsx";
import SnakeGame from "./components/snakeGame/SnakeGame.jsx";
import LeftRoute from "./components/LeftRoute.jsx";
import RightRoute from "./components/RightRoute.jsx";
import EscapeCave from "./components/EscapeCave.jsx";
import GameOver from "./components/GameOver.jsx";
import EndingScreen from "./components/EndingScreen.jsx";
import HospitalRoute from "./components/HospitalRoute.jsx";
import SpaceRoute from "./components/SpaceRoute.jsx";
import LightsGame from "./components/lightsGame/LightsGame.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/newgame" element={<NewGame />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/game" element={<BeginGame />} />
          <Route path="/ForestRoute" element={<ForestRoute />} />
          <Route path="/CabinRoute" element={<CabinRoute />} />
          <Route path="/LeftRoute" element={<LeftRoute />} />
          <Route path="/RightRoute" element={<RightRoute />} />
          <Route path="/GameOver" element={<GameOver />} />
          <Route path="/slider" element={<SlidePuzzle />} />
          <Route path="/snake" element={<SnakeGame />} />
          <Route path="/EscapeCave" element={<EscapeCave />} />
          <Route path="/HospitalRoute" element={<HospitalRoute />} />
          <Route path="/EndingScreen" element={<EndingScreen />} />
          <Route path="/SpaceRoute" element={<SpaceRoute />} />
          <Route path="/lights" element={<LightsGame />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
