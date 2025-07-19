import React from 'react'
import "./App.css";
import Navbar from './components/navbar/Navbar';
import Hero from './components/hero/Hero';
import Features from './components/features/Features';
const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <Hero />
      <Features />
    </div>
  )
}

export default App