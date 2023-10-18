import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import logoImage from "/assets/logo1.png";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import styles from "./header.module.css";
import Grid from "@mui/material/Grid";

const Header = () => {

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const isLoggedIn = Auth.loggedIn(); // Check if the user is logged in

  return (
    <header className={styles["headerCard"]}>
      <Grid container  justifyContent="center">
        <div>
          <Grid item container justifyContent="center">
            <p
              className="m-0"
              style={{
                fontSize: "1.78rem",
                fontWeight: "700",
                fontFamily: "Roboto",
                color: "white",
                textAlign: "center",
              }}
            >
              Keep your life on Track. From step to finish.
            </p>
            <Grid item xs={12} container justifyContent="center">
              {isLoggedIn ? ( // Check if the user is logged in
                <React.Fragment>
                   <a href="/">
                    <p
                      style={{
                        width: "8rem",
                        height: "auto",
                        textAlign: "center",
                        color: "white",
                        fontFamily: "Roboto",
                      }}
                    >
                      Home
                    </p>
                  </a>          
                  <a href="/log">
                    <p
                      style={{
                        width: "8rem",
                        height: "auto",
                        textAlign: "center",
                        color: "white",
                        fontFamily: "Roboto",
                      }}
                    >
                      ActivityLog
                    </p>
                  </a>

                  <a
                    href="/logout" // Specify the href URL
                    onClick={logout}
                    style={{
                      display: "block",
                      width: "8rem",
                      height: "auto",
                      textAlign: "center",
                      color: "white",
                      fontFamily: "Roboto",
                      textDecoration: "none", // Remove underline
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "lightgray")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "gray")
                    }
                  >
                    Logout
                  </a>
                  <a href="/aboutus">
                <p
                  component={Link}
                  to="/aboutus"
                  style={{
                    width: "8rem",
                    height: "auto",
                    textAlign: "center",
                    color: "white",
                    fontFamily: "Roboto",
                  }}
                >
                  About Us
                </p>
              </a>
                </React.Fragment>
              ) : (
                <React.Fragment>
                    <a href="/login">
                <p
                  component={Link}
                  to="/login"
                  style={{
                    width: "8rem",
                    height: "auto",
                    textAlign: "center",
                    color: "white",
                    fontFamily: "Roboto",
                  }}
                >
                  Login
                </p>
              </a>
              <a href="/signup">
                <p
                  component={Link}
                  to="/signup"
                  style={{
                    width: "8rem",
                    height: "auto",
                    textAlign: "center",
                    color: "white",
                    fontFamily: "Roboto",
                  }}
                >
                  SignUp
                </p>
              </a>
                  <a href="/#">
                <p
                  component={Link}
                  to="/#"
                  style={{
                    width: "8rem",
                    height: "auto",
                    textAlign: "center",
                    color: "white",
                    fontFamily: "Roboto",
                  }}
                >
                  About Us
                </p>
              </a>
              <a href="/">
                    <p
                      style={{
                        width: "8rem",
                        height: "auto",
                        textAlign: "center",
                        color: "white",
                        fontFamily: "Roboto",
                      }}
                    >
                      Home
                    </p>
                  </a>       

              
                </React.Fragment>
              )}
            </Grid>
          </Grid>
        </div>
      </Grid>
    </header>
  );
};

export default Header;
