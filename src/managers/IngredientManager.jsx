export const getAllIngredients = (token) => {
  return fetch(`https://starfish-app-x978m.ondigitalocean.app/ingredients`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export const createIngredient = (ingredient, token) => {
  return fetch(`https://starfish-app-x978m.ondigitalocean.app/ingredients`, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ingredient),
  });
};
