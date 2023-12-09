import { useState } from "react";

export const RecipeTabs = ({ categories }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (categoryId) => {
    setActiveTab(categoryId);
  };

  return (
    <ul className="nav nav-tabs justify-center">
      {categories.map((category) => {
        return (
          <li className="nav-item cursor-pointer" key={category.id}>
            <a
              className={`nav-link ${activeTab == category.id ? "active" : ""}`}
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
