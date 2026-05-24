import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HeartPulse, 
  Mail, 
  Send, 
  MapPin, 
  PhoneCall, 
  Clock, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Youtube,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const [newsEmail, setNewsEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsEmail.trim()) {
      setSubscribed(true);
      setNewsEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      
      {/* 1. Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-start">
          
          {/* Box 1: Brand details */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2 text-white cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="bg-blue-600 text-white p-2 rounded-xl">
                <HeartPulse className="w-5.5 h-5.5" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                WeCare <span className="text-blue-500">Hospitals</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              WeCare Hospitals delivers uncompromised medical excellence with empathy. We prioritize patient diagnostics, rehabilitation, and pediatric growth monitoring to raise global life-quality measures.
            </p>
            
            {/* Social Channels */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 bg-slate-850 hover:bg-blue-600 text-slate-450 hover:text-white rounded-lg transition-colors border border-slate-800" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-850 hover:bg-blue-600 text-slate-450 hover:text-white rounded-lg transition-colors border border-slate-800" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-850 hover:bg-blue-600 text-slate-450 hover:text-white rounded-lg transition-colors border border-slate-800" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-850 hover:bg-blue-600 text-slate-450 hover:text-white rounded-lg transition-colors border border-slate-800" aria-label="Yahoo">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Box 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest border-l-2 border-blue-500 pl-2">
              General Area
            </h4>
            <div className="flex flex-col gap-2 text-sm">
              <button onClick={() => setActiveTab('home')} className="text-left hover:text-white hover:underline transition-colors focus:outline-none">
                Home Main
              </button>
              <button onClick={() => setActiveTab('about')} className="text-left hover:text-white hover:underline transition-colors focus:outline-none">
                About Clinical Team
              </button>
              <button onClick={() => setActiveTab('departments')} className="text-left hover:text-white hover:underline transition-colors focus:outline-none">
                Clinical Departments
              </button>
              <button onClick={() => setActiveTab('doctors')} className="text-left hover:text-white hover:underline transition-colors focus:outline-none">
                Specialist Doctors
              </button>
              <button onClick={() => setActiveTab('booking')} className="text-left hover:text-white hover:underline transition-colors focus:outline-none">
                Book Consultation
              </button>
            </div>
          </div>

          {/* Box 3: Contact & Hours */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest border-l-2 border-blue-500 pl-2">
              Working Directory
            </h4>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4.5 h-4.5 text-blue-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  750 Medical Plaza Parkway, Building A &amp; B, Clinical Zone
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-4.5 h-4.5 text-blue-500 shrink-0" />
                <span>+1 (800) WEC-CARE</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4.5 h-4.5 text-blue-500 shrink-0" />
                <span>Ward access: Open 24 Hours</span>
              </div>
            </div>
          </div>

          {/* Box 4: Newsletter mockup */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest border-l-2 border-blue-500 pl-2">
              Health Digest
            </h4>
            <p className="text-xs text-slate-400 leading-normal">
              Subscribe to WeCare monthly digital journals detailing preventative exercises, child vaccination schedules, & cardiology wellness studies.
            </p>

            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input
                id="footer-email-news"
                type="email"
                required
                placeholder="Enter email address"
                value={newsEmail}
                onChange={(e) => setNewsEmail(e.target.value)}
                className="w-full bg-slate-850 hover:bg-slate-800 border-0 outline-none text-slate-100 rounded-xl py-3 pl-4 pr-12 text-xs focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-500"
              />
              <button
                type="submit"
                id="btn-footer-news-submit"
                className="absolute right-1.5 top-1.5 h-9 w-9 bg-blue-600 hover:bg-blue-500 rounded-lg text-white flex items-center justify-center transition-colors shadow active:scale-90 cursor-pointer"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <AnimatePresence>
              {subscribed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-blue-950 text-blue-300 text-[10px] sm:text-xs font-semibold p-2.5 rounded-lg border border-blue-800"
                >
                  Subscription success! Check your inbox for updates.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* 2. Legal Disclaimer & Copyright Bottom Bar */}
      <div className="bg-slate-950 text-slate-500 text-[11px] sm:text-xs py-6 border-t border-slate-850/60 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} WeCare Hospitals Group. All rights reserved globally.</p>
          
          <div className="flex gap-4 items-center">
            <a href="#" className="hover:text-blue-500 transition-colors">Privacy Principles</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-500 transition-colors">Client Rights</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-500 transition-colors flex items-center gap-0.5">
              <span>ISO Certification</span> <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
}
