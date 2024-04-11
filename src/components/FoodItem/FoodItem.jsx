import React, { useContext, useState } from 'react'
import "./FoodItem.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({id, name, price, description, image}) => {

    const {cartItems, addToCart, removeFromCart, showLogin , setShowLogin, currentUserState, setCartItems} = useContext(StoreContext)

    const handleOnclickForFirstClick = (uid,id, callbackFunction) =>{
        if (currentUserState.currentUser.id !== 0){
            addToCart(uid, id, callbackFunction)
        }
        else{
            setShowLogin(true)
        }
    }

  return (
    <div className="food-item" id={id}>
        <div className="food-item-container">
            <img src={image} className='food-item-img' alt="image" />
            {console.log(cartItems)}
            {console.log(cartItems[currentUserState.currentUser.id])}
            {
                !cartItems[currentUserState.currentUser.id] ?
                <img src={assets.add_icon_white} onClick={() => handleOnclickForFirstClick(currentUserState.currentUser.id, id, setCartItems)} alt="add" className="add" /> :
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