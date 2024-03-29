import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {faEye} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function ChangePassword() {

  const [profile, setProfile] = useState({});
  const [view1,setView1] = useState(false);
  const [view2,setView2] = useState(false);
  const [view3,setView3] = useState(false);
  const [hide1,sethide1] = useState(true);
  const [hide2,sethide2] = useState(true);
  const [hide3,sethide3] = useState(true);  

  const setHidden = (h)=>{
    if(h == "hide1") sethide1(false);
    if(h == "hide2") sethide2(false);
    if(h == "hide3") sethide3(false);
  }

  const [modal,setModal] = useState({
    currentPassword:"",
    newPassword:"",
    confirmPassword:""
});


  const fetchData = async () => {
    try {
      const roles = sessionStorage.getItem("roles");  
      const sid = sessionStorage.getItem("sid");
      let res;
      if(roles === "Admin"){
        res = await axios.get(`${process.env.REACT_APP_API_URL}/Admin/${sid}`);
      }
      else if(roles === "Vendor"){
        res = await axios.get(`${process.env.REACT_APP_API_URL}/Vendor/${sid}`);
      }
      else if(roles === "ProjectHead"){
        res = await axios.get(`${process.env.REACT_APP_API_URL}/ProjectHead/${sid}`);
      }
      console.log(res.data);
      setProfile(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModal((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleView = (v)=>{
    if(v=="view1")setView1(!view1);
    if(v=="view2")setView2(!view2);
    if(v=="view3")setView3(!view3);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(modal);
    try {
        const roles = sessionStorage.getItem("roles");  
        const sid = sessionStorage.getItem("sid");
        let res;
        if(roles === "Admin"){
          res = await axios.post(`${process.env.REACT_APP_API_URL}/Admin/changePassword/${sid}`,modal);
          if(res.status == 200){
            toast.success("Password Changed",{
                position:"top-right"
              });
          }
          else{
            toast.error("error",{
                position:"top-right"
              });         
          }
        }
        else if(roles === "Vendor"){
            res = await axios.post(`${process.env.REACT_APP_API_URL}/Vendor/ChangePassword/${sid}`,modal);
            if(res.status == 200){
              toast.success("Password Changed",{
                  position:"top-right"
                });
            }
            else{
              toast.error("error",{
                  position:"top-right"
                });         
            }
        }
        else if(roles === "ProjectHead"){
            res = await axios.post(`${process.env.REACT_APP_API_URL}/ProjectHead/ChangePassword/${sid}`,modal);
            if(res.status == 200){
              toast.success("Password Changed",{
                  position:"top-right"
                });
            }
            else{
              toast.error("error",{
                  position:"top-right"
                });         
            }
        }
        console.log(res.data);
      } catch (error) {
        toast.error(error.response.data,{
            position:"top-right"
          }); 
        console.error("Error fetching data:", error.response.data);
      }
      finally{
        setModal({
            currentPassword:"",
            newPassword:"",
            confirmPassword:""
        });
      }
  };


  return (
    <div className="flex flex-col px-8 items-center justify-center">
      <div class={`w-full p-8 mt-7`}>
        <div class="grid grid-cols-1 mb-10">
          <div class="relative">
            <div class="w-30 h-30 mx-auto absolute inset-x-0 top-3 -mt-20 flex items-center justify-center text-indigo-500">
              <img
                className="object-cover w-40 h-40 rounded-full"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
              />
            </div>
          </div>
        </div>
        <div class="mt-20 text-center py-3">
          <h1 class="font-medium text-gray-700">
            <span class="font-medium text-4xl text-gray-500">
              {profile.name}
            </span>
          </h1>
        </div>


        <div className="mx-auto w-1/2 ">
          {/* <h2 className="text-2xl font-semibold mb-4">Login</h2> */}
          <form onSubmit={handleSubmit} className='border-2 border-cyan-500 p-8 shadow-lg rounded bg-white'>
            <div className="mb-6 relative">
              <input
                  type={view1?"text":"Password"}
                  id="currentPassword"
                  name="currentPassword"
                  onChange={(e)=>{handleChange(e);setHidden("hide1")}}
                  value={modal.currentPassword}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <button hidden={hide1} type="button"onClick={()=>toggleView("view1")} className="absolute -mt-8 ml-[93%] bg-zinc-50 w-5 h-5">
                <FontAwesomeIcon  icon={faEye} className="w-6 h-6  text-cyan-600"/>
              </button>
              <label
                htmlFor="currentPassword"
                className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Current Password
              </label>
            </div>

            <div className="mb-4 relative">
              <input
                  type={view2?"text":"Password"}
                  id="newPassword"
                  name="newPassword"
                  value={modal.newPassword}
                  onChange={(e)=>{handleChange(e);setHidden("hide2")}}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <button hidden={hide2}  type="button" onClick={()=>toggleView("view2")} className="absolute -mt-8 ml-[93%] bg-zinc-50 w-5 h-5">
                <FontAwesomeIcon  icon={faEye} className="w-6 h-6  text-cyan-600"/>
              </button>
              <label
                htmlFor="newPassword"
                className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                New Password
              </label>
            </div>

            <div className="mb-4 relative">
              <input
                  type={view3?"text":"Password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={modal.confirmPassword}
                  onChange={(e)=>{handleChange(e);setHidden("hide3")}}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <button hidden={hide3} type="button" onClick={()=>toggleView("view3")} className="absolute -mt-8 ml-[93%] bg-zinc-50  w-5 h-5">
                <FontAwesomeIcon  icon={faEye} className="w-6 h-6 text-cyan-600"/>
              </button>
              <label
                htmlFor="confirmPassword"
                className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
               Confirm Password
              </label>
            </div>

            <button            
              type="submit" // Change to "submit" if you have a form submission logic
              className="bg-cyan-400 text-white px-6 py-2 rounded-md w-[50%] mx-[25%]"            
            >
              Change Password
            </button>
          </form>
          </div>
        </div>

      <ToastContainer/>
    </div>
  );
}
