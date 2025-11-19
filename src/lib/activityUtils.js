/**
 * Generates a human-readable activity message based on API data.
 * @param {object} activity The activity object from the API response.
 * @returns {string} The formatted message string.
 */
export const formatActivityMessage = (activity) => {
  const { type, actorName, postTitle, isMyPost } = activity;

  const title = `"${postTitle}"`;

  switch (type) {
    case 'POSTED':
      return `${actorName} posted about ${title}`;

    case 'REACTED':
      if (isMyPost) {
        return `${actorName} reacted to your post ${title}`;
      }
      return `${actorName} reacted to a post about ${title}`;

    case 'COMMENTED':
      if (isMyPost) {
        return `${actorName} commented on your post ${title}`;
      }
      return `${actorName} commented on a post about ${title}`;

    default:
      return `${actorName} performed an action.`;
  }
};

/**
 * Extracts fallback initials from an actor's name.
 * @param {string} name - The actor's name.
 * @returns {string} Two-letter initials.
 */
export const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};