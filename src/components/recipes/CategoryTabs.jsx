export const CategoryTabs = ({ categories, activeTab, handleTabClick }) => {
  return (
    <ul className="nav justify-center">
      {categories.map((category) => {
        return (
          <li className="nav-item cursor-pointer" key={category.id}>
            <a
              className={`tabs ${
                activeTab == category.id
                  ? "active bg-beige border-beige"
                  : "bg-yellow-50 border-x-yellow-300 border-t-yellow-300 hover:border-0 hover:bg-beige hover:border-b hover:border-b-beige hover:text-black"
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
