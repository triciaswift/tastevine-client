export const CategoryTabs = ({ categories, activeTab, handleTabClick }) => {
  return (
    <ul className="nav justify-center">
      {categories.map((category) => {
        return (
          <li className="nav-item cursor-pointer" key={category.id}>
            <a
              className={`tabs ${
                activeTab == category.id
                  ? "active bg-cyan-600 text-white border-x-cyan-600 border-t-cyan-600"
                  : "bg-cyan-100 border-x-cyan-600 border-t-cyan-600 hover:border-0 hover:bg-cyan-600 hover:border-b hover:border-b-cyan-600 hover:text-white"
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
