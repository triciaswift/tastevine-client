import { FormInput } from "../../../utils/FormInput";

export const RecipeIngredients = ({
  recipe,
  chosenIngredients,
  updateIngredients,
}) => {
  // Function handles the toggling of chosen ingredients (checkboxes)
  const handleChosenIngredient = (ingredient) => {
    // Create a copy of chosenIngredients set to modify
    const copy = new Set(chosenIngredients);
    // Toggle the presence of the ingredient in the set
    copy.has(ingredient.id)
      ? copy.delete(ingredient.id)
      : copy.add(ingredient.id);
    // Update the state with the modified set
    updateIngredients(copy);
  };

  // JSX to display the list of ingredients with checkboxes
  const displayIngredients = () => {
    if (recipe && recipe.ingredient_measurements) {
      return recipe.ingredient_measurements.map((ingredient) => (
        <div className="form-check" key={ingredient.id}>
          <FormInput
            type="checkbox"
            checked={chosenIngredients.has(ingredient.ingredient.id)}
            onChange={() => handleChosenIngredient(ingredient.ingredient)}
          />
          <label className="form-check-label">{ingredient.measurement}</label>
        </div>
      ));
    }
  };

  return <ul>{displayIngredients()}</ul>;
};
