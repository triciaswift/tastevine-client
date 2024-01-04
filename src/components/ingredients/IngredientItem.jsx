import { useEffect, useRef, useState } from "react";
import { FormInput } from "../../utils/FormInput";

// found this code by  searching, "how to prevent a useEffect from running on initial render?"
const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
  }, deps);
};

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

  // initial render only useEffect
  useEffect(() => {
    const copy = new Set(chosenIngredients);
    for (const ingredientObj of copy) {
      if (ingredient.id === ingredientObj.id) {
        // debugger;
        // console.log(
        //   `${ingredient.name} ingredient is in the original chosenIngredients array, set enabled to true`
        // );
        setEnabled(true);
      }
    }
  }, [chosenIngredients]);

  // ingredientInfo useEffect (will not run on initial render, ONLY when ingredient info value changes from previous render)
  useDidMountEffect(() => {
    // copy chosen set
    const copy = new Set(chosenIngredients);
    // console.log(
    //   `ingredientInfo useEffect triggered. changed to ${JSON.stringify(
    //     ingredientInfo
    //   )}.`
    // );
    // iterate copy
    for (const ingredientObject of copy) {
      // if object exists in set, nuke it
      if (ingredient.id === ingredientObject.id) {
        // console.log(`Remove the matching object from chosenIngredients`);
        copy.delete(ingredientObject);
      }
    }
    if (enabled) {
      // console.log(`Add the ingredientInfo object to chosenIngredients`);
      copy.add(ingredientInfo);
    }
    // update state set
    updateIngredients(copy);
  }, [ingredientInfo]);

  // enabled useEffect (will not run on initial render, ONLY when enabled value changes from previous render)
  useDidMountEffect(() => {
    const copy = new Set(chosenIngredients);
    const foundIngredient = Array.from(copy).find(
      (obj) => obj.id === ingredient.id
    );

    // console.log(`enabled useEffect triggered. changed to ${enabled}`);
    if (enabled && !foundIngredient) {
      // console.log(
      //   `enabled is true, and the ${
      //     ingredient.name
      //   } ingredient is not in the chosenIngredients array. Add the ingredientInfo ${JSON.stringify(
      //     ingredientInfo
      //   )} to the chosenIngredientsArray`
      // );
      copy.add(ingredientInfo);
    } else if (enabled && foundIngredient) {
      // console.log(
      //   `enabled is true and ${
      //     ingredient.name
      //   } is in the chosenIngredients array. Set ingredientInfo to ${JSON.stringify(
      //     foundIngredient
      //   )}`
      // );
      setIngredientInfo(foundIngredient);
    } else {
      // console.log(
      //   `enabled is false, remove the ${ingredient.name} ingredient from chosenIngredients and set the ingredientInfo to blank obj (with ingredient.id blank quantity/unit)`
      // );
      for (const ingredientObject of copy) {
        if (ingredient.id === ingredientObject.id) {
          copy.delete(ingredientObject);
        }
      }
      setIngredientInfo(defaultState);
    }
    // update state set
    updateIngredients(copy);
  }, [enabled]);

  return (
    <>
      <td className="align-middle w-[2%]">
        <FormInput
          type="checkbox"
          checked={enabled}
          onChange={() => setEnabled(!enabled)}
        />
      </td>
      <td className="align-middle w-[50%]">
        <label>{ingredient.name}</label>
      </td>
      <td className="align-middle w-[24%]">
        <input
          className="form-control focus:ring-4 focus:ring-green-700/40 focus:border focus:border-green-700"
          type="text"
          name="quantity"
          disabled={!enabled}
          placeholder="2, 1/4, 1 1/2"
          value={ingredientInfo.quantity}
          onChange={(e) =>
            setIngredientInfo({ ...ingredientInfo, quantity: e.target.value })
          }
        />
      </td>
      <td className="align-middle w-[24%]">
        <input
          className="form-control focus:ring-4 focus:ring-green-700/40 focus:border focus:border-green-700"
          type="text"
          name="unit"
          disabled={!enabled}
          placeholder="c, tsp, oz"
          value={ingredientInfo.unit}
          onChange={(e) =>
            setIngredientInfo({ ...ingredientInfo, unit: e.target.value })
          }
        />
      </td>
    </>
  );
};
