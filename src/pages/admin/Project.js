import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [filterOn, setFilterOn] = useState("");
  const [filterVal, setFilterVal] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [editingProject, setEditingProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const getData = async () => {
    try {
      let url = `${process.env.REACT_APP_API_URL}/Project/All`;

      if (filterOn === "all") {
        fetchProjectData();
      } else if (filterOn && filterVal) {
        url += `?filterOn=${filterOn}&filterVal=${filterVal}`;
      }

      const response = await axios.get(url);
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching Project data:", error);
    }
  };

  const fetchProjectData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/Project/All`
      );

      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching Project data:", error);
    }
  };

  useEffect(() => {
    // Fetch project data when the component mounts
    fetchProjectData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = projects.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleChange = (event) => {
    if (event.target.name === "filterOn") {
      setFilterOn(event.target.value);
    } else if (event.target.name === "filterVal") {
      setFilterVal(event.target.value);
    }
    getData();
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(projects.length / itemsPerPage))
    );
  };

  const handleViewDetails = (projectId) => {
    const selectedProject = projects.find((proj) => proj.id === projectId);
    setSelectedProject(selectedProject);
  };
  const navigate = useNavigate();
  const { projectId } = useParams();

  const handleEditDetails = (projectId) => {
    // Redirect to EditVGrnDetails page with the grnId as a parameter
    navigate(`/admin/projects/${projectId}`);
  };

  // View
  const DetailsView = ({ grnDetails, onCancel }) => {
    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       const response = await axios.get(
    //         `https://localhost:7254/api/Invoice/GRN/${grnDetails.id}`
    //       );
    //       setCurrentItems(response.data); // Set currentItems to the response data
    //     } catch (error) {
    //       toast.error("Failed to fetch data from the API");
    //     }
    //   };

    //   fetchData();
    // }, [grnDetails.id]);

    // PurchaseOrder Table Functions
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedItem, setSelectedItem] = useState(null);
    const navigate = useNavigate();
    const itemsPerPage = 5;
    const [purchaseOrders, setPurchaseOrders] = useState([]);

    useEffect(() => {
      fetchPurchaseOrders();
    }, []);

    const fetchPurchaseOrders = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/PurchaseOrder/Project/${grnDetails.id}`
        );
        setPurchaseOrders(response.data);
      } catch (error) {
        console.error("Error fetching purchase orders:", error.message);
        toast.error("Failed to fetch purchase orders");
      }
    };

    const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
    const indexOfLastItem = currentPage * itemsPerPage;
    const currentItems = purchaseOrders.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

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
      <div>
        <div className="flex justify-between">
          <div>
            <div className="flex text-2xl font-bold text-gray-500 ">
              <h2 className="text-left text-cyan-500">PROJECT DETAILS</h2>
            </div>
            <div className="w-52 bg-cyan-500 h-0.5 mb-1"></div>
            <div className="w-96 bg-cyan-500 h-0.5 mb-5"></div>
          </div>
          <div>
            <button
              className="mt-4 bg-cyan-500 text-white px-4 py-2 rounded block mx-auto"
              onClick={onCancel}
            >
              Close
            </button>
          </div>
        </div>
        <div className="min-w-full border-2 border-cyan-500 rounded-lg mb-5 bg-white">
          <div
            className="bg-white p-6 rounded-md shadow-md "
            style={{ height: "fit-content" }}
          >
            <p className="text-gray-900 mb-3">
              <span className="font-bold">Name</span>: {grnDetails.name}
            </p>
            <p className="text-gray-900 mb-3">
              <span className="font-bold">Project Head Name</span>:{" "}
              {grnDetails.projectHeadName}
            </p>
            <p className="text-gray-900 mb-3">
              <span className="font-bold">Created On</span>:{" "}
              {formatDateTime(grnDetails.createdOn)}
            </p>
            {/* <p className="text-gray-900">
              <span className="font-bold">Status</span>:{" "}
              {grnDetails.isApproved ? "Approved" : "Rejected"}
            </p>
            <p>
              <td className="py-2">
                <span className="font-bold">Shipment Status:</span>
              </td>
              <td className="py-2">
                {grnDetails.shipmentStatus ? (
                  <span className="flex items-center">
                    <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-xl">
                      Shipment Complete
                      <FontAwesomeIcon
                        icon={faPlane}
                        className="ml-2 text-blue-500"
                      />
                    </div>
                  </span>
                ) : (
                  <span className="flex items-center">
                    <div className="bg-red-100 text-red-800 px-2 py-1 rounded-xl">
                      Partial Shipment
                      <FontAwesomeIcon
                        icon={faTruck}
                        className="ml-2 text-red-500"
                      />
                    </div>
                  </span>
                )}
              </td>
            </p> */}
            <p className="text-gray-900">
              <span className="font-bold">Description</span>:{" "}
              {grnDetails.description}
            </p>
          </div>
        </div>

        <br></br>
        <br></br>

        <br></br>

        {/* Purchase Order table code starts */}
        <div className="flex text-2xl font-bold text-gray-500">
          <h2 className="text-left text-cyan-500">ALL PURCHASE ORDERS</h2>
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
                  Purchase <p></p>Order No.
                </th>
                <th className="px-4 py-2 text-center ">
                  Vendor <p></p>Name
                </th>
                <th className="px-4 py-2 text-center ">
                  Release <p></p> On
                </th>
                <th className="px-4 py-2 text-center ">
                  Accepted <p></p>On
                </th>
                <th className="px-4 py-2 text-center ">
                  PO <p></p>Amount
                </th>
                <th className="px-4 py-2 text-center ">Status</th>
                <th className="px-4 py-2 text-center ">Comments</th>
                <th className="px-4 py-2 text-center ">Actions</th>
              </tr>
              <tr className=" text-gray-600">
                <td colSpan="9" className=" px-4 py-1">
                  <div style={{ borderTop: "2px solid gray" }}></div>
                </td>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item.orderNo} className="bg-white">
                  <td className="px-4 py-2 text-center text-sm">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="px-4 py-2">{item.orderNo}</td>
                  <td className="px-4 py-2 text-center text-sm">
                    {item.vendorId}
                  </td>
                  <td className="px-4 py-2 text-center text-sm">
                    {item.releaseDate}
                  </td>
                  <td className="px-4 py-2 text-center text-sm">
                    {item.project.createdOn}
                  </td>
                  <td className="px-4 py-2 text-center text-sm">
                    {item.orderAmount}
                  </td>
                  <td className="px-4 py-2 text-center text-sm">
                    <button
                      className={`py-1 px-2 text-center text-sm rounded ${
                        item.isAccepted
                          ? "bg-green-200 text-green-700"
                          : "bg-red-200 text-red-600"
                      }`}
                      style={{ minWidth: "6rem" }}
                    >
                      {item.isAccepted ? "Accepted" : "Rejected"}
                    </button>
                  </td>
                  <td className="px-4 py-2 text-center text-sm">
                    {item.purchaseOrderHistories &&
                    item.purchaseOrderHistories.length > 0
                      ? item.purchaseOrderHistories[0].comment
                      : "-"}
                  </td>

                  <td className="px-4 py-2 text-center text-sm bg-zinc-50">
                    <button className={`mr-2`}>
                      <FontAwesomeIcon
                        icon={faEye}
                        className={`text-cyan-600 text-xl`}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Purchase Order table code ends */}
      </div>
    );
  };
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
    <div className="relative bg-zinc-50">
      {selectedProject ? (
        <DetailsView
          grnDetails={selectedProject}
          onCancel={() => setSelectedProject(null)}
        />
      ) : (
        // : editingGrn ? (
        //   <EditDetailsView
        //     grn={grns.find((grn) => grn.id === editingGrn)}
        //     onSave={handleSaveEdit}
        //     onCancel={handleCancelEdit}
        //   />
        // )
        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8 mb-8">
          <div className="align-middle inline-block min-w-full  overflow-hidden bg-zinc-50  px-8 pt-3 rounded-bl-lg rounded-br-lg">
            <div className="flex text-2xl font-bold text-gray-500">
              <h2 className="text-left text-cyan-500">PROJECT LIST</h2>
            </div>
            <div className="w-1/5 bg-cyan-500 h-0.5 mb-1"></div>
            <div className="w-1/3 bg-cyan-500 h-0.5 mb-5"></div>
            <div className="searchFilter">
              <select
                id="filterOn"
                name="filterOn"
                value={filterOn}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 inline w-50 p-2 "
              >
                <option value="all">All</option>
                <option value="projectStatus">Project Status</option>
                <option value="projectHead">Project Head</option>
              </select>
              <input
                type="text"
                id="filterVal"
                name="filterVal"
                value={filterVal}
                onChange={handleChange}
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 inline w-50 p-2"
                placeholder="Enter filter value"
              />
            </div>
            <div className="shadow-lg">
              <div className="rounded-lg border-2 border-cyan-500 bg-zinc-50 p-0.5 shadow-xl">
                <table className="min-w-full  bg-white">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-center leading-4 text-gray-600 tracking-wider">
                        Sr.No
                      </th>
                      <th className="px-6 py-3 text-center leading-4 text-gray-600 tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-center  leading-4 text-gray-600 tracking-wider">
                        Project Head Name
                      </th>
                      <th className="px-6 py-3 text-center leading-4 text-gray-600 tracking-wider">
                        Project Status
                      </th>
                      <th className="px-6 py-3 text-center leading-4 text-gray-600 tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-center leading-4 text-gray-600 tracking-wider">
                        Created On
                      </th>
                      <th className="px-4 py-2 text-center leading-4 text-gray-600 tracking-wider">
                        ACTION
                      </th>
                    </tr>
                    <tr className="text-gray-600">
                      <td colSpan="8" className="px-4 py-1">
                        <div style={{ borderTop: "2px solid gray" }}></div>
                      </td>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {currentItems.length === 0 ? (
                      <tr>
                        <td
                          colSpan="7"
                          className="px-6 py-4 text-center text-sm whitespace-no-wrap"
                        >
                          No data available
                        </td>
                      </tr>
                    ) : (
                      currentItems.map((proj, index) => (
                        <tr key={proj.id}>
                          <td className="px-6 py-4 text-center text-sm whitespace-no-wrap">
                            <div className=" leading-5 text-gray-600">
                              {index + 1}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center text-sm whitespace-no-wrap">
                            <div className=" leading-5 text-gray-600">
                              {proj.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center text-sm whitespace-no-wrap">
                            <div className=" leading-5 text-gray-600">
                              {proj.projectHeadName}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center text-sm whitespace-no-wrap">
                            <div className="leading-5 text-gray-600">
                              <span className="bg-green-300 text-green-600  font-medium me-2 px-2.5 py-0.5 rounded">
                                {proj.projectStatus}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center text-sm whitespace-no-wrap">
                            <div className="leading-5 text-gray-600">
                              {proj.description}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center text-sm whitespace-no-wrap">
                            <div className="leading-5 text-gray-600">
                              {new Date(proj.createdOn).toLocaleDateString(
                                "es-CL"
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-2 flex flex-row justify-center ">
                            <button
                              className="mr-2"
                              onClick={() => handleEditDetails(proj.id)}
                            >
                              <FontAwesomeIcon
                                icon={faEdit}
                                className="text-cyan-600 text-xl"
                              />
                            </button>
                            <button
                              className="mr-2"
                              onClick={() => handleViewDetails(proj.id)}
                            >
                              <FontAwesomeIcon
                                icon={faEye}
                                className="text-cyan-600 text-xl"
                              />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      {!selectedProject && !editingProject && (
        <div className="flex justify-end mt-2 ml-2 mr-2">
          <button
            onClick={handlePrevPage}
            className="pagination-button bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-3xl"
            disabled={currentPage === 1}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="pagination-icon" />
            Previous
          </button>
          <button
            onClick={handleNextPage}
            className="pagination-button bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-3xl ml-2"
            disabled={currentPage === Math.ceil(projects.length / itemsPerPage)}
          >
            Next
            <FontAwesomeIcon icon={faArrowRight} className="pagination-icon" />
          </button>
        </div>
      )}
    </div>
  );
}
