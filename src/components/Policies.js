import React from 'react';
import pdf1 from './pdf.png';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

function Policies() {

  const [pdocument, setdocument] = useState([
    {
      id:"1",
      name: "Policies1.pdf",
      documentPath: "",
      isActive: true
    },
    {
      id:"2",
      name: "Policies2.pdf",
      documentPath: "",
      isActive: true
    },
    {
      id:"3",
      name: "Policies3.pdf",
      documentPath: "",
      isActive: true
    }
  ]);

  const pdfs = ["Policies1.pdf", "Policies2.pdf", "Policies3.pdf", "Policies4.pdf", "Policies5.pdf"];

  const getAllDocuments = async () => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_API_URL}/PolicyDocument/All`);
     // console.log(res.data);
      let data = [];
      if(res.status == 200 && res.data!=null && res.data.length > 0 ){
        setdocument(res.data);
      }
     // console.log(pdocument);
    } catch (error) {
      console.error("Error fetching Project data:", error);
    }
    finally{
      console.log(pdocument);
    }
  };

  useEffect(()=>{
    getAllDocuments();
  },[]);

  return (
    <div className=" h-[300px] overflow-y-auto bg-white shadow-2xl py-3"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        "&::-webkit-scrollbar": { display: "none" },
        "&:hover::-webkit-scrollbar": { display: "initial" }
      }}
    >
       
      <div className="flex flex-wrap justify-center w-full h-[300px] pb-[10px] ">
        {
            pdocument.map((pdf, index) => (
            <div key={index} className="p-4 max-w-sm mx-2 my-0.5 bg-white rounded-xl shadow-2xl flex items-center h-20 w-full ">
              <div className="flex-shrink-0">
                <a href={pdf.documentPath} target="_blank">
                  <img className="h-12 w-12" src={pdf1} alt="PDF Logo" />
                </a>
              </div>
              <div className="flex flex-col ml-2">
                <div className="text-xl font-medium text-black">{pdf.name}</div>
                {/* <p className="text-gray-500">{pdf.name}</p> */}
              </div>
            </div>
          ))
        }
      </div>

    </div>
  );
}

export default Policies;