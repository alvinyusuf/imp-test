'use client';

import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = 'access_token=; path=/; max-age=0';
    document.cookie = 'refresh_token=; path=/; max-age=0';

    router.push('/auth/login');
  };

  return (
    <button onClick={handleLogout} className="btn btn-neutral">
      Logout
    </button>
  );
}
