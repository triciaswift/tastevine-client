import { useEffect, useState } from "react";
import { IngredientsList } from "./IngredientsList";

export const IngredientForm = ({ setRecipeIngredients, ingredients }) => {
  const [showIngredients, setShowIngredients] = useState(false);
  const [chosenIngredients, updateChosenIngredients] = useState(new Set());
  const [measurements, setMeasurements] = useState({});
  const [showEdit, setEdit] = useState(false);
  const [filteredIngredients, setFiltered] = useState([]);
  const [searchIngredient, setSearch] = useState("");

  useEffect(() => {
    const foundIngredients = ingredients.filter((ingredient) =>
      ingredient.name.toLowerCase().includes(searchIngredient.toLowerCase())
    );
    setFiltered(foundIngredients);
  }, [ingredients, searchIngredient]);

  const handleShowIngredients = () => {
    setShowIngredients(!showIngredients);
  };

  const createCombinedArray = () => {
    const combinedArray = Array.from(chosenIngredients).map((ingredientId) => {
      return {
        ingredient: ingredientId,
        quantity: measurements[ingredientId]?.quantity || "",
        unit: measurements[ingredientId]?.unit || "",
      };
    });
    setRecipeIngredients(combinedArray);
  };

  return (
    <>
      <div className="text-center">
        <button
          className="btn btn-info"
          onClick={() => {
            handleShowIngredients();
          }}
        >
          Select Ingredients
        </button>
      </div>
      <div className="flex justify-center">
        {showIngredients ? (
          <div className="flex flex-col justify-center mt-10">
            <h4 className="text-center">Ingredient Options</h4>
            <div className="flex justify-between items-center mb-2">
              <div>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}
                />
              </div>
              {showEdit ? (
                <div>
                  <label className="mr-2">Edit Ingredients</label>
                  <button onClick={() => createCombinedArray()}>
                    <i className="fa-solid fa-gear fa-2xl"></i>
                  </button>
                </div>
              ) : (
                <div>
                  <label className="mr-2">Add Ingredients to Recipe</label>
                  <button
                    onClick={() => {
                      createCombinedArray();
                      setEdit(true);
                    }}
                  >
                    <i className="fa-solid fa-plus fa-2xl"></i>
                  </button>
                </div>
              )}
            </div>
            <IngredientsList
              chosenIngredients={chosenIngredients}
              updateChosenIngredients={updateChosenIngredients}
              setMeasurements={setMeasurements}
              measurements={measurements}
              filteredIngredients={filteredIngredients}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
