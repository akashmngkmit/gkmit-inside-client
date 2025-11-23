import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Navbar } from '@/components/Navbar';
import { BrowserRouter } from 'react-router-dom';

describe('Navbar component', () => {

    it('renders navbar with logo', () => {
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );

        const logo = screen.getByAltText('GKMIT Inside Logo');
        expect(logo).toBeInTheDocument();
    });

    it('has home link', () => {
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );

        const homeLink = screen.getByText('Home');
        expect(homeLink).toBeInTheDocument();
    });

    it('has login link', () => {
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );

        const loginLink = screen.getByText('Login');
        expect(loginLink).toBeInTheDocument();
    });
});
