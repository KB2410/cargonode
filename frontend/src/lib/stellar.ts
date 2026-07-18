import * as StellarSdk from "@stellar/stellar-sdk";

// --- Network Config ---

const NETWORK = process.env.NEXT_PUBLIC_STELLAR_NETWORK || "testnet";

export const config = {
  testnet: {
    rpcUrl: "https://soroban-testnet.stellar.org",
    horizonUrl: "https://horizon-testnet.stellar.org",
    networkPassphrase: StellarSdk.Networks.TESTNET,
  },
  mainnet: {
    rpcUrl:
      process.env.NEXT_PUBLIC_STELLAR_MAINNET_RPC_URL ||
      "https://soroban-mainnet.stellar.org",
    horizonUrl: "https://horizon.stellar.org",
    networkPassphrase: StellarSdk.Networks.PUBLIC,
  },
}[NETWORK]!;

// --- Clients ---

export const rpc = new StellarSdk.rpc.Server(config.rpcUrl);
export const horizon = new StellarSdk.Horizon.Server(config.horizonUrl);

// --- Contract ---

export const ESCROW_CONTRACT_ID =
  process.env.NEXT_PUBLIC_ESCROW_CONTRACT_ID || "";

// --- ScVal Builders ---

export function toAddress(address: string): StellarSdk.xdr.ScVal {
  return StellarSdk.Address.fromString(address).toScVal();
}

export function toI128(amount: bigint): StellarSdk.xdr.ScVal {
  return StellarSdk.nativeToScVal(amount, { type: "i128" });
}

export function toSymbol(symbol: string): StellarSdk.xdr.ScVal {
  return StellarSdk.nativeToScVal(symbol, { type: "symbol" });
}

export function fromScVal(scVal: StellarSdk.xdr.ScVal): any {
  return StellarSdk.scValToNative(scVal);
}
