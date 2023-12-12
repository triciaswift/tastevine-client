export const RecipeDirections = ({ recipe }) => {
  const displayDirections = () => {
    if (recipe && recipe.instructions) {
      const directions = recipe.instructions;
      const directionsArray = directions.split("\n");

      return directionsArray.map((direction, index) => {
        const instructionWithoutNumber = direction.replace(/^\d+\.\s*/, "");
        return (
          <li className="list-decimal" key={index}>
            {instructionWithoutNumber.trim()}{" "}
            {/* Trim to remove leading/trailing whitespaces */}
          </li>
        );
      });
    }
  };

  return (
    <div className="pl-4">
      <ul>{displayDirections()}</ul>
    </div>
  );
};
