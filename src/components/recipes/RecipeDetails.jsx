import { useEffect, useState } from "react";
import { deleteRecipe, getRecipeById } from "../../managers/RecipeManager";
import { useNavigate, useParams } from "react-router-dom";
import { RecipeIngredients } from "./RecipeIngredients";
import { RecipeDirections } from "./RecipeDirections";

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
          <div className="details--container flex justify-between p-2">
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
                  <i
                    className="icon fa-solid fa-gear fa-xl hover:text-yellow-500 cursor-pointer"
                    onClick={() => navigate(`/recipes/update/${recipeId}`)}
                  ></i>
                </div>
                <div className="ml-1">
                  <i
                    className="icon fa-solid fa-trash fa-xl hover:text-red-500 cursor-pointer"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteModal"
                    type="button"
                  ></i>
                </div>
              </div>
            ) : (
              ""
            )}
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
          displayRecipe()
        ) : (
          <div className="border-1 border-t-transparent">
            {recipe.image ? (
              <img
                src={recipe.image}
                className="img-fluid"
                alt={recipe.title}
              />
            ) : (
              ""
            )}
          </div>
        )}
      </div>
      {displayCategories()}
    </section>
  );
};
