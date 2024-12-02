import React, { useRef, useState } from "react";
import Modal from 'react-modal';
import CloseIcon from '@mui/icons-material/Close';
import { useGlobalContext } from "../../../Context/GlobalContext";

const VerifyFace = () => {

    const { baseUrl, selectedStaff, openToast } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(false);

    const [face, setFace] = useState({
        status: selectedStaff?.staffDetails?.staff_bg_verification?.face_verification_status,
        verificationFile: selectedStaff?.staffDetails?.staff_bg_verification?.face_file
    });


    async function submitFace() {
        setIsLoading(true);
        if (!face.verificationFile) {
            openToast("Please upload a face file", "warning");
            return;
        }
        // Create a new FormData instance
        const newFormData = new FormData();



        newFormData.append("verificationFile", face?.verificationFile);


        try {
            const response = await fetch(
                `${baseUrl}bg-verification/${selectedStaff.staffDetails.id}/verify/face`,
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


                setFace({
                    status: result?.data?.face_verification_status,
                    verificationFile: result?.data?.face_file
                })

                // Show success toast and close modal
                openToast("Face successfully updated or created", "success");
                closeModal2();
            } else {
                // Show error toast if response status is not 2xx
                openToast("An error occurred while adding or updating Face", "error");
            }
        } catch (error) {
            console.error("Error submitting Face:", error);
            openToast("An error occurred while adding or updating Face", "error");
        } finally {
            setIsLoading(false);
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
        setFace({ ...face, verificationFile: file });
        console.log("Selected file:", file);
    };

    return (
        <div className='w-full pt-[10px] relative     flex flex-col '>
            <div className='flex justify-between items-center  w-[100%] p-[20px]  pr-0 xl:pr-[20px] pl-[0] top-0 bg-white'>
                <h3 className='font-medium'>Face Verification</h3>
                <button disabled={isLoading} className={'second-btn ' + (isLoading && 'opacity-50 cursor-not-allowed animate-pulse')} onClick={submitFace}>
                    Update Face
                </button>
            </div>

            {/* <div className='flex justify-between items-center mb-3 p-4 border border-1 bg-[#fff] shadow-cs rounded-lg' >
                <h4 className='font-light'>UAN</h4>
                <button className='second-btn' onClick={openModal2}  >
                    Add
                </button>

            </div> */}


            <div className='flex justify-between items-center mb-3 p-4 border border-1 bg-[#fff] shadow-cs rounded-lg' >
                <h4 className='font-light'>Verification Status
                </h4>
                <p className='font-light'>{face?.status}</p>

            </div>


            <div className='flex justify-between items-center mb-3 p-4 border border-1 bg-[#fff] shadow-cs rounded-lg' >
                <h4 className='font-light'>Proofs</h4>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                />

                {face?.verificationFile && <img src={face?.verificationFile} className="w-[100px] h-[50px] rounded-md" alt="Selected file" />}
                <button className='second-btn' onClick={handleUploadClick}>
                    Upload
                </button>

            </div>


            {/* <Modal
                isOpen={modalIsOpen2}
                onAfterOpen={afterOpenModal2}
                onRequestClose={closeModal2}
                contentLabel="Example Modal"
                className="w-[96%] xl:w-[40%] absolute top-[50%] left-[50%] bottom-auto p-0 bg-[#fff] shadow shadow-md rounded-[10px] translate-x-[-50%] translate-y-[-50%]"

            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} className='border-b-1 p-3 text-[13px] xl:text-[15px] '>Add UAN</h2>
                <button onClick={closeModal2} className='absolute right-[5px] top-[3px] font-semibold	  bg-[#27004a] rounded-full'><CloseIcon className='text-white' /></button>
                <div className=''>
                    <div className='modal-field field-modal p-[10px] border border-t'>
                        <label className='text-[13px] xl:text-[14px] font-medium'>UAN
                        </label><br />
                        <input type='text' className='border border-1 rounded-md p-[5px] mt-1 w-[100%] mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' value={bgVerification} onChange={(e) => setBgVerification(e.target.value)}/><br />


                    </div>
                    <div className='pr-[10px] pb-3 flex gap-[10px] justify-end border-t pt-3'>
                        <button className='first-btn' onClick={closeModal2}>Cancel</button>
                        <button className='second-btn'>Save </button>
                    </div>
                </div>
            </Modal> */}

        </div>
    )
}

export default VerifyFace