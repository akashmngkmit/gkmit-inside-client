/**
 * Gets posts by their status (e.g., "pending")
 * @param {string} status - The status to filter by ("pending", "approved", "rejected")
 * @param {object} axiosPrivate - The private, intercepted axios instance
 */
export const getPostsByStatus = (status, axiosPrivate) => {
  // Your doc says: GET /api/admin/posts?status=...
  return axiosPrivate.get(`/admin/posts?status=${status}`);
};

/**
 * Updates a post's status (approve/reject)
 * @param {string} postId - The ID of the post to update
 * @param {string} status - The new status ("approved" or "rejected")
 * @param {object} axiosPrivate - The private, intercepted axios instance
 */
export const updatePostStatus = (postId, status, axiosPrivate) => {
  // Your doc says: PATCH /api/admin/posts/:id/status
  return axiosPrivate.patch(`/admin/posts/${postId}/status`, {
    status: status,
  });
};