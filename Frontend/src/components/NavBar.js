import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from '../components/Profile';
import { CgProfile } from "react-icons/cg";
import { CgMenuRightAlt } from "react-icons/cg";
const NavBar = ({ setActivesection, isLoggedIn, setIsLoggedIn }) => {
  const [isFormClicked, setIsFormClicked] = useState(false);
  const navigate = useNavigate();
  function handleViewFundRaiser() {
    isLoggedIn ? (setActivesection('viewFundRaiser')) : (navigate('/login'))
  }

  function handleContactSupport() {
    navigate('/help');
  }
  function handleInitiatives() {
    isLoggedIn ? (navigate('/initiatives')) : (navigate('/login'));
  }
  function handleSignUp() {
    navigate('/signup');
  }

  function handleLogin() {

    navigate('/login');

  }
  function handleFormSubmission() {
    isLoggedIn ? (setActivesection('form')) : (navigate('/login'))
    setIsFormClicked(true);

  }
  function handleHome() {
    setActivesection('');
  }
  function handleNgo() {

    isLoggedIn ? (navigate('/ngos')) : (navigate('/login'))
  }
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileRef]);

  return (
    <div className="flex flex-col bg-[#f2f1ed] overflow-hidden">
      <div className="navbar w-full bg-[#f2f1ed] fixed top-0 z-50 flex justify-between items-center px-8 py-4 ">
        <nav className="navbar-nav flex items-center justify-between w-full">
          {/* Logo and Title Section */}
          <div className='flex gap-6 sm:justify-evenly justify-between  items-center sm:mx-20  '>

            <div className="flex space-x-4 ">

              <h1 onClick={() => { setActivesection('') }} className="text-xl  font-bold text-black hover:text-gray-700 transition duration-300 cursor-pointer pr-8">
                FundRaiser
              </h1>
            </div>

            <button
              className="hidden md:block items-center justify-center hover:underline text-black leading-[1.75] h-10 px-2 py-2 transition-all duration-300"
              onClick={handleHome}
            >
              Home
            </button>
            {/* Start Fundraiser Button */}
            {isLoggedIn && (
              <button
                className="hidden md:block items-center justify-center  text-black hover:underline leading-[1.75] h-10 px-2 py-2  transition-all duration-300"
                onClick={handleFormSubmission}
              >
                Start a Fundraiser
              </button>
            )}

            {/* Help Button */}
            <button
              onClick={handleContactSupport}
              className="hidden md:block items-center justify-cente text-black hover:underline leading-[1.75] h-10 px-2 py-2  transition-all duration-300"
            >
              Help
            </button>
          </div>

          {/* Action Buttons and Profile/Menu Section */}
          <div className="flex items-center sm:space-x-6 space-x-2 fixed right-3">
            {/* Profile Section */}
            <div className="relative flex items-center space-x-4" ref={profileRef}>
              {isLoggedIn ? (
                <div className='relative' >
                  <button
                    className="inline-flex items-center justify-center text-black font-medium leading-[1.75] h-10 sm:px-4 px-0 py-2  transition-all duration-300"
                    onClick={toggleProfile}

                  >
                    <CgProfile className="text-2xl" />
                  </button>
                  {isProfileOpen && (
                    <div className="absolute top-12 right-0 w-[300px]  text-white  p-4">
                      <div>
                        <Profile
                          isLoggedIn={isLoggedIn}
                          setIsLoggedIn={setIsLoggedIn}
                          setActivesection={setActivesection}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button
                    className=" md:block hidden items-center text-center text-black leading-[1.75] px-4 py-1  transition-all duration-300 border border-black hover:bg-[#a4a3a0] font-semibold rounded-md"
                    onClick={handleSignUp}
                  >
                    Signup
                  </button>
                  <button
                    className="md:block hidden items-center text-center text-white font-semibold leading-[1.75] px-4 py-1  transition-all duration-300 border bg-black border-black hover:text-black hover:bg-[#a4a3a0]  rounded-md"
                    onClick={handleLogin}
                  >
                    LogIn
                  </button>
                </>
              )}
            </div>

            {/* Menu Section */}
            <div className="relative pr-2" ref={menuRef}>
              <button
                className="inline-flex items-center justify-center  text-[#aa4528] font-medium leading-[1.75] h-10 sm:px-4 px-1 py-2 transition-all duration-300 "
                onClick={toggleMenu}
              >
                <CgMenuRightAlt fontSize="1.45rem" />
              </button>

              {isMenuOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-[#faf9f6]  border border-gray-200 shadow-lg rounded-lg p-2 text-gray-700 space-y-2">
                  <li>
                    <button
                      onClick={handleViewFundRaiser}
                      className="w-full text-left hover:bg-white py-2 px-4 rounded-lg transition duration-200"
                    >
                      View Fundraisers
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleInitiatives}
                      className="w-full text-left hover:bg-white py-2 px-4 rounded-lg transition duration-200"
                    >
                      Initiatives
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleNgo}
                      className="w-full text-left hover:bg-white py-2 px-4 rounded-lg transition duration-200"
                    >
                      NGO's
                    </button>
                  </li>


                  <li>
                    {isLoggedIn && (
                      <button
                        className=" block md:hidden w-full text-left hover:bg-white py-2 px-4 rounded-lg transition duration-200"
                        onClick={handleFormSubmission}
                      >
                        Start a Fundraiser
                      </button>
                    )}
                  </li>

                  <li>
                    <button
                      onClick={handleContactSupport}
                      className=" block md:hidden w-full text-left hover:bg-white py-2 px-4 rounded-lg transition duration-200"
                    >
                      Help
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default NavBar;
