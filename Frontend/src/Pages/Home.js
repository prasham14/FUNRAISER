import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormSubmission from '../components/FundRaise';
import NGO from '../components/NGO';
import Option1 from '../components/Option1';
import Option2 from '../components/Option2';
import Option3 from '../components/Option3';
import ViewFundRaiser from '../components/ViewFundRaiser';
import MyInitiatives from '../components/MyInitiatives';
import MyFunds from '../components/MyFunds'
import CreateInitiative from '../components/CreateInitiative';
import Footer from '../components/Footer';
import Highlights from '../components/Highlights';
import Faqs from '../components/Faqs';
import SeeDetails from '../components/SeeDetails';
import Working from '../components/Working'
import NavBar from '../components/NavBar';
import im from '../components/images/mainpage.webp'
import Others from '../components/Others'
const Home = () => {
  const [activeSection, setActivesection] = useState(null);
  const [isFormClicked, setIsFormClicked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'));
  const navigate = useNavigate();
  function handleLogin() { navigate('/login'); }
  function handleFormSubmission() {
    isLoggedIn ? (setActivesection('seeDetails')) : (navigate('/login'))
    setIsFormClicked(true);

  }

  const renderContent = () => {
    if (activeSection) {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex justify-center items-center">
          {renderActiveComponent()}
        </div>
      );
    }
  };

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoggedIn(false);
        // localStorage.setItem('isLoggedIn', false);
        navigate('/');
      }
    };

    const interval = setInterval(checkToken, 24 * 60 * 60 * 1000); // 24 hours interval
    return () => clearInterval(interval); // Clear interval on component unmount
  }, [navigate]);

  const renderActiveComponent = () => {
    switch (activeSection) {
      case 'viewFundRaiser': return (<ViewFundRaiser activeSection={activeSection} setActivesection={setActivesection} />);
      case 'form': return (<FormSubmission activeSection={activeSection} setActivesection={setActivesection} />);
      case 'ngo': return (<NGO setActivesection={setActivesection} />);
      case 'option1': return <Option1 setActivesection={setActivesection} />;
      case 'option2': return <Option2 setActivesection={setActivesection} />;
      case 'option3': return <Option3 setActivesection={setActivesection} />;
      case 'createInitiatives': return (<CreateInitiative activeSection={activeSection} setActivesection={setActivesection} />);
      case 'getini': return (<MyInitiatives setActivesection={setActivesection} />);
      case 'myFunds': return (<MyFunds setActivesection={setActivesection} />);
      case 'seeDetails': return (<SeeDetails setActivesection={setActivesection} />);
      case 'others': return (<Others setActivesection={setActivesection} />)
      default: return <div><Home /></div>;
    }
  };
  const handleClick = () => {
    navigate('/signup');
  };
  return (
    <div className="font-sans ">
      <div className=" bg-[#f2f1ed] flex-grow">
        {renderContent()}
      </div>
      <div className="overflow-y-auto no-scrollbar">
        <div className="flex-1">
          <NavBar setActivesection={setActivesection} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <div className="flex  bg-[#f2f1ed] pt-28 gap-6 w-[100vw] ">
            {/* Main Content */}
            <div className="flex flex-col lg:flex-row items-center lg:justify-evenly  w-[90%] mx-auto  ">
              {/* Text Section */}
              <div className="text-center md:text-left max-w-3xl px-4">
                <h1 className=" font-sans text-5xl md:text-6xl font-bold text-black mb-4">
                  Fundraising, Simplified
                </h1>
                <div>
                  <p className="text-gray-700 text-lg md:text-xl mb-8 max-w-2xl mx-auto mt-5 font-sans">
                    Create your fundraiser and rally support for your cause in just a few steps. Empower your community to make a difference and turn compassion into action. Share your story, connect with donors, and watch how small contributions create a big impact. Whether it’s for education, healthcare, or a personal cause, every effort counts. Start today and inspire others to join your mission for change.
                  </p>
                </div>
                {isLoggedIn ? (
                  <button className='bg-[#aa4528] text-white py-3 px-8 rounded-sm transition duration-300 ease-in-out transform hover:scale-105 mb-10 font-sans' onClick={isLoggedIn ? (handleFormSubmission) : (handleLogin)}>
                    Start a Fund Raiser Now !
                  </button>
                ) : (
                  <button
                    onClick={handleClick}
                    className="bg-[#aa4528] text-white py-3 px-10 rounded-sm  transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    Get Started Now
                  </button>
                )}
              </div>
              {/* Image Section */}
              <div className="bg-no-repeat mt-7 bg-right-top md:h-[600px] max-h-[500px] bg-[length:40%] flex flex-col">
                <img
                  src={im}
                  alt="Fundraising"
                  className="h-[90%] object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
          <div >
            <Working />
            <Highlights />
            <Faqs />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home;