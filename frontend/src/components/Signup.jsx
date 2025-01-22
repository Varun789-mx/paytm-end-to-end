import React, { useState } from "react";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    First_name: "",
    Last_name: "",
    Email: "",
    Mobile: "",
    Password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    fetch("http://localhost:4000/api/v1/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(() => {
        alert("user successfully signed up");
      })
      .catch((error) => {
        console.log("error in creating new user", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-4">
            <input
              type="text"
              name="First_name"
              placeholder="First Name"
              value={formData.First_name}
              onChange={handleChange}
              className="w-1/2 px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
              required
            />
            <input
              type="text"
              name="Last_name"
              placeholder="Last Name"
              value={formData.Last_name}
              onChange={handleChange}
              className="w-1/2 px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
              required
            />
          </div>
          <input
            type="Email"
            name="Email"
            placeholder="Email"
            value={formData.Email}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
            required
          />
          <input
            type="tel"
            name="Mobile"
            placeholder="Mobile Number"
            value={formData.Mobile}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
            required
          />
          <input
            type="Password"
            name="Password"
            placeholder="Password"
            value={formData.Password}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
            required
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
