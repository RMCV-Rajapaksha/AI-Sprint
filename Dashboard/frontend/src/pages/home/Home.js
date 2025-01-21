import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./Home.css";
export const Home = () => {
  const [periods, setPeriods] = useState(4);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getForecast = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("http://localhost:8000/forecast/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ periods: parseInt(periods) }),
      });

      if (!response.ok) throw new Error("Forecast request failed");

      const data = await response.json();
      const chartData = data.forecast_dates.map((date, index) => ({
        date,
        sales: data.predictions[index],
      }));

      setForecast(chartData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container">
      <div className="card">
        <h2>Sales Forecast</h2>
        <div className="controls">
          <input
            type="number"
            min="1"
            max="12"
            value={periods}
            onChange={(e) => setPeriods(e.target.value)}
            placeholder="Periods"
            style={{ width: "120px", padding: "8px", marginRight: "10px" }}
          />
          <button
            onClick={getForecast}
            disabled={loading}
            style={{
              padding: "8px 16px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {loading ? "Loading..." : "Get Forecast"}
          </button>
        </div>

        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
        )}

        {forecast && (
          <div style={{ overflowX: "auto", marginTop: "20px" }}>
            <LineChart
              width={800}
              height={400}
              data={forecast}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#8884d8"
                name="Forecasted Sales"
              />
            </LineChart>
          </div>
        )}
      </div>
    </div>
  );
};
