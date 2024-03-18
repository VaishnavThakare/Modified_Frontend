import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function UploadDocument(){

    const [docs,SetDocs] = useState([]);
    const [File,setFile] = useState([]);
    const [fileName,SetFileName] = useState("");
    
    const getAllDocuments= async ()=>{
        try{
            const sid = sessionStorage.getItem("sid");
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/Vendor/${sid}`);
            var dlist = res.data.documentsUploadList;
            console.log(dlist.length);
            SetDocs(dlist);
        }
        catch(error){
            alert("Error to fetch the data");
            console.log(error);
        }
    }

    const handleOnChange = (event)=>{
        setFile(event.target.files[0]);
        SetFileName(event.target.files[0].name);       
    }

    const handleOnSubmit= async (event)=>{
        console.log(File);
        console.log(fileName);
        var did = event.target.getAttribute('data-key');
        console.log(did);
        if(File.length==0){
            toast.error("elect file to upload",{
                position:"top-center"
              });
        }
        else{
            console.log("submited");

            console.log("Button "+event.target.getAttribute("id"));
            console.log(document.getElementById(event.target.getAttribute("id")).disabled);
            // document.getElementById(event.target.getAttribute("id")).disabled=true;
            var btn = document.getElementById(String(Number(event.target.getAttribute("id"))));
            // console.log("Button "+String(Number(event.target.getAttribute("id"))+1));
            console.log(btn.disabled);
            btn.disabled=true;

            try{

                const formDataToSend = new FormData();
                formDataToSend.append('Document', File);
                formDataToSend.append('Id', did);

                const res = await axios.post(`${process.env.REACT_APP_API_URL}/Vendor/Doc`,formDataToSend, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                  });
                console.log(res.data);
                if(res.status==200){
                    toast.success("Document Uploaded",{
                        position:"top-right"
                      });
                }
            }
            catch(error){
                console.log(error);
            }
            finally{
                setFile([]);
                SetFileName("");
            }
        }
    }

    useEffect(()=>{
        getAllDocuments();
    },[]);

    return(
        <>
        <div className="grid grid-rows-2 place-items-center z-30">

            <div className="flex items-center justify-center mt-[180px] ">
                <table class="mt-[5px] ml-[150px] border-collapse  border border-slate-400">
                    <thead className="bg-blue-500">
                        <tr>
                            <th colSpan={3} className="border border-blue-500 p-3 font-serif font-bold text-left">Upload Following Documents</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                            docs && docs.length > 0 ?
                            docs.map((item,index)=>{
                                return(
                                    item.documentPath == null && 
                                    <tr>
                                        <td className="border border-slate-300  font-serif font-bold text-left pl-1 pr-1 py-1">
                                            {item.documentName}
                                        </td>
                                        <td className="border border-slate-300  font-serif font-bold text-left pl-1 pr-1 py-1">
                                            <input type="file" name="file" onChange={handleOnChange}/>
                                        </td>                      
                                        <td className="border border-slate-300  font-serif font-bold text-left pl-1 pr-1 py-1">
                                            <button data-key={item.id} id={index} disabled={false} name="btn" className="disabled mx-3 px-5 bg-blue-400 border border-blue-500"  onClick={handleOnSubmit}>Upload</button>
                                        </td>                                    
                                    </tr>                                
                                );
                            })
                            :
                            <tr>
                                <td colSpan={3} className="border border-slate-300  font-serif font-bold text-left pl-1 pr-1">
                                    No Records Found !!
                                </td>
                            </tr>
                        }                
                    </tbody>
                </table>
            </div>
        </div>
        <ToastContainer/>
    </>
    );
}
export default UploadDocument;