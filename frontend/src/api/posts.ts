import { PaginatedPostResponse, PaginationMeta, Post, PostSchema } from '@/types/post';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function fetchPosts(): Promise<Post[]> {
  try {
    const response = await fetch(`${BASE_URL}/posts`, { cache: 'no-store' });

    if (!response.ok) throw new Error('Failed to fetch posts');
    const json = await response.json();

    return json.data as Post[];
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  }
}

export async function fetchPaginatedPosts(page: number): Promise<PaginationMeta> {
  try {
    const response = await fetch(`${BASE_URL}/posts?page=${page}`, { cache: 'no-store' });

    if (!response.ok) throw new Error('Failed to fetch paginated posts');

    const json: PaginatedPostResponse = await response.json();

    return json.data;
  } catch (error) {
    console.error('Error fetching paginated posts:', error);
    throw new Error('Failed to fetch paginated posts');
  }
}

export async function createPost(post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<Post> {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  if (!response.ok) {
    throw new Error('Failed to create post');
  }
  const data = await response.json();
  return PostSchema.parse(data);
}

export async function fetchPost(id: number): Promise<Post> {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch post with id ${id}`);
  }
  const data = await response.json();
  return PostSchema.parse(data);
}
