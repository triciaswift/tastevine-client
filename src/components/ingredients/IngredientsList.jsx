import { IngredientItem } from "./IngredientItem";

export const IngredientsList = ({
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
        <tbody>
          {filteredIngredients.map((ingredient) => {
            return (
              <tr key={ingredient.id}>
                {
                  <IngredientItem
                    ingredient={ingredient}
                    chosenIngredients={chosenIngredients}
                    updateChosenIngredients={updateChosenIngredients}
                  />
                }
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
