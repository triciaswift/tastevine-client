import { IngredientItem } from "./IngredientItem";

export const IngredientsList = ({
  chosenIngredients,
  updateIngredients,
  filteredIngredients,
}) => {
  // JSX to display the ingredient list table
  return (
    <div className="table--container flex flex-row justify-start grow overflow-auto border-1 px-4 py-1 rounded-md bg-white">
      <div className="flex grow max-h-[5rem]">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="w-[2%]" scope="col"></th>
              <th className="w-[50%]" scope="col">
                Ingredient
              </th>
              <th className="w-[24%]" scope="col">
                Quantity
              </th>
              <th className="w-[24%]" scope="col">
                Unit
              </th>
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
    </div>
  );
};
