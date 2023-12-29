import { useEffect, useState } from "react";
import { IngredientsList } from "./IngredientsList";
import { createIngredient } from "../../managers/IngredientManager";
import { FormInput } from "../../utils/FormInput";
import { getGroceryCategories } from "../../managers/GroceryListManager";

export const IngredientForm = ({
  ingredients,
  chosenIngredients,
  updateIngredients,
  token,
  fetchIngredients,
}) => {
  const [filteredIngredients, setFiltered] = useState([]);
  const [searchIngredient, setSearch] = useState("");
  const [ingredientState, setIngredient] = useState({
    name: "",
    grocery_category: 0,
  });
  const [groceryCategories, setCategories] = useState([]);

  const getIngredients = () => {
    fetchIngredients();
  };

  useEffect(() => {
    getIngredients();
  }, []);

  useEffect(() => {
    getGroceryCategories(token).then(setCategories);
  }, []);

  useEffect(() => {
    const foundIngredients = ingredients.filter((ingredient) =>
      ingredient.name.toLowerCase().includes(searchIngredient.toLowerCase())
    );
    setFiltered(foundIngredients);
  }, [ingredients, searchIngredient]);

  const handleInputChange = (e) => {
    setIngredient({ ...ingredientState, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    createIngredient(ingredientState, token)
      .then(() => {
        setIngredient({ name: "", grocery_category: "" });
      })
      .then(() => {
        getIngredients();
      });
  };

  const displayIngredientForm = () => {
    return (
      <>
        <button
          className="text-white"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#formModal"
        >
          <i className="fa-solid fa-plus fa-lg mr-2"></i>
          Ingredient
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
                      name="name"
                      value={ingredientState.name}
                      onChange={handleInputChange}
                      placeholder="Ingredient name"
                      required
                      autoFocus
                    />
                  </div>
                  <div className="mb-3">
                    <select
                      className="form-select"
                      name="grocery_category"
                      onChange={handleInputChange}
                      required
                    >
                      <option value={0}>- Select a grocery category -</option>
                      {groceryCategories.map((c) => (
                        <option key={`category-${c.id}`} value={c.id}>
                          {c.category}
                        </option>
                      ))}
                    </select>
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
    <div className="w-[40%] my-4 bg-cyan-600 rounded-lg p-4 flex">
      <div className="flex flex-col justify-center bg-cyan-600">
        <h3 className="mb-4 text-white">Ingredient Options</h3>
        <div className="flex justify-between items-center mb-4">
          <div>
            <FormInput
              type="search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Search ingredients"
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
    </div>
  );
};
