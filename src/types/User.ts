export interface User {
  id: number;
  first_name: string;
  last_name: string;
  profile_image: string | null;
  gender: string | null;
  email: string;
  phone: string | null;
  membership_id: string | null;
  status: string;
  payment_status: number;
  created_at: string;

  zone: {
    id: number;
    name: string;
  } | null;
}