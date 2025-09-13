import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();
  const role = user?.role;
  return (
    <aside className="w-64 bg-white dark:bg-gray-900 p-4 border-r">
      <div className="mb-6 font-semibold">Menu</div>
      <nav className="flex flex-col gap-2">
        {role === "admin" && (
          <>
            <NavLink to="/admin" className={({isActive})=>isActive? 'text-blue-600':'text-gray-600'}>Dashboard</NavLink>
            <NavLink to="/admin/manage-alumni">Manage Alumni</NavLink>
            <NavLink to="/admin/manage-students">Manage Students</NavLink>
          </>
        )}
        {role === "alumni" && (
          <>
            <NavLink to="/alumni">Dashboard</NavLink>
            <NavLink to="/alumni/jobs">Jobs</NavLink>
            <NavLink to="/alumni/events">Events</NavLink>
            <NavLink to="/alumni/chat">Chat</NavLink>
          </>
        )}
        {role === "student" && (
          <>
            <NavLink to="/student">Dashboard</NavLink>
            <NavLink to="/student/jobs">Jobs</NavLink>
            <NavLink to="/student/chat">Chat</NavLink>
          </>
        )}
      </nav>
    </aside>
  );
}
