export const formatDate = (dateString: string): string => {
  const [day, month, year] = dateString.split("-");
  const date = new Date(`${year}-${month}-${day}`);

  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const formatDateShort = (dateString: string): string => {
  const [day, month, year] = dateString.split("-");
  const date = new Date(`${year}-${month}-${day}`);

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const formatMonthYear = (yearMonth: string): string => {
  const [year, month] = yearMonth.split("-");
  const date = new Date(`${year}-${month}-01`);

  return date.toLocaleDateString("en-GB", {
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

export const toIsoDate = (dateString: string): string => {
  const [day, month, year] = dateString.split("-");
  return `${year}-${month}-${day}`;
};

export const getDatePath = (date: string): string => {
  return isToday(date) ? "/" : `/${date}`;
};
