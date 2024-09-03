import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import { FaBook, FaDollarSign, FaUsers } from 'react-icons/fa';
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch admin stats data
  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("https://poznanski.onrender.com/admin-stats");
        return res.data;
      } catch (error) {
        console.error("Error fetching admin stats:", error);
        throw error;
      }
    },
  });

  // Create a dataset for the charts based on admin stats
  const chartData = [
    { category: 'Revenue', value: stats.revenue },
    { category: 'Users', value: stats.users },
    { category: 'Devices', value: stats.menuItems },
    { category: 'Orders', value: stats.orders },
  ];

  return (
    <div className="w-full md:w-[870px] mx-auto px-4">
      <h2 className="text-2xl font-semibold my-4">Hi, {user.displayName}</h2>
      <div className="stats shadow flex flex-col md:flex-row">
        <div className="stat bg-emerald-200">
          <div className="stat-figure text-secondary">
            <FaDollarSign className="text-3xl" />
          </div>
          <div className="stat-title">Revenue</div>
          <div className="stat-value">${stats.revenue}</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat bg-orange-200">
          <div className="stat-figure text-secondary">
            <FaUsers className="text-3xl" />
          </div>
          <div className="stat-title">Users</div>
          <div className="stat-value">{stats.users}</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat bg-indigo-400">
          <div className="stat-figure text-secondary">
            <FaBook className="text-3xl" />
          </div>
          <div className="stat-title">Devices</div>
          <div className="stat-value">{stats.menuItems}</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat bg-purple-300">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              />
            </svg>
          </div>
          <div className="stat-title">Orders</div>
          <div className="stat-value">{stats.orders}</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>

      <div className="mt-16 flex flex-col sm:flex-row">
        <div className="sm:w-1/2 w-full">
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="sm:w-1/2 w-full">
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={400} height={400}>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
