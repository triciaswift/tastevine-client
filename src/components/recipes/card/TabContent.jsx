import { NotesList } from "../../notes/NotesList";
import { RecipeTabs } from "./RecipeTabs";

export const TabContent = ({
  displayRecipe,
  activeTab,
  handleTabClick,
  recipe,
  token,
  userId,
  notes,
  fetchNotes,
}) => {
  let tabContent;

  switch (activeTab) {
    case 0:
      tabContent = displayRecipe();
      break;
    case 1:
      tabContent = (
        <div className="flex items-center w-full h-full py-6 rounded-b-md bg-green-800 overflow-auto">
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
        <NotesList
          token={token}
          recipeId={recipe.id}
          userId={userId}
          notes={notes}
          fetchNotes={fetchNotes}
        />
      );
      break;
    default:
      tabContent = null;
  }

  return (
    <div className="recipe--container w-[70rem] h-[35rem] mx-auto">
      <RecipeTabs activeTab={activeTab} handleTabClick={handleTabClick} />
      {tabContent}
    </div>
  );
};
