import React, { useEffect ,useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
   fetch("http://localhost:4000/items")
   .then(r => r.json())
   .then(items => setItems(items))
  }, [])
 function handleAddNewItem(newItem){
    setItems([...items , newItem])
 }
 function handleUpateItem(updateItem){
  const updateItems = items.map(item => {
    if (item.id === updateItem.id){
      return updateItem
    }
    else {
      return item
    }
    
  })
  setItems(updateItems);
 }
 function handleDeleteItem(deleteItem){
  const updateItems = items.filter((item) =>
    item.id !== deleteItem.id
  )
  setItems(updateItems);
 }
  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm AddNewItem={handleAddNewItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpateItem} onDeleteItem={handleDeleteItem} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
