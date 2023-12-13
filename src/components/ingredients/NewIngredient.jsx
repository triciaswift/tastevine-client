import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createIngredient } from "../../managers/IngredientManager";

export const NewIngredient = ({ token }) => {
  const defaultState = { name: "" };
  const [ingredient, setIngredient] = useState(defaultState);
  const navigate = useNavigate();

  const handleSave = (e) => {
    e.preventDefault();
    createIngredient(ingredient, token).then(() => setIngredient(defaultState));
  };

  return (
    <section className="m-16">
      <div className="flex justify-center">
        <form className="w-1/3" onSubmit={handleSave}>
          <h2>New Ingredient</h2>
          <div className="mb-3">
            <label className="form-label">Ingredient</label>
            <input
              type="text"
              className="form-control"
              value={ingredient.name}
              onChange={(e) =>
                setIngredient({ ...ingredient, name: e.target.value })
              }
              required
              autoFocus
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary mr-4">
              Save
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
