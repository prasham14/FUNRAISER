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
      const response = await axios.get(`https://funraiser-pvio.vercel.app/doc/get-user-files/${fundId}`, {
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

  // const downloadDocument = async (fileName) => {
  //   try {
  //     const response = await axios.get(`https://funraiser-pvio.vercel.app/doc/download/${fileName}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       },
  //       responseType: 'blob' // Important for handling file downloads
  //     });

  //     // Create a URL and download the file
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', fileName); // File name for download
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   } catch (error) {
  //     console.error("Error downloading document:", error);
  //   }
  // };


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
          <p className="text-red-600">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full bg-[#f2f1ed] shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-center">View</th>
                  {/* <th className="px-4 py-2 text-center">Download</th> */}
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc._id} className="border-b last:border-none hover:bg-gray-50">
                    <td className="px-4 py-2">{doc.title || 'Untitled'}</td>
                    <td className="px-6 py-2 text-center">
                      <a
                        href={doc.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        <FaEye size={20} />
                      </a>
                    </td>
                    {/* <td className="px-4 py-2 text-center">
                      <button
                        onClick={() =>
                          handleDownload(doc.pdf.split('/').pop(), `${doc.title}.pdf`)
                        }
                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      >
                        <FaDownload size={16} />
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>

  );
}

export default DocOfFunds;
