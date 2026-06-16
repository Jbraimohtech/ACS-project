// utils/eventUtils.ts

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
  `https://ambchapcorps.org/storage/events/${image}`;