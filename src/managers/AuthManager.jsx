export const registerUser = (newUser) => {
  return fetch("https://starfish-app-x978m.ondigitalocean.app/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(newUser),
  }).then((res) => res.json());
};

export const loginUser = (user) => {
  return fetch("https://starfish-app-x978m.ondigitalocean.app/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
};

export const getUser = (userId, token) => {
  return fetch(
    `https://starfish-app-x978m.ondigitalocean.app/users/${userId}`,
    {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    }
  ).then((response) => response.json());
};
