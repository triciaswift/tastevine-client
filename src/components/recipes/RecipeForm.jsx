import { useNavigate } from "react-router-dom";
import { IngredientForm } from "../ingredients/IngredientForm";
import { FormInput } from "../../utils/FormInput";

export const RecipeForm = ({
  categories,
  token,
  ingredients,
  fetchIngredients,
  recipe,
  setRecipe,
  chosenCategories,
  updateCategories,
  chosenIngredients,
  updateIngredients,
  handleSave,
  isEditing,
}) => {
  const navigate = useNavigate();

  // Function handles the change of the recipe state
  const changeRecipeState = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  // Function handles choosing/unchoosing of a category
  const handleChosenCategory = (category) => {
    const copy = new Set(chosenCategories);
    copy.has(category.id) ? copy.delete(category.id) : copy.add(category.id);
    updateCategories(copy);
  };

  // JSX to display categories list as checkboxes
  const displayCategories = () => {
    if (categories && categories.length) {
      return categories.map((category) => (
        <div className="form-check" key={category.id}>
          <FormInput
            type="checkbox"
            checked={chosenCategories.has(category.id)}
            onChange={() => handleChosenCategory(category)}
          />
          <label className="form-check-label" htmlFor="categoryLabel">
            {category.label}
          </label>
        </div>
      ));
    }
  };

  // JSX to display the chosen ingredients
  const displayIngredients = () => {
    // Checks if any ingredients have been chosen
    if (chosenIngredients.size !== 0) {
      return (
        <div>
          {Array.from(chosenIngredients).map((object) => {
            const matchingIngredient = ingredients.find(
              (ingredient) => ingredient.id === object.id
            );
            return (
              <div className="ingredient--container" key={object.id}>
                {object.quantity} {object.unit} {matchingIngredient?.name}
              </div>
            );
          })}
        </div>
      );
    }
    // Display only if ingredients have not been selected
    return (
      // eslint-disable-next-line react/no-unescaped-entities
      <div>
        <div className="text-[#aaa] italic mt-2">
          {`1 tsp ingredient`}
          <br />
          {`1 1/2 c ingredient`}
          <br />
          {`1 minced ingredient`}
        </div>
      </div>
    );
  };

  // Convert image file to base64 string
  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  // Handle creating an image string from the selected file
  const createImageString = (e) => {
    getBase64(e.target.files[0], (base64ImageString) => {
      setRecipe({ ...recipe, [e.target.name]: base64ImageString });
    });
  };

  // JSX to display the recipe form
  return (
    <div className="flex mb-1">
      <div className="flex flex-col w-[60%]">
        {/* Recipe Form */}
        <form onSubmit={handleSave}>
          <div className="recipe-ingredient--container">
            <div className="recipe--card rounded-lg mr-8 flex flex-col justify-between">
              {/* Recipe card with form inputs */}
              <div className="bg-white rounded-lg px-4 py-8 border-2 border-dashed border-green-700">
                <div className="mb-3">
                  <div>
                    <label htmlFor="recipeTitle" className="form-label">
                      Title
                    </label>
                  </div>
                  {/* Title Input */}
                  <input
                    type="text"
                    className="form-control focus:ring-4 focus:ring-green-700/40 focus:border focus:border-green-700"
                    name="title"
                    placeholder="Recipe Title"
                    value={recipe.title}
                    onChange={changeRecipeState}
                    required
                    autoFocus
                  />
                </div>
                <fieldset className="flex">
                  <fieldset className="w-1/3 pr-3">
                    <div className="mb-3">
                      <label className="form-label">Categories</label>
                      {/* Category checkboxes */}
                      {displayCategories()}
                    </div>
                    <div>
                      {/* Recipe image if exists otherwise "" */}
                      {recipe.image ? (
                        <figure className="mb-3">
                          <img src={recipe.image} alt="recipe-pic" />
                        </figure>
                      ) : (
                        ""
                      )}
                    </div>
                    <div>
                      <label htmlFor="formFile" className="form-label">
                        Recipe Image
                      </label>
                      {isEditing ? (
                        // Display file input for editing
                        <FormInput
                          type="file"
                          onChange={(e) => {
                            createImageString(e);
                          }}
                        />
                      ) : (
                        // Display file input for creation
                        <input
                          type="file"
                          name="image"
                          onChange={(e) => {
                            createImageString(e);
                          }}
                          className="form-control form-control-sm focus:ring-4 focus:ring-green-700/40 focus:border focus:border-green-700"
                          required
                        />
                      )}
                    </div>
                  </fieldset>
                  <fieldset className="flex w-2/3">
                    {/* Ingredients and Directions inputs */}
                    <div className="ingredients--container w-1/3 border-l-2 pl-2">
                      <label className="mb-2">Ingredients</label>
                      {displayIngredients()}
                    </div>
                    <div className="instructions--container w-2/3">
                      <label
                        htmlFor="recipeInstructions"
                        className="form-label"
                      >
                        Directions
                      </label>
                      {/* Direction Input */}
                      <textarea
                        className="form-control focus:ring-4 focus:ring-green-700/40 focus:border focus:border-green-700"
                        name="instructions"
                        placeholder={`1. First instruction\n2. Second instruction\netc.`}
                        value={recipe.instructions}
                        onChange={changeRecipeState}
                        rows="12"
                        required
                      ></textarea>
                    </div>
                  </fieldset>
                </fieldset>
              </div>
            </div>
          </div>
          {/* Save/Cancel Buttons */}
          <div className="mt-2">
            <button type="submit" className="btn btn-success mr-4">
              Save
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => navigate(`/recipes/mine`)}
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
          token={token}
          fetchIngredients={fetchIngredients}
        />
      }
    </div>
  );
};
