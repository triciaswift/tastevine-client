import { useNavigate } from "react-router-dom";
import { RecipeTabs } from "./RecipeTabs";
import { useEffect } from "react";

export const RecipesList = ({
  recipes,
  categories,
  fetchRecipes,
  fetchCategories,
  showAll,
}) => {
  useEffect(() => {
    fetchRecipes(showAll);
    fetchCategories();
  }, [showAll]);

  const navigate = useNavigate();

  const displayRecipes = () => {
    if (recipes && recipes.length) {
      return (
        <section className="recipe--book--container my-3">
          {<RecipeTabs categories={categories} />}
          <div className="cards--containers grid grid-cols-2 auto-cols-min gap-x-2 gap-y-12 justify-items-center py-12 px-20">
            {recipes.map((recipe) => {
              return (
                <div
                  className="card w-3/4 cursor-pointer hover:bg-slate-500/50"
                  key={recipe.id}
                  onClick={() => {
                    navigate(`/recipes/details/${recipe.id}`);
                  }}
                >
                  {/* <img src="..." className="card-img-top" alt="..." /> */}
                  <div className="card-body">
                    <h5 className="card-title text-center">{recipe.title}</h5>
                    {showAll ? (
                      <p className="card-text">
                        Written By: {recipe.author.first_name}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      );
    }
  };

  return (
    <div>
      <div className="flex justify-end mr-6 mt-3">
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>
      {showAll !== true ? <h2 className="text-center">My Recipes</h2> : ""}
      {displayRecipes()}
    </div>
  );
};
