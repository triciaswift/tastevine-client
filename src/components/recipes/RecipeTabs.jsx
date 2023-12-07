/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getAllCategories } from "../../managers/CategoryManager";

export const RecipeTabs = ({ token }) => {
  const [allCategories, setAllCategories] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    getAllCategories(token).then((catArr) => {
      setAllCategories(catArr);
    });
  }, [token]);

  const handleTabClick = (categoryId) => {
    setActiveTab(categoryId);
  };

  return (
    <ul className="nav nav-tabs justify-center">
      {allCategories.map((category) => {
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
