import { useEffect, useState } from "react";
import { getAllFavorites } from "../../managers/FavoriteManager";
import { useNavigate } from "react-router-dom";

export const FavoriteList = ({ token }) => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllFavorites(token).then(setFavorites);
  }, [token]);

  const displayFavorite = () => {
    if (favorites && favorites.length) {
      return (
        <>
          {favorites.map((favorite) => (
            <div
              className="card basis-1/5 mx-4 cursor-pointer"
              key={favorite.id}
              onClick={() => {
                navigate(`/recipes/details/${favorite.recipe.id}`);
              }}
            >
              <img
                className="card-img-top img-fluid h-auto"
                src={favorite.recipe.image}
                alt={favorite.recipe.title}
              />
              <div className="card-body">
                <h5 className="card-title text-center">
                  {favorite.recipe.title}
                </h5>
                <p>{favorite.recipe.author.first_name}</p>
              </div>
            </div>
          ))}
        </>
      );
    }
  };

  return (
    <section className="my-24 mx-16">
      <h1 className="mb-10">Favorites</h1>
      <div className="cards--container flex justify-center">
        {displayFavorite()}
      </div>
    </section>
  );
};
