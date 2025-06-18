"use client";

import {
  CrossmintProvider,
  CrossmintWalletProvider,
} from "@crossmint/client-sdk-react-ui";

const crossmintApiKey = process.env.NEXT_PUBLIC_CROSSMINT_API_KEY ?? "";
if (!crossmintApiKey) {
  throw new Error("NEXT_PUBLIC_CROSSMINT_API_KEY is not set");
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CrossmintProvider apiKey={crossmintApiKey}>
      <CrossmintWalletProvider
        experimental_enableRecoveryKeys
        experimental_signersURL={
          process.env.NEXT_PUBLIC_SIGNERS_URL ?? "https://staging.signers.crossmint.com"
        }
      >
        {children}
      </CrossmintWalletProvider>
    </CrossmintProvider>
  );
}
