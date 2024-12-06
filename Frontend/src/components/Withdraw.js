import React from 'react';
import { useNavigate } from 'react-router-dom';

const Withdraw = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg relative">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Withdrawal Confirmation
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Your request has been sent .
          The raised amount will be sent to your account within one hour. Thank you for your patience.
        </p>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Go to Home
          </button>

        </div>
      </div>
    </div>
  );
};

export default Withdraw;

