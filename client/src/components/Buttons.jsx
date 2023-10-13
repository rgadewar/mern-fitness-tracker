import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const Buttons = () => {

    return (
    
    <div>
              {Auth.loggedIn() ? (
                <>
                  <Link className="btn btn-lg btn-primary m-2" to="/">
                    Home
                  </Link>
                  <Link className="btn btn-lg btn-light m-2" to="/slideshow">
                    Slideshow
                  </Link>
                  <Link className="btn btn-lg btn-light m-2" to="/log">
                    Activity Logs
                  </Link>
                  <button className="btn btn-lg btn-light m-2" onClick={logout}>
                    Logout
                  </button>
                  
                </>
              ) : (
                <>
                  
                 
                 
                </>
              )}
            </div>
    )
}

export default Buttons;