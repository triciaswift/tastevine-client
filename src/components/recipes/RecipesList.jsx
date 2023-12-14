import { useNavigate } from "react-router-dom";
import { RecipeTabs } from "./RecipeTabs";
import { useEffect, useState } from "react";

export const RecipesList = ({
  recipes,
  categories,
  fetchRecipes,
  fetchCategories,
  showAll,
}) => {
  const [categoryId, setCategoryId] = useState(0);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchRecipe, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes(showAll);
    setFilteredRecipes(recipes);
    fetchCategories();
    setCategoryId(0);
  }, [showAll]);

  useEffect(() => {
    const foundRecipe = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchRecipe.toLocaleLowerCase())
    );
    setFilteredRecipes(foundRecipe);
  }, [recipes, searchRecipe]);

  useEffect(() => {
    if (searchRecipe === "" && categoryId) {
      const filteredRecipesById = recipes.filter((recipe) =>
        recipe.categories.some((catObj) => catObj.id === categoryId)
      );
      setFilteredRecipes(filteredRecipesById);
    }
  }, [searchRecipe, categoryId]);

  const handleTabClick = (categoryId) => {
    setCategoryId(categoryId);
  };

  const displayRecipes = () => {
    // if (filteredRecipes && filteredRecipes.length) {
    return (
      <section className="recipe--book--container my-3">
        {
          <RecipeTabs
            categories={categories}
            activeTab={categoryId}
            handleTabClick={handleTabClick}
          />
        }
        <div className="cards--containers grid grid-cols-2 auto-cols-min gap-x-2 gap-y-12 justify-items-center py-12 px-20">
          {filteredRecipes.map((recipe) => {
            return (
              <div
                className="card cursor-pointer hover:bg-slate-500/50 w-3/4"
                key={recipe.id}
                onClick={() => {
                  navigate(`/recipes/details/${recipe.id}`);
                }}
              >
                <img
                  src={recipe.image}
                  className="card-img-top img-fluid h-72"
                  alt={recipe.title}
                />
                <div className="card-body">
                  <h5 className="card-title text-center mb-6 text-2xl">
                    {recipe.title}
                  </h5>
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
    // }
  };

  return (
    <div>
      <div className="flex justify-end mr-6 mt-3">
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </form>
      </div>
      {showAll !== true ? <h2 className="text-center">My Recipes</h2> : ""}
      {displayRecipes()}
    </div>
  );
};
