const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// --- Types ---

export interface Shipment {
  id: string;
  shipment_id: string;
  shipper_id: string;
  driver_id: string | null;
  shipper_stellar_address: string;
  driver_stellar_address: string | null;
  origin: string;
  destination: string;
  cargo_description: string | null;
  cargo_weight_kg: number | null;
  amount: string;
  status: string;
  contract_address: string | null;
  tx_hash: string | null;
  proof_of_delivery_url: string | null;
  pickup_date: string | null;
  delivery_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateShipmentResponse {
  shipment_id: string;
  xdr: string;
  status: string;
}

// --- API Client ---

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(error.error || "API request failed");
  }

  return res.json();
}

export async function listShipments(
  address: string,
  role?: string
): Promise<{ shipments: Shipment[] }> {
  const params = new URLSearchParams();
  params.set("address", address);
  if (role) params.set("role", role);
  return request(`/shipments?${params.toString()}`);
}

export async function getShipment(
  shipmentId: string
): Promise<{ shipment: Shipment }> {
  return request(`/shipments/${shipmentId}`);
}

export async function createShipment(data: {
  shipper_address: string;
  driver_address: string;
  amount: string;
  origin: string;
  destination: string;
  cargo_description?: string;
  cargo_weight_kg?: number;
}): Promise<CreateShipmentResponse> {
  return request("/shipments", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function submitSignedTx(
  shipmentId: string,
  signedXdr: string,
  status?: "created" | "accepted" | "confirmed" | "cancelled"
): Promise<{ tx_hash: string; status: string }> {
  return request(`/shipments/${shipmentId}/submit`, {
    method: "POST",
    body: JSON.stringify({ signed_xdr: signedXdr, status }),
  });
}

export async function buildAcceptTx(
  shipmentId: string,
  driverAddress: string
): Promise<{ xdr: string }> {
  return request(`/shipments/${shipmentId}/accept`, {
    method: "POST",
    body: JSON.stringify({ driver_address: driverAddress }),
  });
}

export async function buildConfirmTx(
  shipmentId: string,
  shipperAddress: string
): Promise<{ xdr: string }> {
  return request(`/shipments/${shipmentId}/confirm`, {
    method: "POST",
    body: JSON.stringify({ shipper_address: shipperAddress }),
  });
}

export async function buildCancelTx(
  shipmentId: string,
  shipperAddress: string
): Promise<{ xdr: string }> {
  return request(`/shipments/${shipmentId}/cancel`, {
    method: "POST",
    body: JSON.stringify({ shipper_address: shipperAddress }),
  });
}
