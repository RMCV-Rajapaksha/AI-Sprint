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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Chart } from "react-google-charts";
import { data, dataDonut, optionsDonut } from "../../data/data";
export const Home = () => {
  const [periods, setPeriods] = useState(4);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

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
    <div className="container mx-auto justify-center items-center p-4 flex flex-col md:flex-row gap-4">
      {/* Sales Forecast Section */}
      <div className="card">
        <h2 className="text-3xl font-medium">Sales Forecast</h2>
        <div className="controls">
          <div className="flex flex-col md:flex-row justify-between items-center mb-3">
            <div>
              <label className="periods">From: </label>
              <DatePicker
                className="p-3"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div>
              <label className="periods">To: </label>
              <DatePicker
                className="p-3"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </div>
          </div>
          <button
            onClick={() => {
              const diffInMonths =
                (endDate.getFullYear() - startDate.getFullYear()) * 12 +
                (endDate.getMonth() - startDate.getMonth());
              setPeriods(diffInMonths);
              getForecast();
            }}
            disabled={loading}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {loading ? "Loading..." : "Get Forecast"}
          </button>
        </div>

        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
        )}

        {forecast && (
          <div style={{ overflowX: "auto", marginTop: "20px" }}>
            <h3 className="text-2xl font-medium mb-4">Forecasted Sales Chart</h3>
            <LineChart
              width={800}
              height={400}
              data={forecast}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                label={{ value: "Month", position: "bottom", offset: -10 }}
              />
              <YAxis
                label={{ value: "Sales", angle: -90, position: "left", offset: 10 }}
              />
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

      {/* Geographical Sales & Donut Charts Section */}
      <div className="flex flex-col gap-4">
        {/* Geographical Sales Distribution */}
        <div className="card w-full">
          <h3 className="font-bold text-2xl mb-2">
            Geographical Sales Distribution
          </h3>
          <Chart
            chartEvents={[
              {
                eventName: "select",
                callback: ({ chartWrapper }) => {
                  const chart = chartWrapper.getChart();
                  const selection = chart.getSelection();
                  if (selection.length === 0) return;
                  const region = data[selection[0].row + 1];
                  console.log("Selected : " + region);
                },
              },
            ]}
            chartType="GeoChart"
            width="100%"
            height="400px"
            data={data}
          />
        </div>

        {/* Donut Chart */}
        <div className="card w-full">
          <h3 className="font-bold text-2xl mb-2">Sales Distribution</h3>
          <Chart
            chartType="PieChart"
            width="100%"
            height="400px"
            data={dataDonut}
            options={optionsDonut}
          />
        </div>
      </div>
      </div>
  );
}
