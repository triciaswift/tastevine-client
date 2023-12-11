import { IngredientsList } from "./IngredientsList";

export const IngredientsTable = ({
  chosenIngredients,
  updateChosenIngredients,
  filteredIngredients,
}) => {
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
          <IngredientsList
            chosenIngredients={chosenIngredients}
            filteredIngredients={filteredIngredients}
            updateChosenIngredients={updateChosenIngredients}
          />
        }
      </table>
    </div>
  );
};
