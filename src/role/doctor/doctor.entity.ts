export interface Doctor {
  id?: string;
  first_name: string;
  last_name: string;
  specialty: string;
  phone?: string;
  email?: string;
  google_id?: string | null;
  license_number: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}