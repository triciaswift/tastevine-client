export const CategoryTabs = ({ categories, activeTab, handleTabClick }) => {
  // JSX for navigation bar with category tabs
  return (
    <ul className="nav justify-center border-b-green-800 border-b-2">
      {categories.map((category) => {
        return (
          <li className="nav-item cursor-pointer" key={category.id}>
            <a
              className={`tabs ${
                activeTab == category.id
                  ? "active bg-green-800 text-white border-x-green-800 border-t-green-800"
                  : "bg-green-700/50 border-x-green-800 border-t-green-800 hover:border-0 hover:bg-green-800 hover:border-b hover:border-b-green-800 hover:text-white"
              }`}
              onClick={() => {
                handleTabClick(category.id);
              }}
            >
              {category.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
};
