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
  const [recipe, setRecipe] = useState({
    title: "",
    instructions: "",
    image: null,
  });
  const [chosenCategories, updateCategories] = useState(new Set());
  const [chosenIngredients, updateIngredients] = useState(new Set());
  const [isEditing, setEditingState] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchIngredients();
    setEditingState(false);
  }, []);

  const handleSave = (e) => {
    e.preventDefault();

    const newRecipe = {
      ...recipe,
      ingredients: Array.from(chosenIngredients),
      categories: Array.from(chosenCategories),
    };
    createRecipe(newRecipe, token).then((recipeObj) => {
      navigate(`/recipes/details/${recipeObj["id"]}`);
    });
  };

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
