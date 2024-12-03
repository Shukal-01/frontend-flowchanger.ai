import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import CloseIcon from '@mui/icons-material/Close';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useGlobalContext } from '../../../Context/GlobalContext';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SearchIcon from '@mui/icons-material/Search';


const EditLeavePolicies = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('leave-requests')
    const [activeSubTab, setActiveSubTab] = useState('pending')
    const [isLoading, setIsLoading] = useState(false);
    const { baseUrl, selectedStaff, openToast, } = useGlobalContext();
    const [staff, setStaff] = useState(null);
    const [selectDuration, setSelectDuration] = useState("");
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

    const [fetchAllLeaveRequest, setFetchAllLeaveRequest] = useState([]);
    const [updateLeaveBalance, setUpdateLeaveBalance] = useState(selectedStaff?.staffDetails?.LeaveBalance?.map(item => ({ balance: item?.balance, leaveName: selectedStaff?.staffDetails?.LeavePolicy?.find(policy => policy?.id === item?.leavePolicyId)?.name, used: item?.used, id: item?.id })));

    const [fetchLeavePolicy, setFetchLeavePolicy] = useState(selectedStaff?.staffDetails?.LeavePolicy || []);

    const [updatePolicy, setUpdatePolicy] = useState({
        allowed_leaves: 0,
        carry_forward_leaves: 0
    })

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
                setStaff(filteredData);
                setUpdateLeaveBalance(filteredData?.staffDetails?.LeaveBalance?.map(item => ({ balance: item?.balance, leaveName: filteredData?.staffDetails?.LeavePolicy?.find(policy => policy?.id === item?.leavePolicyId)?.name, used: item?.used, id: item?.id })))
                setFetchLeavePolicy(filteredData?.staffDetails?.LeavePolicy);
                // console.log("Filtered data by ID:", filteredData);

            } else {
                console.error("Failed to retrieve data:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("An error occurred while fetching data:", error);
        }
    };

    useEffect(() => {
        getData();
    }, [])
    console.log(fetchLeavePolicy);


    // console.log(updateLeaveBalance);
    const updatedLeaveBalance = async () => {
        setIsLoading(true);
        try {
            const allData = [];
            for (const data of updateLeaveBalance) {
                const response = await fetch(baseUrl + "leave-balance/" + data?.id, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ...data, balance: Number(data?.balance), used: Number(data?.used), policy_type: selectDuration })
                });
                const result = await response.json();
                if (response.status === 200) {
                    allData.push(result);
                }
            }
            if (allData.length > 0) {
                console.log(allData);
                openToast("Leave Balance updated Successfully", "success");
            }
            else {
                openToast("An error occurred while updating leave balance", "error");
            }
        } catch (error) {
            console.error("Error updating leave balance:", error);
            openToast("An error occurred while updating leave balance", "error");
        } finally {
            setIsLoading(false);
        }
    }


    // console.log(fetchLeavePolicy);
    // console.log(updatePolicy);

    // console.log(selectDuration, leavePolicyType, allowedLeavesPerYear, carryForwardLeaves);
    async function createLeavePolicy(e) {
        setIsLoading(true);
        e.preventDefault();
        const data = {
            policy_type: selectDuration,
            name: leavePolicyType,
            allowed_leaves: Number(allowedLeavesPerYear),
            carry_forward_leaves: Number(carryForwardLeaves)
        };

        try {
            const response = await fetch(baseUrl + "leave-policy/" + selectedStaff?.staffDetails?.id, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            console.log(response);

            const result = await response.json();
            console.log(result);
            if (response.ok) {
                console.log(result);
                setFetchLeavePolicy([...fetchLeavePolicy, result]);
                setLeavePolicyType("");
                setAllowedLeavePerYear("");
                setCarryForwardLeaves("");
                openToast("Leave Policy created Successfully", "success");
            }
            else {
                openToast("An error occurred while creating leave policy", "error");
            }
        } catch (error) {
            console.error("Error creating leave policy:", error);
            openToast("An error occurred while creating leave policy", "error");
        } finally {
            setIsLoading(false);
        }
    }

    async function updateLeavePolicy(e) {
        setIsLoading(true);
        e.preventDefault();
        const data = {
            policy_type: selectDuration,
            name: leavePolicyType,
            allowed_leaves: Number(updatePolicy?.allowed_leaves),
            carry_forward_leaves: Number(updatePolicy?.carry_forward_leaves)
        };

        console.log(data);

        try {
            const response = await fetch(baseUrl + "leave-policy/" + editingRow, {
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

                setFetchLeavePolicy([...fetchLeavePolicy, result]);
                openToast("Leave Policy updated Successfully", "success");
            }
            else {
                openToast("An error occurred while updating leave policy", "error");
            }
        } catch (error) {
            console.error("Error updating leave policy:", error);
            openToast("An error occurred while updating leave policy", "error");
        } finally {
            setIsLoading(false);
            setEditingRow(null);
        }
    }

    async function getAllLeaveRequest() {
        try {
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
                setFetchAllLeaveRequest(result);

            } else {
                console.log(result);
            }
        } catch (error) {
            console.error("Error retrieving leave requests:", error);
        }
    }

    async function deleteLeaveRequest(e, id) {
        e.preventDefault();
        try {
            const response = await fetch(baseUrl + "leave-request/" + id, {
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
                openToast("Leave Request deleted Successfully", "success");
            }
            else {
                openToast("An error occurred while deleting leave request", "error");
            }
        } catch (error) {
            console.error("Error deleting leave request:", error);
            openToast("An error occurred while deleting leave request", "error");
        }

    }

    async function editLeaveRequest(e, id) {
        setIsLoading(true);
        e.preventDefault();
        const data = {
            staffId: selectedStaff?.staffDetails?.id,
            leaveTypeId: editLeaveID,
            request_date: new Date(editLeaveRequestDate).toISOString(),
            start_date: new Date(editLeaveStartDate).toISOString(),
            end_date: new Date(editLeaveEndDate).toISOString(),
            status: editLeaveStatus,
        };

        try {
            const response = await fetch(baseUrl + "leave-request/" + id, {
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

                fetchAllLeaveRequest.map((item) => {
                    if (item.id === saveLeaveRequestEdit) {
                        item.status = editLeaveStatus;
                        item.start_date = editLeaveStartDate;
                        item.end_date = editLeaveEndDate;
                        item.request_date = editLeaveRequestDate;
                    }
                })
                setEditLeaveID('');
                setEditLeaveStatus('');
                setEditLeaveStartDate('');
                setEditLeaveEndDate('');
                setEditLeaveRequestDate('');
                setSaveLeaveRequestEdit('');
                openToast("Leave Request updated Successfully", "success");
            }
            else {
                openToast("An error occurred while updating leave request", "error");
            }
        } catch (error) {
            console.error("Error updating leave request:", error);
            openToast("An error occurred while updating leave request", "error");
        } finally {
            setIsLoading(false);
        }
    }

    console.log(deleteLeaveID);

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
    // function afterOpenModal12() {
    //     // references are now sync'd and can be accessed.
    //     subtitle.style.color = '#000';
    // }

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
        <div className='w-full xl:pt-[20px] xl:pl-[0] xl:pr-[0] relative   pl-[0] flex flex-col '>
            <div className='flex justify-between items-center  w-[100%] xl:pr-0 pr-0  pl-[0] top-0 bg-white'>

                <h3 className='font-medium'>Leave & Balance Details
                </h3>
                <button className='second-btn mt-[10px] ml-[10px]'>Update Details</button>
            </div>


            <div className='mt-5'>
                <button className='shadow-cs bg-white w-full mb-4 flex items-center justify-between text-start text-[14px]  text-[#000] p-4 rounded-lg ' onClick={openModal12}> Leave Policy <ArrowForwardIosIcon className='allarrow-verify' /></button>
                <button className='shadow-cs bg-white w-full mb-4  flex items-center justify-between text-start text-[14px]  text-[#000] p-4 rounded-lg ' onClick={openModal10}> Leave Balances <ArrowForwardIosIcon className='allarrow-verify' /></button>
                <button className='shadow-cs bg-white w-full mb-4  flex items-center justify-between text-start text-[14px]  text-[#000] p-4 rounded-lg ' onClick={openLeaveRequestModal} > Leave Request <ArrowForwardIosIcon className='allarrow-verify' /></button>





            </div>




            {/* when onclick update staff */}

            <Modal
                isOpen={modalIsOpen10}
                // onAfterOpen={afterOpenModal12}
                onRequestClose={closeModal10}
                // style={customStyles}
                contentLabel="Example Modal"
                className="w-[96%] xl:w-[40%]  h-[auto]  absolute top-[50%] left-[50%] bottom-auto p-[20px] bg-[#fff] shadow-cs rounded-[10px] translate-x-[-50%] translate-y-[-50%]"
            >
                {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)} className='border-b p-3     text-[14px] text-center bg-[#F0F6FE] rounded-t-lg rounded-r-lg rounded-b-none'>Update Leave Balances for all Staff</h2> */}
                <button onClick={closeModal10} className='absolute right-[5px] top-[3px] font-semibold	  bg-[#27004a] rounded-full'><CloseIcon className='text-white' /></button>
                <div className='mt-[20px]'>


                    <div className='flex justify-between items-center mb-[24px] border-t-0 border-r-0  text-[13px] xl:text-[14px] '>
                        <div className='flex gap-[6px] items-center '>
                            <h4 className='m-0 font-medium text-[12px] xl:text-[14px] text-[27004a] ' >Leave & Balance Details </h4>
                            <p className='font-medium '> Leave Balance</p>

                        </div>
                        <div className="flex items-center  ">
                            <button onClick={updatedLeaveBalance} className='whitespace-nowrap bg-[#27004a] p-[8px] text-[white] rounded-md text-[13px] outline-1 outline-offset-1'>Update Details</button>
                        </div>
                    </div>


                    <div className="border border-[#dbdbdb] shadow-cs rounded-md bg-[#fff] p-[8px] mb-3">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-gray-700 text-[14px] font-medium">Leave Type</div>
                            <div className="text-gray-700 font-medium text-[14px]">Remaining Balance</div>
                        </div>
                    </div>
                    {
                        updateLeaveBalance?.map((item, index) => (
                            <div key={item?.id} className=" mb-[14px] grid grid-cols-2 gap-4 border border-[#cbcbcb] rounded-md p-[8px] bg-[#fafafa] items-center">
                                <div className="text-gray-700 font-medium text-[15px] capitalize"> {item?.leaveName} Leaves</div>
                                <div className="flex items-center gap-2">
                                    <input
                                        value={item?.balance}
                                        onChange={(e) => setUpdateLeaveBalance((prev) =>
                                            prev.map((obj, idx) =>
                                                idx === index
                                                    ? { ...obj, balance: e.target.value }
                                                    : obj
                                            )
                                        )}
                                        type="number"
                                        placeholder='1'
                                        className="w-32 focus-visible:outline-none px-3 py-1 border rounded-md bg-white"
                                    />
                                    <span className="text-gray-600 text-[15px] font-medium">leaves</span>
                                </div>
                            </div>
                        ))
                    }
                    {/* <div className=" mb-[14px] grid grid-cols-2 gap-4 border border-[#cbcbcb] rounded-md p-[8px] bg-[#fafafa] items-center">
                        <div className="text-gray-700 font-medium text-[15px]">Privileged Leave</div>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                placeholder='1'
                                className="w-32 focus-visible:outline-none px-3 py-1 border rounded-md bg-white"
                            />
                            <span className="text-gray-600 text-[15px] font-medium">leaves</span>
                        </div>
                    </div> */}
                </div>
            </Modal >

            {/* when onclick update staff
             */}




            {/* when onclick leave policies
             */}
            <Modal
                isOpen={modalIsOpen12}
                // onAfterOpen={afterOpenModal12}
                onRequestClose={closeModal12}
                contentLabel="Example Modal"
                className="w-[96%] xl:w-[40%] absolute top-[50%] left-[50%] bottom-auto p-0 bg-[#fff] shadow-cs rounded-[10px] translate-x-[-50%] translate-y-[-50%]"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} className='border-b p-3     text-[14px]   rounded-t-lg rounded-r-lg rounded-b-none'>Update Leave Policy for all staff</h2>
                <button onClick={closeModal12} className='absolute right-[5px] top-[3px] font-semibold	  bg-[#27004a] rounded-full'><CloseIcon className='text-white bg-[#27004a] rounded-2xl' /></button>
                <div className='pb-2'>

                    <Tabs className="p-[s0px] fixed-tab-section">
                        <TabList className="flex justify-around items-center mt-3 m-2 xl:m-2 mb-2 bg-[#F4F5F9] pt-[10px] pb-[10px] rounded-md">
                            <label className='text-[14px]'>Select Type</label>
                            <Tab className="cursor-pointer flex items-center gap-[10px]">
                                <input checked={selectDuration === "MONTHLY"} onChange={(e) => setSelectDuration("MONTHLY")} value={"Month"} type="radio" id="fixed" name='fixed' className='rounded-full ' />
                                <label for="fixed" className='text-[14px]'> Monthly</label><br />
                            </Tab>
                            <Tab className="cursor-pointer flex items-center gap-[10px]">
                                <input checked={selectDuration === "YEARLY"} onChange={(e) => setSelectDuration("YEARLY")} value={"Year"} type="radio" id="flexible" name='fixed' className='rounded-full ' />
                                <label for="flexible" className='text-[14px]'> Yearly</label><br />
                            </Tab>
                        </TabList>
                        <TabPanel>
                            <div className='w-[100%] flex rounded-md shadow overflow-x-scroll border border-1 mt-4 pl-3 pr-3'>
                                <table className='table-section mt-4'>
                                    <thead className='border border-1 '>
                                        <th>Leave Type</th>
                                        <th>Allowed Leaves (Per Month)</th>
                                        <th>Carry-forward Leaves (On Month End)</th>

                                    </thead>
                                    <tbody>
                                        {
                                            fetchLeavePolicy?.filter(({ policy_type }) => policy_type === "MONTHLY")?.map(({ id, carry_forward_leaves, allowed_leaves, name }) => <tr key={id}>
                                                <td onClick={() => {
                                                    console.log(id);
                                                    setEditingRow(id);
                                                    setUpdatePolicy({ carry_forward_leaves, allowed_leaves })
                                                    setLeavePolicyType(name);
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
                                            <td><input className=' py-2 text-center placeholder:text-center bg-[#fff]  rounded-md border border-[#dbdbdb] outline-none focus:outline-none' placeholder='New Policy Type' value={leavePolicyType} onChange={(e) => setLeavePolicyType(e.target.value)} type='text' /></td>
                                            <td><input className=' py-2 text-center placeholder:text-center  outline-none focus:outline-none bg-[#fff]  rounded-md border border-[#dbdbdb]' placeholder='Set Allowed Leaves' value={allowedLeavesPerYear} onChange={(e) => setAllowedLeavePerYear(e.target.value)} type='text' /></td>
                                            <td><input className=' py-2 w-2/3 text-center placeholder:text-center  outline-none focus:outline-none bg-[#fff]  rounded-md border border-[#dbdbdb]' placeholder='Set Carry Forward Leaves' value={carryForwardLeaves} onChange={(e) => setCarryForwardLeaves(e.target.value)} type='text' /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className='w-[100%] flex rounded-md shadow overflow-x-scroll border border-1 mt-4 pl-3 pr-3'>
                                <table className='table-section mt-4'>
                                    <thead className='border border-1 '>
                                        <th>Leave Type</th>
                                        <th>Allowed Leaves (Per Year)</th>
                                        <th>Carry-forward Leaves (On Year End)</th>

                                    </thead>
                                    <tbody>

                                        {
                                            fetchLeavePolicy?.filter(({ policy_type }) => policy_type === "YEARLY")?.map(({ id, carry_forward_leaves, allowed_leaves, name }) => <tr key={id}>
                                                <td onClick={() => {
                                                    // console.log(id);
                                                    // console.log(name);
                                                    setEditingRow(id);
                                                    setUpdatePolicy({ carry_forward_leaves, allowed_leaves });
                                                    setLeavePolicyType(name);
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
                                            <td><input className=' py-2 text-center placeholder:text-center rounded-md outline-none focus:outline-none border border-[#dbdbdb] mx-2 ' placeholder='New Policy Type' value={leavePolicyType} onChange={(e) => setLeavePolicyType(e.target.value)} type='text' /></td>
                                            <td><input className=' py-2 text-center placeholder:text-center rounded-md  outline-none focus:outline-none border border-[#dbdbdb] mx-2 ' placeholder='Set Allowed Leaves' value={allowedLeavesPerYear} onChange={(e) => setAllowedLeavePerYear(e.target.value)} type='text' /></td>
                                            <td><input className=' py-2 w-2/3 text-center placeholder:text-center rounded-md  outline-none focus:outline-none border border-[#dbdbdb] mx-2 ' placeholder='Set Carry Forward Leaves' value={carryForwardLeaves} onChange={(e) => setCarryForwardLeaves(e.target.value)} type='text' /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </TabPanel>

                    </Tabs>
                    <button onClick={(e) => editingRow === null ? createLeavePolicy(e) : updateLeavePolicy(e)} className='second-btn mt-[14px] ml-[14px]'>Update Details</button>
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
                className="w-[96%] xl:w-[45%] absolute top-[50%] left-[50%] bottom-auto p-0 bg-[#fff] shadow-md rounded-[10px] translate-x-[-50%] translate-y-[-50%]"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} className='border-b p-3     text-[14px] text-left bg-[#fff] rounded-t-lg  rounded-r-lg rounded-b-none'>Pending Requests</h2>
                <button onClick={closeOpenLeaveRequestModal} className='absolute right-[5px] top-[3px] font-semibold	  bg-[#27004a] rounded-full'><CloseIcon className='text-white' /></button>
                <div className='pb-2'>
                    <div className="w-full max-w-6xl mx-auto p-4">
                        <div className="flex border-b mb-4">
                            <button
                                className={`py-2 px-4 font-medium ${activeTab === 'leave-requests'
                                    ? 'text-[#27004a] border-b-2 border-[#27004a]'
                                    : 'text-gray-500'
                                    }`}
                                onClick={() => setActiveTab('leave-requests')}
                            >
                                Leave Requests
                            </button>
                            <button
                                className={`py-2 px-4 font-medium ${activeTab === 'device-verification'
                                    ? 'text-[#27004a] border-b-2 border-[#27004a]'
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
                                            ? 'bg-[#27004a] text-white'
                                            : 'bg-gray-200 text-gray-700'
                                            }`}
                                        onClick={() => setActiveSubTab('pending')}
                                    >
                                        Pending
                                    </button>
                                    <button
                                        className={`py-1 px-4 rounded-full ${activeSubTab === 'history'
                                            ? 'bg-[#27004a] text-white'
                                            : 'bg-gray-200 text-gray-700'
                                            }`}
                                        onClick={() => setActiveSubTab('history')}
                                    >
                                        History
                                    </button>
                                </div>
                                <div className="col-span-1 md:col-span-2 relative">
                                    <input
                                        type="text"
                                        placeholder="Search staff by name"
                                        className="w-full pl-2 pr-4 py-2 border rounded-md mb-[16px] focus-visible:outline-none"

                                    />
                                    <SearchIcon className="absolute right-[8px] top-[10px]  cursor-pointer" />
                                </div>

                                <div className=" flex w-[100%] gap-[14px] mb-2">

                                    <div className="relative">
                                        <select className="  w-full appearance-none border rounded-md focus-visible:outline-none py-2 pl-4 pr-10">
                                            <option>Branch</option>
                                            <option>Branch 1</option>
                                            <option>Branch 2</option>
                                        </select>
                                        {/* <ChevronDownIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" /> */}
                                    </div>
                                    <div className="relative">
                                        <select className="w-full appearance-none border rounded-md focus-visible:outline-none py-2 pl-4 pr-10">
                                            <option>Department</option>
                                            <option>HR</option>
                                            <option>IT</option>
                                        </select>
                                        {/* <ChevronDownIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" /> */}
                                    </div>
                                    <div className="flex justify-end mb-4">
                                        <input type="date" placeholder='Select Month' className=" w-full focus-visible:outline-none px-2 text-[15px] appearance-none border rounded-md py-2 text-gray-700"></input>
                                    </div>
                                </div>
                                <table className=' w-full table-sectionpolicy mt-4'>
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
                                                            editLeaveRequest(e, id);
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
                                                                console.log(id);
                                                                setDeleteLeaveID(id);
                                                                deleteLeaveRequest(e, id);
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

        </div >
    )
}

export default EditLeavePolicies