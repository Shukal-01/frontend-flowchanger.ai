import React, { useRef, useState } from "react";
// import { Link } from 'react-router-dom'
// import AddIcon from '@mui/icons-material/Add';
import Modal from 'react-modal';
import CloseIcon from '@mui/icons-material/Close';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useGlobalContext } from "../../../Context/GlobalContext";

const VerifyVoterID = () => {

    const { baseUrl, selectedStaff, openToast } = useGlobalContext();

    const [voter, setVoter] = useState({
        number: selectedStaff?.staffDetails?.staff_bg_verification?.voter_id_number,
        status: selectedStaff?.staffDetails?.staff_bg_verification?.voter_id_verification_status,
        veriicationFile: selectedStaff?.staffDetails?.staff_bg_verification?.voter_id_file,
    });

    console.log(voter);

    async function submitVoterID() {
        const newFormData = new FormData();
        newFormData.append("voter_id_number", voter?.number);
        newFormData.append("verificationFile", voter?.veriicationFile);

        try {
            const response = await fetch(baseUrl + "bg-verification/" + selectedStaff.staffDetails.id + "/verify/voter_id", {
                method: "PUT",
                body: newFormData
            });

            console.log(response);

            if (response.status === 201) {
                const result = await response.json();
                console.log(result);
                setVoter({ ...voter, number: result?.data?.voter_id_number, status: result?.data?.voter_id_verification_status, veriicationFile: result?.data?.voter_id_file });
                openToast("Voter ID successfully updated or created", "success");
                closeModal2();
            } else {
                openToast("An error occurred while adding or updating Voter ID", "error");
            }
        } catch (error) {
            console.error("Error submitting Aadhaar:", error);
            openToast("An error occurred while adding or updating Voter ID", "error");
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
    };

    return (
        <div className='w-full pt-[10px]  relative    flex flex-col '>
            <div className='flex justify-between items-center  w-[100%] p-[20px]  pr-0 xl:pr-[20px] pl-[0] top-0 bg-white'>
                <h3 className='font-medium'>Voter ID Verification</h3>
                <button className='second-btn' onClick={submitVoterID}>
                    Update Voter ID
                </button>
            </div>

            <div className='flex justify-between items-center mb-3 p-4 border border-1 bg-[#fff] shadow-cs rounded-lg' >
                <h4 className='font-light'>Voter ID</h4>
                <p className='font-light'>{voter?.number}</p>
                <button className='second-btn' onClick={openModal2}  >
                    Add
                </button>

            </div>


            <div className='flex justify-between items-center mb-3 p-4 border border-1 bg-[#fff] shadow-cs rounded-lg' >
                <h4 className='font-light'>Verification Status
                </h4>
                <p className='font-light'>{voter?.status}</p>
            </div>


            <div className='flex justify-between items-center mb-3 p-4 border border-1 bg-[#fff] shadow-cs rounded-lg' >
                <h4 className='font-light'>Proofs</h4>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }} // Hide the input element
                />
                {voter?.veriicationFile && <img src={voter?.veriicationFile} alt="Voter ID" className="w-[100px] h-[50px] rounded-md " />}
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
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} className='border-b-1 p-3 text-[13px] xl:text-[15px] '>Add Voter ID</h2>
                <button onClick={closeModal2} className='absolute right-[5px] top-[3px] font-semibold	  bg-[#27004a] rounded-full'><CloseIcon className='text-white' /></button>
                <div className=''>
                    <div className='modal-field field-modal p-[10px] border border-t'>
                        <label className='text-[13px] xl:text-[14px] font-medium'>Voter ID
                        </label><br />
                        <input type='text' placeholder="0000-0000-0000" className='border border-1 rounded-md p-[5px] mt-1 w-[100%] mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' value={voter?.number} onChange={(e) => setVoter({ ...voter, number: e.target.value })} /><br />


                    </div>
                    <div className='pr-[10px] pb-3 flex gap-[10px] justify-end border-t pt-3'>
                        <button className='first-btn' onClick={closeModal2}>Cancel</button>
                        <button className='second-btn' onClick={closeModal2} >Save </button>
                    </div>
                </div>
            </Modal>

        </div>
    )
}

export default VerifyVoterID