import { IngredientItem } from "./IngredientItem";

export const IngredientsList = ({
  chosenIngredients,
  updateChosenIngredients,
  setMeasurements,
  measurements,
  filteredIngredients,
}) => {
  const handleChosenIngredients = (ingredient) => {
    const copy = new Set(chosenIngredients);
    if (copy.has(ingredient.id)) {
      copy.delete(ingredient.id);
      // Setting a specific property
      setMeasurements({
        ...measurements,
        [ingredient.id]: { quantity: "", unit: "" },
      });
    } else {
      copy.add(ingredient.id);
    }
    updateChosenIngredients(copy);
  };

  const handleMeasurementChange = (ingredientId, e) => {
    // Updating a nested property
    setMeasurements({
      ...measurements,
      [ingredientId]: {
        ...measurements[ingredientId],
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <div className="table--container max-h-96 overflow-y-auto border-1 p-4">
      <table className="table w-full">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Ingredient</th>
            <th scope="col">Quantity</th>
            <th scope="col">Unit</th>
          </tr>
        </thead>
        {
          <IngredientItem
            handleMeasurementChange={handleMeasurementChange}
            handleChosenIngredients={handleChosenIngredients}
            chosenIngredients={chosenIngredients}
            measurements={measurements}
            filteredIngredients={filteredIngredients}
          />
        }
      </table>
    </div>
  );
};
