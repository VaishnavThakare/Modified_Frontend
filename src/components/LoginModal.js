// LoginModal.js
import React, { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginModal = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Implement your login logic here
    console.log('Logging in with:', username, password);
    // For simplicity, let's just close the modal after login attempt
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/Login`,
          { username, password }
        );

        if (response.data) {
          const authToken = response.data.jwtToken;
          const decodeToken = jwtDecode(authToken);
          const roles =
            decodeToken[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ];
          const sid =
            decodeToken[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"
            ];
          sessionStorage.setItem("sid", sid);
          sessionStorage.setItem("authToken", authToken);
          sessionStorage.setItem("roles", roles);

          switch (roles) {
            case "Vendor":
              navigate("/vendor");
              break;
            case "Admin":
              navigate("/admin");
              break;
            case "ProjectHead":
              navigate("/projecthead");
              break;
            default:
              break;
          }
        } else {
          setError("Login failed. Please provide valid credentials.");
        }
      } catch (error) {
        console.error("Error during login:", error);
        setError("An unexpected error occurred. Please try again.");
      }
      finally{
        onClose();
      }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 p-2 border rounded-md w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 border rounded-md w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="button" // Change to "submit" if you have a form submission logic
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
        <button
          type="button"
          className="mt-4 text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
