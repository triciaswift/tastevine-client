import { useEffect, useState } from "react";
import { getAllIngredients } from "../../managers/IngredientManager";

export const IngredientList = ({ token, showIngredients }) => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [units, setUnits] = useState([]);

  useEffect(() => {
    getAllIngredients(token).then((ingredientArr) => {
      setIngredients(ingredientArr);
    });
  }, []);

  const handleIngredientSelection = (ingredientId) => {
    setSelectedIngredients((prevSelected) =>
      prevSelected.includes(ingredientId)
        ? prevSelected.filter((id) => id != ingredientId)
        : [...prevSelected, ingredientId]
    );
  };

  const handleQuantityChange = (index, value) => {
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] = value;
      return newQuantities;
    });
  };

  const handleUnitChange = (index, value) => {
    setUnits((prevUnits) => {
      const newUnits = [...prevUnits];
      newUnits[index] = value;
      return newUnits;
    });
  };

  const handleAddToIngredients = () => {
    const newIngredients = selectedIngredients.map((ingredientId, index) => ({
      ingredient: ingredientId,
      quantity: quantities[index] || "",
      unit: units[index] || "",
    }));

    onIngredientChange(newIngredients);
  };

  const showTable = () => {
    if (ingredients && ingredients.length) {
      return (
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
            {ingredients.map((ingredient, index) => {
              return (
                <tr key={ingredient.id}>
                  <td>
                    <input
                      type="checkbox"
                      name="ingredient"
                      onChange={() => {
                        handleIngredientSelection(ingredient.id);
                      }}
                    />
                  </td>
                  <td>
                    <label>{ingredient.name}</label>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      name="quantity"
                      onChange={(e) =>
                        handleQuantityChange(index, e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      name="unit"
                      onChange={(e) => handleUnitChange(index, e.target.value)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="table--container w-1/2 max-h-96 overflow-y-auto border-1 p-4">
        <div className="flex justify-between items-center mb-2">
          <h4>Ingredient Options</h4>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
        {showTable()}
        <div>
          <button onClick={handleAddToIngredients}>Add Ingredients</button>
        </div>
      </div>
    </div>
  );
};
