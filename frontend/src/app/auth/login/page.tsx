import React from 'react'

export default function Login() {
  return (
    <div className="flex h-screen items-center justify-center px-4 py-8 md:px-0 md:py-4">
      <div className="w-full md:w-1/3 text-center p-4 shadow-md shadow-amber-50 rounded-xl">
        <h1 className="font-bold text-xl">Login</h1>
        <form className="flex flex-col gap-2 text-start mt-4">
          <div className="flex gap-x-4 justify-between">
            <label htmlFor="username" className="w-1/4">Username:</label>
            <input
              type="text"
              id="username"
              className="input w-3/4"
            />
          </div>
          <div className="flex gap-x-4 justify-between">
            <label htmlFor="password" className="w-1/4">Password:</label>
            <input
              type="password"
              id="password"
              className="input w-3/4"
            />
          </div>
          <div className="flex justify-center">
            <button className="btn btn-warning">Login</button>
          </div>
        </form>
        <p className="text-sm mt-4">
          Don&apos;t have an account? <a href="/auth/register" className="text-blue-500 hover:underline">Register</a>
        </p>
      </div>
    </div>
  )
}
