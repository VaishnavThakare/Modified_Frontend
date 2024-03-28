import axios from "axios";
import React, { useEffect, useState } from "react";

export default function VendorDash() {
  const [rfp, setrfp] = useState(0);
  const [rfpCat, setRfpCat] = useState(0);
  const [verifyVendor,setVerify] = useState(false);

  const getVendor = async()=>{
    const id = sessionStorage.getItem('sid');
    console.log(id)
;
    try{
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/Vendor/${id}`
      );
      console.log(response.data);
      setVerify(response.data.isVerified);
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    const getAllCount = async () => {
      try {
        const rfpRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/RFP/All`
        );

        setrfp(rfpRes.data.length);

        const sid = sessionStorage.getItem("sid");
        const vendorCatRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/Vendor/${sid}`
        );

        const catId = vendorCatRes.data.vendorCategory.id;
        const rfpCatRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/RFP/VendorCategory/${catId}`
        );

        setRfpCat(rfpCatRes.data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getVendor();
    getAllCount();
  }, []);

  return (
    <>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div class="bg-white rounded-md border-2 border-cyan-500 p-6 shadow-lg shadow-black/5">
          <div class="flex justify-between mb-6">
            <div>
              <div class="flex items-center mb-1">
                <div class="text-2xl font-semibold">{rfp}</div>
              </div>
              <div class="text-sm font-medium text-gray-400">
                Request for Proposal
              </div>
            </div>
          </div>

          {
            verifyVendor ? 
            <a            
            href="/vendor/rfp"
            class="text-cyan-300 font-medium text-sm hover:text-cyan-800"
          >
            View
          </a>
          :
          <>View</>
          }


        </div>
        <div class="bg-white rounded-md border-2 border-cyan-500 p-6 shadow-lg shadow-black/5">
          <div class="flex justify-between mb-6">
            <div>
              <div class="flex items-center mb-1">
                <div class="text-2xl font-semibold">{rfpCat}</div>
              </div>
              <div class="text-sm font-semibold font-medium text-gray-400">
                RFP for Your Category
              </div>
            </div>
          </div>

          {
            verifyVendor ? 
            <a
            href="rfp"
            class="text-cyan-500 font-medium text-sm hover:text-cyan-800"
          >
            View
          </a>
          :
          <>View</>
          }


        </div>
      </div>
    </>
  );
}