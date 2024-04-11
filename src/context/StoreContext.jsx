import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import { Cart } from "../scripts/Cart.jsx";
import { User } from "../scripts/User.jsx";
import Order, { Delivery, PaymentMethods } from "../scripts/Order.jsx";
import Discount from "../scripts/Discount.jsx";
import Menu, { Category } from "../scripts/Menu";
import { toast } from "react-hot-toast";




export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState(Cart.cartItems)

    const [showLogin, setShowLogin] = useState(false)

    
    User.setCurrentUser();
    const [currentUserState, setCurrentUserState] = useState(User.currentUser)
    const notify = (msg, type) => {
        if (type === "error"){
            toast.error(msg)
        }
        else if (type === "success"){
            toast.success(msg)
        }
    };
    
    const food_list = Menu.getAllMenuItems();
    const menu_list = Category.getCategories()
    const getTotalCartAmount = Cart.getTotalCartAmount
    const addToCart = Cart.addToCart
    const removeFromCart = Cart.removeFromCart

    const contextvalue = {
        Menu,
        Cart,
        Discount,
        Order,
        Delivery,
        PaymentMethods,
        food_list,
        menu_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        currentUserState,
        setCurrentUserState,
        showLogin,
        setShowLogin,
        notify
    }

    return <StoreContext.Provider value={contextvalue}>
        {props.children}
    </StoreContext.Provider>
}

    // const addToCart = (itemsId) => {
    //     if (!cartItems[itemsId]){
    //         setCartItems((prev) => ({...prev, [itemsId]: 1}))
    //     }
    //     else{
    //         setCartItems((prev) => ({...prev, [itemsId]:prev[itemsId]+1}))
    //     }
    // }

    // const removeFromCart = (itemsId) => {
    //     setCartItems((prev) => ({...prev, [itemsId]:prev[itemsId]-1}))
    // }

    // const getTotalCartAmount = () => {
    //     let totalAmount = 0

    //     for (const item in cartItems){
    //         if (cartItems[item] > 0){
    //             let itemInfo = food_list.find((p) => p._id === item)
    //             totalAmount += itemInfo.price * cartItems[item]
    //         }
    //     }
    //     return totalAmount
    // }

export default StoreContextProvider