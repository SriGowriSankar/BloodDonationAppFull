/*
  # Blood Donation Management System Schema

  1. New Tables
    - `users` - User authentication and role management
    - `donors` - Donor information and eligibility
    - `blood_banks` - Blood bank facilities
    - `hospitals` - Hospital information
    - `blood_inventory` - Blood stock management
    - `blood_requests` - Hospital blood requests
    - `donations` - Donation records

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access control
    - Secure data based on user roles

  3. Features
    - Role-based access (donor, blood_bank, hospital, admin)
    - Blood type tracking and inventory management
    - Request and donation matching
    - Expiration date monitoring
*/

-- Create users table for role management
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  role text NOT NULL CHECK (role IN ('donor', 'blood_bank', 'hospital', 'admin')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create donors table
CREATE TABLE IF NOT EXISTS donors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  blood_type text NOT NULL CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  date_of_birth date NOT NULL,
  gender text NOT NULL CHECK (gender IN ('male', 'female', 'other')),
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip_code text NOT NULL,
  last_donation_date date,
  medical_conditions text,
  is_eligible boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blood_banks table
CREATE TABLE IF NOT EXISTS blood_banks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip_code text NOT NULL,
  license_number text UNIQUE NOT NULL,
  operating_hours text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create hospitals table
CREATE TABLE IF NOT EXISTS hospitals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip_code text NOT NULL,
  license_number text UNIQUE NOT NULL,
  emergency_contact text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blood_inventory table
CREATE TABLE IF NOT EXISTS blood_inventory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  blood_bank_id uuid REFERENCES blood_banks(id) ON DELETE CASCADE,
  blood_type text NOT NULL CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  units_available integer NOT NULL DEFAULT 0,
  expiration_date date NOT NULL,
  collected_date date NOT NULL,
  donor_id uuid REFERENCES donors(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blood_requests table
CREATE TABLE IF NOT EXISTS blood_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hospital_id uuid REFERENCES hospitals(id) ON DELETE CASCADE,
  blood_type text NOT NULL CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  units_needed integer NOT NULL,
  priority text NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'emergency')),
  patient_name text NOT NULL,
  patient_age integer NOT NULL,
  reason text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'fulfilled', 'cancelled')),
  requested_date date NOT NULL,
  required_by date NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create donations table
CREATE TABLE IF NOT EXISTS donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_id uuid REFERENCES donors(id) ON DELETE CASCADE,
  blood_bank_id uuid REFERENCES blood_banks(id) ON DELETE CASCADE,
  blood_type text NOT NULL CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  units_donated integer NOT NULL DEFAULT 1,
  donation_date date NOT NULL,
  hemoglobin_level numeric(3,1),
  blood_pressure text,
  temperature numeric(3,1),
  weight numeric(5,2),
  notes text,
  status text NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE donors ENABLE ROW LEVEL SECURITY;
ALTER TABLE blood_banks ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE blood_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE blood_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Create policies for donors table
CREATE POLICY "Donors can read own data"
  ON donors
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Blood banks can read all donors"
  ON donors
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('blood_bank', 'admin')
    )
  );

CREATE POLICY "Donors can update own data"
  ON donors
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Blood banks can insert donors"
  ON donors
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('blood_bank', 'admin')
    )
  );

-- Create policies for blood_banks table
CREATE POLICY "Blood banks can read own data"
  ON blood_banks
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Hospitals and admins can read all blood banks"
  ON blood_banks
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('hospital', 'admin')
    )
  );

-- Create policies for hospitals table
CREATE POLICY "Hospitals can read own data"
  ON hospitals
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Blood banks and admins can read all hospitals"
  ON hospitals
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('blood_bank', 'admin')
    )
  );

-- Create policies for blood_inventory table
CREATE POLICY "Blood banks can manage own inventory"
  ON blood_inventory
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM blood_banks
      WHERE blood_banks.id = blood_inventory.blood_bank_id
      AND blood_banks.user_id = auth.uid()
    )
  );

CREATE POLICY "Hospitals can read blood inventory"
  ON blood_inventory
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('hospital', 'admin')
    )
  );

-- Create policies for blood_requests table
CREATE POLICY "Hospitals can manage own requests"
  ON blood_requests
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM hospitals
      WHERE hospitals.id = blood_requests.hospital_id
      AND hospitals.user_id = auth.uid()
    )
  );

CREATE POLICY "Blood banks can read all requests"
  ON blood_requests
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('blood_bank', 'admin')
    )
  );

CREATE POLICY "Blood banks can update request status"
  ON blood_requests
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('blood_bank', 'admin')
    )
  );

-- Create policies for donations table
CREATE POLICY "Donors can read own donations"
  ON donations
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM donors
      WHERE donors.id = donations.donor_id
      AND donors.user_id = auth.uid()
    )
  );

CREATE POLICY "Blood banks can manage donations"
  ON donations
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM blood_banks
      WHERE blood_banks.id = donations.blood_bank_id
      AND blood_banks.user_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_donors_blood_type ON donors(blood_type);
CREATE INDEX IF NOT EXISTS idx_donors_is_eligible ON donors(is_eligible);
CREATE INDEX IF NOT EXISTS idx_blood_inventory_blood_type ON blood_inventory(blood_type);
CREATE INDEX IF NOT EXISTS idx_blood_inventory_expiration ON blood_inventory(expiration_date);
CREATE INDEX IF NOT EXISTS idx_blood_requests_status ON blood_requests(status);
CREATE INDEX IF NOT EXISTS idx_blood_requests_priority ON blood_requests(priority);
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status);
CREATE INDEX IF NOT EXISTS idx_donations_date ON donations(donation_date);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_donors_updated_at BEFORE UPDATE ON donors FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_blood_banks_updated_at BEFORE UPDATE ON blood_banks FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_hospitals_updated_at BEFORE UPDATE ON hospitals FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_blood_inventory_updated_at BEFORE UPDATE ON blood_inventory FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_blood_requests_updated_at BEFORE UPDATE ON blood_requests FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_donations_updated_at BEFORE UPDATE ON donations FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();