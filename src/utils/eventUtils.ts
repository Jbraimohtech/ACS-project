// utils/eventUtils.ts
import { STORAGE_BASE_URL } from "./api";

export const formatEventDate = (
  dateString: string
) => {
  const date = new Date(dateString);

  return {
    day: date.toLocaleDateString("en-US", {
      weekday: "short",
    }),
    date: date.getDate(),
    month: date
      .toLocaleDateString("en-US", {
        month: "short",
      })
      .toUpperCase(),
    year: date.getFullYear(),
  };
};

export const getEventImage = (
  image: string
) =>
  `${STORAGE_BASE_URL}/events/${image}`;