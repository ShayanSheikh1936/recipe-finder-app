import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import RecipeCard from "./components/RecipeCard";
import RecipeModal from "./components/RecipeModal";


function App() {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchBoxRef = useRef(null);
  const resultsRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    fetchRandomRecipes();
    // Load search history from localStorage
    const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(history);
  }, []);

  // Hide history dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const updateSearchHistory = (term) => {
    if (!term) return;
    let updated = [term, ...searchHistory.filter((t) => t !== term)];
    if (updated.length > 8) updated = updated.slice(0, 8); // Limit history
    setSearchHistory(updated);
    localStorage.setItem("searchHistory", JSON.stringify(updated));
  };

  const fetchRandomRecipes = async () => {
    try {
      const res = await axios.get("https://www.themealdb.com/api/json/v1/1/search.php?f=c");
      setRecipes(res.data.meals || []);
    } catch (err) {
      console.error("Failed to fetch random recipes:", err);
    }
  };

  const searchRecipes = async (customQuery) => {
    const searchTerm = typeof customQuery === "string" ? customQuery : query;
    if (!searchTerm) return;
    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      setRecipes(res.data.meals || []);
      updateSearchHistory(searchTerm);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  function getRandomFeatured(recipes, n = 3) {
    if (!recipes || recipes.length <= n) return recipes;
    const shuffled = [...recipes].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  }

  const featuredRecipes = getRandomFeatured(recipes, 3);

  return (
    <div className="min-h-screen bg-[#f8f5f0] text-gray-900 flex flex-col">
      <Navbar />
      {/* Jumbotron/Header */}
      <header className="w-full bg-gradient-to-b from-[#f8f5f0] to-[#f3ede6] py-12 px-4 flex flex-col items-center border-b border-gray-200">
        <h1 className="text-5xl font-serif font-bold mb-2 text-center text-gray-800 drop-shadow">Welcome to Delight Recipe</h1>
        <p className="text-lg text-gray-600 mb-6 text-center max-w-xl">Discover, search, and save your favorite recipes from around the world. Start your culinary journey now!</p>
        <div className="w-full max-w-md">
          {/* Search bar section (copied from previous search bar) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-2 relative">
            <div className="w-full sm:w-80 relative" ref={searchBoxRef}>
              <input
                type="text"
                placeholder="Search by dish name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 120)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchRecipes();
                  }
                }}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg bg-white"
              />
              {searchHistory.length > 0 && isSearchFocused && (
                <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow z-30 max-h-48 overflow-y-auto">
                  <div className="flex justify-between items-center px-3 py-1">
                    <span className="text-xs text-gray-400">Recent Searches</span>
                    <button onClick={clearHistory} className="text-xs text-red-400 hover:underline">Clear</button>
                  </div>
                  {searchHistory.map((term, idx) => (
                    <button
                      key={term + idx}
                      className="w-full text-left px-4 py-2 hover:bg-purple-50 text-gray-700 text-sm"
                      onClick={() => {
                        setQuery(term);
                        setIsSearchFocused(false);
                        setTimeout(() => {
                          searchBoxRef.current.querySelector("input")?.focus();
                          searchRecipes(term);
                          resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
                        }, 0);
                      }}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => searchRecipes()}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold shadow-md hover:from-purple-600 hover:to-blue-600 transition-colors duration-200"
            >
              Search
            </button>
          </div>
        </div>
      </header>
      {/* Featured Recipes Section */}
      <section className="w-full max-w-6xl mx-auto py-8 px-4">
        <h2 className="text-2xl font-serif font-bold mb-4 text-gray-800">Featured Recipes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredRecipes && featuredRecipes.length > 0 ? (
            featuredRecipes.map((recipe) => (
              <div key={recipe.idMeal} onClick={() => { setSelectedRecipe(recipe); setModalOpen(true); }} className="cursor-pointer">
                <RecipeCard recipe={recipe} />
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-lg text-gray-500">No featured recipes.</p>
          )}
        </div>
      </section>
      {/* Main Recipes Grid */}
      <main className="flex-1 w-full max-w-7xl mx-auto py-8 px-4">
        <h2 className="text-2xl font-serif font-bold mb-4 text-gray-800">All Recipes</h2>
        <div ref={resultsRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 recipes">
          {recipes.length > 0 ? (
            recipes.slice(0, 12).map((recipe) => (
              <div key={recipe.idMeal} onClick={() => { setSelectedRecipe(recipe); setModalOpen(true); }} className="cursor-pointer">
                <RecipeCard recipe={recipe} />
              </div>
            ))
          ) : (
            <p className="not-found col-span-full text-center text-lg text-gray-500">No recipes found.</p>
          )}
        </div>
        <RecipeModal open={modalOpen} onClose={() => setModalOpen(false)} recipe={selectedRecipe} />
      </main>
      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-200 py-4 mt-8 text-center text-gray-500 text-sm font-serif">
        &copy; {new Date().getFullYear()} Delight Recipe. All rights reserved. Developed by <a href="#" className="text-purple-500 hover:text-purple-600">Shayan Sheikh Team</a>
      </footer>
    </div>
  );
}

export default App;
