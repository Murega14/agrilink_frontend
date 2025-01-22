import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        {/* Success Icon */}
        <div className="flex justify-center">
          <svg
            className="w-16 h-16 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-gray-800 mt-4">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 mt-2">
          Thank you for your purchase. Your order has been successfully placed.
        </p>

        {/* Buttons */}
        <div className="mt-6 space-y-4">
          <button
            onClick={() => navigate("/marketplace")}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
          >
            Go Back to Marketplace
          </button>
          <button
            onClick={() => navigate("/user_orders")}
            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300"
          >
            View Your Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;