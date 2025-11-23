import { describe, it, expect, vi } from 'vitest';
import { toggleLike, toggleBookmark, getPostById, addComment } from '@/api/PostApi';

// mock axios
const mockAxiosPrivate = {
    post: vi.fn(),
    get: vi.fn(),
};

describe('Post API tests', () => {

    it('should toggle like on a post', async () => {
        mockAxiosPrivate.post.mockResolvedValueOnce({ data: { success: true } });

        const result = await toggleLike('post123', mockAxiosPrivate);

        expect(mockAxiosPrivate.post).toHaveBeenCalledWith('/posts/post123/react');
        expect(result.data.success).toBe(true);
    });

    it('toggleBookmark should call correct endpoint', async () => {
        mockAxiosPrivate.post.mockResolvedValueOnce({
            data: { message: 'Bookmarked!' }
        });

        await toggleBookmark('post456', mockAxiosPrivate);

        expect(mockAxiosPrivate.post).toHaveBeenCalledWith('/posts/post456/bookmark');
    });

    it('getPostById returns post data', async () => {
        const mockPost = { _id: 'post789', title: 'Test Post' };
        mockAxiosPrivate.get.mockResolvedValueOnce({ data: mockPost });

        const result = await getPostById('post789', mockAxiosPrivate);

        expect(result.data._id).toBe('post789');
    });

    it('addComment should post comment', async () => {
        mockAxiosPrivate.post.mockResolvedValueOnce({ data: { success: true } });

        await addComment('post123', 'Nice post!', mockAxiosPrivate);

        expect(mockAxiosPrivate.post).toHaveBeenCalledWith(
            '/posts/post123/comment',
            { content: 'Nice post!' }
        );
    });
});
