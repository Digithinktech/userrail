import React from 'react';
import { Twitter, Github, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 py-12 px-6 mirror-glass">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        <div className="col-span-1 md:col-span-2">
           <a href="#" className="flex items-start gap-0.5 mb-4 hover:opacity-80 transition-opacity w-fit">
              <span className="font-logo text-4xl leading-none text-white tracking-tight drop-shadow-md">Rail</span>
              <span className="font-sans text-[10px] leading-none text-white/80 pt-1">®</span>
            </a>
            <p className="text-gray-400 max-w-xs mb-6">
              The AI-managed financial platform for the modern era. Wealth building on autopilot.
            </p>
            <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition"><Twitter size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-white transition"><Github size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-white transition"><Linkedin size={20} /></a>
            </div>
        </div>
        
        <div>
            <h4 className="font-bold text-white mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-brand-300 transition">Invest</a></li>
                <li><a href="#" className="hover:text-brand-300 transition">Earn Yield</a></li>
                <li><a href="#" className="hover:text-brand-300 transition">Card</a></li>
                <li><a href="#" className="hover:text-brand-300 transition">Security</a></li>
            </ul>
        </div>

        <div>
            <h4 className="font-bold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-brand-300 transition">About</a></li>
                <li><a href="#" className="hover:text-brand-300 transition">Blog</a></li>
                <li><a href="#" className="hover:text-brand-300 transition">Careers</a></li>
                <li><a href="#" className="hover:text-brand-300 transition">Contact</a></li>
            </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-xs text-gray-500 relative z-10">
        © {new Date().getFullYear()} Rail Finance Inc. All rights reserved.
      </div>
    </footer>
  );
};