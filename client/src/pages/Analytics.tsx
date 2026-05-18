import { useEffect, useState } from "react";
import API from "../services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface AnalyticsData {
  total: number;
  newLeads: number;
  qualified: number;
  closed: number;
  conversionRate: number;
  monthlyData: { month: string; leads: number }[];
}

const Analytics = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/analytics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (!data) {
    return <div className="p-6">Loading analytics...</div>;
  }

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-950">

      <h1 className="text-3xl font-bold mb-6">
        Advanced Analytics
      </h1>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
          <h2>Total Leads</h2>
          <p className="text-2xl font-bold">{data.total}</p>
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
          <h2>New</h2>
          <p className="text-2xl font-bold">{data.newLeads}</p>
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
          <h2>Closed</h2>
          <p className="text-2xl font-bold">{data.closed}</p>
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
          <h2>Conversion Rate</h2>
          <p className="text-2xl font-bold">
            {data.conversionRate.toFixed(1)}%
          </p>
        </div>

      </div>

      {/* CHART */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">

        <h2 className="mb-4 font-semibold">
          Monthly Lead Growth
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.monthlyData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="leads"
              stroke="#3b82f6"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default Analytics;