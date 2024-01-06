import { useEffect, useState } from "react";
import {
  createFavorite,
  deleteFavorite,
  getAllFavorites,
} from "../../managers/FavoriteManager";

export const FavoriteButton = ({ recipeId, token }) => {
  const [favorite, setFavorite] = useState(undefined);
  const [buttonState, setButtonState] = useState("fa-regular");

  useEffect(() => {
    getAllFavorites(token).then((favorites) => {
      const foundRecipe = favorites.find(
        (fav) => fav.recipe.id === parseInt(recipeId)
      );
      setFavorite(foundRecipe);
    });
  }, [recipeId, token]);

  useEffect(() => {
    setButtonState(favorite ? "fa-solid" : "fa-regular");
  }, [favorite]);

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

  return (
    <div>
      <i
        className={`fa-heart ${buttonState} fa-xl cursor-pointer`}
        onClick={handleFavorite}
      ></i>
    </div>
  );
};
