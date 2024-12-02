import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import Modal from 'react-modal';
import CloseIcon from '@mui/icons-material/Close';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useGlobalContext } from '../../../Context/GlobalContext';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ClipLoader from "react-spinners/ClipLoader";

const CustomDetail = () => {
    const [isLoading, setIsLoading] = useState(false);
    let subtitle;
    const { baseUrl, selectedStaff, openToast } = useGlobalContext();
    const [staffDetail, setStaffDetail] = React.useState(null);
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
                const filteredData = result.filter(item => item.id === selectedStaff.id)[0];
                setStaffDetail(filteredData);

                console.log("Filtered data by ID:", filteredData);
                setAllCustomDetail(filteredData?.staffDetails?.CustomDetails);

            } else {
                console.error("Failed to retrieve data:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("An error occurred while fetching data:", error);
        }
    };
    const [modalIsOpen2, setIsOpen2] = React.useState(false);
    const [editingId, setEditingId] = useState("");
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

    const [allCustomDetail, setAllCustomDetail] = useState([]);

    console.log(allCustomDetail);
    const [fieldName, setFieldName] = useState("");
    const [description, setDescription] = useState("");

    async function submitField() {
        setIsLoading(true);
        const data = { field_name: fieldName, field_value: description, staffId: selectedStaff?.staffDetails?.id };
        console.log(data);
        try {
            const response = await fetch(baseUrl + "custom-details", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });

            console.log(response);

            if (response.ok) {
                const result = await response.json();
                console.log(result.data);
                setAllCustomDetail([...allCustomDetail, result?.data]);
                openToast("Custom Field Added Successfully", "success");
            }
            else {
                openToast("An error occurred while adding custom field", "error");
            }
        } catch (error) {
            console.error("Error submitting custom field:", error);
            openToast("An error occurred while adding custom field", "error");
        }
        finally {
            closeModal2();
            setIsLoading(false);
        }
    }

    async function editCustomField() {
        setIsLoading(true);
        const data = { field_name: fieldName, field_value: description };
        console.log(data);

        try {
            const response = await fetch(baseUrl + "custom-details/" + editingId, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });

            console.log(response);

            if (response.status === 200) {
                const result = await response.json();
                setAllCustomDetail(
                    allCustomDetail.map((item) => item.id === editingId ? { ...item, field_name: fieldName, field_value: description } : item)
                );
                setEditingId("");
                console.log(result.data);
                openToast("Custom Field Edited Successfully", "success");
            }
            else {
                openToast("An error occurred while editing custom field", "error");
            }
        } catch (error) {
            console.error("Error editing custom field:", error);
            openToast("An error occurred while editing custom field", "success");
        } finally {
            setIsLoading(false);
            closeModal2();
        }
    }

    async function deleteCustomDetail(id) {
        try {
            const response = await fetch(baseUrl + "custom-details/" + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log(response);

            if (response.status === 200) {
                const result = await response.json();
                console.log(result);
                setAllCustomDetail(allCustomDetail.filter((item) => item.id !== id));
                openToast("Deleted Custom Field Successfully", "success");
            }
            else {
                openToast("An error occurred while deleting Aadhaar", "error");
            }
        } catch (error) {
            console.error("Error deleting custom field:", error);
            openToast("An error occurred while deleting the custom field.", "error");
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            {/* <div className='w-full p-[20px] pt-[80px] xl:p-[40px] relative xl:pt-[60px]    xl:pl-[320px] flex flex-col set-z'> */}
            <div className='flex justify-between items-center  w-[100%] p-[20px] xl:pr-0 pr-0  pl-[0] top-0 bg-white'>

                <h3 className='font-medium'>Custom Details
                </h3>
                <button className='second-btn'>Update Details</button>
            </div>

            <div className={"w-full bg-white rounded-lg overflow-hidden mb-5 " + (staffDetail !== null && "shadow-md")}>
                <div className={"rounded-md flex justify-center " + (staffDetail !== null && "border border-gray-200")}>
                    {allCustomDetail.length > 0 ? allCustomDetail?.map(({ field_name, field_value, id }) => (<div key={id} className="flex items-center justify-between p-4 border-b hover:bg-gray-50">
                        <span className="text-sm text-gray-700">{field_name}</span>
                        <span className="text-sm text-gray-700">{field_value}</span>
                        <div className="flex items-center gap-2">
                            <button onClick={() => {
                                openModal2();
                                setEditingId(id);
                            }} className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded">
                                <BorderColorIcon className="text-[#27004a] font-light cursor-pointer text-[10px]]" />
                            </button>
                            <button onClick={() => {
                                console.log(id);
                                deleteCustomDetail(id)
                            }} className="px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded">
                                <DeleteOutlineIcon
                                    className="text-red-500 font-light cursor-pointer text-[10px]"
                                />
                            </button>
                        </div>
                    </div>)) : staffDetail !== null ? <div className='flex items-center justify-center h-[80px] text-sm font-medium text-gray-700'>No Custom Details</div> : (<ClipLoader color="#4A90E2" size={40} />)}

                </div>
            </div>


            <button onClick={openModal2} className='text-[14px] flex items-center font-normal'><AddIcon className='bg-[#27004a] text-[10px] text-[#fff] rounded-full mr-3' />Add Custom Field </button>




            <Modal
                isOpen={modalIsOpen2}
                onAfterOpen={afterOpenModal2}
                onRequestClose={closeModal2}
                // style={customStyles}
                contentLabel="Example Modal"
                className="w-[96%] xl:w-[40%] absolute top-[50%] left-[50%] bottom-auto p-0 bg-[#fff] shadow-md rounded-[10px] translate-x-[-50%] translate-y-[-50%]"

            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} className='border-b-1 p-3 text-[13px] xl:text-[15px] '>Add Custom Field</h2>
                <button onClick={closeModal2} className='absolute right-[5px] top-[3px] font-semibold	  bg-[#27004a] rounded-full'><CloseIcon className='text-white bg-[#27004a] rounded-2xl' /></button>
                <div className=''>
                    <div className='modal-field field-modal p-[10px] border border-t'>
                        <label className='text-[13px] xl:text-[14px] font-medium'>Custom Field Name
                        </label><br />
                        <input type='text' required value={fieldName} onChange={(e) => { setFieldName(e.target.value) }} className='border border-1 rounded-md p-[5px] mt-1 w-[100%] mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' /><br />

                        <label className='text-[13px] xl:text-[14px] font-medium'>Description
                        </label><br />
                        <textarea type='text' required value={description} onChange={(e) => { setDescription(e.target.value) }} className='border border-1 rounded-md p-[5px] mt-1 w-[100%] mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' /><br />


                    </div>
                    <div className='pr-[10px] pb-3 flex gap-[10px] justify-end border-t pt-3'>
                        <button className='first-btn' onClick={closeModal2}>Cancel</button>
                        <button className={'second-btn ' + (isLoading && "animate-pulse cursor-not-allowed")} disabled={isLoading} onClick={() => {
                            if (editingId !== "") {
                                editCustomField();
                            }
                            else {
                                submitField();
                            }
                        }}>{editingId !== "" ? " Edit " : " Add "} Custom Field </button>
                    </div>
                </div>
            </Modal>
            {/* </div> */}
        </>
    )
}

export default CustomDetail