import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CreatePost } from '@/components/CreatePost';
import { BrowserRouter } from 'react-router-dom';
import * as AuthContext from '@/store/AuthContext';

vi.mock('@/store/AuthContext');
vi.mock('@/config/useAxiosPrivate', () => ({
    useAxiosPrivate: () => ({
        post: vi.fn(),
    }),
}));

describe('CreatePost component', () => {

    it('renders create post form', () => {
        vi.spyOn(AuthContext, 'useAuth').mockReturnValue({
            user: { name: 'Test User' },
        });

        render(
            <BrowserRouter>
                <CreatePost />
            </BrowserRouter>
        );

        expect(screen.getByPlaceholderText(/What's on your mind/)).toBeInTheDocument();
    });

    it('has title input', () => {
        vi.spyOn(AuthContext, 'useAuth').mockReturnValue({
            user: { name: 'Test User' },
        });

        render(
            <BrowserRouter>
                <CreatePost />
            </BrowserRouter>
        );

        // check if input with id title exists
        const titleInput = document.getElementById('title');
        expect(titleInput).toBeTruthy();
    });

    it('has subtitle input', () => {
        vi.spyOn(AuthContext, 'useAuth').mockReturnValue({
            user: { name: 'Test User' },
        });

        render(
            <BrowserRouter>
                <CreatePost />
            </BrowserRouter>
        );

        const subtitleInput = screen.getByLabelText('Subtitle (Optional)');
        expect(subtitleInput).toBeInTheDocument();
    });

    it('has post button', () => {
        vi.spyOn(AuthContext, 'useAuth').mockReturnValue({
            user: { name: 'Test User' },
        });

        render(
            <BrowserRouter>
                <CreatePost />
            </BrowserRouter>
        );

        const postButton = screen.getByRole('button', { name: /Post/i });
        expect(postButton).toBeInTheDocument();
    });
});
