import { useEffect, useState } from "react";
import {
  deleteGroceryItem,
  deleteGroceryList,
  getGroceryCategories,
  getGroceryList,
  updateGroceryItem,
} from "../../managers/GroceryListManager";
import { FormInput } from "../../utils/FormInput";

export const GroceryList = ({ token }) => {
  const [groceries, setGroceries] = useState({});
  const [groceryCategories, setCategories] = useState([]);

  const fetchGroceryList = async () => {
    try {
      const response = await getGroceryList(token);

      // Check if the response indicates that the grocery list doesn't exist
      if (response && response.status === 404) {
        // Grocery list doesn't exist, set groceries to null
        setGroceries(null);
      } else {
        // Grocery list exists, set groceries to the response data
        setGroceries(response);
      }
    } catch {
      setGroceries(null);
    }
  };

  useEffect(() => {
    fetchGroceryList();
    getGroceryCategories(token).then(setCategories);
  }, []);

  const handleCheckboxChange = async (groceryItemId, checked) => {
    const copy = {
      ...groceries,
      groceries: groceries.groceries.map((item) =>
        item.id === groceryItemId ? { ...item, checked } : item
      ),
    };
    setGroceries(copy);
    const itemCopy = {
      id: groceryItemId,
      checked,
    };
    await updateGroceryItem(itemCopy, token);
  };

  const handleDeleteItem = (itemId) => {
    //* used to delete a single item from the grocery list
    deleteGroceryItem(itemId, token).then(() => fetchGroceryList());
  };

  const handleDeleteCheckedItems = () => {
    //* used to delete all the completed items on grocery list
    const checkedItemsIds = groceries.groceries
      .filter((groceryItem) => groceryItem.checked) // filtered all items where checked = true
      .map((groceryItem) => groceryItem.id); // added each filtered item id to checkedItemsIds array
    //? returns an array of checked ids

    if (checkedItemsIds.length > 0) {
      // iterates through the array and deletes each item
      checkedItemsIds.forEach((itemId) => {
        deleteGroceryItem(itemId, token).then(() => fetchGroceryList());
      });
    }
  };

  const handleDeleteList = () => {
    deleteGroceryList(groceries.id, token).then(() => setGroceries(null));
  };

  const filterGroceriesByCategory = (categoryId) => {
    if (groceries && groceries.groceries && groceries.groceries.length) {
      return groceries.groceries
        .filter((groceryItem) => !groceryItem.checked)
        .filter(
          (grocery) => grocery.ingredient.grocery_category === categoryId
        );
    }
  };

  const categorizedGroceries = groceryCategories.map((category) => {
    const categoryGroceries = filterGroceriesByCategory(category.id);
    return {
      categoryTitle: category.category,
      groceries: categoryGroceries,
    };
  });

  const displayUncheckedItems = () => {
    if (groceries && groceries.groceries && groceries.groceries.length) {
      return (
        <div className="uncheckedItems--container">
          {categorizedGroceries.map(
            (category, index) =>
              // Check if the category has any groceries before rendering
              category.groceries.length > 0 && (
                <div key={`category-${index}`}>
                  <h3>{category.categoryTitle}</h3>
                  {category.groceries.map((groceryItem) => (
                    <div key={groceryItem.id}>
                      <FormInput
                        type="checkbox"
                        className="form-check-input"
                        checked={false}
                        onChange={() =>
                          handleCheckboxChange(groceryItem.id, true)
                        }
                      />
                      <label>{groceryItem.ingredient.name}</label>
                      <i
                        className="icon fa-solid fa-trash fa-sm cursor-pointer"
                        onClick={() => handleDeleteItem(groceryItem.id)}
                      ></i>
                    </div>
                  ))}
                </div>
              )
          )}
        </div>
      );
    }
    // return null; // Return null if there are no groceries
  };

  const displayCheckedItems = () => {
    if (groceries && groceries.groceries && groceries.groceries.length) {
      return (
        <div className="checkedItems--container">
          <div className="flex items-center justify-center">
            <h4>Completed Items</h4>
            <i
              className="icon fa-solid fa-trash fa-sm cursor-pointer"
              onClick={handleDeleteCheckedItems}
            ></i>
          </div>
          {groceries.groceries
            .filter((groceryItem) => groceryItem.checked)
            .map((groceryItem) => (
              <div key={groceryItem.id}>
                <FormInput
                  type="checkbox"
                  className="form-check-input"
                  checked={true}
                  onChange={() => handleCheckboxChange(groceryItem.id, false)}
                />
                <label>{groceryItem.ingredient.name}</label>
              </div>
            ))}
        </div>
      );
    }
  };

  return (
    <section>
      <h2>Grocery List</h2>
      <div className="flex flex-col items-center">
        {groceries ? (
          <div className="items--container">
            {displayUncheckedItems()}
            {displayCheckedItems()}
          </div>
        ) : (
          <div>No saved items!</div>
        )}
      </div>
      <div className="text-center">
        <button className="btn btn-primary" onClick={handleDeleteList}>
          Delete All
        </button>
      </div>
    </section>
  );
};
