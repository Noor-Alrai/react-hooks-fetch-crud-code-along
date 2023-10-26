import React from "react";

function Item({ item , onUpdateItem , onDeleteItem}) {
  function handleAddToCart(){
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers:{
        "Content-Type" : "Application/json"
      },
      body: JSON.stringify({
        isInCart : !item.isInCart,
      })

      
    })
    .then(r =>r.json())
    .then((updateItem) => onUpdateItem(updateItem))
  }
  function handleDeleteItem(){

    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE" ,
    })
    .then(r => r.json())
    .then(() => onDeleteItem(item))
  }
  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button onClick={handleAddToCart} className={item.isInCart ? "remove" : "add"}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteItem}>Delete</button>
    </li>
  );
}

export default Item;
