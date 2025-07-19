/*
  # Insert Sample Data for Blood Donation System

  1. Sample Data
    - Create sample users for different roles
    - Add sample donors with various blood types
    - Create sample blood banks and hospitals
    - Add sample blood inventory
    - Create sample blood requests
    - Add sample donations

  2. Purpose
    - Demonstrate system functionality
    - Provide test data for development
    - Show real-world usage scenarios
*/

-- Insert sample users (Note: In production, these would be created through auth)
INSERT INTO users (id, email, role) VALUES 
  ('11111111-1111-1111-1111-111111111111', 'admin@bloodconnect.com', 'admin'),
  ('22222222-2222-2222-2222-222222222222', 'donor1@example.com', 'donor'),
  ('33333333-3333-3333-3333-333333333333', 'donor2@example.com', 'donor'),
  ('44444444-4444-4444-4444-444444444444', 'bloodbank1@example.com', 'blood_bank'),
  ('55555555-5555-5555-5555-555555555555', 'hospital1@example.com', 'hospital')
ON CONFLICT (id) DO NOTHING;

-- Insert sample donors
INSERT INTO donors (id, user_id, name, email, phone, blood_type, date_of_birth, gender, address, city, state, zip_code, last_donation_date, is_eligible) VALUES
  ('d1111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'John Smith', 'donor1@example.com', '555-0101', 'O+', '1985-03-15', 'male', '123 Main St', 'New York', 'NY', '10001', '2024-01-15', true),
  ('d2222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', 'Sarah Johnson', 'donor2@example.com', '555-0102', 'A+', '1990-07-22', 'female', '456 Oak Ave', 'Los Angeles', 'CA', '90001', '2024-02-10', true),
  ('d3333333-3333-3333-3333-333333333333', null, 'Michael Brown', 'michael.brown@example.com', '555-0103', 'B+', '1988-11-08', 'male', '789 Pine Rd', 'Chicago', 'IL', '60001', '2024-01-28', true),
  ('d4444444-4444-4444-4444-444444444444', null, 'Emily Davis', 'emily.davis@example.com', '555-0104', 'AB-', '1992-05-12', 'female', '321 Elm St', 'Houston', 'TX', '77001', null, true),
  ('d5555555-5555-5555-5555-555555555555', null, 'David Wilson', 'david.wilson@example.com', '555-0105', 'O-', '1987-09-30', 'male', '654 Maple Dr', 'Phoenix', 'AZ', '85001', '2024-02-20', true),
  ('d6666666-6666-6666-6666-666666666666', null, 'Lisa Garcia', 'lisa.garcia@example.com', '555-0106', 'A-', '1991-12-03', 'female', '987 Cedar Ln', 'Philadelphia', 'PA', '19001', '2024-01-05', true),
  ('d7777777-7777-7777-7777-777777777777', null, 'Robert Martinez', 'robert.martinez@example.com', '555-0107', 'B-', '1986-04-18', 'male', '147 Birch Ave', 'San Antonio', 'TX', '78001', '2024-02-15', true),
  ('d8888888-8888-8888-8888-888888888888', null, 'Jennifer Taylor', 'jennifer.taylor@example.com', '555-0108', 'AB+', '1989-08-25', 'female', '258 Spruce St', 'San Diego', 'CA', '92001', null, true)
ON CONFLICT (id) DO NOTHING;

-- Insert sample blood banks
INSERT INTO blood_banks (id, user_id, name, email, phone, address, city, state, zip_code, license_number, operating_hours) VALUES
  ('b1111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444', 'Central Blood Bank', 'bloodbank1@example.com', '555-0201', '100 Health Plaza', 'New York', 'NY', '10001', 'BB-NY-001', '24/7'),
  ('b2222222-2222-2222-2222-222222222222', null, 'West Coast Blood Services', 'info@westcoastblood.com', '555-0202', '200 Medical Center Dr', 'Los Angeles', 'CA', '90001', 'BB-CA-002', '6:00 AM - 10:00 PM'),
  ('b3333333-3333-3333-3333-333333333333', null, 'Midwest Blood Center', 'contact@midwestblood.org', '555-0203', '300 Donation Way', 'Chicago', 'IL', '60001', 'BB-IL-003', '7:00 AM - 9:00 PM')
ON CONFLICT (id) DO NOTHING;

-- Insert sample hospitals
INSERT INTO hospitals (id, user_id, name, email, phone, address, city, state, zip_code, license_number, emergency_contact) VALUES
  ('a1111111-1111-1111-1111-111111111111', '55555555-5555-5555-5555-555555555555', 'General Hospital', 'hospital1@example.com', '555-0301', '400 Hospital St', 'New York', 'NY', '10001', 'H-NY-001', '555-0399'),
  ('a2222222-2222-2222-2222-222222222222', null, 'St. Mary Medical Center', 'admin@stmarymedical.com', '555-0302', '500 Care Blvd', 'Los Angeles', 'CA', '90001', 'H-CA-002', '555-0399'),
  ('a3333333-3333-3333-3333-333333333333', null, 'University Hospital', 'info@universityhospital.edu', '555-0303', '600 Campus Dr', 'Chicago', 'IL', '60001', 'H-IL-003', '555-0399')
ON CONFLICT (id) DO NOTHING;

-- Insert sample blood inventory
INSERT INTO blood_inventory (id, blood_bank_id, blood_type, units_available, expiration_date, collected_date, donor_id) VALUES
  ('i1111111-1111-1111-1111-111111111111', 'b1111111-1111-1111-1111-111111111111', 'O+', 15, '2024-04-15', '2024-02-15', 'd1111111-1111-1111-1111-111111111111'),
  ('i2222222-2222-2222-2222-222222222222', 'b1111111-1111-1111-1111-111111111111', 'A+', 8, '2024-04-20', '2024-02-20', 'd2222222-2222-2222-2222-222222222222'),
  ('i3333333-3333-3333-3333-333333333333', 'b1111111-1111-1111-1111-111111111111', 'B+', 12, '2024-04-10', '2024-02-10', 'd3333333-3333-3333-3333-333333333333'),
  ('i4444444-4444-4444-4444-444444444444', 'b1111111-1111-1111-1111-111111111111', 'AB-', 3, '2024-04-25', '2024-02-25', 'd4444444-4444-4444-4444-444444444444'),
  ('i5555555-5555-5555-5555-555555555555', 'b1111111-1111-1111-1111-111111111111', 'O-', 6, '2024-04-18', '2024-02-18', 'd5555555-5555-5555-5555-555555555555'),
  ('i6666666-6666-6666-6666-666666666666', 'b2222222-2222-2222-2222-222222222222', 'A-', 5, '2024-04-12', '2024-02-12', 'd6666666-6666-6666-6666-666666666666'),
  ('i7777777-7777-7777-7777-777777777777', 'b2222222-2222-2222-2222-222222222222', 'B-', 4, '2024-04-22', '2024-02-22', 'd7777777-7777-7777-7777-777777777777'),
  ('i8888888-8888-8888-8888-888888888888', 'b2222222-2222-2222-2222-222222222222', 'AB+', 7, '2024-04-16', '2024-02-16', 'd8888888-8888-8888-8888-888888888888')
ON CONFLICT (id) DO NOTHING;

-- Insert sample blood requests
INSERT INTO blood_requests (id, hospital_id, blood_type, units_needed, priority, patient_name, patient_age, reason, status, requested_date, required_by) VALUES
  ('r1111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', 'O+', 3, 'high', 'John Doe', 45, 'Emergency surgery', 'pending', '2024-03-01', '2024-03-02'),
  ('r2222222-2222-2222-2222-222222222222', 'a1111111-1111-1111-1111-111111111111', 'A+', 2, 'medium', 'Jane Smith', 32, 'Scheduled surgery', 'approved', '2024-03-01', '2024-03-05'),
  ('r3333333-3333-3333-3333-333333333333', 'a2222222-2222-2222-2222-222222222222', 'B+', 1, 'emergency', 'Bob Johnson', 28, 'Trauma patient', 'fulfilled', '2024-02-28', '2024-03-01'),
  ('r4444444-4444-4444-4444-444444444444', 'a2222222-2222-2222-2222-222222222222', 'AB-', 2, 'high', 'Alice Brown', 56, 'Cancer treatment', 'pending', '2024-03-01', '2024-03-03'),
  ('r5555555-5555-5555-5555-555555555555', 'a3333333-3333-3333-3333-333333333333', 'O-', 4, 'emergency', 'Charlie Davis', 67, 'Heart surgery', 'pending', '2024-03-01', '2024-03-02')
ON CONFLICT (id) DO NOTHING;

-- Insert sample donations
INSERT INTO donations (id, donor_id, blood_bank_id, blood_type, units_donated, donation_date, hemoglobin_level, blood_pressure, temperature, weight, status) VALUES
  ('f1111111-1111-1111-1111-111111111111', 'd1111111-1111-1111-1111-111111111111', 'b1111111-1111-1111-1111-111111111111', 'O+', 1, '2024-02-15', 14.2, '120/80', 98.6, 175.5, 'completed'),
  ('f2222222-2222-2222-2222-222222222222', 'd2222222-2222-2222-2222-222222222222', 'b1111111-1111-1111-1111-111111111111', 'A+', 1, '2024-02-20', 13.8, '115/75', 98.4, 145.2, 'completed'),
  ('f3333333-3333-3333-3333-333333333333', 'd3333333-3333-3333-3333-333333333333', 'b1111111-1111-1111-1111-111111111111', 'B+', 1, '2024-02-10', 15.1, '125/82', 98.8, 185.0, 'completed'),
  ('f4444444-4444-4444-4444-444444444444', 'd5555555-5555-5555-5555-555555555555', 'b1111111-1111-1111-1111-111111111111', 'O-', 1, '2024-02-18', 14.7, '118/76', 98.5, 165.8, 'completed'),
  ('f5555555-5555-5555-5555-555555555555', 'd6666666-6666-6666-6666-666666666666', 'b2222222-2222-2222-2222-222222222222', 'A-', 1, '2024-02-12', 13.5, '110/70', 98.2, 135.4, 'completed'),
  ('f6666666-6666-6666-6666-666666666666', 'd7777777-7777-7777-7777-777777777777', 'b2222222-2222-2222-2222-222222222222', 'B-', 1, '2024-02-22', 14.9, '122/79', 98.7, 172.3, 'completed'),
  ('f7777777-7777-7777-7777-777777777777', 'd8888888-8888-8888-8888-888888888888', 'b2222222-2222-2222-2222-222222222222', 'AB+', 1, '2024-02-16', 13.9, '116/74', 98.3, 152.1, 'completed'),
  ('f8888888-8888-8888-8888-888888888888', 'd1111111-1111-1111-1111-111111111111', 'b1111111-1111-1111-1111-111111111111', 'O+', 1, '2024-03-05', 14.0, '119/77', 98.6, 176.2, 'scheduled')
ON CONFLICT (id) DO NOTHING;