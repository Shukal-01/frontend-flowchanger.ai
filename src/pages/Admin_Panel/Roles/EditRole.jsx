import React, { useEffect, useState } from 'react'
import CachedIcon from '@mui/icons-material/Cached';
import SearchIcon from '@mui/icons-material/Search';
import titleimg from '../../../Assets/Images/title-icon.jpg'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGlobalContext } from '../../../Context/GlobalContext';
const EditRole = () => {

    const { baseUrl, openToast, roleName, setRoleName, roleId, setEditPermissions, editPermissions: permissions } = useGlobalContext();
    const navigate = useNavigate()

    // console.log(roleId , permissions);

    const handlePermissionChange = (section, permission) => {
        setEditPermissions(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [permission]: !prev[section][permission]
            }
        }));
    };

    async function updateRole() {
        console.log({ roleName: roleName, permissions: { ...permissions } })

        const response = await fetch(baseUrl + "role/" + roleId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ roleName: roleName, permissions })
        });

        const data = await response.json();
        console.log("API Response: ", data);
        console.log(response)

        if (response.status === 200) {
            navigate("/role-detail");
            openToast("Update Role Successfully", "success");
        } else {
            openToast("An error occurred", "error");
        }
    }


    useEffect(() => {
        if (roleName === "" || roleId === "") {
            navigate("/role-detail");
        }
    }, [roleName, roleId, navigate]);

    console.log(permissions);
    return (
        <div className='flex flex-col gap-1 sm:flex-col lg:flex-row md:flex-col'>
            <div className='addnewrole  pl-[10px] sm:w-[100%] lg:w-[50%] md:w-[100%] w-[100%] pr-2 mb-3 pb-4'>
                <h2>Edit Role Content Writer</h2>

                <div className='bg-[#fff] shadow-cs p-3  md:w-[100%] sm:w-[100%] w-[100%] mt-2 rounded-md'>
                    <label>Role Name</label><br />
                    <input type='text' className='mt-2 border border-1 pl-3 h-[43px] pr-7
 rounded-md focus:outline-none w-[100%] text-[15px] text-[#aeabab]'
                        value={roleName} onChange={(e) => setRoleName(e.target.value)}
                    />

                    <table className='border mt-5 w-[100%] border-1'>
                        <thead className='border border-1 '>
                            <tr>
                                <th className='p-2 text-left font-medium border-r-[1px]'>Features</th>
                                <th className='p-2 text-left font-medium'>Capabilities</th>
                            </tr>
                        </thead>
                        <tbody className='table-body-set'>
                            {/* Clients Section */}
                            <tr className='border border-1'>
                                <td className='p-3 text-[14px] border-r-[1px] text-[#64748b] font-normal'>Clients</td>
                                <td className='p-3'>
                                    <input
                                        type="checkbox"
                                        className='cursor-pointer'
                                        checked={permissions.clients_permissions.view_global}
                                        onChange={() => handlePermissionChange('clients_permissions', 'view_global')}
                                    />
                                    <label className='ml-3 text-[13px] cursor-pointer text-[#64748b]'>View Global</label><br />

                                    <input
                                        type="checkbox"
                                        className='cursor-pointer'
                                        checked={permissions.clients_permissions.create}
                                        onChange={() => handlePermissionChange('clients_permissions', 'create')}
                                    />
                                    <label className='ml-2 cursor-pointer text-[13px] text-[#64748b]'>Create</label><br />

                                    <input
                                        type="checkbox"
                                        className='cursor-pointer'
                                        checked={permissions.clients_permissions.edit}
                                        onChange={() => handlePermissionChange('clients_permissions', 'edit')}
                                    />
                                    <label className='ml-3 cursor-pointer text-[13px] text-[#64748b]'>Edit</label><br />

                                    <input
                                        type="checkbox"
                                        className='cursor-pointer'
                                        checked={permissions.clients_permissions.delete}
                                        onChange={() => handlePermissionChange('clients_permissions', 'delete')}
                                    />
                                    <label className='ml-3 cursor-pointer text-[13px] text-[#64748b]'>Delete</label><br /><br />
                                </td>
                            </tr>

                            {/* Projects Section */}
                            <tr className='border border-1'>
                                <td className='p-3 text-[14px] border-r-[1px] text-[#64748b] font-normal'>Projects</td>
                                <td className='p-3'>
                                    <input
                                        type="checkbox"
                                        className='cursor-pointer'
                                        checked={permissions.projects_permissions.view_global}
                                        onChange={() => handlePermissionChange('projects_permissions', 'view_global')}
                                    />
                                    <label className='ml-3 text-[13px] cursor-pointer text-[#64748b]'>View Global</label><br />

                                    <input
                                        type="checkbox"
                                        className='cursor-pointer'
                                        checked={permissions.projects_permissions.create}
                                        onChange={() => handlePermissionChange('projects_permissions', 'create')}
                                    />
                                    <label className='ml-2 cursor-pointer text-[13px] text-[#64748b]'>Create</label><br />

                                    <input
                                        type="checkbox"
                                        className='cursor-pointer'
                                        checked={permissions.projects_permissions.edit}
                                        onChange={() => handlePermissionChange('projects_permissions', 'edit')}
                                    />
                                    <label className='ml-3 cursor-pointer text-[13px] text-[#64748b]'>Edit</label><br />

                                    <input
                                        type="checkbox"
                                        className='cursor-pointer'
                                        checked={permissions.projects_permissions.delete}
                                        onChange={() => handlePermissionChange('projects_permissions', 'delete')}
                                    />
                                    <label className='ml-3 cursor-pointer text-[13px] text-[#64748b]'>Delete</label><br /><br />
                                </td>
                            </tr>

                            {/* Report Section */}
                            <tr className='border border-1'>
                                <td className='p-3 text-[14px] border-r-[1px] text-[#64748b] font-normal'>Report</td>
                                <td className='p-3'>
                                    <input
                                        type="checkbox"
                                        className='cursor-pointer'
                                        checked={permissions.report_permissions.view_global}
                                        onChange={() => handlePermissionChange('report_permissions', 'view_global')}
                                    />
                                    <label className='ml-3 text-[13px] cursor-pointer text-[#64748b]'>View Global</label><br />

                                    <input
                                        type="checkbox"
                                        className='cursor-pointer'
                                        checked={permissions.report_permissions.view_time_sheets}
                                        onChange={() => handlePermissionChange('report_permissions', 'view_time_sheets')}
                                    />
                                    <label className='ml-2 cursor-pointer text-[13px] text-[#64748b]'>View Timesheets Report</label><br /><br />
                                </td>
                            </tr>

                            {/* Setting Section */}
                            <tr className='border border-1'>
                                <td className='p-3 text-[14px] border-r-[1px] text-[#64748b] font-normal'>Setting</td>
                                <td className='p-3'>
                                    <input
                                        type="checkbox"
                                        className='cursor-pointer'
                                        checked={permissions.settings_permissions.view_global}
                                        onChange={() => handlePermissionChange('settings_permissions', 'view_global')}
                                    />
                                    <label className='ml-3 text-[13px] cursor-pointer text-[#64748b]'>View Global</label><br />

                                    <input
                                        type="checkbox"
                                        className='cursor-pointer'
                                        checked={permissions.settings_permissions.view_time_sheets}
                                        onChange={() => handlePermissionChange('settings_permissions', 'view_time_sheets')}
                                    />
                                    <label className='ml-2 cursor-pointer text-[13px] text-[#64748b]'>View Timesheets Report</label><br /><br />
                                </td>
                            </tr>

                            {/* Staff Role Section */}
                            <tr className='border border-1'>
                                <td className='p-3 text-[14px] border-r-[1px] text-[#64748b] font-normal'>Staff Role</td>
                                <td className='p-3'>
                                    <input
                                        type="checkbox"
                                        className='cursor-pointer'
                                        checked={permissions.staff_role_permissions.view_global}
                                        onChange={() => handlePermissionChange('staff_role_permissions', 'view_global')}
                                    />
                                    <label className='ml-3 text-[13px] cursor-pointer text-[#64748b]'>View Global</label><br />

                                    <input
                                        type="checkbox"
                                        className='cursor-pointer'
                                        checked={permissions.staff_role_permissions.create}
                                        onChange={() => handlePermissionChange('staff_role_permissions', 'create')}
                                    />
                                    <label className='ml-2 cursor-pointer text-[13px] text-[#64748b]'>Create</label><br />

                                    <input
                                        type="checkbox"
                                        className='cursor-pointer'
                                        checked={permissions.staff_role_permissions.edit}
                                        onChange={() => handlePermissionChange('staff_role_permissions', 'edit')}
                                    />
                                    <label className='ml-3 cursor-pointer text-[13px] text-[#64748b]'>Edit</label><br />

                                    <input
                                        type="checkbox"
                                        className='cursor-pointer'
                                        checked={permissions.staff_role_permissions.delete}
                                        onChange={() => handlePermissionChange('staff_role_permissions', 'delete')}
                                    />
                                    <label className='ml-3 cursor-pointer text-[13px] text-[#64748b]'>Delete</label><br /><br />
                                </td>
                            </tr>

                            {/* Staff  Section */}
                            <tr className='border border-1'>
                                <td className='p-3 text-[14px] border-r-[1px] text-[#64748b] font-normal'>Staff </td>
                                <td className='p-3'>
                                    <input
                                        type="checkbox"
                                        className='cursor-pointer'
                                        checked={permissions.staff_permissions.view_global}
                                        onChange={() => handlePermissionChange('staff_permissions', 'view_global')}
                                    />
                                    <label className='ml-3 text-[13px] cursor-pointer text-[#64748b]'>View Global</label><br />

                                    <input
                                        type="checkbox"
                                        className='cursor-pointer'
                                        checked={permissions.staff_permissions.create}
                                        onChange={() => handlePermissionChange('staff_permissions', 'create')}
                                    />
                                    <label className='ml-2 cursor-pointer text-[13px] text-[#64748b]'>Create</label><br />

                                    <input
                                        type="checkbox"
                                        className='cursor-pointer'
                                        checked={permissions.staff_permissions.edit}
                                        onChange={() => handlePermissionChange('staff_permissions', 'edit')}
                                    />
                                    <label className='ml-3 cursor-pointer text-[13px] text-[#64748b]'>Edit</label><br />

                                    <input
                                        type="checkbox"
                                        className='cursor-pointer'
                                        checked={permissions.staff_permissions.delete}
                                        onChange={() => handlePermissionChange('staff_permissions', 'delete')}
                                    />
                                    <label className='ml-3 cursor-pointer text-[13px] text-[#64748b]'>Delete</label><br /><br />
                                </td>
                            </tr>

                            {/* Task  Section */}
                            <tr className='border border-1'>
                                <td className='p-3 text-[14px] border-r-[1px] text-[#64748b] font-normal'>Task </td>
                                <td className='p-3'>
                                    <input
                                        type="checkbox"
                                        className='cursor-pointer'
                                        checked={permissions.task_permissions.view_global}
                                        onChange={() => handlePermissionChange('task_permissions', 'view_global')}
                                    />
                                    <label className='ml-3 text-[13px] cursor-pointer text-[#64748b]'>View Global</label><br />

                                    <input
                                        type="checkbox"
                                        className='cursor-pointer'
                                        checked={permissions.task_permissions.create}
                                        onChange={() => handlePermissionChange('task_permissions', 'create')}
                                    />
                                    <label className='ml-2 cursor-pointer text-[13px] text-[#64748b]'>Create</label><br />

                                    <input
                                        type="checkbox"
                                        className='cursor-pointer'
                                        checked={permissions.task_permissions.edit}
                                        onChange={() => handlePermissionChange('task_permissions', 'edit')}
                                    />
                                    <label className='ml-3 cursor-pointer text-[13px] text-[#64748b]'>Edit</label><br />

                                    <input
                                        type="checkbox"
                                        className='cursor-pointer'
                                        checked={permissions.task_permissions.delete}
                                        onChange={() => handlePermissionChange('task_permissions', 'delete')}
                                    />
                                    <label className='ml-3 cursor-pointer text-[13px] text-[#64748b]'>Delete</label><br /><br />
                                </td>
                            </tr>

                            {/* Sub Task  Section */}
                            <tr className='border border-1'>
                                <td className='p-3 text-[14px] border-r-[1px] text-[#64748b] font-normal'>Sub Task </td>
                                <td className='p-3'>
                                    <input
                                        type="checkbox"
                                        className='cursor-pointer'
                                        checked={permissions.sub_task_permissions.view_global}
                                        onChange={() => handlePermissionChange('sub_task_permissions', 'view_global')}
                                    />
                                    <label className='ml-3 text-[13px] cursor-pointer text-[#64748b]'>View Global</label><br />

                                    <input
                                        type="checkbox"
                                        className='cursor-pointer'
                                        checked={permissions.sub_task_permissions.create}
                                        onChange={() => handlePermissionChange('sub_task_permissions', 'create')}
                                    />
                                    <label className='ml-2 cursor-pointer text-[13px] text-[#64748b]'>Create</label><br />

                                    <input
                                        type="checkbox"
                                        className='cursor-pointer'
                                        checked={permissions.sub_task_permissions.edit}
                                        onChange={() => handlePermissionChange('sub_task_permissions', 'edit')}
                                    />
                                    <label className='ml-3 cursor-pointer text-[13px] text-[#64748b]'>Edit</label><br />

                                    <input
                                        type="checkbox"
                                        className='cursor-pointer'
                                        checked={permissions.sub_task_permissions.delete}
                                        onChange={() => handlePermissionChange('sub_task_permissions', 'delete')}
                                    />
                                    <label className='ml-3 cursor-pointer text-[13px] text-[#64748b]'>Delete</label><br /><br />
                                </td>
                            </tr>

                            {/* Chat Module Section */}
                            <tr className='border border-1'>
                                <td className='p-3 text-[14px] border-r-[1px] text-[#64748b] font-normal'>Chat Module</td>
                                <td className='p-3'>
                                    <input
                                        type="checkbox"
                                        className='cursor-pointer'
                                        checked={permissions.chat_module_permissions.grant_access}
                                        onChange={() => handlePermissionChange('chat_module_permissions', 'grant_access')}
                                    />
                                    <label className='ml-3 text-[13px] cursor-pointer text-[#64748b]'>Grant Access</label><br />
                                </td>
                            </tr>
                        </tbody>
                    </table>


                    <div className='flex justify-end mt-3 gap-2'>
                        <Link to="/role-detail" className='first-btn flex items-center' >Cancel</Link>
                        <button className='second-btn' onClick={updateRole}>Update</button>
                    </div>
                </div>
            </div>

            <div className='staff-member w-[100%] sm:w-[100%] lg:w-[50%] md:w-[100%]'>
                <h2>Staff members using this role</h2>

                <div className='bg-[#fff] shadow-cs   p-2 rounded-md mt-2'>
                    <div className='flex mb-4 justify-between p-2 pl-0 pr-0 flex-col gap-2  sm:flex-row sm:gap-0'>
                        <div className='left-side '>
                            <select className=' border border-[#e5e7eb] p-[7px]  shadow-sm mr-2 rounded-md text-[14px] pr-3 focus:outline-none'>
                                <option>25</option>
                                <option>50</option>
                                <option>100</option>
                                <option>120</option>

                            </select>

                            <select className=' border border-[#e5e7eb]  p-[7px] text-[14px] shadow-sm rounded-md  pr-3 focus:outline-none'>
                                <option>Export</option>
                                <option>CSV</option>
                                <option>PDF</option>
                                <option>Print</option>
                            </select>




                        </div>



                        <div className='right-side relative  w-[200px]'>
                            <input type='text' placeholder='Search' className='border border-1 pl-3 h-[43px] pr-7
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

export default EditRole