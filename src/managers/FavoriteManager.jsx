export const getAllFavorites = (token) => {
  return fetch(`https://starfish-app-x978m.ondigitalocean.app/favorites`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export const createFavorite = (favorite, token) => {
  return fetch(`https://starfish-app-x978m.ondigitalocean.app/favorites`, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(favorite),
  }).then((res) => res.json());
};

export const deleteFavorite = (token, favoriteId) => {
  return fetch(
    `https://starfish-app-x978m.ondigitalocean.app/favorites/${favoriteId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
};
