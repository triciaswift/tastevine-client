import { IngredientItem } from "./IngredientItem";

export const IngredientsList = ({
  chosenIngredients,
  filteredIngredients,
  updateChosenIngredients,
}) => {
  const showIngredientsList = () => {
    if (filteredIngredients && filteredIngredients.length) {
      return (
        <tbody>
          {filteredIngredients.map((ingredient) => {
            return (
              <div key={ingredient.id}>
                {
                  <IngredientItem
                    ingredient={ingredient}
                    chosenIngredients={chosenIngredients}
                    updateChosenIngredients={updateChosenIngredients}
                  />
                }
              </div>
            );
          })}
        </tbody>
      );
    }
  };

  return <>{showIngredientsList()}</>;
};
