import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Features from '../components/Features';
import Workflow from '../components/Workflow';
import InfoCards from '../components/InfoCards';
import Team from '../components/Team';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="app-container">
      <div className="bg-grid-overlay"></div>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Features />
        <Workflow />
        <InfoCards />
        <Team />
      </main>
      <Footer />
    </div>
  );
}

