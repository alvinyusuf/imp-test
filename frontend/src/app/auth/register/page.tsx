export default function Register() {
  return (
    <div className="flex h-screen items-center justify-center px-4 py-8 md:px-0 md:py-4">
      <div className="w-full md:w-1/3 text-center p-4 shadow-md shadow-amber-50 rounded-xl">
        <h1 className="font-bold text-xl">Register</h1>
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
            <label htmlFor="email" className="w-1/4">Email:</label>
            <input
              type="text"
              id="email"
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
            <button className="btn btn-warning">Register</button>
          </div>
        </form>
        <p className="text-sm mt-4">
          Already have an account? <a href="/auth/login" className="text-blue-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  )
}
