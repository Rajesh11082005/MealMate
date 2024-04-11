import React, { useContext } from 'react'
import "./Cart.css"
import { StoreContext } from '../../context/StoreContext'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { Cart as cart } from '../../scripts/Cart'


const Cart = () => {

    const { cartItems, food_list, removeFromCart, getTotalCartAmount, addToCart, currentUserState, setCurrentUserState} = useContext(StoreContext)

    const navigate = useNavigate()

    console.log(getTotalCartAmount());

    return (

        <>
            {
                (getTotalCartAmount(currentUserState.currentUser.id)) === 0 ?
                    (
                        <div className="empty-cart">
                            <img src={assets.emptycart} alt="empty-cart" />
                            <Link to="/#explore-menu"><button>Explore Menu</button></Link>
                        </div>
                    )
                    :
                    (
                        <div className="cart">
                            <div className="cart-items">
                                <div className="cart-items-title">
                                    <p>Items</p>
                                    <p>Title</p>
                                    <p>Price</p>
                                    <p>Quantity</p>
                                    <p>Total</p>
                                    <p>Remove</p>
                                </div>

                                <br />
                                <hr />

                                {
                                    food_list.map((item, index) => {
                                        if (cartItems[currentUserState.currentUser.id][item.id] > 0) {
                                            return (
                                                <div key={index}>
                                                    <div key={index} className="cart-items-title cart-items-item">
                                                        <img src={item.image} alt="img" />
                                                        <p>{item.name}</p>
                                                        <p>${item.price}</p>
                                                        <p>{cartItems[currentUserState.currentUser.id][item.id]}</p>
                                                        <p>${item.price * [currentUserState.currentUser.id][item.id]}</p>
                                                        {/* <div className='cross'>
                                                            <div className="food-item-counter">
                                                                <img onClick={() => removeFromCart(item._id)} src={assets.remove_icon_red} alt="remove" />
                                                                <p>{cartItems[item._id]}</p>
                                                                <img onClick={() => addToCart(item._id)} src={assets.add_icon_green} alt="add" />
                                                            </div>
                                                        </div> */}
                                                    </div>
                                                    <hr />
                                                </div>
                                            )
                                        }
                                    })
                                }

                            </div>

                            <div className="cart-bottom">
                                <div className="cart-total">
                                    <h2>Cart Totals</h2>
                                    <div>
                                        <div className="cart-total-details">
                                            <p>SubTotal</p>
                                            <p>${getTotalCartAmount()}</p>
                                        </div>
                                        <hr />
                                        <div className="cart-total-details">
                                            <p>Delivery Fee</p>
                                            <p>${getTotalCartAmount(currentUserState.currentUser.id) === 0 ? 0 : 2}</p>
                                        </div>
                                        <hr />
                                        <div className="cart-total-details">
                                            <p>Total</p>
                                            <p>${getTotalCartAmount(currentUserState.currentUser.id) === 0 ? 0 : getTotalCartAmount(currentUserState.currentUser.id) + cart.DELIVERYFEE}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => navigate("/order")}>Proceed to checkout</button>
                                </div>
                                <div className="cart-promo-code">
                                    <div>
                                        <p>If you have a promo code, Enter it here</p>
                                        <div className='cart-promocode-input'>
                                            <input type="text" placeholder='promo code' />
                                            <button>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
            }

        </>
    )
}

export default Cart