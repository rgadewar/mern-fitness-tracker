import React from 'react';

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
              <h4>Opening Hours</h4>
              <p>
                <strong>Mon-Sat: 11AM - 7PM<br />
                Sunday: Closed</strong>
              </p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 footer-links">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#" className="social-link">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="social-link">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="social-link">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="social-link">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <p>Copyright © 2023  Track. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
