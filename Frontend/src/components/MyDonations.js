import React, { useEffect, useState } from 'react';
import axios from 'axios';

const parseDate = (date) => {
  if (!date) return 'Invalid date';

  const parsedDate = new Date(date);

  if (isNaN(parsedDate)) {
    return 'Invalid date';
  }

  return parsedDate.toLocaleDateString();
};

const MyDonations = () => {
  const [donationData, setDonationData] = useState(null);
  const [selectedFund, setSelectedFund] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const id = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const fetchFundDetails = async (fundId) => {
    try {
      const response = await axios.get(`https://funraiser.onrender.com/fund/getFund/${fundId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSelectedFund(response.data);
      setShowModal(true);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'An error occurred');
    }
  };

  useEffect(() => {
    if (id && token) {
      const fetchDonations = async () => {
        try {
          const response = await axios.get(`https://funraiser.onrender.com/payment/getDonations/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setDonationData(response.data);
        } catch (err) {
          setError(err.response?.data?.error || err.message || 'An error occurred');
        }
      };

      fetchDonations();
    } else {
      setError('No ID or token found ');
    }
  }, [id, token]);

  const closeModal = () => {
    setShowModal(false);
    setSelectedFund(null);
  };

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!donationData) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }


  return (
    <div className="relative max-w-4xl mx-auto my-8 p-6  bg-white">

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"></div>
      )}

      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Your Donations </h1>

      {donationData.length === 0 ? (
        <p className="text-center text-gray-600">You have not made any donations yet.</p>
      ) : (
        <div className="space-y-6">
          {donationData.map((donation, index) => (
            <div
              key={index}
              className="bg-[#f2f1ed] p-4 rounded-lg shadow-md border border-gray-200"
            >

              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-700">Amount Donated:</span>
                <span className="text-lg text-gray-600">{donation.amount} INR</span>
              </div>

              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-700">Donation Date:</span>
                <span className="text-lg text-gray-600">
                  {parseDate(donation.date)}
                </span>
              </div>

              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-700">Donated To:</span>
                <button
                  onClick={() => fetchFundDetails(donation.fundId)}
                  className="text-lg text-black hover:text-[#aa4528] hover:underline"
                >
                  View Fund Details
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {showModal && selectedFund && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-4xl relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Fund Details</h2>
            <div className="mb-4">
              <span className="font-semibold text-gray-700">Fund Name:</span>
              <span className="text-gray-600">{selectedFund.title}</span>
            </div>

            <div className="mb-4">
              <span className="font-semibold text-gray-700">Target Amount:</span>
              <span className="text-gray-600"> Rs. {selectedFund.funds}</span>
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-700">Raised Amount:</span>
              <span className="text-gray-600"> Rs. {selectedFund.raised}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDonations;
