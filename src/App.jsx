import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Weather from './components/Weather'
import About from './components/About'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <Header />
      <About />
      <Weather />
      <Footer />
    </>
  )
}

export default App
