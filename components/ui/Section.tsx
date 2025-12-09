import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({ children, className = '', id }) => {
  return (
    <section id={id} className={`py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} // Custom easing for premium feel
        className="max-w-7xl mx-auto relative z-10"
      >
        {children}
      </motion.div>
    </section>
  );
};