import { IngredientItem } from "./IngredientItem";

export const IngredientsList = ({
  chosenIngredients,
  updateIngredients,
  filteredIngredients,
}) => {
  return (
    <div className="table--container max-h-[22rem] overflow-y-auto border-1 px-4 py-1 rounded-md bg-white">
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
                    updateIngredients={updateIngredients}
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
