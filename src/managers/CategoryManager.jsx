export const getAllCategories = (token) => {
  return fetch(`https://starfish-app-x978m.ondigitalocean.app/categories`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};
