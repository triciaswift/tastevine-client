import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRecipeById, updateRecipe } from "../../managers/RecipeManager";
import { RecipeForm } from "./RecipeForm";

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
  const [isEditing, setEditingState] = useState("");

  const { recipeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getRecipeById(recipeId, token).then((r) => {
      setRecipe(r);
    });
    fetchCategories();
    fetchIngredients();
    setEditingState(true);
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

  const handleSave = (e) => {
    e.preventDefault();

    const updatedRecipe = {
      ...recipe,
      ingredients: Array.from(chosenIngredients),
      categories: Array.from(chosenCategories),
    };

    try {
      updateRecipe(updatedRecipe, token).then(() => {
        navigate(`/recipes/details/${recipeId}`);
      });
    } catch (error) {
      navigate(`/recipes/details/${recipeId}`);
    }
  };

  return (
    <section className="mx-4">
      <h1>Update Recipe</h1>
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
        setEditingState={setEditingState}
      />
    </section>
  );
};
