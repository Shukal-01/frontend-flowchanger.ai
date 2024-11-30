import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useGlobalContext } from '../../../Context/GlobalContext';

const Documents = () => {

  const { baseUrl, selectedStaff, openToast } = useGlobalContext();
  const [staff, setStaff] = useState(null);

  const [uploadFileType, setUploadFileType] = useState('');
  const fileUploadTypes = [
    { name: "Aadhaar", file: "aadhaar" },
    { name: "Pan", file: "pan" },
    { name: "Driving License", file: "driving_license" },
    { name: "Voter ID", file: "voter_id" },
    { name: "UAN", file: "uan" },
    { name: "Address", file: "address" },
  ];

  const [documents, setDocuments] = useState([
    {
      type: "Salary Slip",
      fileName: "Salary Slip",
      isFolder: true,
      addedOn: null,
      data: "",
    },
    // {
    //   type: "Degree",
    //   fileName: "Screenshot 2024-11-07 103717.png",
    //   isFolder: false,
    //   addedOn: "12 Nov 2024",

    // },
  ]);
  function formattedDate(isoDate) {
    const date = new Date(isoDate);
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    };

    return date.toLocaleString("en-IN", options);
  }

  const getData = async (e) => {
    try {
      const response = await fetch(baseUrl + "staff/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const result = await response.json();
        // console.log(result);
        const filteredData = result?.find(item => item?.id === selectedStaff?.id);
        setStaff(filteredData);
        console.log("Filtered data by ID:", filteredData?.staffDetails?.staff_bg_verification);
        // console.log();
        setDocuments([...documents.filter(({ isFolder }) => isFolder === true), ...fileUploadTypes.map((item) => ({ type: item.name, fileName: item.name + " File", isFolder: false, addedOn: formattedDate(filteredData?.staffDetails?.staff_bg_verification?.updatedAt), data: filteredData?.staffDetails?.staff_bg_verification?.[item?.file + `_file`] }))]);
      } else {
        console.error("Failed to retrieve data:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
  };

  function downloadFile(url, filename) {
    // Check if URL is valid
    if (!url) {
      console.error('URL is required for downloading the file.');
      return;
    }
  
    // Create an anchor element
    const anchor = document.createElement('a');
    
    // Handle potential CORS issues (using Blob if necessary)
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then(blob => {
        const blobUrl = URL.createObjectURL(blob);
        anchor.href = blobUrl;
        anchor.target = '_blank';
        anchor.download = filename || 'downloaded_file';
        
        // Append the anchor element to the body and trigger the download
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        
        // Revoke the object URL after download to release resources
        URL.revokeObjectURL(blobUrl);
      })
      .catch(error => {
        console.error('There was an error with the file download:', error);
      });
  }
  


  useEffect(() => {
    getData();
  }, [])

  const fileInputRef = useRef(null);

  // Function to handle button click and open file input dialog
  const handleUploadClick = () => {
    fileInputRef.current.click(); // Trigger click on input type="file"
  };

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    setUploadFile(file);
    console.log("Selected file:", file);
  };



  const [uploadFile, setUploadFile] = useState(null);

  async function uploadingFile() {

    const newFormData = new FormData();

    newFormData.append("verificationFile", uploadFile);

    try {
      const response = await fetch(
        `${baseUrl}bg-verification/${selectedStaff.staffDetails.id}/verify/` + uploadFileType,
        {
          method: "PUT",
          body: newFormData,
          // Headers are not needed for FormData; fetch will automatically set 'Content-Type' as 'multipart/form-data'
        }
      );

      console.log("Response from backend:", response);

      if (response.ok) {  // Changed to response.ok to handle all 2xx responses
        const result = await response.json();
        console.log("Response data:", result);
        setDocuments((prev) => [
          ...prev.filter(({ type }) => fileUploadTypes.find(({ name }) => name === type)?.file !== uploadFileType),
          {
            type: fileUploadTypes.find(({ file }) => file === uploadFileType)?.name,
            fileName: fileUploadTypes.find(({ file }) => file === uploadFileType)?.name + " File",
            data: result?.data?.[uploadFileType + "_file"],
            isFolder: false,
            addedOn: formattedDate(result?.data?.updatedAt),
          }
        ]);

        openToast("File uploaded successfully", "success");
      } else {
        // Show error toast if response status is not 2xx
        openToast("An error occurred during file upload ", "error");
      }
    } catch (error) {
      console.error("Error in uploading file ", error);
      openToast("An error occurred during file upload", "error");
    } finally {
      onCloseModal();
    }
  }

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  // console.log(staff);
  return (
    <div className=' mt-[30px] w-[100%] '>
      <div className='flex items-center border-b border-[#dbdbdb] pb-[20px]   justify-between'>
        <h1>Documents</h1>
        <div>
          <button className='bg-[#27004a] mr-[16px] p-[8px] rounded-lg text-[14px] text-[white]' onClick={onOpenModal}>Add Document</button>

          <Modal open={open} onClose={onCloseModal} center>
            <h2 className='border-b border-[#dbdbdb] pb-[16px]'>Upload Document</h2>

            <div className="w-[100%]">
              <select
                value={uploadFileType}
                onChange={(e) => setUploadFileType(e.target.value)}
                className="border border-1 rounded-md p-[5px] mt-[24px] w-[100%] mb-[20px] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]"
              >
                <option> Select a Document </option>
                <option value={"aadhaar"}> Aadhaar </option>
                <option value={"pan"}>PAN</option>
                <option value={"driving_license"}> Driving License </option>
                <option value={"voter_id"}> Voter Id </option>
                <option value={"uan"}> UAN </option>
                <option value={"address"}> Address </option>
              </select>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }} // Hide the input element
              />
              <button className=' p-[6px] pl-[18px] pr-[18px] rounded-lg bg-[#27004a] text-[white] mb-[20px]' onClick={handleUploadClick}>
                Upload
              </button>

            </div>

            <div className='flex items-center gap-[10px] border-t border-[#dbdbdb] pt-[16px] justify-end '>
              <button className='p-[6px] text-[14px] rounded-md  border border-[#dbdbdb]' onClick={onCloseModal}>Cancel</button>
              <button className='bg-[#27004a] text-[14px] pl-[18px] pr-[18px] rounded-md text-[white] p-[6px]' onClick={uploadingFile}>OK</button>
            </div>
          </Modal>

        </div>


      </div >
      <div className="w-full p-4 md:p-6">
        <div className="rounded-lg border bg-white shadow-sm">
          <div className="w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="bg-gray-50/75">
                <tr className="border-b transition-colors">
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                    Document Type
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                    File Name
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                    Added On
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {documents.filter((doc) => doc.data !== null).map((doc, index) => (
                  <tr
                    key={index}
                    className="border-b transition-colors hover:bg-gray-50/50"
                  >
                    <td className="p-4 align-middle">{doc.type}</td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-2">
                        {doc.isFolder ? (
                          <svg
                            className="h-5 w-5 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                          </svg>
                        ) : (
                          <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          </svg>
                        )}
                        {doc.fileName}
                      </div>
                    </td>
                    <td className="p-4 align-middle">{doc.addedOn || "-"}</td>
                    <td className="p-4 align-middle">
                      {!doc.isFolder && (
                        <button onClick={() => downloadFile(doc.data, selectedStaff.name + " " + doc.fileName)} className="inline-flex items-center text-sm font-medium text-blue-500 hover:text-blue-700">
                          Download
                          <svg
                            className="ml-1 h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Documents