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
