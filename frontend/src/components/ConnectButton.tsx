"use client";

import { useFreighter } from "@/hooks/useFreighter";

export function ConnectButton() {
  const { connected, address, loading, connect, disconnect } = useFreighter();

  if (loading) {
    return (
      <button disabled className="btn-primary text-sm !px-4 !py-2 opacity-50">
        Loading...
      </button>
    );
  }

  if (connected && address) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600 font-mono bg-gray-100 px-3 py-1 rounded">
          {address.slice(0, 4)}...{address.slice(-4)}
        </span>
        <button onClick={disconnect} className="btn-secondary text-sm !px-4 !py-2">
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button onClick={connect} className="btn-primary text-sm !px-4 !py-2">
      Connect Wallet
    </button>
  );
}
