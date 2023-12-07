/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getUserRecipes } from "../../managers/RecipeManager";
import { RecipesList } from "./RecipesList";

export const MyRecipes = ({ token }) => {
  const [userRecipes, setUserRecipes] = useState([]);

  useEffect(() => {
    getUserRecipes(token).then((recipeArr) => {
      setUserRecipes(recipeArr);
    });
  }, [token]);

  return <>{<RecipesList allRecipes={userRecipes} token={token} />}</>;
};
