/* eslint-disable react/prop-types */
import { Route, Routes } from "react-router-dom";
import { Register } from "../auth/Register";
import { Login } from "../auth/Login";
import { Authorized } from "./Authorized";
import { AllRecipes } from "../components/recipes/AllRecipes";
import { MyRecipes } from "../components/recipes/MyRecipes";
import { NewRecipe } from "../components/recipes/NewRecipe";
import { UpdateRecipe } from "../components/recipes/UpdateRecipe";
import { IngredientForm } from "../components/ingredients/IngredientForm";

export const ApplicationViews = ({ token, setToken }) => {
  return (
    <Routes>
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route element={<Authorized token={token} />}>
        <Route path="/" element="All Recipes" />
        <Route path="recipes">
          <Route path="all" element={<AllRecipes token={token} />} />
          <Route path="mine" element={<MyRecipes token={token} />} />
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
