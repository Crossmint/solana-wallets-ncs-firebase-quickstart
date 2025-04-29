"use client";

import { useEffect } from "react";
import {
  useCrossmint,
  useWallet as useCrossmintWallet,
} from "@crossmint/client-sdk-react-ui";
import { useFirebaseAuth } from "./useFirebaseAuth";

export const useFirebaseConnector = () => {
  const { setJwt } = useCrossmint();
  const {
    experimental_getOrCreateWalletWithRecoveryKey,
    status: crossmintWalletStatus,
    error: crossmintWalletError,
    wallet: crossmintWallet,
  } = useCrossmintWallet();

  const { user, loading: authLoading, isAuthenticated } = useFirebaseAuth();

  // TODO add code to set jwt

  useEffect(() => {
    const createCrossmintWallet = async () => {
      if (!user || !isAuthenticated) {
        return;
      }
      try {
        await experimental_getOrCreateWalletWithRecoveryKey({
          type: "solana-smart-wallet",
          email: user.email,
        });
      } catch (error) {
        console.error("Failed to create Crossmint wallet:", error);
      }
    };
    createCrossmintWallet();
  }, [user, isAuthenticated, experimental_getOrCreateWalletWithRecoveryKey]);

  return {
    user,
    crossmintWallet,
    crossmintWalletStatus,
    crossmintWalletError,
    isLoading: crossmintWalletStatus === "in-progress" || authLoading,
  };
};
