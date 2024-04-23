import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer-logo">
                <img src='/images/Logo.jpg' alt='Logo' />
                <p>SZOVEG</p>
            </div>
            <ul className="footer-links">
                <li>Company</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <div className="footer-icon">
                <div className="footer-icons-container">
                    <img src='/images/facebook_logo.webp' alt="Facebook" />
                </div>
                <div className="footer-icons-container">
                    <img src='/images/instagram_logo.webp' alt="Instagram" />
                </div>
            </div>
            <div className="footer-copyright">
                <hr />
                <p>Copyright @ 2024 - All Rigth Reserved</p>
            </div>
        </div>
    )
}

export default Footer;
