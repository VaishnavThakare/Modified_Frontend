import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faFileDownload,
  faArrowLeft,
  faArrowRight,
  faPlane,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";

const DocumentDetails = () => {
  const [vendorDetails, setVendorDetails] = useState(null);
  const [rejectId, setRejectId] = useState("");
  const [display, setDisplay] = useState("none");
  const [rComment, setComment] = useState("");
  const { id } = useParams();

  const fetchVendorDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/Vendor/${id}`
      );
      setVendorDetails(response.data);
    } catch (error) {
      console.error("Error fetching vendor details:", error);
    }
  };

  useEffect(() => {
    fetchVendorDetails();
    setDisplay("none");
  }, [id]);

  const handleApprove = async (event) => {
    const id = event.target.getAttribute("data-key");
    // alert(id)
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/Vendor/DocVerify`,
        {
          id: id,
          documentVerified: true,
          comment: "Approved",
        }
      );
      fetchVendorDetails();
      if (res.status == 200) {
        toast.success("Document Approved", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = (event) => {
    const id = event.target.getAttribute("data-key");
    // alert(id)
    setRejectId(id);
    setDisplay("grid");
  };

  const rejectCancel = () => {
    setDisplay("none");
  };

  const rejectComment = async (event) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/Vendor/DocVerify`,
        {
          id: rejectId,
          documentVerified: false,
          comment: rComment,
        }
      );
      fetchVendorDetails();
      if (res.status == 200) {
        toast.error("Document Rejected", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error);
    }

    setDisplay("none");
  };

  const openDocument = (path) => {
    window.open(path, "_blank");
  };

  return (
    <>
      <div className="container mx-auto my-8">
        {vendorDetails ? (
          <>
            <div className="mt-4 flex text-2xl font-bold text-gray-500">
              <h2 className="text-left text-cyan-500">VENDOR DETAILS</h2>
            </div>
            <div className="w-72 bg-cyan-500 h-0.5 mb-1"></div>
            <div className="w-80 bg-cyan-500 h-0.5 "></div>
            <div className="bg-white mt-3 border-2 border-cyan-500 p-4 w-1/2 rounded-lg shadow-lg">
              <p>
                <strong className="font-semibold text-sm text-transform: uppercase">
                  Vendor ID:
                </strong>{" "}
                {vendorDetails.id}
              </p>
              <p>
                <strong className="font-semibold text-sm text-transform: uppercase ">
                  Organization Name:
                </strong>{" "}
                {vendorDetails.organizationName}
              </p>
              <p>
                <strong className="font-semibold text-sm text-transform: uppercase">
                  Name:
                </strong>{" "}
                {vendorDetails.name}
              </p>
              <p>
                <strong className="font-semibold text-sm text-transform: uppercase">
                  Email:
                </strong>{" "}
                {vendorDetails.email}
              </p>
              <p>
                <strong className="font-semibold text-sm text-transform: uppercase">
                  Phone Number:
                </strong>{" "}
                {vendorDetails.phoneNumber}
              </p>
            </div>

            <br />
            <br />
            <br />
            <div className="mt-4 flex text-2xl font-bold text-gray-500">
              <h2 className="font-semibold text-left text-cyan-500">
                DOCUMENT DETAILS
              </h2>
            </div>
            <div className="w-72 bg-cyan-500 h-0.5 mb-1"></div>
            <div className="w-80 bg-cyan-500 h-0.5 mb-3"></div>

            <div className="shadow-xl">
              <div className="border-2 border-cyan-500 rounded-lg shadow-xl p-0.5">
                <table className="min-w-full p-4 mb-5 text-gray-600">
                  <thead>
                    <tr>
                      <th className=" font-semibold text-sm text-transform: uppercase px-6 py-3 border-b-2 border-gray-300 text-center leading-4 tracking-wider">
                        Document
                      </th>
                      <th className="font-semibold text-sm text-transform: uppercase px-6 py-3 border-b-2 border-gray-300 text-center leading-4 tracking-wider">
                        View
                      </th>
                      <th className="font-semibold text-sm text-transform: uppercase px-6 py-3 border-b-2 border-gray-300 text-center leading-4 tracking-wider">
                        Status
                      </th>
                      <th className="font-semibold text-sm text-transform: uppercase px-6 py-3 border-b-2 border-gray-300 text-center leading-4 tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendorDetails.documentsUploadList ? (
                      vendorDetails.documentsUploadList.map(
                        (document, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-no-wrap text-center">
                              {document.documentName}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap text-center">
                              {document.documentPath == null ? (
                                "not uploaded the document"
                              ) : (
                                <a href={document.documentPath} target="_blank">
                                  {document.documentName}
                                </a>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap text-center">
                              {document.isVerified ? "True" : "False"}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap text-center">
                              <button
                                data-key={document.id}
                                onClick={handleApprove}
                                className="bg-cyan-400 py-[3px] px-[5px]  rounded-[10px] border-2 border-cyan-500 shadow-md p-2"
                              >
                                Approve
                              </button>
                              <button
                                data-key={document.id}
                                onClick={handleReject}
                                className="ml-[10px] bg-gray-400 py-[3px] px-[5px]  rounded-[10px] border-2 shadow-md border-gray-400 p-2"
                              >
                                Reject
                              </button>
                            </td>
                          </tr>
                        )
                      )
                    ) : (
                      <tr>
                        <td colSpan="3" className="px-6 py-4 text-center">
                          No documents available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <p>Loading vendor details...</p>
        )}
      </div>

      <div
        style={{ display: display }}
        className="absolute top-[110px] right-[60px] grid grid-rows-2 bg-gray-500 w-[400px] h-[120px] p-[20px]"
      >
        <input
          type="text"
          onClick={(event) => {
            setComment(event.target.value);
          }}
          placeholder="Add comment here"
          className="w-full h-[30px] border border-solid border-black border-2 pl-2"
        />
        <div className="flex items-center justify-center">
          <button
            onClick={rejectComment}
            className=" bg-red-400 w-[180px] h-[30px] rounded-[10px] border border-solid border-black"
          >
            Reject
          </button>
          <button
            onClick={rejectCancel}
            className=" bg-red-400 w-[180px] h-[30px] ml-[5px] rounded-[10px] border border-solid border-black"
          >
            Cancel
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default DocumentDetails;
