'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/auth';

export default function Login() {
  const router = useRouter();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const username = usernameRef.current?.value || '';
    const password = passwordRef.current?.value || '';

    try {
      const { access, refresh } = await loginUser({ username, password });

      document.cookie = `access_token=${access}; path=/`;
      document.cookie = `refresh_token=${refresh}; path=/`;

      router.push('/');
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center px-4 py-8 md:px-0 md:py-4">
      <div className="w-full md:w-1/3 text-center p-4 shadow-md shadow-amber-50 rounded-xl">
        <h1 className="font-bold text-xl">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-2 text-start mt-4">
          <div className="flex gap-x-4 justify-between">
            <label htmlFor="username" className="w-1/4">Username:</label>
            <input
              ref={usernameRef}
              type="text"
              id="username"
              className="input w-3/4"
            />
          </div>
          <div className="flex gap-x-4 justify-between">
            <label htmlFor="password" className="w-1/4">Password:</label>
            <input
              ref={passwordRef}
              type="password"
              id="password"
              className="input w-3/4"
            />
          </div>
          <div className="flex justify-center mt-2">
            <button type="submit" className="btn btn-warning" disabled={loading}>
              {loading ? 'Loading...' : 'Login'}
            </button>
          </div>
        </form>
        {errorMsg && <p className="text-red-500 mt-4">{errorMsg}</p>}
        <p className="text-sm mt-4">
          Don&apos;t have an account?{' '}
          <a href="/auth/register" className="text-blue-500 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
}
