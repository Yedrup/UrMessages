const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
};
const formatDate = date =>
  new Intl.DateTimeFormat('en-US', options).format(date);

export default formatDate;
