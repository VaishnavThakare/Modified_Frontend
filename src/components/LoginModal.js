// LoginModal.js
import React, { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

          toast.success("Logged In",{
            position:"top-right"
          });  


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
          toast.error("Login failed. Please provide valid credentials.",{
            position:"top-right"
          });
          setError("Login failed. Please provide valid credentials.");
        }
      } catch (error) {
        toast.error("An unexpected error occurred. Please try again.",{
          position:"top-right"
        });
        console.error("Error during login:", error);
        setError("An unexpected error occurred. Please try again.");
      }
      finally{
        onClose();
      }
  };

  return (
    <>
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-md w-96" style={{ border: '3px solid cyan' }}>
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={(e) => e.preventDefault()} className='appform'>
        <div className="mb-6 relative">
  <input
    type="text"
    id="username"
    name="username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    placeholder=" "
    required
  />
  <label
    htmlFor="username"
    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
  >
    User Id
  </label>
</div>

          <div className="mb-4 relative">
  <input
    type="password"
    id="password"
    placeholder=" "
    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />
  <label
    htmlFor="password"
    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
  >
    Password
  </label>
</div>

          <button
            type="button" // Change to "submit" if you have a form submission logic
            className="bg-cyan-400 text-white px-6 py-2 rounded-md"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
        <button
          type="button"
          className="mt-4 text-sm text-gray-500 hover:text-gray-700 font-semibold cursor-pointer"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
    <ToastContainer/>
    </>
  );
};

export default LoginModal;
