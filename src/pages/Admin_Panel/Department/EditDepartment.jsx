import React, { useEffect, useState } from 'react'
import CachedIcon from '@mui/icons-material/Cached';
import SearchIcon from '@mui/icons-material/Search';
import titleimg from '../../../Assets/Images/title-icon.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../../Context/GlobalContext';
const EditDepartment = () => {

    const { baseUrl, name, setName, depId, openToast } = useGlobalContext();
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false); 


    async function updateDepartment() {
        try {
            setIsLoading(true)
            const response = await fetch(baseUrl + "department/" + depId, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ departmentName: name }) // send the formatted data
            });

            console.log(response);
            const result = await response.json();
            if (response.status === 200) {
                navigate("/department-details")
                openToast("Update Department Successfully", "success");
            } else {
                openToast("An error occurred", "error");

            }
        }
        catch(error){
            console.log("error",error)
        }
        finally{
            setIsLoading(false)            
        }
    }

    useEffect(() => {

        if (name === "" || depId == "") {
            navigate("/department-details")
        }
    }, [])


    return (
        <div className='flex  gap-1 flex-col md:flex-row'>
            <div className='addnewrole  pl-[10px] sm:w-[100%] lg:w-[50%] md:w-[100%] w-[100%] pr-2 mb-3 pb-4'>
                <h2 className='mt-[20px]'>Edit Department</h2>

                <div className='bg-[#fff] p-3  md:w-[100%] sm:w-[100%] w-[100%] mt-[20px] rounded-lg shadow-cs'>
                    <label>Department Name</label><br />
                    <input type='text' className='mt-2 border border-1 pl-3 h-[43px] pr-[7px] rounded-md focus:outline-none w-[100%] text-[15px] text-[#aeabab]'
                        value={name} onChange={(e) => setName(e.target.value)} />
                    <table className='border mt-5 w-[100%] border-1'>
                        <thead className='border border-1 '>
                            <th className='p-2 text-left font-medium border-r-[1px]'>Features</th>
                            <th className='p-2 text-left  font-medium'>Capabilities</th>

                        </thead>
                        <tbody className='table-body-set'>
                            <tr className='border border-1'>
                                <td className='p-3 text-[14px] border-r-[1px] text-[#64748b] font-normal'>Clients</td>
                                <td className='p-3'>
                                    <input type="checkbox" className='cursor-pointer' id="client" name="vehicle1" value="Bike" />
                                    <label className='ml-3 text-[13px] cursor-pointer  text-[#64748b] ' for="client">View Global</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="client1" name="vehicle2" value="Car" />
                                    <label className='ml-2 cursor-pointer text-[13px]  text-[#64748b] ' for="client1"> Create</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="client2" name="vehicle3" value="Boat" />
                                    <label className='ml-3 cursor-pointer text-[13px]  text-[#64748b] ' for="client2">Edit</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="client3" name="vehicle3" value="Boat" />
                                    <label className='ml-3 cursor-pointer text-[13px]  text-[#64748b] ' for="client3">Delete</label><br /><br />
                                </td>
                            </tr>

                            <tr className='border border-1'>
                                <td className='p-3 text-[14px] text-[#64748b] border-r-[1px] font-normal'>Projects</td>
                                <td className='p-3'>
                                    <input type="checkbox" className='cursor-pointer' id="project" name="vehicle1" value="Bike" />
                                    <label className='ml-3 text-[13px] cursor-pointer  text-[#64748b] ' for="project">View Global</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="project1" name="vehicle2" value="Car" />
                                    <label className='ml-2 cursor-pointer text-[13px]  text-[#64748b] ' for="project1"> Create</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="project2" name="vehicle3" value="Boat" />
                                    <label className='ml-3 cursor-pointer text-[13px]  text-[#64748b] ' for="project2">Edit</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="project3" name="vehicle3" value="Boat" />
                                    <label className='ml-3 cursor-pointer text-[13px]  text-[#64748b] ' for="project3">Delete</label><br /><br />
                                </td>
                            </tr>


                            <tr className='border border-1'>
                                <td className='p-3 text-[14px] border-r-[1px] text-[#64748b] font-normal'>Report</td>
                                <td className='p-3'>
                                    <input type="checkbox" className='cursor-pointer' id="report" name="vehicle1" value="Bike" />
                                    <label className='ml-3 text-[13px] cursor-pointer  text-[#64748b] ' for="report">View Global</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="report1" name="vehicle2" value="Car" />
                                    <label className='ml-2 cursor-pointer text-[13px]  text-[#64748b] ' for="report1"> View Timesheets Report</label><br />
                                </td>
                            </tr>

                            <tr className='border border-1'>
                                <td className='p-3 text-[14px] border-r-[1px] text-[#64748b] font-normal'>Staff Role</td>
                                <td className='p-3'>
                                    <input type="checkbox" className='cursor-pointer' id="staffrole" name="vehicle1" value="Bike" />
                                    <label className='ml-3 text-[13px] cursor-pointer  text-[#64748b] ' for="staffrole">View Global</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="staffrole1" name="vehicle2" value="Car" />
                                    <label className='ml-2 cursor-pointer text-[13px]  text-[#64748b] ' for="staffrole1"> Create</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="staffrole2" name="vehicle3" value="Boat" />
                                    <label className='ml-3 cursor-pointer text-[13px]  text-[#64748b] ' for="staffrole2">Edit</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="staffrole3" name="vehicle3" value="Boat" />
                                    <label className='ml-3 cursor-pointer text-[13px]  text-[#64748b] ' for="staffrole3">Delete</label><br /><br />
                                </td>
                            </tr>

                            <tr className='border border-1'>
                                <td className='p-3 text-[14px] border-r-[1px] text-[#64748b] font-normal'>Setting</td>
                                <td className='p-3'>
                                    <input type="checkbox" className='cursor-pointer' id="setting" name="vehicle1" value="Bike" />
                                    <label className='ml-3 text-[13px] cursor-pointer  text-[#64748b] ' for="setting">View Global</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="setting1" name="vehicle2" value="Car" />
                                    <label className='ml-2 cursor-pointer text-[13px]  text-[#64748b] ' for="setting1"> View Timesheets Report</label><br />
                                </td>
                            </tr>

                            <tr className='border border-1'>
                                <td className='p-3 text-[14px] border-r-[1px] text-[#64748b] font-normal'>Staff </td>
                                <td className='p-3'>
                                    <input type="checkbox" className='cursor-pointer' id="staff" name="vehicle1" value="Bike" />
                                    <label className='ml-3 text-[13px] cursor-pointer  text-[#64748b] ' for="staff">View Global</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="staff1" name="vehicle2" value="Car" />
                                    <label className='ml-2 cursor-pointer text-[13px]  text-[#64748b] ' for="staff1"> Create</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="staff2" name="vehicle3" value="Boat" />
                                    <label className='ml-3 cursor-pointer text-[13px]  text-[#64748b] ' for="staff2">Edit</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="staff3" name="vehicle3" value="Boat" />
                                    <label className='ml-3 cursor-pointer text-[13px]  text-[#64748b] ' for="staff3">Delete</label><br /><br />
                                </td>
                            </tr>

                            <tr className='border border-1'>
                                <td className='p-3 text-[14px] border-r-[1px] text-[#64748b] font-normal'>Task </td>
                                <td className='p-3'>
                                    <input type="checkbox" className='cursor-pointer' id="task" name="vehicle1" value="Bike" />
                                    <label className='ml-3 text-[13px] cursor-pointer  text-[#64748b] ' for="task">View Global</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="task1" name="vehicle2" value="Car" />
                                    <label className='ml-2 cursor-pointer text-[13px]  text-[#64748b] ' for="task1"> Create</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="task2" name="vehicle3" value="Boat" />
                                    <label className='ml-3 cursor-pointer text-[13px]  text-[#64748b] ' for="task2">Edit</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="task3" name="vehicle3" value="Boat" />
                                    <label className='ml-3 cursor-pointer text-[13px]  text-[#64748b] ' for="task3">Delete</label><br /><br />
                                </td>
                            </tr>

                            <tr className='border border-1'>
                                <td className='p-3 text-[14px] border-r-[1px] text-[#64748b] font-normal'>Sub Task </td>
                                <td className='p-3'>
                                    <input type="checkbox" className='cursor-pointer' id="subtask" name="vehicle1" value="Bike" />
                                    <label className='ml-3 text-[13px] cursor-pointer  text-[#64748b] ' for="subtask">View Global</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="subtask1" name="vehicle2" value="Car" />
                                    <label className='ml-2 cursor-pointer text-[13px]  text-[#64748b] ' for="subtask1"> Create</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="subtask2" name="vehicle3" value="Boat" />
                                    <label className='ml-3 cursor-pointer text-[13px]  text-[#64748b] ' for="subtask2">Edit</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="subtask3" name="vehicle3" value="Boat" />
                                    <label className='ml-3 cursor-pointer text-[13px]  text-[#64748b] ' for="subtask3">Delete</label><br /><br />
                                </td>
                            </tr>

                            <tr className='border border-1'>
                                <td className='p-3 text-[14px] border-r-[1px] whitespace-nowrap text-[#64748b] font-normal'>Chat Module </td>
                                <td className='p-3'>
                                    <input type="checkbox" className='cursor-pointer' id="chat" name="vehicle1" value="Bike" />
                                    <label className='ml-3 text-[13px] cursor-pointer  text-[#64748b] ' for="chat">Grant Access</label><br />
                                </td>
                            </tr>

                        </tbody>
                    </table>


                    <div className='flex justify-end gap-2 mt-3'>
                        <Link to="/department-details " className='first-btn flex items-center '>
                            Cancel
                        </Link>
                        <button className={`second-btn ${isLoading==true ? 'opacity-50 cursor-not-allowed' : ''}`} 
                         onClick={updateDepartment}>Update</button>
                    </div>
                </div>
            </div>

            <div className='staff-member w-[100%] sm:w-[100%] lg:w-[50%] md:w-[100%]'>
                <h2 className='mt-[20px]'>Staff members using this role</h2>

                <div className=' bg-[#fff] shadow-cs  p-2 rounded-lg mt-[20px] mb-[40px] md:mb-0'>
                    <div className='flex mb-4 justify-between p-2 pl-0 pr-0 flex-col gap-2  sm:flex-row sm:gap-0'>
                        <div className='left-side '>
                            <select className=' border border-[#e5e7eb] p-[7px] text-[14px] shadow-sm mr-2 rounded-md  pr-3 focus:outline-none'>
                                <option>25</option>
                                <option>50</option>
                                <option>100</option>
                                <option>120</option>

                            </select>

                            <select className=' border border-[#e5e7eb]  p-[7px] shadow-sm rounded-md text-[14px] pr-3 focus:outline-none'>
                                <option>Export</option>
                                <option>CSV</option>
                                <option>PDF</option>
                                <option>Print</option>
                            </select>




                        </div>



                        <div className='right-side relative  w-[200px]'>
                            <input type='text' placeholder='Search' className='border border-1 pl-3 h-[38px] pr-7
] rounded-md focus:outline-none w-[100%] text-[15px] text-[#aeabab]' />
                            <SearchIcon className='absolute right-[10px] search-icon    text-[#aeabab]  font-thin text-[#dddddd;
]'/>
                        </div>

                    </div>

                    <div className=''>
                        <h2 className='p-2 bg-[#fff] shadow-cs rounded-md border border-l-0 mb-2 border-r-0 border-t-1 border-b-1 '>Full Name</h2>

                        <div className='title flex gap-2 items-center'>
                            <img src={titleimg} className='rounded-3xl h-[32px] w-[32px]' />
                            <p className='text-[#27004a]'>Divanshi Gupta</p>
                        </div>

                        <div className='flex justify-between p-3 pt-5 w-[100%] items-center  flex-col gap-2  sm:flex-row sm:gap-0'>
                            <p className=' text-[#a5a1a1] text-[14px]'>Showing 1 to 7 of 7 entries </p>
                            <div className='pagination flex gap-2 border pt-0 pl-4 pb-0 pr-4 rounded-md'>
                                <Link to="#" className='text-[12px]  pt-2 pb-[8px]'>Previous</Link>
                                <span className='text-[12px] bg-[#27004a] flex items-center  text-white pl-3 pr-3 '>1</span>
                                <Link to="#" className='text-[12px]  pt-2 pb-[8px] '>Next</Link>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default EditDepartment