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
      const response = await axios.post('https://mernfr.onrender.com/login', {
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
      setIsLoading(false);

    } catch (error) {

      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f2f1ed]">
      {
        isLoading ? (null) : (
          <div className="bg-white shadow-lg rounded-lg p-8 md:w-1/3 w-full">
            <h2 className="text-2xl font-semibold text-center text-gray-700">Login</h2>
            <form className="mt-4" onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Type Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md "
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md "
              />

              {error && <div className="text-red-500 text-center mb-2">{error}</div>} {/* Display error here */}

              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                Login
              </button>

              <p className="mt-4 text-center text-black">Don't have an Account ? </p>
              <button
                type="button"
                onClick={handleSignUp}
                className="mt-2 w-full hover:underline hover:text-blue-500 focus:outline-none"
              >
                Sign Up
              </button>
            </form>
          </div>
        )
      }
    </div>
  );
};

export default Login;
