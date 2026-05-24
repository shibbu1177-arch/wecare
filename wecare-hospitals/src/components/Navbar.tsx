import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HeartPulse, Menu, X, Calendar, PhoneCall, Clock } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onQuickBook: () => void;
}

export default function Navbar({ activeTab, setActiveTab, onQuickBook }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'departments', label: 'Departments' },
    { id: 'doctors', label: 'Our Doctors' },
    { id: 'booking', label: 'Appointments' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top hospital info bar */}
      <div className="bg-blue-950 text-blue-100 text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5" />
              <span className="font-medium">Emergency Hotlines:</span> +1 (800) WEC-CARE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Open 24/7 for Patient Traumas</span>
            </span>
          </div>
          <div className="text-blue-200">
            <span>Clinical Standards: Certified ISO 9001:2024</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white/85 backdrop-blur-md border-b border-slate-250 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div 
              onClick={() => setActiveTab('home')} 
              className="flex items-center gap-2 cursor-pointer group"
              id="nav-logo"
            >
              <div className="bg-blue-600 text-white p-2.5 rounded-xl group-hover:scale-105 transition-transform duration-200">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-slate-800 group-hover:text-blue-600 transition-colors duration-200 block sm:inline">
                  WeCare
                </span>
                <span className="text-blue-600 font-bold ml-1">Hospitals</span>
              </div>
            </div>

            {/* Desktop Navigation links */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-item-${item.id}`}
                    onClick={() => setActiveTab(item.id)}
                    className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-200 rounded-lg ${
                      isActive 
                        ? 'text-blue-600 font-extrabold border-b-2 border-blue-600 rounded-none pb-1' 
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Book Now Quick trigger */}
            <div className="hidden md:flex items-center">
              <button
                id="btn-nav-book"
                onClick={onQuickBook}
                className="flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-sm active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
            </div>

            {/* Mobile menu trigger */}
            <div className="md:hidden flex items-center">
              <button
                id="btn-mobile-menu"
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-600 hover:text-slate-900 focus:outline-none p-1"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-nav-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-slate-150 bg-white"
            >
              <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
                {navItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`mobile-nav-item-${item.id}`}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2.5 rounded-lg text-base font-semibold transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 font-bold'
                          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
                <div className="pt-4 pb-2 px-4 shadow-sm border-t border-slate-100 mt-2">
                  <button
                    id="btn-mobile-book"
                    onClick={() => {
                      onQuickBook();
                      setIsOpen(false);
                    }}
                    className="w-full justify-center flex items-center gap-2 bg-slate-900 text-white py-2.5 rounded-full font-bold shadow hover:bg-slate-800 active:scale-95 transition-all"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Appointment</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
