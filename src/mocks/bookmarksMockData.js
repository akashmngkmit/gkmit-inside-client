export const mockBookmarks = [
  {
    id: 'post2',
    title: 'ShadCN UI Refactor: PR Review Guidelines',
    subtitle: 'Let\'s talk about code consistency',
    description: 'Just published new guidelines for our upcoming ShadCN refactor. Please check your emails for the full doc. Consistency is key!',
    mediaUrl: 'https://placehold.co/600x400/4F46E5/FFF?text=ShadCN+UI',
    tags: ['react', 'shadcn', 'frontend', 'guidelines'],
    createdAt: new Date(Date.now() - 22 * 60 * 60 * 1000), // 22 hours ago
    author: {
      name: 'Chandrapal GKMIT',
      department: 'Admin',
      fallback: 'CG',
      avatarUrl: ''
    },
    stats: {
      likes: 45,
      comments: 11,
    }
  },
];