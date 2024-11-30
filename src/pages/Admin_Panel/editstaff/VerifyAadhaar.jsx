import React, { useRef, useState } from "react";
// import { Link } from 'react-router-dom'
// import AddIcon from '@mui/icons-material/Add';
import Modal from 'react-modal';
import CloseIcon from '@mui/icons-material/Close';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useGlobalContext } from "../../../Context/GlobalContext";

const VerifyAadhaar = () => {

    const { baseUrl, selectedStaff, openToast } = useGlobalContext();

    const [aadhaar, setAadhaar] = useState({
        number: selectedStaff?.staffDetails?.staff_bg_verification?.aadhaar_number,
        status: selectedStaff?.staffDetails?.staff_bg_verification?.aadhaar_verification_status,
        verificationFile: selectedStaff?.staffDetails?.staff_bg_verification?.aadhaar_file
    });

    async function submitAadhar() {

        if (!aadhaar?.number || !aadhaar?.verificationFile) {
            openToast("Aadhaar number and file are required", "error");
            return;
        }

        console.log(aadhaar);
        // Create a new FormData instance
        const newFormData = new FormData();

        // Append Aadhaar number and file to FormData


        newFormData.append("aadhaar_number", aadhaar?.number);
        newFormData.append("verificationFile", aadhaar?.verificationFile);


        try {
            const response = await fetch(
                `${baseUrl}bg-verification/${selectedStaff.staffDetails.id}/verify/aadhaar`,
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

                // Update Aadhaar state with the new data received from the backend
                setAadhaar({
                    ...aadhaar,
                    number: result?.data?.aadhaar_number,
                    status: result?.data?.aadhaar_verification_status,
                    verificationFile: result?.data?.aadhaar_file
                });

                // Show success toast and close modal
                openToast("Aadhaar successfully updated or created", "success");
                closeModal2();
            } else {
                // Show error toast if response status is not 2xx
                openToast("An error occurred while adding or updating Aadhaar", "error");
            }
        } catch (error) {
            console.error("Error submitting Aadhaar:", error);
            openToast("An error occurred while adding or updating Aadhaar", "error");
        }
    }




    let subtitle;

    const [modalIsOpen2, setIsOpen2] = React.useState(false);
    function openModal2() {
        setIsOpen2(true);
    }
    function afterOpenModal2() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#000';

    }

    function closeModal2() {
        setIsOpen2(false);
    }

    const fileInputRef = useRef(null);

    // Function to handle button click and open file input dialog
    const handleUploadClick = () => {
        fileInputRef.current.click(); // Trigger click on input type="file"
    };

    // Function to handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Get the selected file
        console.log("Selected file:", file);
        setAadhaar({ ...aadhaar, verificationFile: file });
    };

    return (
        <div className='w-full  relative xl:pt-[30px]    flex flex-col '>
            <div className='flex justify-between items-center  w-[100%] pb-[10px] pr-0 xl:pr-[0px] pl-[0] top-0 bg-white'>
                <h3 className='font-medium'>Aadhaar Verification</h3>
                <button className='second-btn' onClick={submitAadhar}>
                    Update Aadhaar
                </button>
            </div>

            <div className='flex justify-between items-center mb-3 p-4 border border-1 shadow-cs bg-[#fff] rounded-lg ' >
                <h4 className='font-light'>Aadhaar</h4>
                <p className='font-light'>{aadhaar?.number}</p>
                <button className='second-btn' onClick={openModal2}  >
                    Add
                </button>

            </div>


            <div className='flex justify-between items-center mb-3 p-4 border border-1 shadow-cs bg-[#fff] rounded-lg ' >
                <h4 className='font-light'>Verification Status 
                </h4>
                <p className='font-light'>{aadhaar?.status}</p>
            </div>


            <div className='flex justify-between items-center mb-3 p-4 border border-1 shadow-cs bg-[#fff] rounded-lg ' >
                <h4 className='font-light'>Proofs</h4>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }} // Hide the input element
                />
                {
                    aadhaar?.verificationFile && <img src={aadhaar?.verificationFile} alt="" className="w-[100px] h-[50px] rounded-md" />

                }
                <button className='second-btn' onClick={handleUploadClick}>
                    Upload
                </button>

            </div>
            <Modal
                isOpen={modalIsOpen2}
                onAfterOpen={afterOpenModal2}
                onRequestClose={closeModal2}
                // style={customStyles}
                contentLabel="Example Modal"
                className="w-[96%] xl:w-[40%] absolute top-[50%] left-[50%] bottom-auto p-0 bg-[#fff]  shadow-md rounded-[10px] translate-x-[-50%] translate-y-[-50%]"

            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} className='border-b-1 p-3 text-[13px] xl:text-[15px] '>Add Aadhaar</h2>
                <button onClick={closeModal2} className='absolute right-[5px] top-[3px] font-semibold	  bg-[#27004a] rounded-full'><CloseIcon className='text-white' /></button>
                <div className=''>
                    <div className='modal-field field-modal p-[10px] border border-t'>
                        <label className='text-[13px] xl:text-[14px] font-medium'>Aadhaar
                        </label><br />
                        <input type='text' placeholder="0000-0000-0000" className='border border-1 rounded-md p-[5px] mt-1 w-[100%] mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' value={aadhaar?.number} onChange={(e) => setAadhaar({ ...aadhaar, number: e.target.value })} /><br />


                    </div>
                    <div className='pr-[10px] pb-3 flex gap-[10px] justify-end border-t pt-3'>
                        <button className='first-btn' onClick={closeModal2}>Cancel</button>
                        <button className='second-btn' onClick={closeModal2}>Save </button>
                    </div>
                </div>
            </Modal>

        </div>
    )
}

export default VerifyAadhaar