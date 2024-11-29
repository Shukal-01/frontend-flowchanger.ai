import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowDropright } from "react-icons/io";
import AddIcon from '@mui/icons-material/Add';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SearchIcon from '@mui/icons-material/Search';
import ProfilePic from '../../../Assets/Images/photo.png'
import BackupTableIcon from '@mui/icons-material/BackupTable';


const Project_Progress = () => {
  const [departments, setDepartments] = useState([])
  const [rowsToShow, setRowsToShow] = useState(25);

  const [openIndex, setOpenIndex] = useState(null);

  // Function to handle accordion toggling
  const handleToggle = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // Close the accordion if clicked again
    } else {
      setOpenIndex(index); // Open the accordion
    }
  };
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  const [isOpen, setIsOpen] = useState(false);



  return (
    <div className='w-[100%] pl-[13px]'>
      <h2 className='text-[17px] text-[#4f4d51] font-medium'>Projects / Addoble</h2>
      <div className=' flex  justify-between items-center mt-[10px]'>
        <div className="flex items-center gap-[15px]">
          <h3 className="font-medium text-[20px]">Addoble</h3>
          <div className="flex ">
            <img src={ProfilePic} alt="profilepic" className="h-[30px]" />
            <img src={ProfilePic} alt="profilepic" className="h-[30px]" />
            <img src={ProfilePic} alt="profilepic" className="h-[30px]" />
            <img src={ProfilePic} alt="profilepic" className="h-[30px]" />
          </div>
          <button className='p-[6px] rounded-lg bg-[#dcfce7] font-normal text-[#58ae71] '>Finished</button>
        </div>
      </div>

      <div className=" bg-white  w-[100%] shadow-cs rounded-lg p-6  mt-[20px]">
        {/*-- Progress Bar -*/}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-gray-700 max-[1400px]:text-[14px]">
              Project Progress 100%
            </span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div className="bg-green-500 h-2 rounded-full"></div>
          </div>
        </div>

        {/*-- Overview Section -*/}
        <div className="">
          <h4 className="font-medium text-[21px]">OverView</h4>
          <div className="w-full flex flex-col sm:flex-row">
            <div className="w-[100%] sm:w-[50%] pt-[10px] ">
              <div className="pb-[10px] flex sm:flex-col justify-between sm:justify-start">
                <h4>Project #</h4>
                <p className="text-[#B1B1B1] font-light text-[15px]">30</p>
              </div>
              <div className="pb-[10px] flex sm:flex-col justify-between sm:justify-start">
                <h4>Status</h4>
                <p className="text-[#B1B1B1] font-light text-[15px]">Pending</p>
              </div>
              <div className="pb-[10px] flex sm:flex-col justify-between sm:justify-start">
                <h4>Start Date</h4>
                <p className="text-[#B1B1B1] font-light text-[15px]">14-08-2024</p>
              </div>
              <div className="pb-[10px] flex sm:flex-col justify-between sm:justify-start">
                <h4>Completed Date</h4>
                <p className="text-[#B1B1B1] font-light text-[15px]">14-08-2024</p>
              </div>
            </div>

            <div className="w-[100%] sm:w-[50%] sm:pt-[10px]">
              <div className="pb-[10px] flex sm:flex-col justify-between sm:justify-start">
                <h4>Customer</h4>
                <p className="text-[#B1B1B1] font-light text-[15px]">Addodle</p>
              </div>
              <div className="pb-[10px] flex sm:flex-col justify-between sm:justify-start">
                <h4>Date Created</h4>
                <p className="text-[#B1B1B1] font-light text-[15px]">14-08-2024</p>
              </div>
              <div className="pb-[10px] flex sm:flex-col justify-between sm:justify-start">
                <h4>Deadline</h4>
                <p className="text-[#B1B1B1] font-light text-[15px]">14-08-2024</p>
              </div>
              <div className="pb-[10px] flex sm:flex-col justify-between sm:justify-start">
                <h4>Total Lagged Hours</h4>
                <p className="text-[#B1B1B1] font-light text-[15px]">04:00</p>
              </div>
            </div>



          </div>
        </div>

        {/*-- Tags Section -*/}
        <div className="mt-4">
          <span className="block font-semibold text-gray-700">Tags</span>
          <div className="flex space-x-2 mt-2">
            <span className="inline-block border text-xs px-2 py-1 rounded">
              Ads
            </span>
            <span className="inline-block border text-xs px-2 py-1 rounded">
              Graphic
            </span>
            <span className="inline-block border text-xs px-2 py-1 rounded">
              Reel
            </span>
          </div>
        </div>

        {/*-- Description Section --*/}
        <div className="mt-4 text-gray-700">
          <span className="font-semibold block mb-1">Description</span>
          <p className="text-[#B1B1B1] font-light text-[15px] text-sm">
            SMM plan (12 Graphic + 10 Reels & Facebook ad management).
          </p>
        </div>

        {/* Task Section */}






      </div>

      {/* Task Summary */}
      <div className='border border-[#dbdbdb] shadow-cs rounded-lg p-[20px] mt-[14px]'>
        <h2 className='font-medium mb-[10px] flex gap-[6px] items-center'><BackupTableIcon />Task Summary</h2>
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
                  />  To Do
                </th>
                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                  #
                </th>
                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                  Task Name
                </th>
                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                  Start Date
                </th>
                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                  Due Date
                </th>
                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                  End Date
                </th>
                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                  Assigned To
                </th>
                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                  Tags
                </th>
                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                  Priority
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
                  <td className='p-2 whitespace-nowrap border-r border-[#dbdbdb] text-xs  text-center'>17-8-2024</td>

                  <td className="whitespace-nowrap border-r border-[#dbdbdb]">
                    <div className='flex  justify-center'>
                      <img src={ProfilePic} className='h-[33px]' />
                      <img src={ProfilePic} className='h-[33px] ' />
                    </div>
                  </td>
                  <td className='p-2 whitespace-nowrap border-r border-[#dbdbdb] text-xs  text-center'>
                    <span className="inline-block border text-xs px-2 py-1 rounded">
                      Ads
                    </span>
                  </td>
                  <td className="p-2 whitespace-nowrap border-r font-medium text-center text-[#e93636] text-xs">High</td>


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
      {/* Task Summary */}

    </div>
  )
}

export default Project_Progress