import React from 'react'

const Category = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10"
      >
        <source src="/bg_video.mp4" type="video/mp4" />
      </video>

      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/40 -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="pt-28 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold ">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#9b5cff] animate-fade-in">
            Decentralized Rental
          </span>{' '}
          <span className="block mt-2 bg-gradient-to-r from-[#7c3aed] to-[#9b5cff] bg-clip-text text-transparent animate-fade-in-once animate-bounce-slow">
            Marketplace
          </span>
        </h1>

        <p className="pt-8 mt-4 text-white text-lg sm:text-xl max-w-2xl mx-auto animate-fade-in-delay">
          Rent properties securely on the blockchain. No brokers, complete transparency.
        </p>

        <div className="pt-12 mt-8 flex justify-center gap-4 animate-fade-in-delay-2">
          <a
            href="/properties"
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#9b5cff] text-white font-medium shadow-md hover:scale-110 hover:shadow-lg transition-transform duration-300"
          >
            Explore Properties
          </a>

          <a
            href="/room/add"
            className="inline-flex items-center px-6 py-3 rounded-full border border-[#7c3aed]/40 text-[#7c3aed] font-medium hover:scale-110 hover:bg-[#7c3aed]/10 hover:text-white  transition duration-300"
          >
            List Your Property
          </a>
        </div>
      </div>

      {/* Features Section */}
      <section className="relative py-24 px-4 text-white">
        {/* Optional background overlay (if used after your video) */}

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="pt-14 text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#9b5cff] animate-fade-in">
              Why Choose De-Renters?
            </h2>
            <p className="mt-4 text-white max-w-2xl mx-auto">
              Experience the future of property rentals with our blockchain-powered platform.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🔐',
                title: 'Trustless Transactions',
                text: 'Smart contracts ensure all parties follow terms without intermediaries.',
              },
              {
                icon: '💼',
                title: 'Secure Deposits',
                text: 'Automated escrow system protects both tenants and property owners.',
              },
              {
                icon: '⚡',
                title: 'Instant Payments',
                text: 'Fast blockchain transactions with transparent structures.',
              },
              {
                icon: '📜',
                title: 'Transparent History',
                text: 'All transactions permanently recorded on the blockchain.',
              },
              {
                icon: '🤝',
                title: 'No Middlemen',
                text: 'Direct peer-to-peer rentals eliminate brokers.',
              },
              {
                icon: '🔁',
                title: 'Automated Refunds',
                text: 'Smart contracts handle cancellations and refunds automatically.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl p-8 bg-gradient-to-br from-[#1e1b4b]/70 to-[#312e81]/70 border border-[#9b5de5]/20 hover:border-[#9b5de5]/60 hover:scale-105 hover:shadow-[0_0_25px_rgba(155,93,229,0.4)] transition-all duration-300 backdrop-blur-sm"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center mb-4 text-2xl">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-100">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 ">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="pt-14 text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#9b5cff]">
              How It Works
            </h2>
            <p className="mt-4 text-white text-lg sm:text-xl max-w-2xl mx-auto animate-fade-in-delay">
              Five simple steps to rent or list a property using De-Renters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              {[
                {
                  num: '01',
                  title: 'Connect Your Wallet',
                  desc: 'Connect MetaMask or any Web3 wallet to get started.',
                },
                {
                  num: '02',
                  title: 'Browse Properties',
                  desc: 'Explore verified listings with transparent pricing.',
                },
                {
                  num: '03',
                  title: 'Book & Pay',
                  desc: 'Smart contract handles payments and deposits securely.',
                },
                {
                  num: '04',
                  title: 'Check-In',
                  desc: 'Receive digital keys and access instructions instantly.',
                },
                {
                  num: '05',
                  title: 'Review & Refund',
                  desc: 'Leave reviews and get automatic refunds post-stay.',
                },
              ].map((step) => (
                <div key={step.num} className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center text-white font-bold shadow-md">
                      {step.num}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-2xl sm:text-3xl font-semibold text-white">{step.title}</h4>
                    <p className="text-lg sm:text-xl text-gray-100 mt-1">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center mb-12 mt-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Ready to Experience the Future of Rentals?
        </h2>
        <p className="mt-4 text-gray-100 max-w-2xl mx-auto pb-4">
          Join thousands of property owners and tenants already using blockchain technology for
          secure, transparent rentals.
        </p>
      </div>
    </div>
  )
}

export default Category
