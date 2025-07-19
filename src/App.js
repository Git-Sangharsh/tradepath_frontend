import React from 'react'
import "./App.css";
import Navbar from './components/navbar/Navbar';
import Hero from './components/hero/Hero';
import Features from './components/features/Features';
import ScrollIndicator from './components/scrollIndicator/ScrollIndicator';
import Levelup from './components/levelup/Levelup';
const App = () => {
  return (
    <div className='app'>
      <ScrollIndicator />
      <Navbar />
      <Hero />
      <Features />
      <Levelup />
    </div>
  )
}

export default App