import dayjs from "dayjs";

export function formatDateToYYYYMMDD(dateStr?: string) {
  if (!dateStr) return "";
  return dayjs(dateStr).format("YYYY-MM-DD");
}
