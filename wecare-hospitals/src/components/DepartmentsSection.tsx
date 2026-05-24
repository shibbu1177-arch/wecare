import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Baby, 
  Brain, 
  Activity, 
  Sparkles, 
  Stethoscope, 
  MapPin, 
  UserCheck, 
  ArrowRight,
  ClipboardList
} from 'lucide-react';
import { DEPARTMENTS, DOCTORS } from '../data';
import { Department, Doctor } from '../types';

interface DepartmentsSectionProps {
  initialSelectedDeptId?: string | null;
  onBookDoctor: (doctor: Doctor) => void;
  onViewDoctorProfile: (doctor: Doctor) => void;
}

// Icon helper function mapping database strings to Lucide components
const renderDepartmentIcon = (iconName: string, className = "w-6 h-6") => {
  switch (iconName) {
    case 'Heart':
      return <Heart className={className} />;
    case 'Baby':
      return <Baby className={className} />;
    case 'Brain':
      return <Brain className={className} />;
    case 'Activity':
      return <Activity className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    default:
      return <Stethoscope className={className} />;
  }
};

export default function DepartmentsSection({ 
  initialSelectedDeptId, 
  onBookDoctor, 
  onViewDoctorProfile 
}: DepartmentsSectionProps) {
  const [selectedDeptId, setSelectedDeptId] = useState<string>(initialSelectedDeptId || DEPARTMENTS[0].id);

  // Sync state with parent clicks if they occurred
  React.useEffect(() => {
    if (initialSelectedDeptId) {
      setSelectedDeptId(initialSelectedDeptId);
    }
  }, [initialSelectedDeptId]);

  const activeDept = DEPARTMENTS.find(d => d.id === selectedDeptId) || DEPARTMENTS[0];
  const activeDoctors = DOCTORS.filter(doc => doc.departmentId === activeDept.id);

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-block mb-3">
            Core Facilities
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Our Specialized Clinical Departments
          </h1>
          <p className="mt-2 text-slate-500 text-sm sm:text-base">
            Select a medical wing to explore detailed inpatient/outpatient services, room directories, and our board-certified experts.
          </p>
        </div>

        {/* Dynamic Responsive layout with Left selector and Right details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SELECTOR: Grid list of standard departments */}
          <div className="lg:col-span-4 space-y-3" id="department-selectors">
            <h2 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2 px-1">Clinical Wings</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {DEPARTMENTS.map((dept) => {
                const isSelected = dept.id === selectedDeptId;
                return (
                  <button
                    key={dept.id}
                    id={`dept-select-${dept.id}`}
                    onClick={() => setSelectedDeptId(dept.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center gap-4 focus:outline-none ${
                      isSelected 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/10 scale-[1.02]' 
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-350 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl shrink-0 ${
                      isSelected ? 'bg-blue-500 text-white' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {renderDepartmentIcon(dept.icon, "w-5.5 h-5.5")}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm sm:text-base truncate">{dept.name}</h3>
                      <p className={`text-xs truncate ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                        {dept.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT PANELS: Rich informational views detailing the active department */}
          <div className="lg:col-span-8 space-y-6">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDept.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6"
                id="department-details-pane"
              >
                
                {/* Header Banner inside pane */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-50 text-blue-600 p-3.5 rounded-2xl border border-blue-100 shadow-inner">
                      {renderDepartmentIcon(activeDept.icon, "w-7 h-7")}
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                        {activeDept.name} General Suite
                      </h2>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-blue-600" />
                        <span>Located in {activeDept.roomNo}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-100/40 text-blue-800 text-xs py-1.5 px-3 rounded-lg border border-blue-100 font-bold self-start sm:self-center">
                    Room No: {activeDept.roomNo.split(',').pop() || 'Suite 100'}
                  </div>
                </div>

                {/* Long Description and core details */}
                <div>
                  <h3 className="text-slate-900 font-bold text-md mb-2">Overview</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {activeDept.longDescription}
                  </p>
                </div>

                {/* Sub-services mapping lists */}
                <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-150">
                  <div className="flex items-center gap-2 mb-3 text-slate-800">
                    <ClipboardList className="w-5 h-5 text-blue-650" />
                    <h3 className="font-bold text-sm sm:text-base">Division Services &amp; Specialized Checkups</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeDept.services.map((srv, index) => (
                      <div key={index} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></span>
                        <span>{srv}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Department Specialists listing with rapid Book actions */}
                <div className="space-y-4 pt-4 border-t border-slate-150">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                      Associated {activeDept.name} Experts
                    </h3>
                    <p className="text-xs text-slate-500">Book direct consultations with doctors specializing specifically in this branch.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeDoctors.length > 0 ? (
                      activeDoctors.map((doc) => (
                        <div 
                          key={doc.id}
                          className="bg-slate-50 hover:bg-slate-100/50 border border-slate-200 hover:border-blue-200 rounded-2xl p-4 flex gap-3 transition-all relative overflow-hidden group"
                        >
                          {/* Image */}
                          <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-white shadow-inner animate-pulse">
                            <img 
                              src={doc.image} 
                              alt={doc.name} 
                              className="w-full h-full object-cover" 
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          <div className="min-w-0 flex flex-col justify-between">
                            <div>
                              <h4 className="font-bold text-sm sm:text-base text-slate-900 leading-tight truncate group-hover:text-blue-600 transition-colors">
                                {doc.name}
                              </h4>
                              <p className="text-[11px] text-slate-500 line-clamp-1">{doc.title}</p>
                              <p className="text-xs text-blue-600 font-extrabold mt-1">Exp: {doc.experience} Years</p>
                            </div>

                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() => onViewDoctorProfile(doc)}
                                className="text-[10px] sm:text-xs text-slate-500 hover:text-blue-600 font-bold hover:underline transition-all focus:outline-none"
                              >
                                View Biography
                              </button>
                              <span className="text-slate-300">|</span>
                              <button
                                onClick={() => onBookDoctor(doc)}
                                className="text-[10px] sm:text-xs text-blue-600 hover:text-blue-700 font-extrabold focus:outline-none flex items-center gap-0.5 hover:underline"
                              >
                                <span>Book Now</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 text-center p-6 text-slate-400 text-sm italic">
                        No specialists declared for this ward at present.
                      </div>
                    )}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>
    </div>
  );
}
