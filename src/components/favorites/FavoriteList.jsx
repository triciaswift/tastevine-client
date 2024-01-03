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
              className="card w-[18rem] mx-4 cursor-pointer border-double border-8 border-green-700 shadow-md"
              key={favorite.id}
              onClick={() => {
                navigate(`/recipes/details/${favorite.recipe.id}`);
              }}
            >
              <img
                className="card-img-top img-fluid h-auto rounded-none"
                src={favorite.recipe.image}
                alt={favorite.recipe.title}
              />
              <div className="card-body flex flex-1 items-center justify-center">
                <h5 className="card-title text-center text-xl m-0">
                  {favorite.recipe.title}
                </h5>
              </div>
            </div>
          ))}
        </>
      );
    }
  };

  return (
    <section className="mx-16">
      <h1 className="mb-10">Favorites</h1>
      <div className="cards--container flex flex-wrap justify-center gap-y-4">
        {displayFavorite()}
      </div>
    </section>
  );
};
