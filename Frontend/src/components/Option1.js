import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft } from "react-icons/fa";
import UserDocuments from './UserDoc';
import { VictoryPie } from 'victory';
import ShowBankDetails from './ShowBankDetails';
import PaymentComponent from './PaymentPage';
import { toast } from 'react-toastify';
const Option1 = ({ setActivesection }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [funds, setFunds] = useState([]);
  const [selectedFund, setSelectedFund] = useState(null);
  const [isDoc, setIsDoc] = useState('');
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchFunds = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('https://funraiser.onrender.com/options/option1', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFunds(response.data);

      } catch (error) {
        console.error('Error fetching education funds', error);
      }
    };
    fetchFunds();
  }, [token]);

  const handleBankDetails = () => {
    localStorage.setItem('fundUserId', selectedFund.userId);
    setIsDoc('bankdetailsoffund');
  };

  const clickHandler = (fund) => {
    setSelectedFund(fund);
  };

  const fundId = localStorage.getItem('selectedFundId');

  const handleDonate = () => {
    setIsDoc('selected');
    toast.success('Scroll down for documents')
  };

  const goBackHandler = () => {
    setSelectedFund(null);
    setIsDoc('');
  };

  const handleBack = () => {
    setActivesection('viewFundRaiser');
  };

  const render = () => {
    switch (isDoc) {
      case 'selected':
        return <UserDocuments fundId={fundId} />;
      case 'bankdetailsoffund':
        return <ShowBankDetails setIsDoc={setIsDoc} />;
      case 'pay':
        return <PaymentComponent setIsDoc={setIsDoc} setActivesection={setActivesection} />
      default:
        return null;
    }
  };

  const isFundEndingSoon = (date) => {
    const today = new Date();
    const fundDate = new Date(date);
    const timeDiff = fundDate - today;
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
    return daysDiff > 0 && daysDiff <= 10;
  };

  // Chart data function
  const getChartData = (fund) => {
    const goalAmount = fund.funds || 0;
    const raisedAmount = fund.raised || 0;

    return [
      { x: 'Raised', y: raisedAmount },
      { x: 'Remaining', y: goalAmount - raisedAmount },
    ];
  };
  const funduserId = localStorage.getItem('fundUserId');
  const userId = localStorage.getItem('userId');
  const handlePay = () => {
    localStorage.setItem('fundUserId', selectedFund.userId);
    if (userId === funduserId) {
      toast.warning('This Fund is raised by you')
    }
    else {
      setIsDoc('pay')
    }

  }
  return (
    <div className=" w-[100vw] p-6 bg-opacity-75 rounded-lg shadow-lg mt-20  h-[100vh] flex justify-center items-center  ">

      {selectedFund ? (
        <div className="mx-4 p-8 bg-white max-h-[75%] overflow-y-auto no-scrollbar rounded-md ">
          <h1 className="sm:text-3xl text-xl font-bold mb-4 text-gray-900 text-center">{selectedFund.title}</h1>
          <div className=' flex justify-between items-center mb-8 flex-col lg:flex-row '>
            <div>
              <p className="mb-3 text-gray-700"><strong>Funds Available:</strong> {selectedFund.funds} INR</p>
              <p className="mb-3 text-gray-700"><strong>Amount Raised:</strong> {selectedFund.raised} INR</p>
              <p className="mb-3 text-gray-700"><strong>Phone Number:</strong> {selectedFund.phone}</p>
            </div>

            {localStorage.setItem('selectedFundId', selectedFund._id)}
            {selectedFund.isExpired && (
              <p className="text-red-500 font-bold text-lg">Expired</p>
            )}
            <div className="chart-container mr-3 w-24 relative">
              <VictoryPie
                data={getChartData(selectedFund)}
                innerRadius={100} // Makes it a donut chart
                colorScale={['rgb(170, 59, 40)', 'rgb(242, 241, 237)']} // Updated colors
                labels={() => ''} // Hides slice labels
                style={{
                  labels: { fill: 'gray', fontSize: 20, fontWeight: 'bold' },
                }}
              />
              {/* Central label showing percentage */}
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-800  font-bold text-xs"
                style={{ pointerEvents: 'none' }}
              >
                {selectedFund ? `${((selectedFund.raised / selectedFund.funds) * 100).toFixed(2)}%` : '0%'}
              </div>
            </div>
          </div>


          <div className='flex flex-col justify-between items-center sm:justify-start gap-3 sm:flex-row'>
            <button
              onClick={handleDonate}
              className="bg-black text-white py-2 px-4 rounded shadow-lg hover:bg-[#aa4528] transition-all duration-300 ease-in-out w-fit "
            >
              Documents
            </button>
            <button
              onClick={handlePay}
              className="bg-black text-white py-2 px-4 rounded shadow-lg hover:bg-[#aa4528] transition-all duration-300 ease-in-out w-fit"
            >
              Donate
            </button>
            <button
              className="bg-[#aa4528] text-white py-2 px-4 rounded shadow-lg hover:bg-black transition-all duration-300 ease-in-out w-fit"
              onClick={goBackHandler}
            >
              Go Back
            </button>
          </div>

          <div>{render()}</div>
        </div>
      ) : (
        <div className='md:w-[55%] max-w-5xl h-fit max-h-[75%] rounded-md no-scrollbar  overflow-y-auto p-6 bg-[#f2f1ed]'>
          <div onClick={handleBack} className='w-10 h-10 z-30 flex justify-center items-center'>
            <button className=" text-black cursor-pointer p-5 ">
              <FaArrowLeft />
            </button>
          </div>
          <h1 className="sm:w-[300px] w-[200px] mx-auto translate-y-[-40px] sm:text-4xl text-2xl  font-bold text-center  text-gray-900">Education Funds</h1>
          <ul className="">
            {funds.length > 0 ? (
              funds.map((fund, index) => (
                <li
                  key={index}
                  className="fund-card bg-[#faf9f6]  p-6 transition-transform transform hover:-translate-y-2 border border-black m-2 rounded-lg hover:shadow-2xl overflow-hidden "
                >
                  <h2 className="fund-title sm:text-2xl text-lg sm:font-semibold font-bold mb-3 text-gray-900">{fund.title}</h2>
                  <p className="mb-2 text-gray-700"><strong>Funds Available:</strong> {fund.funds} INR</p>
                  <p className="mb-2 text-gray-700"><strong>Amount Raised:</strong> {fund.raised} INR</p>
                  {isFundEndingSoon(fund.date) && (
                    null
                  )}
                  {fund.isExpired ? (
                    <p className="text-red-500 font-bold">Expired</p>
                  ) : (
                    <button
                      className="bg-black text-white py-2 px-4 rounded-lg shadow-lg hover:bg-[#aa4528] transition-all duration-300 ease-in-out w-fit"
                      onClick={() => clickHandler(fund)}
                    >
                      Click here for details
                    </button>
                  )}
                </li>
              ))
            ) : (
              <p className="text-center text-lg text-gray-700 col-span-full">
                No education funds found
              </p>
            )}
          </ul>
        </div>
      )
      }
    </div >
  );
};

export default Option1;
