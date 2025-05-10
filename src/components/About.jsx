import React from 'react';
import '../styles/about.css';
import sunrise from '../assets/sunrise.jpg';

function About() {
  return (
    <div className='about-container'>
      <div className='about-text'>
        <h2>About This Weather App</h2>
        <p>
          This weather app lets you search for real-time weather updates in any city
          around the world. It displays the current temperature, weather condition,
          humidity, wind speed, and provides clothing recommendations based on the
          temperature.
        </p>
        <p>
          Built with React and WeatherAPI, it also allows you to use your current
          location for instant local weather updates.
        </p>
      </div>
      <div className='about-image'>
        <img src={sunrise} alt='Weather icon' />
      </div>
    </div>
  );
}

export default About;
