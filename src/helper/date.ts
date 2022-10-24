const getMonthDayFromTimeSpan = (span: number) => {
  if (span <= 0) return 0;
  const day = Math.floor(span / 1000 / 3600 / 24);
  const hour = Math.floor((span / 1000 / 3600) % 24);
  const second = Math.floor((span / 1000 / 60) % 60);
  return `${day}d ${hour}h ${second}m`;
};

const dateHelper = {
  getMonthDayFromTimeSpan,
};
export default dateHelper;
