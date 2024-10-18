import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-blue-600 text-white shadow-md">
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex justify-between items-center py-4">
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-blue-300 transition">
          Shopping List
          </Link>
          <Link to="/jokes" className="hover:text-blue-300 transition">
            Jokes
          </Link>
        </div>
        <div className="md:hidden">
          <button
            className="text-white hover:text-blue-300 focus:outline-none focus:text-blue-300 transition"
            aria-label="Toggle Menu"
            onClick={() => {
              const menu = document.getElementById('mobile-menu');
              menu.classList.toggle('hidden');
            }}
          >
            ☰
          </button>
        </div>
      </div>
      <div id="mobile-menu" className="md:hidden hidden">
        <Link
          to="/"
          className="block py-2 px-4 text-center hover:bg-blue-700 transition"
        >
          Shopping List
        </Link>
        <Link
          to="/jokes"
          className="block py-2 px-4 text-center hover:bg-blue-700 transition"
        >
          Jokes
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
