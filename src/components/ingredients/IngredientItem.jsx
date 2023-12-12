import { useEffect, useState } from "react";

export const IngredientItem = ({
  ingredient,
  chosenIngredients,
  updateChosenIngredients,
}) => {
  const defaultState = {
    id: ingredient.id,
    quantity: "",
    unit: "",
  };
  const [ingredientInfo, setIngredientInfo] = useState(defaultState);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // copy chosen set
    const copy = new Set(chosenIngredients);
    // iterate copy
    for (const ingredientObject of copy) {
      // if object exists in set, nuke it
      if (ingredient.id === ingredientObject.id) {
        copy.delete(ingredientObject);
      }
    }
    if (enabled) {
      copy.add(ingredientInfo);
    }
    // update state set
    updateChosenIngredients(copy);
  }, [ingredientInfo]);

  useEffect(() => {
    const copy = new Set(chosenIngredients);
    if (enabled) {
      copy.add(ingredientInfo);
    } else {
      for (const ingredientObject of copy) {
        if (ingredient.id === ingredientObject.id) {
          copy.delete(ingredientObject);
        }
        // after delete the object gets added back to the set...think it's happening because every time we setIngredientInfo to default it triggers the other useEffect and adds it back to the set??? Is that true?
      }
      setIngredientInfo(defaultState);
    }
    // update state set
    updateChosenIngredients(copy);
  }, [enabled]);

  return (
    <>
      <td className="align-middle">
        <input
          type="checkbox"
          checked={enabled}
          onChange={() => setEnabled(!enabled)}
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
          disabled={!enabled}
          placeholder="2, 1/4 etc."
          value={ingredientInfo.quantity}
          onChange={(e) =>
            setIngredientInfo({ ...ingredientInfo, quantity: e.target.value })
          }
        />
      </td>
      <td className="align-middle">
        <input
          className="form-control"
          type="text"
          name="unit"
          disabled={!enabled}
          placeholder="tsp, c, oz, etc."
          onChange={(e) =>
            setIngredientInfo({ ...ingredientInfo, unit: e.target.value })
          }
        />
      </td>
    </>
  );
};
