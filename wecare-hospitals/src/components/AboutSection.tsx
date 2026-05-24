import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building, 
  MapPin, 
  Heart, 
  ShieldCheck, 
  UserCheck, 
  Target, 
  Sparkles, 
  Plus, 
  Minus,
  Award,
  Stethoscope
} from 'lucide-react';
import { FAQS } from '../data';

export default function AboutSection() {
  const [openFaq, setOpenFaq] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const coreValues = [
    {
      title: 'Compassion First',
      description: 'We treat every voice with utmost empathy, treating patients as our immediate family.',
      icon: Heart,
      color: 'bg-red-50 text-red-600 border-red-100'
    },
    {
      title: 'Clinical Integrity',
      description: 'Our specialists represent strict medical guidelines and certified diagnostic rules.',
      icon: ShieldCheck,
      color: 'bg-blue-50 text-blue-600 border-blue-100'
    },
    {
      title: 'Medical Innovation',
      description: 'Continual search for modern lasers, computer-assisted joint surgeries, & state-of-the-art wards.',
      icon: Sparkles,
      color: 'bg-blue-50 text-blue-600 border-blue-100'
    },
    {
      title: 'Patient Empowerment',
      description: 'Transparent consultation prices, active listening, and open health records tracking.',
      icon: UserCheck,
      color: 'bg-amber-50 text-amber-600 border-amber-100'
    }
  ];

  const leaders = [
    {
      name: 'Dr. Raymond Sterling',
      role: 'Chief Medical Director & Founder',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300',
      bio: 'Carrying 30+ years in Cardiology, Dr. Sterling founded WeCare with the conviction of offering world-class care.'
    },
    {
      name: 'Dr. Jennifer Kim',
      role: 'Chief Operations Officer',
      image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=300',
      bio: 'An expert in clinical logistics and patient safety procedures. Formerly managed regional pediatric wards.'
    },
    {
      name: 'Dr. Aaron Vance',
      role: 'Head of Clinical Innovation',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
      bio: 'Manages incoming diagnostic technologies, robotics research, and continuing medical education policies.'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-block mb-4">
            Our Medical Group
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Who We Are At WeCare
          </h1>
          <p className="mt-4 text-slate-500 text-lg leading-relaxed">
            Established with a single clinic in 2001, WeCare Hospitals has grown into one of the country's most trusted multidisciplinary research and cardiac centers.
          </p>
        </div>

        {/* 2. Story Canvas Layout */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              25 Years of Raising Clinical Standards
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              At WeCare Hospitals, we don't just treat illnesses—we care for people. Over twenty-five patient-centric years, we have built a reputation of outstanding clinical quality. We are proud to house state-of-the-art neuro-labs, advanced orthopedics wings, and child-safe pediatric rooms.
            </p>
            <p className="text-slate-600 leading-relaxed text-base">
              Each consultant, nurse, and support specialist is trained according to demanding Joint Commission International standards. By combining continuous clinical innovation with an empathetic bedside manner, we ensure our clients always feel safe and well-informed.
            </p>

            {/* Quick Metrics display */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-150">
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-700">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">JCI Golden Certified</h4>
                  <p className="text-xs text-slate-500">Highest patient safety honor</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-700">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">4 Main Campuses</h4>
                  <p className="text-xs text-slate-500">Modern emergency access</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="aspect-[16/10] sm:aspect-[4/3] rounded-3xl overflow-hidden bg-slate-900 shadow-xl border border-slate-200">
              <img 
                src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800" 
                alt="WeCare Medical Ward Meeting"
                className="object-cover w-full h-full opacity-90"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>

        {/* 3. Core values grid */}
        <section className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Our Core Healthcare Values</h2>
            <p className="text-slate-500 text-sm sm:text-base mt-2">These foundational principles dictate every diagnostics scan, surgery, and pediatric consultation WeCare conducts.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className={`p-3 rounded-xl border w-12 h-12 flex items-center justify-center mb-4 ${val.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{val.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{val.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Leadership Section */}
        <section className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Our Elite Medical Council</h2>
            <p className="text-slate-500 text-sm sm:text-base mt-2">Driven by decades of academic excellence, our leadership panel shapes clinical strategy to prioritize customer recovery.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leaders.map((leader, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col gap-4 text-center items-center"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-100 shadow-inner">
                  <img src={leader.image} alt={leader.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{leader.name}</h3>
                  <p className="text-blue-600 font-extrabold text-xs uppercase tracking-wider">{leader.role}</p>
                  <p className="text-slate-500 text-xs mt-3 leading-relaxed max-w-xs">{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Frequently Asked Questions (Interactive Accordion) */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="text-center mb-10">
            <span className="text-blue-600 font-bold text-xs uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded">
              Help Center
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">Frequently Asked FAQs</h2>
            <p className="text-slate-500 text-sm mt-1">Get immediate answers explaining our support policies, insurance networks, and booking schedules.</p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div 
                  key={faq.id} 
                  className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden transition-all duration-200"
                >
                  <button
                    id={`faq-btn-${faq.id}`}
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between font-bold text-slate-800 hover:text-blue-600 focus:outline-none transition-colors"
                  >
                    <span className="pr-4">{faq.question}</span>
                    <span className="shrink-0 text-slate-450 bg-slate-50 p-1 rounded-lg border border-slate-100">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div 
                      id={`faq-answer-${faq.id}`}
                      className="px-6 pb-5 text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-3"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
