import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-purple-600 text-white shadow">
      <div>
        <h1 className="text-2xl font-bold">Task Manager</h1>
      </div>
      <nav className="flex space-x-4">
        {/* Dashboard Link */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "underline font-semibold" : "hover:underline"
          }
        >
          Dashboard
        </NavLink>

        {/* Task List Link */}
        <NavLink
          to="/tasklist"
          className={({ isActive }) =>
            isActive ? "underline font-semibold" : "hover:underline"
          }
        >
          Task List
        </NavLink>
      </nav>
      {/* Sign Out Button */}
      <button className="bg-red-500 hover:bg-red-700 px-4 py-1 rounded">
        Sign Out
      </button>
    </header>
  );
};

export default Header;
