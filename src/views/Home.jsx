import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Home = ({ userId }) => {
  const [recipes, setRecipes] = useState([]);
  const [visibleRecipes, setVisibleRecipes] = useState([]);
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

  useEffect(() => {
    setVisibleRecipes(recipes.slice(0, 5));
  }, [recipes]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeout(() => {
        setVisibleRecipes((prevRecipes) => [
          ...prevRecipes.slice(1),
          prevRecipes[0],
        ]);
      }, 500);
    }, 2000);
    return () => clearInterval(intervalId);
  }, [visibleRecipes]);

  const displayCarousel = () => {
    if (visibleRecipes && recipes.length) {
      return (
        <div className="carousel--container mx-auto">
          {visibleRecipes.map((recipe, index) => (
            <div
              key={index}
              className={`relative w-[38rem] ${
                index === visibleRecipes.length - 1 ? "block" : "hidden"
              } pt-8 rounded-lg`}
            >
              <img
                src={recipe.image}
                className="w-full rounded-xl mx-auto border-2 border-green-800"
                alt={recipe.title}
              />
              <div className="w-2/3 absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/70 py-2 px-4 rounded-lg">
                <h3 className="text-center">{recipe.title}</h3>
              </div>
            </div>
          ))}
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
