import React, { useState, useEffect } from "react";
import axios from "axios";

const ShowBankDetails = ({ setIsDoc }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("fundUserId");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`https://mernfr.onrender.com/ud/user-details/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserDetails(response.data);
      } catch (err) {
        setError(err.response?.status === 404 ? "User details not found." : "Error retrieving user details.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, [userId]);

  const handlePay = () => {
    setIsDoc('pay')
  }
  if (loading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 ">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Details</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Account No:</span>
          <span className="font-medium">{userDetails.AccountNo}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Bank:</span>
          <span className="font-medium">{userDetails.Bank}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Mobile No:</span>
          <span className="font-medium">{userDetails.mobileNo}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">UPI ID:</span>
          <span className="font-medium">{userDetails.Upi || "N/A"}</span>
        </div>
      </div>
      <button className="px-4 py-2 mt-8 flex justify-center w-full border bg-black text-white hover:bg-[#aa4528] rounded-lg transition duration-300 hover:scale-y-125 hover:scale-x-110" onClick={handlePay}>Donate Now</button>
    </div>
  );
};

export default ShowBankDetails;
