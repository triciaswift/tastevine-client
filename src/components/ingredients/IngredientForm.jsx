import { useEffect, useState } from "react";
import { IngredientsList } from "./IngredientsList";

export const IngredientForm = ({
  ingredients,
  chosenIngredients,
  updateIngredients,
}) => {
  const [showIngredients, setShowIngredients] = useState(false);
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
          <div className="flex flex-col justify-center mt-10 w-3/4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-center">Ingredient Options</h4>
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
            </div>
            <IngredientsList
              chosenIngredients={chosenIngredients}
              updateIngredients={updateIngredients}
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
