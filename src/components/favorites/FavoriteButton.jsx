import { useEffect, useState } from "react";
import {
  createFavorite,
  deleteFavorite,
  getAllFavorites,
} from "../../managers/FavoriteManager";

export const FavoriteButton = ({ recipeId, token }) => {
  // State variables
  const [favorite, setFavorite] = useState(undefined);
  const [buttonState, setButtonState] = useState("fa-regular");

  // Fetch favorites and check if the recipe is already a favorite
  useEffect(() => {
    getAllFavorites(token).then((favorites) => {
      // Find the favorite associated with the current recipe
      const foundRecipe = favorites.find(
        (fav) => fav.recipe.id === parseInt(recipeId)
      );
      setFavorite(foundRecipe);
    });
  }, [recipeId, token]);

  // Update the button state based on the favorite status
  useEffect(() => {
    setButtonState(favorite ? "fa-solid" : "fa-regular");
  }, [favorite]);

  // Function handles the favorite button click
  const handleFavorite = () => {
    // Create a new favorite object with the recipeId
    const newFavorite = { recipeId: recipeId };

    if (favorite) {
      // If the recipe is already a favorite, remove it from favorites
      deleteFavorite(token, favorite.id).then(() => {
        setFavorite(undefined);
      });
    } else {
      // If the recipe is not a favorite, add it to favorites
      createFavorite(newFavorite, token).then((favObj) => {
        setFavorite(favObj);
      });
    }
  };

  // JSX to display the favorite button
  return (
    <div>
      <i
        className={`fa-heart ${buttonState} fa-xl cursor-pointer`}
        onClick={handleFavorite}
      ></i>
    </div>
  );
};
