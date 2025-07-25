"use client";

import { useEffect, useState } from "react";
import {
  type DelegatedSigner,
  useAuth,
  useWallet,
} from "@crossmint/client-sdk-react-ui";
import { cn } from "@/lib/utils";

export function DelegatedSigner() {
  const { wallet } = useWallet();
  const { jwt } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [delegatedSigners, setDelegatedSigners] = useState<DelegatedSigner[]>(
    []
  );
  const [newSigner, setNewSigner] = useState<string>("");

  useEffect(() => {
    const fetchDelegatedSigners = async () => {
      if (wallet != null) {
        const signers = await wallet.delegatedSigners();
        setDelegatedSigners(signers);
      }
    };
    fetchDelegatedSigners();
  }, [wallet, jwt]);

  const addNewSigner = async () => {
    if (wallet == null) {
      throw new Error("No wallet connected");
    }
    if (!newSigner) {
      alert("Delegated Signer: no signer provided!");
      return;
    }
    try {
      setIsLoading(true);
      await wallet.addDelegatedSigner({ signer: newSigner });
      const signers = await wallet.delegatedSigners();
      setDelegatedSigners(signers);
    } catch (err) {
      console.error("Delegated Signer: ", err);
      alert(`Delegated Signer: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white flex flex-col gap-3 rounded-xl border shadow-sm p-5">
      <div>
        <h2 className="text-lg font-medium">Add Delegated Signer</h2>
        <p className="text-sm text-gray-500">
          Allow third parties to sign transactions on behalf of your wallet.{" "}
          <a
            href="https://docs.crossmint.com/wallets/advanced/delegated-keys"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline"
          >
            Learn more
          </a>
          .
        </p>
      </div>
      <input
        type="text"
        className="w-full px-3 py-2 border rounded-md text-sm"
        placeholder="Ex: 5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8"
        onChange={(e) => setNewSigner(e.target.value)}
      />
      <button
        className={cn(
          "w-full py-2 px-4 rounded-md text-sm font-medium transition-colors",
          isLoading
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-accent text-white hover:bg-accent/80"
        )}
        onClick={addNewSigner}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Add"}
      </button>
      {/* List of delegated signers */}
      {delegatedSigners.length > 0 && (
        <div className="bg-gray-50 py-2 px-3 rounded-md">
          <p className="text-xs text-gray-500 mb-1.5">Registered signers</p>
          {delegatedSigners.length > 0 && (
            <div className="overflow-x-auto bg-white p-1 rounded border border-gray-100">
              <ul className="flex flex-col gap-1">
                {delegatedSigners.map((signer, index) => (
                  <li
                    key={index}
                    className="whitespace-nowrap px-2 py-1 rounded text-xs text-gray-600"
                  >
                    {signer.signer}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
