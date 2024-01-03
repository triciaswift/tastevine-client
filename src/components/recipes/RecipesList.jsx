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
      <div className="recipe--book--container my-3">
        <div className="w-[90%] mx-auto">
          {
            <CategoryTabs
              categories={categories}
              activeTab={categoryId}
              handleTabClick={handleTabClick}
            />
          }
          <div className="cards--containers flex flex-wrap justify-center gap-x-6 gap-y-4 bg-white/60 max-h-[30rem] min-h-[20rem] overflow-y-auto py-4">
            {filteredRecipes.map((recipe) => {
              return (
                <div
                  className="card w-[18rem] cursor-pointer border-2 border-green-800 hover:shadow-xl"
                  key={recipe.id}
                  onClick={() => {
                    navigate(`/recipes/details/${recipe.id}`);
                  }}
                >
                  <img
                    src={recipe.image}
                    className="card-img-top img-fluid h-auto rounded-sm"
                    alt={recipe.title}
                  />
                  <div className="card-body flex items-center justify-center p-1">
                    <h3 className="card-title m-0">{recipe.title}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
    // }
  };

  return (
    <div>
      <div className="flex justify-end mr-6 mt-3">
        <div className="d-flex" role="search">
          <input
            className="form-control me-2 border-2 rounded-lg focus:ring-4 focus:ring-green-700/40 focus:border focus:border-green-700 border-green-800"
            type="search"
            placeholder={`Search ${findCategory(categoryId)}`}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
      </div>
      <h2 className="text-3xl">Select a category</h2>
      {displayRecipes()}
    </div>
  );
};
