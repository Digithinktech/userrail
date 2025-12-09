import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/Button';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How it works', href: '#how-it-works' },
    { name: 'Integrations', href: '#integrations' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-4' : 'py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`relative rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300 ${
            isScrolled 
              ? 'mirror-glass shadow-lg' 
              : 'bg-transparent'
          }`}>
            {/* Logo */}
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-start gap-0.5 group hover:opacity-80 transition-opacity">
              <span className="font-logo text-4xl leading-none text-white tracking-tight drop-shadow-md">Rail</span>
              <span className="font-sans text-[10px] leading-none text-white/80 pt-1">®</span>
            </a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group shadow-black/50 drop-shadow-sm"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 transition-all duration-300 group-hover:w-full box-shadow-[0_0_10px_brand-500]" />
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-4">
              <a href="#" className="text-sm font-medium text-white hover:text-brand-400 transition-colors">Log in</a>
              <Button className="px-5 py-2 text-sm" onClick={() => {
                const element = document.getElementById('pricing');
                if (element) {
                   const offset = 80;
                   const elementPosition = element.getBoundingClientRect().top;
                   const offsetPosition = elementPosition + window.scrollY - offset;
                   window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
              }}>Get Started</Button>
            </div>

            {/* Mobile Toggle */}
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 mirror-glass pt-32 px-6 md:hidden backdrop-blur-3xl"
          >
            <div className="flex flex-col gap-6 items-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-2xl font-display font-semibold text-white/80 hover:text-white"
                >
                  {link.name}
                </a>
              ))}
              <div className="h-px w-20 bg-white/10 my-4" />
              <Button className="w-full max-w-xs" onClick={(e) => {
                 setMobileMenuOpen(false);
                 handleLinkClick(e as any, '#pricing');
              }}>Get Started Free</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};