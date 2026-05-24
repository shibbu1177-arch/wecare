export interface Department {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon key
  longDescription: string;
  services: string[];
  roomNo: string;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  departmentId: string;
  rating: number;
  reviewsCount: number;
  image: string; // Abstract medical background or illustration-style avatar representation
  experience: number; // Years of experience
  availability: string[]; // e.g. ["Mon", "Wed", "Fri"]
  timeSlots: string[]; // e.g. ["09:00 AM", "10:30 AM", ...]
  bio: string;
  education: string;
  languages: string[];
  price: number; // Consultation fee in USD
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  departmentName: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  date: string;
  timeSlot: string;
  notes?: string;
  status: 'scheduled' | 'canceled' | 'completed';
  createdAt: string;
}

export interface HospitalReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
}
