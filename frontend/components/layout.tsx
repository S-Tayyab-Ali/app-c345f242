"use client";

import React from 'react';
import Link from 'next/link';
import { useApp } from '../context/AppContext';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from './ui/components';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const { t, language, setLanguage } = useApp();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/quiz', label: t('nav.quiz') },
    { href: '/resources', label: t('nav.resources') },
    { href: '/plan', label: t('nav.plan') },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg" />
              <span className="font-bold text-xl text-slate-100 hidden sm:block">Aging at Home Hub</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="text-slate-400 hover:text-teal-400 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleLanguage}
              className="flex items-center gap-2"
            >
              <Globe size={18} />
              {language === 'en' ? 'ES' : 'EN'}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-slate-100 p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900 border-b border-slate-800 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-teal-400 hover:bg-slate-800"
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  toggleLanguage();
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-teal-400 hover:bg-slate-800 flex items-center gap-2"
              >
                <Globe size={18} />
                {language === 'en' ? 'Español' : 'English'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const Footer = () => {
  const { t } = useApp();
  
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg text-slate-100 mb-4">Aging at Home Hub</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Empowering older adults and caregivers with clear, actionable guidance for safer independent living.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-100 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/quiz" className="hover:text-teal-400">Safety Quiz</Link></li>
              <li><Link href="/resources" className="hover:text-teal-400">Local Resources</Link></li>
              <li><Link href="/suggest" className="hover:text-teal-400">Suggest a Resource</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-100 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/privacy" className="hover:text-teal-400">{t('footer.privacy')}</Link></li>
              <li><span className="text-slate-600">Disclaimer: Not medical advice.</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-600">
          &copy; {new Date().getFullYear()} Aging at Home Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

