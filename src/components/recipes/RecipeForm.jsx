import { useEffect, useState } from "react";
import { createRecipe } from "../../managers/RecipeManager";
import { useNavigate } from "react-router-dom";
import { HandleFormattingDirections } from "../../utils/HandleFormattingDirections";
import { getAllIngredients } from "../../managers/IngredientManager";
import { IngredientForm } from "../ingredients/IngredientForm";

export const RecipeForm = ({ categories, fetchCategories, token }) => {
  const [recipe, setRecipe] = useState({
    title: "",
    instructions: "",
    image: null,
  });
  const [ingredients, setIngredients] = useState([]);
  const [chosenCategories, updateChosenCategories] = useState(new Set());
  const [recipeIngredients, setRecipeIngredients] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    getAllIngredients(token).then((ingredientArr) => {
      setIngredients(ingredientArr);
    });
  }, []);

  const changeRecipeState = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleCategoryChosen = (category) => {
    const copy = new Set(chosenCategories);
    copy.has(category.id) ? copy.delete(category.id) : copy.add(category.id);
    updateChosenCategories(copy);
  };

  const displayCategories = () => {
    if (categories && categories.length) {
      return categories.map((category) => (
        <div className="form-check" key={category.id}>
          <input
            className="form-check-input"
            type="checkbox"
            checked={chosenCategories.has(category.id)}
            onChange={() => handleCategoryChosen(category)}
          />
          <label className="form-check-label" htmlFor="categoryLabel">
            {category.label}
          </label>
        </div>
      ));
    }
  };

  const displayIngredients = () => {
    if (recipeIngredients && recipeIngredients.length) {
      return recipeIngredients.map((obj, index) => {
        const ingredient = ingredients.find(
          (ingredient) => ingredient.id === obj.ingredient
        );

        const ingredientName = ingredient ? ingredient.name : "";

        return (
          <div key={index}>
            {ingredientName === "" ? (
              <div className="text-[#aaa] italic mt-2">
                {`1 tsp ingredient`}
                <br />
                {`1 1/2 c ingredient`}
                <br />
                {`1 minced ingredient`}
              </div>
            ) : (
              <div>
                {obj.quantity} {obj.unit} {ingredientName}
              </div>
            )}
          </div>
        );
      });
    }
    return (
      // eslint-disable-next-line react/no-unescaped-entities
      <div>Click the "Select Ingredients" button to add ingredients here.</div>
    );
  };

  const handleSave = (e) => {
    e.preventDefault();

    const formattedDirections = HandleFormattingDirections(recipe.instructions);

    const newRecipe = {
      ...recipe,
      instructions: formattedDirections,
      ingredients: recipeIngredients,
      categories: Array.from(chosenCategories),
    };
    createRecipe(newRecipe, token).then((recipeObj) => {
      navigate(`/recipes/details/${recipeObj["id"]}`);
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

  return (
    <section className="my-16">
      <div className="flex justify-center">
        <form className="w-3/4" onSubmit={handleSave}>
          <h2 className="text-center">New Recipe</h2>
          <div className="border-1 rounded-lg my-4 p-4">
            <div className="mb-3">
              <label htmlFor="recipeTitle" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="Recipe Title"
                value={recipe.title}
                onChange={changeRecipeState}
                required
                autoFocus
              />
            </div>
            <fieldset className="flex mb-4">
              <fieldset className="w-1/3 mb-3 pr-3">
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
                    Upload Recipe Image
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    name="image"
                    onChange={(e) => {
                      createImageString(e);
                    }}
                    required
                  />
                </div>
              </fieldset>
              <fieldset className="flex w-2/3">
                <div className="w-1/3 border-l-2 pl-2">
                  <label>Ingredients</label>
                  {displayIngredients()}
                </div>
                <div className="w-2/3">
                  <label htmlFor="recipeInstructions" className="form-label">
                    Instructions
                  </label>
                  <textarea
                    className="form-control"
                    name="instructions"
                    placeholder={`1. First instruction\n2. Second instruction\netc.`}
                    value={recipe.instructions}
                    onChange={changeRecipeState}
                    rows="10"
                    required
                    autoFocus
                  ></textarea>
                </div>
              </fieldset>
            </fieldset>
          </div>
          <div className="w-3/4">
            <button type="submit" className="btn btn-primary mr-4">
              Submit
            </button>
            <button type="submit" className="btn btn-danger">
              Cancel
            </button>
          </div>
        </form>
      </div>
      {
        <IngredientForm
          setRecipeIngredients={setRecipeIngredients}
          ingredients={ingredients}
        />
      }
    </section>
  );
};
