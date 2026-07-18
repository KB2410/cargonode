"use client";

import { Shipment } from "@/lib/api";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  created: "bg-blue-100 text-blue-800",
  accepted: "bg-indigo-100 text-indigo-800",
  in_transit: "bg-purple-100 text-purple-800",
  delivered: "bg-orange-100 text-orange-800",
  confirmed: "bg-cyan-100 text-cyan-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export function ShipmentCard({ shipment }: { shipment: Shipment }) {
  const statusColor = STATUS_COLORS[shipment.status] || "bg-gray-100 text-gray-800";

  return (
    <a
      href={`/shipments/${shipment.shipment_id}`}
      className="card hover:shadow-md transition-shadow cursor-pointer block"
    >
      <div className="flex justify-between items-start mb-3">
        <span className="font-mono text-sm text-gray-500">
          {shipment.shipment_id}
        </span>
        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusColor}`}>
          {shipment.status.replace("_", " ")}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">From:</span>
          <span className="font-medium text-secondary">{shipment.origin}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">To:</span>
          <span className="font-medium text-secondary">{shipment.destination}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Amount:</span>
          <span className="font-semibold text-primary">{shipment.amount} USDC</span>
        </div>
      </div>

      {shipment.tx_hash && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-400 font-mono">
            Tx: {shipment.tx_hash.slice(0, 12)}...
          </span>
        </div>
      )}
    </a>
  );
}
