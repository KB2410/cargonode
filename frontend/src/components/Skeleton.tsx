"use client";

export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
  );
}

export function ShipmentCardSkeleton() {
  return (
    <div className="card">
      <div className="flex justify-between items-start mb-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
}

export function ShipmentDetailSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-8 w-64" />
      </div>
      <div className="card">
        <div className="flex justify-between">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="h-3 w-12" />
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card">
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-8 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PageLoader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-gray-500 text-sm">{text}</p>
    </div>
  );
}
