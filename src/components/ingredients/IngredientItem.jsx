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

  // initial only useEffect
  useEffect(() => {
    const copy = new Set(chosenIngredients);
    for (const ingredientObj of copy) {
      if (ingredient.id === ingredientObj.id) {
        console.log(
          `${ingredient.name} ingredient is in the original chosenIngredients array, set enabled to true`
        );
        setEnabled(true);
        console.log(
          `${
            ingredient.name
          } ingredient is in the original chosenIngredients array, set ingredientInfo to ${JSON.stringify(
            ingredientObj
          )}.`
        );
        setIngredientInfo(ingredientObj);
      }
    }
  }, []);

  // ingredientInfo useEffect
  useEffect(() => {
    // copy chosen set
    const copy = new Set(chosenIngredients);
    console.log(
      `ingredientInfo useEffect triggered. changed to ${JSON.stringify(
        ingredientInfo
      )}.`
    );
    // iterate copy
    for (const ingredientObject of copy) {
      // if object exists in set, nuke it
      if (ingredient.id === ingredientObject.id) {
        console.log(`Remove the matching object from chosenIngredients`);
        copy.delete(ingredientObject);
      }
    }
    if (enabled) {
      console.log(`Add the ingredientInfo object to chosenIngredients`);
      copy.add(ingredientInfo);
    }
    // update state set
    updateIngredients(copy);
  }, [ingredientInfo]);

  // enabled useEffect
  useEffect(() => {
    const copy = new Set(chosenIngredients);
    const foundIngredient = Array.from(copy).find(
      (obj) => obj.id === ingredient.id
    );

    console.log(`enabled useEffect triggered. changed to ${enabled}`);
    if (enabled && !foundIngredient) {
      console.log(
        `enabled is true, and the ${
          ingredient.name
        } ingredient is not in the chosenIngredients array. Add the ingredientInfo ${JSON.stringify(
          ingredientInfo
        )} to the chosenIngredientsArray`
      );
      copy.add(ingredientInfo);
    } else if (enabled && foundIngredient) {
      console.log(
        `enabled is true and ${
          ingredient.name
        } is in the chosenIngredients array. Set ingredientInfo to ${JSON.stringify(
          foundIngredient
        )}`
      );
      setIngredientInfo(foundIngredient);
    } else {
      console.log(
        `enabled is false, remove the ${ingredient.name} ingredient from chosenIngredients and set the ingredientInfo to blank obj (with ingredient.id blank quantity/unit)`
      );
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
          value={ingredientInfo.unit}
          onChange={(e) =>
            setIngredientInfo({ ...ingredientInfo, unit: e.target.value })
          }
        />
      </td>
    </>
  );
};
