import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className="footer" id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                {/* <img src="" alt="" /> */}
                <h1 className="logo" style={{color:"tomato"}}>MealMate.</h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam perferendis esse enim earum aliquam ullam eaque deleniti quidem, cum maiores magni quibusdam quis dolorem obcaecati dicta dolorum? Molestias, ipsa asperiores.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="social" />
                    <img src={assets.twitter_icon} alt="social" />
                    <img src={assets.linkedin_icon} alt="social" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>Company</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-212-456-2345</li>
                    <li>contact@mealmate.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">
            &copy; 2024 MealMate. All rights reserved.
        </p>
    </footer>
  )
}

export default Footer