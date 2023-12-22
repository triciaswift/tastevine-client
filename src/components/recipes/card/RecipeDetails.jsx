import { useEffect, useState } from "react";
import { deleteRecipe, getRecipeById } from "../../../managers/RecipeManager";
import { useNavigate, useParams } from "react-router-dom";
import { RecipeIngredients } from "./RecipeIngredients";
import { RecipeDirections } from "./RecipeDirections";
import { FavoriteButton } from "../../favorites/FavoriteButton";
import { TabContent } from "./TabContent";
import { getNotesByRecipeId } from "../../../managers/NoteManager";

export const RecipeDetails = ({ token, userId }) => {
  const [recipe, setRecipe] = useState({});
  const [activeTab, setActiveTab] = useState(0);
  const [notes, setNotes] = useState([]);
  const { recipeId } = useParams();
  const navigate = useNavigate();

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const fetchNotes = () => {
    getNotesByRecipeId(token, recipeId).then(setNotes);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    getRecipeById(recipeId, token).then((recipeObj) => {
      setRecipe(recipeObj);
    });
  }, [recipeId, token]);

  const displayRecipe = () => {
    if (recipe && recipe.author) {
      return (
        <div className="recipe--content flex items-center rounded-b-md border-t-transparent px-10 py-2 bg-cyan-600 h-full w-full overflow-auto">
          <div className="bg-white py-2 px-4 rounded-md my-4 shadow-lg">
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
              <div>{recipe.author.full_name}</div>
              {userId === recipe.author.id ? (
                displayButtons()
              ) : (
                <FavoriteButton recipeId={recipeId} token={token} />
              )}
            </div>
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
                className="icon fa-solid fa-trash fa-lg cursor-pointer"
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
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
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
    <section className="my-14">
      <h1>{recipe.title}</h1>
      {displayCategories()}
      <TabContent
        displayRecipe={displayRecipe}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
        recipe={recipe}
        token={token}
        userId={userId}
        notes={notes}
        fetchNotes={fetchNotes}
      />
    </section>
  );
};
