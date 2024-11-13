import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import Modal from 'react-modal';
import CloseIcon from '@mui/icons-material/Close';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useGlobalContext } from '../../../Context/GlobalContext';

const CustomDetail = () => {
    let subtitle;
    const { baseUrl, selectedStaff } = useGlobalContext();
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

    const [allCustomDetail, setAllCustomDetail] = useState(selectedStaff?.staffDetails?.CustomDetails);

    const [fieldName, setFieldName] = useState("");
    const [description, setDescription] = useState("");

    async function submitField() {
        const data = { field_name: fieldName, field_value: description, staffId: selectedStaff.staffDetails.id }
        console.log(data);
        const response = await fetch(baseUrl + "custom-details", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data) // send the formatted data
        });

        console.log(response);

        if (response.status === 201) {
            const result = await response.json()
            console.log(result.data);
            setAllCustomDetail([...allCustomDetail, result?.data])
            alert("Add Custom Field Successfully");
        } else {
            alert("An error occurred");
        }
    }
    async function editCustomField() {
        const data = { field_name: fieldName, field_value: description }
        console.log(data);
        const response = await fetch(baseUrl + "custom-details/" + editingId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data) // send the formatted data
        });

        console.log(response);

        if (response.status === 200) {
            const result = await response.json()
            setAllCustomDetail(allCustomDetail.map((item) => item.id === editingId ? { ...item, field_name: fieldName, field_value: description } : item));
            setEditingId("");
            console.log(result.data);
            alert("edit Custom Field Successfully");
        } else {
            alert("An error occurred");
        }
    }
    async function deleteCustomDetail(id) {
        const response = await fetch(baseUrl + "custom-details/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log(response);

        if (response.status === 200) {
            const result = await response.json()
            console.log(result);
            setAllCustomDetail(allCustomDetail.filter((item) => item.id !== id));
            alert("Deleted Custom Field Successfully");
        } else {
            alert("An error occurred");
        }
    }

    return (
        <div className='w-full p-[20px] pt-[80px] xl:p-[40px] relative xl:pt-[60px]    xl:pl-[320px] flex flex-col set-z'>
            <div className='flex justify-between items-center  w-[100%] p-[20px] xl:pr-0 pr-0  pl-[0] top-0 bg-white'>

                <h3 className='font-medium'>Custom Details
                </h3>
                <button className='second-btn'>Update Details</button>
            </div>

            <div className="w-full bg-white shadow-md rounded-lg overflow-hidden mb-5">
                <div className="rounded-md border border-gray-200">
                    {allCustomDetail?.map(({ field_name, field_value, id }) => (<div key={id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                        <span className="text-sm text-gray-700">{field_name}</span>
                        <span className="text-sm text-gray-700">{field_value}</span>
                        <div className="flex items-center gap-2">
                            <button onClick={() => {
                                openModal2();
                                setEditingId(id);
                            }} className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded">
                                Edit
                            </button>
                            <button onClick={() => {
                                console.log(id);
                                deleteCustomDetail(id)
                            }} className="px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded">
                                Delete
                            </button>
                        </div>
                    </div>))}

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
                <button onClick={closeModal2} className='absolute right-[5px] top-[3px] font-semibold	  bg-[#511992] rounded-full'><CloseIcon className='text-white' /></button>
                <div className=''>
                    <div className='modal-field field-modal p-[10px] border border-t'>
                        <label className='text-[13px] xl:text-[14px] font-medium'>Custom Field Name
                        </label><br />
                        <input type='text' value={fieldName} onChange={(e) => { setFieldName(e.target.value) }} className='border border-1 rounded-md p-[5px] mt-1 w-[100%] mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' /><br />

                        <label className='text-[13px] xl:text-[14px] font-medium'>Description
                        </label><br />
                        <textarea type='text' value={description} onChange={(e) => { setDescription(e.target.value) }} className='border border-1 rounded-md p-[5px] mt-1 w-[100%] mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' /><br />


                    </div>
                    <div className='pr-[10px] pb-3 flex gap-[10px] justify-end border-t pt-3'>
                        <button className='first-btn' onClick={closeModal2}>Cancel</button>
                        <button className='second-btn' onClick={() => {
                            if (editingId !== "") {
                                editCustomField();
                            }
                            else {
                                submitField();
                            }
                        }}>Add Custom Field </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default CustomDetail