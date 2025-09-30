import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import {
  FaUsers, FaUserGraduate, FaBriefcase, FaHeart, FaChartBar
} from "react-icons/fa";

export default function AdminDashboard() {
  const [isDark, setIsDark] = useState(false);

  // Mock stats directly
  const stats = {
    alumniCount: 120,
    studentCount: 350,
    jobCount: 25,
    donationCount: 15
  };

  const data = [
    { name: "Alumni", value: stats.alumniCount },
    { name: "Students", value: stats.studentCount },
    { name: "Jobs", value: stats.jobCount },
    { name: "Donations", value: stats.donationCount }
  ];

  const pieData = [
    { name: "Alumni", value: stats.alumniCount, color: "#3b82f6" },
    { name: "Students", value: stats.studentCount, color: "#10b981" },
    { name: "Jobs", value: stats.jobCount, color: "#f59e0b" },
    { name: "Donations", value: stats.donationCount, color: "#ef4444" }
  ];

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const StatCard = ({ title, value, icon, color }) => (
    <div
      className={`p-6 rounded-xl shadow-md transition transform hover:scale-105
      ${isDark ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {title}
          </p>
          <p className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
            {value.toLocaleString()}
          </p>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${color}-100 dark:bg-${color}-900`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "dark bg-gray-900" : "bg-gray-50"}`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
            Admin Dashboard
          </h1>
          <button
            onClick={toggleTheme}
            className={`px-3 py-2 rounded-lg font-medium transition-colors
              ${isDark ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats ? (
            <>
              <StatCard title="Total Alumni" value={stats.alumniCount} color="blue"
                icon={<FaUsers className="text-blue-600 dark:text-blue-400 text-xl" />} />
              <StatCard title="Active Students" value={stats.studentCount} color="green"
                icon={<FaUserGraduate className="text-green-600 dark:text-green-400 text-xl" />} />
              <StatCard title="Job Postings" value={stats.jobCount} color="amber"
                icon={<FaBriefcase className="text-amber-600 dark:text-amber-400 text-xl" />} />
              <StatCard title="Donations" value={stats.donationCount} color="red"
                icon={<FaHeart className="text-red-600 dark:text-red-400 text-xl" />} />
            </>
          ) : (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-28 rounded-xl animate-pulse bg-gray-200 dark:bg-gray-700" />
            ))
          )}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Bar Chart */}
          <div className={`lg:col-span-2 p-6 rounded-xl shadow-md border 
            ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              Platform Overview
            </h3>
            <div style={{ height: 320 }}>
              {data.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <XAxis dataKey="name" tick={{ fill: isDark ? "#9ca3af" : "#6b7280" }} />
                    <YAxis tick={{ fill: isDark ? "#9ca3af" : "#6b7280" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? "#1f2937" : "#fff",
                        borderRadius: "8px"
                      }}
                    />
                    <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex justify-center items-center h-full text-gray-400">Loading chart...</div>
              )}
            </div>
          </div>

          {/* Pie Chart */}
          <div className={`p-6 rounded-xl shadow-md border
            ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              Distribution
            </h3>
            <div style={{ height: 320 }}>
              {pieData.length > 0 ? (
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%" cy="50%"
                      innerRadius={60} outerRadius={100}
                      dataKey="value" paddingAngle={4}
                    >
                      {pieData.map((item, i) => (
                        <Cell key={i} fill={item.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? "#1f2937" : "#fff",
                        borderRadius: "8px"
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex justify-center items-center h-full text-gray-400">Loading chart...</div>
              )}
            </div>
            {/* Legend */}
            {pieData.length > 0 && (
              <div className="mt-4 space-y-2">
                {pieData.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                      <span className={isDark ? "text-gray-300" : "text-gray-600"}>{item.name}</span>
                    </div>
                    <span className={isDark ? "text-white" : "text-gray-900"}>{item.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`p-6 rounded-xl shadow-md border 
          ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="p-5 rounded-lg border-2 border-dashed hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
              <div className="flex flex-col items-center">
                <FaUsers className="text-blue-600 dark:text-blue-400 text-2xl mb-2" />
                <p className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>Add Alumni</p>
              </div>
            </button>
            <button className="p-5 rounded-lg border-2 border-dashed hover:border-green-500 dark:hover:border-green-400 transition-colors">
              <div className="flex flex-col items-center">
                <FaBriefcase className="text-green-600 dark:text-green-400 text-2xl mb-2" />
                <p className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>Post Job</p>
              </div>
            </button>
            <button className="p-5 rounded-lg border-2 border-dashed hover:border-amber-500 dark:hover:border-amber-400 transition-colors">
              <div className="flex flex-col items-center">
                <FaChartBar className="text-amber-600 dark:text-amber-400 text-2xl mb-2" />
                <p className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>View Reports</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
