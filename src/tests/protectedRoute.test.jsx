import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import { BrowserRouter } from 'react-router-dom';
import * as AuthContext from '@/store/AuthContext';

vi.mock('@/store/AuthContext');

describe('ProtectedRoute', () => {

    it('redirects to login if no user', () => {
        vi.spyOn(AuthContext, 'useAuth').mockReturnValue({
            user: null,
            isLoading: false,
        });

        const { container } = render(
            <BrowserRouter>
                <ProtectedRoute>
                    <div>Protected Content</div>
                </ProtectedRoute>
            </BrowserRouter>
        );

        // should not show protected content
        expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });

    it('shows content if user exists', () => {
        vi.spyOn(AuthContext, 'useAuth').mockReturnValue({
            user: { name: 'Test', role: 'employee' },
            isLoading: false,
        });

        render(
            <BrowserRouter>
                <ProtectedRoute allowedRoles={['employee']}>
                    <div>Protected Content</div>
                </ProtectedRoute>
            </BrowserRouter>
        );

        expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });
});
