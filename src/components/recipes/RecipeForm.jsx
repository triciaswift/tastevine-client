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
}) => {
  const navigate = useNavigate();

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

  const displayIngredients = () => {
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

  return (
    <div className="flex mb-1">
      <div className="flex flex-col w-[60%]">
        <form onSubmit={handleSave}>
          <div className="recipe-ingredient--container">
            <div className="recipe--card rounded-lg mr-8 flex flex-col justify-between">
              <div className="bg-white rounded-lg px-4 py-8 border-2 border-dashed border-green-700">
                <div className="mb-3">
                  <div>
                    <label htmlFor="recipeTitle" className="form-label">
                      Title
                    </label>
                  </div>
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
                      {displayCategories()}
                    </div>
                    <div>
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
                      <FormInput
                        type="file"
                        onChange={(e) => {
                          createImageString(e);
                        }}
                      />
                    </div>
                  </fieldset>
                  <fieldset className="flex w-2/3">
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
