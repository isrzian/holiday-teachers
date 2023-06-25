export const localizeDate = (date: string) => {
  return new Date(date).toLocaleString("ru-RU", {
    timeZone: "Europe/Moscow",
    hourCycle: "h23",
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
};
