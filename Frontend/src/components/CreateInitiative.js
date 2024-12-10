import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ImCross } from "react-icons/im";
import { toast } from 'react-toastify'
const FormSubmission = ({ setActive }) => {
  const [formData, setFormData] = useState({
    title: '',
    purpose: '',
    desc: '',
    date: Date.now(),
    phone: '',
    email: ''
  });
  const emailId = localStorage.getItem('email');
  useEffect(() => {

    if (emailId) {
      setFormData((prevData) => ({ ...prevData, email: emailId }));
    } else {
      console.error('User not authenticated');
    }
  }, [emailId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && value.length > 10) {
      toast.error("Phone number cannot exceed 10 digits.");
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleBack = () => {
    setActive('')
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.phone.length !== 10) {
      toast.error('Invalid Phone Number');
      return;
    }
    try {

      const token = localStorage.getItem('token');
      const response = await axios.post(`https://funraiser.onrender.com/init/createInitiative/${emailId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Initiative Created!')
      setActive('');
      setFormData({
        title: '',
        purpose: '',
        desc: '',
        date: '',
        phone: '',
        email: localStorage.getItem('email')
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Form submission failed. Please try again.');
    }
  };

  return (
    <div className=" p-3 rounded-lg shadow-md mt-5 bg-[#faf9f6]">
      <div className="relative mb-3">
        <button
          onClick={handleBack}
          className="absolute right-0 top-0 text-black  hover:text-[#aa4528] transition duration-150 flex items-center space-x-2 "
        >
          <ImCross size={15} />
        </button>
        <h2 className="form-heading text-center text-lg font-bold text-gray-800 mb-6 mr-5">Create Initiative</h2>
      </div>



      <form onSubmit={handleSubmit} className="form space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Title:</label>
          <input
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
            className="form-input w-full p-2 border border-gray-300 rounded-lg "
          />
        </div>
        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-1">Purpose:</label>
          <textarea
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
            placeholder='less than 50 words....'
            className="form-input w-full p-2 border border-gray-300 rounded-lg "
          />
        </div>
        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-1">Description:</label>
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            required
            className="form-input w-full p-2 border border-gray-300 rounded-lg "
          />
        </div>
        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-1">Phone Number</label>
          <input
            name="phone"
            type="number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="form-input w-full p-2 border border-gray-300 rounded-lg "
          />
        </div>
        <button type="submit" className="form-button w-full bg-black text-white py-2 rounded-lg hover:bg-[#aa4528] transition duration-200">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormSubmission;
