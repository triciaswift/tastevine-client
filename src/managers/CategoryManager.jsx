export const getAllCategories = (token) => {
  return fetch(`http://localhost:8000/categories`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};
