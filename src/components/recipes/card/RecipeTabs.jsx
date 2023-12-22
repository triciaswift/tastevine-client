export const RecipeTabs = ({ activeTab, handleTabClick }) => {
  const tabs = [
    { id: 0, label: "Recipe" },
    { id: 1, label: "Image" },
    { id: 2, label: "Notes" },
  ];

  return (
    <ul className="nav">
      {tabs.map((tab) => (
        <li key={tab.id} className="nav-item cursor-pointer">
          <a
            className={`tabs ${
              activeTab === tab.id
                ? "active bg-cyan-600 text-white border-x-cyan-600 border-t-cyan-600"
                : "bg-cyan-100 border-x-cyan-600 border-t-cyan-600 hover:border-0 hover:bg-cyan-600 hover:border-b hover:border-b-cyan-600 hover:text-white"
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
