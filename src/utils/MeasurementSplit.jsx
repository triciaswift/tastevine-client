export const MeasurementSplit = (string) => {
  // Regular expression to match quantity and unit
  const quantityUnitRegex = /^(\d+(\s+\d+\/\d+)?)\s+(.+)/;

  const match = string.match(quantityUnitRegex);

  let quantity, unit;

  if (match) {
    quantity = match[1];
    unit = match[3];
  } else {
    quantity = string.trim();
    unit = "";
  }

  return { quantity, unit };
};
