import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({})

    const addToCart = (itemsId) => {
        if (!cartItems[itemsId]){
            setCartItems((prev) => ({...prev, [itemsId]: 1}))
        }
        else{
            setCartItems((prev) => ({...prev, [itemsId]:prev[itemsId]+1}))
        }
    }

    const removeFromCart = (itemsId) => {
        setCartItems((prev) => ({...prev, [itemsId]:prev[itemsId]-1}))
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0

        for (const item in cartItems){
            if (cartItems[item] > 0){
                let itemInfo = food_list.find((p) => p._id === item)
                totalAmount += itemInfo.price * cartItems[item]
            }
        }
        return totalAmount
    }

    const contextvalue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    }

    return <StoreContext.Provider value={contextvalue}>
        {props.children}
    </StoreContext.Provider>
}

export default StoreContextProvider