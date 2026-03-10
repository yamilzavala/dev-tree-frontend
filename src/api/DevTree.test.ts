import { describe, it, expect, beforeEach } from 'vitest';
import {
  getUser,
  updateProfile,
  updateImage,
  updateLinks,
  getUserByHandle,
  searchByHandle
} from './DevTree';
import server from '../mocks/server';
import {
  getUserErrorHandler,
  updateProfileErrorHandler,
  updateImageErrorHandler,
  updateLinksErrorHandler,
  getUserByHandleErrorHandler,
  searchByHandleErrorHandler
} from '../mocks/handlers';

describe('DevTree API', () => {
  beforeEach(() => {
    server.resetHandlers();
  });

  describe('getUser', () => {
    it('should fetch user data successfully', async () => {
      const result = await getUser();
      
      expect(result).toEqual({
        _id: '1',
        handle: 'johndoe',
        name: 'John Doe',
        email: 'john@example.com',
        description: 'Full stack developer passionate about React and Node.js',
        image: 'https://example.com/image.jpg',
        links: expect.any(String)
      });
    });

    it('should throw error when fetching user fails', async () => {
      server.use(...getUserErrorHandler);
      
      await expect(getUser()).rejects.toThrow('Failed to fetch user data');
    });
  });

  describe('updateProfile', () => {
    it('should update profile successfully', async () => {
      const profileData = {
        handle: 'newhandle',
        description: 'Updated description'
      };
      
      const result = await updateProfile(profileData);
      
      expect(result).toEqual({ msg: 'Profile updated successfully' });
    });

    it('should throw error when updating profile fails', async () => {
      server.use(...updateProfileErrorHandler);
      
      const profileData = {
        handle: 'newhandle',
        description: 'Updated description'
      };
      
      await expect(updateProfile(profileData)).rejects.toThrow('Failed to update profile');
    });
  });

  describe('updateImage', () => {
    it('should update image successfully', async () => {
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      
      // Mock the FormData creation to avoid timeout issues
      const originalFormData = global.FormData;
      global.FormData = vi.fn().mockImplementation(() => ({
        append: vi.fn(),
      })) as any;
      
      try {
        const result = await updateImage(file);
        
        expect(result).toEqual({
          msg: 'Image updated successfully',
          image: 'https://example.com/new-image.jpg'
        });
      } finally {
        // Restore original FormData
        global.FormData = originalFormData;
      }
    }, 10000);

    it('should throw error when updating image fails', async () => {
      server.use(...updateImageErrorHandler);
      
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      
      // Mock the FormData creation to avoid timeout issues
      const originalFormData = global.FormData;
      global.FormData = vi.fn().mockImplementation(() => ({
        append: vi.fn(),
      })) as any;
      
      try {
        await expect(updateImage(file)).rejects.toThrow('Failed to update image');
      } finally {
        // Restore original FormData
        global.FormData = originalFormData;
      }
    }, 10000);
  });

  describe('updateLinks', () => {
    it('should update links successfully', async () => {
      const links = JSON.stringify([
        {
          id: 1,
          name: 'Twitter',
          url: 'https://twitter.com/johndoe',
          enabled: true,
          icon: 'twitter'
        }
      ]);
      
      const result = await updateLinks(links);
      
      expect(result).toEqual({ msg: 'Links updated successfully' });
    });

    it('should throw error when updating links fails', async () => {
      server.use(...updateLinksErrorHandler);
      
      const links = JSON.stringify([]);
      
      await expect(updateLinks(links)).rejects.toThrow('Failed to update links');
    });
  });

  describe('getUserByHandle', () => {
    it('should get user by handle successfully', async () => {
      const result = await getUserByHandle('johndoe');
      
      expect(result).toEqual({
        user: {
          handle: 'johndoe',
          name: 'John Doe',
          description: 'Full stack developer passionate about React and Node.js',
          links: expect.any(String),
          image: 'https://example.com/image.jpg'
        }
      });
    });

    it('should throw error when user not found', async () => {
      server.use(...getUserByHandleErrorHandler);
      
      await expect(getUserByHandle('nonexistent')).rejects.toThrow('User not found');
    });
  });

  describe('searchByHandle', () => {
    it('should search by handle successfully', async () => {
      const result = await searchByHandle('johndoe');
      
      expect(result).toBe('johndoe');
    });

    it('should throw error when search fails', async () => {
      server.use(...searchByHandleErrorHandler);
      
      await expect(searchByHandle('nonexistent')).rejects.toThrow('Search failed');
    });
  });
});
