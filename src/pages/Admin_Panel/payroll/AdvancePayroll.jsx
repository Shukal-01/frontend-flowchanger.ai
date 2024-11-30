import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { IoMdArrowDropright } from 'react-icons/io';


const AdvancePayroll = () => {

    const [isOpen , setIsOpen] = useState(false); 
    const toggleAccordion = () => {
        setIsOpen(!isOpen);
      };     
    const [activeDropdown, setActiveDropdown] = useState(null);

    const handleDrop = (dropdown) => {
        setActiveDropdown((prev) => (prev === dropdown ? null : dropdown));
    };

    const handleClickOutside = (event) => {
        if (!event.target.closest('.dropdown-container')) {
            setActiveDropdown(null);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className='mt-[20px]'>
            <div className='flex justify-between items-end flex-col xl:flex-row  lg:flex-col  md:flex-col gap-[15px] lg:gap-[0px]'>
                <div className='flex lg:gap-[20px] flex-col gap-[10px] lg:flex lg:flex-row w-full justify-between xl:justify-start lg:justify-start'>

                    <div className='xl:w-[240px]'>
                        <label htmlFor="" className='text-[14px] font-medium'>Payroll Month</label><br />
                        <input type="date" className='border rounded-md bg-[#F4F5F9] p-[8px] lg:w-[240px] w-[100%] focus-visible:outline-none text-[14px] font-normal' />
                    </div>
                    <div className='xl:w-[240px]'>
                        <label htmlFor="" className='text-[14px] font-medium'>Company Branches</label><br />
                        <select className='border rounded-md bg-[#F4F5F9] p-[8px] lg:w-[240px] w-[100%] focus-visible:outline-none text-[14px] font-normal'>
                            <option>All Branches</option>
                            <option>Demo Main Branchs</option>

                        </select>
                    </div>

                    <div className='xl:w-[240px]'>
                        <label htmlFor="" className='text-[14px] font-medium'>Departments</label><br />
                        <select className='border rounded-md bg-[#F4F5F9] p-[8px] lg:w-[240px] w-[100%] focus-visible:outline-none text-[14px] font-normal'>
                            <option>All Departments</option>
                            <option>Website</option>

                        </select>
                    </div>


                </div>
                <div className=''>
                    <Link to="#" className='text-[#27004a] font-normal'>Reset</Link>
                </div>
            </div>


            <div className='relative  xl:w-[240px] lg:w-[240px] w-full mt-2 mb-4'>
                <input type="text" placeholder='Search' className='border rounded-full pr-[40px]  p-[8px] w-[100%]  focus-visible:outline-none' />
                <SearchIcon className='absolute right-[10px] top-[10px] text-gray-500' />
            </div>

            <div className="bg-white rounded-lg w-full shadow-cs border border-[#dcdbdb] overflow-x-auto min-h-[300px]">

            <table className="w-full table-auto border border-[#dcdbdb] rounded-lg overflow-hidden border-collapse">

            <thead
                className="cursor-pointer  border border-gray-300 shadow-md"
                onClick={toggleAccordion}
              >

                        <tr>
                        <th className="border-r p-2 flex justify-center text-xs font-medium whitespace-nowrap text-center">
                  #

                  </th>

                  <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">

                            <div className='flex justify-center items-center'>
                                Name
                                <div className='relative dropdown-container'>
                                    <button onClick={() => handleDrop('name')}>
                                        <FilterListIcon className='filter-icon' />
                                    </button>

                                    {activeDropdown === 'name' && (
                                        <div className="absolute left-[0px] z-10 text-left mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                            <div className="py-1" role="none">
                                                <Link to="/add-one-staff" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-0">Sort A to Z</Link>
                                                <Link to="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-1">Sort Z to A</Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </th>
                        <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">

                            <div className='flex justify-center items-center'>
                                CTC
                                <div className='relative dropdown-container'>
                                    <button onClick={() => handleDrop('ctc')}>
                                        <FilterListIcon className='filter-icon' />
                                    </button>

                                    {activeDropdown === 'ctc' && (
                                        <div className="absolute left-[0px] z-10 text-left mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                            <div className="py-1" role="none">
                                                <Link to="/add-one-staff" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-0">Sort A to Z</Link>
                                                <Link to="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-1">Sort Z to A</Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </th>
                        <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">

                            <div className='flex justify-center items-center'>
                                Advance Paid
                                <div className='relative dropdown-container'>
                                    <button onClick={() => handleDrop('payroll')}>
                                        <FilterListIcon className='filter-icon' />
                                    </button>

                                    {activeDropdown === 'payroll' && (
                                        <div className="absolute left-[0px] z-10 text-left mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                            <div className="py-1" role="none">
                                                <Link to="/add-one-staff" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-0">Sort A to Z</Link>
                                                <Link to="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-1">Sort Z to A</Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </th>
                        <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">

                            <div className='flex justify-center items-center'>
                                Payroll Finalized
                               
                            </div>

                        </th>

                        <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">

                            <div className='flex justify-center items-center'>
                                Bank/UPI Verfied
                                <div className='relative dropdown-container'>
                                    <button onClick={() => handleDrop('bank')}>
                                        <FilterListIcon className='filter-icon' />
                                    </button>

                                    {activeDropdown === 'bank' && (
                                        <div className="absolute left-[0px] z-10 text-left mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                            <div className="py-1" role="none">
                                                <Link to="/add-one-staff" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-0">Sort A to Z</Link>
                                                <Link to="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-1">Sort Z to A</Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </th>

                        <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">

                            <div className='flex justify-center items-center'>
                                Action
                              
                            </div>

                        </th>
                        </tr>
                        </thead>

                    <tbody className='w-full border-b'>

                    <tr className="border-b border-1">
                      <td className="p-2 whitespace-nowrap text-xs text-center"><input type="checkbox" className="border border-1 rounded-md" /></td>
                      <td className="p-2 whitespace-nowrap text-xs text-center">N/A</td>
                      <td className="p-2 whitespace-nowrap text-xs text-center">N/A</td>
                      <td className="p-2 whitespace-nowrap text-xs text-center"> N/A</td>
                      <td className="p-2 whitespace-nowrap text-xs text-center">N/A</td>
                      <td className="p-2 whitespace-nowrap text-xs text-center">N/A</td>
                      <td className="p-2 whitespace-nowrap text-xs text-center"> N/A</td>
                    </tr>
                    <tr className=" border-b border-1">
                      <td className="p-2 whitespace-nowrap text-xs text-center"><input type="checkbox" className="border border-1 rounded-md" /></td>
                      <td className="p-2 whitespace-nowrap text-xs text-center">N/A</td>
                      <td className="p-2 whitespace-nowrap text-xs text-center">N/A</td>
                      <td className="p-2 whitespace-nowrap text-xs text-center"> N/A</td>
                      <td className="p-2 whitespace-nowrap text-xs text-center">N/A</td>
                      <td className="p-2 whitespace-nowrap text-xs text-center">N/A</td>
                      <td className="p-2 whitespace-nowrap text-xs text-center"> N/A</td>
                    </tr>
                 


                    </tbody>

                    {/* <div className='w-full mb-0'>
                        <h2 className='whitespace-nowrap p-[10px]  pl-0'>Grand Total</h2>
                    </div> */}

                </table>
            </div>
            <div className='w-full'>
  <h2 className='whitespace-nowrap p-[10px]  pl-2'>Grand Total</h2>
</div>

        </div>
    )
}

export default AdvancePayroll