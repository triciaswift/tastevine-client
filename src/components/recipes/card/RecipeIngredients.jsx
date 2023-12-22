export const RecipeIngredients = ({ recipe }) => {
  const displayIngredients = () => {
    if (recipe && recipe.ingredient_measurements) {
      return recipe.ingredient_measurements.map((ingredient) => (
        <li className="list-none" key={ingredient.id}>
          {ingredient.measurement}
        </li>
      ));
    }
  };

  return <ul>{displayIngredients()}</ul>;
};
