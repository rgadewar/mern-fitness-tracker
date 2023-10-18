import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';

const items = [
  {
    src: '/assets/biking.jpg',
    altText: 'biking',
    caption: "Embrace the Outdoors: Rediscover the Joy of Biking and Stay Active 🚴‍♂️",
  },
  {
    src: '/assets/running.jpg',
    altText: 'running',
    caption: "Feel the Freedom: Run Alongside Nature and Embrace the Sun ☀️🏃‍♀️",
  },
  {
    src: '/assets/walking.jpg',
    altText: 'walking',
    caption: "Embrace Serenity: Walk in Nature's Beauty and Soak Up the Sun ☀️🚶‍♂️",
  },
  {
    src: '/assets/swimming.jpg',
    altText: 'swimming',
    caption: 'Dive into Tranquility: Swim in the Sparkling Waters and Enjoy the Sun ☀️🏊‍♂️',
  },
];

function Slider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item, index) => (
    <CarouselItem
      onExiting={() => setAnimating(true)}
      onExited={() => setAnimating(false)}
      key={index} // Use the index as the key since src might not be unique
    >
      <img
        src={item.src}
        alt={item.altText}
        style={{ display: 'block', margin: '0 auto' }} // Center the image
      />
      <CarouselCaption captionText={item.caption} /> {/* Use captionText for the caption */}
    </CarouselItem>
  ));

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      interval={5000} // Set the interval (time between slides) in milliseconds
      style={{ margin: '0 auto' }} // Center the entire carousel
    >
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
}

export default Slider;
