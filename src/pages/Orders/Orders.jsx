import React from 'react'
import Order from '../../scripts/Order'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Orders = () => {
    return (
        <>
            {console.log(Order.getFromLocalStorage())}
            {
                Order.getFromLocalStorage() === undefined ?
                    <div className="empty-cart">
                        <img src={assets.noOrders} alt="empty-cart" />
                        <Link to="/menu"><button>Explore Menu</button></Link>
                    </div> :
                    <>
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

                            </div>
                        </div>
                    </>
            }
        </>
    )
}

export default Orders