export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return formattedDate;
};
