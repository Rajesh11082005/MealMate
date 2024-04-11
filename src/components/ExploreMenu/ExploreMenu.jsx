import React, { useContext } from 'react'
import "./ExploreMenu.css"
import { menu_list } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const ExploreMenu = ({category, setCategory}) => {

    const {menu_list} = useContext(StoreContext)

  return (
    <div className="explore-menu" id="explore-menu">
        <h1>Explore Our Menu</h1>
        <p className='explore-menu-text'>Explore our diverse menu offerings and discover a world of culinary delights to satisfy your cravings!</p>
        <div className="explore-menu-list">
            {menu_list.map((item, index) => {
                return (
                    <div onClick={() => setCategory(prev => prev === item.category ? "All" : item.category)} key={index} className="explore-menu-list-item">
                        <img className={category === item.category ? "active" : "" } src={item.categoryImage} alt="imge" />
                        <p>{item.category}</p>
                    </div>
                )
            })}
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu