"use client";

import { useEffect, useState } from "react";
import { listShipments, Shipment } from "@/lib/api";
import { ShipmentCard } from "@/components/ShipmentCard";
import { ConnectButton } from "@/components/ConnectButton";
import { useFreighter } from "@/hooks/useFreighter";
import { ShipmentCardSkeleton } from "@/components/Skeleton";

export default function ShipmentsPage() {
  const { connected, address } = useFreighter();
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "shipper" | "driver">("all");

  useEffect(() => {
    if (connected && address) {
      loadShipments();
    }
  }, [address, filter, connected]);

  const loadShipments = async () => {
    if (!address) return;
    setLoading(true);
    setError(null);
    try {
      const data = await listShipments(
        address,
        filter !== "all" ? filter : undefined
      );
      setShipments(data.shipments);
    } catch (err: any) {
      console.error("Failed to load shipments:", err);
      setError(err.message || "Failed to load shipments");
    } finally {
      setLoading(false);
    }
  };

  if (!connected) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="text-6xl mb-4">🔗</div>
        <h2 className="text-2xl font-bold text-secondary mb-4">
          Connect Your Wallet
        </h2>
        <p className="text-gray-600 mb-6">
          Connect your Stellar wallet to view your shipments
        </p>
        <ConnectButton />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-secondary">Shipments</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Track and manage your freight shipments
          </p>
        </div>
        <ConnectButton />
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {(["all", "shipper", "driver"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              filter === f
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
          <p className="font-medium">Error loading shipments</p>
          <p className="mt-1">{error}</p>
          <button
            onClick={loadShipments}
            className="mt-2 text-sm font-medium underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <ShipmentCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && shipments.length === 0 && !error && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-secondary mb-2">
            No shipments yet
          </h3>
          <p className="text-gray-600 mb-6">
            Create your first shipment to get started
          </p>
          <a href="/shipments/new" className="btn-primary">
            Create Shipment
          </a>
        </div>
      )}

      {/* Shipment List */}
      {!loading && shipments.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shipments.map((shipment) => (
            <ShipmentCard key={shipment.id} shipment={shipment} />
          ))}
        </div>
      )}
    </div>
  );
}
