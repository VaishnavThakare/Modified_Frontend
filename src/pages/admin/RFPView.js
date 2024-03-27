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
    const [display, setDisplay] = useState("none");
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

        fetchRFPById();

    }, [id]);

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
                            <p>
                                <strong>Title : &nbsp;</strong>{RfpData.title}
                            </p>
                            <p>
                                <strong>Project Name :  &nbsp;</strong>{RfpData.project.name}
                            </p>
                            <p>
                                <strong>Category : &nbsp;</strong>{RfpData.vendorCategory.name}
                            </p>
                            <p>
                                <strong>End Date : &nbsp;</strong> {new Date(RfpData.endDate).toLocaleDateString("es-CL")}
                            </p>
                            <p>
                                <strong>Document : &nbsp;</strong>
                                <a href={RfpData.documentPath} target="_blank">
                                    <FontAwesomeIcon
                                        icon={faFileDownload}
                                        className="text-cyan-600 text-xl"
                                    />
                                </a>
                            </p>
                        </div>

                        <br />
                        <br />
                        <br />
                    </>
                ) : (
                    <p>Loading RFP details...</p>
                )}
            </div>

            <div style={{ 'display': display }} className="absolute top-[110px] right-[60px] grid grid-rows-2 bg-gray-500 w-[400px] h-[120px] p-[20px]">
                <input type="text" placeholder="Add comment here" className="w-full h-[30px] border border-solid border-black border-2 pl-2" />
                <div className="flex items-center justify-center">
                    <button className=" bg-red-400 w-[180px] h-[30px] rounded-[10px] border border-solid border-black">Reject</button>
                    <button className=" bg-red-400 w-[180px] h-[30px] ml-[5px] rounded-[10px] border border-solid border-black">Cancel</button>
                </div>
            </div>

        </>

    );
}
