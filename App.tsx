import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { Integrations } from './components/Integrations';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-brand-500/30 selection:text-brand-200">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Integrations />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}

export default App;