/**
 * Converts a Date object into a human-readable "time ago" string.
 * e.g., "3h ago", "2d ago", "5m ago"
 * @param {Date} date The date object to format.
 * @returns {string} A string representing the time elapsed.
 */
export const timeAgo = (date) => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return 'Invalid date';
  }
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  if (seconds < 0) {
    return 'in the future';
  }
  if (seconds < 60) {
    return seconds + "s ago";
  }
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "y ago";
  
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "mo ago";
  
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d ago";
  
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h ago";
  
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m ago";
  
  return Math.floor(seconds) + "s ago";
};