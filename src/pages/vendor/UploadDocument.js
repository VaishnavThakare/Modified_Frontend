import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UploadDocument() {
  const [docs, SetDocs] = useState([]);
  const [File, setFile] = useState([]);
  const [fileName, SetFileName] = useState("");
  const [verified, setVerified] = useState(false);
  const [hide, sethide] = useState(false);

  const getVendor = async () => {
    try {
      const sid = sessionStorage.getItem("sid");
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/Vendor/${sid}`
      );
      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  };

  const validate = (dlist, vendor) => {
    var flag = 1;
    dlist.forEach((item, index) => {
      if (item.documentPath === null) {
        flag = 0;
      }
    });
    if (flag == 1) {
      sethide(true);
      setVerified(vendor.isVerified);
      console.log(vendor.isVerified);
    } else {
      sethide(false);
      setVerified(false);
    }
  };

  const getAllDocuments = async () => {
    let vendor;
    try {
      vendor = await getVendor();
      console.log(vendor);
      var dlist;
      if (vendor != null) {
        dlist = vendor.documentsUploadList;
        console.log(dlist.length);
        SetDocs(dlist);
        validate(dlist, vendor);
      } else {
        sethide(false);
        setVerified(false);
      }
    } catch (error) {
      alert("Error to fetch the data");
      console.log(error);
    }
  };

  const handleOnChange = (event) => {
    setFile(event.target.files[0]);
    SetFileName(event.target.files[0].name);
  };

  const handleOnSubmit = async (event) => {
    console.log(File);
    console.log(fileName);
    var did = event.target.getAttribute("data-key");
    console.log(did);
    if (File.length == 0) {
      toast.error("elect file to upload", {
        position: "top-center",
      });
    } else {
      console.log("submited");

      console.log("Button " + event.target.getAttribute("id"));
      console.log(
        document.getElementById(event.target.getAttribute("id")).disabled
      );
      // document.getElementById(event.target.getAttribute("id")).disabled=true;
      var btn = document.getElementById(
        String(Number(event.target.getAttribute("id")))
      );
      // console.log("Button "+String(Number(event.target.getAttribute("id"))+1));
      console.log(btn.disabled);
      btn.disabled = true;

      try {
        const formDataToSend = new FormData();
        formDataToSend.append("Document", File);
        formDataToSend.append("Id", did);

        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/Vendor/Doc`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(res.data);
        if (res.status == 200) {
          toast.success("Document Uploaded", {
            position: "top-right",
          });

          var vendor = await getVendor();
          console.log(vendor);
          var dlist;
          if (vendor != null) {
            dlist = vendor.documentsUploadList;
            console.log(dlist.length);
            SetDocs(dlist);
            validate(dlist, vendor);
          } else {
            sethide(false);
            setVerified(false);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setFile([]);
        SetFileName("");
      }
    }
  };

  useEffect(() => {
    getAllDocuments();
  }, []);

  return (
    <>
      {!hide && (
        <>
          <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8 mb-8">
            <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
              <table class="my-[15px] ml-[150px] border-collapse  border border-slate-400 mb-5">
                <thead className="bg-white">
                  <tr>
                    <th
                      colSpan={3}
                      className=" border- p-3   text-left"
                    >
                      Upload Following Documents
                    </th>
                  </tr>
                  <tr className=" text-gray-600">
                    <td colSpan="9" className=" px-4 py-1">
                      <div style={{ borderTop: "2px solid gray" }}></div>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {docs && docs.length > 0 ? (
                    docs.map((item, index) => {
                      return (
                        item.documentPath == null && (
                          <tr>
                            <td className=" border-slate-300   text-left pl-1 pr-1 py-1">
                              {item.documentName}
                            </td>
                            <td className=" border-slate-300    text-left pl-1 pr-1 py-1">
                              <input
                                type="file"
                                name="file"
                                onChange={handleOnChange}
                              />
                            </td>
                            <td className=" border-slate-300  font-serif font-bold text-left pl-1 pr-1 py-1">
                              <button
                                data-key={item.id}
                                id={index}
                                disabled={false}
                                name="btn"
                                className="disabled mx-3 px-5 bg-cyan-500 hover:bg-cyan-700 py-2 px-4 rounded-3xl"
                                onClick={handleOnSubmit}
                              >
                                Upload
                              </button>
                            </td>
                          </tr>
                        )
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={3}
                        className="border border-slate-300  font-serif font-bold text-left pl-1 pr-1"
                      >
                        No Records Found !!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      {hide && verified && (
        <>
          <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8 mb-8">
            <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
              <table
                align="center"
                className="my-[50px] border-collapse  border border-slate-400 mb-5"
              >
                <tbody>
                  <tr>
                    <td align="center">
                      <img
                        src={`${process.env.PUBLIC_URL}/verified.jpg`}
                        className="h-[200px] w-[200px]"
                      ></img>
                    </td>
                  </tr>
                  <tr>
                    <th className="text-green-700 italic">
                      VERIFICATION SUCCESSFULL
                    </th>
                  </tr>
                  <tr>
                    <th className="italic px-[10px] pb-[15px]">
                      You are a Verified Vendor. You can see the Proposals and
                      apply for RFP
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      {hide && !verified && (
        <>
          <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8 mb-8">
            <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
              <table
                align="center"
                className="my-[50px] border-collapse  border border-slate-400 mb-5"
              >
                <tbody>
                  <tr>
                    <td align="center">
                      <img
                        src={`${process.env.PUBLIC_URL}/pending.png`}
                        className="h-[200px] w-[200px]"
                      ></img>
                    </td>
                  </tr>
                  <tr>
                    <th className="text-red-700 italic">
                      VERIFICATION PENDING
                    </th>
                  </tr>
                  <tr>
                    <th className="italic px-[10px] pb-[15px]">
                      Your Verification is Pending. Your documents are under
                      scrunity.
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      <ToastContainer />
    </>
  );
}
export default UploadDocument;
