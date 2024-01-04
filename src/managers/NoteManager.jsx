export const getNotesByRecipeId = (token, recipeId) => {
  return fetch(
    `https://starfish-app-x978m.ondigitalocean.app/notes?recipe=${recipeId}`,
    {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    }
  ).then((response) => response.json());
};

export const updateNote = (note, noteId, token) => {
  return fetch(
    `https://starfish-app-x978m.ondigitalocean.app/notes/${noteId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    }
  );
};

export const deleteNote = (token, noteId) => {
  return fetch(
    `https://starfish-app-x978m.ondigitalocean.app/notes/${noteId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
};

export const createNote = (note, token) => {
  return fetch(`https://starfish-app-x978m.ondigitalocean.app/notes`, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
};
