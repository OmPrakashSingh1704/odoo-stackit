import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function UserLogin() {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const  handleSubmit = async (e) => {
    e.preventDefault();
    // Add login logic here
    

    const result = await loginUser(formData.username, formData.password);


    if (result.success) {
      setMessage('Login successful!');
      localStorage.setItem('token', result.token);
      navigate('/'); // Redirect to home page
    } else {
      setMessage(`Login failed: ${result.error}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-200 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          User Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-gray-600 font-medium">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-600 font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-xl hover:bg-indigo-700 transition duration-300"
          >
            Login
          </button>
        </form>
        {/* <p className="text-center text-sm text-gray-500 mt-4">
          Forgot your password? <a href="#" className="text-indigo-600 hover:underline">Reset here</a>
        </p> */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account? <Link to={"/signup"} className="text-indigo-600 hover:underline">Sign up </Link>
        </p>
      </div>
    </div>
  );
}
