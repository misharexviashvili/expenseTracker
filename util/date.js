export function getFormattedDate(date) {
  // getMonth() returns index of month, e.g. January is 0 moth, thus we have to add 1 on it
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
