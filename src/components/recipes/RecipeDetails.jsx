/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getRecipeById } from "../../managers/RecipeManager";
import { useParams } from "react-router-dom";
import { RecipeIngredients } from "./RecipeIngredients";
import { RecipeDirections } from "./RecipeDirections";

export const RecipeDetails = ({ token, userId }) => {
  const [recipe, setRecipe] = useState({});
  const [activeTab, setActiveTab] = useState(0);
  const { recipeId } = useParams();

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  useEffect(() => {
    getRecipeById(recipeId, token).then((recipeObj) => {
      setRecipe(recipeObj);
    });
  }, [recipeId, token]);

  const displayRecipeCard = () => {
    if (recipe && recipe.author) {
      return (
        <div className="recipe--content border-1 border-t-transparent px-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="ingredient--container my-4">
              <h3 className="pb-3">Ingredients</h3>
              {<RecipeIngredients recipe={recipe} />}
            </div>
            <div className="directions--container col-span-2 my-4">
              <h3 className="pb-3">Directions</h3>
              {<RecipeDirections recipe={recipe} />}
            </div>
          </div>
          <div className="details--container flex justify-between">
            <div>{recipe.author.first_name}</div>
            <div>{recipe.publication_date}</div>
          </div>
        </div>
      );
    }
  };

  const displayCategories = () => {
    if (recipe.categories && recipe.categories.length) {
      return (
        <div className="flex flex-col items-center my-3">
          <div className="flex">
            {recipe.categories.map((category) => {
              return (
                <div className="mx-2 mb-8" key={category.id}>
                  {category.label}
                </div>
              );
            })}
          </div>
          <div>
            {userId === recipe.author.id ? (
              <div className="footer--container flex mb-2">
                <div className="mr-1">
                  <i className="icon fa-solid fa-gear fa-xl hover:text-yellow-500 cursor-pointer"></i>
                </div>
                <div className="ml-1">
                  <i className="icon fa-solid fa-trash fa-xl hover:text-red-500 cursor-pointer"></i>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      );
    }
  };

  return (
    <section className="my-10 mx-72">
      <h2 className="mb-2 text-center">{recipe.title}</h2>
      <div className="recipe--container">
        <ul className="nav nav-tabs cursor-pointer">
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === 0 ? "active" : ""}`}
              onClick={() => handleTabClick(0)}
            >
              Recipe
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === 1 ? "active" : ""}`}
              onClick={() => handleTabClick(1)}
            >
              Image
            </a>
          </li>
        </ul>
        {activeTab === 0 ? (
          displayRecipeCard()
        ) : (
          <div className="border-1 border-t-transparent">Image</div>
        )}
      </div>
      {displayCategories()}
    </section>
  );
};
