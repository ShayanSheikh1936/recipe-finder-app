<<<<<<< HEAD
import React, { useState, useEffect } from "react";

function RecipeCard({ recipe }) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Check favorite state on mount
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favoriteRecipes") || "[]");
    setIsFavorite(favs.includes(recipe.idMeal));
  }, [recipe.idMeal]);

  // Toggle favorite and persist
  const handleFavorite = (e) => {
    e.stopPropagation(); // Prevent card click
    const favs = JSON.parse(localStorage.getItem("favoriteRecipes") || "[]");
    let updated;
    if (favs.includes(recipe.idMeal)) {
      updated = favs.filter((id) => id !== recipe.idMeal);
      setIsFavorite(false);
    } else {
      updated = [...favs, recipe.idMeal];
      setIsFavorite(true);
    }
    localStorage.setItem("favoriteRecipes", JSON.stringify(updated));
  };

  // Collect up to 4 main ingredients
  const ingredients = [];
  for (let i = 1; i <= 4; i++) {
    const ing = recipe[`strIngredient${i}`];
    if (ing) ingredients.push(ing);
  }
  return (
    <div className="group bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-purple-400 transition-all duration-300 flex flex-col items-stretch overflow-hidden relative">
     
      <div className="relative">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-40 object-cover object-center bg-gray-100"
        />
        <button
          className={`absolute top-3 right-3 text-xl transition-colors z-10 bg-white/80 rounded-full p-1 shadow ${isFavorite ? 'text-red-500' : 'text-gray-300 group-hover:text-red-500'}`}
          title={isFavorite ? "Unfavorite" : "Favorite"}
          onClick={handleFavorite}
        >
          {isFavorite ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.682l-7.682-7.682a4.5 4.5 0 010-6.364z" />
            </svg>
          )}
        </button>
      </div>
      {/* Card body */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-1 text-center line-clamp-2 min-h-[2.5rem]">{recipe.strMeal}</h3>
        <div className="flex flex-wrap justify-center gap-2 mb-2">
          {recipe.strCategory && (
            <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">{recipe.strCategory}</span>
          )}
          {recipe.strArea && (
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">{recipe.strArea}</span>
          )}
          {recipe.strTags && recipe.strTags.split(",").slice(0,2).map((tag) => (
            <span key={tag} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">{tag}</span>
          ))}
        </div>
        <div className="flex flex-wrap gap-1 justify-center mb-3">
          {ingredients.map((ing) => (
            <span key={ing} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">{ing}</span>
          ))}
        </div>
        <hr className="my-2 border-gray-200" />
        <div className="flex gap-2 mt-2 justify-center">
          <a
            href={recipe.strSource || recipe.strYoutube}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold shadow hover:from-purple-600 hover:to-blue-600 transition-colors duration-200 text-sm"
          >
            View Recipe
          </a>
        </div>
      </div>
=======
import React from "react";

function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h3>{recipe.strMeal}</h3>
      <a href={recipe.strSource || recipe.strYoutube} target="_blank" rel="noreferrer">
        View Recipe
      </a>
>>>>>>> 713dca0df01fb7d97cdec6ea3cbbc84130f4c7b0
    </div>
  );
}

export default RecipeCard;
