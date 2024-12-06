import React from 'react';
import med from "./images/medicines.jpeg";
import rf from "./images/relief.png";
import ed from "./images/education.jpg";
import others from './images/other.jpeg'

const ViewFundRaiser = ({ setActivesection }) => {
  const handleCategoryClick = (category) => {
    setActivesection(category);
  };

  return (
    <div className="donate-container max-w-6xl mx-10  mt-20 p-8 bg-[#f2f1ed] rounded-xl shadow-lg relative 
      h-[500px] overflow-y-auto ">
      <h1 className="donate-title lg:text-4xl md:text-3xl text-2xl mx-auto font-bold text-center mb-4 text-gray-900">
        What type of Funds would you like to donate?
      </h1>
      <p className="donate-subtitle sm:text-lg text-sm text-center mb-8 px-6 text-gray-600">
        We currently have four categories of funds. Choose one to make an impact.
      </p>

      <ul className="donate-options grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
        <li
          className="donate-option bg-[#faf9f6] shadow-lg rounded-lg transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
          onClick={() => handleCategoryClick('option1')}
        >
          <div className="donate-link block p-8 text-center cursor-pointer">
            <img
              src={ed}
              alt="Education"
              className="option-image w-24 h-24 mx-auto mb-6 rounded-full border-4 border-blue-100 hover:border-blue-200 transition-all duration-200"
            />
            <span className="option-text text-2xl font-semibold text-gray-800">
              Education
            </span>
            <p className="text-gray-500 text-sm mt-2">Support education initiatives to empower future generations.</p>
          </div>
        </li>

        <li
          className="donate-option bg-[#faf9f6] shadow-lg rounded-lg transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
          onClick={() => handleCategoryClick('option2')}
        >
          <div className="donate-link block p-8 text-center cursor-pointer">
            <img
              src={rf}
              alt="Relief Funds"
              className="option-image w-24 h-24 mx-auto mb-6 rounded-full border-4 border-blue-100 hover:border-blue-200 transition-all duration-200"
            />
            <span className="option-text text-2xl font-semibold text-gray-800">
              Relief Funds
            </span>
            <p className="text-gray-500 text-sm mt-2">Aid communities affected by natural disasters and emergencies.</p>
          </div>
        </li>

        <li
          className="donate-option bg-[#faf9f6] shadow-lg rounded-lg transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
          onClick={() => handleCategoryClick('option3')}
        >
          <div className="donate-link block p-8 text-center cursor-pointer">
            <img
              src={med}
              alt="Medicines"
              className="option-image w-24 h-24 mx-auto mb-6 rounded-full border-4 border-blue-100 hover:border-blue-200 transition-all duration-200"
            />
            <span className="option-text text-2xl font-semibold text-gray-800">
              Medicines
            </span>
            <p className="text-gray-500 text-sm mt-2">Provide essential medicines to those in need of healthcare support.</p>
          </div>
        </li>

        <li
          className="donate-option bg-[#faf9f6] shadow-lg rounded-lg transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
          onClick={() => handleCategoryClick('others')}
        >
          <div className="donate-link block p-8 text-center cursor-pointer">
            <img
              src={others}
              alt="Others"
              className="option-image w-24 h-24 mx-auto mb-6 rounded-full border-4 border-black transition-all duration-200"
            />
            <span className="option-text text-2xl font-semibold text-gray-800">
              Others
            </span>
            <p className="text-gray-500 text-sm mt-2">Other Funds including charity and more.</p>
          </div>
        </li>
      </ul>
    </div>

  );
};

export default ViewFundRaiser;
