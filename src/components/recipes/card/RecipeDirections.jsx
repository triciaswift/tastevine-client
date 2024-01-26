export const RecipeDirections = ({ recipe }) => {
  // JSX to display the list of recipe directions
  const displayDirections = () => {
    if (recipe && recipe.instructions) {
      // Split the instructions into an array based on newline characters "/n"
      const directions = recipe.instructions;
      const directionsArray = directions.split("\n");

      // Map through the array to display each direction as a list item
      return directionsArray.map((direction, index) => {
        // Remove the numeric prefix and trim leading/trailing whitespace
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

  // JSX to display the list of directions inside an unordered list
  return (
    <div className="pl-4">
      <ul>{displayDirections()}</ul>
    </div>
  );
};
