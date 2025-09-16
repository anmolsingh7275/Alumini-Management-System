import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <nav className="bg-white dark:bg-gray-800 shadow px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link to="/" className="font-bold text-lg">AlumniConnect</Link>
        <Link to="/announcements" className="text-sm text-gray-600 hover:underline">Announcements</Link>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {user ? (
          <>
            <span className="text-sm hidden md:inline">{user.name}</span>
            <img
              src={user.gender === "female" ? "/assets/avatars/avatar-female.png" : "/assets/avatars/avatar-male.png"}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
            <button onClick={() => { logout(); navigate("/"); }} className="text-sm px-3 py-1 bg-red-500 text-white rounded">Logout</button>
          </>
        ) : (
          <Link to="/login" className="px-3 py-1 bg-blue-600 ">Login</Link>
        )}
      </div>
    </nav>
  );
}
