import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {ToastContainer,toast} from 'react-toastify';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    toast("Logged In");
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

        toast.success("logged in ...");
        alert("logged in ...");
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
        alert("Login failed. Please provide valid credentials.");
        toast.error("Login failed. Please provide valid credentials.");
        setError("Login failed. Please provide valid credentials.");
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error during login:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };


  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");

  const togglePassword =()=>{
    if(passwordType==="password")
    {
     setPasswordType("text")
     return;
    }
    setPasswordType("password")
  }

  return (
    <>
    <div>

        <div class="py-2 px-6 bg-cyan-200 flex items-center justify-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
            
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Welcome to Vendor Portal
            </h2>
      
        </div>
    
    
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Login
              </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="username" className="sr-only">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm my-5"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
    
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Login
                </button>
              </div>
            </form>
            {error && (
              <p className="mt-2 text-center text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
          </div>
        </div>
    </div>

      <ToastContainer></ToastContainer>
    </>
  );
};

export default Login;