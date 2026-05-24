import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  FileText, 
  User, 
  Mail, 
  PhoneCall, 
  CheckCircle, 
  X, 
  AlertCircle, 
  Trash2, 
  ArrowRight,
  ClipboardList,
  HeartPulse,
  Sparkles
} from 'lucide-react';
import { DEPARTMENTS, DOCTORS } from '../data';
import { Doctor, Appointment } from '../types';

interface AppointmentSectionProps {
  preselectedDoctor?: Doctor | null;
  clearPreselectedDoctor?: () => void;
}

export default function AppointmentSection({ 
  preselectedDoctor, 
  clearPreselectedDoctor 
}: AppointmentSectionProps) {
  // Appointment lists loaded from localStorage
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  
  // Form State
  const [selectedDeptId, setSelectedDeptId] = useState<string>('all');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');
  const [patientName, setPatientName] = useState<string>('');
  const [patientEmail, setPatientEmail] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [symptoms, setSymptoms] = useState<string>('');

  // UI state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [appointmentFilter, setAppointmentFilter] = useState<'all' | 'scheduled' | 'canceled'>('all');

  // Load appointments on component mount
  useEffect(() => {
    const saved = localStorage.getItem('wecare_appointments');
    if (saved) {
      try {
        setAppointments(JSON.parse(saved));
      } catch (err) {
        console.error('Failed to parse saved appointments', err);
      }
    }
  }, []);

  // Handle pre-selected doctor from other views
  useEffect(() => {
    if (preselectedDoctor) {
      setSelectedDeptId(preselectedDoctor.departmentId);
      setSelectedDoctorId(preselectedDoctor.id);
      
      // Auto-focus scroll to the form
      const el = document.getElementById('appointment-booking-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [preselectedDoctor]);

  // Doctors filtered by selected department
  useEffect(() => {
    // Reset doctor selection if department changes and current doctor doesn't belong to it
    if (selectedDeptId !== 'all') {
      const match = DOCTORS.find((d) => d.id === selectedDoctorId && d.departmentId === selectedDeptId);
      if (!match) {
        setSelectedDoctorId('');
        setSelectedTimeSlot('');
      }
    }
  }, [selectedDeptId]);

  const doctorsList = DEPARTMENTS.reduce<Doctor[]>((acc, dept) => {
    if (selectedDeptId === 'all' || dept.id === selectedDeptId) {
      const deptDocs = DOCTORS.filter((doc) => doc.departmentId === dept.id);
      return [...acc, ...deptDocs];
    }
    return acc;
  }, []);

  // Currently selected doctor object
  const activeDoctorObj = DOCTORS.find((d) => d.id === selectedDoctorId);

  // Available slots for selected doctor
  const availableSlots = activeDoctorObj ? activeDoctorObj.timeSlots : [];

  // Submit Booking
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validations
    if (!selectedDoctorId) {
      triggerToast('Please select a healthcare doctor/specialist.', 'error');
      return;
    }
    if (!selectedDate) {
      triggerToast('Please select a preferred appointment date.', 'error');
      return;
    }
    if (!selectedTimeSlot) {
      triggerToast('Please select an available timeslot.', 'error');
      return;
    }
    if (!patientName.trim()) {
      triggerToast('Please specify the patient\'s complete legal name.', 'error');
      return;
    }
    if (!patientEmail.trim() || !patientPhone.trim()) {
      triggerToast('Please specify contact details (Email & Phone).', 'error');
      return;
    }

    const matchedDoc = DOCTORS.find((d) => d.id === selectedDoctorId)!;
    const matchedDept = DEPARTMENTS.find((dp) => dp.id === matchedDoc.departmentId)!;

    const newAppointment: Appointment = {
      id: 'apt-' + Math.random().toString(36).substring(2, 9),
      doctorId: matchedDoc.id,
      doctorName: matchedDoc.name,
      departmentName: matchedDept.name,
      patientName: patientName,
      patientEmail: patientEmail,
      patientPhone: patientPhone,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      notes: symptoms,
      status: 'scheduled',
      createdAt: new Date().toISOString()
    };

    const updated = [newAppointment, ...appointments];
    setAppointments(updated);
    localStorage.setItem('wecare_appointments', JSON.stringify(updated));

    triggerToast(`Success! Your appointment with ${matchedDoc.name} is scheduled.`, 'success');
    
    // Clear form
    setPatientName('');
    setPatientEmail('');
    setPatientPhone('');
    setSelectedDate('');
    setSelectedTimeSlot('');
    setSymptoms('');
    setSelectedDoctorId('');
    setSelectedDeptId('all');
    
    if (clearPreselectedDoctor) {
      clearPreselectedDoctor();
    }
  };

  // Cancel Booking
  const handleCancelAppointment = (id: string) => {
    const updated = appointments.map((apt) => {
      if (apt.id === id) {
        return { ...apt, status: 'canceled' as const };
      }
      return apt;
    });
    setAppointments(updated);
    localStorage.setItem('wecare_appointments', JSON.stringify(updated));
    triggerToast('Appointment canceled successfully.', 'success');
  };

  const triggerToast = (msg: string, type: 'success' | 'error') => {
    setToastMessage(msg);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  // Filtered Appointments list
  const filteredAppointments = appointments.filter((apt) => {
    if (appointmentFilter === 'all') return true;
    return apt.status === appointmentFilter;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14 relative">
      
      {/* Toast Alert System */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-4 right-4 z-50 p-4 rounded-2xl shadow-xl flex items-center gap-3 w-80 border ${
              toastType === 'success' 
                ? 'bg-blue-50 text-blue-800 border-blue-200' 
                : 'bg-red-50 text-red-800 border-red-200'
            }`}
          >
            {toastType === 'success' ? (
              <CheckCircle className="w-6 h-6 text-blue-500 shrink-0" />
            ) : (
              <AlertCircle className="w-6 h-6 text-red-500 shrink-0" />
            )}
            <div className="text-xs sm:text-sm font-semibold">{toastMessage}</div>
            <button onClick={() => setShowToast(false)} className="text-slate-455 hover:text-slate-700 ml-auto focus:outline-none">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-105 inline-block mb-3">
            Secure Portal
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Appointment Booking &amp; Dashboard
          </h1>
          <p className="mt-2 text-slate-500 text-sm sm:text-base">
            Instantly reserve clinic consultations, manage historical scheduling profiles, or request cancellations easily.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE: Dynamic Booking Form Widget */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8" id="appointment-booking-form">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100 mb-6">
              <ClipboardList className="w-5 h-5 text-blue-600 shadow-sm" />
              <h2 className="text-xl font-bold text-slate-900">Schedule Medical Consultation</h2>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-6">
              
              {/* Dropdowns filters row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Select Department first */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-dept-select" className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    1. Choose Clinical Wing
                  </label>
                  <select
                    id="form-dept-select"
                    value={selectedDeptId}
                    onChange={(e) => setSelectedDeptId(e.target.value)}
                    className="bg-slate-50 border-0 outline-none rounded-xl py-2.5 px-3 focus:ring-2 focus:ring-blue-500 hover:bg-slate-100/50 transition-all font-medium text-slate-800 text-sm cursor-pointer"
                  >
                    <option value="all">All Specialties</option>
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name} Wing
                      </option>
                    ))}
                  </select>
                </div>

                {/* Now choose doctor from matching list */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-doctor-select" className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    2. Select Specialist
                  </label>
                  <select
                    id="form-doctor-select"
                    value={selectedDoctorId}
                    onChange={(e) => {
                      setSelectedDoctorId(e.target.value);
                      setSelectedTimeSlot('');
                    }}
                    className="bg-slate-50 border-0 outline-none rounded-xl py-2.5 px-3 focus:ring-2 focus:ring-blue-500 hover:bg-slate-100/50 transition-all font-medium text-slate-800 text-sm cursor-pointer"
                  >
                    <option value="">-- Choose Physician --</option>
                    {doctorsList.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name} (${doc.price})
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Date selection & timeslot row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Date Picker */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="appointment-date-input" className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>3. Consultation Date</span>
                  </label>
                  <input
                    id="appointment-date-input"
                    type="date"
                    min="2026-05-25" // Sets min date logic to keep it realistic
                    max="2026-12-31"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="bg-slate-50 border-0 outline-none rounded-xl py-2 px-3 focus:ring-2 focus:ring-blue-500 hover:bg-slate-100/50 transition-all text-slate-800 text-sm font-medium cursor-pointer"
                  />
                </div>

                {/* Info summary block if doctor matches */}
                {activeDoctorObj && (
                  <div className="bg-blue-50/50 rounded-xl p-3 border border-blue-100/50 text-[11px] sm:text-xs text-slate-600 leading-normal flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-blue-505 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800">Weekly Schedule of {activeDoctorObj.name}:</span>
                      <p className="mt-0.5 mt-1">Available Days: {activeDoctorObj.availability.join(', ')}</p>
                    </div>
                  </div>
                )}

              </div>

              {/* Time Slots selector */}
              {selectedDoctorId && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>4. Select Available Hours Slot</span>
                  </span>
                  
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2" id="timeslot-buttons-grid">
                    {availableSlots.map((slot) => {
                      const isSelected = selectedTimeSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          id={`timeslot-btn-${slot.replace(/[:\s]/g, '-')}`}
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`py-2 px-1 text-center font-bold text-xs rounded-xl border transition-all ${
                            isSelected 
                              ? 'bg-blue-600 text-white border-blue-650 ring-2 ring-blue-500/20' 
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-150 hover:border-slate-350'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Patient Details Forms */}
              <div className="space-y-4 pt-4 border-t border-slate-205">
                <span className="text-blue-700 font-extrabold text-xs uppercase tracking-widest block">
                  5. Patient Legal Identification &amp; Contact Info
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="patient-name-input" className="text-[10px] sm:text-xs font-bold text-slate-505 uppercase tracking-wide flex items-center gap-1">
                      <User className="w-3 h-3 text-slate-400" /> Legal Name
                    </label>
                    <input
                      id="patient-name-input"
                      type="text"
                      placeholder="e.g. Emily Cooper"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="bg-slate-50 border-0 outline-none rounded-xl py-2 px-3 focus:ring-2 focus:ring-blue-500 text-slate-800 text-sm"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="patient-email-input" className="text-[10px] sm:text-xs font-bold text-slate-505 uppercase tracking-wide flex items-center gap-1">
                      <Mail className="w-3 h-3 text-slate-400" /> Email Address
                    </label>
                    <input
                      id="patient-email-input"
                      type="email"
                      placeholder="e.g. emily@gmail.com"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      className="bg-slate-50 border-0 outline-none rounded-xl py-2 px-3 focus:ring-2 focus:ring-blue-500 text-slate-800 text-sm"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="patient-phone-input" className="text-[10px] sm:text-xs font-bold text-slate-505 uppercase tracking-wide flex items-center gap-1">
                      <PhoneCall className="w-3 h-3 text-slate-400" /> Mobile Number
                    </label>
                    <input
                      id="patient-phone-input"
                      type="tel"
                      placeholder="e.g. (555) 019-2834"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="bg-slate-50 border-0 outline-none rounded-xl py-2 px-3 focus:ring-2 focus:ring-blue-500 text-slate-800 text-sm"
                    />
                  </div>
                </div>

                {/* Brief Notes */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="patient-notes-textarea" className="text-[10px] sm:text-xs font-bold text-slate-555 uppercase tracking-wide flex items-center gap-1">
                    <FileText className="w-3 h-3 text-slate-400" /> Briefly Describe Symptoms / Reasons for Visit
                  </label>
                  <textarea
                    id="patient-notes-textarea"
                    rows={3}
                    placeholder="Provide any acute symptoms, persistent pain history, chronic status, or general concerns here..."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="bg-slate-50 border-0 outline-none rounded-xl py-2.5 px-3 focus:ring-2 focus:ring-blue-500 text-slate-800 text-sm resize-none"
                  />
                </div>

              </div>

              {/* Submit trigger */}
              <button
                id="btn-submit-booking-form"
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 shadow hover:shadow-md active:scale-98 transition-all"
              >
                <CheckCircle className="w-4.5 h-4.5 text-white" />
                <span>Confirm &amp; Register Appointment</span>
              </button>

            </form>
          </div>

          {/* RIGHT SIDE: Personal Appointment Management Dashboard */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Informational Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-blue-500/10 blur-2xl pointer-events-none select-none"></div>
              <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
                <HeartPulse className="w-4 h-4 shadow-sm" />
                <span>WeCare Patient Portal</span>
              </div>
              <h3 className="text-xl font-bold mb-1">Empathetic Care Guidelines</h3>
              <p className="text-xs text-slate-450 leading-relaxed">
                Before coming in, please arrive 15 minutes before your scheduled slot. Bring insurance documentation and valid diagnostic scans.
              </p>
            </div>

            {/* Live Appointments Checklist */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4" id="appointments-dashboard">
              
              <div className="flex items-center justify-between border-b border-slate-105 pb-3">
                <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span>My Scheduled Visits ({appointments.length})</span>
                </div>
                
                {/* Visual filter options inside dashboard */}
                <select
                  id="dashboard-status-filter"
                  value={appointmentFilter}
                  onChange={(e) => setAppointmentFilter(e.target.value as any)}
                  className="bg-slate-50 text-[10px] text-slate-600 border-0 outline-none rounded-lg py-1 px-2 font-bold cursor-pointer"
                >
                  <option value="all">Show All</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="canceled">Canceled</option>
                </select>
              </div>

              {/* Render lists */}
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                <AnimatePresence mode="popLayout">
                  {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((apt) => (
                      <motion.div
                        key={apt.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 relative ${
                          apt.status === 'canceled'
                            ? 'bg-red-50/20 border-red-100 text-slate-400'
                            : 'bg-slate-50 hover:bg-slate-100/70 border-slate-200 text-slate-800'
                        }`}
                        id={`dashboard-apt-card-${apt.id}`}
                      >
                        {/* Header details inside card */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-extrabold uppercase text-blue-600 tracking-wider">
                              {apt.departmentName} Wing
                            </span>
                            <h4 className="font-extrabold text-sm sm:text-base text-slate-950 mt-0.5 flex items-center gap-1">
                              {apt.doctorName}
                            </h4>
                          </div>

                          <div className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                            apt.status === 'canceled' 
                              ? 'bg-red-100 text-red-700 border border-red-200' 
                              : 'bg-blue-105 text-blue-800 border border-blue-200'
                          }`}>
                            {apt.status === 'canceled' ? 'Canceled' : 'Scheduled'}
                          </div>
                        </div>

                        {/* Patient & schedule specifics */}
                        <div className="text-xs space-y-1.5 text-slate-500 border-t border-slate-100 pt-2.5">
                          <p className="flex items-center justify-between">
                            <span className="text-[10px] uppercase font-semibold text-slate-400">Patient File:</span>
                            <span className="font-bold text-slate-800">{apt.patientName}</span>
                          </p>
                          <p className="flex items-center justify-between">
                            <span className="text-[10px] uppercase font-semibold text-slate-400">Scheduled Date:</span>
                            <span className="font-bold text-slate-800">{apt.date}</span>
                          </p>
                          <p className="flex items-center justify-between">
                            <span className="text-[10px] uppercase font-semibold text-slate-400">Time Slot:</span>
                            <span className="font-bold text-blue-600">{apt.timeSlot}</span>
                          </p>
                          {apt.notes && (
                            <p className="text-[10px] italic text-slate-400 leading-normal border-t border-dotted border-slate-200 pt-1">
                              "{apt.notes}"
                            </p>
                          )}
                        </div>

                        {/* Action buttons inside card */}
                        {apt.status === 'scheduled' && (
                          <div className="flex justify-end pt-2 border-t border-slate-100">
                            <button
                              id={`cancel-btn-${apt.id}`}
                              onClick={() => handleCancelAppointment(apt.id)}
                              className="text-[10px] sm:text-xs text-red-600 hover:text-red-800 font-extrabold flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-100 bg-red-50 hover:bg-red-100/50 transition-colors cursor-pointer outline-none"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Cancel Reservation</span>
                            </button>
                          </div>
                        )}

                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center p-8 text-slate-405 border-2 border-dashed border-slate-200 rounded-2xl">
                      <p className="text-sm font-semibold">No active scheduled visits discovered.</p>
                      <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">Fill in the consultation form to register your first health checkup.</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
