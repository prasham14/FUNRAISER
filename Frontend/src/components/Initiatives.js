import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import CreateInitiative from './CreateInitiative';
import JoinInitiative from "./JoinInitiative";
import im1 from './images/digitalindia.jpeg'
import im2 from './images/swcchbharat.jpeg';
import im3 from './images/OIP (1).jpeg'
import im4 from './images/Niti aygo.jpeg'
import im5 from './images/pmjdyojna.jpeg'
import im6 from './images/startupindia.jpeg'
import SeeDetailsInitiative from './SeeDetailsInitiative';


const Initiatives = () => {
  const [initiatives, setInitiatives] = useState([]);
  const [active, setActive] = useState('');
  const navigate = useNavigate();
  const initiativeId = localStorage.getItem('selectedinitiativeId');
  const token = localStorage.getItem('token');

  function handleButton() {
    setActive('createInitiative');
  }

  const handleBack = () => {
    navigate('/');
  };

  const render = () => {
    switch (active) {
      case 'createInitiative': return (<CreateInitiative setActive={setActive} />);
      case 'seeDetails': return (<SeeDetailsInitiative initiativeId={initiativeId} setActive={setActive} />)
      case 'join': return <JoinInitiative initiativeId={initiativeId} setActive={setActive} />;
      default: return null;
    }
  };

  useEffect(() => {
    if (!token) {
      console.error('Token not found. User must log in.');
      navigate('/login');
      return;
    }

    const fetchFunds = async () => {
      try {
        const response = await axios.get('https://funraiser.onrender.com/init/getinitiatives', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setInitiatives(response.data);
      } catch (error) {
        console.error('Error fetching initiatives', error);
      }
    };

    fetchFunds();
  }, [token, navigate]);

  const links = [
    {
      id: 1,
      title: "Digital India",
      image: im1,
      url: "https://dic.gov.in/"
    },
    {
      id: 2,
      title: "Startup India",
      image: im6,
      url: "https://www.startupindia.gov.in/"
    },
    {
      id: 3,
      title: "Swachh Bharat",
      image: im2,
      url: "https://swachhbharat.mygov.in/"
    },
    {
      id: 4,
      title: "Make in India",
      image: im3,
      url: "https://www.pmindia.gov.in/en/major_initiatives/make-in-india/"
    },
    {
      id: 5,
      title: "NITI Aayog: Transforming India’s Development Agenda",
      image: im4,
      url: "https://www.niti.gov.in/"
    },
    {
      id: 6,
      title: "Pradhan Mantri Jan Dhan Yojana",
      image: im5,
      url: "https://pmjdy.gov.in/"
    },
  ];

  return (
    <div className="relative h-screen w-screen bg-[#f2f1ed] py-10 px-6 shadow-xl overflow-y-auto">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-8">
        {/* <button
          onClick={handleBack}
          className="flex items-center text-black  hover:text-[#aa4528] text-xl font-bold transition-transform transform hover:scale-110"
        >
          <FaArrowLeft className="mr-2" />

        </button> */}

        <button
          onClick={handleButton}
          className="flex items-center justify-center bg-black text-white p-2 rounded-sm  transition-transform duration-300"
          aria-label="Create Initiative"
        >
          <FaPlus className="text-lg" />
        </button>
      </div>

      {/* Header */}
      <h1 className="text-center text-4xl font-extrabold text-black  hover:text-[#aa4528] mb-10 cursor-pointer">
        Most Popular Initiatives in India!
      </h1>

      {/* Popular Initiatives Section */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.map((link) => (
          <div
            key={link.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:-translate-y-2 hover:shadow-xl"
          >
            <img
              src={link.image}
              alt={link.title}
              className="w-full h-48 object-cover "
            />
            <div className="p-5">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-black hover:text-[#aa4528] transition-colors duration-300 block text-center"
              >
                {link.title}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* User Initiatives Section */}
      <div className="mt-12 p-6 bg-[#faf9f6] rounded-lg shadow-md">
        <h2 className="text-3xl font-extrabold text-[#aa4528] text-center mb-8">
          Initiatives Created by Users
        </h2>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {initiatives.length > 0 ? (
            initiatives.map((ini, index) => (
              <li
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transform transition-transform hover:-translate-y-1"
              >
                <h3 className="text-xl font-semibold text-black text-center hover:underline mb-4 hover:transition duration-300">
                  {ini.title.length > 25 ? `${ini.title.slice(0, 25)}...` : (ini.title)};
                </h3>
                <div className="mb-3 flex justify-between">
                  <p className="text-sm font-semibold text-gray-600">Date Created: {new Date(ini.date).toLocaleDateString()}</p>

                  <p className="text-gray-800 font-semibold">Members Joined: {ini.members}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-600">Purpose:</p>
                  <p className="text-gray-800">{ini.purpose.length > 20 ? `${ini.purpose.slice(0, 20)}...` : (ini.purpose)}</p>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-600">Description:</p>
                  <p className="text-gray-800">{ini.desc.length > 30 ? `${ini.desc.slice(0, 30)}...` : (ini.desc)}</p>
                </div>

                <h6 className="text-lg font-semibold text-gray-800 mb-3">Contact Details</h6>
                <div className="mb-3">
                  <p className="text-sm font-semibold text-gray-600 ">Email: {ini.email}</p>
                </div>

                <div className="mb-3">
                  <p className="text-sm font-semibold text-gray-600">Phone: +91 {ini.phone}</p>
                </div>



                <button
                  onClick={() => {
                    localStorage.setItem('selectedinitiativeId', ini._id);
                    localStorage.setItem('selectedinitiativeEmail', ini.email);
                    setActive('seeDetails');
                  }}
                  className="bg-black text-white py-2 px-4 rounded-md hover:bg-[#aa4528] transition duration-300 w-full"
                >
                  See Details
                </button>
              </li>
            ))
          ) : (
            <p className="text-gray-600 text-lg col-span-full text-center">
              No initiatives found! An error occurred.
            </p>
          )}
        </ul>
      </div>

      {/* Modal */}
      {active && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="p-6 w-full max-w-md">
            {render()}
          </div>
        </div>
      )}
    </div>

  );
};

export default Initiatives;
