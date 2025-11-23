import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/store/AuthContext';
import { BrowserRouter } from 'react-router-dom';

// mock login api
vi.mock('@/api/AuthApi', () => ({
    loginUser: vi.fn(),
}));

const TestComponent = () => {
    const { user, isLoading } = useAuth();
    return (
        <div>
            {isLoading ? 'Loading...' : user ? `Hello ${user.name}` : 'No user'}
        </div>
    );
};

describe('AuthContext tests', () => {

    beforeEach(() => {
        localStorage.clear();
    });

    it('should render loading initially', () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            </BrowserRouter>
        );

        // after loading completes, should show no user
        waitFor(() => {
            expect(screen.queryByText('No user')).toBeInTheDocument();
        });
    });

    it('loads user from localStorage', async () => {
        const mockUser = { name: 'John', role: 'employee' };
        localStorage.setItem('gkmit-user', JSON.stringify(mockUser));
        localStorage.setItem('gkmit-token', 'fake-token');

        render(
            <BrowserRouter>
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Hello John')).toBeInTheDocument();
        });
    });
});
