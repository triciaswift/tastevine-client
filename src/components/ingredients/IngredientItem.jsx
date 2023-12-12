import { useEffect, useState } from "react";

export const IngredientItem = ({
  ingredient,
  chosenIngredients,
  updateIngredients,
}) => {
  const defaultState = {
    id: ingredient.id,
    quantity: "",
    unit: "",
  };
  const [ingredientInfo, setIngredientInfo] = useState(defaultState);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const copy = new Set(chosenIngredients);
    for (const ingredientObj of copy) {
      if (ingredient.id === ingredientObj.id) {
        setEnabled(true);
        // setTimeout(() => {
        //   setIngredientInfo(ingredientObj);
        // }, 10000);
      }
    }
  }, []);

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
    updateIngredients(copy);
  }, [ingredientInfo]);

  useEffect(() => {
    const copy = new Set(chosenIngredients);
    debugger;
    if (enabled && !Array.from(copy).find((obj) => obj.id === ingredient.id)) {
      copy.add(ingredientInfo);
    } else if (
      enabled &&
      Array.from(copy).find((obj) => obj.id === ingredient.id)
    ) {
      for (const ingredientObj of copy) {
        setIngredientInfo(ingredientObj);
      }
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
    updateIngredients(copy);
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
