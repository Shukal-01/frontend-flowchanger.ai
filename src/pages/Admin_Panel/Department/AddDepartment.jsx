import React, { useState } from 'react'
import { useGlobalContext } from '../../../Context/GlobalContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { set } from 'react-hook-form';



const AddDepartment = () => {
    const [department, setDepartment] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);


    const { baseUrl, openToast } = useGlobalContext();


    async function submitDepartment() {
        try {
            setIsLoading(true);
            if (!department.trim()) {
                openToast("Department name cannot be empty", "error");
                return;
            }
            const response = await fetch(baseUrl + "department", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ departmentName: department }) // send the formatted data
            });

            console.log(response);
            const result = await response.json();
            if (response.status === 200) {

                console.log(result);
                openToast(result.message || "Department successfully added", "success");
                navigate("/department-details");
            } else {
                openToast(result.message || "An error occurred", "error");
            }
        } catch (error) {
            setIsLoading(false);
        }
        finally {
            setIsLoading(false);
        }
    }


    return (
        <div className='addnewrole  pl-[10px] w-[100%] pr-2 mb-3 pb-4'>
            <h2 className='text-[#27004a] font-medium text-[18px]'>Add New Department</h2>

            <div className='w-[100%]'>
                <div className='bg-[#fff] w-[80%] set-shadow p-3 lg:w-[50%] xl:w-[50%] md:w-[50%] mt-2 rounded-md'>
                    <label>Department Name</label><br />
                    <input type='text' value={department} onChange={(e) => setDepartment(e.target.value)} className='mt-2 border border-1 pl-3 h-[43px] pr-7
                    ] rounded-md focus:outline-none w-[100%] text-[15px] text-[#aeabab]'/>
                    <table className='border mt-5 w-[100%] border-1'>
                        <thead className='border border-1 '>
                            <th className='p-2 text-left font-medium border-r-[1px]'>Features</th>
                            <th className='p-2 text-left  font-medium'>Capabilities</th>

                        </thead>
                        <tbody className='table-body-set'>
                            <tr className='border border-1'>
                                <td className='p-3 text-[16px] border-r-[1px] text-[#64748b] font-normal'>Clients</td>
                                <td className='p-3'>
                                    <input type="checkbox" className='cursor-pointer' id="client" name="vehicle1" value="Bike" />
                                    <label className='ml-3 text-[14px] cursor-pointer  text-[#64748b] ' for="client">View Global</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="client1" name="vehicle2" value="Car" />
                                    <label className='ml-2 cursor-pointer text-[14px]  text-[#64748b] ' for="client1"> Create</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="client2" name="vehicle3" value="Boat" />
                                    <label className='ml-3 cursor-pointer text-[14px]  text-[#64748b] ' for="client2">Edit</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="client3" name="vehicle3" value="Boat" />
                                    <label className='ml-3 cursor-pointer text-[14px]  text-[#64748b] ' for="client3">Delete</label><br /><br />
                                </td>
                            </tr>

                            <tr className='border border-1'>
                                <td className='p-3 text-[14px] text-[#64748b] border-r-[1px] font-normal'>Projects</td>
                                <td className='p-3'>
                                    <input type="checkbox" className='cursor-pointer' id="project" name="vehicle1" value="Bike" />
                                    <label className='ml-3 text-[14px] cursor-pointer  text-[#64748b] ' for="project">View Global</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="project1" name="vehicle2" value="Car" />
                                    <label className='ml-2 cursor-pointer text-[14px]  text-[#64748b] ' for="project1"> Create</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="project2" name="vehicle3" value="Boat" />
                                    <label className='ml-3 cursor-pointer text-[14px]  text-[#64748b] ' for="project2">Edit</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="project3" name="vehicle3" value="Boat" />
                                    <label className='ml-3 cursor-pointer text-[14px]  text-[#64748b] ' for="project3">Delete</label><br /><br />
                                </td>
                            </tr>


                            <tr className='border border-1'>
                                <td className='p-3 text-[16px] border-r-[1px] text-[#64748b] font-normal'>Report</td>
                                <td className='p-3'>
                                    <input type="checkbox" className='cursor-pointer' id="report" name="vehicle1" value="Bike" />
                                    <label className='ml-3 text-[14px] cursor-pointer  text-[#64748b] ' for="report">View Global</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="report1" name="vehicle2" value="Car" />
                                    <label className='ml-2 cursor-pointer text-[14px]  text-[#64748b] ' for="report1"> View Timesheets Report</label><br />
                                </td>
                            </tr>

                            <tr className='border border-1'>
                                <td className='p-3 text-[16px] border-r-[1px] text-[#64748b] font-normal'>Staff Role</td>
                                <td className='p-3'>
                                    <input type="checkbox" className='cursor-pointer' id="staffrole" name="vehicle1" value="Bike" />
                                    <label className='ml-3 text-[14px] cursor-pointer  text-[#64748b] ' for="staffrole">View Global</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="staffrole1" name="vehicle2" value="Car" />
                                    <label className='ml-2 cursor-pointer text-[14px]  text-[#64748b] ' for="staffrole1"> Create</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="staffrole2" name="vehicle3" value="Boat" />
                                    <label className='ml-3 cursor-pointer text-[14px]  text-[#64748b] ' for="staffrole2">Edit</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="staffrole3" name="vehicle3" value="Boat" />
                                    <label className='ml-3 cursor-pointer text-[14px]  text-[#64748b] ' for="staffrole3">Delete</label><br /><br />
                                </td>
                            </tr>

                            <tr className='border border-1'>
                                <td className='p-3 text-[16px] border-r-[1px] text-[#64748b] font-normal'>Setting</td>
                                <td className='p-3'>
                                    <input type="checkbox" className='cursor-pointer' id="setting" name="vehicle1" value="Bike" />
                                    <label className='ml-3 text-[14px] cursor-pointer  text-[#64748b] ' for="setting">View Global</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="setting1" name="vehicle2" value="Car" />
                                    <label className='ml-2 cursor-pointer text-[14px]  text-[#64748b] ' for="setting1"> View Timesheets Report</label><br />
                                </td>
                            </tr>

                            <tr className='border border-1'>
                                <td className='p-3 text-[16px] border-r-[1px] text-[#64748b] font-normal'>Staff </td>
                                <td className='p-3'>
                                    <input type="checkbox" className='cursor-pointer' id="staff" name="vehicle1" value="Bike" />
                                    <label className='ml-3 text-[14px] cursor-pointer  text-[#64748b] ' for="staff">View Global</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="staff1" name="vehicle2" value="Car" />
                                    <label className='ml-2 cursor-pointer text-[14px]  text-[#64748b] ' for="staff1"> Create</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="staff2" name="vehicle3" value="Boat" />
                                    <label className='ml-3 cursor-pointer text-[14px]  text-[#64748b] ' for="staff2">Edit</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="staff3" name="vehicle3" value="Boat" />
                                    <label className='ml-3 cursor-pointer text-[14px]  text-[#64748b] ' for="staff3">Delete</label><br /><br />
                                </td>
                            </tr>

                            <tr className='border border-1'>
                                <td className='p-3 text-[16px] border-r-[1px] text-[#64748b] font-normal'>Task </td>
                                <td className='p-3'>
                                    <input type="checkbox" className='cursor-pointer' id="task" name="vehicle1" value="Bike" />
                                    <label className='ml-3 text-[14px] cursor-pointer  text-[#64748b] ' for="task">View Global</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="task1" name="vehicle2" value="Car" />
                                    <label className='ml-2 cursor-pointer text-[14px]  text-[#64748b] ' for="task1"> Create</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="task2" name="vehicle3" value="Boat" />
                                    <label className='ml-3 cursor-pointer text-[14px]  text-[#64748b] ' for="task2">Edit</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="task3" name="vehicle3" value="Boat" />
                                    <label className='ml-3 cursor-pointer text-[14px]  text-[#64748b] ' for="task3">Delete</label><br /><br />
                                </td>
                            </tr>

                            <tr className='border border-1'>
                                <td className='p-3 text-[16px] border-r-[1px] text-[#64748b] font-normal'>Sub Task </td>
                                <td className='p-3'>
                                    <input type="checkbox" className='cursor-pointer' id="subtask" name="vehicle1" value="Bike" />
                                    <label className='ml-3 text-[14px] cursor-pointer  text-[#64748b] ' for="subtask">View Global</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="subtask1" name="vehicle2" value="Car" />
                                    <label className='ml-2 cursor-pointer text-[14px]  text-[#64748b] ' for="subtask1"> Create</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="subtask2" name="vehicle3" value="Boat" />
                                    <label className='ml-3 cursor-pointer text-[14px]  text-[#64748b] ' for="subtask2">Edit</label><br />
                                    <input type="checkbox" className='cursor-pointer' id="subtask3" name="vehicle3" value="Boat" />
                                    <label className='ml-3 cursor-pointer text-[14px]  text-[#64748b] ' for="subtask3">Delete</label><br /><br />
                                </td>
                            </tr>

                            <tr className='border border-1'>
                                <td className='p-3 text-[14px] border-r-[1px] whitespace-nowrap text-[#64748b] font-normal'>Chat Module </td>
                                <td className='p-3'>
                                    <input type="checkbox" className='cursor-pointer' id="chat" name="vehicle1" value="Bike" />
                                    <label className='ml-3 text-[14px] cursor-pointer  text-[#64748b] ' for="chat">Grant Access</label><br />
                                </td>
                            </tr>

                        </tbody>
                    </table>


                    <div className='text-end mt-3 flex gap-[10px] justify-end'>
                        <Link to="/department-details" className='first-btn flex items-center pt-2 py-2 pl-5 pr-5 rounded-md text-white hover:bg-[#7526d1]'>
                            Cancel
                        </Link>
                        <button className={`second-btn pt-2 py-2 pl-5 pr-5 rounded-md text-white hover:bg-[#7526d1] ${isLoading == true ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={submitDepartment}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddDepartment