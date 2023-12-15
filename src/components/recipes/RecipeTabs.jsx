export const RecipeTabs = ({ categories, activeTab, handleTabClick }) => {
  return (
    <ul className="nav nav-tabs justify-center">
      {categories.map((category) => {
        return (
          <li className="nav-item cursor-pointer" key={category.id}>
            <a
              className={`nav-link ${
                activeTab == category.id ? "active" : "text-black"
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
