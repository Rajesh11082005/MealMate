import React, { useContext } from 'react'
import "./FoodDisplay.css"
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import { useNavigate } from 'react-router-dom'

const FoodDisplay = ({category, atWhat}) => {

    const {food_list} = useContext(StoreContext)

    const navigator = useNavigate()

    const count = 8;

  return (
    <div className="food-display" id="food-display">
        <h2>Top dishes near you</h2>

        <div className="food-display-list">
            {   
                atWhat === "home" ?
                food_list.map((food, index) =>{
                    if (category === "All" || category === food.category){
                        if (count > index){
                            return (
                                <FoodItem key={index} id={food.id} name={food.name} description={food.desc} price={food.price} image={food.image} />
                            )
                        }
                    }
                })
                :
                food_list.map((food, index) =>{
                    if (category === "All" || category === food.category){
                        return (
                            <FoodItem key={index} id={food.id} name={food.name} description={food.desc} price={food.price} image={food.image} />
                        )
                    }
                })
            }
        </div>
        {
            atWhat === "home" ? 
            <div className='view-more-button-wrapper'><button onClick={()=> {navigator("/menu");window.scrollTo(0,0)}}>View more</button></div>:
            <></>
        }
    </div>
  )
}

export default FoodDisplay