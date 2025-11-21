/**
 * Gets posts by their status (e.g., "pending")
 * @param {string} status - The status to filter by ("pending", "approved", "rejected")
 * @param {object} axiosPrivate - The private, intercepted axios instance
 */
export const getPostsByStatus = (status, axiosPrivate) => {
  return axiosPrivate.get(`/admin/posts?status=${status}`);
};

/**
 * Updates a post's status (approve/reject)
 * @param {string} postId - The ID of the post to update
 * @param {string} status - The new status ("approved" or "rejected")
 * @param {object} axiosPrivate - The private, intercepted axios instance
 */
export const updatePostStatus = (postId, status, axiosPrivate) => {
  return axiosPrivate.patch(`/admin/posts/${postId}/status`, {
    status: status,
  });
};

export const getUsersByStatus = (status, axiosPrivate) => {
  return axiosPrivate.get(`/admin/users?status=${status}`);
};

/**
 * Updates a user's status (approve/reject)
 * @param {string} userId - The ID of the user to update
 * @param {string} status - The new status ("approved" or "rejected")
 * @param {object} axiosPrivate - The private, intercepted axios instance
 */
export const updateUserStatus = (userId, status, axiosPrivate) => {
  return axiosPrivate.patch(`/admin/users/${userId}/status`, {
    status: status,
  });
};