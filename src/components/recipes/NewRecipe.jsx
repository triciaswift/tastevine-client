import { useEffect, useState } from "react";
import { RecipeForm } from "./RecipeForm";
import { createRecipe } from "../../managers/RecipeManager";
import { useNavigate } from "react-router-dom";

export const NewRecipe = ({
  token,
  fetchCategories,
  categories,
  ingredients,
  fetchIngredients,
}) => {
  // State variables
  const [recipe, setRecipe] = useState({
    title: "",
    instructions: "",
    image: null,
  });
  const [chosenCategories, updateCategories] = useState(new Set());
  const [chosenIngredients, updateIngredients] = useState(new Set());
  const [isEditing, setEditingState] = useState("");
  const navigate = useNavigate();

  // Fetch categories and ingredients on initial rendering of page
  useEffect(() => {
    fetchCategories();
    fetchIngredients();
    setEditingState(false);
  }, []);

  // Function handles the save action when form is submitted
  const handleSave = (e) => {
    e.preventDefault();

    // Create a new recipe object with chosen categories and ingredients
    const newRecipe = {
      ...recipe,
      ingredients: Array.from(chosenIngredients),
      categories: Array.from(chosenCategories),
    };
    createRecipe(newRecipe, token).then((recipeObj) => {
      navigate(`/recipes/details/${recipeObj["id"]}`);
    });
  };

  // JSX to display the page title and recipe form
  return (
    <section className="mx-4">
      <h1>New Recipe</h1>
      <RecipeForm
        categories={categories}
        token={token}
        ingredients={ingredients}
        fetchIngredients={fetchIngredients}
        recipe={recipe}
        setRecipe={setRecipe}
        chosenCategories={chosenCategories}
        updateCategories={updateCategories}
        chosenIngredients={chosenIngredients}
        updateIngredients={updateIngredients}
        handleSave={handleSave}
        isEditing={isEditing}
      />
    </section>
  );
};
