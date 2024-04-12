import React, { useContext } from 'react'
import "./PlaceOrder.css"
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { Cart } from '../../scripts/Cart'
import { PaymentMethods } from '../../scripts/Order'
import { toast } from 'react-hot-toast'

const PlaceOrder = () => {
    const { getTotalCartAmount, currentUserState, notify} = useContext(StoreContext)

    const getValuesFromFeilds = (e) =>{
        const selctedRadioBox = e.target.childNodes[1].childNodes[0].childNodes[2].childNodes[1].querySelector(".payment-input > input[name='radioset']:checked");
        const deliveryDetailsParent = e.target.childNodes[0]
        const deliveryDetailsOnlyDetails = deliveryDetailsParent.childNodes


        const multifeilds =[
            deliveryDetailsOnlyDetails[1],
            deliveryDetailsOnlyDetails[4],
            deliveryDetailsOnlyDetails[5],
        ]

        let fieldValues = {}


        if (selctedRadioBox){
            fieldValues.PaymentMethod = selctedRadioBox.value
        }
        else{
            fieldValues.PaymentMethod = ""
        }

        deliveryDetailsOnlyDetails.forEach(child =>{
            console.log(child.tagName);
            if (child.tagName === 'INPUT'){
                fieldValues[child.placeholder] = child.value
            }
        })

        multifeilds.forEach(multifeild => {
            multifeild.childNodes.forEach(field => {
                fieldValues[field.placeholder] = field.value
            })
        })

        return fieldValues
    }

    const checkFieldsEmpty = (fieldObject) => {
        const values = Object.values(fieldObject)
        
        return values.some(field => field === "");
    }

    const handleOnSubmitDeliveryForm = (e) => {
        e.preventDefault();
        const fieldObject = getValuesFromFeilds(e);

        if (checkFieldsEmpty(fieldObject)){
            notify("Please provide the Payment method!", "error");
        }
        else{
            toast.success('Order Placed', {
                style: {
                  border: '1px solid tomato',
                  padding: '16px',
                  color: 'tomato',
                },
                iconTheme: {
                  primary: 'tomato',
                  secondary: 'white',
                },
              });
            
            console.log("to be added");
        }
    }

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
                (<form className='place-order'  onSubmit={handleOnSubmitDeliveryForm}>
                    <div className="place-order-left">
                        <p className="title">Delivery Information</p>
                        <div className="multi-feilds">
                            {/* {console.log(urrentUserState.currentUser.username.split()[0])} */}
                            <input type="text" placeholder='First name'   />
                            <input type="text" placeholder='Last name' required />
                        </div>
                        <input type="email" placeholder='Email address' required />
                        <input type="text" placeholder='Street' required />
                        <div className="multi-feilds">
                            <input type="text" placeholder='City' required />
                            <input type="text" placeholder='State' required />
                        </div>
                        <div className="multi-feilds">
                            <input type="text" placeholder='Pin code' pattern='^\d{6}$' title='Please provide a correct Pin code' required />
                            <input type="text" placeholder='Country' required />
                        </div>
                        <input type="tel" placeholder='Phone' pattern='^\d{7,15}$' title='Please provide a valid phone number' required/>

                    </div>
                    <div className="place-order-right">
                        <div className="cart-total">
                            <h2>Cart Totals</h2>
                            <div>
                                <div className="cart-total-details">
                                    <p>SubTotal</p>
                                    <p>${getTotalCartAmount(currentUserState.currentUser.id) - Cart.DELIVERYFEE}</p>
                                </div>
                                <hr />
                                <div className="cart-total-details">
                                    <p>Delivery Fee</p>
                                    <p>${Cart.DELIVERYFEE}</p>
                                </div>
                                <hr />
                                <div className="cart-total-details">
                                    <p>Total</p>
                                    <p>${getTotalCartAmount(currentUserState.currentUser.id)}</p>
                                </div>
                            </div>
                            <div className="cart-payment-details">
                                <h2>Payment Details</h2>
                                
                                <form className="payment-details-input">
                                    {Object.keys(PaymentMethods.paymentMethods).map((ele, i) => 
                                        (
                                            <div key={i} className="payment-input">
                                                <input type="radio" name='radioset' id={ele} value={PaymentMethods.paymentMethods[+ele]}/>
                                                <label htmlFor={ele}>{PaymentMethods.paymentMethods[+ele]}</label>
                                            </div>
                                        )
                                    )}
                                </form>
                            </div>
                            <button>Place Order</button>
                        </div>

                    </div>
                </form>)
            }

        </>
    )
}

export default PlaceOrder