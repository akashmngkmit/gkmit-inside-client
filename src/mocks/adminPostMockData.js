export const mockPendingPosts = [
  {
    id: 'post4',
    title: 'First Draft: Q4 Marketing Strategy',
    subtitle: 'Looking for feedback on our new campaign',
    description: 'Team, here is the first draft of our Q4 marketing strategy. Please review and add your comments by EOD Friday.',
    mediaUrl: 'https://placehold.co/600x400/F59E0B/FFF?text=Draft+Strategy',
    tags: ['marketing', 'draft', 'q4', 'feedback'],
    createdAt: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
    author: {
      name: 'Marketing Intern',
      department: 'Marketing',
      fallback: 'MI',
      avatarUrl: ''
    },
    stats: {
      likes: 0,
      comments: 0,
    }
  },
  {
    id: 'post5',
    title: 'API Security Best Practices',
    subtitle: 'Quick presentation for the dev team',
    description: 'Quick reminder: I\'ll be giving a 30-minute presentation on new API security protocols this afternoon. This is mandatory for all backend devs.',
    mediaUrl: 'https://placehold.co/600x400/DC2626/FFF?text=API+Security',
    tags: ['api', 'security', 'devops'],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    author: {
      name: 'Senior Backend Dev',
      department: 'Developer',
      fallback: 'SB',
      avatarUrl: ''
    },
    stats: {
      likes: 2,
      comments: 0,
    }
  },
];