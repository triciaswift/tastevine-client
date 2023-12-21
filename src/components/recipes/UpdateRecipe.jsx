import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRecipeById, updateRecipe } from "../../managers/RecipeManager";
import { IngredientForm } from "../ingredients/IngredientForm";

export const UpdateRecipe = ({
  token,
  fetchCategories,
  categories,
  ingredients,
  fetchIngredients,
}) => {
  const [recipe, setRecipe] = useState({});
  const [chosenCategories, updateCategories] = useState(new Set());
  const [chosenIngredients, updateIngredients] = useState(new Set());
  const [showIngredients, setShowIngredients] = useState(false);

  const { recipeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getRecipeById(recipeId, token).then((r) => {
      setRecipe(r);
    });
    fetchCategories();
    fetchIngredients();
  }, [recipeId, token]);

  useEffect(() => {
    if (recipe) {
      if (recipe.categories) {
        // Create a copy of the chosenCategories set
        const categoriesCopy = new Set(chosenCategories);
        // Iterate through the categories array in recipe state
        for (const categoryObj of recipe.categories) {
          // Add each category id to the copy of the set
          categoriesCopy.add(categoryObj.id);
        }
        updateCategories(categoriesCopy); // Set chosenIngredients state with copy set
      }
      // Check that ingredient measurements array exists and isn't empty
      if (recipe.ingredient_measurements) {
        // Create a copy of chosenIngredients
        const ingredientsCopy = new Set(chosenIngredients);
        // Iterate through the ingredient measurements array in recipe state
        if (ingredientsCopy.size === 0) {
          for (const ingredientObject of recipe.ingredient_measurements) {
            // Create a new object with id, quantity, unit
            const ingredient = {
              id: ingredientObject.ingredient.id,
              quantity: ingredientObject.quantity,
              unit: ingredientObject.unit,
            };
            // check if anything is in set (prevent from double adding)
            if (!ingredientsCopy.has(ingredient.id)) {
              // Add object to ingredientsCopy
              ingredientsCopy.add(ingredient);
            }
          }
        }
        // Set chosenIngredients to ingredientsCopy
        updateIngredients(ingredientsCopy);
      }
    }
  }, [recipe]);

  const changeRecipeState = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleChosenCategory = (category) => {
    const copy = new Set(chosenCategories);
    copy.has(category.id) ? copy.delete(category.id) : copy.add(category.id);
    updateCategories(copy);
  };

  const displayCategories = () => {
    if (categories && categories.length) {
      return categories.map((c) => (
        <div className="category--container form-check" key={c.id}>
          <input
            className="form-check-input"
            type="checkbox"
            checked={chosenCategories.has(c.id)}
            onChange={() => handleChosenCategory(c)}
          />
          <label className="form-check-label">{c.label}</label>
        </div>
      ));
    }
  };

  const displayIngredients = () => {
    if (chosenIngredients.size !== 0) {
      return (
        <>
          {Array.from(chosenIngredients).map((object) => {
            // debugger;
            const matchingIngredient = ingredients.find(
              (ingredient) => ingredient.id === object.id
            );
            return (
              <div className="ingredient--container" key={object.id}>
                {object.quantity} {object.unit} {matchingIngredient?.name}
              </div>
            );
          })}
        </>
      );
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    const updatedRecipe = {
      ...recipe,
      ingredients: Array.from(chosenIngredients),
      categories: Array.from(chosenCategories),
    };
    updateRecipe(updatedRecipe, token).then(() => {
      navigate(`/recipes/details/${recipeId}`);
    });
  };

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const createImageString = (e) => {
    getBase64(e.target.files[0], (base64ImageString) => {
      setRecipe({ ...recipe, [e.target.name]: base64ImageString });
    });
  };

  const handleShowIngredients = () => {
    setShowIngredients(!showIngredients);
  };

  return (
    <section className="my-14">
      <div className="flex flex-col items-center">
        <h1>Update Recipe</h1>
        <form className="w-3/4 bg-white rounded-lg p-8" onSubmit={handleSave}>
          <div className="recipe--card bg-white border-1 rounded-lg my-4 p-4">
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={recipe.title ? recipe.title : ""}
                onChange={changeRecipeState}
                required
                autoFocus
              />
            </div>
            <fieldset className="flex">
              <fieldset className="w-1/3 mb-3 pr-3">
                <div className="categories--container mb-3">
                  <label className="form-label">Categories</label>
                  {displayCategories()}
                </div>
                <div className="image--container">
                  {recipe.image ? (
                    <figure className="mb-3">
                      <img src={recipe.image} alt="recipe-pic" />
                    </figure>
                  ) : (
                    ""
                  )}
                </div>
                <div className="image-upload--container">
                  <label className="form-label">Recipe Image</label>
                  <input
                    className="form-control"
                    type="file"
                    name="image"
                    onChange={(e) => {
                      createImageString(e);
                    }}
                  />
                </div>
              </fieldset>
              <fieldset className="ingredients-and-directions--container flex w-2/3">
                <div className="ingredients--container w-1/3 border-l-2 pl-2 ">
                  <label>Ingredients</label>
                  {displayIngredients()}
                </div>
                <div className="instructions--container w-2/3">
                  <label className="form-label">Instruction</label>
                  <textarea
                    className="form-control"
                    name="instructions"
                    value={recipe.instructions}
                    onChange={changeRecipeState}
                    rows="20"
                    required
                    autoFocus
                  />
                </div>
              </fieldset>
            </fieldset>
            <div className="text-center">
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  handleShowIngredients();
                }}
              >
                Select Ingredients
              </button>
            </div>
          </div>
          <div className="buttons--container w-3/4">
            <button type="submit" className="btn btn-primary mr-4">
              Save
            </button>
            <button
              className="btn btn-danger"
              onClick={() => navigate(`/recipes/details/${recipeId}`)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      {
        <IngredientForm
          ingredients={ingredients}
          chosenIngredients={chosenIngredients}
          updateIngredients={updateIngredients}
          showIngredients={showIngredients}
          token={token}
          fetchIngredients={fetchIngredients}
        />
      }
    </section>
  );
};
