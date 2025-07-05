import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function usePosts(page: number = 1) {
  const { data, error, isLoading, mutate } = useSWR(`http://localhost:8000/api/posts?page=${page}`, fetcher);
  console.log("usePosts data:", data.data);
  return {
    posts: data,
    isLoading,
    error,
    mutate,
  };
}
