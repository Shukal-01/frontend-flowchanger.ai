import React, { useEffect, useState } from 'react'
import Search from '../../../Assets/Images/search.svg'
import Filter from '../../../Assets/Images/filter.svg'
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import CloseIcon from '@mui/icons-material/Close';
import { useGlobalContext } from '../../../Context/GlobalContext';
import { saveAs } from 'file-saver';
import ClipLoader from "react-spinners/ClipLoader";




const BankDetails = () => {
    const { baseUrl } = useGlobalContext();
    let subtitle;

    // toggle switch
    const [isOn, setIsOn] = useState(false);

    const handleToggle = () => {
        setIsOn(!isOn);
    };
    // toggle switch

    const [isLoading, setIsLoading] = useState(true);
    const [toggleDrop, setToggleDrop] = useState(false);

    function handledrop() {
        setToggleDrop(!toggleDrop)
    }

    // when onclick update staff
    const [modalIsOpen9, setIsOpen9] = React.useState(false);
    function openModal9() {
        setIsOpen9(true);
    }
    function afterOpenModal9() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#000';

    }

    function closeModal9() {
        setIsOpen9(false);
    }
    // when onclick update staff

    const [staffDetail, setStaffDetail] = useState([]);
    const fetchStaff = async () => {
      
        try {
            const result = await fetch(baseUrl + "staff")
            console.log("reuslt---", result)
            if (result.status == 200) {
                const res = await result.json();
                console.log(res);
                setStaffDetail(res)
            }
            else {
                alert("An Error Occured")
            }
        }
        catch (error) {
            console.log(error);
            setStaffDetail([]);
        }
    }

    console.log("staff", staffDetail)

    useEffect(() => {
        fetchStaff();
    }, [])

    const exportToCSV = () => {
        // Prepare the CSV headers
        const headers = [
            'Index',
            'Name',
            'Job Title',
            'Bank Name',
            'Account Holder Name',
            'Bank Account Number',
            'Bank IFSC Code',
            'Bank Account Status',
        ];

        // Map over the data to create CSV rows
        const rows = staffDetail.map((item, index) => [
            index + 1,
            item?.name || 'N/A',
            item?.staffDetails?.job_title || 'N/A',
            item?.staffDetails?.BankDetails?.bank_name || 'N/A',
            'N/A',  // Replace if you have account holder name data
            item?.staffDetails?.BankDetails?.account_number || 'N/A',
            item?.staffDetails?.BankDetails?.ifsc_code || 'N/A',
            'N/A',  // Replace if you have account status data
        ]);

        // Combine headers and rows for CSV format
        const csvData = [headers, ...rows].map(row => row.join(',')).join('\n');

        // Create a Blob and download the file
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'BankDetails.csv');
    };

    return (
        <div className='staff-tab mt-[20px]'>
            <div className='flex justify-between flex-col xl:flex-row lg:flex-col  md:flex-col gap-[15px] lg:gap-[10px]'>
                <div className='flex lg:gap-[20px]  flex-col gap-[10px] lg:flex lg:flex-row'>
                    <div className='searching-input relative'>
                        <img src={Search} className='absolute left-2 top-3' />
                        <input type="text" className='border rounded-md bg-[#F4F5F9] p-[8px] pl-[30px] w-[100%] lg:w-[225px] focus-visible:outline-none' placeholder='Search' />

                    </div>
                    <select className='border rounded-md bg-[#F4F5F9] p-[8px] lg:w-[240px] w-[100%] focus-visible:outline-none text-sm'>
                        <option>All Departments</option>
                    </select>

                    <div className='flex gap-[10px] whitespace-nowrap justify-end items-center cursor-pointer'>
                        <img src={Filter} className='w-[40px] h-[40px] bg-[#F4F5F9] rounded-full p-[10px]' />
                        <h2 className='text-[14px] font-normal	'>More Filters</h2>
                    </div>

                </div>
                <div className='flex gap-[15px] justify-between lg:justify-start'>
                    <button className='border border-1 pl-3 pr-3 rounded-md pt-2 pb-2 text-sm second-btn' onClick={openModal9}>Update Staff</button>

                </div>
            </div>


            <div className='w-[100%] p-0 h-[300px] overflow-y-auto flex rounded-md shadow overflow-scroll border border-1 mt-4 '>
                <div className='w-full   '>
                    <table className='table-section w-full'>
                        <thead className='border border-1 sticky bg-[#fff] set-shadow top-[-1px]'>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Job Title</th>
                                <th>Bank Name</th>
                                <th>Account Holder Name</th>
                                <th>Bank Account Number</th>
                                <th>Bank IFSC Code</th>
                                <th>Bank Account Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                isLoading && staffDetail.length === 0 ? (<tr className="h-[100px]">
                                    <td colSpan="9" className="text-center text-gray-600 text-xl font-semibold py-4">
                                        <ClipLoader color="#4A90E2" size={40} />
                                    </td>
                                </tr>
                                ) : staffDetail && staffDetail.length > 0 ? (


                                    staffDetail?.map((items, index) => (
                                        <tr className='border' key={index}>
                                            <td className='border-r border-[#dbdbdb] whitespace-nowrap'><input type='checkbox' className='border border-1 rounded-md' /></td>
                                            <td className='border-r border-[#dbdbdb] whitespace-nowrap'>{items?.name}</td>
                                            <td className='border-r border-[#dbdbdb] whitespace-nowrap'>{items?.staffDetails?.job_title}</td>
                                            <td className='border-r border-[#dbdbdb] whitespace-nowrap'>{items?.staffDetails?.BankDetails?.bank_name}</td>
                                            <td className='border-r border-[#dbdbdb] whitespace-nowrap'>N/A</td>
                                            <td className='border-r border-[#dbdbdb] whitespace-nowrap'>{items?.staffDetails?.BankDetails?.account_number}</td>
                                            <td className='border-r border-[#dbdbdb] whitespace-nowrap'>{items?.staffDetails?.BankDetails?.ifsc_code}</td>
                                            <td className='border-r border-[#dbdbdb] whitespace-nowrap'>N/A</td>
                                        </tr>
                                    ))

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






            {/* when onclick update staff */}

            <Modal
                isOpen={modalIsOpen9}
                onAfterOpen={afterOpenModal9}
                onRequestClose={closeModal9}
                // style={customStyles}
                contentLabel="Example Modal"
                className="w-[96%] xl:w-[40%] absolute top-[50%] left-[50%] bottom-auto p-0 bg-[#fff] shadow-md rounded-[10px] translate-x-[-50%] translate-y-[-50%]"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} className='border-b p-3     text-[14px] text-center bg-[#F0F6FE] rounded-t-lg rounded-r-lg rounded-b-none'>Update all Staff</h2>
                <button onClick={closeModal9} className='absolute right-[5px] top-[3px] font-semibold	  bg-[#511992] rounded-full'><CloseIcon className='text-white' /></button>
                <div className='pb-2'>


                    <div className='flex justify-between items-center p-[10px] border border-b border-l-0  border-t-0 border-r-0 pl-[20px] text-[13px] xl:text-[14px] '>
                        <div className='flex gap-[0px] items-center '>
                            <h4 className='m-0 font-medium'  >Step 1. Download staff details.</h4>
                        </div>
                        <div className="flex items-center  ">
                            <button onClick={exportToCSV} className='whitespace-nowrap outline-dashed p-1 rounded-md text-[13px] outline-1 outline-offset-1'>Download Template</button>
                        </div>
                    </div>


                    <div className='flex justify-between items-center p-[10px] border border-b border-l-0 border-t-0 border-r-0 pl-[20px] text-[13px] xl:text-[14px] '>
                        <div className=' '>
                            <h4 className='m-0 font-medium ' >Step 2. Edit downloaded file and update details.</h4>
                            <p className='text-[10px] xl:text-[12px] pl-3 pt-2'>Please refer to instructions sheet in download template for formatting guide</p>

                        </div>

                    </div>

                    <div className='flex justify-between items-center p-[10px] border border-b border-l-0  border-t-0 border-r-0 pl-[20px] text-[13px] xl:text-[14px] '>
                        <div className='flex gap-[0px] items-center '>
                            <h4 className='m-0 font-medium' >Step 3. Upload your file</h4>
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
        </div>
    )
}

export default BankDetails