import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Stethoscope, 
  CalendarRange, 
  ChevronRight, 
  ShieldCheck, 
  Star, 
  Award, 
  Users, 
  Clock, 
  MapPin, 
  PhoneCall, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { REVIEWS, HOSPITAL_METRICS, DEPARTMENTS } from '../data';

interface HomeSectionProps {
  onNavigate: (tab: string) => void;
  onSelectDepartment: (deptId: string) => void;
}

export default function HomeSection({ onNavigate, onSelectDepartment }: HomeSectionProps) {
  const [selectedReviewIdx, setSelectedReviewIdx] = useState(0);

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white pt-10 pb-16 sm:pb-24 lg:pt-14 border-b border-slate-900">
        {/* Subtle decorative background patterns */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-[130px]" />
        <div className="absolute -bottom-1/3 -left-1/4 w-[500px] h-[500px] rounded-full bg-slate-500/15 blur-[120px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Text details */}
            <div className="lg:col-span-7 space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-blue-500/20 hover:bg-blue-500/35 transition-colors px-3.5 py-1.5 rounded-full text-blue-400 font-semibold text-xs tracking-wide border border-blue-550/30"
              >
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>Premier Multidisciplinary Medical Care Center</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
              >
                Your Health, Our <span className="text-blue-400 font-black">Sacred Mission</span>.
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed"
              >
                Experience world-class diagnostics, clinical excellence, and restorative wellness. Powered by advanced procedures, medical technology, and highly expert physicians, WeCare delivers uncompromised client care.
              </motion.p>

              {/* Navigation CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 pt-2"
              >
                <button
                  id="hero-btn-book"
                  onClick={() => onNavigate('booking')}
                  className="bg-blue-600 text-white font-bold hover:bg-blue-500 px-7 py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 group hover:scale-[1.02] active:scale-95"
                >
                  <CalendarRange className="w-5 h-5 text-white" />
                  <span>Book Free Consultation</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  id="hero-btn-doctors"
                  onClick={() => onNavigate('doctors')}
                  className="bg-slate-900 text-white font-semibold hover:bg-slate-800 border border-slate-850 px-7 py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
                >
                  <Stethoscope className="w-5 h-5 text-blue-450" />
                  <span>Meet Specialized Doctors</span>
                </button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4 border-t border-slate-900 text-xs sm:text-sm text-slate-400"
              >
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4.5 h-4.5 text-blue-400" /> Fully Insured Partners
                </span>
                <span className="flex items-center gap-1.5">
                  <Award className="w-4.5 h-4.5 text-blue-400" /> JCI Gold Standard Accredited
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4.5 h-4.5 text-blue-400" /> 24/7 Ward Support
                </span>
              </motion.div>
            </div>

            {/* Right Column Custom Aesthetic Medical Backdrop Graphic */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 relative hidden lg:block"
            >
              <div className="relative mx-auto max-w-sm">
                {/* Decorative border frames */}
                <div className="absolute inset-0 border-2 border-blue-500/30 rounded-3xl translate-x-4 translate-y-4" />
                
                {/* Medical Professional Stock Image */}
                <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-blue-950 shadow-2xl border border-slate-900">
                  <img 
                    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600" 
                    alt="WeCare Hospital Clinic Ward"
                    className="object-cover w-full h-full mix-blend-overlay opacity-80"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Floating badge inside picture */}
                  <div className="absolute bottom-6 left-6 right-6 bg-slate-900/95 backdrop-blur border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-450 border border-blue-500/30">
                      <Clock className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Emergency Services</h4>
                      <p className="text-xs text-slate-400">Direct response ambulance in &lt;14 mins</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. Quick Actions Cards Row */}
      <section className="relative z-20 -mt-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 flex gap-4 cursor-pointer hover:shadow-lg transition-all"
            onClick={() => onNavigate('booking')}
            id="action-box-booking"
          >
            <div className="bg-blue-50 text-blue-600 p-3 h-12 w-12 rounded-xl flex items-center justify-center shrink-0">
              <CalendarRange className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Make an Appointment</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Book secure visits with custom date options & free advisory matches.</p>
              <span className="inline-flex items-center gap-1 text-sm text-blue-600 font-bold mt-2.5 hover:underline">
                Schedule Slots <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 flex gap-4 cursor-pointer hover:shadow-lg transition-all"
            onClick={() => onNavigate('doctors')}
            id="action-box-doctors"
          >
            <div className="bg-blue-50 text-blue-600 p-3 h-12 w-12 rounded-xl flex items-center justify-center shrink-0">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Expert Physicians</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Filter from over 15+ award-winning consultants for tailored clinical aid.</p>
              <span className="inline-flex items-center gap-1 text-sm text-blue-600 font-bold mt-2.5 hover:underline">
                Find Doctors <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 flex gap-4 cursor-pointer hover:shadow-lg transition-all"
            onClick={() => onNavigate('departments')}
            id="action-box-departments"
          >
            <div className="bg-blue-50 text-blue-650 p-3 h-12 w-12 rounded-xl flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Clinical Departments</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Explore our state-of-the-art specialist suites and diagnostics details.</p>
              <span className="inline-flex items-center gap-1 text-sm text-blue-600 font-bold mt-2.5 hover:underline">
                Explore Clinical Wards <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. Hospital Stats Bench */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-8 sm:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y-2 lg:divide-y-0 lg:divide-x divide-slate-100">
            {HOSPITAL_METRICS.map((stat, idx) => (
              <div key={idx} className={`pt-6 lg:pt-0 ${idx > 0 ? 'lg:pl-8' : ''} text-center lg:text-left`}>
                <p className="text-4xl sm:text-5xl font-black text-blue-600 tracking-tight mb-2">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Mini Departments Showcase */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Our Medical Specialists
          </h2>
          <p className="mt-4 text-slate-500 text-base sm:text-lg">
            WeCare hosts specialized branches using premium diagnostics resources. Tap any to learn about key services.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEPARTMENTS.slice(0, 3).map((dept) => (
            <div 
              key={dept.id} 
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between hover:shadow-md hover:border-blue-200 transition-all group"
            >
              <div>
                <p className="text-xs uppercase font-extrabold text-blue-600 tracking-widest bg-blue-50 px-2.5 py-1 rounded-md inline-block mb-4">
                  {dept.name}
                </p>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                  {dept.name} Department
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                  {dept.description}
                </p>
              </div>
              <div>
                <button
                  onClick={() => {
                    onSelectDepartment(dept.id);
                  }}
                  className="flex items-center gap-1.5 text-sm font-bold text-slate-700 group-hover:text-blue-600 mt-2 hover:underline focus:outline-none"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => onNavigate('departments')}
            className="inline-flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800 text-sm font-bold px-6 py-3.5 rounded-full transition-all shadow active:scale-95"
          >
            <span>View All Departments ({DEPARTMENTS.length})</span>
            <ChevronRight className="w-4.5 h-4.5" />
          </button>
        </div>
      </section>

      {/* 5. Heartwarming Testimonials */}
      <section className="py-20 bg-gradient-to-tr from-blue-50/50 via-white to-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-4 space-y-6">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full">
                Patient Stories
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight">
                Empathy, Healing, &amp; Relieved Lives
              </h2>
              <p className="text-slate-500 leading-relaxed text-sm sm:text-base">
                Read direct reviews from patients who experienced our clinical safety checks and successful orthopedic, general medicine and cardiac surgeries.
              </p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs font-semibold text-slate-500">
                Maintained average rating of 4.9 across verified patient profiles.
              </p>
            </div>

            <div className="lg:col-span-8">
              {/* Dynamic Testimonial Carousel Switcher */}
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-blue-50/60 shadow-lg shadow-blue-950/5 relative">
                <div className="absolute top-6 right-8 text-blue-100 font-serif text-8xl pointer-events-none select-none">
                  “
                </div>
                
                <p className="text-lg text-slate-800 font-medium italic relative z-10 leading-relaxed mb-6">
                  "{REVIEWS[selectedReviewIdx].comment}"
                </p>

                <div className="flex items-center justify-between border-t border-slate-150 pt-5">
                  <div className="flex items-center gap-3">
                    <img 
                      src={REVIEWS[selectedReviewIdx].avatar} 
                      alt={REVIEWS[selectedReviewIdx].author} 
                      className="w-12 h-12 rounded-full object-cover border border-blue-100"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{REVIEWS[selectedReviewIdx].author}</h4>
                      <p className="text-xs text-slate-500">Verified Patient - {REVIEWS[selectedReviewIdx].date}</p>
                    </div>
                  </div>

                  {/* Navigation Bullets */}
                  <div className="flex gap-2">
                    {REVIEWS.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedReviewIdx(idx)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          selectedReviewIdx === idx 
                            ? 'bg-blue-600 scale-125' 
                            : 'bg-slate-200 hover:bg-slate-300'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Static Emergency Hospital Contact Banner info */}
      <section className="bg-slate-900 text-white py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="bg-red-500/10 p-3.5 h-14 w-14 rounded-2xl flex items-center justify-center border border-red-500/20 text-red-105 shrink-0 select-none animate-pulse">
              <PhoneCall className="w-8 h-8" />
            </div>
            <div>
              <p className="text-red-400 font-bold uppercase tracking-widest text-xs">
                Need Help Immediately?
              </p>
              <h3 className="text-2xl font-extrabold text-white mt-1">
                24/7 Central Emergency Traumas
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 max-w-md">Our ambulances and ICU specialists are fully available in standard medical rotations.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <a 
              href="tel:+18009322273"
              className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3.5 rounded-full transition-colors text-center shadow shadow-red-900/35"
            >
              Call 1-800-WE-CARE
            </a>
            <div className="border border-slate-800 rounded-xl px-5 py-2.5 bg-slate-950/20 flex flex-col justify-center animate-pulse">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Hospital Address</span>
              <span className="text-xs font-semibold text-slate-350">750 Medical Plaza Parkway, Building A</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
