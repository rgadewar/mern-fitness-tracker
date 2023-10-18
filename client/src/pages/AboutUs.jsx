import React from 'react';
import { Grid, Typography, Paper } from '@mui/material';

const AboutUs = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <img
          src="/assets/runTrack.jpg"
          alt="About Us Image"
          style={{ width: '100%' }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h4">About Our Fitness Tracker</Typography>
          <Typography>
            Welcome to our Fitness Tracker! We are dedicated to helping you achieve your health and fitness goals. Our mission is to provide you with the tools and insights you need to lead a healthier and more active lifestyle.
          </Typography>
          <Typography>
            Whether you are looking to lose weight, build muscle, or simply improve your overall well-being, our Fitness Tracker is designed to assist you every step of the way. You can track your daily activities, set and achieve fitness goals, and monitor your progress over time.
          </Typography>
          <Typography variant="h5">Key Features:</Typography>
          <ul>
            <li>Track Your Activities: Log your daily workouts, walks, runs, and more.</li>
            <li>Set Goals: Define your fitness objectives and work towards them.</li>
            <li>Stay Motivated: Get real-time feedback and celebrate your achievements.</li>
            <li>Monitor Your Progress: Keep an eye on your performance and improvements over time.</li>
            <li>Connect with Others: Join the fitness community, share your achievements, and stay inspired.</li>
          </ul>
          <Typography>
            Our team is committed to providing you with a user-friendly and effective platform to help you stay active and fit. We are passionate about promoting a healthy lifestyle, and we're here to support you in your fitness journey.
          </Typography>
          <Typography>
            Thank you for choosing our Fitness Tracker. We're excited to be a part of your health and fitness adventure. If you have any questions or feedback, please don't hesitate to reach out to our support team.
          </Typography>
          <Typography>
            Stay active, stay healthy!
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AboutUs;
