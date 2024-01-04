export const createGroceryList = (items, token) => {
  return fetch(
    `https://starfish-app-x978m.ondigitalocean.app/grocery-list-items`,
    {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(items),
    }
  );
};

export const deleteGroceryItem = (itemId, token) => {
  return fetch(
    `https://starfish-app-x978m.ondigitalocean.app/grocery-list-items/${itemId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
};

export const updateGroceryItem = (item, token) => {
  return fetch(
    `https://starfish-app-x978m.ondigitalocean.app/grocery-list-items/${item.id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }
  );
};

export const getGroceryList = (token) => {
  return fetch(`https://starfish-app-x978m.ondigitalocean.app/groceries`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export const deleteGroceryList = (listId, token) => {
  return fetch(
    `https://starfish-app-x978m.ondigitalocean.app/groceries/${listId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
};

export const getGroceryCategories = (token) => {
  return fetch(
    `https://starfish-app-x978m.ondigitalocean.app/grocery-categories`,
    {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    }
  ).then((response) => response.json());
};
