export function getFormattedDate(date) {
  // getMonth() returns index of month, e.g. January is 0 moth, thus we have to add 1 on it
  return date.toISOString().slice(0, 10);
}
export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
