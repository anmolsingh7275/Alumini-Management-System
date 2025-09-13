import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      <div className="flex flex-col gap-3">
        <Link to="/auth/alumni-register" className="p-3 bg-blue-600 text-white rounded text-center">Register as Alumni</Link>
        <Link to="/auth/student-register" className="p-3 bg-green-600 text-white rounded text-center">Register as Student</Link>
      </div>
    </div>
  );
}
