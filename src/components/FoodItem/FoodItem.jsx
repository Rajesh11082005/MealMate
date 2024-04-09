import React, { useContext, useState } from 'react'
import "./FoodItem.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({id, name, price, description, image}) => {

    const {cartItems, addToCart, removeFromCart} = useContext(StoreContext)

  return (
    <div className="food-item" id={id}>
        <div className="food-item-container">
            <img src={image} className='food-item-img' alt="image" />
            {
                !cartItems[id] ?
                <img src={assets.add_icon_white} onClick={() => addToCart(id)} alt="add" className="add" /> :
                <div className="food-item-counter">
                    <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="remove" />
                    <p>{cartItems[id]}</p>
                    <img onClick={() =>addToCart(id) } src={assets.add_icon_green} alt="add" />
                </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="stars" />
            </div>
            <p className="food-item-desc">
                {description}
            </p>
            <p className="food-item-price">${price}</p>
        </div>
    </div>
  )
}

export default FoodItem