import React, { useEffect, useState } from 'react'
import Search from '../../../Assets/Images/search.svg'
import Filter from '../../../Assets/Images/filter.svg'
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import CloseIcon from '@mui/icons-material/Close';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useGlobalContext } from '../../../Context/GlobalContext';
import { saveAs } from 'file-saver';
import ClipLoader from "react-spinners/ClipLoader";
const LeaveBalance = () => {
    const { baseUrl, fetchStaff, staffDetail, openToast } = useGlobalContext();

    useEffect(() => {
        fetchStaff()
    }, [])
    console.log("leave", staffDetail)
    const [isLoading, setIsLoading] = useState(true);
    let subtitle;

    // toggle switch
    const [isOn, setIsOn] = useState(false);

    const handleToggle = () => {
        setIsOn(!isOn);
    };
    // toggle switch


    const [toggleDrop, setToggleDrop] = useState(false);

    function handledrop() {
        setToggleDrop(!toggleDrop)
    }



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

    // when onclick leave Policies
    const [modalIsOpen11, setIsOpen11] = React.useState(false);
    function openModal11() {
        setIsOpen11(true);
    }
    function afterOpenModal11() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#000';

    }

    function closeModal11() {
        setIsOpen11(false);
    }
    // when onclick leave Policies


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
    const exportToCSV = () => {
        // Check and get headers dynamically only if LeavePolicy exists and is an array
        const leavePolicyHeaders = Array.isArray(staffDetail[0]?.staffDetails?.LeavePolicy)
            ? staffDetail[0].staffDetails.LeavePolicy.map(policy => `${policy?.name} Leave Balance`)
            : [];

        const headers = [
            'Index',
            'Name',
            'Job Title',
            ...leavePolicyHeaders,
        ];

        const rows = staffDetail.map((item, index) => {
            return [
                index + 1,
                item?.name || 'N/A',
                item?.staffDetails?.job_title || 'N/A',
                ...(Array.isArray(item?.staffDetails?.LeavePolicy)
                    ? item.staffDetails.LeavePolicy.map(policy => policy.allowed_leaves)
                    : []),
            ];
        });

        console.log('Headers:', headers);
        console.log('Rows:', rows);

        const csvData = [headers, ...rows].map(row => row.join(',')).join('\n');
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'LeaveBalancePolicy.csv');
    };
    
    const [selectedId, setSelectedId] = useState([]);
    console.log("selec", selectedId)
    const [leaveName, setLeaveName] = useState();
    const [allowLeave, setAllowLeave] = useState();
    const [carryLeave, setCarryLeave] = useState();
    const [policyType, setPolicyType] = useState();

    async function updateBalance() {
        const result = await fetch(baseUrl + "leave-policy/bulk", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ name: leaveName, allowed_leaves: Number(allowLeave), carry_forward_leaves: Number(carryLeave), policy_type: policyType, staffIds: selectedId })
        })

        const response = await result.json();

        if (result.status == 201) {
            openToast(response.message || "Leave Policy Created Successfully", "success")
            closeModal12()
        }
        else {
            openToast(response.message || "Internal Server Error", "error")
        }
    }

    return (
        <div className='staff-tab mt-[20px]'>

            <div className='tabs-attendance'>
                <Tabs>
                    <TabList className="flex flex-col gap-[10px] xl:flex-row lg:flex-row mb-[20px]">
                        <Tab><button >Leave Balance</button></Tab>
                        <Tab> <button >Leave Policy</button></Tab>

                        <div className='w-full flex justify-end'>
                            <button className='border border-1 pl-3 pr-3 rounded-md pt-2 pb-2 text-sm second-btn' onClick={openModal10}>Import Leave Balances</button>
                        </div>
                    </TabList>


                    <TabPanel>

                        <div className='flex justify-between flex-col xl:flex-row lg:flex-col   md:flex-col   lg:gap-[0px]'>
                            <div className='flex lg:gap-[10px] flex-col gap-[10px] lg:flex lg:flex-row'>
                                <div className='searching-input relative'>
                                    <img src={Search} className='absolute left-2 top-3' />
                                    <input type="text" className='border rounded-md bg-[#F4F5F9] p-[8px] pl-[30px] w-[100%] lg:w-[225px] focus-visible:outline-none' placeholder='Search' />

                                </div>

                                <select className='border rounded-md bg-[#F4F5F9] p-[8px] lg:w-[240px] w-[100%] focus-visible:outline-none text-sm'>
                                    <option>All Departments</option>
                                </select>

                                <input type="date" className='border rounded-md bg-[#F4F5F9] p-[8px] pl-[30px] w-[100%] lg:w-[225px] focus-visible:outline-none' />

                                <div className='flex gap-[10px] whitespace-nowrap justify-end items-center cursor-pointer'>
                                    <img src={Filter} className='w-[40px] h-[40px] bg-[#F4F5F9] rounded-full p-[10px]' />
                                    <h2 className='text-[14px] font-normal	'>More Filters</h2>
                                </div>

                            </div>
                            {/* <div className='flex gap-[15px] justify-between lg:justify-start'>
                               

                            </div> */}
                        </div>


                        <div className='w-[100%] p-0 h-[300px] overflow-y-auto flex rounded-md shadow overflow-scroll border border-1 mt-4 '>
                            <div className='w-full   '>
                                <table className='table-section w-full'>
                                    <thead className='border border-1 '>


                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Job Title</th>

                                        {
                                            staffDetail?.map((items, index) => {
                                                { console.log(items?.staffDetails?.LeavePolicy) }
                                                return (<>
                                                    {items?.staffDetails?.LeavePolicy?.map((item) => (
                                                        <>

                                                            <th>{item?.name} Leave Balance</th>
                                                        </>)
                                                    )}</>)
                                            })
                                        }
                                    </thead>
                                    <tbody>
                                        {

                                            isLoading && staffDetail.length === 0 ? (<tr className="h-[100px]">
                                                <td colSpan="9" className="text-center text-gray-600 text-xl font-semibold py-4">
                                                    <ClipLoader color="#4A90E2" size={50} />
                                                </td>
                                            </tr>
                                            ) : staffDetail && staffDetail.length > 0 ? (


                                                staffDetail?.map((items, index) => {
                                                    return <tr className="border">
                                                        <td className='border-r border-[#dbdbdb] whitespace-nowrap' ><input type='checkbox' className='border border-1 rounded-md ' /></td>
                                                        <td className='border-r border-[#dbdbdb] whitespace-nowrap' >{items?.name}</td>
                                                        <td className='border-r border-[#dbdbdb] whitespace-nowrap'>{items?.staffDetails?.job_title}</td>
                                                        {
                                                            staffDetail?.map((items, index) => {
                                                                { console.log(items?.staffDetails?.LeavePolicy) }
                                                                return (<>
                                                                    {items?.staffDetails?.LeavePolicy?.map((item) => (
                                                                        <>
                                                                            <td>{item?.allowed_leaves} </td>
                                                                        </>)
                                                                    )}</>)
                                                            })
                                                        }
                                                    </tr>
                                                })

                                            )
                                                : (
                                                    // No Data State
                                                    <tr className="h-[100px]">
                                                        <td
                                                            colSpan="9"
                                                            className="text-center text-red-500 text-xl font-semibold py-4"
                                                        >
                                                            No staff found.
                                                        </td>
                                                    </tr>
                                                )


                                        }




                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </TabPanel>


                    <TabPanel>

                        <div className='flex justify-between flex-col xl:flex-row lg:flex-col md:flex-col gap-[15px] lg:gap-[0px]'>
                            <div className='flex lg:gap-[20px] flex-col gap-[10px] lg:flex lg:flex-row'>
                                <div className='searching-input relative'>
                                    <img src={Search} className='absolute left-2 top-3' />
                                    <input type="text" className='border rounded-md bg-[#F4F5F9] p-[8px] pl-[30px] w-[100%] lg:w-[225px] focus-visible:outline-none' placeholder='Search' />

                                </div>

                                <select className='border rounded-md bg-[#F4F5F9] p-[8px] lg:w-[240px] w-[100%] focus-visible:outline-none text-sm'>
                                    <option>All Departments</option>
                                </select>

                                <input type="date" className='border rounded-md bg-[#F4F5F9] p-[8px] pl-[30px] w-[100%] lg:w-[225px] focus-visible:outline-none' />



                            </div>
                            <div className='flex gap-[15px] justify-between lg:justify-start'>
                                <button className='border border-1 pl-3 pr-3 rounded-md pt-2 pb-2 text-sm second-btn' disabled={selectedId.length === 0} onClick={openModal12}>Update Leave Policy</button>

                            </div>
                        </div>


                        <div className='w-[100%] p-0 h-[300px] overflow-y-auto flex rounded-md shadow overflow-scroll border border-1 mt-4 '>
                            <div className='w-full   '>
                                <table className='table-section  w-full'>
                                    <thead className='border border-1 '>
                                        <th>#</th>
                                        <th>Name</th>
                                        {
                                            staffDetail?.map((items, index) => {
                                                { console.log(items?.staffDetails?.LeavePolicy) }
                                                return (<>
                                                    {items?.staffDetails?.LeavePolicy?.map((item) => (
                                                        <>
                                                            <th>{item?.name} Leave Policy</th>
                                                        </>)
                                                    )}</>)
                                            })
                                        }


                                    </thead>
                                    <tbody>
                                        {

                                            isLoading && staffDetail.length === 0 ? (<tr className="h-[100px]">
                                                <td colSpan="9" className="text-center text-gray-600 text-xl font-semibold py-4">
                                                    <ClipLoader color="#4A90E2" size={50} />
                                                </td>
                                            </tr>
                                            ) : staffDetail && staffDetail.length > 0 ? (


                                                staffDetail?.map((items, index) => {
                                                    return <tr className="border">
                                                        <td className='border-r border-[#dbdbdb] '><input type='checkbox' className='border border-1 rounded-md '
                                                            onChange={(e) => setSelectedId([...selectedId, items.staffDetails.id])}
                                                        /></td>
                                                        <td>{items?.name}</td>
                                                        {
                                                            staffDetail?.map((items, index) => {
                                                                { console.log(items?.staffDetails?.LeavePolicy) }
                                                                return (<>
                                                                    {items?.staffDetails?.LeavePolicy?.map((item) => (
                                                                        <>
                                                                            <td>{item?.allowed_leaves} </td>
                                                                        </>)
                                                                    )}</>)
                                                            })
                                                        }
                                                    </tr>
                                                })

                                            )
                                                : (
                                                    // No Data State
                                                    <tr className="h-[100px]">
                                                        <td
                                                            colSpan="9"
                                                            className="text-center text-red-500 text-xl font-semibold py-4"
                                                        >
                                                            No staff found.
                                                        </td>
                                                    </tr>
                                                )


                                        }


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </TabPanel>



                </Tabs>
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
                <button onClick={closeModal10} className='absolute right-[5px] top-[3px] font-semibold	  bg-[#27004a] rounded-full'><CloseIcon className='text-white' /></button>
                <div className='pb-2'>


                    <div className='flex justify-between items-center p-[10px] border border-b border-l-0  border-t-0 border-r-0 pl-[20px] text-[13px] xl:text-[14px] '>
                        <div className='flex gap-[0px] items-center '>
                            <h4 className='m-0 font-medium text-[10px] xl:text-[14px]' >Step 1. Download SalaryBox Template</h4>
                        </div>
                        <div className="flex items-center  ">
                            <button onClick={exportToCSV} className='whitespace-nowrap outline-dashed p-1 rounded-md text-[13px] outline-1 outline-offset-1'>Download Template</button>
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
                <button onClick={closeModal12} className='absolute right-[5px] top-[3px] font-semibold	  bg-[##27004a] rounded-full'><CloseIcon className='text-white' /></button>
                <div className='pb-2'>

                    <div className='flex py-[15px] gap-[20px] pl-[20px]'>
                        <label className='text-[14px]'>Select Type</label>
                        <div className="cursor-pointer flex items-center gap-[10px]">
                            <input type="radio" id="fixed" value="MONTHLY" name='fixed' onChange={(e) => setPolicyType(e.target.value)} className='rounded-full ' />
                            <label for="fixed" className='text-[14px]'> Monthly</label><br />
                        </div>
                        <div className="cursor-pointer flex items-center gap-[10px]">
                            <input type="radio" id="flexible" name='fixed' value="YEARLY" onChange={(e) => setPolicyType(e.target.value)} className='rounded-full ' />
                            <label for="flexible" className='text-[14px]'> Yearly</label><br />
                        </div>
                    </div>


                    <div className='w-[100%] flex rounded-md shadow overflow-scroll border border-1 pl-3 pr-3'>
                        <table className='table-section mt-4'>
                            <thead className='border border-1 '>
                                <th>Leave Name</th>
                                <th>Allowed Leaves (Per {policyType=== "MONTHLY" ? "Month" : "Year"})</th>
                                <th>Carry-forward Leaves (On {policyType=== "MONTHLY" ? "Month" : "Year"} End)</th>

                            </thead>
                            <tbody>
                                <td><input type='text' onChange={(e) => setLeaveName(e.target.value)} className="border rounded-md focus:outline-none p-2" /></td>
                                <td><input type='text' onChange={(e) => setAllowLeave(e.target.value)} className="border rounded-md focus:outline-none p-2" /></td>
                                <td><input type='text' onChange={(e) => setCarryLeave(e.target.value)} className="border rounded-md focus:outline-none p-2" /></td>

                            </tbody>
                            <button className='second-btn mb-2' onClick={updateBalance}>Update Leave Balances</button>
                        </table>
                    </div>










                </div>
            </Modal>
            {/* when onclick leave policies
             */}
        </div>
    )
}

export default LeaveBalance