import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import MegaMenu from './MegaMenu';

const NavLink = ({ href, children }) => (
  <li>
    <a href={href} className="px-4 py-2 font-semibold relative group">
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
    </a>
  </li>
);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navTextColor = isScrolled || isMenuOpen ? 'text-brand-dark' : 'text-text-light';

  return (
    <header
      className={`fixed top-1 left-0 w-full h-header flex items-center z-[1000] transition-all duration-400 ease-in-out ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center w-full">
        <a href="#" className={`font-serif text-3xl font-bold transition-colors duration-300 ${navTextColor}`}>
          NEW JERUSALEM
        </a>
        <nav className="hidden md:block">
          <ul className={`flex items-center space-x-2 ${navTextColor}`}>
            <NavLink href="#hero">Home</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#sermons">Sermons</NavLink>
            <MegaMenu isScrolled={isScrolled} />
            <NavLink href="#events">Events</NavLink>
            <NavLink href="#giving">Giving</NavLink>
          </ul>
        </nav>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden z-[1001] text-2xl"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes className={navTextColor} /> : <FaBars className={navTextColor} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isMenuOpen ? 0 : '100%' }}
        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.4 }}
        className="md:hidden fixed top-0 left-0 w-full h-screen bg-brand-light flex flex-col items-center justify-center"
      >
        <ul className="text-brand-dark text-center">
          <li className="my-4"><a href="#hero" onClick={() => setIsMenuOpen(false)} className="text-2xl font-semibold">Home</a></li>
          <li className="my-4"><a href="#about" onClick={() => setIsMenuOpen(false)} className="text-2xl font-semibold">About</a></li>
          <li className="my-4"><a href="#sermons" onClick={() => setIsMenuOpen(false)} className="text-2xl font-semibold">Sermons</a></li>
          <li className="my-4"><a href="#ministries" onClick={() => setIsMenuOpen(false)} className="text-2xl font-semibold">Ministries</a></li>
          <li className="my-4"><a href="#events" onClick={() => setIsMenuOpen(false)} className="text-2xl font-semibold">Events</a></li>
          <li className="my-4"><a href="#giving" onClick={() => setIsMenuOpen(false)} className="text-2xl font-semibold">Giving</a></li>
        </ul>
      </motion.div>
    </header>
  );
};

export default Header;