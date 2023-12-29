import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CategoryTabs } from "./CategoryTabs";

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

  const findCategory = (catId) => {
    if (categoryId) {
      const category = categories.find((category) => category.id === catId);
      return category.label;
    } else {
      return "All Recipes";
    }
  };

  const displayRecipes = () => {
    // if (filteredRecipes && filteredRecipes.length) {
    return (
      <section className="recipe--book--container flex flex-col my-3 items-center">
        <div className="w-3/4">
          {
            <CategoryTabs
              categories={categories}
              activeTab={categoryId}
              handleTabClick={handleTabClick}
            />
          }
          <div className="cards--containers flex flex-wrap gap-y-4 justify-center bg-cyan-600 py-4 px-8 rounded-md">
            {filteredRecipes.map((recipe) => {
              return (
                <div
                  className="card basis-1/4 cursor-pointer shadow-sm border-2 border-cyan-600 p-2"
                  key={recipe.id}
                  onClick={() => {
                    navigate(`/recipes/details/${recipe.id}`);
                  }}
                >
                  <img
                    src={recipe.image}
                    className="card-img-top img-fluid h-auto rounded-xl border-double border-8 border-cyan-600"
                    alt={recipe.title}
                  />
                  <div className="card-body flex items-center justify-center">
                    <h3 className="card-title m-0">{recipe.title}</h3>
                  </div>
                </div>
              );
            })}
          </div>
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
            className="form-control me-2 border-4 rounded-lg border-cyan-600"
            type="search"
            placeholder={`Search ${findCategory(categoryId)}`}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </form>
      </div>
      <h2>Select a category</h2>
      {displayRecipes()}
    </div>
  );
};
