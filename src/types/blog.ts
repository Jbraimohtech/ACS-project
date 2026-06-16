export interface Blog {
  id: number;
  user_id: number;
  zone_id: number | null;
  category_id: number;

  title: string;
  content: string;
  image: string;

  created_at: string;
  updated_at: string;

  category: {
    id: number;
    name: string;
  };

  zone: {
    id: number;
    name: string;
  } | null;

  user: {
    id: number;
    first_name: string;
    last_name: string;
    profile_image: string | null;
  };
}