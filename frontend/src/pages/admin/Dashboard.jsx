import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Navbar from "../Navbar"; // import your existing Navbar
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
     api.get("/admin/stats")
    .then((r) => setStats(r.data))
    .catch(() => {
      // fallback mock data if backend fails
      setStats({
        alumniCount: 120,
        studentCount: 350,
        jobCount: 25,
        donationCount: 15
      });
    });
  }, []);

  const data = stats ? [
    { name: "Alumni", value: stats.alumniCount },
    { name: "Students", value: stats.studentCount },
    { name: "Jobs", value: stats.jobCount },
    { name: "Donations", value: stats.donationCount }
  ] : [];

  const pieData = stats ? [
    { name: "Alumni", value: stats.alumniCount, color: "#3b82f6" },
    { name: "Students", value: stats.studentCount, color: "#10b981" },
    { name: "Jobs", value: stats.jobCount, color: "#f59e0b" },
    { name: "Donations", value: stats.donationCount, color: "#ef4444" }
  ] : [];

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Navbar Component */}
      <Navbar />

      {/* Page Content */}
      <div className="p-6">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Alumni Management Dashboard
          </h1>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${
              isDark 
                ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats ? (
            <>
              {[
                { title: "Total Alumni", value: stats.alumniCount, icon: "👥", color: "blue" },
                { title: "Active Students", value: stats.studentCount, icon: "🎓", color: "green" },
                { title: "Job Postings", value: stats.jobCount, icon: "💼", color: "amber" },
                { title: "Donations", value: stats.donationCount, icon: "❤️", color: "red" },
              ].map((card, i) => (
                <div key={i} className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{card.title}</p>
                      <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{card.value.toLocaleString()}</p>
                    </div>
                    <div className={`w-12 h-12 bg-${card.color}-100 dark:bg-${card.color}-900 rounded-lg flex items-center justify-center`}>
                      <span className={`text-${card.color}-600 dark:text-${card.color}-400 text-xl`}>{card.icon}</span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl border shadow-sm animate-pulse`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className={`h-4 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded mb-2`}></div>
                    <div className={`h-8 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded w-20`}></div>
                  </div>
                  <div className={`w-12 h-12 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg`}></div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Bar Chart */}
          <div className={`lg:col-span-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl border shadow-sm`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Platform Overview</h3>
            <div style={{ height: 300 }}>
              {data.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: isDark ? '#9ca3af' : '#6b7280', fontSize: 12 }}
                      axisLine={{ stroke: isDark ? '#374151' : '#e5e7eb' }}
                    />
                    <YAxis 
                      tick={{ fill: isDark ? '#9ca3af' : '#6b7280', fontSize: 12 }}
                      axisLine={{ stroke: isDark ? '#374151' : '#e5e7eb' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: isDark ? '#1f2937' : '#ffffff',
                        border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                        borderRadius: '8px',
                        color: isDark ? '#ffffff' : '#000000'
                      }}
                    />
                    <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className={`flex items-center justify-center h-full ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                    <p>Loading chart...</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pie Chart */}
          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl border shadow-sm`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Distribution</h3>
            <div style={{ height: 300 }}>
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: isDark ? '#1f2937' : '#ffffff',
                        border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                        borderRadius: '8px',
                        color: isDark ? '#ffffff' : '#000000'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className={`flex items-center justify-center h-full ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                    <p>Loading chart...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Legend */}
            {pieData.length > 0 && (
              <div className="mt-4 space-y-2">
                {pieData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                      <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>{item.name}</span>
                    </div>
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl border shadow-sm`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Add Alumni", icon: "👤", color: "blue" },
              { title: "Post Job", icon: "💼", color: "green" },
              { title: "View Reports", icon: "📊", color: "amber" },
            ].map((action, i) => (
              <button key={i} className={`p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-${action.color}-500 dark:hover:border-${action.color}-400 transition-colors`}>
                <div className="text-center">
                  <div className={`w-8 h-8 bg-${action.color}-100 dark:bg-${action.color}-900 rounded-lg mx-auto mb-2 flex items-center justify-center`}>
                    <span className={`text-${action.color}-600 dark:text-${action.color}-400`}>{action.icon}</span>
                  </div>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{action.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
