import React, { useRef, useState } from "react";
import Modal from 'react-modal';
import CloseIcon from '@mui/icons-material/Close';
import { useGlobalContext } from "../../../Context/GlobalContext";

const VerifyDrivingLicense = () => {

    const { baseUrl, selectedStaff, openToast } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(false);
    const [drivingLicense, setDrivingLicense] = useState({
        number: selectedStaff?.staffDetails?.staff_bg_verification?.driving_license_number,
        status: selectedStaff?.staffDetails?.staff_bg_verification?.driving_license_status,
        verificationFile: selectedStaff?.staffDetails?.staff_bg_verification?.driving_license_file,
    });
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
        setDrivingLicense({ ...drivingLicense, verificationFile: file });
        console.log("Selected file:", file);
    };



    async function submitDrivingLicense() {
        setIsLoading(true);
        if (!drivingLicense?.number || !drivingLicense?.verificationFile) {
            openToast(" Provide either Driving License number or upload file", "warning");
            return;
        }

        console.log(drivingLicense);
        const newFormData = new FormData();
        newFormData.append("driving_license_number", drivingLicense?.number);
        newFormData.append("verificationFile", drivingLicense?.verificationFile);

        try {
            const response = await fetch(baseUrl + "bg-verification/" + selectedStaff.staffDetails.id + "/verify/driving_license", {
                method: "PUT",
                body: newFormData
            });


            console.log(response);

            if (response.status === 201) {
                const result = await response.json();
                console.log(result);
                setDrivingLicense({ ...drivingLicense, number: result?.data?.driving_license_number, status: result?.data?.driving_license_status, verificationFile: result?.data?.driving_license_file });
                openToast("Driving License successfully updated or created", "success");
                closeModal2();
            } else {
                openToast("An error occurred while adding or updating Driving License", "error");
            }
        } catch (error) {
            console.error("Error adding or updating Driving License:", error);
            openToast("An error occurred while adding or updating Driving License", "error");
        }
        finally {
            setIsLoading(false);
        }
    }



    return (
        <div className='w-full  relative xl:pt-[10px]   flex flex-col '>
            <div className='flex justify-between items-center  w-[100%] p-[20px] pr-0 xl:pr-[20px] pl-[0] top-0 bg-white'>
                <h3 className='font-medium'>Driving License Verification</h3>
                <button className={'second-btn '+(isLoading && "opacity-50 animate-pulse cursor-not-allowed")} disabled={isLoading}  onClick={submitDrivingLicense}>
                    Update Driving License
                </button>
            </div>

            <div className='flex justify-between items-center mb-3 p-4 border border-1 bg-[#fff] shadow-cs rounded-lg ' >
                <h4 className='font-light'>Driving License</h4>
                <p className='font-light'>{drivingLicense?.number}</p>
                <button className='second-btn' onClick={openModal2}  >
                    Add
                </button>

            </div>


            <div className='flex justify-between items-center mb-3 p-4 border border-1 bg-[#fff] shadow-cs rounded-lg ' >
                <h4 className='font-light'>Verification Status
                </h4>
                <p className='font-light'>{drivingLicense?.status}</p>

            </div>


            <div className='flex justify-between items-center mb-3 p-4 border border-1 bg-[#fff] shadow-cs rounded-lg ' >
                <h4 className='font-light'>Proofs</h4>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                />
                {
                    drivingLicense?.verificationFile && <img src={drivingLicense?.verificationFile} alt="" className="w-[100px] h-[50px] rounded-md" />}
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
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} className='border-b-1 p-3 text-[13px] xl:text-[15px] '>Add Driving License</h2>
                <button onClick={closeModal2} className='absolute right-[5px] top-[3px] font-semibold	  bg-[#27004a] rounded-full'><CloseIcon className='text-white' /></button>
                <div className=''>
                    <div className='modal-field field-modal p-[10px] border border-t'>
                        <label className='text-[13px] xl:text-[14px] font-medium'>Driving License
                        </label><br />
                        <input type='text' placeholder="Enter Driving License Number" className='border border-1 rounded-md p-[5px] mt-1 w-[100%] mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' value={drivingLicense?.number} onChange={(e) => setDrivingLicense({ ...drivingLicense, number: e.target.value })} /><br />


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

export default VerifyDrivingLicense