import React, { useContext, useState } from 'react'
import "./LoginPopup.css"
import { assets } from '../../assets/assets'
import { User } from '../../scripts/User'
import { StoreContext } from '../../context/StoreContext'

const LoginPopup = ({ setShowLogin }) => {

    const [currState, setCurrState] = useState("Sign Up")
    const [showPassword, setShowPassword] = useState(false)

    const { notify } = useContext(StoreContext)
    let { setCurrentUserState } = useContext(StoreContext)


    const resetFields = (parent, status) => {
        if (status === "Sign Up") {
            const nameValue = parent[0]
            const emailValue = parent[1]
            const passwordValue = parent[2].childNodes[0]

            nameValue.value = ""
            emailValue.value = ""
            passwordValue.value = ""
        }
        else {
            const emailValue = parent[0]
            const passwordValue = parent[1].childNodes[0]
            emailValue.value = ""
            passwordValue.value = ""
        }
    }

    const registerUser = (e) => {
        e.preventDefault()
        let inputChilds = e.target.childNodes[1].childNodes
        if (currState === "Sign Up") {
            const nameValue = inputChilds[0].value
            const emailValue = inputChilds[1].value
            const passwordValue = inputChilds[2].childNodes[0].value
            try {
                User.registerUser(nameValue, emailValue, passwordValue, setCurrentUserState)
                notify("Sign Up Success", "success")
                setShowLogin(false)
                resetFields(inputChilds, currState)
                document.body.classList.remove("hide")
            } catch (error) {
                notify(error.message, "error")
                console.log(error);
            }
        }
        else if (currState === "Login") {
            const emailValue = inputChilds[0].value
            const passwordValue = inputChilds[1].childNodes[0].value
            try {
                console.log(emailValue, passwordValue);
                if (User.authenticateUser(emailValue, passwordValue, setCurrentUserState)) {
                    notify("Login Success", "success")
                    setShowLogin(false)
                    resetFields(inputChilds, currState)
                    document.body.classList.remove("hide")
                }
                else {
                    notify("Password wrong try again!", "error")
                }
            } catch (error) {
                console.log(error);
                notify(error.message, "error")
            }
        }
    }

    return (
        <div className="login-popup">
            <form className="login-popup-container" onSubmit={registerUser}>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img src={assets.cross_icon} alt="close" onClick={() => {
                        setShowLogin(false);
                        document.body.classList.remove("hide")
                    }} />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : <input type="text" placeholder='Your name' required />}
                    <input type="email" placeholder='Your email' required />
                    <div className='password-wrapper'>
                        {
                            currState === "Login" ?
                                <input type={showPassword ? "text" : "password"} placeholder='Password' required />
                                :
                                <input type={showPassword ? "text" : "password"} placeholder='Password' pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^\/])[A-Za-z\d@.#$!%*?&^\/]{8,16}$" title='Create a Strong Password: Must contain at least one lowercase letter, one uppercase letter, one digit, one special character (@.#$!%*?&), and be between 8 to 16 characters long.' minLength={8} maxLength={16} required />
                        }
                        <span onClick={() => { setShowPassword(!showPassword); }}>
                            <img src={showPassword ? assets.show : assets.hide} alt="icon" />
                        </span>
                    </div>
                </div>
                <button>{currState === "Sign Up" ? "Create Account" : "Login"}</button>

                {
                    currState === "Login"
                        ?
                        <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                        :
                        <>
                            <div className="login-popup-condition">
                                <input type="checkbox" required />
                                <p>By continuing, I agree to the terms of use & privacy policy.</p>
                            </div>
                            <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                        </>

                }
            </form>
        </div>
    )
}

export default LoginPopup