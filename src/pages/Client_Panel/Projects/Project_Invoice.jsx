import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { IoMdArrowDropright } from "react-icons/io";
import SearchIcon from '@mui/icons-material/Search';

const Project_Invoice = () => {
    const [departments, setDepartments] = useState([])
    const [rowsToShow, setRowsToShow] = useState(25);
    return (
        <div className="p-4 border rounded-lg bg-white shadow-cs">
            <h2 className="font-medium mb-[20px] flex gap-[6px] items-center"> <LibraryBooksIcon />Projects Invoice</h2>

            <div className="flex items-center justify-between w-[80%]" >
                <div className="w-[40%] space-y-2">
                    <label className="text-sm font-medium text-gray-700">Filter by Invoice</label>
                    <select className="h-[40px] w-[100%] focus-visible:outline-none bg-white border border-[#DBDCDE] rounded-md pl-3" name="billingType" required>
                        <option value="Fixed Rate">Select Invoice</option>
                        <option value="Project Hours">Invoice bill</option>
                        <option value="Task Hours Based on task hourly rate">Bill invoice</option>
                    </select>
                </div>
                <div className="w-[40%] space-y-2">
                    <label className="text-sm font-medium text-gray-700">Filter by status </label>
                    <select className="h-[40px] w-[100%] bg-white border border-[#DBDCDE] focus-visible:outline-none rounded-md pl-3" name="billingType" required>
                        <option value="Fixed Rate">Select Status</option>
                        <option value="Project Hours">Project Hours</option>
                        <option value="Task Hours Based on task hourly rate">Task Hours Based on task hourly rate</option>
                    </select>
                </div>

            </div>
            <div className="flex justify-end mt-[10px]" >
                <div className='right-side relative  w-[180px]'>
                    <input type='text' placeholder='Search' className='border border-1  pl-3 h-[38px]  pr-7
] rounded-3xl focus:outline-none w-[100%] text-[15px] text-[#000]' />
                    <SearchIcon className='absolute right-[10px] search-icon top-[12px]    text-[#000]  font-thin text-[#dddddd;
]'/>
                </div>
            </div>

            <div className="w-[100%] p-0 h-[300px] overflow-y-auto flex rounded-lg shadow-cs overflow-scroll border border-1 mt-4 ">
                <div className="w-full">
                    <table className="table-section1  w-full">
                        <thead className="border border-1 ">
                            <th className="border-r border-[#dbdbdb]">Invoice id</th>
                            <th className="border-r border-[#dbdbdb]">Client Name</th>
                            <th className="border-r border-[#dbdbdb]">Project Name</th>
                            <th className="border-r border-[#dbdbdb]">Payment Method</th>
                            <th className="border-r border-[#dbdbdb]">Amount</th>
                            <th className="border-r border-[#dbdbdb]">Charging Currency</th>
                            <th className="border-r border-[#dbdbdb]">Transaction id</th>
                            <th className="border-r border-[#dbdbdb]">Status</th>
                            <th className="border-r border-[#dbdbdb]">Created Date</th>

                        </thead>
                        <tbody className="border-b border-[#dbdbdb]">
                            <td className="border-r border-[#dbdbdb]">55302</td>
                            <td className="border-r border-[#dbdbdb]">Tej Partap</td>
                            <td className="border-r border-[#dbdbdb]">Vastu Emmi</td>
                            <td className="border-r border-[#dbdbdb]">Phone Pay</td>
                            <td className="border-r border-[#dbdbdb]">₹ 0.0</td>
                            <td className="border-r border-[#dbdbdb]">₹   </td>
                            <td className="border-r border-[#dbdbdb]">670cd8d847312</td>
                            <td className="border-r border-[#dbdbdb]"><Link className="text-[green]">Completed</Link></td>
                            <td className="border-r border-[#dbdbdb]">14-10-2024</td>
                          
                        </tbody>
                        <tbody className="border-b border-[#dbdbdb]">
                            <td className="border-r border-[#dbdbdb]">55302</td>
                            <td className="border-r border-[#dbdbdb]">Tej Partap</td>
                            <td className="border-r border-[#dbdbdb]">Vastu Emmi</td>
                            <td className="border-r border-[#dbdbdb]">Phone Pay</td>
                            <td className="border-r border-[#dbdbdb]">₹ 0.0</td>
                            <td className="border-r border-[#dbdbdb]">₹   </td>
                            <td className="border-r border-[#dbdbdb]">670cd8d847312</td>
                            <td className="border-r border-[#dbdbdb]"><Link className="text-[orange]">Pending</Link></td>
                            <td className="border-r border-[#dbdbdb]">14-10-2024</td>
                          
                        </tbody>
                        <tbody className="border-b border-[#dbdbdb]">
                            <td className="border-r border-[#dbdbdb]">55302</td>
                            <td className="border-r border-[#dbdbdb]">Tej Partap</td>
                            <td className="border-r border-[#dbdbdb]">Vastu Emmi</td>
                            <td className="border-r border-[#dbdbdb]">Phone Pay</td>
                            <td className="border-r border-[#dbdbdb]">₹ 0.0</td>
                            <td className="border-r border-[#dbdbdb]">₹   </td>
                            <td className="border-r border-[#dbdbdb]">670cd8d847312</td>
                            <td className="border-r border-[#dbdbdb]"><Link className="text-[green]">Completed</Link></td>
                            <td className="border-r border-[#dbdbdb]">14-10-2024</td>
                          
                        </tbody>
                        <tbody className="border-b border-[#dbdbdb]">
                            <td className="border-r border-[#dbdbdb]">55302</td>
                            <td className="border-r border-[#dbdbdb]">Tej Partap</td>
                            <td className="border-r border-[#dbdbdb]">Vastu Emmi</td>
                            <td className="border-r border-[#dbdbdb]">Phone Pay</td>
                            <td className="border-r border-[#dbdbdb]">₹ 0.0</td>
                            <td className="border-r border-[#dbdbdb]">₹   </td>
                            <td className="border-r border-[#dbdbdb]">670cd8d847312</td>
                            <td className="border-r border-[#dbdbdb]"><Link className="text-[green]">Completed</Link></td>
                            <td className="border-r border-[#dbdbdb]">14-10-2024</td>
                          
                        </tbody>
                        <tbody className="border-b border-[#dbdbdb]">
                            <td className="border-r border-[#dbdbdb]">55302</td>
                            <td className="border-r border-[#dbdbdb]">Tej Partap</td>
                            <td className="border-r border-[#dbdbdb]">Vastu Emmi</td>
                            <td className="border-r border-[#dbdbdb]">Phone Pay</td>
                            <td className="border-r border-[#dbdbdb]">₹ 0.0</td>
                            <td className="border-r border-[#dbdbdb]">₹   </td>
                            <td className="border-r border-[#dbdbdb]">670cd8d847312</td>
                            <td className="border-r border-[#dbdbdb]"><Link className="text-[green]">Completed</Link></td>
                            <td className="border-r border-[#dbdbdb]">14-10-2024</td>
                          
                        </tbody>
                        <tbody className="border-b border-[#dbdbdb]">
                            <td className="border-r border-[#dbdbdb]">55302</td>
                            <td className="border-r border-[#dbdbdb]">Tej Partap</td>
                            <td className="border-r border-[#dbdbdb]">Vastu Emmi</td>
                            <td className="border-r border-[#dbdbdb]">Phone Pay</td>
                            <td className="border-r border-[#dbdbdb]">₹ 0.0</td>
                            <td className="border-r border-[#dbdbdb]">₹   </td>
                            <td className="border-r border-[#dbdbdb]">670cd8d847312</td>
                            <td className="border-r border-[#dbdbdb]"><Link className="text-[green]">Completed</Link></td>
                            <td className="border-r border-[#dbdbdb]">14-10-2024</td>
                          
                        </tbody>
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
    )
}

export default Project_Invoice