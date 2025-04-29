"use client";

import { signInWithGoogle } from '@/lib/firebase';

export function LoginButton() {
  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <button
      className="w-full py-2 px-4 rounded-md text-sm font-medium border bg-gray-50 hover:bg-gray-100 transition-colors"
      onClick={handleLogin}
    >
      Log in with Google
    </button>
  );
}
