import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

/* Example reports page with placeholder data; connect to real API for production */
const data = [
  { name: "Alumni", value: 160 },
  { name: "Students", value: 420 },
  { name: "Jobs", value: 45 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export default function Reports() {
  return (
    <div>
      <h2 className="text-xl mb-4">Reports</h2>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="mb-2">Platform Composition</h3>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie dataKey="value" data={data} outerRadius={100}>
                {data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
