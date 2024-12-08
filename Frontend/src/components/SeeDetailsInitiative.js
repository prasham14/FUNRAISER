import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaArrowLeft } from "react-icons/fa";
import { toast } from 'react-toastify'
const SeeDetailsInitiative = ({ setActive }) => {
  const [initiativeDetails, setInitiativeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const initiativeId = localStorage.getItem('selectedinitiativeId')
  const [showFullPurpose, setShowFullPurpose] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const emailId = localStorage.getItem('email');
  const selectedemail = localStorage.getItem('selectedinitiativeEmail');
  const [isUser, setIsUser] = useState(false);
  const truncateText = (text, isExpanded) => {
    if (isExpanded || text.length <= 30) return text;
    return text.slice(0, 30) + "...";
  };

  useEffect(() => {
    if (emailId === selectedemail) {
      setIsUser(true);
    }
  }, [emailId, selectedemail]);
  const handleIsUser = () => {
    toast.error('This initiative is created by you ');
  }
  useEffect(() => {
    const fetchInitiativeDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://funraiser.onrender.com/init/getinit/${initiativeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setInitiativeDetails(response.data);
        // console.log(response.data)
      } catch (err) {
        console.error("Error fetching initiative details:", err);
        setError('Unable to fetch details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchInitiativeDetails();
  }, [initiativeId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        <p>{error}</p>
        <button
          className="bg-black text-white py-2 px-4 mt-4 rounded-md hover:bg-[#aa4528] transition duration-300"
          onClick={() => setActive('')}
        >
          Go Back
        </button>
      </div>
    );
  }

  const { title, date, purpose, desc, members, email, phone } = initiativeDetails;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-auto overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <button
          className="text-black hover:text-[#aa4528] text-xl font-bold flex items-center transition-transform transform hover:scale-110"
          onClick={() => setActive('')}
        >
          <FaArrowLeft className="mr-2" />
        </button>
      </div>

      <h1 className="sm:text-xl text-lg font-bold text-center text-black mb-4">{initiativeDetails.title}</h1>
      <p className="text-gray-600 text-center mb-6">
        Created on: <span className="font-semibold">{new Date(date).toLocaleDateString()}</span>
      </p>

      <p className="text-sm text-gray-600 mb-2">
        <strong>Purpose:</strong>{" "}
        {truncateText(initiativeDetails.purpose, showFullPurpose)}
        {initiativeDetails.purpose.length > 30 && (
          <button
            className="text-blue-500 ml-2"
            onClick={() => setShowFullPurpose(!showFullPurpose)}
          >
            {showFullPurpose ? "Read Less" : "Read More"}
          </button>
        )}
      </p>

      <p className="text-sm text-gray-600 mb-2">
        <strong>Description:</strong>{" "}
        {truncateText(initiativeDetails.desc, showFullDescription)}
        {initiativeDetails.desc.length > 30 && (
          <button
            className="text-blue-500 ml-2"
            onClick={() => setShowFullDescription(!showFullDescription)}
          >
            {showFullDescription ? "Read Less" : "Read More"}
          </button>
        )}
      </p>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Contact Information:</h2>
        <p className="text-gray-800">Email: {email}</p>
        <p className="text-gray-800">Phone: +91 {phone}</p>
      </div>

      <button
        onClick={() => {
          localStorage.setItem('selectedinitiativeId', initiativeDetails._id);
          isUser ? (handleIsUser()) : (setActive('join'))
        }}
        className="bg-black text-white py-2 px-4 rounded-md hover:bg-[#aa4528] transition duration-300 w-full"
      >
        Join
      </button>
    </div>
  );
};

export default SeeDetailsInitiative;
