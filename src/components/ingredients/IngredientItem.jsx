import { useEffect, useRef, useState } from "react";
import { FormInput } from "../../utils/FormInput";

// found this code by  searching, "how to prevent a useEffect from running on initial render?"
const useDidMountEffect = (func, deps) => {
  // Create a ref to track whether the component has mounted
  const didMount = useRef(false);
  // useEffect runs after each render
  useEffect(() => {
    // Check if the component has already mounted
    if (didMount.current) {
      // If it has mounted, call the provided function
      func();
    } else {
      // If it hasn't mounted yet, set didMount to true
      didMount.current = true;
    }
  }, deps);
};

export const IngredientItem = ({
  ingredient,
  chosenIngredients,
  updateIngredients,
}) => {
  // default state for ingredient information
  const defaultState = {
    id: ingredient.id,
    quantity: "",
    unit: "",
  };
  // State to track ingredient information and enabled state
  const [ingredientInfo, setIngredientInfo] = useState(defaultState);
  const [enabled, setEnabled] = useState(false);

  // initial render only useEffect
  useEffect(() => {
    // Check if the ingredient is in chosenIngredients
    const copy = new Set(chosenIngredients);
    for (const ingredientObj of copy) {
      if (ingredient.id === ingredientObj.id) {
        setEnabled(true);
      }
    }
  }, [chosenIngredients]);

  // ingredientInfo useEffect (will not run on initial render, ONLY when ingredient info value changes from previous render)
  useDidMountEffect(() => {
    // copy chosen set
    const copy = new Set(chosenIngredients);
    // Iterate over the copied set to remove any existing ingredient with the same id
    for (const ingredientObject of copy) {
      // if object exists in set, delete it
      if (ingredient.id === ingredientObject.id) {
        copy.delete(ingredientObject);
      }
    }
    // If the 'enabled' state is true, add the current 'ingredientInfo' to the set
    if (enabled) {
      copy.add(ingredientInfo);
    }
    // update state set with modified set
    updateIngredients(copy);
  }, [ingredientInfo]);

  // enabled useEffect (will not run on initial render, ONLY when enabled value changes from previous render)
  useDidMountEffect(() => {
    const copy = new Set(chosenIngredients);
    const foundIngredient = Array.from(copy).find(
      (obj) => obj.id === ingredient.id
    );

    if (enabled && !foundIngredient) {
      copy.add(ingredientInfo);
    } else if (enabled && foundIngredient) {
      setIngredientInfo(foundIngredient);
    } else {
      for (const ingredientObject of copy) {
        if (ingredient.id === ingredientObject.id) {
          copy.delete(ingredientObject);
        }
      }
      setIngredientInfo(defaultState);
    }
    updateIngredients(copy);
  }, [enabled]);

  // JSX to display each row of the ingredient table
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
