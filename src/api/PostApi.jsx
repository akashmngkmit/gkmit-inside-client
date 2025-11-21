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