const formattedTime = (dateTime) => {
  const date = new Date(dateTime);
  const time = `${forceTwoDigits(date.getHours())}:${forceTwoDigits(
    date.getMinutes()
  )}`;
  return time;
};

const forceTwoDigits = (value) => {
  return ("0" + value).slice(-2);
};

export default formattedTime;
