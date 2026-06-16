// services/eventService.ts

interface Event {
  id: number;
  title: string;
  description: string;
  venue: string;
  date: string;
  image: string;
  dress_code: string;
  wifi: string;
  is_featured: number;
}

const API_URL = "https://ambchapcorps.org/api/event";

export const fetchEvents = async (): Promise<Event[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  const result = await response.json();

  // Handle both wrapped { status, data: [...] } and direct array responses
  const eventsArray = result.data || result;
  return Array.isArray(eventsArray) ? eventsArray : [];
};