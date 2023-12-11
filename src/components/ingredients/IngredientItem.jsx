export const IngredientItem = ({
  handleMeasurementChange,
  handleChosenIngredients,
  chosenIngredients,
  measurements,
  filteredIngredients,
}) => {
  const showIngredientItem = () => {
    if (filteredIngredients && filteredIngredients.length) {
      return (
        <tbody>
          {filteredIngredients.map((ingredient) => {
            return (
              <tr key={ingredient.id}>
                <td className="align-middle">
                  <input
                    type="checkbox"
                    checked={chosenIngredients.has(ingredient.id)}
                    onChange={() => handleChosenIngredients(ingredient)}
                  />
                </td>
                <td className="align-middle">
                  <label>{ingredient.name}</label>
                </td>
                <td className="align-middle">
                  <input
                    className="form-control"
                    type="text"
                    name="quantity"
                    placeholder="1, 1 1/2, 1/4, etc."
                    value={measurements[ingredient.id]?.quantity || ""}
                    onChange={(e) => handleMeasurementChange(ingredient.id, e)}
                  />
                </td>
                <td className="align-middle">
                  <input
                    className="form-control"
                    type="text"
                    name="unit"
                    placeholder="tsp, tbsp, c, oz, etc"
                    value={measurements[ingredient.id]?.unit || ""}
                    onChange={(e) => handleMeasurementChange(ingredient.id, e)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      );
    }
  };

  return <>{showIngredientItem()}</>;
};
