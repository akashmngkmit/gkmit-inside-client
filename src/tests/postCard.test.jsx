import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PostCard } from '@/components/PostCard';
import { BrowserRouter } from 'react-router-dom';
import * as AuthContext from '@/store/AuthContext';

vi.mock('@/store/AuthContext');
vi.mock('@/config/useAxiosPrivate', () => ({
    useAxiosPrivate: () => ({
        post: vi.fn(),
    }),
}));

const mockPost = {
    _id: 'post123',
    author: { _id: 'user1', name: 'John Doe', department: 'IT' },
    title: 'Test Post',
    subtitle: 'Subtitle here',
    description: 'This is a test post',
    tags: ['test', 'demo'],
    createdAt: new Date().toISOString(),
    reactionCount: 5,
    commentCount: 2,
    isLiked: false,
    isBookmarked: false,
    postStatus: 'approved',
};

describe('PostCard component', () => {

    it('renders post title', () => {
        vi.spyOn(AuthContext, 'useAuth').mockReturnValue({
            user: { _id: 'user2', name: 'Jane' },
        });

        render(
            <BrowserRouter>
                <PostCard post={mockPost} />
            </BrowserRouter>
        );

        expect(screen.getByText('Test Post')).toBeInTheDocument();
    });

    it('shows author name', () => {
        vi.spyOn(AuthContext, 'useAuth').mockReturnValue({
            user: { _id: 'user2', name: 'Jane' },
        });

        render(
            <BrowserRouter>
                <PostCard post={mockPost} />
            </BrowserRouter>
        );

        expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('displays like count', () => {
        vi.spyOn(AuthContext, 'useAuth').mockReturnValue({
            user: { _id: 'user2', name: 'Jane' },
        });

        render(
            <BrowserRouter>
                <PostCard post={mockPost} />
            </BrowserRouter>
        );

        expect(screen.getByText('5 Likes')).toBeInTheDocument();
    });

    it('shows comment count', () => {
        vi.spyOn(AuthContext, 'useAuth').mockReturnValue({
            user: { _id: 'user2', name: 'Jane' },
        });

        render(
            <BrowserRouter>
                <PostCard post={mockPost} />
            </BrowserRouter>
        );

        expect(screen.getByText('2 Comments')).toBeInTheDocument();
    });

    it('renders tags', () => {
        vi.spyOn(AuthContext, 'useAuth').mockReturnValue({
            user: { _id: 'user2', name: 'Jane' },
        });

        render(
            <BrowserRouter>
                <PostCard post={mockPost} />
            </BrowserRouter>
        );

        expect(screen.getByText('test')).toBeInTheDocument();
        expect(screen.getByText('demo')).toBeInTheDocument();
    });
});
