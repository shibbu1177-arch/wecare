import { Department, Doctor, HospitalReview } from './types';

export const DEPARTMENTS: Department[] = [
  {
    id: 'cardiology',
    name: 'Cardiology',
    description: 'Comprehensive cardiovascular care including diagnostics, surgery, and preventive wellness programs.',
    icon: 'Heart',
    longDescription: 'Our Cardiology Division is a world-class center of excellence. Equipped with state-of-the-art diagnostic laboratories, modern catheterization suites, and a dedicated intensive coronary care unit, we treat everything from common arrhythmias to complex coronary artery diseases and heart failures.',
    services: [
      'Electrocardiogram (ECG) & Stress Testing',
      'Echocardiography (Color Doppler)',
      'Coronary Angiography and Angioplasty',
      'Heart Failure Management',
      'Pacemaker & ICD Implantation'
    ],
    roomNo: 'Building A, Suite 302'
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    description: 'Expert medical care for infants, children, and adolescents, with a friendly, warm environment.',
    icon: 'Baby',
    longDescription: 'Our Pediatrics department provides comprehensive newborn, pediatric, and adolescent care. We aim to protect, maintain, and restore the physical, developmental, and emotional health of young individuals through compassionate clinical excellence in an atmosphere that eases childhood anxieties.',
    services: [
      'Routine Growth & Development Screening',
      'Immunization & Vaccination Schedules',
      'Pediatric Emergency Medicine',
      'Childhood Nutrition & Allergy Management',
      'Asthma & Pediatric Pulmonology Care'
    ],
    roomNo: 'Building B, Suite 104'
  },
  {
    id: 'neurology',
    name: 'Neurology',
    description: 'Specialized diagnosis and treatment of brain, spinal cord, and nervous system disorders.',
    icon: 'Brain',
    longDescription: 'The Neurology Department at WeCare offers cutting-edge diagnostic and therapeutic services for patients with complex neurological diseases. Powered by custom imaging capabilities (MRI/CT), EMG, and video-EEG setups, our neuroscientists target strokes, neurodegenerative illnesses, epilepsy, and persistent migraine patterns.',
    services: [
      'Stroke Rehabilitation & Acute Care',
      'Epilepsy Monitoring & Epilepsy Surgery evaluation',
      'Alzheimer\'s & Dementia Therapeutics',
      'Neuromuscular Evaluation (EMG/NCS)',
      'Migraine and Chronic Headache Solutions'
    ],
    roomNo: 'Building A, Suite 405'
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics',
    description: 'Advanced joint replacements, sports medicine, trauma care, and bone strength diagnostics.',
    icon: 'Activity',
    longDescription: 'Our Orthopedics department dedicatedly restores mobility and relieves body pain. From expert arthroscopic joint surgeries to complex pediatric orthopedics and fracture healing, our orthopedic surgeons use advanced minimally invasive techniques to get you back on your feet quickly.',
    services: [
      'Total Knee & Hip Replacements',
      'Arthroscopic Keyhole Surgery for Ligament Tears',
      'Sports Injury Reconstructive Therapy',
      'Spinal Fusion & Discectomy Procedures',
      'Osteoporosis & Bone Mineral Density Screening'
    ],
    roomNo: 'Building C, Suite 110'
  },
  {
    id: 'dermatology',
    name: 'Dermatology',
    description: 'Advanced clinical, medical & cosmetic therapies for skin, hair, and nail disorders.',
    icon: 'Sparkles',
    longDescription: 'The Dermatology Clinic provides specialized medical, surgical, and cosmetic care to improve active skin conditions and enhance visual wellness. We use targeted laser therapies, cryotherapy, and precise biopsy techniques to identify and treat dermatological challenges safely.',
    services: [
      'Acne, Eczema & Psoriasis Protocols',
      'Skin Cancer Check & Dermato-Oncology',
      'Hair Loss Restoration Treatments',
      'Laser Hair Removal & Scar Resurfacing',
      'Cosmetic Anti-Aging Consultations'
    ],
    roomNo: 'Building B, Suite 212'
  },
  {
    id: 'general-medicine',
    name: 'General Medicine',
    description: 'First point of contact for family care, internal medicine guidance, and chronic disease management.',
    icon: 'Stethoscope',
    longDescription: 'General Medicine is the foundation of comprehensive care at WeCare. Our skilled internists evaluate and manage multi-system chronic conditions, handle common acute physical symptoms, and champion comprehensive preventive physical screening for the entire family.',
    services: [
      'Comprehensive Executive Health Screening',
      'Hypertension & Hypertension Management',
      'Diabetes Care & Lifestyle Counseling',
      'Infectious Diseases Diagnostics',
      'Geriatric Health & Multi-Morbidity Care'
    ],
    roomNo: 'Building B, Suite 101'
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'doc-sarah-jenkins',
    name: 'Dr. Sarah Jenkins',
    title: 'Senior Interventional Cardiologist',
    departmentId: 'cardiology',
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    experience: 16,
    availability: ['Monday', 'Tuesday', 'Thursday'],
    timeSlots: ['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM'],
    bio: 'Dr. Sarah Jenkins is a renowned specialist in interventional cardiology. She specializes in cardiac catheterization, angioplasty, and preventative care. She has led multiple clinical researchers on heart tissue recovery.',
    education: 'MD - Harvard Medical School, Cardiology Fellowship - Johns Hopkins University',
    languages: ['English', 'Spanish'],
    price: 150
  },
  {
    id: 'doc-marcus-vance',
    name: 'Dr. Marcus Vance',
    title: 'Consultant Cardiologist & Rhythm Specialist',
    departmentId: 'cardiology',
    rating: 4.8,
    reviewsCount: 98,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    experience: 12,
    availability: ['Wednesday', 'Thursday', 'Friday'],
    timeSlots: ['09:30 AM', '11:00 AM', '01:30 PM', '03:00 PM', '04:30 PM'],
    bio: 'Dr. Marcus Vance is an expert in cardiac electrophysiology. He works tirelessly with patients presenting complex heartbeat rhythms and supports proactive pacemaker implants and wellness strategies.',
    education: 'MD - Stanford School of Medicine, Cardiovascular Residency - Mayo Clinic',
    languages: ['English', 'German'],
    price: 135
  },
  {
    id: 'doc-elena-rodriguez',
    name: 'Dr. Elena Rodriguez',
    title: 'Chief Pediatrician & Neonatologist',
    departmentId: 'pediatrics',
    rating: 4.9,
    reviewsCount: 210,
    image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400',
    experience: 18,
    availability: ['Monday', 'Wednesday', 'Friday'],
    timeSlots: ['08:30 AM', '09:30 AM', '10:30 AM', '11:30 AM', '02:30 PM', '04:00 PM'],
    bio: 'Dr. Elena Rodriguez approaches child development with high empathy and playful diagnostic exercises that child patients adore. She has substantial experience in neonatology and neonatal intensive care workflows.',
    education: 'MD - Columbia College of Physicians & Surgeons, Residency - Boston Children\'s Hospital',
    languages: ['English', 'Spanish', 'Portuguese'],
    price: 120
  },
  {
    id: 'doc-wei-zhang',
    name: 'Dr. Wei Zhang',
    title: 'Consultant Pediatrician',
    departmentId: 'pediatrics',
    rating: 4.7,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    experience: 10,
    availability: ['Tuesday', 'Thursday', 'Saturday'],
    timeSlots: ['09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM'],
    bio: 'Dr. Wei Zhang is highly skilled in pediatric allergies, juvenile asthma, and growth monitoring. He strongly believes in continuous communication and partnering closely with parents for family wellness.',
    education: 'MD - UC San Francisco School of Medicine, Pediatric Residency - Seattle Children\'s Hospital',
    languages: ['English', 'Mandarin'],
    price: 110
  },
  {
    id: 'doc-alicia-tyler',
    name: 'Dr. Alicia Tyler',
    title: 'Head of Neurology & Neuro-Therapeutics',
    departmentId: 'neurology',
    rating: 4.9,
    reviewsCount: 156,
    image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=400',
    experience: 20,
    availability: ['Monday', 'Tuesday', 'Wednesday'],
    timeSlots: ['10:00 AM', '11:15 AM', '02:00 PM', '03:15 PM', '04:30 PM'],
    bio: 'Dr. Alicia Tyler is a highly respected neuroscientist. She has received national medical accolades for her research on stroke interventions and her tailored therapeutic approach toward Alzheimer\'s management.',
    education: 'MD - Yale School of Medicine, Neurology Fellowship - Massachusetts General Hospital',
    languages: ['English', 'French'],
    price: 170
  },
  {
    id: 'doc-samir-patel',
    name: 'Dr. Samir Patel',
    title: 'Consultant Neuro-Physiologist',
    departmentId: 'neurology',
    rating: 4.8,
    reviewsCount: 74,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    experience: 11,
    availability: ['Thursday', 'Friday'],
    timeSlots: ['09:00 AM', '10:30 AM', '01:30 PM', '03:00 PM', '04:30 PM'],
    bio: 'Dr. Samir Patel treats epilepsy, structural chronic neuropathies, complex migraines, and sleep disorders. He applies the absolute latest neuro-diagnostic monitoring tools to optimize medical dosing schedules.',
    education: 'MD - Michigan State University, Fellowship - Cleveland Clinic',
    languages: ['English', 'Hindi', 'Gujarati'],
    price: 140
  },
  {
    id: 'doc-robert-chen',
    name: 'Dr. Robert Chen',
    title: 'Senior Orthopedic Joint Surgeon',
    departmentId: 'orthopedics',
    rating: 4.9,
    reviewsCount: 165,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    experience: 17,
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    timeSlots: ['08:00 AM', '09:30 AM', '11:00 AM', '02:00 PM', '03:30 PM'],
    bio: 'Dr. Robert Chen is a master joint replacement specialist carrying almost two decades of practice. He utilizes muscle-sparing, computer-assisted joint reconstructive surgery that drastically decreases recovery time.',
    education: 'MD - University of Chicago, Residency - Hospital for Special Surgery, NY',
    languages: ['English', 'Mandarin'],
    price: 160
  },
  {
    id: 'doc-amara-oke',
    name: 'Dr. Amara Oke',
    title: 'Consultant Sports Medicine Specialist',
    departmentId: 'orthopedics',
    rating: 4.8,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400',
    experience: 12,
    availability: ['Wednesday', 'Thursday', 'Friday'],
    timeSlots: ['10:00 AM', '11:30 AM', '01:30 PM', '03:00 PM', '04:30 PM'],
    bio: 'Dr. Amara Oke is dedicated to high-performance muscle recovery and restoring joint mechanics. She has served as lead physician for regional athletic clubs and treats ligament, tendon, and structural bone injuries.',
    education: 'MD - Duke University, Fellowship in Sports Medicine - University of Pittsburgh',
    languages: ['English', 'Yoruba'],
    price: 145
  },
  {
    id: 'doc-lisa-ray',
    name: 'Dr. Lisa Ray',
    title: 'Senior Clinical Dermatologist',
    departmentId: 'dermatology',
    rating: 4.9,
    reviewsCount: 134,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    experience: 14,
    availability: ['Monday', 'Tuesday', 'Thursday'],
    timeSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '01:30 PM', '03:00 PM', '04:30 PM'],
    bio: 'Dr. Lisa Ray is an expert in chronic dermatological diagnostics, ranging from persistent autoimmune skin diseases to localized cutaneous cancer screening and early stage therapeutic laser surgery.',
    education: 'MD - Northwestern University, Residency in Dermatology - NYU School of Medicine',
    languages: ['English'],
    price: 130
  },
  {
    id: 'doc-nicolas-dubois',
    name: 'Dr. Nicolas Dubois',
    title: 'Medical Internist & Family Care Advocate',
    departmentId: 'general-medicine',
    rating: 4.8,
    reviewsCount: 154,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    experience: 15,
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    timeSlots: ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'],
    bio: 'Dr. Nicolas Dubois provides warm, comprehensive care for family health conditions. He excels at preventive wellness counselings, metabolic disorder therapies, and resolving persistent symptoms comfortably.',
    education: 'MD - Sorbonne University (Paris), Residency in Internal Medicine - Penn Medicine',
    languages: ['English', 'French'],
    price: 100
  },
  {
    id: 'doc-carol-danvers',
    name: 'Dr. Carol Danvers',
    title: 'Lead Geriatrician & Preventive Care Specialist',
    departmentId: 'general-medicine',
    rating: 4.9,
    reviewsCount: 120,
    image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=400',
    experience: 16,
    availability: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    timeSlots: ['09:30 AM', '10:30 AM', '11:30 AM', '01:30 PM', '03:30 PM'],
    bio: 'Dr. Carol Danvers focuses heavily on general multi-system elderly diagnostics, wellness, and healthy aging pathways. Her consultations emphasize customized clinical nutrition, preventive scans, and active listening.',
    education: 'MD - Vanderbilt University, Geriatric Fellowship - John A. Burns School of Medicine',
    languages: ['English'],
    price: 115
  }
];

export const REVIEWS: HospitalReview[] = [
  {
    id: 'rev-1',
    author: 'Emily Watson',
    rating: 5,
    date: 'May 12, 2026',
    comment: 'The cardiology team at WeCare was exceptional. Every nurse was caring and Dr. Jenkins was incredibly clear about the angioplasty results. Groundbreaking facility.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 'rev-2',
    author: 'James Anderson',
    rating: 5,
    date: 'April 28, 2026',
    comment: 'Dr. Elena Rodriguez is an absolute saint with infants. My baby boy laughed during the entire vaccination checkup. WeCare has child facilities that are clean and relaxing.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 'rev-3',
    author: 'Sophia Martinez',
    rating: 5,
    date: 'May 20, 2026',
    comment: 'Recovering from keyhole knee surgery done by Dr. Chen. I am already standing and comfortable on crutches just 4 days post-op. Extremely neat and hyper-modern suites!',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100'
  }
];

export const FAQS = [
  {
    id: 'faq-1',
    question: 'How do I schedule an appointment with a specific specialist?',
    answer: 'You can instantly schedule appointments online using our secure Appointment page or by browsing the Doctors directory, selecting your preferred doctor, clicking "Book Appointment", filling in your details, and confirming standard clinic slots.'
  },
  {
    id: 'faq-2',
    question: 'Does WeCare Hospitals accept international health insurance policies?',
    answer: 'Yes! WeCare partners with key global health networks and insurers like Blue Cross, Allianz, Aetna, Cigna, and AXA. Please contact our Billing Office in Building B or present your validation card at the main reception counter.'
  },
  {
    id: 'faq-3',
    question: 'Where can I access my laboratory results or prescription updates?',
    answer: 'You can see a summarized list of scheduled and stored appointments in the "My Bookings" dashboard right on this portal. For official diagnostic records, we mail secure links to the email provided during authorization.'
  },
  {
    id: 'faq-4',
    question: 'What measures are in place to ensure patient clinical safety?',
    answer: 'Patient safety is our primary metric. WeCare strictly follows ISO-certified sanitization, state-of-the-art sterile surgical suites, and multi-tier patient identification tags to completely avoid diagnostics errors.'
  }
];

export const HOSPITAL_METRICS = [
  { value: '25+', label: 'Years of Clinical Excellence' },
  { value: '150+', label: 'Highly Qualified Specialists' },
  { value: '45k+', label: 'Successful Annual Surgeries' },
  { value: '99.2%', label: 'Patient Satisfaction Rating' }
];
