import { NotesList } from "../../notes/NotesList";
import { RecipeTabs } from "./RecipeTabs";

export const TabContent = ({
  displayRecipe,
  activeTab,
  handleTabClick,
  recipe,
  token,
  userId,
}) => {
  let tabContent;

  switch (activeTab) {
    case 0:
      tabContent = displayRecipe();
      break;
    case 1:
      tabContent = (
        <div className="w-full py-6 rounded-b-md bg-cyan-600">
          {recipe.image ? (
            <img
              src={recipe.image}
              className="rounded-lg w-3/5 h-auto mx-auto border-8 border-double border-white shadow-xl"
              alt={recipe.title}
            />
          ) : (
            ""
          )}
        </div>
      );
      break;
    case 2:
      tabContent = (
        <NotesList token={token} recipeId={recipe.id} userId={userId} />
      );
      break;
    default:
      tabContent = null;
  }

  return (
    <div className="recipe--container w-[70rem] mx-auto">
      <RecipeTabs activeTab={activeTab} handleTabClick={handleTabClick} />
      {tabContent}
    </div>
  );
};
