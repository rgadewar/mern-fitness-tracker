import React from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import styles from "./footer.module.css";

const iconStyle = {
  color: 'black', // Set the color to black
  fontSize: 30,    // Adjust the font size if needed
};
const centerText = {
  textAlign: 'center',
};
const Footer = () => {
  return (
    <footer id="footer" className="footer bg-light text-black">
      <div className="container">
        <div className="row gy-3">
          <div className="col-lg-3 col-md-6">
            <i className="bi bi-geo-alt icon"></i>
            <div>
              <h4>Address</h4>
              <p>
                11900 Metric Blvd Suite K<br />
                Austin, TX 78758 - US<br />
              </p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <i className="bi bi-telephone icon"></i>
            <div>
              <h4>For questions,and comments, contact us!</h4>
              <p>
                <strong>Phone:</strong> +1 (123) 456 7899<br />
                <strong>Email:</strong> info@example.com<br />
              </p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <i className="bi bi-clock icon"></i>
            <div>
              <h4>Office Hours</h4>
              <p>
                <strong>Mon-Fri: 9AM - 5PM<br />
                Sunday: Closed</strong>
              </p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 footer-links">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#" className="social-link">
                <TwitterIcon style={iconStyle} />
              </a>
              <a href="#" className="social-link">
                <FacebookIcon style={iconStyle} />
              </a>
              <a href="#" className="social-link">
                <InstagramIcon style={iconStyle} />
              </a>
              <a href="#" className="social-link">
                <LinkedInIcon style={iconStyle} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div style={centerText}>
        <p>Copyright © 2023 Track. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
