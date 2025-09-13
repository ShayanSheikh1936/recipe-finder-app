import React from "react";

function About() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-purple-50 via-white to-yellow-50">
      <div className="flex-1 flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-white/80 shadow-xl rounded-3xl p-10 max-w-3xl w-full border border-purple-100 mb-10 animate-fade-in">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-gradient-to-tr from-purple-400 to-yellow-300 rounded-full p-4 mb-4 shadow-lg">
              <span className="text-5xl">🥘</span>
            </div>
            <h2 className="text-5xl font-extrabold mb-2 bg-gradient-to-r from-purple-700 to-yellow-500 text-transparent bg-clip-text drop-shadow">About Delight Recipe</h2>
            <p className="text-lg text-gray-700 mt-2 max-w-xl text-center">
              Delight Recipe is your go-to app for discovering, searching, and saving delicious recipes from around the world. Whether you're a home cook or a food enthusiast, our platform makes it easy to find inspiration for your next meal.
            </p>
          </div>
          <div className="bg-gradient-to-r from-yellow-50 to-purple-100 rounded-2xl shadow p-6 flex flex-col items-center mb-8">
            <h3 className="text-2xl font-bold text-yellow-700 mb-2 flex items-center gap-2"><span>🌍</span> Our Mission & Vision</h3>
            <p className="text-gray-700 text-center max-w-lg">
              Our mission is to bring the joy of cooking to everyone, everywhere. We believe that food connects people and cultures, and our vision is to make discovering new recipes and sharing culinary experiences simple, fun, and accessible to all. Whether you’re looking for a quick dinner or a dish to impress, Delight Recipe is here to spark your creativity in the kitchen.
            </p>
          </div>
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-br from-purple-100 to-white rounded-2xl shadow p-6 flex flex-col items-center">
              <h3 className="text-2xl font-bold text-purple-700 mb-3 flex items-center gap-2"><span>✨</span> Features</h3>
              <ul className="list-none text-left text-gray-700 space-y-2">
                <li className="flex items-center gap-2"><span>🔍</span>Powerful recipe search by dish name</li>
                <li className="flex items-center gap-2"><span>⭐</span>Featured recipes for quick inspiration</li>
                <li className="flex items-center gap-2"><span>📝</span>Save your recent searches for easy access</li>
                <li className="flex items-center gap-2"><span>🍽️</span>Beautiful and easy-to-use interface</li>
                <li className="flex items-center gap-2"><span>📱</span>Responsive design for all devices</li>
              </ul>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-100 to-yellow-100 rounded-2xl shadow p-6 flex flex-col items-center">
            <h3 className="text-2xl font-bold text-purple-600 mb-2 flex items-center gap-2"><span>👨‍🍳</span> Meet the Team</h3>
            <div className="flex flex-col items-center gap-1">
              <span className="font-bold text-lg">Shayan Sheikh Team</span>
              <span className="text-gray-600">Passionate about food and technology!</span>
            </div>
          </div>
        </div>
      </div>
      <footer className="w-full bg-white border-t border-gray-200 py-4 text-center text-gray-500 text-sm font-serif shadow-inner animate-fade-in">
        &copy; {new Date().getFullYear()} Delight Recipe. All rights reserved. Developed by <a href="#" className="text-purple-500 hover:text-purple-600">Shayan Sheikh Team</a>
      </footer>
    </div>
  );
}

export default About; 