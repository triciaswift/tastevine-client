/* eslint-disable react/prop-types */
import { RecipeTabs } from "./RecipeTabs";

export const RecipesList = ({ allRecipes, token }) => {
  return (
    <section className="recipe--book--container my-3">
      <div className="flex justify-end mr-6">
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
      {<RecipeTabs token={token} />}
      <div className="cards--containers grid grid-cols-2 auto-cols-min gap-x-4 gap-y-12 justify-items-center py-16 px-20">
        {allRecipes.map((recipe) => {
          return (
            <div className="card w-3/4" key={recipe.id}>
              {/* <img src="..." className="card-img-top" alt="..." /> */}
              <div className="card-body">
                <h5 className="card-title text-center">{recipe.title}</h5>
                <p className="card-text">
                  Written By: {recipe.author.first_name}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
