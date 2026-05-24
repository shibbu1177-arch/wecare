import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  Star, 
  Sparkles, 
  BadgeCheck, 
  Languages, 
  GraduationCap, 
  Calendar, 
  X, 
  Heart, 
  CheckCircle,
  Clock,
  ArrowRight,
  Minimize2
} from 'lucide-react';
import { DOCTORS, DEPARTMENTS } from '../data';
import { Doctor } from '../types';

interface DoctorsSectionProps {
  onBookDoctor: (doctor: Doctor) => void;
  selectedDoctorForModal?: Doctor | null;
  clearDoctorModal?: () => void;
}

export default function DoctorsSection({ 
  onBookDoctor, 
  selectedDoctorForModal, 
  clearDoctorModal 
}: DoctorsSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating'); // 'rating' | 'experience' | 'price'
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  // Synchronize modal state with parent clicks (e.g. from Departments section click)
  React.useEffect(() => {
    if (selectedDoctorForModal) {
      setSelectedDoctor(selectedDoctorForModal);
    }
  }, [selectedDoctorForModal]);

  // Filters logic
  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter((doc) => {
      const matchSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.bio.toLowerCase().includes(searchTerm.toLowerCase());
      const matchDept = selectedDeptFilter === 'all' || doc.departmentId === selectedDeptFilter;
      return matchSearch && matchDept;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'experience') return b.experience - a.experience;
      if (sortBy === 'price') return a.price - b.price; // lower price first
      return 0;
    });
  }, [searchTerm, selectedDeptFilter, sortBy]);

  const activeDepartmentDetails = (deptId: string) => {
    return DEPARTMENTS.find((d) => d.id === deptId)?.name || 'General';
  };

  const handleCloseModal = () => {
    setSelectedDoctor(null);
    if (clearDoctorModal) clearDoctorModal();
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-block mb-3">
            Elite Consultants
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Meet Our Expert Physicians
          </h1>
          <p className="mt-2 text-slate-500 text-sm sm:text-base">
            Consult safely with world-class specialists in Cardiology, Pediatrics, Neurology, Orthopedics, Dermatology, or General Medicine.
          </p>
        </div>

        {/* 1. Filtering & Search Toolbar */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
            <input
              id="search-doctor-input"
              type="text"
              placeholder="Search by name, specialist..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl text-slate-800 text-sm border-0 focus:ring-2 focus:ring-blue-500 hover:bg-slate-100/70 transition-all outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-4 items-center w-full md:w-auto justify-end">
            
            {/* Department Filter */}
            <div className="flex items-center gap-1.5 text-slate-700 text-xs sm:text-sm font-semibold">
              <Filter className="w-4 h-4 text-blue-600" />
              <span>Dept:</span>
              <select
                id="dept-select-filter"
                value={selectedDeptFilter}
                onChange={(e) => setSelectedDeptFilter(e.target.value)}
                className="bg-slate-50 border-0 outline-none text-xs sm:text-sm text-slate-800 rounded-xl py-2 px-3 focus:ring-2 focus:ring-blue-500 hover:bg-slate-100/70 transition-all cursor-pointer font-medium"
              >
                <option value="all">All Departments</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-slate-705 text-xs sm:text-sm font-semibold">
              <span>Sort:</span>
              <select
                id="doctor-sort-filter"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border-0 outline-none text-xs sm:text-sm text-slate-800 rounded-xl py-2 px-3 focus:ring-2 focus:ring-blue-500 hover:bg-slate-100/70 transition-all cursor-pointer font-medium"
              >
                <option value="rating">Highest Rated</option>
                <option value="experience">Most Experienced</option>
                <option value="price">Consultation Fee (Low to High)</option>
              </select>
            </div>

          </div>

        </div>

        {/* 2. Doctor Cards Grid Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="doctors-listing-grid">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doc) => (
              <motion.div
                key={doc.id}
                whileHover={{ y: -4 }}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all group"
              >
                
                {/* Doctor Visual Header Banner */}
                <div className="relative aspect-[4/3] bg-blue-950 overflow-hidden shrink-0">
                  <img 
                    src={doc.image} 
                    alt={doc.name} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-slate-900 border border-white/50 text-xs px-2.5 py-1 rounded-xl font-bold flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{doc.rating}</span>
                  </div>

                  {/* Department Tag */}
                  <div className="absolute bottom-3 left-3 bg-blue-600/90 text-white text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-lg tracking-wider">
                    {activeDepartmentDetails(doc.departmentId)}
                  </div>
                </div>

                {/* Info Center */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-slate-800">
                      <h3 className="font-extrabold text-base sm:text-lg group-hover:text-blue-650 transition-colors leading-snug">
                        {doc.name}
                      </h3>
                      {doc.experience >= 15 && (
                        <BadgeCheck className="w-4.5 h-4.5 text-blue-500 fill-blue-50 shrink-0" title="Senior Specialist" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1">{doc.title}</p>
                    <p className="text-xs text-blue-600 font-extrabold pt-1">
                      {doc.experience} Years of Active Experience
                    </p>
                  </div>

                  <div className="space-y-3.5">
                    
                    {/* Brief stats */}
                    <div className="grid grid-cols-2 gap-2 border-y border-slate-105 py-2.5 text-center text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">Cons. Fee</span>
                        <p className="font-bold text-slate-900 mt-0.5">${doc.price}</p>
                      </div>
                      <div className="border-l border-slate-200">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">Reviews</span>
                        <p className="font-bold text-slate-900 mt-0.5">{doc.reviewsCount} Verified</p>
                      </div>
                    </div>

                    {/* Book Buttons */}
                    <div className="flex gap-2 text-xs">
                      <button
                        onClick={() => setSelectedDoctor(doc)}
                        className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold py-2.5 rounded-xl border border-slate-200 transition-colors text-center focus:outline-none"
                      >
                        Profile Bio
                      </button>

                      <button
                        onClick={() => onBookDoctor(doc)}
                        className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl transition-all hover:shadow-sm flex items-center justify-center gap-1 active:scale-95 text-center focus:outline-none"
                      >
                        <span>Book Clinic</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                </div>

              </motion.div>
            ))
          ) : null}
        </div>

        {/* Fallback empty view */}
        {filteredDoctors.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center text-slate-500 max-w-lg mx-auto">
            <Minimize2 className="w-12 h-12 text-slate-350 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800">No Specialists Discovered</h3>
            <p className="text-sm text-slate-500 mt-1">We couldn't find matching consultants. Make sure directory spellings are correct or expand filters.</p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedDeptFilter('all'); }}
              className="mt-4 bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-xl"
            >
              Reset Search Parameters
            </button>
          </div>
        )}

      </div>

      {/* 3. DOCTOR DETAILED MODAL BIOPOGRAPHY */}
      <AnimatePresence>
        {selectedDoctor && (
          <div 
            className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4"
            id="doctor-profile-modal-backdrop"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto flex flex-col"
              id="doctor-profile-modal-body"
            >
              
              {/* Header block */}
              <div className="relative bg-gradient-to-br from-blue-900 to-slate-950 text-white p-6 sm:p-8">
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 bg-slate-800/60 hover:bg-slate-800 text-white p-1.5 rounded-full border border-slate-755 hover:border-slate-555 transition-all outline-none"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left pt-2">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg border-2 border-blue-500/30 bg-blue-800/50 shrink-0">
                    <img 
                      src={selectedDoctor.image} 
                      alt={selectedDoctor.name} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h2 className="text-2xl font-black">{selectedDoctor.name}</h2>
                      <span className="bg-blue-500/25 text-blue-300 text-xs px-2.5 py-0.5 rounded-md border border-blue-500/30 shrink-0 self-center">
                        {activeDepartmentDetails(selectedDoctor.departmentId)}
                      </span>
                    </div>
                    <p className="text-blue-105 font-semibold text-sm mt-1">{selectedDoctor.title}</p>
                    <p className="text-xs text-blue-300 mt-2">Specialist Consultant with {selectedDoctor.experience} Years Active Practice</p>
                  </div>
                </div>
              </div>

              {/* Core Information Section */}
              <div className="p-6 sm:p-8 space-y-6 flex-1">
                
                {/* About Bio */}
                <div>
                  <h3 className="text-slate-800 font-extrabold text-sm uppercase tracking-wider mb-2">Biography</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{selectedDoctor.bio}</p>
                </div>

                {/* Grid details (Education, Languages, consultation price) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Left info column */}
                  <div className="space-y-4">
                    <div className="flex gap-2.5 items-start">
                      <GraduationCap className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                      <div>
                        <h4 className="text-xs text-slate-400 uppercase font-bold">Academic Education</h4>
                        <p className="text-slate-700 text-xs sm:text-sm font-semibold">{selectedDoctor.education}</p>
                      </div>
                    </div>

                    <div className="flex gap-2.5 items-start">
                      <Languages className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                      <div>
                        <h4 className="text-xs text-slate-400 uppercase font-bold">Languages Spoken</h4>
                        <p className="text-slate-700 text-xs sm:text-sm font-semibold">
                          {selectedDoctor.languages.join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right info column */}
                  <div className="space-y-4">
                    <div className="flex gap-2.5 items-start">
                      <Star className="w-5 h-5 text-amber-500 mt-0.5 shrink-0 fill-amber-500" />
                      <div>
                        <h4 className="text-xs text-slate-400 uppercase font-bold">Patient Satisfaction</h4>
                        <p className="text-slate-700 text-xs sm:text-sm font-bold">
                          {selectedDoctor.rating} out of 5 stars <span className="text-slate-405 font-medium">({selectedDoctor.reviewsCount} reviews)</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2.5 items-start">
                      <Clock className="w-5 h-5 text-blue-650 mt-0.5 shrink-0" />
                      <div>
                        <h4 className="text-xs text-slate-400 uppercase font-bold">Consultation Rates</h4>
                        <p className="text-slate-700 text-xs sm:text-sm font-bold text-blue-700">
                          ${selectedDoctor.price} <span className="text-slate-405 font-medium">per comprehensive visit</span>
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Available Hours */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <h3 className="font-bold text-sm text-slate-800">Weekly Clinical Availability</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedDoctor.availability.map((day, idx) => (
                      <span 
                        key={idx}
                        className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-inner flex items-center gap-1.5"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-blue-500" />
                        <span>{day}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA booking buttons */}
                <div className="flex gap-3 justify-end pt-4 border-t border-slate-200">
                  <button
                    onClick={handleCloseModal}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-705 font-semibold px-5 py-2.5 rounded-xl text-xs transition-colors"
                  >
                    Close Profile
                  </button>
                  <button
                    onClick={() => {
                      onBookDoctor(selectedDoctor);
                      handleCloseModal();
                    }}
                    className="bg-blue-600 hover:bg-blue-550 text-white font-extrabold px-6 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow active:scale-95 transition-all"
                  >
                    <span>Schedule Visit</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
