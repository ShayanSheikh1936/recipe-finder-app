import React, { useEffect, useRef } from "react";

function RecipeModal({ open, onClose, recipe }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open || !recipe) return null;

  // Collect all ingredients and measures
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ing && ing.trim()) ingredients.push(`${measure ? measure : ''} ${ing}`.trim());
  }

  // Overlay click handler: only close if click is on overlay, not modal
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-2 sm:px-4" onClick={handleOverlayClick}>
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn pointer-events-none"
        aria-hidden="true"
      />
      {/* Modal */}
      <div
        ref={modalRef}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md md:max-w-lg mx-auto p-3 sm:p-6 z-10 animate-slideIn max-h-[90vh] overflow-y-auto pointer-events-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Improved Close Button */}
        <button
          className="absolute top-2 right-2 sm:top-3 sm:right-3 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 text-gray-500 hover:text-red-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400 text-2xl font-bold z-20 transition"
          onClick={onClose}
          aria-label="Close recipe details"
          tabIndex={0}
        >
          <span aria-hidden="true">×</span>
        </button>
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-40 sm:h-48 object-cover rounded-xl mb-4"
        />
        <h2 className="text-2xl font-bold mb-2 text-center">{recipe.strMeal}</h2>
        <div className="flex flex-wrap justify-center gap-2 mb-2">
          {recipe.strCategory && (
            <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">{recipe.strCategory}</span>
          )}
          {recipe.strArea && (
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">{recipe.strArea}</span>
          )}
          {recipe.strTags && recipe.strTags.split(",").map((tag) => (
            <span key={tag} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">{tag}</span>
          ))}
        </div>
        <h3 className="font-semibold mt-4 mb-1">Ingredients</h3>
        <ul className="list-disc list-inside text-sm mb-3 max-h-32 overflow-y-auto">
          {ingredients.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
        <h3 className="font-semibold mb-1">Instructions</h3>
        <div className="text-sm text-gray-700 max-h-40 overflow-y-auto whitespace-pre-line mb-2">
          {recipe.strInstructions}
        </div>
        {recipe.strYoutube && (
          <a
            href={recipe.strYoutube}
            target="_blank"
            rel="noreferrer"
            className="block mt-2 text-blue-600 hover:underline text-center"
          >
            Watch on YouTube
          </a>
        )}
      </div>
      {/* Animations */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.3s; }
        @keyframes slideIn { from { transform: translateY(40px); opacity: 0; } to { transform: none; opacity: 1; } }
        .animate-slideIn { animation: slideIn 0.4s cubic-bezier(.4,2,.6,1) both; }
      `}</style>
    </div>
  );
}

export default RecipeModal; 