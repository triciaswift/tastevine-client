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
    <section className="flex justify-center my-14">
      <div className="account--container w-1/3">
        <h1>Account Info</h1>
        <div className="border-1 border-beet-purple rounded-lg bg-green-800/90 shadow-lg p-3 mb-5">
          <div className="name--container flex">
            <div className="mr-4 w-full">
              <label className="mr-2 mb-2 text-white">First Name</label>
              <div className="border-1 rounded-md p-2 bg-white">
                {user.first_name}
              </div>
            </div>
            <div className="w-full mb-4">
              <label className="mr-2 mb-2 text-white">Last Name</label>
              <div className="border-1 rounded-md p-2 bg-white">
                {user.last_name}
              </div>
            </div>
          </div>
          <div className="email--container mb-4">
            <label className="mr-2 mb-2 text-white">Email</label>
            <div className="border-1 rounded-md p-2 bg-white">{user.email}</div>
          </div>
          <div className="recipes_written--container flex justify-center">
            <label className="mr-2 text-white">
              Number of Recipes Written:
            </label>
            <div className="text-white">{recipes.length}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
