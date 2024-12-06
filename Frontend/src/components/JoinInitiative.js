import React from 'react'
import axios from 'axios';
import { ImCross } from "react-icons/im";
import { toast } from 'react-toastify'
import { useState } from 'react';
const JoinInitiative = ({ initiativeId, setActive }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token')
  const handleJoinInitiative = async () => {
    try {
      if (!name || !phone) {
        setMessage('Name and phone number are required.');
        return;
      }

      const response = await axios.post(
        `https://funraiser.onrender.com/init/join/${initiativeId}`,
        { name, phone },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('You are now a member of this Initiative')
      setActive('')
      setMessage(response.data.message || 'Successfully joined the initiative!');
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error || 'An error occurred.');
        toast.warning('You are already a member');
        setActive('')
      } else {
        setMessage('Unable to join initiative. Please try again.');
        toast.error('Something wrong ,Try again Later');
      }
    }
  };
  const handleBack = () => {
    setActive('')
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-[#faf9f6] rounded-lg shadow-lg border border-gray-200">
      <div className="relative mb-3">
        <button
          onClick={handleBack}
          className="absolute right-0 top-0 text-black  hover:text-[#aa4528] transition duration-150 flex items-center space-x-2"
        >
          <ImCross size={20} />
        </button>
        <h2 className="form-heading text-lg font-bold text-gray-800 mb-6">Join Initiative</h2>
      </div>

      {/* Name Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Name:
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md "
          placeholder="Enter your name"
        />
      </div>

      {/* Phone Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone:
        </label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md "
          placeholder="Enter your phone number"
        />
      </div>

      {/* Join Button */}
      <button
        onClick={handleJoinInitiative}
        className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-[#aa4528] focus:outline-none focus:ring-4 focus:ring-teal-300 transition duration-300"
      >
        Join
      </button>
    </div>

  );
}

export default JoinInitiative
