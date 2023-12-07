/* eslint-disable react/prop-types */
import { Route, Routes } from "react-router-dom";
import { Register } from "../auth/Register";
import { Login } from "../auth/Login";
import { Authorized } from "./Authorized";
import { NewRecipe } from "../components/recipes/NewRecipe";
import { UpdateRecipe } from "../components/recipes/UpdateRecipe";
import { IngredientForm } from "../components/ingredients/IngredientForm";
import { RecipeDetails } from "../components/recipes/RecipeDetails";
import { getAllRecipes } from "../managers/RecipeManager";
import { useState } from "react";
import { RecipesList } from "../components/recipes/RecipesList";
import { getAllCategories } from "../managers/CategoryManager";

export const ApplicationViews = ({ token, setToken, userId }) => {
  const [recipeState, setRecipeState] = useState([]);
  const [categoryState, setCategoryState] = useState([]);

  const fetchRecipesFromAPI = (showAll) => {
    let url = "http://localhost:8000/recipes";

    if (showAll !== true) {
      url = "http://localhost:8000/recipes?user=current";
    }

    getAllRecipes(url, token).then((recipes) => {
      setRecipeState(recipes);
    });
  };

  const fetchCategoriesFromAPI = () => {
    getAllCategories(token).then((categories) => {
      setCategoryState(categories);
    });
  };

  return (
    <Routes>
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route element={<Authorized token={token} />}>
        <Route path="/" element="All Recipes" />
        <Route path="recipes">
          <Route
            path="all"
            element={
              <RecipesList
                recipes={recipeState}
                categories={categoryState}
                fetchRecipes={fetchRecipesFromAPI}
                fetchCategories={fetchCategoriesFromAPI}
                showAll={true}
              />
            }
          />
          <Route
            path="mine"
            element={
              <RecipesList
                recipes={recipeState}
                categories={categoryState}
                fetchRecipes={fetchRecipesFromAPI}
                fetchCategories={fetchCategoriesFromAPI}
                showAll={false}
              />
            }
          />
          <Route
            path="details/:recipeId"
            element={
              <RecipeDetails
                categories={categoryState}
                fetchCategories={fetchCategoriesFromAPI}
                token={token}
                userId={userId}
              />
            }
          />
          <Route path="new" element={<NewRecipe />} />
          <Route path="update" element={<UpdateRecipe />} />
        </Route>
        <Route path="ingredients">
          <Route path="new" element={<IngredientForm />} />
        </Route>
      </Route>
    </Routes>
  );
};
