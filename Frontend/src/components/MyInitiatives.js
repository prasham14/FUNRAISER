import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import CreateInitiative from './CreateInitiative';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ImCross } from 'react-icons/im'
import Spinner from './Spinner';
const MyInitiatives = () => {
  const [initiatives, setInitiatives] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [editInitiativeId, setEditInitiativeId] = useState(null);
  const [editData, setEditData] = useState({ title: '', purpose: '', desc: '', phone: '' });
  const [active, setActive] = useState('');
  const [memberDetails, setMemberDetails] = useState(null);
  const [showFullPurpose, setShowFullPurpose] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const truncateText = (text, isExpanded) => {
    if (isExpanded || text.length <= 30) return text;
    return text.slice(0, 30) + "...";
  };

  const emailId = localStorage.getItem('email');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const handleBack = () => navigate('/');

  useEffect(() => {
    const fetchInitiatives = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://mernfr.onrender.com/init/getInitiative/${emailId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setInitiatives(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching initiatives', error);
      }
    };

    fetchInitiatives();
  }, [emailId, token]);

  const handleEditClick = (initiative) => {
    setEditInitiativeId(initiative._id);
    setEditData({
      title: initiative.title,
      purpose: initiative.purpose,
      desc: initiative.desc,
      phone: initiative.phone,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (name == "phone" && value.length > 10) {
      toast.error("Enter valid Phone Number");
      return;
    }
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`https://mernfr.onrender.com/init/editInitiative/${editInitiativeId}`, editData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEditInitiativeId(null);

      setInitiatives((prevInitiatives) =>
        prevInitiatives.map((initiative) =>
          initiative._id === editInitiativeId ? { ...initiative, ...editData } : initiative
        )
      );
      toast.success("Initiative Edited");
    } catch (err) {
      console.error(err);
      toast.error('Edit failed, Please Enter Valid details');
    }
  };

  const handleDeleteClick = async (initiativeId) => {
    if (!window.confirm('Are you sure you want to delete this initiative?')) return;

    try {
      await axios.delete(`https://mernfr.onrender.com/init/deleteInitiative/${initiativeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setInitiatives((prevInitiatives) =>
        prevInitiatives.filter((initiative) => initiative._id !== initiativeId)
      );
      toast.success('Initiative deleted successfully');
    } catch (error) {
      toast.error('Failed to delete the initiative. Please try again.');
    }
  };

  const render = () => {
    switch (active) {
      case 'createInitiative':
        return <CreateInitiative setActive={setActive} />;
      default:
        return null;
    }
  };

  const handleMemberDetailsClick = (initiative) => {
    setMemberDetails(initiative);
  };

  const handleCloseModal = () => {
    setMemberDetails(null);
  };

  return (
    <div className="relative h-screen w-screen bg-[#f2f1ed] py-10 px-6 shadow-xl overflow-y-auto">
      {
        isLoading ? (<Spinner />) : (<div> <button
          onClick={handleBack}
          className="flex items-center text-black hover:text-[#aa4528] text-xl font-bold transition-transform transform hover:scale-110"
        >
          <FaArrowLeft />
        </button>
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setActive("createInitiative")}
              className="flex items-center justify-center bg-black text-white p-2 rounded-sm  transition-transform duration-300 "
              aria-label="Create Initiative"
            >
              <FaPlus />
            </button>
          </div>
          <h2 className="text-center text-4xl font-extrabold text-black hover:text-[#aa4528] mb-10">
            Your Initiatives
          </h2>
          <div >
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {initiatives.length > 0 ? (
                initiatives.map((initiative, index) => (
                  <li
                    key={index}
                    className="bg-white rounded-lg shadow-md p-6 border border-gray-200 transform transition duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      {initiative.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Purpose:</strong>{" "}
                      {truncateText(initiative.purpose, showFullPurpose)}
                      {initiative.purpose.length > 30 && (
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
                      {truncateText(initiative.desc, showFullDescription)}
                      {initiative.desc.length > 30 && (
                        <button
                          className="text-blue-500 ml-2"
                          onClick={() => setShowFullDescription(!showFullDescription)}
                        >
                          {showFullDescription ? "Read Less" : "Read More"}
                        </button>
                      )}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Phone:</strong> +91 {initiative.phone}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Date:</strong> {new Date(initiative.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      <strong>Members joined:</strong> {initiative.members}
                    </p>
                    <button
                      onClick={() => handleMemberDetailsClick(initiative)}  // Trigger the member details modal
                      className="text-sm  hover:text-white mb-4 transition bg-teal-600 text-white px-3 py-2 rounded hover:bg-teal-700  duration-300 "
                    >
                      Members
                    </button>

                    <div className="mt-4 flex justify-between">
                      <button
                        onClick={() => handleEditClick(initiative)}
                        className="bg-teal-600 text-white px-3 py-2 rounded hover:bg-teal-700 transition duration-300 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(initiative._id)}
                        className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition duration-300 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-center text-gray-600 text-lg col-span-full">
                  No initiatives found!
                </p>
              )}
            </ul>
          </div>

          {editInitiativeId && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Edit Initiative
                </h3>
                <input
                  type="text"
                  name="title"
                  value={editData.title}
                  onChange={handleEditChange}
                  placeholder="Title"
                  className="block w-full p-3 mb-3 border border-gray-300 rounded-lg focus:ring focus:ring-teal-300"
                />
                <input
                  type="text"
                  name="purpose"
                  value={editData.purpose}
                  onChange={handleEditChange}
                  placeholder="Purpose"
                  className="block w-full p-3 mb-3 border border-gray-300 rounded-lg focus:ring focus:ring-teal-300"
                />
                <textarea
                  name="desc"
                  value={editData.desc}
                  onChange={handleEditChange}
                  placeholder="Description"
                  className="block w-full p-3 mb-3 border border-gray-300 rounded-lg focus:ring focus:ring-teal-300"
                />
                <input
                  type="number"
                  name="phone"
                  value={editData.phone}
                  onChange={handleEditChange}
                  placeholder="Phone"
                  className="block w-full p-3 mb-3 border border-gray-300 rounded-lg focus:ring focus:ring-teal-300"
                />
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={handleEditSubmit}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditInitiativeId(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Members Modal */}
          {memberDetails && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center backdrop-blur-sm">
              <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">

                <div className='flex items-center justify-between'>
                  <button
                    onClick={handleCloseModal}
                    className="text-black text-xl"
                  >
                    <ImCross />
                  </button>
                  <h4 className="text-lg font-bold text-teal-700 mb-2 mx-auto">
                    Members Details
                  </h4>
                </div>
                <div className="overflow-auto bg-gray-50 rounded-lg shadow-md p-4 border border-gray-200">
                  <table className="w-full text-sm text-left text-gray-600">
                    <thead>
                      <tr className="bg-teal-600 text-white">
                        <th scope="col" className="px-4 py-2">#</th>
                        <th scope="col" className="px-4 py-2">Name</th>
                        <th scope="col" className="px-4 py-2">Phone Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      {memberDetails.memberNames.map((name, index) => (
                        <tr key={index} className="bg-white border-b hover:bg-gray-100">
                          <td className="px-4 py-2 font-medium text-teal-700">{index + 1}</td>
                          <td className="px-4 py-2">{name}</td>
                          <td className="px-4 py-2">{memberDetails.memberPhone[index]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          <div
            className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center ${active === "createInitiative" ? "block" : "hidden"
              }`}
          >
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
              {render()}
            </div>
          </div></div>)
      }

    </div>
  );
};

export default MyInitiatives;
