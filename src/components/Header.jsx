import React from 'react'
import { Link } from 'react-scroll';
import '../styles/header.css'

function Header() {
  return (
    <div className='header'>
       <h1>Weather App</h1>
       <div className='nav-links'>
            <Link to='#home' smooth={true} duration={500}>Home</Link>
            <Link to='about' smooth={true} duration={500}>About</Link>
       </div>
    </div>
  )
}
export default Header;