export const EventStatus = {
  in_process: "Планирование",
  planned: "Запланировано",
  completed: "Завершено",
} as const;

export const ItemStatus = {
  used_in_event: "Используется на мероприятии",
  written_off: "Списано",
  in_warehouse: "На складе",
} as const;
