import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <nav className="bg-gray-800 p-4 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold text-green-300">TaskManager</Link>

        <div className="space-x-4">
          {isLoggedIn && (
            <>
              <Link to="/dashboard" className="hover:text-green-400">Dashboard</Link>
              <Link to="/create-task" className="hover:text-green-400">Create Task</Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 ml-2"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
