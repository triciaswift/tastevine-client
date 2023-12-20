export const getAllFavorites = (token) => {
  return fetch(`http://localhost:8000/favorites`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};
