import React, { useRef, useState } from "react";
import Modal from 'react-modal';
import CloseIcon from '@mui/icons-material/Close';
import { useGlobalContext } from "../../../Context/GlobalContext";

const VerifyAddress = () => {
    const [currentAddress, setCurrentAddress] = useState("");
    const [permanentAddress, setPermanentAddress] = useState("");

    const { baseUrl, selectedStaff } = useGlobalContext();

    async function submitAddress() {
        const newFormData = new FormData();
        newFormData.append("current_address", currentAddress);
        newFormData.append("permanent_address", permanentAddress);

        const response = await fetch(baseUrl + "bg-verification/" + selectedStaff.staffDetails.id + "/verify/address", {
            method: "PUT",
            body: newFormData
        });

        console.log(response);

        if (response.status === 201) {
            const result = await response.json();
            console.log(result);
            closeModal2();
            alert("Address successfully updated");
        } else {
            alert("An error occurred");
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

    const handleUploadClick = () => {
        fileInputRef.current.click(); 
    };

    // Function to handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log("Selected file:", file);
    };

    return (
        <div className='w-full p-[20px] pt-[80px] xl:p-[40px] relative xl:pt-[60px]    xl:pl-[320px] flex flex-col '>
            <div className='flex justify-between items-center  w-[100%] p-[20px]  pr-0 xl:pr-[20px] pl-[0] top-0 bg-white'>
                <h3 className='font-medium'>Address Verification</h3>
            </div>

            <div className='flex justify-between items-center mb-3 p-4 border border-1 bg-[#f0f8fd] rounded-md ' >
                <h4 className='font-light'>Address</h4>
                <button className='second-btn' onClick={openModal2}  >
                    Add
                </button>

            </div>


            <div className='flex justify-between items-center mb-3 p-4 border border-1 bg-[#f0f8fd] rounded-md ' >
                <h4 className='font-light'>Verification Status
                </h4>

            </div>


            <div className='flex justify-between items-center mb-3 p-4 border border-1 bg-[#f0f8fd] rounded-md ' >
                <h4 className='font-light'>Proofs</h4>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                />
                <button className='second-btn' onClick={handleUploadClick}>
                    Upload
                </button>

            </div>


            <Modal
                isOpen={modalIsOpen2}
                onAfterOpen={afterOpenModal2}
                onRequestClose={closeModal2}
                contentLabel="Example Modal"
                className="w-[96%] xl:w-[40%] absolute top-[50%] left-[50%] bottom-auto p-0 bg-[#fff]  shadow-md rounded-[10px] translate-x-[-50%] translate-y-[-50%]"

            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} className='border-b-1 p-3 text-[13px] xl:text-[15px] '>Add Address</h2>
                <button onClick={closeModal2} className='absolute right-[5px] top-[3px] font-semibold	  bg-[#511992] rounded-full'><CloseIcon className='text-white' /></button>
                <div className=''>
                    <div className='modal-field field-modal p-[10px] border border-t'>
                        <label className='text-[13px] xl:text-[14px] font-medium'>Address
                        </label><br />
                        <input type='text' placeholder='Enter Current Address' className='border border-1 rounded-md p-[5px] mt-1 w-[100%] mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' value={currentAddress} onChange={(e) => setCurrentAddress(e.target.value)}/><br />
                        <input type='text' placeholder="Enter Permanent Address" className='border border-1 rounded-md p-[5px] mt-1 w-[100%] mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' value={permanentAddress} onChange={(e) => setPermanentAddress(e.target.value)}/><br />


                    </div>
                    <div className='pr-[10px] pb-3 flex gap-[10px] justify-end border-t pt-3'>
                        <button className='first-btn' onClick={closeModal2}>Cancel</button>
                        <button className='second-btn' onClick={submitAddress}>Save </button>
                    </div>
                </div>
            </Modal>

        </div>
    )
}

export default VerifyAddress