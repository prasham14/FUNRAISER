import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaDownload, FaEye } from "react-icons/fa";

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const fundId = localStorage.getItem("selectedFundId");

  // Fetch all documents on component mount
  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://funraiser.onrender.com/doc/get-user-files/${fundId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },

          }
        ); // Adjust API endpoint as necessary
        setDocuments(response.data.data);
      } catch (err) {
        console.error('Error fetching documents:', err);
        setError('Failed to fetch documents. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  // Handle download
  // const handleDownload = async (fileId, fileName) => {
  //   try {
  //     const response = await axios.get(`http://localhost:5000/download/${fileId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },

  //     }, {
  //       responseType: 'blob', // Important for downloading binary data
  //     });

  //     // Create a URL for the file blob and trigger a download
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', fileName || 'document.pdf');
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();
  //   } catch (err) {
  //     console.error('Error downloading file:', err);
  //     alert('Failed to download file. Please try again later.');
  //   }
  // };

  if (loading) return <div>Loading documents...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="documents p-4 sm:p-8 ">
      <h2 className="text-2xl font-bold text-black mb-4">Documents</h2>
      {documents.length === 0 ? (
        <p className="text-red-600">No documents available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-[#f2f1ed]  shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-center">View</th>
                {/* <th className="px-4 py-2 text-center">Download</th> */}
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr
                  key={doc._id}
                  className="border-b last:border-none hover:bg-gray-50"
                >
                  <td className="px-4 py-2"> Untitled</td>
                  <td className="md:pl-24 pl- px-6 py-2 text-center">
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
                        handleDownload(doc.pdf.split('id=')[1], `${doc.title}.pdf`)
                      }
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      Download
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>

  );
};

export default Documents;
