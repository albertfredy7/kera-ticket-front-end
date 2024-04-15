import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/kera ticket.svg';

function Footer() {
 return (
    <div className="footer p-4 " style={{ background: '#ffffff', position: 'relative', bottom: '0', width: '100%' }}>
      <div className="row">
        <div className="row ">
          <div className="col-md-12 text-center d-flex justify-content-between">
            <p>Connect with us on social media</p>
            <div className="icons d-flex gap-3">
              <i className="bi bi-github"></i>
              <i className="bi bi-linkedin"></i>
              <i className="bi bi-facebook"></i>
              <i className="bi bi-twitter"></i>
              <i className="bi bi-instagram"></i>
            </div>
          </div>
          <hr />
        </div>
        <div className="col-md-3">
          <div className="logo">
            <img src={logo} alt="" width={150} />
          </div>
          <div className="text">Your one-stop solution for movie ticket bookings.</div>
        </div>
        <div className="col-md-3 mt-4">
          <h4>Services</h4>
          <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
            <li><Link to="/movies" style={{ textDecoration: 'none', color: 'black' }}>Browse Movies</Link></li>
            <li><Link to="/showtimes" style={{ textDecoration: 'none', color: 'black' }}>Check Showtimes</Link></li>
            <li><Link to="/booking" style={{ textDecoration: 'none', color: 'black' }}>Book Tickets</Link></li>
            <li><Link to="/orders" style={{ textDecoration: 'none', color: 'black' }}>Order History</Link></li>
          </ul>
        </div>
        <div className="col-md-3 mt-4">
          <h4>Useful Links</h4>
          <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
            <li><Link to="/faq" style={{ textDecoration: 'none', color: 'black' }}>FAQ</Link></li>
            <li><Link to="/privacy" style={{ textDecoration: 'none', color: 'black' }}>Privacy Policy</Link></li>
            <li><Link to="/terms" style={{ textDecoration: 'none', color: 'black' }}>Terms of Service</Link></li>
            <li><Link to="/contact" style={{ textDecoration: 'none', color: 'black' }}>Contact Us</Link></li>
          </ul>
        </div>
        <div className="col-md-3 mt-4">
          <h4>Contact</h4>
          <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
            <li><Link to="#" style={{ textDecoration: 'none', color: 'black' }}> <i className="bi bi-geo-alt"></i>  123 Movie Street, City</Link></li>
            <li><Link to="#" style={{ textDecoration: 'none', color: 'black' }}> <i className="bi bi-telephone"></i>  123-456-7890</Link></li>
            <li><Link to="#" style={{ textDecoration: 'none', color: 'black' }}> <i className="bi bi-envelope"></i> info@kera-tickets.com</Link></li>
            <li><Link to="#" style={{ textDecoration: 'none', color: 'black' }}> <i className="bi bi-printer"></i>  123-456-7890</Link></li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-12 text-center">
          <p className='fw-semibold'>&copy; 2024 Kera Tickets. All rights reserved.</p>
        </div>
      </div>
    </div>
 );
}

export default Footer;