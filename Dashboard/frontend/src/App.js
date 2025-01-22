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
import { Layout } from "./components/layout/layout";


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/websocket-test" element={<WebsocketTest />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}


export default App;
