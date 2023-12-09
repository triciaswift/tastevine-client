export const getAllRecipes = (url, token) => {
  return fetch(url, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export const getRecipeById = (recipeId, token) => {
  return fetch(`http://localhost:8000/recipes/${recipeId}`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export const getUserRecipes = (token) => {
  return fetch(`http://localhost:8000/recipes?user=current`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export const deleteRecipe = (token, recipeId) => {
  return fetch(`http://localhost:8000/recipes/${recipeId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const updateRecipe = (recipe, recipeId, token) => {
  return fetch(`http://localhost:8000/recipes/${recipeId}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });
};

export const createRecipe = (recipe, token) => {
  return fetch(`http://localhost:8000/recipes`, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  }).then((res) => res.json());
};
