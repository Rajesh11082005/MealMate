import React, { useContext, useState } from 'react'
import "./NavBar.css"
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import { User } from '../../scripts/User'

const NavBar = ({setShowLogin}) => {

    const [menu, setMenu] = useState("home")

    const {getTotalCartAmount, currentUserState, setCurrentUserState,} = useContext(StoreContext)


  return (
    <div className='navbar'>
        <Link to="/"><h1 className="logo">MealMate.</h1></Link>
        <ul className="navbar-menu">
            <Link to="/" onClick={() => {setMenu("home")}} className={menu === "home" ? "active" : ""}>Home</Link>
            <a href='#explore-menu' onClick={() => {setMenu("menu")}} className={menu === "menu" ? "active" : ""}>Menu</a>
            <a href='#app-download' onClick={() => {setMenu("moblie-app")}} className={menu === "moblie-app" ? "active" : ""}>Mobile App</a>
            <a href='#footer' onClick={() => {setMenu("contact-us")}} className={menu === "contact-us" ? "active" : ""}>Contact Us</a>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt="search-icon" />
            <div className="navbar-search-icon">
                <Link to="/cart" ><img src={assets.basket_icon} alt="" /></Link>
                {console.log(currentUserState.currentUser.id)}
                {console.log(getTotalCartAmount(currentUserState.currentUser.id))}
                <div className={!getTotalCartAmount(currentUserState.currentUser.id) ? "" : "dot"}></div>
            </div>
            {
                (currentUserState.currentUser.id === 0)?
                <button onClick={() => setShowLogin(true)}>Sign In{console.log(currentUserState)}</button>:
                <>
                    <span>
                        Hi, <h4 style={{display:"inline"}}>{currentUserState.currentUser.username}</h4>
                    </span>
                    <button onClick={()=>{setCurrentUserState({currentUser:{id:0, username:"guest"}}); User.saveCurrentUserToLocalStorage({id:0 , username:"guest"}); User.setCurrentUser()}}>Sign Out</button>
                </>

            }
        </div>
    </div>
  )
}

export default NavBar