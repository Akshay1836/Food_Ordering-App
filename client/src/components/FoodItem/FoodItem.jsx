import React, { useState,useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import {storeContext} from "../../Context/storeContext"
const FoodItem = ({id,name,description,price,image}) => {
  const [itemCount, setItemCount] = useState(0);

  const {cartItems,setCartItems,addToCart,removeFromCart,url}= useContext(storeContext)
   
  return (
    <div className="food-item">
      <div className="image-container">
        <img src={url+"/images/"+image} className="image" alt="" />
        {!cartItems[id] ? (
          <img
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            className="add"
            alt=""
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-description">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
