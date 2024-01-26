export const getAllIngredients = (token) => {
  return fetch(`http://localhost:8000/ingredients`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export const createIngredient = (ingredient, token) => {
  return fetch(`http://localhost:8000/ingredients`, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ingredient),
  });
};
