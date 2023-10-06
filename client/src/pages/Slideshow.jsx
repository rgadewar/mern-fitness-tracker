import React from 'react';
import Slideshow from '../components/Slideshow';

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
  }
  
];

function SlideshowPage() {
  return (
    <div className="App">
      <Slideshow slides={slides} />
    </div>
  );
}

export default SlideshowPage;
