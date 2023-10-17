import React, { useEffect, useState } from 'react';
import Slideshow from '../components/Slideshow';
import AuthService from '../utils/auth';

import { GetDailyAchievements } from '../utils/queries.js';

import { GetDailyAchievements } from '../utils/queries.js';

const slides = [
  {
    image: '/assets/download.jpeg',
    alt: 'Slide 1',
    caption: 'Caption for Slide 1',
  },
  {
    image: '/assets/Fitbit.png',
    alt: 'Slide 2',
    caption: 'Caption for Slide 2',
  },
  {
    image: '/assets/istockphoto.jpg',
    alt: 'Slide 3',
    caption: 'Caption for Slide 3',
  },
];
 

function SlideshowPage() {
  // const [userProfile, setUserProfile] = useState(null);

  return (
    <div className="App">
      {/* {userProfile ? (
        <h1>Welcome, {userProfile.data._id}</h1>
      ) : (
        <h1>Welcome!</h1>
      )}
      */}

      <Slideshow slides={slides} />
    </div>
  );
}

export default SlideshowPage;
