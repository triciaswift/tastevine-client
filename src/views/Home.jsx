import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Home = ({ userId }) => {
  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState({});

  const fetchRecipes = async () => {
    const response = await fetch(
      "https://starfish-app-x978m.ondigitalocean.app/recipes",
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
      }
    );

    const recipes = await response.json();
    setRecipes(recipes);
  };

  const fetchCurrentUser = async () => {
    const response = await fetch(
      `https://starfish-app-x978m.ondigitalocean.app/users/${userId}`,
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
      }
    );

    const user = await response.json();
    setUser(user);
  };

  useEffect(() => {
    fetchRecipes();
    fetchCurrentUser();
  }, []);

  const displayCarousel = () => {
    if (recipes && recipes.length) {
      return (
        <div
          id="recipeCarousel"
          className="carousel carousel-dark slide carousel-fade w-[50rem] h-auto"
          data-bs-ride="carousel"
          data-bs-interval="3000"
        >
          <div className="carousel-inner">
            {recipes.slice(0, 5).map((recipe, index) => (
              <div
                key={index}
                className={`carousel-item ${
                  index === 0 ? "active" : ""
                } pt-8 rounded-lg`}
              >
                <img
                  src={recipe.image}
                  className="d-block w-[75%] rounded-xl mx-auto border-2 border-green-800"
                  alt={recipe.title}
                />
                <div className="carousel-caption d-none d-md-block bg-white/70 rounded-xl mx-[3rem] py-2">
                  <h3>{recipe.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#recipeCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#recipeCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      );
    }
  };

  return (
    <section>
      <h1 className="mb-4">Welcome to Tastevine {user.first_name}!</h1>
      <h4 className="text-center">
        <Link
          className="underline hover:text-blue-600 visited:text-black"
          to={`/recipes/all`}
        >
          Browse Recipes
        </Link>
      </h4>
      <div className="flex justify-center">{displayCarousel()}</div>
    </section>
  );
};
