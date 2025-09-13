import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-white dark:from-slate-900 dark:to-gray-900 p-6">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-800 p-8 rounded shadow text-center">
        <h1 className="text-3xl font-bold mb-4">AlumniConnect</h1>
        <p className="mb-6 text-gray-600 dark:text-gray-300">Centralized alumni & student platform for jobs, events, chat and donations.</p>
        <div className="flex gap-3 justify-center">
          <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded">Login</Link>
          <Link to="/register" className="px-4 py-2 bg-green-600 text-white rounded">Register</Link>
        </div>
      </div>
    </div>
  );
}
