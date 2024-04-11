import React, { useContext, useState } from 'react'
import "./FoodItem.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import { Cart } from '../../scripts/Cart'

const FoodItem = ({id, name, price, description, image}) => {

    const {addToCart, removeFromCart , setShowLogin, currentUserState} = useContext(StoreContext)

    const [cartItems, setCartItems] = useState(Cart.cartItems)

    const handleOnclickForAddItems = (uid,id, callbackFunction) =>{
        if (currentUserState.currentUser.id !== 0){
            addToCart(uid, id)
            setCartItems(Cart.cartItems)
            console.log(cartItems);
        }
        else{
            setShowLogin(true)
        }
    }

    const handleOnclickForRemoveItems = (uid,id, callbackFunction) =>{
        if (currentUserState.currentUser.id !== 0){
            removeFromCart(uid, id, callbackFunction)
            setCartItems(Cart.cartItems)
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
                <img src={assets.add_icon_white} onClick={() => handleOnclickForAddItems(currentUserState.currentUser.id, id)} alt="add" className="add" /> :
                <div className="food-item-counter">
                    <img onClick={() => handleOnclickForRemoveItems(currentUserState.currentUser.id, id)} src={assets.remove_icon_red} alt="remove" />
                    <p>{cartItems[currentUserState.currentUser.id][id]}</p>
                    <img onClick={() => handleOnclickForAddItems(currentUserState.currentUser.id, id) } src={assets.add_icon_green} alt="add" />
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