import { describe, it, expect, vi } from 'vitest';
import { getPostsByStatus, updatePostStatus, updateUserStatus } from '@/api/AdminApi';

const mockAxios = {
    get: vi.fn(),
    patch: vi.fn(),
};

describe('Admin API', () => {

    it('should get pending posts', async () => {
        mockAxios.get.mockResolvedValueOnce({
            data: [{ _id: '1', status: 'pending' }]
        });

        const result = await getPostsByStatus('pending', mockAxios);

        expect(mockAxios.get).toHaveBeenCalledWith('/admin/posts?status=pending');
    });

    it('updatePostStatus should approve post', async () => {
        mockAxios.patch.mockResolvedValueOnce({ data: { success: true } });

        await updatePostStatus('post123', 'approved', mockAxios);

        expect(mockAxios.patch).toHaveBeenCalledWith(
            '/admin/posts/post123/status',
            { status: 'approved' }
        );
    });

    it('updatePostStatus can reject post', async () => {
        mockAxios.patch.mockResolvedValueOnce({ data: { success: true } });

        await updatePostStatus('post456', 'rejected', mockAxios);

        expect(mockAxios.patch).toHaveBeenCalledWith(
            '/admin/posts/post456/status',
            { status: 'rejected' }
        );
    });

    it('updateUserStatus should work', async () => {
        mockAxios.patch.mockResolvedValueOnce({ data: { success: true } });

        await updateUserStatus('user789', 'approved', mockAxios);

        expect(mockAxios.patch).toHaveBeenCalled();
    });
});
