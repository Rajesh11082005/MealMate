import React, { useContext, useEffect, useState } from 'react'
import "./FoodItem.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import { Cart } from '../../scripts/Cart'


const FoodItem = ({id, name, price, description, image}) => {
    
    const {addToCart, removeFromCart , setShowLogin, currentUserState, cartItems, setCartItems} = useContext(StoreContext)
    
    
    useEffect(() => {
        setCartItems(Cart.cartItems);
    }, []);
    
    const updateCartItems = (uid) => {
        const updatedCartItems = { ...Cart.cartItems };
        setCartItems(updatedCartItems);
    };

    const handleOnclickForAddItems = (uid,id) =>{
        if (currentUserState.currentUser.id !== 0){
            addToCart(uid, id)
            updateCartItems(uid);
            console.log(cartItems);
        }
        else{
            window.scrollTo(0,0)
            document.body.classList.add("hide")
            setShowLogin(true)
        }
    }

    const handleOnclickForRemoveItems = (uid,id) =>{
        if (currentUserState.currentUser.id !== 0){
            removeFromCart(uid, id)
            updateCartItems(uid);
        }
        else{
            window.scrollTo(0,0)
            document.body.classList.add("hide")
            setShowLogin(true)
        }
    }
    

  return (
    <div className="food-item" id={id}>
        <div className="food-item-container">
            <img src={image} className='food-item-img' alt="image" />
            {
                cartItems[currentUserState.currentUser.id] ? !cartItems[currentUserState.currentUser.id][id] ? 
                <img src={assets.add_icon_white} onClick={() => handleOnclickForAddItems(currentUserState.currentUser.id, id)} alt="add" className="add" /> :
                <div className="food-item-counter">
                    <img onClick={() => handleOnclickForRemoveItems(currentUserState.currentUser.id, id)} src={assets.remove_icon_red} alt="remove" />
                    <p>{cartItems[currentUserState.currentUser.id][id]}{console.log(cartItems[currentUserState.currentUser.id][id])}</p>
                    <img onClick={() => handleOnclickForAddItems(currentUserState.currentUser.id, id) } src={assets.add_icon_green} alt="add" />
                </div>
                :
                <img src={assets.add_icon_white} onClick={() => handleOnclickForAddItems(currentUserState.currentUser.id, id)} alt="add" className="add" /> 
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