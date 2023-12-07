/* eslint-disable react/prop-types */
export const RecipeDirections = ({ recipe }) => {
  const directions = recipe.instructions;

  const directionsArray = directions?.split(` | `);

  return (
    <div className="pl-4">
      <ol>
        {directionsArray?.map((direction, index) => {
          return (
            <li className="list-decimal" key={index}>
              {direction}
            </li>
          );
        })}
      </ol>
    </div>
  );
};
