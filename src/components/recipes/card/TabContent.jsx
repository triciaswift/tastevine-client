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
  // Variable to hold the content based on the active tab
  let tabContent;

  // Switch statement to determine the content based on the active tab
  switch (activeTab) {
    case 0:
      // Display the recipe details
      tabContent = displayRecipe();
      break;
    case 1:
      // Display the recipe image
      tabContent = (
        <div className="flex items-center w-full h-full py-6 rounded-b-md bg-green-800 overflow-auto">
          {recipe.image ? (
            <img
              src={recipe.image}
              className="rounded-lg w-[38rem] h-auto mx-auto border-8 border-double border-white shadow-xl"
              alt={recipe.title}
            />
          ) : (
            ""
          )}
        </div>
      );
      break;
    case 2:
      // Display the list of notes related to the recipe
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
      // No content for unknown tab
      tabContent = null;
  }

  // JSX to display the tab container with tabs and determined content
  return (
    <div className="recipe--container w-[70rem] h-[28rem] mx-auto">
      <RecipeTabs activeTab={activeTab} handleTabClick={handleTabClick} />
      {tabContent}
    </div>
  );
};
