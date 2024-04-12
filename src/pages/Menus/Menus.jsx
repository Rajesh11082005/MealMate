import React, { useState } from 'react'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'

const Menus = () => {
    const [category, setCategory] = useState("All")

  return (
    <div className="menu-page">
        <ExploreMenu category={category} setCategory={setCategory}/>
        <FoodDisplay category={category} atWhat="menu"/>
    </div>
  )
}

export default Menus