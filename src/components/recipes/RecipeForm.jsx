import { useEffect, useState } from "react";
import { createRecipe } from "../../managers/RecipeManager";
import { useNavigate } from "react-router-dom";
import { IngredientList } from "../ingredients/IngredientsList";

export const RecipeForm = ({ categories, fetchCategories, token }) => {
  const [recipe, setRecipe] = useState({
    title: "Better than Olive Garden Fettuccine Alfredo",
    instructions:
      "1. Melt butter just under medium heat. Add minced garlic and cook for 3 minutes. Stir often and make sure the garlic doesn't brown.\n2. Add heavy whipping cream. Whisk until the butter and cream come together. It will seem like they repel each other but keep whisking.\n3. Once blended let thicken for about 10 minutes. Whisking often. Add grated parmesan cheese and black pepper. Whisk and let cook until all the cheese has melted, about 5 minutes.\n4. Prepare fettuccini noodles to al dente, strain and serve.",
    image: null,
    ingredients: [
      {
        ingredient: 23,
        quantity: "8",
        unit: "tbsp",
      },
      {
        ingredient: 39,
        quantity: "3",
        unit: "cloves minced",
      },
      {
        ingredient: 48,
        quantity: "1 1/2",
        unit: "c",
      },
      {
        ingredient: 45,
        quantity: "2",
        unit: "c",
      },
      {
        ingredient: 41,
        quantity: "1/2",
        unit: "tsp",
      },
    ],
    categories: [5],
  });
  const [showIngredients, setShowIngredients] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const changeRecipeState = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
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

  const displayCategories = () => {
    if (categories && categories.length) {
      return categories.map((category) => (
        <div className="form-check" key={category.id}>
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            name=""
          />
          <label className="form-check-label" htmlFor="categoryLabel">
            {category.label}
          </label>
        </div>
      ));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const formattedDirections = handleFormattingDirections(recipe.instructions);

    let newRecipe = {
      title: recipe.title,
      image: recipe.image,
      instructions: formattedDirections,
      ingredients: recipe.ingredients,
      categories: recipe.categories,
    };

    createRecipe(newRecipe, token).then((recipeObj) => {
      navigate(`/recipes/details/${recipeObj["id"]}`);
    });
  };

  const handleFormattingDirections = (directions) => {
    const formattedDirections = directions
      .split("\n") // Split the text into an array of lines
      .map((line) => line.trim()) // Trim leading and trailing whitespaces from each line
      .filter((line) => line !== "") // Remove empty lines
      .map((line) => line.split(". ").slice(1).join(". ")) // Remove leading numbers and dots
      .join(" | "); // Join the lines with the desired separator

    return formattedDirections;
  };

  const handleShowIngredients = () => {
    setShowIngredients(!showIngredients);
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
                value={recipe.title}
                onChange={changeRecipeState}
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
                    onChange={createImageString}
                  />
                </div>
              </fieldset>
              <fieldset className="flex w-2/3">
                <div className="w-1/3 border-l-2 pl-2">
                  <label>Ingredients</label>
                  {/* {<RecipeIngredients recipe={recipe} />} */}
                </div>
                <div className="w-2/3">
                  <label htmlFor="recipeInstructions" className="form-label">
                    Instructions
                  </label>
                  <textarea
                    className="form-control"
                    name="instructions"
                    value={recipe.instructions}
                    onChange={changeRecipeState}
                    rows="10"
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
      <div className="text-center">
        <button
          className="btn btn-info"
          onClick={() => {
            handleShowIngredients();
          }}
        >
          Select Ingredients
        </button>
      </div>
      <div className="flex justify-center"></div>
      {<IngredientList token={token} showIngredients={handleShowIngredients} />}
    </section>
  );
};
