import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PlayerProvider } from "./context/PlayerContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Player from "./pages/Player";
import Gallery from "./pages/Gallery";
import "./index.css";

export default function App() {
  return (
    <PlayerProvider>
      <BrowserRouter basename="/CodeAlpha_SonicVisual">
        <Navbar />
        <div className="noise-overlay" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/player" element={<Player />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </BrowserRouter>
    </PlayerProvider>
  );
}
