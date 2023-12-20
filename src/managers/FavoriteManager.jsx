export const getAllFavorites = (token) => {
  return fetch(`http://localhost:8000/favorites`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export const createFavorite = (favorite, token) => {
  return fetch(`http://localhost:8000/favorites`, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(favorite),
  }).then((res) => res.json());
};

export const deleteFavorite = (token, favoriteId) => {
  return fetch(`http://localhost:8000/favorites/${favoriteId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};
