import React, { useContext, useEffect, useState } from 'react'
import NavBar from './components/NavBar/NavBar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Cart from './pages/Cart/Cart'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import { StoreContext } from './context/StoreContext'
import { Toaster } from 'react-hot-toast'
import Menus from './pages/Menus/Menus'
import Orders from './pages/Orders/Orders'


const App = () => {
  
  let {currentUserState, setCurrentUserState, cartItems, setCartItems} = useContext(StoreContext)
  

  const {showLogin , setShowLogin} = useContext(StoreContext)
  

  
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={true}
      />
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className='app'>
        <NavBar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path='/menu' element={<Menus />}></Route>
          <Route path="/yourOrders" element={<Orders />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App