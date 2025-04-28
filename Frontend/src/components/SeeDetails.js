import React, { useState, useEffect } from "react";
import axios from "axios";
import { ImCross } from "react-icons/im";
import { toast } from "react-toastify";
const UserDetailsForm = ({ setActivesection }) => {
  const [userDetails, setUserDetails] = useState({
    AccountNo: "",
    Bank: "",
    AdhaarNo: "",
    Address: "",
    mobileNo: "",
    Upi: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    axios
      .get(`https://funraiser-pvio.vercel.app/ud/user-details/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      )
      .then((response) => {
        if (response.data) {
          setUserDetails(response.data);
          setIsEditing(true);

        }
      })
      .catch((error) => console.error("Error fetching user details:", error));
  }, [userId]);

  const handleChange = (e) => {
    if (e.target.name == "mobileNo" && e.target.value.length > 10) {
      toast.error('Enter Valid Phone Number');
      return;
    }
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "https://funraiser-pvio.vercel.app/ud/user-details",
        { userId, ...userDetails },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((response) => {
        toast.success('Details Added Successfully')
      })
      .catch((error) => {
        toast.error('Internal error , try again later')
      });
    setActivesection('form');
  };
  const handleBack = () => {
    setActivesection('')
      ;
  }
  return (
    <div className=" w-[320px]  max-h-[500px] p-6 bg-[#f2f1ed] shadow-lg rounded-lg mt-8 overflow-y-auto no-scrollbar border border-gray-200 ">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 relative">
        <div className="absolute top-0 right-0">
          <button
            onClick={handleBack}
            className="text-black hover:text-[#aa4528] transition duration-200"
          >
            <ImCross size={15} />
          </button>
        </div>
        {isEditing ? "Update Your Details" : "Enter Your Details"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-2 text-sm">
            Account Number:
          </label>
          <input
            type="number"
            name="AccountNo"
            value={userDetails.AccountNo}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm "
            placeholder="Enter your account number"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2 text-sm">
            Bank Name:
          </label>
          <input
            type="text"
            name="Bank"
            value={userDetails.Bank}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm "
            placeholder="Enter your bank name"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2 text-sm">
            Aadhaar Number:
          </label>
          <input
            type="number"
            name="AdhaarNo"
            value={userDetails.AdhaarNo}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm "
            placeholder="Enter your Aadhaar number"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2 text-sm">
            Address:
          </label>
          <input
            type="text"
            name="Address"
            value={userDetails.Address}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm "
            placeholder="Enter your address"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2 text-sm">
            Mobile Number:
          </label>
          <input
            type="number"
            name="mobileNo"
            value={userDetails.mobileNo}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm "
            placeholder="Enter your mobile number"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2 text-sm">
            UPI ID:
          </label>
          <input
            type="text"
            name="Upi"
            value={userDetails.Upi}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Enter your UPI ID"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-black text-white font-medium rounded-md hover:bg-[#aa4528] focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition duration-200"
        >
          {isEditing ? "Proceed with this Details" : "Submit Details"}
        </button>
      </form>
    </div>
  );
};

export default UserDetailsForm;
