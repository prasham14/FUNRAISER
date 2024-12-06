import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaDownload, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";

function DocOfFunds({ setIsDocument }) {
  const [documents, setDocuments] = useState([]);
  const [viewPdf, setViewPdf] = useState(null);
  const token = localStorage.getItem('token');
  useEffect(() => {
    fetchUserDocuments();
  }, []);
  const fundId = localStorage.getItem('selectedFundId')
  const fetchUserDocuments = async () => {
    try {
      const response = await axios.get(`https://mernfr.onrender.com/doc/get-user-files/${fundId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }

      });
      setDocuments(response.data.data);
    } catch (error) {
      console.error("Error fetching user documents:", error);
    }
  };
  const navigate = useNavigate();
  const handleBack = () => {
    setIsDocument('');
  }

  const downloadDocument = async (fileName) => {
    try {
      const response = await axios.get(`https://mernfr.onrender.com/doc/download/${fileName}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'blob' // Important for handling file downloads
      });

      // Create a URL and download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName); // File name for download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading document:", error);
    }
  };


  return (

    <div className="fixed z-50 w-full mr-10 p-6 bg-black bg-opacity-80 rounded-lg shadow-lg h-full flex justify-center items-center">
      <div className="max-w-lg mx-auto p-8 rounded-lg bg-white shadow-lg relative">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Documents</h2>
        <button
          onClick={handleBack}
          className="absolute top-4 right-4 text-black hover:text-[#aa4528] transition duration-150 flex items-center"
        >
          <ImCross size={15} />
        </button>
        {documents.length === 0 ? (
          <p className="text-gray-600 text-center">No documents uploaded yet.</p>
        ) : (
          <div>
            <ul className="space-y-4">
              {documents.map((doc) => (
                <li
                  key={doc._id}
                  className="flex items-center justify-between p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{doc.title}</p>
                    <p className="sm:text-sm text-xs text-gray-600">{doc.pdf.length > 10 ? `${doc.pdf.slice(0, 20)}...` : (doc.pdf)}</p>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setViewPdf(`https://mernfr.onrender.com/doc/files/${doc.pdf}`)}
                      className="btn btn-view text-blue-500 hover:text-blue-700 transition"
                    >
                      <FaEye size={20} />
                    </button>
                    <button
                      onClick={() => downloadDocument(doc.pdf)}
                      className="btn btn-download text-black hover:text-[#aa4528] transition"
                    >
                      <FaDownload size={20} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {viewPdf && (
          <div className="modal fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center">
            <div className="relative bg-white rounded-lg shadow-lg p-8 w-11/12 md:w-2/3 lg:w-1/2">
              <button
                onClick={() => setViewPdf(null)}
                className="absolute top-2 right-4 text-red-500 font-bold"
              >
                Close
              </button>
              <iframe
                src={viewPdf}
                title="PDF Viewer"
                className="w-full h-96 border rounded"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>

  );
}

export default DocOfFunds;
