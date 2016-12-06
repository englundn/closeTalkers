const timeSince = (date, showViewingTime) => {
  const seconds = Math.floor((date) / 1000);

  const dateObj = new Date(new Date().getTime() - date);
  const minutes = dateObj.getMinutes();
  const hours = dateObj.getHours();
  const ampm = hours < 11 ? 'am' : 'pm';
  const time = `${(hours % 12) + 1}:${minutes < 10 ? 0 : ''}${minutes}${ampm}`;

  const day = dateObj.getDate();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const month = months[dateObj.getMonth()];

  let interval = Math.floor(seconds / 86400);
  if (showViewingTime) {
    if (interval > 1) {
      return `${month} ${day} at ${time}`;
    }
    if (interval === 1) {
      return `Yesterday at ${time}`;
    }
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return `${interval} hours${showViewingTime ? ' ago' : ''}`;
  }
  if (interval === 1) {
    return `${interval} hour${showViewingTime ? ' ago' : ''}`;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${interval} minutes${showViewingTime ? ' ago' : ''}`;
  }
  if (interval === 1) {
    return `${interval} minute${showViewingTime ? ' ago' : ''}`;
  }
  if (seconds > 1) {
    return `${Math.floor(seconds)} seconds${showViewingTime ? ' ago' : ''}`;
  }
  return `${Math.floor(seconds)} second${showViewingTime ? ' ago' : ''}`;
};

export default timeSince;
