import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Sermons from './components/Sermons';
import Events from './components/Events';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-1 bg-brand-gold z-[1001]"></div>
      <Header />
      <main>
        <Hero />
        <About />
        <Sermons />
        <Events />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
