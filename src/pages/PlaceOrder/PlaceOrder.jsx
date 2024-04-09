import React, { useContext } from 'react'
import "./PlaceOrder.css"
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const PlaceOrder = () => {
    const { getTotalCartAmount } = useContext(StoreContext)
    return (
        <>
            {
                (getTotalCartAmount()) === 0 ? 
                (
                    <div className="empty-cart">
                        <img src={assets.emptycart} alt="empty-cart" />
                        <Link to="/#explore-menu"><button>Explore Menu</button></Link>
                    </div>
                )
                :
                (<form className='place-order'>
                    <div className="place-order-left">
                        <p className="title">Delivery Information</p>
                        <div className="multi-feilds">
                            <input type="text" placeholder='First name' />
                            <input type="text" placeholder='Last name' />
                        </div>
                        <input type="email" placeholder='Email address' />
                        <input type="text" placeholder='Street' />
                        <div className="multi-feilds">
                            <input type="text" placeholder='City' />
                            <input type="text" placeholder='State' />
                        </div>
                        <div className="multi-feilds">
                            <input type="text" placeholder='Pin code' />
                            <input type="text" placeholder='Country' />
                        </div>
                        <input type="text" placeholder='Phone' />

                    </div>
                    <div className="place-order-right">
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
                                    <p>{getTotalCartAmount() === 0 ? 0 : 2}</p>
                                </div>
                                <hr />
                                <div className="cart-total-details">
                                    <p>Total</p>
                                    <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
                                </div>
                            </div>
                            <button>Proceed to payment</button>
                        </div>
                    </div>
                </form>)
            }

        </>
    )
}

export default PlaceOrder