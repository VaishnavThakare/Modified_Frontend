import React from 'react';
import pdf1 from './pdf.png';

function Policies() {
  const pdfs = ["Policies1.pdf", "Policies2.pdf", "Policies3.pdf", "Policies4.pdf", "Policies5.pdf"];

  return (
    <div className="max-h-60 overflow-y-auto">
       
      <div className="flex flex-wrap justify-center">
      
        {pdfs.map((pdf, index) => (
          <div key={index} className="p-6 max-w-sm mx-4 my-4 bg-white rounded-xl shadow-md flex items-center">
            <div className="flex-shrink-0">
              <img className="h-12 w-12" src={pdf1} alt="PDF Logo" />
            </div>
            <div className="flex flex-col">
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
