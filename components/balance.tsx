"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  useCrossmint,
  useWallet,
  type WalletBalance,
} from "@crossmint/client-sdk-react-ui";
import { fund1USDC } from "@/lib/fund1USDC";

export function WalletBalance() {
  const { crossmint } = useCrossmint();
  const { wallet, type } = useWallet();
  const [balances, setBalances] = useState<WalletBalance>([]);
  const [isFundingUSDC, setIsFundingUSDC] = useState(false);

  useEffect(() => {
    async function fetchBalances() {
      if (!wallet || type !== "solana-smart-wallet") return;
      try {
        const balances = await wallet.getBalances({
          tokens: ["sol", "usdc"],
        });
        setBalances(balances);
      } catch (error) {
        console.error("Error fetching wallet balances:", error);
        alert("Error fetching wallet balances: " + error);
      }
    }
    fetchBalances();
  }, [wallet, type]);

  const formatBalance = (balance: string, decimals: number) => {
    return (Number(balance) / Math.pow(10, decimals)).toFixed(2);
  };

  const solBalance =
    balances?.find((t) => t.token === "sol")?.balances.total || "0";
  const usdcBalance =
    balances?.find((t) => t.token === "usdc")?.balances.total || "0";

  const handleOnFundUSDC = async () => {
    setIsFundingUSDC(true);
    await fund1USDC({
      apiKey: crossmint.apiKey!,
      jwt: crossmint.jwt!,
      walletAddress: wallet?.address!,
    });
    setIsFundingUSDC(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image src="/sol.svg" alt="Solana" width={24} height={24} />
          <p className="font-medium">Solana</p>
        </div>
        <div className="text-gray-700 font-medium">
          {formatBalance(solBalance, 9)} SOL
        </div>
      </div>
      <div className="border-t my-1"></div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image src="/usdc.svg" alt="USDC" width={24} height={24} />
          <p className="font-medium">USDC</p>
        </div>
        <div className="text-gray-700 font-medium">
          $ {formatBalance(usdcBalance, 6)}
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <a
          href="https://faucet.solana.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 text-sm py-1.5 px-3 rounded-md bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
        >
          + Get free test SOL
        </a>
        <button
          onClick={handleOnFundUSDC}
          disabled={isFundingUSDC}
          className="flex items-center justify-center gap-1.5 text-sm py-1.5 px-3 rounded-md bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
        >
          {isFundingUSDC ? "Funding..." : "+ Get 1 free USDC"}
        </button>
      </div>
      <div className="text-gray-500 text-xs">
        Refresh the page after topping up. Balance may take a few seconds to
        update.
      </div>
    </div>
  );
}
