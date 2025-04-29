"use client";

import { signOutUser } from "@/lib/firebase";

export function LogoutButton() {
  const handleLogout = async () => {
    try {
      await signOutUser();
      window.location.reload();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <button
      type="button"
      className="w-full py-2 px-4 rounded-md text-sm font-medium border bg-gray-50 hover:bg-gray-100 transition-colors"
      onClick={handleLogout}
    >
      Log out
    </button>
  );
}
