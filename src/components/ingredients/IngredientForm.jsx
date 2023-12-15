import { useEffect, useState } from "react";
import { IngredientsList } from "./IngredientsList";
import { createIngredient } from "../../managers/IngredientManager";

export const IngredientForm = ({
  ingredients,
  chosenIngredients,
  updateIngredients,
  showIngredients,
  token,
  fetchIngredients,
}) => {
  const [filteredIngredients, setFiltered] = useState([]);
  const [searchIngredient, setSearch] = useState("");
  const [ingredientState, setIngredient] = useState({ name: "" });

  useEffect(() => {
    fetchIngredients();
  }, [ingredientState]);

  useEffect(() => {
    const foundIngredients = ingredients.filter((ingredient) =>
      ingredient.name.toLowerCase().includes(searchIngredient.toLowerCase())
    );
    setFiltered(foundIngredients);
  }, [ingredients, searchIngredient]);

  const handleSave = (e) => {
    e.preventDefault();
    createIngredient(ingredientState, token).then(() => {
      setIngredient({ name: "" });
    });
  };

  const displayIngredientForm = () => {
    return (
      <>
        <button
          type="button"
          className="btn btn-info"
          data-bs-toggle="modal"
          data-bs-target="#formModal"
        >
          Add new ingredient
        </button>
        <div className="modal fade" id="formModal" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title fs-5">New Ingredient</h3>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="col-form-label">Ingredient:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={ingredientState.name}
                      placeholder="Ingredient Name"
                      onChange={(e) =>
                        setIngredient({
                          ...ingredientState,
                          name: e.target.value,
                        })
                      }
                      required
                      autoFocus
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="flex justify-center">
        {showIngredients ? (
          <div className="flex flex-col justify-center mt-10 w-3/4">
            <h4 className="text-center text-xl">Ingredient Options</h4>
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
              <div>{displayIngredientForm()}</div>
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
