import { RegisterResponse, registerResponseSchema } from "@/schemas/auth/register";
import { TokenResponse, tokenResponseSchema } from "@/schemas/auth/token";

export async function registerUser(input: {
  username: string;
  email: string;
  password: string;
}): Promise<RegisterResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || 'Failed to register');
  }

  return registerResponseSchema.parse(json);
}


export async function loginUser(input: {
  username: string;
  password: string;
}): Promise<TokenResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.detail || 'Login failed');
  }

  return tokenResponseSchema.parse(json);
}

export async function logoutUser() {
  const access = getCookie('access_token');
  const refresh = getCookie('refresh_token');

  if (!access || !refresh) return;

  await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/logout/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access}`,
    },
    body: JSON.stringify({ refresh }),
  });

  document.cookie = 'access_token=; path=/; max-age=0';
  document.cookie = 'refresh_token=; path=/; max-age=0';
}

function getCookie(name: string) {
  const match = document.cookie
    .split('; ')
    .find((c) => c.startsWith(`${name}=`));
  return match ? match.split('=')[1] : null;
}
