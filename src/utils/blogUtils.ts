export const getBlogImage = (
  image: string
) =>
  `https://ambchapcorps.org/storage/blogs/${image}`;

export const formatDate = (
  dateString: string
) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getReadTime = (
  content: string
) => {
  const words =
    content.split(/\s+/).length;

  return Math.max(
    1,
    Math.ceil(words / 200)
  );
};

export const getTimeAgo = (
  dateString: string
) => {
  const date =
    new Date(dateString);

  const now =
    new Date();

  const diff =
    now.getTime() -
    date.getTime();

  const hours =
    Math.floor(
      diff /
        (1000 *
          60 *
          60)
    );

  if (hours < 24)
    return `${hours}h ago`;

  const days =
    Math.floor(
      hours / 24
    );

  if (days < 30)
    return `${days}d ago`;

  const months =
    Math.floor(
      days / 30
    );

  return `${months}mo ago`;
};

export const truncateText = (
  text: string,
  maxLength = 150
) => {
  if (
    text.length <= maxLength
  )
    return text;

  return (
    text.slice(
      0,
      maxLength
    ) + "..."
  );
};