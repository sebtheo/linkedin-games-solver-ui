export const formatDate = (dateString: string): string => {
  // Convert from DD-MM-YYYY to a more readable format
  const [day, month, year] = dateString.split("-");
  const date = new Date(`${year}-${month}-${day}`);

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const isToday = (dateString: string): boolean => {
  const today = new Date();
  const [day, month, year] = dateString.split("-");
  const date = new Date(`${year}-${month}-${day}`);

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const getFormattedToday = (): string => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  return `${day}-${month}-${year}`;
};
