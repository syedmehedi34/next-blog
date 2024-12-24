const donationAmounts = [
  { amount: 5, label: "$5" },
  { amount: 10, label: "$10" },
  { amount: 25, label: "$25" },
  { amount: 50, label: "$50" },
  { amount: 100, label: "$100" },
];

const paymentMethods = [
  { id: "card", name: "Credit Card", icon: "💳" },
  { id: "paypal", name: "PayPal", icon: "🌐" },
  { id: "crypto", name: "Cryptocurrency", icon: "₿" },
];

const DonateNow = () => (
  <section className="py-16 bg-white">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Support Our Writers
        </h2>
        <p className="text-gray-600">
          Your donation helps us maintain quality content and support our
          community of writers.
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
        {/* Amount Selection */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Amount
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {donationAmounts.map(({ amount, label }) => (
              <button
                key={amount}
                className="px-4 py-2 border-2 border-blue-600 rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
          <div className="mt-4">
            <input
              type="number"
              placeholder="Custom Amount"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Payment Method
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-colors"
              >
                <span className="text-xl">{method.icon}</span>
                <span>{method.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Donate Button */}
        <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          Donate Now
        </button>
      </div>
    </div>
  </section>
);

export default DonateNow;
