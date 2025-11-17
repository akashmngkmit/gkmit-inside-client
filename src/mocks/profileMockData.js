export const mockProfileUser = {
  name: 'Akash M Nandan',
  department: 'Developer',
  email: 'akash@gkm.com',
  fallback: 'AM',
  bio: 'Frontend developer passionate about React, Tailwind, and building clean, performant user interfaces. DFDs are my jam.',
  joined: new Date(2023, 5, 15), // Mock join date
};

export const mockProfilePosts = [
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
    id: 'post3',
    title: 'Vanta.js Integration Complete!',
    subtitle: 'Bringing our landing page to life',
    description: 'Just pushed the final commit for the animated landing page. The Vanta.js GLOBE effect is looking clean. Big thanks to the team for the feedback!',
    mediaUrl: 'https://placehold.co/600x400/1E40AF/FFF?text=Vanta.js',
    tags: ['react', 'vanta', 'ui/ux'],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    author: {
      name: 'Akash M Nandan',
      department: 'Developer',
      fallback: 'AM',
      avatarUrl: ''
    },
    stats: {
      likes: 58,
      comments: 7,
    }
  },
];