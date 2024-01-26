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
  // State variables
  const [categoryId, setCategoryId] = useState(0);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchRecipe, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch recipes and categories when 'showAll' changes
    fetchRecipes(showAll);
    setFilteredRecipes(recipes);
    fetchCategories();
    setCategoryId(0);
  }, [showAll]);

  useEffect(() => {
    // Filter recipes based on search input, searches titles
    const foundRecipe = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchRecipe.toLocaleLowerCase())
    );
    setFilteredRecipes(foundRecipe);
  }, [recipes, searchRecipe]);

  useEffect(() => {
    // Filter recipes based on selected category
    if (searchRecipe === "" && categoryId) {
      const filteredRecipesById = recipes.filter((recipe) =>
        recipe.categories.some((catObj) => catObj.id === categoryId)
      );
      setFilteredRecipes(filteredRecipesById);
    }
  }, [searchRecipe, categoryId]);

  // Function handles category tab click
  const handleTabClick = (categoryId) => {
    setCategoryId(categoryId);
  };

  // Based on selected category, function finds the category id from the categories array and returns the category label
  const findCategory = (catId) => {
    if (categoryId) {
      const category = categories.find((category) => category.id === catId);
      return category.label;
    } else {
      return "All Recipes";
    }
  };

  // JSX that displays the recipe cards & the category tabs
  const displayRecipes = () => {
    return (
      <div className="recipe--book--container flex justify-center mt-3">
        <div className="mx-24">
          {
            <CategoryTabs
              categories={categories}
              activeTab={categoryId}
              handleTabClick={handleTabClick}
            />
          }
          <div className="cards--containers flex flex-wrap justify-center gap-x-6 gap-y-4 bg-white/60 max-h-[33rem] min-h-[20rem] overflow-y-auto py-4 px-8">
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
  };

  // JSX displays the page title, search box & displayRecipes()
  return (
    <div>
      <div className="flex items-center justify-between mx-6 mt-3">
        <div className="flex w-[253.6px]"></div>
        <div className="flex items-center">
          <h2 className="text-3xl">Select a category</h2>
        </div>
        <div className="flex items-center" role="search">
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
      {displayRecipes()}
    </div>
  );
};
