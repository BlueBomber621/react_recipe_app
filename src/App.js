import { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";

const API = process.env.REACT_APP_API; //getting environment variable

function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("pasta");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API}&query=${query}&number=4&addRecipeNutrition=true&fillIngredients=true`
      );
      const data = await response.json();
      setRecipes(data.results);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  if (recipes.length < 1) {
    return (
      <div className="app-base">
        <form onSubmit={getSearch} className="search-area">
          <input
            type="text"
            className="search-bar"
            value={search}
            onChange={updateSearch}
            placeholder="Search for a Recipe"
          />
          <button type="submit" className="search-btn">
            Submit
          </button>
        </form>
        <div className="recipes">
          <h2>Sad, no recipes</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="app-base">
      <form onSubmit={getSearch} className="search-area" name="serachForm">
        <input
          type="text"
          className="search-bar"
          value={search}
          onChange={updateSearch}
          placeholder="Search for a Recipe"
        />
        <button type="submit" className="search-btn">
          Submit
        </button>
      </form>
      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.id}
            title={recipe.title}
            image={recipe.image}
            ingredients={recipe.extendedIngredients}
            servings={recipe.servings}
            summary={recipe.summary}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
