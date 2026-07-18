import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <section className="text-center py-16 sm:py-20">
        <div className="inline-block bg-blue-50 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          Powered by Stellar &amp; Soroban
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-secondary mb-6">
          Instant Payments for
          <br />
          <span className="text-primary">Freight Logistics</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          CargoNode locks shipment payments into a secure Stellar escrow.
          Drivers get paid instantly upon delivery confirmation. No more
          30&ndash;90 day waits.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/shipments/new" className="btn-primary text-lg">
            Create Shipment
          </Link>
          <Link href="/shipments" className="btn-secondary text-lg">
            View Shipments
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            { value: "<5s", label: "Settlement Time" },
            { value: "$0.01", label: "Transaction Fees" },
            { value: "100%", label: "On-Chain Escrow" },
            { value: "24/7", label: "Global Access" },
          ].map((stat) => (
            <div key={stat.label} className="card !py-4">
              <div className="text-2xl sm:text-3xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-secondary mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {[
            {
              step: "1",
              title: "Create Shipment",
              desc: "Shipper locks USDC payment into Soroban escrow contract",
            },
            {
              step: "2",
              title: "Driver Accepts",
              desc: "Driver accepts the shipment and picks up cargo",
            },
            {
              step: "3",
              title: "In Transit",
              desc: "Cargo moves from origin to destination",
            },
            {
              step: "4",
              title: "Confirm Delivery",
              desc: "Shipper verifies proof of delivery and confirms",
            },
            {
              step: "5",
              title: "Payment Released",
              desc: "Smart contract instantly releases USDC to driver wallet",
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="font-semibold text-secondary mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              icon: "🔒",
              title: "Secure Escrow",
              desc: "Payments locked in Soroban smart contracts. No intermediaries. No trust required.",
            },
            {
              icon: "⚡",
              title: "Instant Payouts",
              desc: "Drivers receive USDC within seconds of delivery confirmation. No waiting.",
            },
            {
              icon: "🌍",
              title: "Cross-Border Ready",
              desc: "Stellar enables seamless international settlements in 190+ countries.",
            },
          ].map((item) => (
            <div key={item.title} className="card text-center">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-secondary mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="card !bg-primary !text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to modernize your logistics payments?
          </h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Join the future of freight logistics. Create your first shipment in under 2 minutes.
          </p>
          <Link
            href="/shipments/new"
            className="inline-block bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
}
