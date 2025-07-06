'use client';

import { registerUser } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function Register() {
  const router = useRouter();
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const username = usernameRef.current?.value || '';
    const email = emailRef.current?.value || '';
    const password = passwordRef.current?.value || '';

    try {
      const res = await registerUser({ username, email, password });
      setSuccessMsg(res.message);
      router.push('/auth/login');
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center px-4 py-8 md:px-0 md:py-4">
      <div className="w-full md:w-1/3 text-center p-4 shadow-md shadow-amber-50 rounded-xl">
        <h1 className="font-bold text-xl">Register</h1>
        <form onSubmit={handleRegister} className="flex flex-col gap-2 text-start mt-4">
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
            <label htmlFor="email" className="w-1/4">Email:</label>
            <input
              ref={emailRef}
              type="email"
              id="email"
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
              {loading ? 'Loading...' : 'Register'}
            </button>
          </div>
        </form>
        {errorMsg && <p className="text-red-500 mt-4">{errorMsg}</p>}
        {successMsg && <p className="text-green-600 mt-4">{successMsg}</p>}
        <p className="text-sm mt-4">
          Already have an account?{' '}
          <a href="/auth/login" className="text-blue-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}
