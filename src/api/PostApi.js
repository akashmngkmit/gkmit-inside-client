/**
 * Creates a new post.
 * @param {FormData} formData - The post data (title, desc, image, tags)
 * @param {object} axiosPrivate - The private, intercepted axios instance from our hook
 */
export const createPost = (formData, axiosPrivate) => {
  return axiosPrivate.post('/posts', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

/**
 * Gets the main feed of all approved posts.
 * @param {object} axiosPrivate - The private, intercepted axios instance
 */
export const getFeed = (axiosPrivate) => {
  return axiosPrivate.get('/posts');
};

export const toggleLike = (postId, axiosPrivate) => {
  return axiosPrivate.post(`/posts/${postId}/react`);
};


/**
 * Toggles a "bookmark" on a post.
 * @param {string} postId The ID of the post to bookmark/unbookmark
 * @param {object} axiosPrivate - The private, intercepted axios instance
 */
export const toggleBookmark = (postId, axiosPrivate) => {
  return axiosPrivate.post(`/posts/${postId}/bookmark`);
};

/**
 * Gets all posts bookmarked by the current user.
 * @param {object} axiosPrivate - The private, intercepted axios instance
 */
export const getBookmarkedPosts = (axiosPrivate) => {
  return axiosPrivate.get('/posts/bookmarks');
};

/**
 * Gets all posts for a specific user.
 * @param {string} userId The ID of the user
 * @param {object} axiosPrivate The private axios instance
 */
export const getPostsByUserId = (userId, axiosPrivate) => {
  return axiosPrivate.get(`/posts?userId=${userId}`);
};