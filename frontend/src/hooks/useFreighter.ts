"use client";

import { useState, useEffect, useCallback } from "react";
import {
  isConnected,
  getAddress,
  requestAccess,
  signTransaction,
  getNetwork,
} from "@stellar/freighter-api";
import { config } from "@/lib/stellar";

export function useFreighter() {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      const { isConnected: isInstalled } = await isConnected();
      setInstalled(isInstalled);

      if (!isInstalled) {
        setLoading(false);
        return;
      }

      const { address: addr } = await getAddress();
      if (addr) {
        const { network: net } = await getNetwork();
        setConnected(true);
        setAddress(addr);
        setNetwork(net);
      }
    } catch (err) {
      console.error("Freighter check failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const connect = useCallback(async () => {
    const { isConnected: isInstalled } = await isConnected();
    if (!isInstalled) {
      throw new Error("Freighter extension not installed. Install from freighter.app.");
    }

    const { address: addr, error: accessError } = await requestAccess();
    if (accessError) throw new Error(accessError.message);

    const { network: net } = await getNetwork();
    setConnected(true);
    setAddress(addr);
    setNetwork(net);
    return addr;
  }, []);

  const disconnect = useCallback(() => {
    setConnected(false);
    setAddress(null);
    setNetwork(null);
  }, []);

  const sign = useCallback(
    async (xdr: string) => {
      if (!connected || !address) {
        throw new Error("Wallet not connected. Click Connect Wallet first.");
      }
      const { signedTxXdr, error } = await signTransaction(xdr, {
        networkPassphrase: config.networkPassphrase,
      });
      if (error) throw new Error(error.message);
      return signedTxXdr;
    },
    [connected, address]
  );

  return { connected, address, network, loading, installed, connect, disconnect, sign };
}
