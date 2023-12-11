export const HandleFormattingDirections = (directions) => {
  const formattedDirections = directions
    .split("\n") // Split the text into an array of lines
    .map((line) => line.trim()) // Trim leading and trailing whitespaces from each line
    .filter((line) => line !== "") // Remove empty lines
    .map((line) => line.split(". ").slice(1).join(". ")) // Remove leading numbers and dots
    .join(" | "); // Join the lines with the desired separator

  return formattedDirections;
};
