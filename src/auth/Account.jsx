import { useEffect, useState } from "react";
import { getUser } from "../managers/AuthManager";
import { getUserRecipes } from "../managers/RecipeManager";

export const Account = ({ token, userId }) => {
  const [user, setUser] = useState({});
  const [recipes, setRecipes] = useState({});

  useEffect(() => {
    getUser(userId, token).then((userObj) => {
      setUser(userObj);
    });
    getUserRecipes(token).then((recipeArr) => {
      setRecipes(recipeArr);
    });
  }, [token, userId]);

  return (
    <section>
      <div className="name--container"></div>
    </section>
  );
};
