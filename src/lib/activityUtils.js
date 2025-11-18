/**
 * @param {object} activity - The activity log object from the API response.
 * @param {string} currentUserName - The name of the user currently logged in.
 * @returns {string} - "You" if the actor matches the current user, or the actor's name otherwise.
 */
export const formatActorName = (activity, currentUserName) => {
    if (activity.actorName === currentUserName) {
        return "You";
    }
    return activity.actorName;
};

/**
 * Generates a human-readable activity message based on API data.
 * @param {object} activity - The activity object from the API response.
 * @param {string} currentUserName - The name of the user currently logged in.
 * @returns {string} The formatted message string.
 */
export const formatActivityMessage = (activity, currentUserName) => {
    const actor = formatActorName(activity, currentUserName);
    const postTitle = `"${activity.postTitle}"`;

    switch (activity.type) {
        case 'POSTED':
            return `${actor} posted about ${postTitle}`;

        case 'REACTED':
            if (activity.isMyPost) {
                return `${actor} reacted to your post ${postTitle}`;
            }
            return `${actor} reacted to a post about ${postTitle}`; 

        case 'COMMENTED':
            if (activity.isMyPost) {
                return `${actor} commented on your post ${postTitle}`;
            }
            return `${actor} commented on a post about ${postTitle}`; 

        default:
            return `${actor} performed an action.`;
    }
};


/**
 * Extracts fallback initials from an actor's name.
 * @param {string} name - The actor's name.
 * @returns {string} Two-letter initials.
 */
export const getInitials = (name) => {
    if (!name || name === "You") return 'U'; 
    const parts = name.split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};