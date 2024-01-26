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
  // State variables
  const [filteredIngredients, setFiltered] = useState([]);
  const [searchIngredient, setSearch] = useState("");
  const [ingredientState, setIngredient] = useState({
    name: "",
    grocery_category: 0,
  });
  const [groceryCategories, setCategories] = useState([]);

  // Function to fetch ingredients
  const getIngredients = () => {
    fetchIngredients();
  };

  // Fetch ingredients on initial rendering of the page
  useEffect(() => {
    getIngredients();
  }, []);

  // Fetch grocery categories on initial rendering of the page
  useEffect(() => {
    getGroceryCategories(token).then(setCategories);
  }, []);

  // Update filtered ingredients based on search input
  useEffect(() => {
    const foundIngredients = ingredients.filter((ingredient) =>
      ingredient.name.toLowerCase().includes(searchIngredient.toLowerCase())
    );
    setFiltered(foundIngredients);
  }, [ingredients, searchIngredient]);

  // Function handles input change for ingredient form
  const handleInputChange = (e) => {
    setIngredient({ ...ingredientState, [e.target.name]: e.target.value });
  };

  // Function handles saving a new ingredient
  const handleSave = (e) => {
    e.preventDefault();
    console.log("handleSave function called");
    createIngredient(ingredientState, token)
      .then(() => {
        setIngredient({ name: "", grocery_category: 0 });
      })
      .then(() => {
        getIngredients();
      });
  };

  // JSX to display the ingredient form modal
  const displayIngredientForm = () => {
    return (
      <>
        <button
          className="text-black"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#formModal"
        >
          <i className="fa-solid fa-plus fa-lg mr-2"></i>
          Ingredient
        </button>
        {/* Ingredient form modal */}
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
                <form onSubmit={handleSave}>
                  <div className="mb-3">
                    <label className="col-form-label">Ingredient:</label>
                    {/* Input for the ingredient name */}
                    <input
                      type="text"
                      className="form-control focus:ring-4 focus:ring-green-700/40 focus:border focus:border-green-700"
                      name="name"
                      value={ingredientState.name}
                      onChange={handleInputChange}
                      placeholder="Ingredient name"
                      required
                      autoFocus
                    />
                  </div>
                  <div className="mb-3">
                    {/* Dropdown for selecting grocery category */}
                    <select
                      className="form-select"
                      name="grocery_category"
                      onChange={handleInputChange}
                      value={ingredientState.grocery_category}
                      required
                    >
                      <option value={""}>- Select a grocery category -</option>
                      {groceryCategories.map((c) => (
                        <option key={`category-${c.id}`} value={c.id}>
                          {c.category}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Save/Close buttons */}
                  <div className="modal-footer border-t-0">
                    <button type="submit" className="btn btn-success">
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={() => {
                        setIngredient({ name: "", grocery_category: 0 });
                      }}
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // JSX to display the ingredient form container
  return (
    <div className="flex grow w-[40%]">
      <div className="flex flex-col justify-start overflow-auto bg-white w-full p-2 rounded-lg border-2 border-dashed border-green-700 mb-[46px]">
        <div className="flex justify-between items-center mb-2 p-2">
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
        <h3 className="mb-4 text-black">Ingredient Options</h3>
        <IngredientsList
          chosenIngredients={chosenIngredients}
          updateIngredients={updateIngredients}
          filteredIngredients={filteredIngredients}
        />
      </div>
    </div>
  );
};
