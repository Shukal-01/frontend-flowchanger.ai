import React, { useEffect, useState } from 'react'
import Search from '../../../Assets/Images/search.svg'
import Filter from '../../../Assets/Images/filter.svg'
import { Link } from 'react-router-dom';
import { useGlobalContext } from "../../../Context/GlobalContext";
import ClipLoader from "react-spinners/ClipLoader";
const Permission = () => {
  const { baseUrl, fetchStaff, staffDetail } = useGlobalContext();
  const [toggleDrop, setToggleDrop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  function handledrop() {
    setToggleDrop(!toggleDrop)
  }

  
  useEffect(() => {
    fetchStaff();
  }, [])

  return (
    <div className='permisson-tab mt-[20px]'>
      <div className='flex justify-between flex-col xl:flex-row lg:flex-col  md:flex-col gap-[15px] lg:gap-[0px]'>
        <div className='flex lg:gap-[20px] flex-col gap-[10px] lg:flex lg:flex-row'>
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
        
      </div>


      <div className='w-[100%] p-0 h-[100%] overflow-y-auto flex rounded-md shadow overflow-scroll border border-1 mt-4 '>
      <div className='w-full   '>
        <table className='table-section  w-full'>
          <thead className='border border-1 '>
            <th>#</th>
            <th>Name</th>
            <th>Job Title</th>
            <th>Role</th>
          


          </thead>
          <tbody>
        {
            isLoading && staffDetail?.length === 0 ? (<tr className="h-[100px]">
              <td colSpan="9" className="text-center text-gray-600 text-xl font-semibold py-4">
                  <ClipLoader color="#4A90E2" size={50} />
              </td>
          </tr>
          ) : staffDetail && staffDetail?.length > 0 ? (
          staffDetail?.map((items,index)=>{
            return  <tr className='border'>
            <td className="border-r border-[#dbdbdb] whitespace-nowrap"><input type='checkbox' className='border border-1 rounded-md ' /></td>
            <td className="border-r border-[#dbdbdb] whitespace-nowrap">{items?.name}</td>
            <td className="border-r border-[#dbdbdb] whitespace-nowrap">{items?.staffDetails?.job_title}</td>
            <td className="border-r border-[#dbdbdb] whitespace-nowrap">{items?.staffDetails?.role?.role_name}</td>
           
            

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
    </div>

  )
}

export default Permission