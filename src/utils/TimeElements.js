const setTimeElements = (time) => {
  const seconds = (time % 60);
  const minutes = Math.floor(time / 60);
  const hours = Math.floor(time / 3600);
  const hoursFormat = (hours < 1 || hours > 23)
    ? '00'
    : (hours >= 1 && hours <= 9) ? `0${hours}` : `${hours}`;
  const minutesFormat = (minutes < 10)
    ? ((minutes === 0) ? '00' : `0${minutes}`)
    : `${minutes}`;
  const secondsFormant = (seconds < 10) ? `0${seconds}` : `${seconds}`;

  return `${hoursFormat}:${minutesFormat}:${secondsFormant}`;
};

export default setTimeElements;
