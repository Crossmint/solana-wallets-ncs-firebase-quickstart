"use client";

import { useEffect, useState } from "react";
import {
  useCrossmint,
  useWallet as useCrossmintWallet,
} from "@crossmint/client-sdk-react-ui";
import type { User } from "firebase/auth";
import { onAuthStateChange } from "@/lib/firebase";

export const useFirebaseConnector = () => {
  const {
    experimental_getOrCreateWalletWithRecoveryKey,
    status: crossmintWalletStatus,
    error: crossmintWalletError,
    wallet: crossmintWallet,
  } = useCrossmintWallet();

  const { crossmint } = useCrossmint();
  const { user, loading: authLoading, isAuthenticated } = useFirebaseAuth();

  console.log({ user, crossmintJwt: crossmint.jwt, isAuthenticated });
  useEffect(() => {
    const createCrossmintWallet = async () => {
      if (!user || !isAuthenticated) {
        return;
      }
      try {
        await experimental_getOrCreateWalletWithRecoveryKey?.({
          type: "solana-smart-wallet",
          email: user.email ?? "",
        });
      } catch (error) {
        console.error("Failed to create Crossmint wallet:", error);
      }
    };
    createCrossmintWallet();
  }, [user, isAuthenticated]);

  return {
    user,
    crossmintWallet,
    crossmintWalletStatus,
    crossmintWalletError,
    isLoading: crossmintWalletStatus === "in-progress" || authLoading,
  };
};

const useFirebaseAuth = () => {
  const { setJwt, crossmint } = useCrossmint();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (user) => {
      setUser(user);
      setLoading(false);

      if (user) {
        try {
          const token = await user.getIdToken();
          console.log({ token });
          setJwt(token);
        } catch (error) {
          console.error("Failed to get Firebase JWT:", error);
          setJwt(undefined);
        }
      } else {
        setJwt(undefined);
      }
    });

    return () => unsubscribe();
  }, [setJwt]);

  return {
    user,
    loading,
    isAuthenticated: crossmint.jwt != null && user != null,
  };
};
