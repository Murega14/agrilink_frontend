import React from "react";

const Hero = () => {
  const checkToken = (requiredRole) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    return token != null && userRole === requiredRole;
  };

  const handleBuyerNavigation = (e) => {
    e.preventDefault();
    const hasValidToken = checkToken('buyer');
    window.location.href = hasValidToken ? '/marketplace': '/login/buyer';
  };

  const handleFarmerNavigation = (e) => {
    e.preventDefault();
    const hasValidToken = checkToken('farmer');
    window.location.href = hasValidToken ? '/dashboard' : '/login/farmer';
  };

  return (
    <div className="min-h-screen bg-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <main className="max-w-7xl mx-auto space-y-6">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          <aside className="lg:w-1/2">
            <div className="h-full relative rounded-xl overflow-hidden shadow-lg group">
              <img
                src="https://images.unsplash.com/photo-1498579397066-22750a3cb424?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Farmer harvesting fresh vegetables"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent"></div>
            </div>
          </aside>

          <article className="lg:w-1/2 bg-green-700 rounded-xl p-8 text-white shadow-xl">
            <div className="h-full flex flex-col">
              <h1 className="text-4xl font-extrabold mb-6 leading-tight">Fresh From Farm</h1>
              <p className="text-xl mb-8 text-green-100 leading-relaxed">
                Source fresh, local produce directly from verified farmers in your area.
              </p>

              <div className="space-y-8 flex-grow">
                <div className="flex items-start space-x-5 transition-all duration-300 hover:translate-x-2">
                  <div className="bg-green-600 p-4 rounded-xl shadow-md">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl mb-2">Quality Guaranteed</h3>
                    <p className="text-green-100 text-base">
                      Every product meticulously verified for peak freshness and exceptional quality
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-5 transition-all duration-300 hover:translate-x-2">
                  <div className="bg-green-600 p-4 rounded-xl shadow-md">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl mb-2">Transparent Pricing</h3>
                    <p className="text-green-100 text-base">
                      Direct farm-to-table pricing with complete transparency and no hidden fees
                    </p>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleBuyerNavigation}
                className="mt-10 bg-white text-green-700 px-10 py-4 rounded-lg hover:bg-green-50 transition-colors text-xl font-bold shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Sign Up as Buyer
              </button>
            </div>
          </article>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row gap-6">
          <article className="lg:w-1/2 bg-white rounded-xl p-8 shadow-xl order-2 lg:order-1">
            <div className="h-full flex flex-col">
              <h2 className="text-4xl font-extrabold text-green-800 mb-6 leading-tight">
                Farming Services
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join our network of agricultural producers and reach customers directly.
              </p>

              <div className="space-y-8 flex-grow">
                <div className="flex items-start space-x-5 transition-all duration-300 hover:translate-x-2">
                  <div className="bg-green-100 p-4 rounded-xl">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl text-green-800 mb-2">Direct Distribution</h3>
                    <p className="text-gray-600 text-base">
                      Seamlessly connect with buyers, eliminating unnecessary intermediaries
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-5 transition-all duration-300 hover:translate-x-2">
                  <div className="bg-green-100 p-4 rounded-xl">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl text-green-800 mb-2">Smart Management</h3>
                    <p className="text-gray-600 text-base">
                      Advanced tools for effortless inventory and order management
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleFarmerNavigation}
                className="mt-10 bg-green-600 text-white px-10 py-4 rounded-lg hover:bg-green-700 transition-colors text-xl font-bold shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
              >
                Register as Farmer
              </button>
            </div>
          </article>

          <aside className="lg:w-1/2 order-1 lg:order-2">
            <div className="h-full relative rounded-xl overflow-hidden shadow-lg group">
              <img
                src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Farmer in the field"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent"></div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Hero;