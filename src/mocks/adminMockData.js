export const mockPendingUsers = [
  {
    id: 'user123',
    name: 'New User One',
    email: 'new.user1@company.com',
    department: 'Developer',
    fallback: 'NU',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
  },
  {
    id: 'user124',
    name: 'Another Dev',
    email: 'dev2@company.com',
    department: 'Developer',
    fallback: 'AD',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
  },
  {
    id: 'user125',
    name: 'HR Recruit',
    email: 'recruit1@company.com',
    department: 'HR',
    fallback: 'HR',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
];