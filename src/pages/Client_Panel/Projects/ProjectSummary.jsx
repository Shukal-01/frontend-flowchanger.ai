import React, { useState } from 'react'
import BackupTableIcon from '@mui/icons-material/BackupTable';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { IoMdArrowDropright } from "react-icons/io";
import ProfilePic from '../../../Assets/Images/photo.png'
import { Link } from 'react-router-dom';
const ProjectSummary = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>


            <div className='border border-[#dbdbdb] shadow-cs rounded-lg p-[20px] mt-[14px]'>
                <h2 className='font-medium mb-[10px] flex gap-[6px] items-center'><BackupTableIcon />Projects Summary</h2>
                <div className="flex justify-between  mb-[14px] flex-col items-start sm:flex-row sm:items-center">
                    <div className="flex pl-[0] justify-between p-3 gap-2  xl:flex-row sm:gap-0">
                        <div className="left-side flex ">
                            <select
                                className=" border border-[#e5e7eb] p-[7px] text-[14px]  shadow-sm mr-2 rounded-md  focus:outline-none"
                            >
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="120">120</option>
                            </select>

                            <select
                                className="border border-[#e5e7eb] p-[7px]  text-[14px] shadow-sm rounded-md  focus:outline-none"
                            >
                                <option value="CSV">CSV</option>
                                <option value="PDF">PDF</option>
                                <option value="Print">Print</option>
                            </select>

                            <button
                                className='ml-2 bg-[#27004a] text-white p-[7px] text-[14px] rounded-md cursor-pointer'
                            >
                                Export File
                            </button>
                        </div>


                    </div>
                    <div className="relative client-add">
                        <input
                            className="p-[8px] client-add  rounded-3xl pl-[10px] pr-[24px] focus-visible:outline-none  summary-border text-[13px] "
                            type="text"
                            placeholder=" Search......."
                        />
                        <SearchIcon className="absolute newadd2 right-[8px] top-[11px]" />
                    </div>
                </div>
                <div className="bg-white rounded-lg w-full shadow-cs border border-[#dcdbdb] overflow-x-auto">
                    <table className="w-full table-auto border border-[#dcdbdb] rounded-lg overflow-hidden border-collapse">
                        {/* Header with Toggle */}
                        <thead
                            className="cursor-pointer  border border-gray-300 shadow-md"
                            onClick={toggleAccordion}
                        >
                            <tr>
                                <th className="border-r p-2 flex justify-start items-center text-xs font-medium whitespace-nowrap text-center">
                                    <IoMdArrowDropright className={`text-[20px] transition-transform duration-200 ${isOpen ? "rotate-90 text-[black]" : "rotate-0"}`}
                                    />  Status (01)
                                </th>
                                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                                    #
                                </th>
                                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                                    Project Name
                                </th>
                                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                                    Start Date
                                </th>
                                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                                    Deadline
                                </th>
                                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                                    Members
                                </th>

                            </tr>
                        </thead>

                        {/* Conditionally Rendered Table Body */}
                        {isOpen && (
                            <tbody className={`transition-body ${isOpen ? "open" : ""}`}  >
                                <tr>
                                    <td className='p-2 whitespace-nowrap border-r border-[#dbdbdb] text-xs text-[#3ac40c] text-center'>Complete</td>
                                    <td className='p-2 whitespace-nowrap border-r border-[#dbdbdb] text-xs  text-center'>10</td>
                                    <td className='p-2 whitespace-nowrap border-r border-[#dbdbdb] text-xs  text-center'>
                                        <div>
                                            <h5 className='text-[#9933f4]'>Soul Relation Inro</h5>
                                            <p className='pt-[4px]'>#12-DIVINE HEALING-AUG-2024</p>
                                        </div>
                                    </td>
                                    <td className='p-2 whitespace-nowrap border-r border-[#dbdbdb] text-xs  text-center'>17-8-2024</td>
                                    <td className='p-2 whitespace-nowrap border-r border-[#dbdbdb] text-xs  text-center'>17-8-2024</td>
                                    <td>
                                        <div className='flex relative justify-center'>
                                            <img src={ProfilePic} className='h-[33px]' />
                                            <img src={ProfilePic} className='h-[33px] absolute right-[-35px]' />
                                        </div>
                                    </td>

                                </tr>
                            </tbody>
                        )}
                    </table>

                </div>
                <div className='flex justify-between pt-[14px] pb-[0] w-[100%] items-center  flex-col gap-2  sm:flex-row sm:gap-0'>
                    <p className=' text-[#a5a1a1] text-[14px]'>Showing 1 to  of  entries</p>
                    <div className='pagination flex gap-2 border pt-0 pl-4 pb-0 pr-4 rounded-md'>
                        <Link to="#" className='text-[12px]  pt-2 pb-[8px]'>Previous</Link>
                        <span className='text-[12px] bg-[#27004a] flex items-center  text-white pl-3 pr-3 '>1</span>
                        <Link to="#" className='text-[12px]  pt-2 pb-[8px] '>Next</Link>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ProjectSummary