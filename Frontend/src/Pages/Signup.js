import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handlelogin = () => {
    navigate('/login');
  }
  const handleSignup = async (e) => {
    e.preventDefault();
    // console.log('Request data:', { username, email, password });
    try {
      const response = await axios.post('https://funraiser-pvio.vercel.app/signup', {
        username,
        email,
        password,
      });
      // console.log('Response:', response);
      localStorage.setItem('token', response.data.token);
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data) {
        setError(error.response.data.error);
      } else {
        setError("An error occurred. Please try again later.");
      }
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
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          />
          {error && <div className="text-red-500 text-center mb-2">{error}</div>}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            Signup
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">Already Signed Up?</p>
        <button
          className="mt-2 w-full hover:underline hover:text-blue-500 focus:outline-none"
          onClick={handlelogin}
        >Login Here
        </button>
      </div>
    </div>

  );
};

export default Signup;
