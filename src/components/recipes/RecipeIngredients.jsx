/* eslint-disable react/prop-types */
export const RecipeIngredients = ({ recipe }) => {
  return (
    <ul>
      {recipe.recipe_ingredient?.map((ingredient) => {
        return (
          <li className="list-none" key={ingredient.id}>
            {ingredient.measurement}
          </li>
        );
      })}
    </ul>
  );
};
