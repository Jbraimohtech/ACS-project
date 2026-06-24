export interface Member {
  id: number;
  first_name: string;
  last_name: string | null;
  profile_image: string | null;
  gender: string | null;
  email: string;
  phone: string;
  membership_id: string;
  status: string;
  payment_status: number;
  zone_id: number;
  created_at: string;
  updated_at: string;
  membership_start_date: string | null;
}