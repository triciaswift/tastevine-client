import { useEffect, useState } from "react";
import {
  createFavorite,
  deleteFavorite,
  getAllFavorites,
} from "../../managers/FavoriteManager";

export const FavoriteButton = ({ recipeId, token }) => {
  const [favorites, setFavorites] = useState([]);
  const [favorite, setFavorite] = useState(undefined);
  const [buttonState, setButtonState] = useState("fa-regular");

  const getFavorites = async () => {
    const fetchedFavorites = await getAllFavorites(token);
    await setFavorites(fetchedFavorites);
    const foundRecipe = fetchedFavorites.find(
      (fav) => fav.recipe.id === parseInt(recipeId)
    );
    setFavorite(foundRecipe);
  };

  useEffect(() => {
    getFavorites();
  }, [recipeId, token]);

  useEffect(() => {
    setButtonState(favorite ? "fa-solid" : "fa-regular");
  }, [favorite]);

  const displayButton = () => {
    if (favorites && favorites.length) {
      return (
        <i
          className={`fa-heart ${buttonState} fa-xl cursor-pointer`}
          onClick={handleFavorite}
        ></i>
      );
    }
  };

  const handleFavorite = () => {
    const newFavorite = { recipeId: recipeId };

    if (favorite) {
      deleteFavorite(token, favorite.id).then(() => {
        setFavorite(undefined);
      });
    } else {
      createFavorite(newFavorite, token).then((favObj) => {
        setFavorite(favObj);
      });
    }
  };

  return <div>{displayButton()}</div>;
};
