export const getNotesByRecipeId = (token, recipeId) => {
  return fetch(`http://localhost:8000/notes?recipe=${recipeId}`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};
