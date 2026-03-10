import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import server from './server';

describe('Basic MSW Test', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should work with basic fetch', async () => {
    const response = await fetch('/api/user');
    const data = await response.json();
    
    expect(data).toEqual({
      _id: '1',
      handle: 'johndoe',
      name: 'John Doe',
      email: 'john@example.com',
      description: 'Full stack developer passionate about React and Node.js',
      image: 'https://example.com/image.jpg',
      links: expect.any(String)
    });
  });
});
