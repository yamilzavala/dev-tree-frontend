import { http, HttpResponse } from 'msw';
import type { User, UserHandle, ProfileForm } from '../types';

// Mock data
export let mockUser: User = {
  _id: '1',
  handle: 'johndoe',
  name: 'John Doe',
  email: 'john@example.com',
  description: 'Full stack developer passionate about React and Node.js',
  image: 'https://example.com/image.jpg',
  links: JSON.stringify([
    {
      id: 1,
      name: 'GitHub',
      url: 'https://github.com/johndoe',
      enabled: true,
      icon: 'github'
    },
    {
      id: 2,
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/johndoe',
      enabled: true,
      icon: 'linkedin'
    }
  ])
};

export let mockUserHandle: UserHandle = {
  handle: mockUser.handle,
  name: mockUser.name,
  description: mockUser.description,
  links: mockUser.links,
  image: mockUser.image
};

// Request handlers
export const handlers = [
  // GET /api/user - Get current user
  http.get('http://localhost:4000/api/user', () => {
    return HttpResponse.json(mockUser);
  }),

  // PATCH /api/user - Update profile
  http.patch('http://localhost:4000/api/user', async ({ request }) => {
    const updatedData = await request.json() as ProfileForm;
    mockUser = { ...mockUser, ...updatedData };
    mockUserHandle = { ...mockUserHandle, ...updatedData };
    return HttpResponse.json({ msg: 'Profile updated successfully' });
  }),

  // POST /api/user/image - Update profile image
  http.post('http://localhost:4000/api/user/image', () => {
    // For FormData requests, we don't need to parse the body
    // Just return a successful response
    return HttpResponse.json({ 
      msg: 'Image updated successfully', 
      image: 'https://example.com/new-image.jpg' 
    });
  }),

  // PATCH /api/user/links - Update links
  http.patch('http://localhost:4000/api/user/links', async ({ request }) => {
    const { links } = await request.json() as { links: string };
    mockUser.links = links;
    mockUserHandle.links = links;
    return HttpResponse.json({ msg: 'Links updated successfully' });
  }),

  // GET /api/:handle - Get user by handle
  http.get('http://localhost:4000/api/:handle', ({ params }) => {
    const { handle } = params;
    if (handle === mockUser.handle) {
      return HttpResponse.json({ user: mockUserHandle });
    }
    return HttpResponse.json(
      { msg: 'User not found' },
      { status: 404 }
    );
  }),

  // POST /api/search - Search by handle
  http.post('http://localhost:4000/api/search', async ({ request }) => {
    const { handle } = await request.json() as { handle: string };
    if (handle === mockUser.handle) {
      return HttpResponse.json(handle);
    }
    return HttpResponse.json(
      { msg: 'User not found' },
      { status: 404 }
    );
  })
];

// Error handlers for testing error scenarios
export const getUserErrorHandler = [
  http.get('http://localhost:4000/api/user', () => {
    return HttpResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    );
  })
];

export const updateProfileErrorHandler = [
  http.patch('http://localhost:4000/api/user', () => {
    return HttpResponse.json(
      { msg: 'Failed to update profile' },
      { status: 400 }
    );
  })
];

export const updateImageErrorHandler = [
  http.post('http://localhost:4000/api/user/image', () => {
    return HttpResponse.json(
      { msg: 'Failed to update image' },
      { status: 400 }
    );
  })
];

export const updateLinksErrorHandler = [
  http.patch('http://localhost:4000/api/user/links', () => {
    return HttpResponse.json(
      { msg: 'Failed to update links' },
      { status: 400 }
    );
  })
];

export const getUserByHandleErrorHandler = [
  http.get('http://localhost:4000/api/:handle', () => {
    return HttpResponse.json(
      { msg: 'User not found' },
      { status: 404 }
    );
  })
];

export const searchByHandleErrorHandler = [
  http.post('http://localhost:4000/api/search', () => {
    return HttpResponse.json(
      { msg: 'Search failed' },
      { status: 400 }
    );
  })
];

// Reset function to restore mock data
export const resetMockData = () => {
  mockUser = {
    _id: '1',
    handle: 'johndoe',
    name: 'John Doe',
    email: 'john@example.com',
    description: 'Full stack developer passionate about React and Node.js',
    image: 'https://example.com/image.jpg',
    links: JSON.stringify([
      {
        id: 1,
        name: 'GitHub',
        url: 'https://github.com/johndoe',
        enabled: true,
        icon: 'github'
      },
      {
        id: 2,
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/johndoe',
        enabled: true,
        icon: 'linkedin'
      }
    ])
  };
  
  mockUserHandle = {
    handle: mockUser.handle,
    name: mockUser.name,
    description: mockUser.description,
    links: mockUser.links,
    image: mockUser.image
  };
};
