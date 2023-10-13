import React from 'react';
import Buttons from "../../components/Buttons";
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
                                width: '100%', // Image takes up the full width of the Grid item
                                height: 'auto',  // To maintain aspect ratio
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
                    <Button component={Link} to="/login" sx={{ width: "40%", height: "auto" }} variant="contained">
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