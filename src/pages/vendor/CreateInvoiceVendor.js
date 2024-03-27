import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateInvoiceVendor() {
  const [formData, setFormData] = useState({
    InvoiceNo: "",
    Amount: "",
    GRNId: "",
    GRNNo:"",
    PaymentStatus: false,
    DueDate: "",
    Document: null,
  });

  const [POS, setPOS] = useState([]);
  const [poId, setPOID] = useState("");
  const [grnNumbers, setGRNNumbers] = useState([]);

  const getAllGRNNumbers = async (e) => {
    console.log(e.target.value);
    if(e.target.value == ""){
      setGRNNumbers([]);
    }
    else{
      try {
        const grnRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/GRN/PurchaseOrder/${e.target.value}`
        );
        setGRNNumbers(grnRes.data);
        console.log(grnRes.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchPO = async () => {
    try {
      var id = sessionStorage.getItem('sid');
      var res = await axios.get(`https://localhost:7254/api/PurchaseOrder/Vendor/${id}`);
      if (res.status === 200)
        setPOS(res.data);
    }
    catch (error) {
      console.log("Error : ", error.message);
    }
  }

  useEffect(() => {
    fetchPO();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, Document: event.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted:", formData);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("InvoiceNo", formData.InvoiceNo);
      formDataToSend.append("Amount", parseInt(formData.Amount));
      formDataToSend.append("GRNId", formData.GRNId);
      formDataToSend.append("PaymentStatus", false);
      formDataToSend.append("DueDate", formData.DueDate);
      formDataToSend.append("Document", formData.Document);

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/Invoice/Add`,
        formDataToSend
      );
      console.log("Response:", res.data);
      if(res.status === 200 || res.data!=null || res.data.length > 0){
        toast.success("Invoice created and sent");   
        setFormData({
          InvoiceNo: "",
          Amount: "",
          GRNNO: "",
          PaymentStatus: false,
          DueDate: "",
          Document: null,
        });
        document.getElementById("grnId").value="";
        document.getElementById("purchaseOrder").value="";     
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Error creating invoice");
    }
  };

  return (
    <div className="align-middle inline-block min-w-full  overflow-hidden bg-zinc-50 px-8 py-3 pb-8 rounded-bl-lg rounded-br-lg">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg margin-left mt-1 appform bg-white"
      >
        <div className="flex text-2xl font-bold text-gray-500 mb-5 justify-center">
          <h2>Create Invoice</h2>
        </div>
        <div className="mb-6 relative">
          <input
            type="number"
            id="invoiceNo"
            name="InvoiceNo"
            value={formData.InvoiceNo}
            onChange={handleInputChange}
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="invoiceNo"
            className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
          >
            Invoice No
          </label>
        </div>

        <div className="mb-6 relative">
          <label
            htmlFor="purchaseOrder"
            className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-77 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
          >
            Po :
          </label>
          <select
            id="purchaseOrder"
            name="purchaseOrder"
            onChange={getAllGRNNumbers}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder=""
            required
          >
            <option value="">Select PO </option>
            {POS.map((po) => (
              <option key={po.id} value={po.id}>
                {po.orderNo}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6 relative">
          <label
            htmlFor="poId"
            className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-77 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
          >
            GRN :
          </label>
          <select
            id="grnId"
            name="GRNId"
            value={formData.GRNId}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder=""
            required
          >
            <option value="">Select GRN </option>
            {grnNumbers.map((grn) => (
              <option key={grn.id} value={grn.id}>
                {grn.grnNo}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6 relative">
          <label
            htmlFor="dueDate"
            className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-77 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
          >
            Due Date:
          </label>
          <input
            type="date"
            id="dueDate"
            name="DueDate"
            value={formData.DueDate}
            onChange={handleInputChange}
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            required
          />
        </div>
        <div className="mb-6 relative">
          <label
            htmlFor="document"
            className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-77 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
          >
            Document:
          </label>
          <input
            type="file"
            id="document"
            name="Document"
            onChange={handleFileChange}
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            required
          />
        </div>
        <div className="mb-6 relative">
          <input
            type="number"
            id="Amount"
            name="Amount"
            value={formData.Amount}
            onChange={handleInputChange}
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="Amount"
            className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
          >
            Amount
          </label>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateInvoiceVendor;
