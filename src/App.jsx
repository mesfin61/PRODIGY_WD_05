import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Weather from './components/Weather'
import About from './components/About'

function App() {

  return (
    <>
      <Header />
      <About />
      {/* <Main /> */}
      <Weather />
    </>
  )
}

export default App
