import { describe, it, expect } from 'vitest';
import { timeAgo } from '@/lib/dateUtils';
import { afterEach } from 'vitest';

describe('timeAgo', () => {
  afterEach(() => {
    // Ensuring clean state after each test
  });

  it('should return "0s ago" for the current time', () => {
    expect(timeAgo(new Date())).toBe('0s ago');
  });

  it('should return seconds ago', () => {
    const thirtySecondsAgo = new Date(Date.now() - 30 * 1000);
    expect(timeAgo(thirtySecondsAgo)).toBe('30s ago');
  });

  it('should return minutes ago', () => {
    const twoMinutesAgo = new Date(Date.now() - 120 * 1000);
    expect(timeAgo(twoMinutesAgo)).toBe('2m ago');
  });

  it('should return hours ago', () => {
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    expect(timeAgo(twoHoursAgo)).toBe('2h ago');
  });

  it('should return days ago', () => {
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    expect(timeAgo(twoDaysAgo)).toBe('2d ago');
  });

  it('should return years ago', () => {
    const overAYearAgo = new Date(Date.now() - 366 * 24 * 60 * 60 * 1000);
    expect(timeAgo(overAYearAgo)).toBe('1y ago');
  });

  it('should handle invalid date objects', () => {
    expect(timeAgo(new Date('invalid'))).toBe('Invalid date');
  });
});