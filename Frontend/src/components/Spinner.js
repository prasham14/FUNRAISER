import React from 'react';

const ImprovedLoader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f2f1ed]">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-[#aa4528] border-t-transparent rounded-full animate-spin"></div>
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin absolute top-2 left-2"></div>
        </div>
        <p className="mt-6 text-xl font-semibold text-gray-700">Loading ...</p>
      </div>
    </div>
  );
};

export default ImprovedLoader;