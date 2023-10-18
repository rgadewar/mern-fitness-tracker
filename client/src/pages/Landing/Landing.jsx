import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import styles from "./landing.module.css"


const Landing = () => {



    return (


        <div className={styles['background']}>
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <img
                            src="/assets/runTrack.jpg"
                            alt="image of person running on a drawbridge"
                            style={{
                                width: '100%', 
                                height: 'auto',  
                            }}
                        />
                    </Grid>
                </Grid>
            </div>
            <Grid container textAlign="center" justifyContent={"center"}>
                <Grid item>
                    <h1>Track</h1>
                </Grid>

                <Grid item xs={12}>
                    <Button component={Link} to="/login.jsx" sx={{ width: "40%", height: "auto" }} variant="contained">
                        Login
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button component={Link} to="/signup" sx={{ width: "40%", height: "auto" }} variant="contained">
                        Signup
                    </Button>

                </Grid>
            </Grid>

        </div>

    )
}

export default Landing;