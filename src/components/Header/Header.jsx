import React from 'react'
import "./Header.css"

const Header = () => {
    return (
        <div className="header">
            <div className="header-contents">
                <h2>Order your favorite food here</h2>
                <p>Welcome to MealMate! Browse our wide selection of delicious meals and ingredients, handpicked just for you. Whether you're craving something savory or sweet, we have it all. Place your order now and let us take care of the rest!</p>
                <button className='view-more'>View Menu</button>
            </div>
        </div>
    )
}

export default Header