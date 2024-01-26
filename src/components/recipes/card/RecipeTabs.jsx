export const RecipeTabs = ({ activeTab, handleTabClick }) => {
  // Array of tabs with their respective ids and labels
  const tabs = [
    { id: 0, label: "Recipe" },
    { id: 1, label: "Image" },
    { id: 2, label: "Notes" },
  ];

  // JSX to display the tabs for the recipe details page
  return (
    <ul className="nav">
      {tabs.map((tab) => (
        <li key={tab.id} className="nav-item cursor-pointer">
          <a
            className={`tabs ${
              activeTab === tab.id
                ? "active bg-green-800 text-white border-x-green-600 border-t-green-600"
                : "bg-green-100 border-x-green-600 border-t-green-600 hover:border-0 hover:bg-green-800 hover:border-b hover:border-b-green-600 hover:text-white"
            }`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </a>
        </li>
      ))}
    </ul>
  );
};
