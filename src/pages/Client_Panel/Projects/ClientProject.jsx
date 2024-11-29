import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IoMdArrowDropright } from "react-icons/io";
import SearchIcon from '@mui/icons-material/Search';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const Client_Project = () => {
    const [openIndex, setOpenIndex] = useState(0);

    // Function to handle accordion toggling

    const handleSelectChange = (event) => {
        setRowsToShow(Number(event.target.value));
    };

    const [rowsToShow, setRowsToShow] = useState(25);
    const [departments, setDepartments] = useState([])



    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };
    const [isOpen, setIsOpen] = useState(false);



    return (
        <div className=" w-full absolute pl-[145px] top-[95px] right-[5px] ">

            <div className="bg-[#fff] p-[10px] ml-[80px]">
                <div className="mb-[20px]">

                    <Link to="/" className="allcrm-btn mb-[10px]  focus:outline-none  text-center ">
                        <AddIcon className="newadd" /> New Project</Link>
                </div>

                <div className="p-[20px]  shadow-cs rounded-lg summary-border w-full">
                    <h2 className="font-medium mb-[10px] flex gap-[6px] items-center"> <LibraryBooksIcon />Project Summary</h2>

                    <div className="flex items-center gap-[14px] mb-[10px]">
                        <Link to="/" className="  focus:outline-none allcrm-btn text-center">
                            <AddIcon className="newadd" /> Add New</Link>
                        <div className='right-side relative  w-[160px]'>
                            <input type='text' placeholder='Search' className='border border-1  pl-3 h-[36px]  pr-7
] rounded-3xl focus:outline-none w-[100%] text-[15px] text-[#000]' />
                            <SearchIcon className='absolute right-[10px] search-icon top-[12px]    text-[#000]  font-thin text-[#dddddd;
]'/>
                        </div>

                    </div>
                    <div className='flex mb-4 pl-[0px] justify-between p-3 flex-col gap-2  sm:flex-row sm:gap-0'>
                        <div className='left-side '>
                            <select
                                onChange={handleSelectChange}
                                className=' border border-[#e5e7eb] p-[7px] text-[14px]  shadow-sm mr-2 rounded-md  focus:outline-none'>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="120">120</option>

                            </select>



                            <button
                                // onClick={handleExport}
                                className='ml-2 bg-[#27004a] text-white p-[7px] text-[14px] rounded-md cursor-pointer'
                            >
                                Export File
                            </button>





                        </div>

                        <div className='right-side relative  w-[200px]'>
                            <input type='text' placeholder='Search' className='border border-1  pl-3 h-[38px]  pr-7
] rounded-3xl focus:outline-none w-[100%] text-[15px] text-[#000]' />
                            <SearchIcon className='absolute right-[10px] search-icon top-[12px]    text-[#000]  font-thin text-[#dddddd;
]'/>
                        </div>
                    </div>

                    <div>
                        <div className="bg-white rounded-lg w-full shadow-cs border border-[#dcdbdb] overflow-x-auto">



                            <table className="w-full table-auto border border-[#dcdbdb] rounded-lg overflow-hidden border-collapse">
                                <thead
                                    className="cursor-pointer  border border-gray-300 shadow-md"
                                    onClick={toggleAccordion}
                                >
                                    <tr>
                                        <th className="border-r p-2 flex justify-center text-xs font-medium whitespace-nowrap text-center">
                                            <IoMdArrowDropright className={`text-[20px] transition-transform duration-200 ${isOpen ? "rotate-90 text-[black]" : "rotate-0"}`}
                                            />

                                        </th>
                                        <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                                            #
                                        </th>
                                        <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                                            Name
                                        </th>
                                        <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                                            Company
                                        </th>
                                        <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                                            Primary Contact
                                        </th>
                                        <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                                            Primary Email
                                        </th>
                                        <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                                            Phone
                                        </th>
                                        <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                                            Active
                                        </th>
                                        <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                                            Groups
                                        </th>
                                        <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                                            Date Created
                                        </th>
                                        <th className="p-2 text-xs font-medium text-center">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                {isOpen && (
                                    <tbody>
                                        <tr className="border-b hover:bg-gray-50">
                                            <td className="text-center p-2 text-[12px]  whitespace-nowrap">karan</td>
                                            <td className="text-center p-2 text-[12px]  whitespace-nowrap">karan</td>
                                            <td className="text-center p-2 text-[12px]  whitespace-nowrap">Customer</td>
                                            <td className="text-center p-2 text-[12px]  whitespace-nowrap">karan</td>
                                            <td className="text-center p-2 text-[12px]  whitespace-nowrap">karan</td>
                                            <td className="text-center p-2 text-[12px]  whitespace-nowrap">karan</td>
                                            <td className="text-center p-2 text-[12px]  whitespace-nowrap">Members</td>
                                            <td className="text-center p-2 text-[12px]  whitespace-nowrap">karan</td>
                                            <td className="text-center p-2 text-[12px]  whitespace-nowrap">karan</td>
                                            <td className="text-center p-2 text-[12px]  whitespace-nowrap">karan</td>
                                            <td className="text-center p-2 text-[12px]  whitespace-nowrap">karan</td>
                                        </tr>

                                        <tr className="h-[100px]">
                                            <td colSpan="9" className="text-center py-4">
                                                {/* <ClipLoader color="#4A90E2" size={50} /> */}
                                            </td>
                                        </tr>
                                        <tr className="h-[100px]">
                                            <td colSpan="12" className="text-center text-red-500 text-sm font-semibold py-4">
                                                No Clients found.
                                            </td>
                                        </tr>
                                        {/* {
                                            isLoading && projectDetails?.length === 0 ? (

                                            ) : projectDetails?.length > 0 ? (
                                                projectDetails.map((project, index) => (
                                                    
                                                ))
                                            ) : (
)
                                        } */}
                                    </tbody>
                                )}
                            </table>




                        </div>
                    </div>

                    <div className='flex justify-between p-3 pt-5 w-[100%] items-center  flex-col gap-2  sm:flex-row sm:gap-0'>
                        <p className=' text-[#a5a1a1] text-[14px]'>Showing 1 to {rowsToShow} of {departments.length} entries</p>
                        <div className='pagination flex gap-2 border pt-0 pl-4 pb-0 pr-4 rounded-md'>
                            <Link to="#" className='text-[12px]  pt-2 pb-[8px]'>Previous</Link>
                            <span className='text-[12px] bg-[#27004a] flex items-center  text-white pl-3 pr-3 '>1</span>
                            <Link to="#" className='text-[12px]  pt-2 pb-[8px] '>Next</Link>

                        </div>
                    </div>




                </div>





            </div>
        </div>
    );
};

export default Client_Project