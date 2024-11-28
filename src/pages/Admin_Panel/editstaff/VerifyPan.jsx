import React, { useRef, useState } from "react";
import Modal from 'react-modal';
import CloseIcon from '@mui/icons-material/Close';
import { useGlobalContext } from "../../../Context/GlobalContext";

const VerifyPan = () => {

    const { baseUrl, selectedStaff, openToast } = useGlobalContext();



    let subtitle;
    const [pan, setPan] = useState({
        number: selectedStaff?.staffDetails?.staff_bg_verification?.pan_number,
        status: selectedStaff?.staffDetails?.staff_bg_verification?.pan_verification_status,
        verificationFile: selectedStaff?.staffDetails?.staff_bg_verification?.verificationFile
    });




    
    async function submitPan() {
        if (!pan?.number || !pan?.verificationFile) {
            openToast("Pan number and file are required", "error");
            return;
        }
        const newFormData = new FormData();
        newFormData.append("pan_number", pan?.number);
        newFormData.append("verificationFile", pan?.verificationFile);

        try {
            const response = await fetch(baseUrl + "bg-verification/" + selectedStaff.staffDetails.id + "/verify/pan", {
                method: "PUT",
                body: newFormData
            });

            console.log(response);

            if (response.status === 201) {
                const result = await response.json();
                console.log(result);
                setPan({ ...pan, number: result?.data?.pan_number, status: result?.data?.pan_verification_status, verificationFile: result?.data?.pan_file });
                openToast("Pan successfully updated or created", "success");
                closeModal2();
            } else {
                openToast("An error occurred while adding or updating Pan", "error");
            }
        } catch (error) {
            console.error("Error submitting Pan:", error);
            openToast("An error occurred while adding or updating Pan", "error");
        }
    }


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
        setPan({ ...pan, verificationFile: file });
    };

    return (
        <div className='w-full p-[20px] pt-[80px] xl:p-[40px] relative xl:pt-[60px]   flex flex-col '>
            <div className='flex justify-between items-center  w-[100%] p-[20px] pr-0 xl:pr-[20px] pl-[0] top-0 bg-white'>
                <h3 className='font-medium'>PAN Verification</h3>
                <button className='second-btn' onClick={submitPan}>
                    Update Pan
                </button>
            </div>

            <div className='flex justify-between items-center mb-3 p-4 border border-1 bg-[#f0f8fd] rounded-md ' >
                <h4 className='font-light'>PAN</h4>
                <p className='font-light'>{pan?.number}</p>
                <button className='second-btn' onClick={openModal2}  >
                    Add
                </button>

            </div>


            <div className='flex justify-between items-center mb-3 p-4 border border-1 bg-[#f0f8fd] rounded-md ' >
                <h4 className='font-light'>Verification Status
                </h4>
                <p className='font-light'>{pan?.status}
                </p>

            </div>


            <div className='flex justify-between items-center mb-3 p-4 border border-1 bg-[#f0f8fd] rounded-md ' >
                <h4 className='font-light'>Proofs</h4>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    required
                />
                {
                    pan?.verificationFile && <img src={pan?.verificationFile} alt="Selected File" className="w-[100px] h-[50px] rounded-md" />

                }


                <button className='second-btn' onClick={handleUploadClick}>
                    Upload
                </button>

            </div>


            <Modal
                isOpen={modalIsOpen2}
                onAfterOpen={afterOpenModal2}
                onRequestClose={closeModal2}
                contentLabel="Example Modal"
                className="w-[96%] xl:w-[40%] absolute top-[50%] left-[50%] bottom-auto p-0 bg-[#fff] shadow-md rounded-[10px] translate-x-[-50%] translate-y-[-50%]"

            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} className='border-b-1 p-3 text-[13px] xl:text-[15px] '>Add PAN</h2>
                <button onClick={closeModal2} className='absolute right-[5px] top-[3px] font-semibold	  bg-[#511992] rounded-full'><CloseIcon className='text-white' /></button>
                <div className=''>
                    <div className='modal-field field-modal p-[10px] border border-t'>
                        <label className='text-[13px] xl:text-[14px] font-medium' >PAN
                        </label><br />
                        <input type='text' placeholder="Enter PAN" className='border border-1 rounded-md p-[5px] mt-1 w-[100%] mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' value={pan?.number} onChange={(e) => setPan({ ...pan, number: e.target.value })} required/><br />
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

export default VerifyPan