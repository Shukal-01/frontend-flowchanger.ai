import React, { useRef, useState } from "react";
// import { Link } from 'react-router-dom'
// import AddIcon from '@mui/icons-material/Add';
import Modal from 'react-modal';
import CloseIcon from '@mui/icons-material/Close';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useGlobalContext } from "../../../Context/GlobalContext";
import Select from 'react-select';

const PastEmploymentDetail = () => {

    const { baseUrl, selectedStaff, openToast } = useGlobalContext();
    const [pastEmploymentID, setPastEmploymentID] = useState(selectedStaff?.staffDetails?.past_Employment?.id);
    const [isLoading, setIsLoading] = useState(false);

    const [editPastEmployment, setEditPastEmployment] = useState(!!selectedStaff?.staffDetails?.past_Employment);
    const [pastEmploymentStatus, setPastEmploymentStatus] = useState(selectedStaff?.staffDetails?.past_Employment?.past_Employment_status);
    const [pastEmployment, setPastEmployment] = useState({
        companyName: selectedStaff?.staffDetails?.past_Employment?.company_name,
        designation: selectedStaff?.staffDetails?.past_Employment?.designation,
        joiningDate: selectedStaff?.staffDetails?.past_Employment?.joining_date,
        leavingDate: selectedStaff?.staffDetails?.past_Employment?.leaving_date,
        currency: selectedStaff?.staffDetails?.past_Employment?.currency,
        salary: selectedStaff?.staffDetails?.past_Employment?.salary,
        companyGst: selectedStaff?.staffDetails?.past_Employment?.company_gst,
    });





    console.log(pastEmployment);


    async function addPastEmployment() {
        setIsLoading(true);
        try {
            const response = await fetch(baseUrl + "/past-employment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    staffId: selectedStaff?.staffDetails?.id,
                    ...pastEmployment,
                    salary: parseFloat(pastEmployment?.salary),
                    company_name: pastEmployment?.companyName,
                    company_gst: pastEmployment?.companyGst,
                    leaving_date: new Date(pastEmployment?.leavingDate).toISOString(),
                    joining_date: new Date(pastEmployment?.joiningDate).toISOString(),
                    currency: pastEmployment?.currency?.value
                })
            });
            console.log(response);
            if (response.status === 201) {
                const result = await response.json();
                console.log(result);
                setPastEmployment({
                    companyName: result?.company_name,
                    designation: result?.designation,
                    joiningDate: result?.joining_date,
                    leavingDate: result?.leaving_date,
                    currency: result?.currency,
                    salary: result?.salary,
                    companyGst: result?.company_gst
                })
                setPastEmploymentStatus(result?.past_Employment_status);
                openToast("Past Employment successfully added", "success");
                setEditPastEmployment(true);
                setPastEmploymentID(result?.id);
            } else {
                openToast("An error occurred while adding past employment", "error");
            }
        } catch (error) {
            console.error("Error adding past employment:", error);
            openToast("An error occurred while adding past employment", "error");
        }
        finally {
            setIsLoading(false);
            closeModal2();
        }
    }
    async function editingPastEmployment() {
        setIsLoading(true);
        try {
            const response = await fetch(baseUrl + "/past-employment/" + selectedStaff?.staffDetails?.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...pastEmployment,
                    salary: parseFloat(pastEmployment?.salary),
                    company_name: pastEmployment?.companyName,
                    company_gst: pastEmployment?.companyGst,
                    leaving_date: new Date(pastEmployment?.leavingDate).toISOString(),
                    joining_date: new Date(pastEmployment?.joiningDate).toISOString(),
                    currency: pastEmployment?.currency?.value
                })
            });
            console.log(response);
            if (response.status === 200) {
                const result = await response.json();
                console.log(result);
                // setPastEmployment({
                //     companyName: result?.company_name,
                //     designation: result?.designation,
                //     joiningDate: result?.joining_date,
                //     leavingDate: result?.leaving_date,
                //     currency: result?.currency,
                //     salary: result?.salary,
                //     companyGst: result?.company_gst
                // })
                openToast("Past Employment successfully updated", "success");
            } else {
                openToast("An error occurred while updating past employment", "error");
            }
        } catch (error) {
            console.error("Error updating past employment:", error);
            openToast("An error occurred while updating past employment", "error");
        }
        finally {
            setIsLoading(false);
            closeModal2();
        }
    }
    async function deletedPastEmployment() {
        try {
            const response = await fetch(baseUrl + "/past-employment/" + pastEmploymentID, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },

            });
            console.log(response);
            if (response.status === 200) {
                const result = await response.json();
                openToast("Past Employment successfully deleted", "success");
                setEditPastEmployment(false);
                closeModal2();
            } else {
                openToast("An error occurred while deleting past employment", "error");
            }
        } catch (error) {
            console.error("Error deleting past employment:", error);
            openToast("An error occurred while deleting past employment", "error");
        }
    }


    let subtitle;

    const [modalIsOpen2, setIsOpen2] = React.useState(false);
    function openModal2() {
        setIsOpen2(true);
    }

    const currencyOptions = [
        { value: 'INR', label: 'INR' },
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' },
        { value: 'GBP', label: 'GBP' },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPastEmployment({ ...pastEmployment, [name]: value });
    };

    const handleCurrencyChange = (selectedOption) => {
        setPastEmployment({ ...pastEmployment, currency: selectedOption });
    };


    function afterOpenModal2() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#000';

    }

    function closeModal2() {
        setIsOpen2(false);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        addPastEmployment();
    };

    return (
        <>
            {/* // <div className='w-full p-[20px] pt-[80px] xl:p-[40px] relative xl:pt-[60px]    xl:pl-[320px] flex flex-col '> */}
            <div className='flex justify-between items-center  w-[100%] p-[20px]  pr-0 xl:pr-[20px] pl-[0] top-0 bg-white'>
                <h3 className='font-medium'>Past Employment Detail</h3>
            </div>

            <div className='flex justify-between items-center mb-3 p-4 border border-1 bg-[#fff] shadow-cs rounded-lg' >
                <h4 className='font-light'>Past Employment</h4>
                <p className='font-light'></p>
                <button className='second-btn' onClick={openModal2}  >
                    {editPastEmployment ? "Edit" : "Add"}
                </button>

            </div>


            <div className='flex justify-between items-center mb-3 p-4 border border-1 bg-[#fff] shadow-cs rounded-lg' >
                <h4 className='font-light'>Verification Status
                </h4>
                <p className='font-light'>{pastEmploymentStatus}</p>
            </div>



            <Modal
                isOpen={modalIsOpen2}
                onAfterOpen={afterOpenModal2}
                onRequestClose={closeModal2}
                // style={customStyles}
                contentLabel="Example Modal"
                className="w-[96%] xl:w-[35%] xl:h-[75%] absolute top-[50%] left-[50%] bottom-auto px-3 bg-[#fff]  shadow-md rounded-[10px] translate-x-[-50%] translate-y-[-50%]"

            >

                <h2 ref={(_subtitle) => (subtitle = _subtitle)} className='border-b-1 p-3 text-[13px] xl:text-[15px] '>Add Past Employment</h2>
                <button onClick={closeModal2} className='absolute right-[5px] top-[3px] font-semibold	  bg-[#27004a] rounded-full'><CloseIcon className='text-white' /></button>
                <div className='border-t p-2'>
                    <div className="mb-4">
                        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                            Company Name<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={pastEmployment.companyName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">
                            Designation
                        </label>
                        <input
                            type="text"
                            id="designation"
                            name="designation"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={pastEmployment.designation}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="joiningDate" className="block text-sm font-medium text-gray-700 mb-1">
                                Joining Date<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                id="joiningDate"
                                name="joiningDate"
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={pastEmployment?.joiningDate?.split('T')[0]}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="leavingDate" className="block text-sm font-medium text-gray-700 mb-1">
                                Leaving Date<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                id="leavingDate"
                                name="leavingDate"
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={pastEmployment?.leavingDate?.split('T')[0]}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                                Currency
                            </label>
                            <Select
                                id="currency"
                                name="currency"
                                options={currencyOptions}
                                value={currencyOptions.filter(option => option.value === pastEmployment?.currency)}
                                onChange={(selectedOption) => {
                                    handleCurrencyChange(selectedOption.value);
                                }}
                                className="react-select-container"
                                classNamePrefix="react-select"
                            />
                        </div>
                        <div>
                            <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                                Salary
                            </label>
                            <input
                                type="number"
                                id="salary"
                                name="salary"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={pastEmployment.salary}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="companyGst" className="block text-sm font-medium text-gray-700 mb-1">
                            Company GST
                        </label>
                        <input
                            type="text"
                            id="companyGst"
                            name="companyGst"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={pastEmployment.companyGst}
                            onChange={handleInputChange}
                        />
                    </div>
                    {
                        editPastEmployment ?
                            (<div className='pr-[10px] pb-3 flex gap-[10px] justify-end border-t pt-3'>
                                <button className='first-btn' onClick={() => {
                                    deletedPastEmployment()
                                }}>Delete</button>
                                <button disabled={isLoading} className={'second-btn ' + (isLoading && "cursor-not-allowed opacity-50")} onClick={() => {
                                    editingPastEmployment()
                                }}>Edit </button>

                            </div>) : (<div className='pr-[10px] pb-3 flex gap-[10px] justify-end border-t pt-3'>
                                <button className='first-btn' onClick={closeModal2}>Cancel</button>
                                <button disabled={isLoading} className={'second-btn ' + (isLoading && "cursor-not-allowed opacity-50")} onClick={handleSubmit}>Save </button>
                            </div>)
                    }
                </div>
            </Modal>

            {/* </div> */}
        </>
    )
}

export default PastEmploymentDetail