import { Route, Routes } from "react-router-dom";
import { Register } from "../auth/Register";
import { Login } from "../auth/Login";
import { Authorized } from "./Authorized";
import { UpdateRecipe } from "../components/recipes/UpdateRecipe";
import { NewIngredient } from "../components/ingredients/NewIngredient";
import { RecipeDetails } from "../components/recipes/RecipeDetails";
import { getAllRecipes } from "../managers/RecipeManager";
import { useState } from "react";
import { RecipesList } from "../components/recipes/RecipesList";
import { getAllCategories } from "../managers/CategoryManager";
import { RecipeForm } from "../components/recipes/RecipeForm";
import { getAllIngredients } from "../managers/IngredientManager";

export const ApplicationViews = ({ token, setToken, userId, setId }) => {
  const [recipeState, setRecipeState] = useState([]);
  const [categoryState, setCategoryState] = useState([
    { id: 1, label: "Appetizers" },
    { id: 2, label: "Breakfast" },
  ]);
  const [ingredientState, setIngredientState] = useState([]);

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

  const fetchIngredientsFromAPI = () => {
    getAllIngredients(token).then((ingredients) => {
      setIngredientState(ingredients);
    });
  };

  return (
    <Routes>
      <Route
        path="/register"
        element={<Register setToken={setToken} setId={setId} />}
      />
      <Route
        path="/login"
        element={<Login setToken={setToken} setId={setId} />}
      />
      <Route element={<Authorized token={token} />}>
        <Route
          path="/"
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
          <Route
            path="new"
            element={
              <RecipeForm
                categories={categoryState}
                fetchCategories={fetchCategoriesFromAPI}
                token={token}
                ingredients={ingredientState}
                fetchIngredients={fetchIngredientsFromAPI}
              />
            }
          />
          <Route
            path="update/:recipeId"
            element={
              <UpdateRecipe
                token={token}
                fetchCategories={fetchCategoriesFromAPI}
                categories={categoryState}
                ingredients={ingredientState}
                fetchIngredients={fetchIngredientsFromAPI}
              />
            }
          />
        </Route>
        <Route path="ingredients">
          <Route path="new" element={<NewIngredient />} />
        </Route>
      </Route>
    </Routes>
  );
};
