import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import CloseIcon from '@mui/icons-material/Close';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useGlobalContext } from '../../../Context/GlobalContext';

const EditLeavePolicies = () => {
    const [activeTab, setActiveTab] = useState('leave-requests')
    const [activeSubTab, setActiveSubTab] = useState('pending')
    const { baseUrl, selectedStaff } = useGlobalContext();
    const [selectDuration, setSelectDuration] = useState();
    const [editingRow, setEditingRow] = useState(null);
    const [leavePolicyType, setLeavePolicyType] = useState();
    const [allowedLeavesPerYear, setAllowedLeavePerYear] = useState();
    const [carryForwardLeaves, setCarryForwardLeaves] = useState();
    const [editLeaveID, setEditLeaveID] = useState(null);
    const [deleteLeaveID, setDeleteLeaveID] = useState(null);
    const [editLeaveStatus, setEditLeaveStatus] = useState('');
    const [editLeaveStartDate, setEditLeaveStartDate] = useState('');
    const [editLeaveEndDate, setEditLeaveEndDate] = useState('');
    const [editLeaveRequestDate, setEditLeaveRequestDate] = useState('');
    const [saveLeaveRequestEdit, setSaveLeaveRequestEdit] = useState('');

    console.log(editLeaveID);


    const [updatePolicy, setUpdatePolicy] = useState({
        allowed_leaves: 0,
        carry_forward_leaves: 0
    })

    // console.log(updatePolicy);

    // console.log(selectDuration, leavePolicyType, allowedLeavesPerYear, carryForwardLeaves);
    async function createLeavePolicy(e) {
        e.preventDefault();
        const data = {
            name: leavePolicyType,
            allowed_leaves: Number(allowedLeavesPerYear),
            carry_forward_leaves: Number(carryForwardLeaves)
        };


        const response = await fetch(baseUrl + "leave-policy/" + selectedStaff?.staffDetails.id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data) // send the formatted data
        });
        console.log(response);

        const result = await response.json();
        if (response.status === 201) {
            console.log(result);
            alert("Policy Create Successfully");
        } else {
            console.log(result);
            alert("Error in creating Policy");
        }
    }
    async function updateLeavePolicy(e) {
        e.preventDefault();
        const data = {
            name: selectedStaff?.LeavePolicy?.filter(({ id }) => id === editingRow)[0]?.name,
            allowed_leaves: Number(updatePolicy?.allowed_leaves),
            carry_forward_leaves: Number(updatePolicy?.carry_forward_leaves)
        };

        console.log(data);

        const response = await fetch(baseUrl + "leave-policy/" + editingRow, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data) // send the formatted data
        });
        console.log(response);

        const result = await response.json();
        console.log(result);
        if (response.status === 200) {
            console.log(result);
            alert("Policy update Successfully");
        } else {
            console.log(result);
            alert("Error in upating Policy");
        }
        setEditingRow(null);
    }

    const [fetchAllLeaveRequest, setFetchAllLeaveRequest] = useState([]);
    console.log(selectedStaff);
    
    async function getAllLeaveRequest() {
        const response = await fetch(baseUrl + "leave-request/" + selectedStaff?.staffDetails?.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(response);

        const result = await response.json();
        if (response.status === 200) {
            console.log(result);
            console.log(result);
            setFetchAllLeaveRequest(result);
            alert("Policy update Successfully");
        } else {
            console.log(result);
            alert("Error in upating Policy");
        }
    }
    async function deleteLeaveRequest(e) {
        e.preventDefault();
        const response = await fetch(baseUrl + "leave-request/" + deleteLeaveID, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(response);

        const result = await response.json();
        if (response.status === 200) {
            console.log(result);
            setDeleteLeaveID(null);
            alert("Leave request delete Successfully");
        } else {
            console.log(result);
            alert("Error in deleting leave re");
        }
    }


    async function editLeaveRequest(e) {
        e.preventDefault();
        // console.log(editLeaveEndDate, editLeaveRequestDate, editLeaveStartDate, editLeaveStatus);
        const data = {
            staffId: selectedStaff?.id,
            leaveTypeId: editLeaveID,
            request_date: new Date(editLeaveRequestDate).toISOString(),
            start_date: new Date(editLeaveStartDate).toISOString(),
            end_date: new Date(editLeaveEndDate).toISOString(),
            status: editLeaveStatus,
        }

        console.log(saveLeaveRequestEdit);
        const response = await fetch(baseUrl + "leave-request/" + saveLeaveRequestEdit, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        console.log(response);

        const result = await response.json();
        if (response.status === 200) {
            console.log(result);
            setEditLeaveID('');
            setEditLeaveStatus('');
            setEditLeaveStartDate('');
            setEditLeaveEndDate('');
            setEditLeaveRequestDate('');
            setSaveLeaveRequestEdit('');
            alert("Leave Request update Successfully");
        } else {
            console.log(result);
            alert("Error in upating leave request");
        }
        console.log(data);
    }



    let subtitle;
    // when onclick update staff
    const [modalIsOpen10, setIsOpen10] = React.useState(false);
    function openModal10() {
        setIsOpen10(true);
    }
    function afterOpenModal10() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#000';

    }



    function closeModal10() {
        setIsOpen10(false);
    }
    // when onclick update staff


    // when on click update leave policiy
    const [modalIsOpen12, setIsOpen12] = React.useState(false);
    function openModal12() {
        setIsOpen12(true);
    }
    function afterOpenModal12() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#000';

    }

    function closeModal12() {
        setIsOpen12(false);
    }
    // when on click update leave policy


    const [isOpenLeaveRequestModal, setIsOpenLeaveRequestModal] = useState(false);


    /**
     * Opens the leave request modal by setting the state to true.
     */
    function openLeaveRequestModal() {
        setIsOpenLeaveRequestModal(true);
    }


    function afterOpenLeaveRequestModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#000';

    }
    /**
     * Close the leave request modal
    **/

    function closeOpenLeaveRequestModal() {
        setIsOpenLeaveRequestModal(false)
    }

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const options = {
            // weekday: 'long',  // e.g., "Sunday"
            year: 'numeric',  // e.g., "2024"
            month: 'long',    // e.g., "October"
            day: 'numeric',   // e.g., "27"
            // hour: '2-digit',  // e.g., "05"
            // minute: '2-digit', // e.g., "30"
            // second: '2-digit', // e.g., "00"
            // hour12: true      // e.g., "AM/PM"
        };
        return date.toLocaleString('en-US', options);
    };

    const formatDateToInput = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    useEffect(() => { getAllLeaveRequest() }, [
        saveLeaveRequestEdit, deleteLeaveID
    ])

    return (
        <div className='w-full p-[20px] pt-[80px] xl:p-[40px] relative xl:pt-[60px]    xl:pl-[320px] flex flex-col '>
            <div className='flex justify-between items-center  w-[100%] p-[20px] xl:pr-0 pr-0  pl-[0] top-0 bg-white'>

                <h3 className='font-medium'>Leave & Balance Details
                </h3>
                <button className='second-btn'>Update Details</button>
            </div>


            <div className='mt-5'>
                <button className='shadow bg-white w-full mb-4  text-start text-[14px]  text-[#000] p-4 rounded-md ' onClick={openModal12}> Leave Policy</button>
                <button className='shadow bg-white w-full mb-4  text-start text-[14px]  text-[#000] p-4 rounded-md ' onClick={openModal10}> Leave Balances</button>
                <button className='shadow bg-white w-full mb-4  text-start text-[14px]  text-[#000] p-4 rounded-md ' onClick={openLeaveRequestModal} > Leave Request</button>





            </div>




            {/* when onclick update staff */}

            <Modal
                isOpen={modalIsOpen10}
                onAfterOpen={afterOpenModal10}
                onRequestClose={closeModal10}
                // style={customStyles}
                contentLabel="Example Modal"
                className="w-[96%] xl:w-[40%] absolute top-[50%] left-[50%] bottom-auto p-0 bg-[#fff] shadow-md rounded-[10px] translate-x-[-50%] translate-y-[-50%]"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} className='border-b p-3     text-[14px] text-center bg-[#F0F6FE] rounded-t-lg rounded-r-lg rounded-b-none'>Update Leave Balances for all Staff</h2>
                <button onClick={closeModal10} className='absolute right-[5px] top-[3px] font-semibold	  bg-[#511992] rounded-full'><CloseIcon className='text-white' /></button>
                <div className='pb-2'>


                    <div className='flex justify-between items-center p-[10px] border border-b border-l-0  border-t-0 border-r-0 pl-[20px] text-[13px] xl:text-[14px] '>
                        <div className='flex gap-[0px] items-center '>
                            <h4 className='m-0 font-medium text-[10px] xl:text-[14px]' >Step 1. Download SalaryBox Template</h4>
                        </div>
                        <div className="flex items-center  ">
                            <Link to="#" className='whitespace-nowrap outline-dashed p-1 rounded-md text-[13px] outline-1 outline-offset-1'>Download Template</Link>
                        </div>
                    </div>




                    <div className='flex justify-between items-center p-[10px] border border-b border-l-0  border-t-0 border-r-0 pl-[20px] text-[13px] xl:text-[14px] '>
                        <div className='flex gap-[0px] items-center '>
                            <h4 className='m-0 font-medium text-[10px] xl:text-[14px]' >Step 2. Upload Leave Balances</h4>
                        </div>
                        <div className="flex items-center  ">
                            <button className='outline-dashed p-1 rounded-md text-[13px] outline-1 outline-offset-1'>Upload Staff List</button>
                            {/* <input type='file' placeholder='ddjfksj'/> */}
                        </div>
                    </div>



                </div>
            </Modal>
            {/* when onclick update staff
             */}




            {/* when onclick leave policies
             */}
            <Modal
                isOpen={modalIsOpen12}
                onAfterOpen={afterOpenModal12}
                onRequestClose={closeModal12}
                // style={customStyles}
                contentLabel="Example Modal"
                className="w-[96%] xl:w-[40%] absolute top-[50%] left-[50%] bottom-auto p-0 bg-[#fff] shadow-md rounded-[10px] translate-x-[-50%] translate-y-[-50%]"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} className='border-b p-3     text-[14px]   rounded-t-lg rounded-r-lg rounded-b-none'>Update Leave Policy for all staff</h2>
                <button onClick={closeModal12} className='absolute right-[5px] top-[3px] font-semibold	  bg-[#511992] rounded-full'><CloseIcon className='text-white' /></button>
                <div className='pb-2'>

                    <Tabs className="p-[s0px] fixed-tab-section">
                        <TabList className="flex justify-around items-center mt-3 m-2 xl:m-2 mb-2 bg-[#F4F5F9] pt-[10px] pb-[10px] rounded-md">
                            <label className='text-[14px]'>Select Type</label>
                            <Tab className="cursor-pointer flex items-center gap-[10px]">
                                <input onChange={(e) => setSelectDuration(e.target.value)} value={"Month"} type="radio" id="fixed" name='fixed' className='rounded-full ' />
                                <label for="fixed" className='text-[14px]'> Monthly</label><br />
                            </Tab>
                            <Tab className="cursor-pointer flex items-center gap-[10px]">
                                <input onChange={(e) => setSelectDuration(e.target.value)} value={"Year"} type="radio" id="flexible" name='fixed' className='rounded-full ' />
                                <label for="flexible" className='text-[14px]'> Yearly</label><br />
                            </Tab>
                        </TabList>
                        <TabPanel>
                            <div className='w-[100%] flex rounded-md shadow overflow-scroll border border-1 mt-4 pl-3 pr-3'>
                                <table className='table-section mt-4'>
                                    <thead className='border border-1 '>
                                        <th>Leave Type</th>
                                        <th>Allowed Leaves (Per Month)</th>
                                        <th>Carry-forward Leaves (On Month End)</th>

                                    </thead>
                                    <tbody>
                                        <td>Casual Leave</td>
                                        <td><input type='text' /></td>
                                        <td><input type='text' /></td>

                                    </tbody>
                                </table>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className='w-[100%] flex rounded-md shadow overflow-scroll border border-1 mt-4 pl-3 pr-3'>
                                <table className='table-section mt-4'>
                                    <thead className='border border-1 '>
                                        <th>Leave Type</th>
                                        <th>Allowed Leaves (Per Year)</th>
                                        <th>Carry-forward Leaves (On Year End)</th>

                                    </thead>
                                    <tbody>

                                        {
                                            selectedStaff?.staffDetails?.LeavePolicy?.map(({ id, carry_forward_leaves, allowed_leaves, name }) => <tr key={id}>
                                                <td onClick={() => {
                                                    setEditingRow(id);
                                                    setUpdatePolicy({ carry_forward_leaves, allowed_leaves })
                                                }}>{name}</td>
                                                <td>
                                                    {editingRow === id ? (
                                                        <input
                                                            className='text-center'
                                                            type="number"
                                                            value={updatePolicy.allowed_leaves}
                                                            onChange={(e) => setUpdatePolicy((prev) => {
                                                                return { ...prev, allowed_leaves: e.target.value }
                                                            })} autoFocus
                                                        />
                                                    ) : (
                                                        allowed_leaves
                                                    )}
                                                </td>

                                                {/* Editable Carry Forward Leaves Field */}
                                                <td>
                                                    {editingRow === id ? (
                                                        <input
                                                            className='text-center'
                                                            type="number"
                                                            value={updatePolicy.carry_forward_leaves}
                                                            onChange={(e) => setUpdatePolicy((prev) => {
                                                                return { ...prev, carry_forward_leaves: e.target.value }
                                                            })}
                                                        />
                                                    ) : (
                                                        carry_forward_leaves
                                                    )}
                                                </td>
                                            </tr>)}
                                        <tr>
                                            <td><input className=' py-2 text-center placeholder:text-center  outline-none focus:outline-none border mx-2 border-slate-400' placeholder='New Policy Type' value={leavePolicyType} onChange={(e) => setLeavePolicyType(e.target.value)} type='text' /></td>
                                            <td><input className=' py-2 text-center placeholder:text-center  outline-none focus:outline-none border mx-2 border-slate-400' placeholder='Set Allowed Leaves' value={allowedLeavesPerYear} onChange={(e) => setAllowedLeavePerYear(e.target.value)} type='text' /></td>
                                            <td><input className=' py-2 w-2/3 text-center placeholder:text-center  outline-none focus:outline-none border mx-2 border-slate-400' placeholder='Set Carry Forward Leaves' value={carryForwardLeaves} onChange={(e) => setCarryForwardLeaves(e.target.value)} type='text' /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </TabPanel>

                    </Tabs>
                    <button onClick={(e) => {
                        if (editingRow) {
                            updateLeavePolicy(e)
                        } else {
                            createLeavePolicy(e)
                        }
                    }} className='second-btn'>Update Details</button>
                    <div>

                    </div>
                </div>
            </Modal>
            {/* when onclick leave policies
             */}
            <Modal
                isOpen={isOpenLeaveRequestModal}
                onAfterOpen={afterOpenLeaveRequestModal}
                onRequestClose={closeOpenLeaveRequestModal}
                // style={customStyles}
                contentLabel="Example Modal"
                className="w-[96%] xl:w-[55%] absolute top-[50%] left-[50%] bottom-auto p-0 bg-[#fff] shadow-md rounded-[10px] translate-x-[-50%] translate-y-[-50%]"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} className='border-b p-3     text-[14px] text-center bg-[#F0F6FE] rounded-t-lg rounded-r-lg rounded-b-none'>Pending Requests</h2>
                <button onClick={closeOpenLeaveRequestModal} className='absolute right-[5px] top-[3px] font-semibold	  bg-[#511992] rounded-full'><CloseIcon className='text-white' /></button>
                <div className='pb-2'>
                    <div className="w-full max-w-6xl mx-auto p-4">
                        <div className="flex border-b mb-4">
                            <button
                                className={`py-2 px-4 font-medium ${activeTab === 'leave-requests'
                                    ? 'text-[#511992] border-b-2 border-[#511992]'
                                    : 'text-gray-500'
                                    }`}
                                onClick={() => setActiveTab('leave-requests')}
                            >
                                Leave Requests
                            </button>
                            <button
                                className={`py-2 px-4 font-medium ${activeTab === 'device-verification'
                                    ? 'text-[#511992] border-b-2 border-[#511992]'
                                    : 'text-gray-500'
                                    }`}
                                onClick={() => setActiveTab('device-verification')}
                            >
                                Device Verification Requests
                            </button>
                        </div>

                        {activeTab === 'leave-requests' && (
                            <div>
                                <div className="flex space-x-2 mb-4">
                                    <button
                                        className={`py-1 px-4 rounded-full ${activeSubTab === 'pending'
                                            ? 'bg-[#511992] text-white'
                                            : 'bg-gray-200 text-gray-700'
                                            }`}
                                        onClick={() => setActiveSubTab('pending')}
                                    >
                                        Pending
                                    </button>
                                    <button
                                        className={`py-1 px-4 rounded-full ${activeSubTab === 'history'
                                            ? 'bg-[#511992] text-white'
                                            : 'bg-gray-200 text-gray-700'
                                            }`}
                                        onClick={() => setActiveSubTab('history')}
                                    >
                                        History
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-5 gap-1 mb-4">
                                    <div className="col-span-1 md:col-span-2 relative">
                                        <input
                                            type="text"
                                            placeholder="Search staff by name"
                                            className="w-full pl-10 pr-4 py-2 border rounded-md"
                                        />
                                        {/* <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" /> */}
                                    </div>
                                    <div className="relative">
                                        <select className="  w-full appearance-none border rounded-md py-2 pl-4 pr-10">
                                            <option>Branch</option>
                                            <option>Branch 1</option>
                                            <option>Branch 2</option>
                                        </select>
                                        {/* <ChevronDownIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" /> */}
                                    </div>
                                    <div className="relative">
                                        <select className="w-full appearance-none border rounded-md py-2 pl-4 pr-10">
                                            <option>Department</option>
                                            <option>HR</option>
                                            <option>IT</option>
                                        </select>
                                        {/* <ChevronDownIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" /> */}
                                    </div>
                                    <div className="flex justify-end mb-4">
                                        <input type="date" placeholder='Select Month' className=" w-full px-2 appearance-none border rounded-md py-2 text-gray-700"></input>
                                    </div>
                                </div>
                                <table className=' w-full table-section mt-4'>
                                    <thead className='border border-1'>
                                        <tr> {/* Wrap header cells in a <tr> */}
                                            <th>Leave Type</th>
                                            <th>Status</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Request Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {fetchAllLeaveRequest?.map(({ id, leavePolicy, status, start_date, end_date, request_date }) => (
                                            <tr key={id}>
                                                <td>
                                                    {leavePolicy?.name}
                                                </td>
                                                <td>
                                                    {saveLeaveRequestEdit === id ? (
                                                        <input
                                                            className='text-center'
                                                            type="text"
                                                            value={editLeaveStatus}
                                                            onChange={(e) => setEditLeaveStatus(e.target.value)}
                                                        />
                                                    ) : (
                                                        status
                                                    )}
                                                </td>
                                                <td>{saveLeaveRequestEdit === id ? (
                                                    <input
                                                        className='text-center'
                                                        type="date"
                                                        value={editLeaveStartDate} // Ensure you have the date format handled
                                                        onChange={(e) => setEditLeaveStartDate(e.target.value)}
                                                    />
                                                ) : (
                                                    formatDate(start_date)
                                                )}
                                                </td>
                                                <td>{saveLeaveRequestEdit === id ? (
                                                    <input
                                                        className='text-center'
                                                        type="date"
                                                        value={editLeaveEndDate} // Ensure you have the date format handled
                                                        onChange={(e) => setEditLeaveEndDate(e.target.value)}
                                                    />
                                                ) : (
                                                    formatDate(end_date)
                                                )}
                                                </td>
                                                <td>{saveLeaveRequestEdit === id ? (
                                                    <input
                                                        className='text-center'
                                                        type="date"
                                                        value={editLeaveRequestDate} // Ensure you have the date format handled
                                                        onChange={(e) => setEditLeaveRequestDate(e.target.value)}
                                                    />
                                                ) : (
                                                    formatDate(request_date)
                                                )}
                                                </td>
                                                <td className='text-center flex items-center justify-evenly'>
                                                    {saveLeaveRequestEdit === id ? (
                                                        <p className='text-green-500 font-bold cursor-pointer' onClick={(e) => {
                                                            editLeaveRequest(e);

                                                        }}>Save</p>
                                                    ) : (
                                                        <>
                                                            <p className='text-blue-500 font-bold cursor-pointer' onClick={(e) => {
                                                                e.preventDefault();
                                                                setSaveLeaveRequestEdit(id);
                                                                setEditLeaveID(leavePolicy?.id);
                                                                setEditLeaveRequestDate(formatDateToInput(request_date));
                                                                setEditLeaveEndDate(formatDateToInput(end_date));
                                                                setEditLeaveStartDate(formatDateToInput(start_date));
                                                                setEditLeaveStatus(status);

                                                            }}>Edit</p>
                                                            <p className='text-red-500 font-bold cursor-pointer' onClick={(e) => {
                                                                e.preventDefault();
                                                                setDeleteLeaveID(id);
                                                                deleteLeaveRequest(e);
                                                            }}>Del</p>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}


                                    </tbody>
                                </table>

                                {/* <tr>
                                            <td><input className=' py-2 text-center placeholder:text-center  outline-none focus:outline-none border mx-2 border-slate-400' placeholder='New Policy Type' value={leavePolicyType} onChange={(e) => setLeavePolicyType(e.target.value)} type='text' /></td>
                                            <td><input className=' py-2 text-center placeholder:text-center  outline-none focus:outline-none border mx-2 border-slate-400' placeholder='Set Allowed Leaves' value={allowedLeavesPerYear} onChange={(e) => setAllowedLeavePerYear(e.target.value)} type='text' /></td>
                                            <td><input className=' py-2 w-2/3 text-center placeholder:text-center  outline-none focus:outline-none border mx-2 border-slate-400' placeholder='Set Carry Forward Leaves' value={carryForwardLeaves} onChange={(e) => setCarryForwardLeaves(e.target.value)} type='text' /></td>
                                        </tr> */}

                            </div>
                        )}

                        {activeTab === 'device-verification' && (
                            <div className="text-center py-16">
                                <p className="text-lg font-medium text-gray-600">Device Verification Content</p>
                            </div>
                        )}
                    </div>

                </div>
            </Modal>

        </div>
    )
}

export default EditLeavePolicies