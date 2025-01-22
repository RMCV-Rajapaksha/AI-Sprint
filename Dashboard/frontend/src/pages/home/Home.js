import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ periods: parseInt(periods) }),
      });

      if (!response.ok) throw new Error("Forecast request failed");
      const data = await response.json();
      setForecast(
        data.forecast_dates.map((date, index) => ({
          date,
          sales: data.predictions[index],
        }))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="grid grid-cols-1 gap-6 mx-auto max-w-7xl lg:grid-cols-2">
        {/* Sales Forecast Card */}
        <div className="p-6 transition-all duration-300 bg-white shadow-lg rounded-xl hover:shadow-xl">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">
            Sales Forecast
          </h2>

          {/* Date Controls */}
          <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                From:
              </label>
              <DatePicker
                selected={startDate}
                onChange={setStartDate}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                To:
              </label>
              <DatePicker
                selected={endDate}
                onChange={setEndDate}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Forecast Button */}
          <button
            onClick={() => {
              const diffInMonths =
                (endDate.getFullYear() - startDate.getFullYear()) * 12 +
                (endDate.getMonth() - startDate.getMonth());
              setPeriods(diffInMonths);
              getForecast();
            }}
            disabled={loading}
            className="w-full px-4 py-2 text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 mr-2 border-b-2 border-white rounded-full animate-spin"></div>
                Loading...
              </div>
            ) : (
              "Get Forecast"
            )}
          </button>

          {/* Error Message */}
          {error && (
            <div className="p-3 mt-4 text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}

          {/* Forecast Chart */}
          {forecast && (
            <div className="mt-6">
              <h3 className="mb-4 text-xl font-semibold text-gray-800">
                Forecasted Sales
              </h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={forecast}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#4F46E5"
                      strokeWidth={2}
                      dot={{ fill: "#4F46E5" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>

        {/* Charts Section */}
        <div className="space-y-6">
          {/* Geographical Chart */}
          <div className="p-6 transition-all duration-300 bg-white shadow-lg rounded-xl hover:shadow-xl">
            <h3 className="mb-4 text-xl font-bold text-gray-800">
              Geographical Sales Distribution
            </h3>
            <div className="h-[400px]">
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
                height="100%"
                data={data}
              />
            </div>
          </div>

          {/* Donut Chart */}
          <div className="p-6 transition-all duration-300 bg-white shadow-lg rounded-xl hover:shadow-xl">
            <h3 className="mb-4 text-xl font-bold text-gray-800">
              Sales Distribution
            </h3>
            <div className="h-[400px]">
              <Chart
                chartType="PieChart"
                width="100%"
                height="100%"
                data={dataDonut}
                options={{
                  ...optionsDonut,
                  backgroundColor: "transparent",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
