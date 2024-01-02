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
        <div className="uncheckedItems--container flex flex-wrap justify-center gap-4 bg-white border-8 border-double border-green-800 rounded-lg p-3">
          {categorizedGroceries.map(
            (category, index) =>
              // Check if the category has any groceries before rendering
              category.groceries.length > 0 && (
                <div
                  key={`category-${index}`}
                  className="pb-4 basis-[25rem] bg-slate-400/20 rounded-lg"
                >
                  <h3 className="bg-green-800 text-white rounded-full mb-3 mx-8 px-4 mt-3">
                    {category.categoryTitle}
                  </h3>
                  <div className="px-4">
                    {category.groceries.map((groceryItem) => (
                      <div key={groceryItem.id}>
                        <FormInput
                          type="checkbox"
                          checked={false}
                          onChange={() =>
                            handleCheckboxChange(groceryItem.id, true)
                          }
                        />
                        <label className="mx-2">
                          {groceryItem.ingredient.name}
                        </label>
                        <i
                          className="icon fa-solid fa-trash fa-sm cursor-pointer"
                          onClick={() => handleDeleteItem(groceryItem.id)}
                        ></i>
                      </div>
                    ))}
                  </div>
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
        <div className="checkedItems--container bg-white/50 rounded-lg p-2">
          <div className="flex items-center justify-center opacity-70">
            <h4 className="mr-2">Completed Items</h4>
            <i
              className="icon fa-solid fa-trash fa-sm cursor-pointer"
              onClick={handleDeleteCheckedItems}
            ></i>
          </div>
          <div className="flex flex-col items-center opacity-70">
            <div className="flex flex-col">
              {groceries.groceries
                .filter((groceryItem) => groceryItem.checked)
                .map((groceryItem) => (
                  <div key={groceryItem.id} className="basis-1/5 px-2">
                    <FormInput
                      type="checkbox"
                      checked={true}
                      onChange={() =>
                        handleCheckboxChange(groceryItem.id, false)
                      }
                    />
                    <label className="px-2">
                      {groceryItem.ingredient.name}
                    </label>
                  </div>
                ))}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <section className="my-14 mx-[22rem]">
      <h1>Grocery List</h1>
      <div>
        {groceries ? (
          <div className="items--container">
            <div className="p-2 rounded-lg mb-20">
              {displayUncheckedItems()}
            </div>
            <div className="flex justify-center">
              <div className="p-2 rounded-lg w-1/4 bg-slate-300">
                {displayCheckedItems()}
              </div>
            </div>
            <div className="text-center mt-8">
              <button className="btn btn-danger" onClick={handleDeleteList}>
                Delete All
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">No saved items!</div>
        )}
      </div>
    </section>
  );
};
