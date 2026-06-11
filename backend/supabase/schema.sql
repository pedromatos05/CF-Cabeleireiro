-- CF Cabeleireiro — Supabase Schema

CREATE TABLE clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  hair_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_visit TIMESTAMPTZ
);

CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  duration INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE staff (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  role TEXT DEFAULT 'staff',
  working_hours JSONB,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id) NOT NULL,
  service_id UUID REFERENCES services(id) NOT NULL,
  staff_id UUID REFERENCES staff(id) NOT NULL,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status TEXT DEFAULT 'pending'
    CHECK (status IN ('pending','confirmed','cancelled','completed')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Services: public read
CREATE POLICY "Services are publicly readable"
  ON services FOR SELECT USING (is_active = TRUE);

-- Staff: public read
CREATE POLICY "Active staff are publicly readable"
  ON staff FOR SELECT USING (is_active = TRUE);

-- Clients: users can read/update their own record
CREATE POLICY "Clients can read their own record"
  ON clients FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Clients can update their own record"
  ON clients FOR UPDATE USING (auth.uid() = user_id);

-- Bookings: clients can read their own bookings
CREATE POLICY "Clients can read their own bookings"
  ON bookings FOR SELECT
  USING (client_id IN (SELECT id FROM clients WHERE user_id = auth.uid()));

CREATE POLICY "Clients can create bookings"
  ON bookings FOR INSERT
  WITH CHECK (client_id IN (SELECT id FROM clients WHERE user_id = auth.uid()));

-- Updated_at trigger
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
