/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getAllRecipes } from "../../managers/RecipeManager";
import { RecipesList } from "./RecipesList";

export const AllRecipes = ({ token }) => {
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    getAllRecipes(token).then((recipeArr) => {
      setAllRecipes(recipeArr);
    });
  }, [token]);

  return <>{<RecipesList allRecipes={allRecipes} token={token} />}</>;
};
