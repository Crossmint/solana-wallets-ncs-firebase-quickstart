"use client";

import {
  CrossmintProvider,
  CrossmintWalletProvider,
} from "@crossmint/client-sdk-react-ui";

const firebaseApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "";
const crossmintApiKey = process.env.NEXT_PUBLIC_CROSSMINT_API_KEY ?? "";

if (!firebaseApiKey || !crossmintApiKey) {
  throw new Error(
    "NEXT_PUBLIC_FIREBASE_API_KEY or NEXT_PUBLIC_CROSSMINT_API_KEY is not set"
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
   
      <CrossmintProvider apiKey={crossmintApiKey}>
        <CrossmintWalletProvider>{children}</CrossmintWalletProvider>
      </CrossmintProvider>
  );
}
