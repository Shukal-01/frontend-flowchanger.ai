import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../../Context/GlobalContext';
import { Link, useNavigate } from 'react-router-dom';

const AddNewRole = () => {
    const { baseUrl, openToast } = useGlobalContext();
    // State for role name and permissions
    const [roleName, setRoleName] = useState('');
    const navigate = useNavigate();
    const [permissions, setPermissions] = useState({
        clients_permissions: { view_global: false, create: false, edit: false, delete: false },
        projects_permissions: { view_global: false, create: false, edit: false, delete: false },
        report_permissions: { view_global: false, view_time_sheets: false },
        staff_role_permissions: { view_global: false, create: false, edit: false, delete: false },
        settings_permissions: { view_global: false, view_time_sheets: false },
        staff_permissions: { view_global: false, create: false, edit: false, delete: false },
        task_permissions: { view_global: false, create: false, edit: false, delete: false },
        sub_task_permissions: { view_global: false, create: false, edit: false, delete: false },
        chat_module_permissions: { grant_access: false },
        ai_permissions: { grant_access: false }
    });
    const [isLoading, setIsLoading] = useState(false);


    // Handler for role name input change
    const handleRoleNameChange = (e) => {
        setRoleName(e.target.value);
    };

    // Handler for permissions change
    const handlePermissionChange = (section, permission) => {
        setPermissions(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [permission]: !prev[section][permission]
            }
        }));
    };
    useEffect(() => {
        console.log(permissions);
    }, [permissions]);

    // Submit role function
    async function submitRole() {
        try { 
            setIsLoading(true);
            const formattedRole = {
                roleName, // the role name string
                permissions: { ...permissions } // correctly formatted permissions object
            };

            const response = await fetch(baseUrl + "role", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formattedRole) // send the formatted data
            });

            console.log(response);

            const result = await response.json();
            console.log(result);
            if (response.status === 200) {
                console.log(result);
                openToast(result.message || "Role successfully added");
                navigate("/role-detail")
            } else {
                openToast(result.message || "An Error Occured");
            }
        }
        catch (error) {
            console.log("error:", error);
        }
        finally {
            setIsLoading(false);
        }
    }

        return (
            <div className='addnewrole pl-[10px] w-[100%] pr-2 mb-3 pb-4'>
                <h2 className=' text-[#27004a] font-medium text-[18px]'>Add New Role</h2>

                <div className='w-[100%]'>
                    <div className='bg-[#fff] w-[100%] set-shadow p-3 lg:w-[50%] xl:w-[50%] md:w-[50%] mt-2 rounded-md'>
                        <label>Role Name</label><br />
                        <input
                            type='text'
                            className='mt-2 border border-1 pl-3 h-[43px] pr-7 rounded-md focus:outline-none w-[100%] text-[15px] text-[#aeabab]'
                            value={roleName}
                            onChange={handleRoleNameChange}
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
                                    <td className='p-3 text-[16px] border-r-[1px] text-[#64748b] font-normal'>Clients</td>
                                    <td className='p-3'>
                                        <input
                                            type="checkbox"
                                            className='cursor-pointer'
                                            checked={permissions.clients_permissions.view_global}
                                            onChange={() => handlePermissionChange('clients_permissions', 'view_global')}
                                        />
                                        <label className='ml-3 text-[14px] cursor-pointer text-[#64748b]'>View Global</label><br />

                                        <input
                                            type="checkbox"
                                            className='cursor-pointer'
                                            checked={permissions.clients_permissions.create}
                                            onChange={() => handlePermissionChange('clients_permissions', 'create')}
                                        />
                                        <label className='ml-2 cursor-pointer text-[14px] text-[#64748b]'>Create</label><br />

                                        <input
                                            type="checkbox"
                                            className='cursor-pointer'
                                            checked={permissions.clients_permissions.edit}
                                            onChange={() => handlePermissionChange('clients_permissions', 'edit')}
                                        />
                                        <label className='ml-3 cursor-pointer text-[14px] text-[#64748b]'>Edit</label><br />

                                        <input
                                            type="checkbox"
                                            className='cursor-pointer'
                                            checked={permissions.clients_permissions.delete}
                                            onChange={() => handlePermissionChange('clients_permissions', 'delete')}
                                        />
                                        <label className='ml-3 cursor-pointer text-[14px] text-[#64748b]'>Delete</label><br /><br />
                                    </td>
                                </tr>

                                {/* Projects Section */}
                                <tr className='border border-1'>
                                    <td className='p-3 text-[16px] border-r-[1px] text-[#64748b] font-normal'>Projects</td>
                                    <td className='p-3'>
                                        <input
                                            type="checkbox"
                                            className='cursor-pointer'
                                            checked={permissions.projects_permissions.view_global}
                                            onChange={() => handlePermissionChange('projects_permissions', 'view_global')}
                                        />
                                        <label className='ml-3 text-[14px] cursor-pointer text-[#64748b]'>View Global</label><br />

                                        <input
                                            type="checkbox"
                                            className='cursor-pointer'
                                            checked={permissions.projects_permissions.create}
                                            onChange={() => handlePermissionChange('projects_permissions', 'create')}
                                        />
                                        <label className='ml-2 cursor-pointer text-[14px] text-[#64748b]'>Create</label><br />

                                        <input
                                            type="checkbox"
                                            className='cursor-pointer'
                                            checked={permissions.projects_permissions.edit}
                                            onChange={() => handlePermissionChange('projects_permissions', 'edit')}
                                        />
                                        <label className='ml-3 cursor-pointer text-[14px] text-[#64748b]'>Edit</label><br />

                                        <input
                                            type="checkbox"
                                            className='cursor-pointer'
                                            checked={permissions.projects_permissions.delete}
                                            onChange={() => handlePermissionChange('projects_permissions', 'delete')}
                                        />
                                        <label className='ml-3 cursor-pointer text-[14px] text-[#64748b]'>Delete</label><br /><br />
                                    </td>
                                </tr>

                                {/* Report Section */}
                                <tr className='border border-1'>
                                    <td className='p-3 text-[16px] border-r-[1px] text-[#64748b] font-normal'>Report</td>
                                    <td className='p-3'>
                                        <input
                                            type="checkbox"
                                            className='cursor-pointer'
                                            checked={permissions.report_permissions.view_global}
                                            onChange={() => handlePermissionChange('report_permissions', 'view_global')}
                                        />
                                        <label className='ml-3 text-[14px] cursor-pointer text-[#64748b]'>View Global</label><br />

                                        <input
                                            type="checkbox"
                                            className='cursor-pointer'
                                            checked={permissions.report_permissions.view_time_sheets}
                                            onChange={() => handlePermissionChange('report_permissions', 'view_time_sheets')}
                                        />
                                        <label className='ml-2 cursor-pointer text-[14px] text-[#64748b]'>View Timesheets Report</label><br /><br />
                                    </td>
                                </tr>

                                {/* Setting Section */}
                                <tr className='border border-1'>
                                    <td className='p-3 text-[16px] border-r-[1px] text-[#64748b] font-normal'>Setting</td>
                                    <td className='p-3'>
                                        <input
                                            type="checkbox"
                                            className='cursor-pointer'
                                            checked={permissions.settings_permissions.view_global}
                                            onChange={() => handlePermissionChange('settings_permissions', 'view_global')}
                                        />
                                        <label className='ml-3 text-[14px] cursor-pointer text-[#64748b]'>View Global</label><br />

                                        <input
                                            type="checkbox"
                                            className='cursor-pointer'
                                            checked={permissions.settings_permissions.view_time_sheets}
                                            onChange={() => handlePermissionChange('settings_permissions', 'view_time_sheets')}
                                        />
                                        <label className='ml-2 cursor-pointer text-[14px] text-[#64748b]'>View Timesheets Report</label><br /><br />
                                    </td>
                                </tr>

                                {/* Staff Role Section */}
                                <tr className='border border-1'>
                                    <td className='p-3 text-[16px] border-r-[1px] text-[#64748b] font-normal'>Staff Role</td>
                                    <td className='p-3'>
                                        <input
                                            type="checkbox"
                                            className='cursor-pointer'
                                            checked={permissions.staff_role_permissions.view_global}
                                            onChange={() => handlePermissionChange('staff_role_permissions', 'view_global')}
                                        />
                                        <label className='ml-3 text-[14px] cursor-pointer text-[#64748b]'>View Global</label><br />

                                        <input
                                            type="checkbox"
                                            className='cursor-pointer'
                                            checked={permissions.staff_role_permissions.create}
                                            onChange={() => handlePermissionChange('staff_role_permissions', 'create')}
                                        />
                                        <label className='ml-2 cursor-pointer text-[14px] text-[#64748b]'>Create</label><br />

                                        <input
                                            type="checkbox"
                                            className='cursor-pointer'
                                            checked={permissions.staff_role_permissions.edit}
                                            onChange={() => handlePermissionChange('staff_role_permissions', 'edit')}
                                        />
                                        <label className='ml-3 cursor-pointer text-[14px] text-[#64748b]'>Edit</label><br />

                                        <input
                                            type="checkbox"
                                            className='cursor-pointer'
                                            checked={permissions.staff_role_permissions.delete}
                                            onChange={() => handlePermissionChange('staff_role_permissions', 'delete')}
                                        />
                                        <label className='ml-3 cursor-pointer text-[14px] text-[#64748b]'>Delete</label><br /><br />
                                    </td>
                                </tr>

                                {/* Staff  Section */}
                                <tr className='border border-1'>
                                    <td className='p-3 text-[16px] border-r-[1px] text-[#64748b] font-normal'>Staff </td>
                                    <td className='p-3'>
                                        <input
                                            type="checkbox"
                                            className='cursor-pointer'
                                            checked={permissions.staff_permissions.view_global}
                                            onChange={() => handlePermissionChange('staff_permissions', 'view_global')}
                                        />
                                        <label className='ml-3 text-[14px] cursor-pointer text-[#64748b]'>View Global</label><br />

                                        <input
                                            type="checkbox"
                                            className='cursor-pointer'
                                            checked={permissions.staff_permissions.create}
                                            onChange={() => handlePermissionChange('staff_permissions', 'create')}
                                        />
                                        <label className='ml-2 cursor-pointer text-[14px] text-[#64748b]'>Create</label><br />

                                        <input
                                            type="checkbox"
                                            className='cursor-pointer'
                                            checked={permissions.staff_permissions.edit}
                                            onChange={() => handlePermissionChange('staff_permissions', 'edit')}
                                        />
                                        <label className='ml-3 cursor-pointer text-[14px] text-[#64748b]'>Edit</label><br />

                                        <input
                                            type="checkbox"
                                            className='cursor-pointer'
                                            checked={permissions.staff_permissions.delete}
                                            onChange={() => handlePermissionChange('staff_permissions', 'delete')}
                                        />
                                        <label className='ml-3 cursor-pointer text-[14px] text-[#64748b]'>Delete</label><br /><br />
                                    </td>
                                </tr>

                                {/* Task  Section */}
                                <tr className='border border-1'>
                                    <td className='p-3 text-[16px] border-r-[1px] text-[#64748b] font-normal'>Task </td>
                                    <td className='p-3'>
                                        <input
                                            type="checkbox"
                                            className='cursor-pointer'
                                            checked={permissions.task_permissions.view_global}
                                            onChange={() => handlePermissionChange('task_permissions', 'view_global')}
                                        />
                                        <label className='ml-3 text-[14px] cursor-pointer text-[#64748b]'>View Global</label><br />

                                        <input
                                            type="checkbox"
                                            className='cursor-pointer'
                                            checked={permissions.task_permissions.create}
                                            onChange={() => handlePermissionChange('task_permissions', 'create')}
                                        />
                                        <label className='ml-2 cursor-pointer text-[14px] text-[#64748b]'>Create</label><br />

                                        <input
                                            type="checkbox"
                                            className='cursor-pointer'
                                            checked={permissions.task_permissions.edit}
                                            onChange={() => handlePermissionChange('task_permissions', 'edit')}
                                        />
                                        <label className='ml-3 cursor-pointer text-[14px] text-[#64748b]'>Edit</label><br />

                                        <input
                                            type="checkbox"
                                            className='cursor-pointer'
                                            checked={permissions.task_permissions.delete}
                                            onChange={() => handlePermissionChange('task_permissions', 'delete')}
                                        />
                                        <label className='ml-3 cursor-pointer text-[14px] text-[#64748b]'>Delete</label><br /><br />
                                    </td>
                                </tr>

                                {/* Sub Task  Section */}
                                <tr className='border border-1'>
                                    <td className='p-3 text-[16px] border-r-[1px] text-[#64748b] font-normal'>Sub Task </td>
                                    <td className='p-3'>
                                        <input
                                            type="checkbox"
                                            className='cursor-pointer'
                                            checked={permissions.sub_task_permissions.view_global}
                                            onChange={() => handlePermissionChange('sub_task_permissions', 'view_global')}
                                        />
                                        <label className='ml-3 text-[14px] cursor-pointer text-[#64748b]'>View Global</label><br />

                                        <input
                                            type="checkbox"
                                            className='cursor-pointer'
                                            checked={permissions.sub_task_permissions.create}
                                            onChange={() => handlePermissionChange('sub_task_permissions', 'create')}
                                        />
                                        <label className='ml-2 cursor-pointer text-[14px] text-[#64748b]'>Create</label><br />

                                        <input
                                            type="checkbox"
                                            className='cursor-pointer'
                                            checked={permissions.sub_task_permissions.edit}
                                            onChange={() => handlePermissionChange('sub_task_permissions', 'edit')}
                                        />
                                        <label className='ml-3 cursor-pointer text-[14px] text-[#64748b]'>Edit</label><br />

                                        <input
                                            type="checkbox"
                                            className='cursor-pointer'
                                            checked={permissions.sub_task_permissions.delete}
                                            onChange={() => handlePermissionChange('sub_task_permissions', 'delete')}
                                        />
                                        <label className='ml-3 cursor-pointer text-[14px] text-[#64748b]'>Delete</label><br /><br />
                                    </td>
                                </tr>

                                {/* Chat Module Section */}
                                <tr className='border border-1'>
                                    <td className='p-3 text-[16px] border-r-[1px] text-[#64748b] font-normal'>Chat Module</td>
                                    <td className='p-3'>
                                        <input
                                            type="checkbox"
                                            className='cursor-pointer'
                                            checked={permissions.chat_module_permissions.grant_access}
                                            onChange={() => handlePermissionChange('chat_module_permissions', 'grant_access')}
                                        />
                                        <label className='ml-3 text-[14px] cursor-pointer text-[#64748b]'>Grant Access</label><br />
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className='text-end mt-3 flex gap-[10px] justify-end'>
                            <Link to="/role-detail" className='first-btn  flex items-center pt-2 py-2 pl-5 pr-5 rounded-md text-white hover:bg-[#7526d1]'>
                                Cancel
                            </Link>
                            <button className={`second-btn pt-2 py-2 pl-5 pr-5 rounded-md text-white hover:bg-[#7526d1] ${isLoading==true ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={submitRole}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    export default AddNewRole;
