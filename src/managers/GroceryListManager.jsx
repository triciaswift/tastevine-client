export const createGroceryList = (items, token) => {
  return fetch(`http://localhost:8000/grocery-list-items`, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(items),
  });
};

export const deleteGroceryItem = (itemId, token) => {
  return fetch(`http://localhost:8000/grocery-list-items/${itemId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const updateGroceryItem = (item, token) => {
  return fetch(`http://localhost:8000/grocery-list-items/${item.id}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
};

export const getGroceryList = (token) => {
  return fetch(`http://localhost:8000/groceries`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export const deleteGroceryList = (listId, token) => {
  return fetch(`http://localhost:8000/groceries/${listId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};
