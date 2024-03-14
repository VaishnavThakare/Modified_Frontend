import React from 'react';
import pdf1 from './pdf.png';

function Policies() {
  const pdfs = ["Policies1.pdf", "Policies2.pdf", "Policies3.pdf", "Policies4.pdf", "Policies5.pdf"];

  return (
    <div className="max-h-60 overflow-y-auto"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        "&::-webkit-scrollbar": { display: "none" },
        "&:hover::-webkit-scrollbar": { display: "initial" }
      }}
    >
       
      <div className="flex flex-wrap justify-center">
      
        {pdfs.map((pdf, index) => (
          <div key={index} className="p-4 max-w-sm mx-2 my-0.5 bg-white rounded-xl shadow-md flex items-center h-20">
            <div className="flex-shrink-0">
              <img className="h-12 w-12" src={pdf1} alt="PDF Logo" />
            </div>
            <div className="flex flex-col ml-2">
              <div className="text-xl font-medium text-black">{pdf}</div>
              <p className="text-gray-500">You have a new message!</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Policies;