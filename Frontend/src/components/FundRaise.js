import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ImCross } from "react-icons/im";
import { pdfjs } from "react-pdf";
import { toast } from "react-toastify";
import Spinner from './Spinner';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const FormSubmission = ({ setActivesection }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    details: '',
    funds: '',
    raised: 0,
    type: 'Medicine',
    phone: '',
    user_id: ''
  });
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleBack = () => {
    setActivesection('');
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setFormData((prevData) => ({ ...prevData, user_id: storedUserId }));
    } else {
      console.error('User not authenticated');
    }
  }, []);

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

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const fundResponse = await axios.post('https://funraiser.onrender.com/fund/raise', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const fundId = fundResponse.data._id;
      localStorage.setItem('fundId', fundId);

      if (file) {
        const documentData = new FormData();
        documentData.append("file", file);
        documentData.append('userId', formData.user_id);
        documentData.append('fundId', fundId);
        // documentData.append('title', title);

        const docResponse = await axios.post(
          `https://funraiser.onrender.com/doc/upload-files/${formData.user_id}`,
          documentData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`
            }
          }
        );
        console.log(docResponse);
        setIsLoading(false);
        if (docResponse.data.status === "ok") {
          toast.success("Fund Raised Successfully")
        } else {
          toast.error('Document Not Uploaded')
        }
      } else {
        toast.error("Try Again Later!")
      }

      setFormData({
        title: '',
        details: '',
        funds: '',
        raised: 0,
        type: 'Medicine',
        phone: '',
        user_id: localStorage.getItem('userId')
      });
      setTitle("");
      setFile(null);
      setActivesection('');
    } catch (error) {
      console.log(error);
      toast.error('Fund Raise Failed , try again later')

    }
  };

  return (
    <div
      className="form-container max-w-2xl mx-auto bg-[#f2f1ed] shadow-md p-6 mt-12 mr-6 ml-6 overflow-y-auto no-scrollbar rounded-lg border border-gray-200"
      style={{ maxHeight: "80vh" }}
    >
      {
        isLoading ? (<Spinner />) : (
          <div>
            <div className="relative mb-6">
              <button
                onClick={handleBack}
                className="absolute right-0 top-0 text-black hover:text-[#aa4528] transition duration-150 flex items-center ml-4"
              >
                <ImCross size={15} />
              </button>
              <h2 className="text-3xl font-extrabold text-gray-800 text-center pt-2">
                Start a Fundraiser
              </h2>
            </div>

            <p className="text-gray-500 text-base mb-5 text-center">
              Complete the form below to share your cause and start raising funds.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8 ">
              {/* Grid Layout for Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
                {/* Left Column */}
                <div>
                  <div className="form-group mb-4">
                    <label className="block text-gray-600 font-medium mb-2">
                      Fundraiser Title
                    </label>
                    <input
                      name="title"
                      type="text"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-[#faf9f6] border border-gray-300 rounded-md  transition duration-200"
                      placeholder="Enter title for your fundraiser"
                    />
                  </div>
                  <div className="form-group">
                    <label className="block text-gray-600 font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      name="phone"
                      type="number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-[#faf9f6] border border-gray-300 rounded-md  transition duration-200"
                      placeholder="Enter phone number of the fundraiser"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  <div className="form-group mb-4">
                    <label className="block text-gray-600 font-medium mb-2">
                      Goal Amount (₹)
                    </label>
                    <input
                      name="funds"
                      type="number"
                      value={formData.funds}
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-[#faf9f6] border border-gray-300 rounded-md  transition duration-200"
                      placeholder="Set a target amount"
                    />
                  </div>
                  <div className="form-group">
                    <label className="block text-gray-600 font-medium mb-2">Category</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full bg-[#faf9f6] border border-gray-300 rounded-md p-3  transition duration-200"
                    >
                      <option value="Medicine">Medicine</option>
                      <option value="Education">Education</option>
                      <option value="Relief Fund">Relief Fund</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Document Upload */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:space-x-4 items-center">
                  <input
                    type="text"
                    className="form-control sm:w-1/2 w-full p-3 border bg-[#faf9f6] rounded-lg "
                    placeholder="Document Title (e.g., Medical Certificate)"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <input
                    type="file"
                    className="form-control sm:w-1/2 w-full mt-4 sm:mt-0 p-3 border bg-[#faf9f6] rounded-lg "
                    accept="application/pdf"
                    required
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
              </div>

              {/* Details Section */}
              <div>
                <label className="block text-gray-600 font-medium mb-2">Details</label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-[#faf9f6] border rounded-md transition duration-200"
                  placeholder="Provide a brief description of the fundraiser and why support is needed."
                  rows="4"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-[#aa4528] transition duration-200 ease-in-out transform hover:scale-105 "
              >
                Submit Fundraiser
              </button>
            </form>
          </div>
        )
      }


    </div>

  );
};

export default FormSubmission;
