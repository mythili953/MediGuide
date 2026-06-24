-- =============================================================================
-- MediGuide Travel Assist - Sample Data
-- =============================================================================

-- Languages
INSERT INTO languages (language_name, language_code, native_name) VALUES
('English',   'en', 'English'),
('Hindi',     'hi', 'हिन्दी'),
('Spanish',   'es', 'Español'),
('French',    'fr', 'Français'),
('German',    'de', 'Deutsch'),
('Mandarin',  'zh', '普通话'),
('Japanese',  'ja', '日本語'),
('Arabic',    'ar', 'العربية'),
('Portuguese','pt', 'Português'),
('Korean',    'ko', '한국어')
ON CONFLICT DO NOTHING;

-- Admin user (password: Admin@1234)
INSERT INTO users (name, email, password, nationality, preferred_language, role, created_at, updated_at)
VALUES ('Admin User', 'admin@mediguide.com',
        '$2b$10$ckz8JsGE97vJ0qkmNCJg.OTcXGAJcZQBvM4M.wuh0ttnxad0cTBFS',
        'India', 'en', 'ADMIN', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Demo user (password: Demo@1234)
INSERT INTO users (name, email, password, nationality, preferred_language, blood_group, allergies, role, created_at, updated_at)
VALUES ('Jane Traveler', 'jane@example.com',
        '$2b$10$6QBWq6aKD3f6vNkg1DN78OA7iCTGs0QKIuRNt7Qz3TRoxYLWCBcKq',
        'USA', 'en', 'O+', 'Penicillin', 'USER', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- =============================================================================
-- HOSPITALS
-- =============================================================================

-- NEW YORK
INSERT INTO hospitals (name, address, latitude, longitude, city, country, rating, total_reviews, specialties, emergency_available, opening_hours, phone_number, website, hospital_type, bed_count, image_url)
VALUES
('New York-Presbyterian Hospital', '525 East 68th Street, New York, NY', 40.7649, -73.9534, 'New York', 'USA', 4.8, 312, 'Cardiology,Oncology,Neurology,Emergency Medicine', true, '24/7', '+1-212-746-5454', 'nyp.org', 'Teaching Hospital', 2600, 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800'),
('Mount Sinai Hospital', '1 Gustave L. Levy Place, New York, NY', 40.7895, -73.9522, 'New York', 'USA', 4.7, 278, 'Cardiology,Gastroenterology,Orthopedics', true, '24/7', '+1-212-241-6500', 'mountsinai.org', 'General Hospital', 1134, 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800'),
('Bellevue Hospital Center', '462 First Avenue, New York, NY', 40.7393, -73.9762, 'New York', 'USA', 4.4, 156, 'Psychiatry,Emergency Medicine,Trauma', true, '24/7', '+1-212-562-4141', 'nychealthandhospitals.org', 'Public Hospital', 828, 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800');

-- LONDON
INSERT INTO hospitals (name, address, latitude, longitude, city, country, rating, total_reviews, specialties, emergency_available, opening_hours, phone_number, website, hospital_type, bed_count, image_url)
VALUES
('St Thomas Hospital', 'Westminster Bridge Road, London', 51.4982, -0.1189, 'London', 'UK', 4.9, 421, 'Cardiology,Neuroscience,Oncology,Emergency', true, '24/7', '+44-20-7188-7188', 'guysandstthomas.nhs.uk', 'NHS Trust Hospital', 830, 'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=800'),
('King College Hospital', 'Denmark Hill, London', 51.4669, -0.0920, 'London', 'UK', 4.7, 267, 'Liver Disease,Blood Disorders,Trauma', true, '24/7', '+44-20-3299-9000', 'kch.nhs.uk', 'NHS Teaching Hospital', 950, 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800'),
('London Bridge Hospital', '27 Tooley Street, London', 51.5051, -0.0846, 'London', 'UK', 4.6, 189, 'Orthopedics,Cardiology,Neurology', false, 'Mon-Sun 8AM-8PM', '+44-20-7407-3100', 'londonbridgehospital.com', 'Private Hospital', 148, 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800');

-- TOKYO
INSERT INTO hospitals (name, address, latitude, longitude, city, country, rating, total_reviews, specialties, emergency_available, opening_hours, phone_number, website, hospital_type, bed_count, image_url)
VALUES
('Tokyo Medical University Hospital', '6-7-1 Nishishinjuku, Shinjuku, Tokyo', 35.6938, 139.6917, 'Tokyo', 'Japan', 4.8, 345, 'Oncology,Cardiology,Neurosurgery,Transplant', true, '24/7', '+81-3-3342-6111', 'tokyo-med.ac.jp', 'University Hospital', 1015, 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800'),
('St Lukes International Hospital', '9-1 Akashicho, Chuo, Tokyo', 35.6684, 139.7712, 'Tokyo', 'Japan', 4.9, 412, 'International Medicine,Emergency,Internal Medicine', true, '24/7', '+81-3-5550-7166', 'hospital.luke.ac.jp', 'International Hospital', 520, 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800'),
('Tokyo Midtown Medical Center', '9-7-1 Akasaka, Minato, Tokyo', 35.6668, 139.7310, 'Tokyo', 'Japan', 4.7, 198, 'General Medicine,Dermatology,Ophthalmology', false, 'Mon-Sat 9AM-6PM', '+81-3-5413-7911', 'tmmc.jp', 'Clinic', 65, 'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=800');

-- DUBAI
INSERT INTO hospitals (name, address, latitude, longitude, city, country, rating, total_reviews, specialties, emergency_available, opening_hours, phone_number, website, hospital_type, bed_count, image_url)
VALUES
('Cleveland Clinic Abu Dhabi', 'Al Maryah Island, Abu Dhabi', 24.4539, 54.3773, 'Dubai', 'UAE', 4.9, 567, 'Cardiology,Oncology,Neuroscience,Digestive Disease', true, '24/7', '+971-2-501-9000', 'clevelandclinicabudhabi.ae', 'Specialty Hospital', 364, 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800'),
('American Hospital Dubai', '19th St, Oud Metha, Dubai', 25.2296, 55.3095, 'Dubai', 'UAE', 4.8, 389, 'General Surgery,Orthopedics,Cardiology,Pediatrics', true, '24/7', '+971-4-336-7777', 'ahdubai.com', 'Private Hospital', 165, 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800'),
('Mediclinic City Hospital', 'Dubai Healthcare City, Dubai', 25.2300, 55.3250, 'Dubai', 'UAE', 4.6, 234, 'Oncology,Gynecology,ENT,Ophthalmology', false, 'Mon-Sun 8AM-9PM', '+971-4-435-9999', 'mediclinic.ae', 'Private Clinic', 280, 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800');

-- PARIS
INSERT INTO hospitals (name, address, latitude, longitude, city, country, rating, total_reviews, specialties, emergency_available, opening_hours, phone_number, website, hospital_type, bed_count, image_url)
VALUES
('American Hospital of Paris', '63 Bd Victor Hugo, Neuilly-sur-Seine', 48.8847, 2.2763, 'Paris', 'France', 4.8, 445, 'Emergency,Cardiology,Oncology,General Surgery', true, '24/7', '+33-1-46-41-25-25', 'american-hospital.org', 'Private International Hospital', 187, 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800'),
('Hopital Lariboisiere', '2 Rue Ambroise Pare, Paris', 48.8786, 2.3567, 'Paris', 'France', 4.5, 312, 'Cardiology,Neurology,Emergency,Toxicology', true, '24/7', '+33-1-49-95-65-65', 'lariboisiere.fr', 'Public Hospital', 795, 'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=800');

-- MUMBAI
INSERT INTO hospitals (name, address, latitude, longitude, city, country, rating, total_reviews, specialties, emergency_available, opening_hours, phone_number, website, hospital_type, bed_count, image_url)
VALUES
('Kokilaben Dhirubhai Ambani Hospital', 'Rao Saheb Achutrao Patwardhan Marg, Mumbai', 19.1310, 72.8316, 'Mumbai', 'India', 4.8, 589, 'Cardiology,Oncology,Neuroscience,Organ Transplant', true, '24/7', '+91-22-4269-6969', 'kokilabenhospital.com', 'Super Specialty Hospital', 750, 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800'),
('Lilavati Hospital', 'A-791, Bandra Reclamation, Mumbai', 19.0569, 72.8265, 'Mumbai', 'India', 4.7, 423, 'Cardiology,Orthopedics,Neurology,Oncology', true, '24/7', '+91-22-2675-1000', 'lilavatihospital.com', 'Private Hospital', 323, 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800'),
('Tata Memorial Hospital', 'Dr Ernest Borges Marg, Parel, Mumbai', 19.0045, 72.8416, 'Mumbai', 'India', 4.9, 712, 'Oncology,Radiation Therapy,Surgical Oncology', true, '24/7', '+91-22-2417-7000', 'tmc.gov.in', 'Cancer Specialty Hospital', 629, 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800');

-- SINGAPORE
INSERT INTO hospitals (name, address, latitude, longitude, city, country, rating, total_reviews, specialties, emergency_available, opening_hours, phone_number, website, hospital_type, bed_count, image_url)
VALUES
('Singapore General Hospital', 'Outram Road, Singapore', 1.2797, 103.8351, 'Singapore', 'Singapore', 4.9, 634, 'All Specialties,Transplant,Trauma,Emergency', true, '24/7', '+65-6222-3322', 'sgh.com.sg', 'National University Hospital', 1785, 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800'),
('Gleneagles Hospital', '6A Napier Road, Singapore', 1.3074, 103.8203, 'Singapore', 'Singapore', 4.8, 456, 'Cardiology,Oncology,Orthopedics,Gynecology', true, '24/7', '+65-6473-7222', 'gleneagles.com.sg', 'Private Hospital', 380, 'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=800');

-- BERLIN
INSERT INTO hospitals (name, address, latitude, longitude, city, country, rating, total_reviews, specialties, emergency_available, opening_hours, phone_number, website, hospital_type, bed_count, image_url)
VALUES
('Charite Hospital Berlin', 'Chariteplatz 1, Berlin', 52.5256, 13.3786, 'Berlin', 'Germany', 4.9, 521, 'All Specialties,Research,Neuroscience,Cardiology', true, '24/7', '+49-30-450-50', 'charite.de', 'University Hospital', 3200, 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800'),
('Helios Klinikum Berlin', 'Schwanebecker Chaussee 50, Berlin', 52.5441, 13.5108, 'Berlin', 'Germany', 4.6, 298, 'Cardiology,Oncology,Orthopedics,Neurology', true, '24/7', '+49-30-9401-0', 'helios-gesundheit.de', 'Private Hospital', 1000, 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800');

-- =============================================================================
-- DOCTORS
-- =============================================================================

-- New York - NYP Hospital (id=1)
INSERT INTO doctors (name, specialty, experience_years, qualification, bio, consultation_fee, available_days, available_hours, hospital_id)
VALUES
('Dr. Sarah Mitchell', 'Cardiologist', 18, 'MD, FACC - Harvard Medical School', 'Board-certified interventional cardiologist specializing in complex coronary interventions.', 350.0, 'Mon-Fri', '9AM-5PM', 1),
('Dr. James Chen', 'Neurologist', 15, 'MD, PhD - Johns Hopkins', 'Expert in stroke treatment and neurodegenerative diseases. Speaks English and Mandarin.', 320.0, 'Mon-Thu', '8AM-4PM', 1),
('Dr. Priya Sharma', 'Oncologist', 12, 'MD, FACP - Columbia University', 'Specializes in breast cancer and hematologic malignancies.', 380.0, 'Mon-Fri', '10AM-6PM', 1),
('Dr. Michael Torres', 'Emergency Medicine', 10, 'MD, FACEP - NYU School of Medicine', 'Trauma and emergency specialist. Fluent in English and Spanish.', 280.0, 'Rotating Shifts', '24/7', 1);

-- New York - Mount Sinai (id=2)
INSERT INTO doctors (name, specialty, experience_years, qualification, bio, consultation_fee, available_days, available_hours, hospital_id)
VALUES
('Dr. Anna Kowalski', 'Gastroenterologist', 14, 'MD - Mount Sinai School of Medicine', 'Specialist in inflammatory bowel disease and advanced endoscopy.', 340.0, 'Mon-Fri', '9AM-5PM', 2),
('Dr. Robert Kim', 'Orthopedic Surgeon', 20, 'MD, FAAOS - Cornell Weill Medical', 'Expert in joint replacement and sports medicine.', 420.0, 'Tue-Sat', '8AM-3PM', 2);

-- London - St Thomas (id=4)
INSERT INTO doctors (name, specialty, experience_years, qualification, bio, consultation_fee, available_days, available_hours, hospital_id)
VALUES
('Dr. Emma Thompson', 'Cardiologist', 22, 'MBBS, MRCP, PhD - Oxford', 'Leading expert in heart failure and cardiac imaging.', 280.0, 'Mon-Fri', '9AM-5PM', 4),
('Dr. Ahmed Hassan', 'Neurologist', 16, 'MBBS, MD - Kings College London', 'Specialist in epilepsy and multiple sclerosis. Arabic and English speaking.', 260.0, 'Mon-Thu', '8AM-4PM', 4),
('Dr. Sophie Laurent', 'Oncologist', 11, 'MBBS, MRCP - UCL Medical School', 'Oncologist specializing in lung and GI cancers.', 300.0, 'Mon-Fri', '10AM-6PM', 4);

-- Tokyo - St Lukes (id=8)
INSERT INTO doctors (name, specialty, experience_years, qualification, bio, consultation_fee, available_days, available_hours, hospital_id)
VALUES
('Dr. Yuki Tanaka', 'Internal Medicine', 20, 'MD - University of Tokyo', 'Specialist in internal medicine with international patient experience. English and Japanese.', 180.0, 'Mon-Fri', '9AM-5PM', 8),
('Dr. Kenji Watanabe', 'Cardiologist', 17, 'MD, PhD - Keio University', 'Expert in interventional cardiology. Speaks Japanese and English.', 220.0, 'Mon-Sat', '8AM-4PM', 8),
('Dr. Maria Santos', 'Emergency Medicine', 9, 'MD - Osaka University', 'International emergency specialist. Speaks Portuguese, English and Japanese.', 160.0, 'Rotating', '24/7', 8);

-- Dubai - American Hospital (id=11)
INSERT INTO doctors (name, specialty, experience_years, qualification, bio, consultation_fee, available_days, available_hours, hospital_id)
VALUES
('Dr. David Walsh', 'General Surgeon', 25, 'MD, FACS - Mayo Clinic', 'Board-certified general and bariatric surgeon.', 400.0, 'Mon-Fri', '9AM-5PM', 11),
('Dr. Fatima Al-Rashid', 'Cardiologist', 14, 'MBBS, MD - University of Jordan', 'Cardiologist specializing in women heart health. Speaks Arabic and English.', 350.0, 'Mon-Thu', '8AM-4PM', 11);

-- Mumbai - Kokilaben (id=13)
INSERT INTO doctors (name, specialty, experience_years, qualification, bio, consultation_fee, available_days, available_hours, hospital_id)
VALUES
('Dr. Rajiv Mehta', 'Cardiologist', 28, 'MBBS, MD, DM - AIIMS Delhi', 'Pioneer in minimally invasive cardiac surgery. English and Hindi.', 120.0, 'Mon-Sat', '10AM-6PM', 13),
('Dr. Deepa Joshi', 'Oncologist', 18, 'MBBS, MD - KEM Hospital Mumbai', 'Expert in breast and gynecologic oncology.', 100.0, 'Mon-Fri', '9AM-5PM', 13),
('Dr. Arjun Patel', 'Neurologist', 12, 'MBBS, DM - Grant Medical College', 'Stroke and epilepsy specialist. Hindi, English and Gujarati.', 90.0, 'Mon-Sat', '8AM-3PM', 13);

-- Singapore - SGH (id=15)
INSERT INTO doctors (name, specialty, experience_years, qualification, bio, consultation_fee, available_days, available_hours, hospital_id)
VALUES
('Dr. Lim Wei Jie', 'Cardiologist', 19, 'MBBS, MRCP - NUS Yong Soo Lin', 'Interventional cardiologist. English, Mandarin and Malay.', 240.0, 'Mon-Fri', '9AM-5PM', 15),
('Dr. Rajan Pillai', 'Neurologist', 15, 'MBBS, MD - University of Mumbai', 'Expert in movement disorders. English, Tamil and Hindi.', 220.0, 'Mon-Thu', '8AM-4PM', 15);

-- Berlin - Charite (id=17)
INSERT INTO doctors (name, specialty, experience_years, qualification, bio, consultation_fee, available_days, available_hours, hospital_id)
VALUES
('Prof. Klaus Mueller', 'Neurologist', 30, 'MD, PhD - Humboldt University', 'World-renowned neurologist. German and English.', 200.0, 'Mon-Wed', '9AM-12PM', 17),
('Dr. Lisa Hoffmann', 'Cardiologist', 14, 'MD - Heidelberg University', 'Specialist in heart failure and cardiac rehabilitation. German and English.', 180.0, 'Mon-Fri', '9AM-5PM', 17);

-- =============================================================================
-- DOCTOR - LANGUAGE LINKS
-- =============================================================================

-- Dr. Sarah Mitchell - English
INSERT INTO doctor_languages (doctor_id, language_id) VALUES (1, 1);
-- Dr. James Chen - English, Mandarin
INSERT INTO doctor_languages (doctor_id, language_id) VALUES (2, 1), (2, 6);
-- Dr. Priya Sharma - English, Hindi
INSERT INTO doctor_languages (doctor_id, language_id) VALUES (3, 1), (3, 2);
-- Dr. Michael Torres - English, Spanish
INSERT INTO doctor_languages (doctor_id, language_id) VALUES (4, 1), (4, 3);
-- Dr. Anna Kowalski - English
INSERT INTO doctor_languages (doctor_id, language_id) VALUES (5, 1);
-- Dr. Robert Kim - English, Korean
INSERT INTO doctor_languages (doctor_id, language_id) VALUES (6, 1), (6, 10);
-- Dr. Emma Thompson - English
INSERT INTO doctor_languages (doctor_id, language_id) VALUES (7, 1);
-- Dr. Ahmed Hassan - English, Arabic
INSERT INTO doctor_languages (doctor_id, language_id) VALUES (8, 1), (8, 8);
-- Dr. Sophie Laurent - English, French
INSERT INTO doctor_languages (doctor_id, language_id) VALUES (9, 1), (9, 4);
-- Dr. Yuki Tanaka - English, Japanese
INSERT INTO doctor_languages (doctor_id, language_id) VALUES (10, 1), (10, 7);
-- Dr. Kenji Watanabe - English, Japanese
INSERT INTO doctor_languages (doctor_id, language_id) VALUES (11, 1), (11, 7);
-- Dr. Maria Santos - English, Japanese, Portuguese
INSERT INTO doctor_languages (doctor_id, language_id) VALUES (12, 1), (12, 7), (12, 9);
-- Dr. David Walsh - English
INSERT INTO doctor_languages (doctor_id, language_id) VALUES (13, 1);
-- Dr. Fatima Al-Rashid - English, Arabic
INSERT INTO doctor_languages (doctor_id, language_id) VALUES (14, 1), (14, 8);
-- Dr. Rajiv Mehta - English, Hindi
INSERT INTO doctor_languages (doctor_id, language_id) VALUES (15, 1), (15, 2);
-- Dr. Deepa Joshi - English, Hindi
INSERT INTO doctor_languages (doctor_id, language_id) VALUES (16, 1), (16, 2);
-- Dr. Arjun Patel - English, Hindi
INSERT INTO doctor_languages (doctor_id, language_id) VALUES (17, 1), (17, 2);
-- Dr. Lim Wei Jie - English, Mandarin
INSERT INTO doctor_languages (doctor_id, language_id) VALUES (18, 1), (18, 6);
-- Dr. Rajan Pillai - English, Hindi
INSERT INTO doctor_languages (doctor_id, language_id) VALUES (19, 1), (19, 2);
-- Prof. Klaus Mueller - German, English
INSERT INTO doctor_languages (doctor_id, language_id) VALUES (20, 5), (20, 1);
-- Dr. Lisa Hoffmann - German, English
INSERT INTO doctor_languages (doctor_id, language_id) VALUES (21, 5), (21, 1);

-- =============================================================================
-- TREATMENT COSTS
-- =============================================================================

-- New York (hospitals 1,2,3)
INSERT INTO treatment_costs (hospital_id, procedure_name, estimated_cost, currency, category, notes)
VALUES
(1, 'General Consultation', 350.0, 'USD', 'PREMIUM', 'Specialist consultation fee'),
(1, 'Emergency Visit', 1200.0, 'USD', 'PREMIUM', 'Includes triage and initial treatment'),
(1, 'MRI Scan (Brain)', 2800.0, 'USD', 'PREMIUM', 'Without contrast'),
(1, 'Blood Test (Full Panel)', 280.0, 'USD', 'PREMIUM', 'CBC + Metabolic panel'),
(1, 'X-Ray', 350.0, 'USD', 'MODERATE', 'Per body part'),
(2, 'General Consultation', 300.0, 'USD', 'PREMIUM', 'Outpatient specialist'),
(2, 'Emergency Visit', 1100.0, 'USD', 'PREMIUM', 'ER visit fee'),
(2, 'MRI Scan (Brain)', 2600.0, 'USD', 'PREMIUM', 'Advanced imaging'),
(2, 'Blood Test (Full Panel)', 240.0, 'USD', 'MODERATE', 'Standard lab work'),
(3, 'General Consultation', 180.0, 'USD', 'BUDGET', 'Public hospital rates'),
(3, 'Emergency Visit', 850.0, 'USD', 'MODERATE', 'Public ER rates'),
(3, 'Blood Test (Full Panel)', 120.0, 'USD', 'BUDGET', 'Subsidized public lab');

-- London (hospitals 4,5,6)
INSERT INTO treatment_costs (hospital_id, procedure_name, estimated_cost, currency, category, notes)
VALUES
(4, 'General Consultation', 220.0, 'GBP', 'MODERATE', 'NHS referral basis'),
(4, 'Emergency Visit', 0.0, 'GBP', 'BUDGET', 'Free for residents; £300 for international'),
(4, 'MRI Scan (Brain)', 600.0, 'GBP', 'MODERATE', 'NHS rate'),
(4, 'Blood Test (Full Panel)', 80.0, 'GBP', 'BUDGET', 'NHS labs'),
(6, 'General Consultation', 350.0, 'GBP', 'PREMIUM', 'Private hospital rates'),
(6, 'Emergency Visit', 800.0, 'GBP', 'PREMIUM', 'Private ER'),
(6, 'MRI Scan (Brain)', 1200.0, 'GBP', 'PREMIUM', 'Same-day private scan'),
(6, 'Blood Test (Full Panel)', 180.0, 'GBP', 'MODERATE', 'Comprehensive private labs'),
(6, 'X-Ray', 120.0, 'GBP', 'MODERATE', 'Per body part');

-- Tokyo (hospitals 7,8,9)
INSERT INTO treatment_costs (hospital_id, procedure_name, estimated_cost, currency, category, notes)
VALUES
(7, 'General Consultation', 2500.0, 'JPY', 'MODERATE', 'Specialist consultation'),
(7, 'Emergency Visit', 15000.0, 'JPY', 'MODERATE', 'Uninsured emergency rate'),
(7, 'MRI Scan (Brain)', 50000.0, 'JPY', 'MODERATE', 'Advanced imaging'),
(7, 'Blood Test (Full Panel)', 8000.0, 'JPY', 'BUDGET', 'Standard panel'),
(8, 'General Consultation', 3500.0, 'JPY', 'PREMIUM', 'International clinic rate'),
(8, 'Emergency Visit', 20000.0, 'JPY', 'PREMIUM', 'International patient rate'),
(8, 'MRI Scan (Brain)', 60000.0, 'JPY', 'PREMIUM', 'English-friendly service'),
(8, 'Blood Test (Full Panel)', 12000.0, 'JPY', 'MODERATE', 'English report available'),
(8, 'X-Ray', 5000.0, 'JPY', 'MODERATE', 'Standard imaging');

-- Dubai (hospitals 10,11,12)
INSERT INTO treatment_costs (hospital_id, procedure_name, estimated_cost, currency, category, notes)
VALUES
(10, 'General Consultation', 800.0, 'AED', 'PREMIUM', 'Specialist consultation'),
(10, 'Emergency Visit', 3500.0, 'AED', 'PREMIUM', 'Cleveland Clinic standard'),
(10, 'MRI Scan (Brain)', 4500.0, 'AED', 'PREMIUM', 'Advanced 3T MRI'),
(10, 'Blood Test (Full Panel)', 600.0, 'AED', 'MODERATE', 'Comprehensive panel'),
(11, 'General Consultation', 600.0, 'AED', 'PREMIUM', 'American-standard care'),
(11, 'Emergency Visit', 2500.0, 'AED', 'MODERATE', 'Private ER rate'),
(11, 'MRI Scan (Brain)', 3500.0, 'AED', 'PREMIUM', 'Latest technology'),
(11, 'Blood Test (Full Panel)', 450.0, 'AED', 'MODERATE', 'Same-day results'),
(12, 'General Consultation', 400.0, 'AED', 'MODERATE', 'Outpatient specialist'),
(12, 'X-Ray', 200.0, 'AED', 'MODERATE', 'Digital X-ray');

-- Paris (hospitals 13,14)
INSERT INTO treatment_costs (hospital_id, procedure_name, estimated_cost, currency, category, notes)
VALUES
(13, 'General Consultation', 250.0, 'EUR', 'PREMIUM', 'Private American hospital'),
(13, 'Emergency Visit', 900.0, 'EUR', 'PREMIUM', 'Private ER rate'),
(13, 'MRI Scan (Brain)', 1400.0, 'EUR', 'PREMIUM', 'Private imaging center'),
(13, 'Blood Test (Full Panel)', 150.0, 'EUR', 'MODERATE', 'Private lab'),
(14, 'General Consultation', 60.0, 'EUR', 'BUDGET', 'Public hospital consultation'),
(14, 'Emergency Visit', 30.0, 'EUR', 'BUDGET', 'French public health rate'),
(14, 'MRI Scan (Brain)', 400.0, 'EUR', 'MODERATE', 'Public hospital imaging'),
(14, 'Blood Test (Full Panel)', 50.0, 'EUR', 'BUDGET', 'Public lab');

-- Mumbai (hospitals 15,16,17)
INSERT INTO treatment_costs (hospital_id, procedure_name, estimated_cost, currency, category, notes)
VALUES
(15, 'General Consultation', 1500.0, 'INR', 'PREMIUM', 'Senior specialist fee'),
(15, 'Emergency Visit', 8000.0, 'INR', 'PREMIUM', 'Private emergency rate'),
(15, 'MRI Scan (Brain)', 12000.0, 'INR', 'PREMIUM', '3T MRI scan'),
(15, 'Blood Test (Full Panel)', 2500.0, 'INR', 'MODERATE', 'Comprehensive blood panel'),
(16, 'General Consultation', 1200.0, 'INR', 'MODERATE', 'Specialist consultation'),
(16, 'Emergency Visit', 6000.0, 'INR', 'MODERATE', 'Emergency handling fee'),
(16, 'Blood Test (Full Panel)', 1800.0, 'INR', 'MODERATE', 'Standard labs'),
(17, 'General Consultation', 500.0, 'INR', 'BUDGET', 'Cancer consultation'),
(17, 'Blood Test (Full Panel)', 800.0, 'INR', 'BUDGET', 'Government hospital rate');

-- Singapore (hospitals 18,19)
INSERT INTO treatment_costs (hospital_id, procedure_name, estimated_cost, currency, category, notes)
VALUES
(18, 'General Consultation', 180.0, 'SGD', 'MODERATE', 'Public A-class ward rate'),
(18, 'Emergency Visit', 140.0, 'SGD', 'BUDGET', 'A&E without insurance'),
(18, 'MRI Scan (Brain)', 600.0, 'SGD', 'MODERATE', 'Government hospital rate'),
(18, 'Blood Test (Full Panel)', 80.0, 'SGD', 'BUDGET', 'Government lab rate'),
(19, 'General Consultation', 280.0, 'SGD', 'PREMIUM', 'Private specialist'),
(19, 'Emergency Visit', 350.0, 'SGD', 'PREMIUM', 'Private A&E'),
(19, 'MRI Scan (Brain)', 1200.0, 'SGD', 'PREMIUM', 'Private imaging'),
(19, 'Blood Test (Full Panel)', 180.0, 'SGD', 'MODERATE', 'Private lab'),
(19, 'X-Ray', 120.0, 'SGD', 'MODERATE', 'Digital X-ray');

-- Berlin (hospitals 20,21)
INSERT INTO treatment_costs (hospital_id, procedure_name, estimated_cost, currency, category, notes)
VALUES
(20, 'General Consultation', 100.0, 'EUR', 'MODERATE', 'University hospital rate'),
(20, 'Emergency Visit', 200.0, 'EUR', 'MODERATE', 'German public ER'),
(20, 'MRI Scan (Brain)', 700.0, 'EUR', 'MODERATE', 'University imaging'),
(20, 'Blood Test (Full Panel)', 80.0, 'EUR', 'BUDGET', 'Public lab'),
(21, 'General Consultation', 180.0, 'EUR', 'PREMIUM', 'Private hospital'),
(21, 'Emergency Visit', 450.0, 'EUR', 'PREMIUM', 'Private ER'),
(21, 'MRI Scan (Brain)', 900.0, 'EUR', 'PREMIUM', 'Private imaging center'),
(21, 'Blood Test (Full Panel)', 120.0, 'EUR', 'MODERATE', 'Private lab');

-- =============================================================================
-- HELPLINES
-- =============================================================================

INSERT INTO helplines (country, city, service_name, phone_number, service_type, description, country_code)
VALUES
-- USA
('USA', NULL,    'Emergency Services',      '911',          'AMBULANCE',         'Police, Fire, Ambulance', 'US'),
('USA', 'New York', 'NYC Health Helpline',  '311',          'MEDICAL_HELPLINE',  'NYC health and social services', 'US'),
('USA', NULL,    'Poison Control Center',   '1-800-222-1222','MEDICAL_HELPLINE', 'National Poison Control', 'US'),

-- UK
('UK', NULL,    'Emergency Services',       '999',          'AMBULANCE',         'Police, Fire, Ambulance NHS', 'GB'),
('UK', NULL,    'NHS Non-Emergency',        '111',          'MEDICAL_HELPLINE',  'Non-emergency medical advice', 'GB'),
('UK', 'London','London Tourist Board',     '+44-20-7234-5800','TOURIST_HELPLINE','Tourist assistance London', 'GB'),

-- Japan
('Japan', NULL, 'Emergency Ambulance',      '119',          'AMBULANCE',         'Fire and Ambulance', 'JP'),
('Japan', NULL, 'Police',                   '110',          'POLICE',            'National Police Agency', 'JP'),
('Japan', 'Tokyo','Japan Visitor Hotline',  '0570-783-114', 'TOURIST_HELPLINE',  '24/7 multilingual tourist helpline', 'JP'),
('Japan', 'Tokyo','JNTO Travel Helpline',   '050-3816-2787','TOURIST_HELPLINE',  'Japan National Tourism Organization', 'JP'),

-- UAE / Dubai
('UAE', NULL,   'Emergency Police',         '999',          'POLICE',            'UAE Police Emergency', 'AE'),
('UAE', NULL,   'Ambulance',                '998',          'AMBULANCE',         'UAE Ambulance Service', 'AE'),
('UAE', 'Dubai','Dubai Health Authority',   '800-342',      'MEDICAL_HELPLINE',  'Dubai health services hotline', 'AE'),
('UAE', NULL,   'Fire Department',          '997',          'FIRE',              'UAE Civil Defense', 'AE'),

-- France
('France', NULL,'SAMU (Medical Emergency)', '15',           'AMBULANCE',         'French Medical Emergency', 'FR'),
('France', NULL,'Police',                   '17',           'POLICE',            'Police Nationale', 'FR'),
('France', NULL,'Fire Brigade',             '18',           'FIRE',              'Pompiers', 'FR'),
('France', NULL,'European Emergency',       '112',          'AMBULANCE',         'EU-wide emergency number', 'FR'),
('France', 'Paris','Paris Tourist Office',  '+33-1-49-52-42-52','TOURIST_HELPLINE','Paris tourism office', 'FR'),

-- India
('India', NULL, 'National Emergency',       '112',          'AMBULANCE',         'All emergency services', 'IN'),
('India', NULL, 'Ambulance',                '108',          'AMBULANCE',         'National Ambulance Service', 'IN'),
('India', NULL, 'Police',                   '100',          'POLICE',            'National Police', 'IN'),
('India', 'Mumbai','Mumbai Police',         '100',          'POLICE',            'Mumbai City Police', 'IN'),
('India', NULL, 'Tourist Helpline',         '1363',         'TOURIST_HELPLINE',  'Incredible India Tourist Helpline', 'IN'),

-- Singapore
('Singapore', NULL,'Emergency',             '999',          'POLICE',            'Police and emergency', 'SG'),
('Singapore', NULL,'Ambulance/Fire',        '995',          'AMBULANCE',         'SCDF Ambulance and Fire', 'SG'),
('Singapore', NULL,'STB Tourist Line',      '1800-736-2000','TOURIST_HELPLINE',  'Singapore Tourism Board', 'SG'),
('Singapore', NULL,'Health Advice Line',    '6533-3000',    'MEDICAL_HELPLINE',  'MOH health information hotline', 'SG'),

-- Germany
('Germany', NULL,'Emergency',              '112',           'AMBULANCE',         'Fire and Ambulance', 'DE'),
('Germany', NULL,'Police',                 '110',           'POLICE',            'Bundespolizei', 'DE'),
('Germany', 'Berlin','Berlin Tourist Info','+49-30-250-025','TOURIST_HELPLINE',  'Visit Berlin information center', 'DE');

-- =============================================================================
-- SYMPTOMS
-- =============================================================================

INSERT INTO symptoms (name, keywords, urgency_level, recommended_specialty, description, first_aid_tip)
VALUES
('Chest Pain',         'chest pain, heart pain, pressure, tightness, angina, heart attack, cardiac',
 'EMERGENCY', 'Cardiology / Emergency Medicine',
 'Chest pain can indicate a heart attack, angina, or pulmonary embolism.',
 'Call emergency services immediately. Chew aspirin if not allergic. Stay calm and rest.'),

('Difficulty Breathing', 'breathing, shortness of breath, dyspnea, can''t breathe, suffocating, wheezing',
 'EMERGENCY', 'Pulmonology / Emergency Medicine',
 'Severe breathing difficulty may indicate asthma, pulmonary embolism, or pneumothorax.',
 'Sit upright. Use inhaler if prescribed. Call emergency services.'),

('Stroke Symptoms',    'stroke, face drooping, arm weakness, speech difficulty, sudden confusion, slurred speech',
 'EMERGENCY', 'Neurology / Emergency Medicine',
 'FAST: Face drooping, Arm weakness, Speech difficulty, Time to call emergency.',
 'Call emergency immediately. Note time of symptom onset. Do not give food or water.'),

('Severe Allergic Reaction', 'allergy, anaphylaxis, swelling, hives, throat closing, epinephrine, epipen',
 'EMERGENCY', 'Allergy & Immunology / Emergency Medicine',
 'Anaphylaxis is a life-threatening allergic reaction requiring immediate epinephrine.',
 'Use EpiPen if available. Call emergency immediately. Lie flat with legs elevated.'),

('High Fever',         'fever, high temperature, hyperthermia, 39 degrees, 40 degrees, hot',
 'URGENT', 'General Practice / Internal Medicine',
 'Fever above 39°C (102°F) may indicate serious infection requiring medical attention.',
 'Take paracetamol/ibuprofen. Stay hydrated. Seek medical care if above 39°C.'),

('Food Poisoning',     'food poisoning, vomiting, diarrhea, stomach pain, nausea, food borne',
 'URGENT', 'Gastroenterology / General Practice',
 'Food poisoning can cause dehydration. Severe cases need IV fluids.',
 'Stay hydrated with oral rehydration salts. Avoid solid food. See doctor if persists 48h.'),

('Fracture / Bone Injury', 'fracture, broken bone, fall, injury, bone pain, deformity, swelling',
 'URGENT', 'Orthopedics / Emergency Medicine',
 'Fractures need imaging and proper immobilization to heal correctly.',
 'Immobilize the limb. Apply ice. Do not straighten. Go to emergency room.'),

('Head Injury',        'head injury, concussion, hit head, skull, headache after fall',
 'URGENT', 'Neurology / Emergency Medicine',
 'Head injuries can cause concussion or internal bleeding.',
 'Keep patient still. Monitor consciousness. Seek emergency care immediately.'),

('Abdominal Pain',     'stomach ache, abdominal pain, belly pain, cramps, appendix',
 'URGENT', 'Gastroenterology / General Surgery',
 'Severe abdominal pain may indicate appendicitis, ulcers, or kidney stones.',
 'Avoid eating. Note location and severity. Seek urgent medical care.'),

('Diabetes Emergency', 'diabetes, low blood sugar, hypoglycemia, high blood sugar, hyperglycemia, insulin',
 'URGENT', 'Endocrinology / Emergency Medicine',
 'Diabetic emergencies include hypoglycemia (low sugar) and hyperglycemia (high sugar).',
 'For low sugar: Give glucose/sugar drink. For high sugar: Seek immediate medical care.'),

('Common Cold / Flu',  'cold, flu, runny nose, cough, sneezing, mild fever, sore throat',
 'NON_URGENT', 'General Practice',
 'Cold and flu are viral infections usually self-limiting in 7-10 days.',
 'Rest, fluids, and over-the-counter remedies. See doctor if symptoms worsen.'),

('Skin Rash',          'rash, skin irritation, itching, hives, dermatitis, eczema',
 'NON_URGENT', 'Dermatology',
 'Rashes may be allergic, infectious, or inflammatory in nature.',
 'Apply cool compress. Avoid scratching. Antihistamine for itching. See dermatologist.'),

('Back Pain',          'back pain, lower back, spine, lumbar pain, muscle pain, sciatica',
 'NON_URGENT', 'Orthopedics / Physiotherapy',
 'Most back pain resolves within weeks with rest and physiotherapy.',
 'Rest, ice/heat therapy, OTC pain relievers. Seek help if neurological symptoms appear.'),

('Toothache',          'toothache, tooth pain, dental pain, cavity, gum pain',
 'NON_URGENT', 'Dental / Oral Surgery',
 'Toothache may indicate cavity, abscess, or gum disease.',
 'OTC pain relievers and clove oil for temporary relief. See dentist as soon as possible.'),

('Eye Infection',      'eye infection, pink eye, conjunctivitis, eye pain, red eye, discharge',
 'NON_URGENT', 'Ophthalmology',
 'Eye infections can be bacterial, viral, or allergic.',
 'Avoid touching eyes. Clean with warm water. Do not share towels. See ophthalmologist.');

-- =============================================================================
-- MEDICAL PHRASES
-- =============================================================================

-- Spanish phrases
INSERT INTO medical_phrases (english_text, language_id, translated_text, category, phonetic)
VALUES
('I am allergic to penicillin.', 3, 'Soy alérgico a la penicilina.', 'Allergies', 'Soy ah-LEHR-hee-ko ah lah peh-nee-see-LEE-nah'),
('I have diabetes.', 3, 'Tengo diabetes.', 'Conditions', 'TEN-go dee-ah-BEH-tes'),
('I need an English-speaking doctor.', 3, 'Necesito un médico que hable inglés.', 'General', 'Neh-seh-SEE-to oon MEH-dee-ko keh AH-bleh een-GLAYS'),
('Call an ambulance please.', 3, 'Llame a una ambulancia, por favor.', 'Emergency', 'YAH-meh ah OO-nah am-boo-LAN-see-ah, por fah-VOR'),
('I have chest pain.', 3, 'Tengo dolor en el pecho.', 'Symptoms', 'TEN-go doh-LOR en el PEH-cho'),
('I am pregnant.', 3, 'Estoy embarazada.', 'Conditions', 'Es-TOY em-bah-rah-SAH-dah'),
('Where is the nearest hospital?', 3, '¿Dónde está el hospital más cercano?', 'General', 'DON-deh es-TAH el os-pee-TAL mas ser-KAH-no'),
('I have a high fever.', 3, 'Tengo fiebre alta.', 'Symptoms', 'TEN-go FYEH-breh AL-tah'),
('I take blood pressure medication.', 3, 'Tomo medicación para la presión arterial.', 'Medications', 'TOH-mo meh-dee-kah-SYON pah-rah lah preh-SYON ar-teh-RYAHL');

-- French phrases
INSERT INTO medical_phrases (english_text, language_id, translated_text, category, phonetic)
VALUES
('I am allergic to penicillin.', 4, 'Je suis allergique à la pénicilline.', 'Allergies', 'Zhuh swee ah-lehr-ZHEEK ah lah pay-nee-see-LEEN'),
('I have diabetes.', 4, 'J''ai du diabète.', 'Conditions', 'Zhay doo dyah-BET'),
('I need an English-speaking doctor.', 4, 'J''ai besoin d''un médecin anglophone.', 'General', 'Zhay buh-ZWEH dun may-duh-SEN ahn-gloh-FON'),
('Call an ambulance please.', 4, 'Appelez une ambulance s''il vous plaît.', 'Emergency', 'Ah-play un ahm-boo-LAHNS seel voo PLAY'),
('I have chest pain.', 4, 'J''ai une douleur dans la poitrine.', 'Symptoms', 'Zhay un doo-LUR dahn lah pwah-TREEN'),
('Where is the nearest hospital?', 4, 'Où est l''hôpital le plus proche?', 'General', 'Oo ay lo-pee-TAL luh ploo PROSH');

-- Japanese phrases
INSERT INTO medical_phrases (english_text, language_id, translated_text, category, phonetic)
VALUES
('I am allergic to penicillin.', 7, 'ペニシリンにアレルギーがあります。', 'Allergies', 'Pe-ni-shi-rin ni a-re-ru-gi ga a-ri-ma-su'),
('I need an English-speaking doctor.', 7, '英語を話す医師が必要です。', 'General', 'E-go o ha-na-su i-shi ga hi-tsu-yo-de-su'),
('Call an ambulance please.', 7, '救急車を呼んでください。', 'Emergency', 'Kyu-kyu-sha o yon-de ku-da-sai'),
('I have chest pain.', 7, '胸が痛いです。', 'Symptoms', 'Mune ga i-ta-i-de-su'),
('I have a high fever.', 7, '高熱があります。', 'Symptoms', 'Ko-ne-tsu ga a-ri-ma-su'),
('Where is the nearest hospital?', 7, '一番近い病院はどこですか？', 'General', 'I-chi-ban chi-ka-i byo-in wa do-ko-de-su-ka');

-- Arabic phrases
INSERT INTO medical_phrases (english_text, language_id, translated_text, category, phonetic)
VALUES
('I am allergic to penicillin.', 8, 'أنا حساس للبنسلين.', 'Allergies', 'Ana hassas lil-benselin'),
('I need an English-speaking doctor.', 8, 'أحتاج إلى طبيب يتحدث الإنجليزية.', 'General', 'Ahtaj ila tabib yatahadath al-enjiliziyya'),
('Call an ambulance please.', 8, 'اتصل بسيارة الإسعاف من فضلك.', 'Emergency', 'Ittasil bi-sayyarat al-is-aaf min fadlak'),
('I have chest pain.', 8, 'أشعر بألم في صدري.', 'Symptoms', 'Ash-ur bi-alam fi sadri'),
('Where is the nearest hospital?', 8, 'أين أقرب مستشفى؟', 'General', 'Ayna aqrab mustashfa');

-- Hindi phrases
INSERT INTO medical_phrases (english_text, language_id, translated_text, category, phonetic)
VALUES
('I am allergic to penicillin.', 2, 'मुझे पेनिसिलिन से एलर्जी है।', 'Allergies', 'Mujhe penicillin se allergy hai'),
('I need an English-speaking doctor.', 2, 'मुझे अंग्रेजी बोलने वाले डॉक्टर की जरूरत है।', 'General', 'Mujhe angrezi bolne wale doctor ki zarurat hai'),
('Call an ambulance please.', 2, 'कृपया एम्बुलेंस बुलाइए।', 'Emergency', 'Krpaya ambulance bulaiye'),
('I have chest pain.', 2, 'मेरे सीने में दर्द है।', 'Symptoms', 'Mere seene mein dard hai'),
('Where is the nearest hospital?', 2, 'निकटतम अस्पताल कहाँ है?', 'General', 'Nikatam aspatal kahan hai'),
('I have a high fever.', 2, 'मुझे तेज बुखार है।', 'Symptoms', 'Mujhe tej bukhar hai');

-- German phrases
INSERT INTO medical_phrases (english_text, language_id, translated_text, category, phonetic)
VALUES
('I am allergic to penicillin.', 5, 'Ich bin allergisch gegen Penicillin.', 'Allergies', 'Ikh bin ah-LEHR-gish GEH-gen peh-ni-TSEE-lin'),
('I need an English-speaking doctor.', 5, 'Ich brauche einen englischsprachigen Arzt.', 'General', 'Ikh BROW-khuh EYE-nen ENG-lish-shprah-khig-en ARTST'),
('Call an ambulance please.', 5, 'Rufen Sie bitte einen Krankenwagen.', 'Emergency', 'ROO-fen zee BIT-tuh EYE-nen KRAHN-ken-vah-gen'),
('I have chest pain.', 5, 'Ich habe Brustschmerzen.', 'Symptoms', 'Ikh HAH-buh BROOST-shmehr-tsen'),
('Where is the nearest hospital?', 5, 'Wo ist das nächste Krankenhaus?', 'General', 'Voh ist das NEKHS-tuh KRAHN-ken-hows');
