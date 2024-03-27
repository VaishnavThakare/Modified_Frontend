import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faEdit,
    faFileDownload,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";

export default function RFPView() {
    const { id } = useParams();
    const [rfpDetails, setRfpDetails] = useState(true);
    const [applications, setApplications] = useState([]);
    const [RfpData, setRfpData] = useState(
        {
            title: "",
            vendorCategory: {
                name: ""
            },
            project: {
                name: ""
            }
        }
    );
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRFPById = async () => {
            try {
                const response = await axios.get(
                    `https://localhost:7254/api/RFP/${id}`
                );
                setRfpData(response.data);
            } catch (error) {
                console.error("Error fetching project details:", error);
            }
        };

        const fetchApplications = async ()=>{
            try{
                const response = await axios.get(
                    `https://localhost:7254/api/RFPApplication/RFP/${id}`
                );
                setApplications(response.data);
                console.log(response.data);
            }
            catch(error){
                console.error("Error fetching project details:", error);
            }
        }
        
        fetchApplications();
        fetchRFPById();

    }, [id]);

    const formatDateTime = (dateTime) => {
        const formattedDateTime = new Date(dateTime).toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        return formattedDateTime;
      };

    return (
        <>
            <div className="container mx-auto my-8">
                {rfpDetails ? (
                    <>

                        <div className="mt-4 flex text-2xl font-bold text-gray-500">
                            <h2 className="text-left text-cyan-500">RFP Details</h2>
                        </div>
                        <div className="w-72 bg-cyan-500 h-0.5 mb-1"></div>
                        <div className="w-80 bg-cyan-500 h-0.5 "></div>
                        <div className="absolute left-[92%] -mt-10">
                            <button
                                onClick={() => { navigate("/admin/rfp") }}
                                className="text-right bg-cyan-600 hover:bg-cyan-700  text-white font-bold py-2 px-4 rounded"
                            >
                                Close
                            </button>
                        </div>
                        <div className="bg-white mt-3 border-2 border-cyan-500 p-4 w-1/2 rounded-lg shadow-lg">
                            <table className="w-[50%]">
                                <tr>
                                    <th align="left">Title : </th>
                                    <td align="left" className="ml-3">{RfpData.title}</td>
                                </tr>
                                <tr>
                                    <th align="left">Project Name : </th>
                                    <td align="left" className="ml-3">{RfpData.project.name}</td>
                                </tr>
                                <tr>
                                    <th align="left">Category : </th>
                                    <td align="left" className="ml-3">{RfpData.vendorCategory.name}</td>
                                </tr>
                                <tr>
                                    <th align="left">End Date: </th>
                                    <td align="left" className="ml-3">{formatDateTime(RfpData.endDate)}</td>
                                </tr>
                                <tr>
                                    <th align="left">Document : </th>
                                    <td align="left" className="ml-3">
                                        <button className="text-blue-700">
                                            <a href={RfpData.documentPath} target="_blank">
                                                {RfpData.title}
                                                <FontAwesomeIcon
                                                    icon={faFileDownload}
                                                    className="text-cyan-600 text-xl"
                                                />
                                            </a>
                                        </button>
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <div className="flex text-2xl mt-10 font-bold text-gray-500">
                            <h2 className="text-left text-cyan-500">ALL Applications</h2>
                        </div>
                        <div className="w-1/5 bg-cyan-500 h-0.5 mb-1"></div>
                        <div className="w-1/3 bg-cyan-500 h-0.5 mb-5"></div>
                        <div className=" overflow-x-auto border-2 border-cyan-500 mb-5 shadow-lg rounded-lg p-1">
                            <table className="table-auto w-full 0 bg-white">
                                <thead>
                                    <tr className="text-gray-600">
                                        <th className="px-4 py-2 text-center ">
                                            Sr.<p></p> No.
                                        </th>
                                        <th className="px-4 py-2 text-center ">
                                            RFP 
                                        </th>
                                        <th className="px-4 py-2 text-center ">
                                            Vendor 
                                        </th>
                                        <th className="px-4 py-2 text-center ">
                                            Applied Date
                                        </th>
                                        <th className="px-4 py-2 text-center ">
                                            Due Date
                                        </th>
                                        <th className="px-4 py-2 text-center ">
                                            RFP<p></p>Document
                                        </th>
                                        <th className="px-4 py-2 text-center ">
                                            Received Application
                                        </th>
                                        <th className="px-4 py-2 text-center ">Comments</th>
                                    </tr>
                                    <tr className=" text-gray-600">
                                        <td colSpan="9" className=" px-4 py-1">
                                            <div style={{ borderTop: "2px solid gray" }}></div>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    applications && applications.length > 0 ?
                                    applications.map((app,index)=>{
                                        return (
                                        <tr>
                                            <td align="center">{index+1}</td>
                                            <td align="center">{app.rfp.title}</td>
                                            <td align="center">{app.vendorName}</td>
                                            <td align="center">{formatDateTime(app.createdOn)}</td>
                                            <td align="center">{formatDateTime(app.rfp.endDate)}</td>
                                            <td align="center">
                                            <button>
                                                <a href={app.documentPath} target="_blank">
                                                    View Doc
                                                </a>
                                                </button>
                                            </td>
                                            <td align="center">
                                            <button>
                                                <a href={app.rfp.documentPath} target="_blank">
                                                    View Doc
                                                </a>
                                                </button>                                                
                                            </td>
                                            <td align="center">{app.comment}</td>
                                        </tr>
                                        );
                                    })
                                    :
                                    <tr>
                                        <td  align="center" colSpan={8}>
                                             No Applicatios Received !! 
                                        </td>
                                    </tr>
                                }
                                </tbody>
                            </table>
                        </div>

                        <br />
                        <br />
                        <br />
                    </>
                ) : (
                    <p>Loading RFP details...</p>
                )}
            </div>

        </>

    );
}
