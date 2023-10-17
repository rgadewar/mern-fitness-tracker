import React from 'react';
import styles from './Footer.module.css';
import { SocialIcon } from 'react-social-icons';
const Footer = () => {
  return (
    <div>

      <footer id="footer" className={styles['footerCard']}>
        <div >
          <h4>Address</h4>
          <p>
            11900 Metric Blvd Suite K<br />
            Austin, TX 78758 - US<br />
          </p>
        </div>
        <div className={styles['footerCard']}>
          
          <p>
            <strong>Phone:</strong> +1 (123) 456 7899<br />
            <strong>Email:</strong> info@example.com<br />
          </p>
        </div>
  
        <div >
          <h4>Opening Hours</h4>
          <p>
            <strong>Mon-Sat: 11AM - 7PM<br />
              Sunday: Closed</strong>
          </p>
        </div>
  
  
      
        <div className="social-links">
        <SocialIcon href="https://www.instagram.com/taylor.golden.33"
url="www.instagram.com" target="_blank" />
            <SocialIcon href="https://www.linkedin.com/in/taylor-golden-212b19257"url="www.linkedin.com"target="_blank" />
            <SocialIcon href="https://www.github.com/kumoko8"url="www.github.com"target="_blank" />
            <SocialIcon href="https://www.facebook.com/taylor.golden.33"url="www.facebook.com"target="_blank" />
        </div>
        <h4 >For questions,and comments, contact us!</h4>
       <p>Copyright © 2023  Track. All rights reserved.</p>
      </footer>
     
    </div>
     
  );
};

export default Footer;
