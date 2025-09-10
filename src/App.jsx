import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import RecipeCard from "./components/RecipeCard";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchRandomRecipes();
  }, []);

  const fetchRandomRecipes = async () => {
    try {
      const res = await axios.get("https://www.themealdb.com/api/json/v1/1/search.php?f=c");
      setRecipes(res.data.meals || []);
    } catch (err) {
      console.error("Failed to fetch random recipes:", err);
    }
  };

  const searchRecipes = async () => {
    if (!query) return;
    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      setRecipes(res.data.meals || []);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Recipe Finder 🍳</h1>
        <div className="search-bar">
  <input
    type="text"
    placeholder="Search by dish name..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        searchRecipes();
      }
    }}
  />
  <button onClick={searchRecipes}>Search</button>
</div>


        <div className="recipes">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))
          ) : (
            <p className="not-found">No recipes found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
