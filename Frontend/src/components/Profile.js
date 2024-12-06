import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CiLogout } from "react-icons/ci";
import { CiEdit } from "react-icons/ci"
import SeeDetails from './SeeDetails';
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom';
function Profile({ setIsLoggedIn, setActivesection }) {
  const [username, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [profileImage, setProfileImage] = useState('');
  const [isChangeEmail, setIsChangeEmail] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [isDetailsAdded, setIsDetailsAdded] = useState(false);
  const navigate = useNavigate();
  const [newData, setNewData] = useState({
    username: '',
    email: '',
    image: ''
  });
  const [isEmailChange, setIsEmailChange] = useState(false);
  const id = localStorage.getItem('email');
  const handleMyDonations = () => {
    navigate('/myDonations')
  }
  useEffect(() => {
    if (!id) {
      console.error('No email found in localStorage');
      return;
    }

    axios.get(`https://funraiser.onrender.com/getUser/${id}`, { withCredentials: true })
      .then((response) => {
        const userData = response.data.response;
        if (userData) {
          setName(userData.username);
          setEmail(userData.email);
          setProfileImage(userData.profileImage);
          setNewData({
            username: userData.username,
            email: userData.email
          });
        }
        else {
          console.error('No user data found in response.');
        }
      })
      .catch((error) => {
        console.log("Error fetching user details:", error);
      });
  }, [id]);

  const userId = localStorage.getItem('userId');
  const changeNameHandler = async () => {

    try {
      const res = await axios.put(`https://funraiser.onrender.com/UpdateName/${userId}`, { username: newData.username }, { withCredentials: true });
      setName(newData.username);
      setIsChange(false);
      toast.success("Username Updated")
    }

    catch (error) {
      toast.error("Username already Exists")
      console.error("Error updating name:", error)
    };
  };

  const changeEmailHandler = () => {
    let OTP = Math.floor(1000 + Math.random() * 9000);
    localStorage.setItem('otp', OTP);
    axios.patch(`https://funraiser.onrender.com/user/EmailVerify/${newData.email}/${OTP}`, { withCredentials: true })
      .then(() => {
        setIsChangeEmail(false);
        setIsEmailChange(true);
      })
      .catch(error => console.error("Error updating email:", error));
  };
  const onChangeHandler = (event) => {
    setNewData({
      ...newData,
      [event.target.name]: event.target.value
    });
  };

  const OTPHandler = (e) => {
    e.preventDefault();
    const otpValue = e.target[0].value;
    const storedOtp = localStorage.getItem('otp');
    if (otpValue === storedOtp) {
      toast.success("Email Verified Successfully!");
      setIsEmailChange(false);
      axios.patch(`https://funraiser.onrender.com/user/editEmail/${email}`, { email: newData.email }, { withCredentials: true }).then(() => {
        setEmail(newData.email);
      });
    } else {
      toast.error("Incorrect OTP. Try again.");
    }
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    setActivesection('');
  }
  const handleSeeDetails = () => {
    setActivesection('seeDetails');
    <SeeDetails isDetailsAdded={isDetailsAdded} setIsDetailsAdded={setIsDetailsAdded} />
  }
  const handleMyFunds = () => {
    navigate('/myFunds');
  }
  const handleMyInitiatives = () => {
    navigate('/myInitiatives')
  }

  return (
    <div className="w-full p-6 bg-[#f2f1ed] shadow-lg rounded-xl border border-gray-700 relative">
      <div className="absolute top-6 left-4 flex items-center space-x-4 text-black ">
        <button
          onClick={handleLogout}
          className="p-2 bg-white rounded-full hover:bg-gray-500 transition shadow-md"
        >
          <CiLogout className="text-lg" />
        </button>
      </div>
      <div>
        <h1 className="text-3xl font-semibold text-black text-center items-center">Profile</h1>
      </div>
      <div className="pt-3 space-y-6 mt-2">
        {/* Name Section */}
        <div>
          <h2 className="text-md font-semibold text-black">Name:</h2>
          <div className="flex items-center">
            {isChange ? (
              <input
                type="text"
                name="username"
                value={newData.username}
                onChange={onChangeHandler}
                className=" text-black bg-[#faf9f6] border border-gray-600 rounded-lg px-3 py-2 transition w-36"
              />
            ) : (
              <p className="text-black text-md flex-grow">{username || 'Loading...'}</p>
            )}
            {isChange ? (
              <button
                onClick={changeNameHandler}
                className="ml-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-[#aa4528] transition shadow-md"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsChange(true)}
                className="ml-4 px-4 py-2  text-black "
              >
                <CiEdit fontSize="1.45rem" />
              </button>
            )}
          </div>
        </div>

        {/* Email Section */}
        <div>
          <h2 className="text-md font-semibold text-black ">Email:</h2>
          <div className="flex items-center justify-between">
            {isChangeEmail ? (
              <input
                type="email"
                name="email"
                value={newData.email}
                onChange={onChangeHandler}
                className="flex-grow text-black bg-[#faf9f6] border border-gray-600 rounded-lg px-3 py-2 w-36 transition"
              />
            ) : (
              <p className="text-black flex-grow text-md truncate" style={{ maxWidth: 'calc(100% - 6rem)' }}>
                {email || 'Loading...'}
              </p>
            )}
            {isChangeEmail ? (
              <button
                onClick={changeEmailHandler}
                className="ml-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-[#aa4528] transition shadow-md"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsChangeEmail(true)}
                className="ml-4 px-4 py-2 text-black rounded-lg "
              >
                <CiEdit fontSize="1.45rem" />
              </button>
            )}
          </div>
        </div>

        {/* Email Verification Section */}
        {isEmailChange && (
          <div>
            <h2 className="text-lg font-semibold text-black mb-2">Verify Email:</h2>
            <form onSubmit={OTPHandler} className="flex space-x-4">
              <input
                type="text"
                placeholder="Enter OTP"
                className="flex-grow text-black bg-[#faf9f6] border border-gray-600 rounded-lg px-3 py-2 w-36 transition"
              />
              <button
                type="submit"
                className="ml-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-[#aa4528] transition shadow-md"
              >
                Verify
              </button>
            </form>
          </div>
        )}

        {/* Additional Details Section */}
        <div>
          {!isDetailsAdded ? (
            <button
              onClick={handleSeeDetails}
              className="text-black underline hover:text-[#aa4528] transition text-center ml-7"
            >
              Add personal details
            </button>
          ) : (
            <div></div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleMyInitiatives}
            className="w-full text-left px-4 py-2 text-white bg-black rounded-lg hover:bg-[#aa4528]  transition"
          >
            My Initiatives
          </button>
          <button
            onClick={handleMyFunds}
            className="w-full text-left px-4 py-2 text-white bg-black rounded-lg hover:bg-[#aa4528]  transition"
          >
            My Funds
          </button>
          <button
            onClick={handleMyDonations}
            className="w-full text-left px-4 py-2 text-white bg-black rounded-lg hover:bg-[#aa4528]  transition"
          >
            My Donations
          </button>
        </div>
      </div>
    </div >
  );
}
export default Profile;