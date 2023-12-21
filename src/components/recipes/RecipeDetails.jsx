import { useEffect, useState } from "react";
import { deleteRecipe, getRecipeById } from "../../managers/RecipeManager";
import { useNavigate, useParams } from "react-router-dom";
import { RecipeIngredients } from "./RecipeIngredients";
import { RecipeDirections } from "./RecipeDirections";
import { FavoriteButton } from "../favorites/FavoriteButton";

export const RecipeDetails = ({ token, userId }) => {
  const [recipe, setRecipe] = useState({});
  const [activeTab, setActiveTab] = useState(0);
  const { recipeId } = useParams();
  const navigate = useNavigate();

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  useEffect(() => {
    getRecipeById(recipeId, token).then((recipeObj) => {
      setRecipe(recipeObj);
    });
  }, [recipeId, token]);

  const displayRecipe = () => {
    if (recipe && recipe.author) {
      return (
        <div className="recipe--content rounded-b-md border-t-transparent px-10 py-2 bg-white">
          <div className="flex justify-end">
            <div>{recipe.publication_date}</div>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-10">
            <div className="ingredient--container">
              <h3 className="pb-3 text-lg">Ingredients</h3>
              {<RecipeIngredients recipe={recipe} />}
            </div>
            <div className="directions--container col-span-3">
              <h3 className="pb-3 text-lg">Directions</h3>
              {<RecipeDirections recipe={recipe} />}
            </div>
          </div>
          <div className="details--container flex justify-between py-2 items-center">
            <div>{recipe.author.first_name}</div>
            {userId === recipe.author.id ? (
              displayButtons()
            ) : (
              <FavoriteButton recipeId={recipeId} token={token} />
            )}
          </div>
        </div>
      );
    }
  };
  const displayButtons = () => {
    if (recipe && recipe.author)
      return (
        <>
          <div className="footer--container flex mb-2">
            <div className="mr-1">
              <i
                className="icon fa-solid fa-pen-to-square fa-lg cursor-pointer"
                onClick={() => navigate(`/recipes/update/${recipeId}`)}
              ></i>
            </div>
            <div className="ml-1">
              <i
                className="icon fa-solid fa-trash fa-lg hcursor-pointer"
                data-bs-toggle="modal"
                data-bs-target="#deleteModal"
                type="button"
              ></i>
            </div>
          </div>
          <div className="modal fade" id="deleteModal" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body text-center">
                  Are you sure you want to delete this recipe?
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      deleteRecipe(token, recipeId).then(() => {
                        navigate(`/recipes/mine`);
                      });
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      );
  };

  const displayCategories = () => {
    if (recipe.categories && recipe.categories.length) {
      return (
        <div className="flex justify-center">
          <div className="flex">
            {recipe.categories.map((category) => {
              return (
                <div
                  className="mx-2 mb-4 bg-cyan-600 text-white rounded-full border-2 border-cyan-600 px-3"
                  key={category.id}
                >
                  {category.label}
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  };

  return (
    <section className="my-20">
      <h1 className="">{recipe.title}</h1>
      {displayCategories()}
      <div className="recipe--container w-[70rem] mx-auto shadow-lg">
        <ul className="nav nav-tabs cursor-pointer">
          <li className="nav-item">
            <a
              className={`nav-link ${
                activeTab === 0 ? "active text-black" : "text-white"
              } text-black bg-cyan-600`}
              onClick={() => handleTabClick(0)}
            >
              Recipe
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                activeTab === 1 ? "active text-black" : "text-white"
              } bg-cyan-600`}
              onClick={() => handleTabClick(1)}
            >
              Image
            </a>
          </li>
        </ul>
        {activeTab === 0 ? (
          displayRecipe()
        ) : (
          <div className=" border-t-transparent bg-white w-full py-6 rounded-b-md">
            {recipe.image ? (
              <img
                src={recipe.image}
                className="border-4 border-cyan-600 rounded-lg w-3/5 h-auto mx-auto shadow"
                alt={recipe.title}
              />
            ) : (
              ""
            )}
          </div>
        )}
      </div>
      {/* {displayButtons()} */}
    </section>
  );
};
