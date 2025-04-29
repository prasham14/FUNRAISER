import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlelogin = () => {
    navigate('/login');
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('https://funraiser-pvio.vercel.app/signup', {
        username,
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data) {
        setError(error.response.data.error);
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f2f1ed]">
      <div className="bg-white shadow-lg rounded-lg p-8 md:w-1/3 w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Signup</h2>
        <form className="mt-4" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            disabled={loading}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            disabled={loading}
          />
          {error && <div className="text-red-500 text-center mb-2">{error}</div>}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105 relative"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="loader-container">
                  <div className="pulse-loader">
                    <div className="circle-1 bg-white"></div>
                    <div className="circle-2 bg-white"></div>
                    <div className="circle-3 bg-white"></div>
                  </div>
                </div>
                <span className="ml-2">Signing up...</span>
              </div>
            ) : (
              "Signup"
            )}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">Already Signed Up?</p>
        <button
          className="mt-2 w-full hover:underline hover:text-blue-500 focus:outline-none"
          onClick={handlelogin}
          disabled={loading}
        >
          Login Here
        </button>
      </div>

      <style jsx>{`
        .loader-container {
          display: inline-flex;
          align-items: center;
        }
        .pulse-loader {
          display: flex;
          align-items: center;
        }
        .pulse-loader div {
          width: 8px;
          height: 8px;
          margin: 0 2px;
          border-radius: 50%;
          animation: pulse 1.5s infinite ease-in-out;
        }
        .circle-1 {
          animation-delay: 0s !important;
        }
        .circle-2 {
          animation-delay: 0.2s !important;
        }
        .circle-3 {
          animation-delay: 0.4s !important;
        }
        @keyframes pulse {
          0%, 80%, 100% {
            transform: scale(0.6);
            opacity: 0.6;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Signup;