export const mockFeed = [
  {
    id: 'post1',
    title: 'New Project Kick-off: Internal Tools',
    subtitle: 'Improving our developer workflow',
    description: 'Today we started the new internal tools project, aiming to streamline our deployment pipeline. Excited to share more soon!',
    mediaUrl: 'https://placehold.co/600x400/000000/FFF?text=Project+Kick-off',
    tags: ['react', 'devops', 'internal-tools'],
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    author: {
      name: 'Akash M Nandan',
      department: 'Developer',
      fallback: 'AM',
      avatarUrl: ''
    },
    stats: {
      likes: 12,
      comments: 3,
    }
  },
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