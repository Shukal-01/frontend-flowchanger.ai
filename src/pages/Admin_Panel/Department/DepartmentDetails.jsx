import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CachedIcon from '@mui/icons-material/Cached';
import SearchIcon from '@mui/icons-material/Search';
import { useGlobalContext } from '../../../Context/GlobalContext';


const DepartmentDetail = () => {

  const { baseUrl,setDepId ,setName} = useGlobalContext();
  const [departments, setDepartments] = useState([])




  const fetchDepartments = async () => {
    const result = await fetch(baseUrl + "department")

    if (result.status == 200) {
      const res = await result.json();
      setDepartments(res.data)

    }
    else {
      alert("An Error Occured")
    }

  }

  const deleteDepartments = async (id) => {
    try {
      const result = await fetch(`${baseUrl}/department/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': "application/json", // Corrected the header spelling for consistency
        }
      });

      if (result.ok) { // Use result.ok instead of checking the status directly
        alert("Record deleted successfully.");
        fetchDepartments()
      } else {
        alert("An error occurred while deleting the record.");
      }
    } catch (error) {
      console.error("Error deleting department:", error);
      alert("An error occurred during the delete request.");
    }
  };




  useEffect(() => {
    fetchDepartments()
  }, [])

  return (
    <div className='p-[10px] top-[95px] pl-[10px] w-[100%] pr-2 mb-3 pb-4'>
      <Link to="/adddepartment" className='bg-[#511992]  p-2 pr-3 rounded-lg text-white hover:bg-[#7526d1]'> <AddIcon /> New Department</Link>

      <div className='table-section mt-5 bg-white shadow p-4 pl-0 rounded-sm pr-0'>

        <div className='flex mb-4 justify-between p-3 flex-col gap-2  sm:flex-row sm:gap-0'>
          <div className='left-side '>
            <select className=' border border-[#e5e7eb] p-[8px]  shadow-sm mr-2 rounded-md pl-0 pr-3 focus:outline-none'>
              <option>25</option>
              <option>50</option>
              <option>100</option>
              <option>120</option>

            </select>

            <select className=' border border-[#e5e7eb]  p-[8px] shadow-sm rounded-md pl-0 pr-3 focus:outline-none'>
              <option>Export</option>
              <option>CSV</option>
              <option>PDF</option>
              <option>Print</option>
            </select>
            <CachedIcon className='border border-[#e5e7eb] shadow-sm ml-2 rounded-md cursor-pointer refresh' />




          </div>

          <div className='right-side relative  w-[200px]'>
            <input type='text' placeholder='Search' className='border border-1 pl-3 h-[43px] pr-7
    ] rounded-md focus:outline-none w-[100%] text-[15px] text-[#aeabab]' />
            <SearchIcon className='absolute right-[10px] search-icon    text-[#aeabab]  font-thin text-[#dddddd;
    ]'/>
          </div>
        </div>
        <table class="table-auto w-[100%]">
          <thead className='bg-[#f1f5f9] '>
            <tr>
              <th className='text-center p-4 text-sm font-medium '>Department Name</th>
              <th className='text-center p-4 text-sm font-medium '>Options</th>
            </tr>
          </thead>
          <tbody>
            {
              departments.map((dep, index) => {
                return <tr key={dep.id} className='border-b pb-2 border-[#f1f5f9]'>
                  <td className='pt-4 pb-3 pl-3'>
                    <Link to="/" className='text-[#511992] text-[14px]'>{dep.department_name}</Link>
                    <h6 className='text-[13px] pt-2 text-[#a5a1a1]'>Total Users: <span>1</span></h6>
                  </td>
                  <td className='flex pt-4 gap-2 justify-center'>
                    <Link to="/editdepartment" onClick={()=>{
                      setDepId(dep.id)
                      setName(dep.department_name)
                      }}>
                      <BorderColorIcon className='text-[#511992] font-light cursor-pointer text-[10px]]' />
                    </Link>
                    <DeleteOutlineIcon className='text-red-500 font-light cursor-pointer text-[10px]]' onClick={() => { deleteDepartments(dep.id) }} />
                  </td>
                </tr>

              })
            }




          </tbody>
        </table>
        <div className='flex justify-between p-3 pt-5 w-[100%] items-center  flex-col gap-2  sm:flex-row sm:gap-0'>
          <p className=' text-[#a5a1a1] text-[14px]'>Showing 1 to 7 of 7 entries </p>
          <div className='pagination flex gap-2 border pt-0 pl-4 pb-0 pr-4 rounded-md'>
            <Link to="#" className='text-[12px]  pt-2 pb-[8px]'>Previous</Link>
            <span className='text-[12px] bg-[#511992] flex items-center  text-white pl-3 pr-3 '>1</span>
            <Link to="#" className='text-[12px]  pt-2 pb-[8px] '>Next</Link>

          </div>
        </div>
      </div>

    </div>
  )
}

export default DepartmentDetail