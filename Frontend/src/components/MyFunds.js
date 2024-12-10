import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Withdraw from './Withdraw';
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci"
import { toast } from "react-toastify"
import DocOfFunds from './DocumentsOfFund';
import Spinner from './Spinner';
const MyFunds = () => {
  const [funds, setFunds] = useState([]);
  const [isdoc, setisdoc] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editInitiativeId, setEditInitiativeId] = useState(null);
  const [editData, setEditData] = useState({
    title: '',
    details: '',
    funds: '',
    raised: '',
    date: '',
    type: 'Medicine',
    user_id: ''
  });
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/')
  }
  const handleLessWithdraw = () => {
    toast.error("You can not Withdraw until the raised amount is 20000")
  }
  const [isUser, setIsUser] = useState(false);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const handleDeleteClick = async (fundId) => {
    if (!window.confirm("Are you sure you want to delete this fund?")) {
      return;
    }

    try {
      await axios.delete(`https://funraiser.onrender.com/fund/deleteFund/${fundId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFunds((prevFunds) => prevFunds.filter((fund) => fund._id !== fundId));
      toast.success("Fund deleted successfully");
    } catch (error) {
      console.error("Error deleting fund:", error);
      toast.error("Failed to delete the fund. Please try again.");
    }
  };

  const handleDeleteDoc = async (fundId) => {
    if (!window.confirm("Are you sure you want to delete this Document?")) {
      return;
    }

    try {
      await axios.delete(`https://funraiser.onrender.com/fund/deleteDoc/${fundId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setisdoc((prevDocs) => prevDocs.filter((fund) => fund._id !== fundId));
      toast.success("Fund deleted successfully");
      setisdoc(true);
    } catch (error) {
      console.error("Error deleting fund:", error);
      toast.error("Failed to delete the fund. Please try again.");
    }
  };

  useEffect(() => {
    const fetchFunds = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://funraiser.onrender.com/fund/getFunds/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setFunds(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching funds', error);
      }
    };

    fetchFunds();
  }, [userId, token]);

  const handleEditClick = (fund) => {
    setEditInitiativeId(fund._id);
    setEditData({
      title: fund.title,
      details: fund.details,
      funds: fund.funds,
      raised: fund.raised,
      date: fund.date,
      type: fund.type,
      user_id: fund.user_id
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`https://funraiser.onrender.com/fund/editFund/${editInitiativeId}`, editData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEditInitiativeId(null);
      toast.success("Fund Edited Successfully")
      setFunds((prevFunds) =>
        prevFunds.map((fund) =>
          fund._id === editInitiativeId ? { ...fund, ...editData } : fund
        )
      );
    } catch (err) {
      console.error(err);
      toast.error("Edit Failed, try again Later");
    }
  };
  const [isDocument, setIsDocument] = useState(null);
  const [docKey, setDocKey] = useState(0);

  const renderDoc = () => {
    switch (isDocument) {
      case 'doc':
        return <DocOfFunds key={docKey} isUser={isUser} setIsDocument={setIsDocument} />;
      case 'withdraw':
        return (<Withdraw />)
      default:
        return null;
    }
  };
  return (
    <div className="min-h-screen  overflow-y-auto no-scrollbar bg-[#f2f1ed]">
      <div >{renderDoc()}</div>
      {
        isLoading ? (<Spinner />) : (<div>
          {/* <button
            onClick={handleBack}
            className="translate-y-16 translate-x-5 text-black hover:text-[#aa4528] text-xl font-bold transition-transform transform hover:scale-110"
          >
            <FaArrowLeft />
          </button> */}
          <div className="max-w-7xl mx-auto p-8">
            <h2 className="text-center text-4xl font-extrabold text-black hover:text-[#aa4528] mb-10">
              Your Raised Funds
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {funds.length > 0 ? (
                funds.map((fund, index) => (
                  <div key={index}>
                    <li
                      className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                        {fund.title.length > 20
                          ? `${fund.title.slice(0, 20)}...`
                          : fund.title}
                      </h3>
                      <div className="relative">
                        <button
                          onClick={() => handleEditClick(fund)}
                          className="absolute top-2 right-2 px-4 py-1 text-black bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-300"
                        >
                          <CiEdit fontSize="1.45rem" />
                        </button>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-500 mb-1">
                          <strong>Funds Needed:</strong>
                        </p>
                        <p className="text-gray-700">{fund.funds}</p>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-500 mb-1">
                          <strong>Amount Raised:</strong>
                        </p>
                        <p className="text-gray-700">{fund.raised}</p>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-500 mb-1">
                          <strong>Type:</strong>
                        </p>
                        <p className="text-gray-700">{fund.type}</p>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-500 mb-1">
                          <strong>Phone number:</strong>
                        </p>
                        <p className="text-gray-700">{fund.phone}</p>
                      </div>
                      <div className="flex justify-between items-center space-x-4">
                        {/* Left Group: Docs and Withdraw */}
                        <div className="flex space-x-3">
                          <button
                            onClick={() => {
                              localStorage.setItem("selectedFundId", fund._id);
                              setIsDocument("doc");
                              setIsUser(true);
                              setDocKey((prevKey) => prevKey + 1);
                            }}
                            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
                          >
                            Docs
                          </button>
                          {!isdoc ? (
                            <button
                              onClick={() => handleDeleteDoc(fund._id)}
                              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-300"
                            >
                              <MdDelete />
                            </button>
                          ) : <p className="text-center text-gray-600 text-lg col-span-full">
                            No initiatives found!
                          </p>}
                          <button
                            onClick={fund.raised > 1000 ? (() => { setIsDocument('withdraw') }) : (handleLessWithdraw)}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                          >
                            Withdraw
                          </button>
                        </div>
                        {/* Right Group: Edit and Delete */}
                        <div className="flex space-x-3">

                          <button
                            onClick={() => handleDeleteClick(fund._id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                          >
                            <MdDelete />
                          </button>
                        </div>
                      </div>
                    </li>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600 text-lg col-span-full">
                  No funds found!
                </p>
              )}
            </ul>
            {/* Edit Form */}
            {editInitiativeId && (
              <div className="fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
                <div className="bg-white w-full max-w-3xl p-8 rounded-lg shadow-lg">

                  <h3 className="text-3xl font-bold text-gray-800 mb-6">Edit Fund</h3>
                  <input
                    type="text"
                    name="title"
                    value={editData.title}
                    onChange={handleEditChange}
                    placeholder="Title"
                    className="block w-full p-4 mb-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
                  />
                  <input
                    type="text"
                    name="details"
                    value={editData.details}
                    onChange={handleEditChange}
                    placeholder="Details"
                    className="block w-full p-4 mb-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
                  />
                  <input
                    type="number"
                    name="funds"
                    value={editData.funds}
                    onChange={handleEditChange}
                    placeholder="Funds Needed"
                    className="block w-full p-4 mb-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
                  />
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={handleEditSubmit}
                      className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setEditInitiativeId(null)}
                      className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>)
      }

    </div>

  );
};

export default MyFunds;