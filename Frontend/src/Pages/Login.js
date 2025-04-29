import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup');
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await axios.post('https://funraiser-pvio.vercel.app/login', {
        email,
        password
      }, { withCredentials: true });

      if (response && response.data) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('email', email);
        localStorage.setItem('userId', response.data.user.id);
        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f2f1ed]">
      <div className="bg-white shadow-lg rounded-lg p-8 md:w-1/3 w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Login</h2>
        <form className="mt-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Type Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            disabled={isLoading}
          />

          {error && <div className="text-red-500 text-center mb-2">{error}</div>}

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="loader-dots">
                  <div className="dot-1"></div>
                  <div className="dot-2"></div>
                  <div className="dot-3"></div>
                </div>
                <span className="ml-2">Logging in...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>

          <p className="mt-4 text-center text-black">Don't have an Account?</p>
          <button
            type="button"
            onClick={handleSignUp}
            className="mt-2 w-full hover:underline hover:text-blue-500 focus:outline-none"
            disabled={isLoading}
          >
            Sign Up
          </button>
        </form>
      </div>

      <style jsx>{`
        .loader-dots {
          display: inline-flex;
          align-items: center;
        }
        .loader-dots div {
          width: 8px;
          height: 8px;
          margin: 0 2px;
          background-color: white;
          border-radius: 50%;
          animation: pulse 1.5s infinite ease-in-out;
        }
        .dot-1 {
          animation-delay: 0s !important;
        }
        .dot-2 {
          animation-delay: 0.2s !important;
        }
        .dot-3 {
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

export default Login;