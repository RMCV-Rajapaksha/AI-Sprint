import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./App.css";
import { Home, WebsocketTest } from "./pages";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/websocket-test" element={<WebsocketTest />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
