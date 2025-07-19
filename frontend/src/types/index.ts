export interface User {
  id: string;
  email: string;
  role: 'donor' | 'blood_bank' | 'hospital' | 'admin';
  created_at: string;
}

export interface Donor {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string;
  blood_type: BloodType;
  date_of_birth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  city: string;
  state: string;
  zip_code: string;
  last_donation_date?: string;
  medical_conditions?: string;
  is_eligible: boolean;
  created_at: string;
  updated_at: string;
}

export interface BloodBank {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  license_number: string;
  operating_hours: string;
  created_at: string;
  updated_at: string;
}

export interface Hospital {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  license_number: string;
  emergency_contact: string;
  created_at: string;
  updated_at: string;
}

export interface BloodInventory {
  id: string;
  blood_bank_id: string;
  blood_type: BloodType;
  units_available: number;
  expiration_date: string;
  collected_date: string;
  donor_id?: string;
  created_at: string;
  updated_at: string;
}

export interface BloodRequest {
  id: string;
  hospital_id: string;
  blood_type: BloodType;
  units_needed: number;
  priority: 'low' | 'medium' | 'high' | 'emergency';
  patient_name: string;
  patient_age: number;
  reason: string;
  status: 'pending' | 'approved' | 'fulfilled' | 'cancelled';
  requested_date: string;
  required_by: string;
  created_at: string;
  updated_at: string;
}

export interface Donation {
  id: string;
  donor_id: string;
  blood_bank_id: string;
  blood_type: BloodType;
  units_donated: number;
  donation_date: string;
  hemoglobin_level: number;
  blood_pressure: string;
  temperature: number;
  weight: number;
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export interface DashboardStats {
  total_donors: number;
  total_blood_banks: number;
  total_hospitals: number;
  total_donations: number;
  pending_requests: number;
  emergency_requests: number;
  blood_inventory: Record<BloodType, number>;
}