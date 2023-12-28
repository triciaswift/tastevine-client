import { FormInput } from "../../../utils/FormInput";

export const RecipeIngredients = ({
  recipe,
  chosenIngredients,
  updateIngredients,
}) => {
  const handleChosenIngredient = (ingredient) => {
    const copy = new Set(chosenIngredients);
    copy.has(ingredient.id)
      ? copy.delete(ingredient.id)
      : copy.add(ingredient.id);
    updateIngredients(copy);
  };

  const displayIngredients = () => {
    if (recipe && recipe.ingredient_measurements) {
      return recipe.ingredient_measurements.map((ingredient) => (
        <div className="form-check" key={ingredient.id}>
          <FormInput
            type="checkbox"
            className="form-check-input"
            checked={chosenIngredients.has(ingredient.id)}
            onChange={() => handleChosenIngredient(ingredient)}
          />
          <label className="form-check-label">{ingredient.measurement}</label>
        </div>
      ));
    }
  };

  return <ul>{displayIngredients()}</ul>;
};
