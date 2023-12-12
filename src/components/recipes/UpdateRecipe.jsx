import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRecipeById } from "../../managers/RecipeManager";

export const UpdateRecipe = ({ token, fetchCategories, categories }) => {
  const [currentRecipe, setCurrent] = useState({});
  const [chosenCategories, updateCategories] = useState(new Set());
  const [chosenIngredients, updateIngredients] = useState([]);
  const { recipeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getRecipeById(recipeId, token).then((r) => {
      setCurrent(r);
    });
    fetchCategories();
  }, [recipeId, token]);

  useEffect(() => {
    if (currentRecipe.categories && currentRecipe.categories.length) {
      const categoryIds = new Set(currentRecipe.categories.map((c) => c.id));
      updateCategories(categoryIds);
    }
  }, [currentRecipe.categories]);

  useEffect(() => {
    if (
      currentRecipe.ingredient_measurements &&
      currentRecipe.ingredient_measurements.length
    ) {
      updateIngredients(currentRecipe.ingredient_measurements);
    }
  }, [currentRecipe.ingredient_measurements]);

  const displayCategories = () => {
    if (categories && categories.length) {
      return categories.map((c) => (
        <div className="category--container form-check" key={c.id}>
          <input
            className="form-check-input"
            type="checkbox"
            checked={chosenCategories.has(c.id)}
          />
          <label className="form-check-label">{c.label}</label>
        </div>
      ));
    }
  };

  const displayIngredients = () => {
    if (chosenIngredients && chosenIngredients.length) {
      return chosenIngredients.map((i) => (
        <div className="ingredient--container" key={i.id}>
          {i.measurement} {i.ingredient.name}
        </div>
      ));
    }
  };
  return (
    <section className="my-16">
      <div className="flex justify-center">
        <form className="w-3/4">
          <h2 className="text-center">Update Recipe</h2>
          <div className="border-1 rounded-lg my-4 p-4">
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={currentRecipe.title}
                required
                autoFocus
              />
            </div>
            <fieldset className="flex mb-4">
              <fieldset className="w-1/3 mb-3 pr-3">
                <div className="categories--container mb-3">
                  <label className="form-label">Categories</label>
                  {displayCategories()}
                </div>
                <div className="image--container">
                  {currentRecipe.image ? (
                    <figure className="mb-3">
                      <img src={currentRecipe.image} alt="recipe-pic" />
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
                    required
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
                    value={currentRecipe.instructions}
                    rows="10"
                    required
                    autoFocus
                  />
                </div>
              </fieldset>
            </fieldset>
          </div>
          <div className="buttons--container w-3/4">
            <button type="submit" className="btn btn-primary mr-4">
              Submit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => navigate(`/recipes/mine`)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
