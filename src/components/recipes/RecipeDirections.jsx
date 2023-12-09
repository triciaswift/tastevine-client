export const RecipeDirections = ({ recipe }) => {
  const displayDirections = () => {
    if (recipe && recipe.instructions) {
      const directions = recipe.instructions;
      const directionsArray = directions.split(" | ");

      return directionsArray.map((direction, index) => (
        <li className="list-decimal" key={index}>
          {direction}
        </li>
      ));
    }
  };

  return (
    <div className="pl-4">
      <ol>{displayDirections()}</ol>
    </div>
  );
};
