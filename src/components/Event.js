import React from 'react';
import demo from './demo.jpg'
const Event= () => {
  return (
    // <div className="w-full max-w-2xl text-center mt-8">
    //     <img src={demo} alt="" className='h-35' />
    //     <h2 className="text-2xl font-bold mb-4">NEWS</h2>
    //     <p className="text-xl mb-8">Most Awaited Moment !!!</p>
    //     <h2 className="text-2xl font-bold mb-4">EVENTS</h2>
    //     <p className="text-xl mb-8">7 ANNIVERSARY HAPPY CELEBRATION Lets Celebrate 7th Anniversary</p>
    //   </div>
    <div className="container mr-10 ">
      
        <img src={demo} alt="" className='w-full h-40 mx-auto' />
        <h1 className='text-center font-semibold'>Event Title</h1>

        <p className="text-1xl text-gray-800 mb-4 px-6 py-2">

         Lorem ipsum dolor sit ametrepudiandae nesciunt labore us suscipit fuga ad recusandae. Consectetur 
        </p>
       
      
    </div>
      
  );
};

export default Event;