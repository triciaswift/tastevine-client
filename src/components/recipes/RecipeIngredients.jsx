/* eslint-disable react/prop-types */
export const RecipeIngredients = ({ recipe }) => {
  const displayIngredients = () => {
    if (recipe && recipe.recipe_ingredient) {
      return recipe.recipe_ingredient.map((ingredient) => (
        <li className="list-none" key={ingredient.id}>
          {ingredient.measurement}
        </li>
      ));
    }
  };

  return <ul>{displayIngredients()}</ul>;
};
