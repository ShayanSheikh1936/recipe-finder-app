import React from "react";

function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 py-3 px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-3xl">🥘</span>
        <span className="text-2xl font-serif font-bold text-gray-800 tracking-wide">Delight Recipe</span>
      </div>
      <div className="flex gap-6 text-base font-medium text-gray-700">
        <a href="#" className="hover:text-purple-700 transition-colors">Home</a>
        <a href="#" className="hover:text-purple-700 transition-colors">Categories</a>
        <a href="#" className="hover:text-purple-700 transition-colors">About</a>
      </div>
    </nav>
  );
}

export default Navbar;
