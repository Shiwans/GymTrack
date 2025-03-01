import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.svg";
import React, { useEffect, useState } from "react";

const Header = () => {
  const { token, role, logout, loading } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    setIsAuthenticated(!!token);
    setUserRole(role);
  }, [token, role]);

  if(loading){
    return <nav className="flex justify-between items-center py-4 px-12 bg-gray-900 text-white shadow-md">Loading...</nav>;
  }

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center py-4 px-12 bg-gray-900 text-white shadow-md">
      {/* Added "sticky top-0 z-50" to the nav element */}
      <div className="flex items-center">
        <img className="h-12 w-auto" src={logo} alt="Logo" />
      </div>
      <ul className="flex gap-x-10 text-lg font-medium">
        {isAuthenticated && userRole === "admin" ? (
          <>
            <li><Link to="/dashboard" className="hover:text-orange-400 transition">Dashboard</Link></li>
            <li><Link to="/about" className="hover:text-orange-400 transition">About</Link></li>
            <li><Link to="/mark-attendance" className="hover:text-orange-400 transition">Attendance</Link></li>
            <li><Link to="/members" className="hover:text-orange-400 transition">Members</Link></li>
            <li><Link to="/add-members" className="hover:text-orange-400 transition">Add Members</Link></li>
          </>
        ) : isAuthenticated ? (
          <>
            <li><Link to="/" className="hover:text-orange-400 transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-orange-400 transition">About</Link></li>
            <li><Link to="/attendance" className="hover:text-orange-400 transition">Attendance</Link></li>
            <li><Link to="/data" className="hover:text-orange-400 transition">Data</Link></li>
            {/* <li><Link to="/leaderboard" className="hover:text-orange-400 transition">Leaderboard</Link></li> */}
          </>
        ) : (
          <>
            <li><Link to="/" className="hover:text-orange-400 transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-orange-400 transition">About</Link></li>
          </>
        )}
      </ul>
      <div className="flex items-center gap-x-6">
        {!isAuthenticated ? (
          <Link to="/login" className="bg-orange-500 px-5 py-2 rounded-xl text-white hover:bg-orange-600 transition">
            Login
          </Link>
        ) : (
          <>
            {userRole !== "admin" && (
              <Link to="/profile" className="hover:text-orange-400 transition">
                Profile
              </Link>
            )}
            <button
              onClick={logout}
              className="bg-red-500 px-5 py-2 rounded-xl text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;