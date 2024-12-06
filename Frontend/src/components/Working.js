import React from "react";

function Working() {
  return (
    <div className="max-h-fit bg-[#f2f1ed] flex flex-col items-center pt-10  px-4 md:px-10">
      {/* Header */}
      <div className="inline-flex items-center justify-center w-full my-8">
        <hr className="w-full h-1 bg-[#d5bd8d] border-0" />
        <div className="flex items-center justify-center space-x-2 mx-4">
          <span className="w-2 h-2 bg-[#d5bd8d] rounded-full"></span>
          <span className="w-4 h-4 bg-[#d5bd8d] rounded-full"></span>
          <span className="w-2 h-2 bg-[#d5bd8d] rounded-full"></span>
        </div>
        <hr className="w-full h-1 bg-[#d5bd8d] border-0" />
      </div>

      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
          Start Your Fundraiser Today
        </h1>
        <p className="text-gray-600 mt-4 text-lg md:text-xl">
          Follow these simple steps to create a successful campaign.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between max-w-7xl w-full space-y-8 lg:space-y-0">

        <div className="flex-1 flex flex-col items-center lg:mx-8 ">
          <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6  ">
            <div className="p-6 bg-white rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Create Your FundRaiser</h3>
              <p className="text-gray-600 mt-2">
                Fill in the details about your fundraiser including title, description,
                and goal amount by clicking Start Fundraiser button.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Documents for verifications</h3>
              <p className="text-gray-600 mt-2">
                Always keep documents for verifications so that prople can trust you .
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Receive Donations</h3>
              <p className="text-gray-600 mt-2">
                Track your progress and manage donations directly from your
                the Profile section.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Withdraw Anytime</h3>
              <p className="text-gray-600 mt-2">
                You can Withdraw the raised money anytime and it will be transferred in your registered bank account in 1 hour.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="inline-flex items-center justify-center w-full my-8">
        <hr className="w-full h-1 bg-[#d5bd8d] border-0" />
        <div className="flex items-center justify-center space-x-2 mx-4">
          <span className="w-2 h-2 bg-[#d5bd8d] rounded-full"></span>
          <span className="w-4 h-4 bg-[#d5bd8d] rounded-full"></span>
          <span className="w-2 h-2 bg-[#d5bd8d] rounded-full"></span>
        </div>
        <hr className="w-full h-1 bg-[#d5bd8d] border-0" />
      </div>
    </div>
  );
}

export default Working;
