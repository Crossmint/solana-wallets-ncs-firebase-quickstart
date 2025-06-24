"use client";

import { useState } from "react";
import { Transaction, useWallet } from "@crossmint/client-sdk-react-ui";
import { PublicKey } from "@solana/web3.js";

const isSolanaAddressValid = (address: string) => {
  try {
    new PublicKey(address);
    return true;
  } catch (error) {
    return false;
  }
};

export function TransferFunds() {
  const { wallet } = useWallet();
  const [token, setToken] = useState<"sol" | "usdc" | null>("sol");
  const [recipient, setRecipient] = useState<string | null>(null);
  const [amount, setAmount] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tx, setTx] = useState<Transaction | null>(null);

  async function handleOnTransfer() {
    if (
      wallet == null ||
      token == null ||
      recipient == null ||
      amount == null
    ) {
      alert("Transfer: missing required fields");
      return;
    }

    // Validate Solana recipient address
    if (token === "sol" && !isSolanaAddressValid(recipient)) {
      alert("Transfer: Invalid Solana recipient address");
      return;
    }

    try {
      setIsLoading(true);
      const tx = await wallet.send(recipient, token, amount);
      setTx(tx);
    } catch (err) {
      console.error("Transfer: ", err);
      alert("Transfer: " + err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-white flex flex-col gap-3 rounded-xl border shadow-sm p-5">
      <div>
        <h2 className="text-lg font-medium">Transfer funds</h2>
        <p className="text-sm text-gray-500">Send funds to another wallet</p>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <div className="flex gap-4">
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-sm font-medium">Token</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="token"
                  className="h-4 w-4"
                  checked={token === "usdc"}
                  onChange={() => setToken("usdc")}
                />
                <span>USDC</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="token"
                  className="h-4 w-4"
                  checked={token === "sol"}
                  onChange={() => setToken("sol")}
                />
                <span>SOL</span>
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-sm font-medium">Amount</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded-md text-sm"
              placeholder="0.00"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Recipient wallet</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md text-sm"
            placeholder="Enter wallet address"
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <button
          className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            isLoading
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-accent text-white hover:bg-accent/80"
          }`}
          onClick={handleOnTransfer}
          disabled={isLoading}
        >
          {isLoading ? "Transferring..." : "Transfer"}
        </button>
        {tx?.explorerLink != null && !isLoading && (
          <a
            href={tx.explorerLink}
            className="text-sm text-gray-500 text-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            → View on Solscan (refresh to update balance)
          </a>
        )}
      </div>
    </div>
  );
}
