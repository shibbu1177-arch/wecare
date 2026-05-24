import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import DepartmentsSection from './components/DepartmentsSection';
import DoctorsSection from './components/DoctorsSection';
import AppointmentSection from './components/AppointmentSection';
import Footer from './components/Footer';
import { Doctor } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  
  // Shared interaction states to link pages cohesively
  const [selectedDeptId, setSelectedDeptId] = useState<string | null>(null);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<Doctor | null>(null);
  const [selectedDoctorForModal, setSelectedDoctorForModal] = useState<Doctor | null>(null);

  // Navigate to booking page with a doctor preloaded
  const handleBookDoctor = (doctor: Doctor) => {
    setSelectedDoctorForBooking(doctor);
    setActiveTab('booking');
  };

  // Navigates to departments with a specific department pre-focused
  const handleSelectDepartmentFromHome = (deptId: string) => {
    setSelectedDeptId(deptId);
    setActiveTab('departments');
  };

  // Navigates to doctors and launches their profile biography modal directly
  const handleViewDoctorProfile = (doctor: Doctor) => {
    setSelectedDoctorForModal(doctor);
    setActiveTab('doctors');
  };

  // Triggers booking via a quick navigation header action
  const handleQuickBookAction = () => {
    setSelectedDoctorForBooking(null);
    setActiveTab('booking');
  };

  const renderSection = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeSection 
            onNavigate={(tab) => setActiveTab(tab)}
            onSelectDepartment={handleSelectDepartmentFromHome}
          />
        );
      case 'about':
        return <AboutSection />;
      case 'departments':
        return (
          <DepartmentsSection 
            initialSelectedDeptId={selectedDeptId}
            onBookDoctor={handleBookDoctor}
            onViewDoctorProfile={handleViewDoctorProfile}
          />
        );
      case 'doctors':
        return (
          <DoctorsSection 
            onBookDoctor={handleBookDoctor}
            selectedDoctorForModal={selectedDoctorForModal}
            clearDoctorModal={() => setSelectedDoctorForModal(null)}
          />
        );
      case 'booking':
        return (
          <AppointmentSection 
            preselectedDoctor={selectedDoctorForBooking}
            clearPreselectedDoctor={() => setSelectedDoctorForBooking(null)}
          />
        );
      default:
        return (
          <HomeSection 
            onNavigate={(tab) => setActiveTab(tab)}
            onSelectDepartment={handleSelectDepartmentFromHome}
          />
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-800 antialiased selection:bg-emerald-500 selection:text-white">
      
      {/* Navigation Header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          // Clean secondary focus states if changing tab manually
          if (tab !== 'departments') setSelectedDeptId(null);
          if (tab !== 'booking') setSelectedDoctorForBooking(null);
          if (tab !== 'doctors') setSelectedDoctorForModal(null);
        }} 
        onQuickBook={handleQuickBookAction}
      />

      {/* Main Page Area with Elegant Fade Animation */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Shared Hospital Directory Footer */}
      <Footer setActiveTab={(tab) => {
        setActiveTab(tab);
        if (tab !== 'departments') setSelectedDeptId(null);
        if (tab !== 'booking') setSelectedDoctorForBooking(null);
        if (tab !== 'doctors') setSelectedDoctorForModal(null);
      }} />

    </div>
  );
}
