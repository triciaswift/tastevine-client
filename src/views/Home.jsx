import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Home = ({ userId }) => {
  // State Variables
  const [recipes, setRecipes] = useState([]);
  const [visibleRecipes, setVisibleRecipes] = useState([]);
  const [user, setUser] = useState({});

  // Function to fetch recipes from the server using the API endpoint "/recipes"
  const fetchRecipes = async () => {
    const response = await fetch("http://localhost:8000/recipes", {
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
      },
    });

    const recipes = await response.json();
    setRecipes(recipes);
  };

  // Function to fetch information about the current user using the API endpoint "/users/1"
  const fetchCurrentUser = async () => {
    const response = await fetch(`http://localhost:8000/users/${userId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
      },
    });

    const user = await response.json();
    setUser(user);
  };

  // Use effects to fetch recipes and user information upon initial rendering of the page
  useEffect(() => {
    fetchRecipes();
    fetchCurrentUser();
  }, []);

  // Update the visible recipes in the carousel when the full list of recipes changes
  useEffect(() => {
    setVisibleRecipes(recipes.slice(0, 5));
  }, [recipes]);

  // Use an interval to create a carousel effect with the visible recipes
  useEffect(() => {
    // Set up an interval that executes the carousel logic every 2 seconds setInterval(function, delay)
    const intervalId = setInterval(() => {
      // Use a timeout to delay the carousel logic by 500 milliseconds for a smoother transition setTimeout(function, delay)
      setTimeout(() => {
        // Update the visible recipes by shifting the array to the left
        // prevRecipes = [0,1,2,3,4]
        // ...prevRecipes.slice(1) = 1,2,3,4
        // prevRecipe[0] = 0
        // setVisibleRecipe([1,2,3,4,0])
        setVisibleRecipes((prevRecipes) => [
          ...prevRecipes.slice(1),
          prevRecipes[0],
        ]);
      }, 500);
    }, 2000);
    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [visibleRecipes]);

  // JSX that displays the recipe image with title
  const displayCarousel = () => {
    if (visibleRecipes && recipes.length) {
      return (
        <div className="carousel--container mx-2 w-full md:w-2/3 lg:w-[38rem]">
          {visibleRecipes.map((recipe, index) => (
            <div
              key={index}
              className={`relative ${
                index === visibleRecipes.length - 1 ? "block" : "hidden"
              } pt-8 rounded-lg`}
            >
              <img
                src={recipe.image}
                className="w-full h-auto rounded-xl mx-auto border-2 border-green-800"
                alt={recipe.title}
              />
              <div className="w-2/3 absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 bg-white/70 py-2 px-4 rounded-lg">
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
      <h1 className="mx-1 mb-4">Welcome to Tastevine {user.first_name}!</h1>
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
