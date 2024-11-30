import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../../Context/GlobalContext';

const EmployementDetail = () => {


    const [allRoles, setAllRoles] = useState([]);
    const [allDepartments, setAllDepartments] = useState([]);
    const { baseUrl, selectedStaff, openToast } = useGlobalContext();

    const [branch, setBranch] = useState("");
    const [department, setDepartment] = useState("");
    const [role, setRole] = useState("");
    const [departmentID, setDepartmentID] = useState("");
    const [roleID, setRoleID] = useState("");
    const [dateOfJoining, setDateOfJoining] = useState("");
    const [dateOfLeaving, setDateOfLeaving] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [employmentID, setEmploymentID] = useState("");
    const [email, setEmail] = useState("");
    const [esiNumber, setESINumber] = useState("");
    const [pfNumber, setPFNumber] = useState("");
    // console.log(branch, department, employmentID, role, dateOfJoining, dateOfLeaving, jobTitle, email, esiNumber, pfNumber);

    const fetchDepartments = async () => {
        try {
            const result = await fetch(baseUrl + "department");
            if (result.status == 200) {
                const res = await result.json();
                setAllDepartments(res.data);
            } else {
                alert("An error occurred while fetching departments");
            }
        } catch (error) {
            console.error("Error fetching departments:", error);
            alert("An error occurred while fetching departments");
        }
    };

    const fetchRoles = async () => {
        try {
            const result = await fetch(baseUrl + "role");
            if (result.status == 200) {
                const res = await result.json();
                setAllRoles(res.data);
            } else {
                alert("An error occurred while fetching roles");
            }
            console.log("result", result);
        } catch (error) {
            console.error("Error fetching roles:", error);
            alert("An error occurred while fetching roles");
        }
    };

    useEffect(() => {
        fetchDepartments();
        fetchRoles();
    }, []);

    async function handlesubmit(e) {
        e.preventDefault();
        const data = {};

        if (jobTitle !== "") data.job_title = jobTitle;
        if (roleID !== "") data.roleID = roleID;
        if (departmentID !== "") data.departmentID = departmentID;
        if (email !== "") data.official_email = email;
        if (dateOfJoining !== "") data.date_of_joining = dateOfJoining;

        try {
            const response = await fetch(baseUrl + "staff/" + selectedStaff.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (response.status === 200) {
                console.log(result);
                openToast("Employment Details Updated Successfully", "success");
            }
            else {
                openToast("An error occurred while updating employment details", "error");
            }
        } catch (error) {
            console.error("Error updating employment details:", error);
            openToast("An error occurred while updating employment details", "error");
        }
    }

    console.log(departmentID, roleID);

    return (
        // <div className='w-full p-[20px] pt-[80px] xl:p-[40px] relative xl:pt-[60px]    xl:pl-[320px] flex flex-col '>
        <>

            <div className='flex justify-between items-center px-[30px] w-[100%] p-[20px] xl:pr-0 pr-0  pl-[0] top-0 bg-white'>
                <h3 className='font-medium ml-3'>Employment Details
                </h3>
                <button onClick={(e) => handlesubmit(e)} className='second-btn'>Update Details</button>
            </div>

            <h2 className='bg-[#fff]  pt-[10px] pb-[10px] pl-[14px] rounded-lg font-normal shadow-cs'>Current Employment</h2>
            <form className=' w-[100%] xl:w-[100%] m-auto mt-[30px] shadow-md  xl:p-[24px] p-[12px] border rounded-md  border-1' >

                <div className='flex xl:flex-row flex-col w-[100%] gap-[10px] justify-between mb-[10px] '>
                    <div className='w-[100%]  xl:w-[48%] 2xl:w-[48%]'>
                        <label className='text-[14px]'>Branches</label><br />
                        <select value={branch} onChange={(e) => {
                            setBranch(e.target.value)
                        }} className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'>
                            <option value="First">First</option>
                            <option value={"Second"}>Second</option>
                            <option value={"Third"}>Third</option>

                        </select>
                    </div>

                    <div className='w-[100%]  xl:w-[48%] 2xl:w-[48%] '>
                        <label className='text-[14px]'>Departments</label><br />
                        <select value={departmentID} onChange={(e) => {
                            const selectedDepartment = allDepartments.find(
                                (dept) => dept.id === e.target.value
                            );
                            if (selectedDepartment) {
                                setDepartment(selectedDepartment.department_name);
                                setDepartmentID(selectedDepartment.id);
                            }

                        }} className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'>
                            {allDepartments.map((departmentValue) => (
                                <option key={departmentValue.id} value={departmentValue.id}>
                                    {departmentValue.department_name}
                                </option>
                            ))}

                        </select>
                    </div>


                </div>

                <div className='flex xl:flex-row flex-col w-[100%] gap-[10px] justify-between mb-[10px] '>
                    <div className='w-[100%]  xl:w-[48%] 2xl:w-[48%]'>
                        <label className='text-[14px]'>Roles</label><br />
                        <select value={roleID} onChange={(e) => {
                            const selectedRole = allRoles.find(
                                (role) => role.id === e.target.value
                            );
                            if (selectedRole) {
                                setRole(selectedRole.role_name);
                                setRoleID(selectedRole.id);
                            }
                        }} className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'>
                            {allRoles.map((roleValue) => (
                                <option key={roleValue.id} value={roleValue.id}>
                                    {roleValue.role_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='w-[100%]  xl:w-[48%] 2xl:w-[48%] '>
                        <label className='text-[14px]'>Employee Type</label><br />
                        <select className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'>
                            <option>Option11</option>
                            <option>Option22</option>
                        </select>
                    </div>


                </div>

                <div className='flex w-[100%] gap-[10px] justify-between  xl:mb-4 mb-[6px] xl:flex-row flex-col'>


                    <div className='w-[100%]  xl:w-[48%] 2xl:w-[48%] '>
                        <label className='text-[14px]'>Date of Joining</label><br />
                        <input value={dateOfJoining} onChange={(e) => {
                            setDateOfJoining(e.target.value)
                        }} type='date' placeholder='Enter Mobile ' className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' />
                    </div>

                    <div className='w-[100%]  xl:w-[48%] 2xl:w-[48%] '>
                        <label className='text-[14px]'>Date of Leaving</label><br />
                        <input value={dateOfLeaving} onChange={(e) => {
                            setDateOfLeaving(e.target.value)
                        }} type='date' placeholder='Enter Mobile ' className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' />
                    </div>



                </div>





                <div className='flex xl:flex-row flex-col w-[100%] gap-[10px] justify-between mb-[10px] '>

                    <div className='w-[100%]  xl:w-[48%] 2xl:w-[48%] '>
                        <label className='text-[14px]'>Employee ID        </label><br />
                        <input value={employmentID} onChange={(e) => {
                            setEmploymentID(e.target.value)
                        }} type='text' placeholder='Employee ID ' className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' />
                    </div>

                    <div className='w-[100%]  xl:w-[48%] 2xl:w-[48%] '>
                        <label className='text-[14px]'>Job Title        </label><br />
                        <input value={jobTitle} onChange={(e) => { setJobTitle(e.target.value) }} type='text' placeholder='Job Title ' className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' />
                    </div>


                </div>


                <div className='flex xl:flex-row flex-col w-[100%] gap-[10px] justify-between mb-[10px] '>
                    <div className='w-[100%]  xl:w-[48%] 2xl:w-[48%]'>
                        <label className='text-[14px]'>Official Email ID</label><br />
                        <input value={email} onChange={(e) => { setEmail(e.target.value) }} type='text' placeholder='Official Email ID' className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' />

                    </div>

                    <div className='w-[100%]  xl:w-[48%] 2xl:w-[48%] '>
                        <label className='text-[14px]'>ESI Number                        </label><br />
                        <input value={esiNumber} onChange={(e) => { setESINumber(e.target.value) }} type='number' placeholder='ESI Number' className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' />

                    </div>


                </div>

                <div className='flex xl:flex-row flex-col w-[100%] gap-[10px] justify-between mb-[10px] '>
                    <div className='w-[100%]  xl:w-[48%] 2xl:w-[48%]'>
                        <label className='text-[14px]'>PF Number
                        </label><br />
                        <input value={pfNumber} onChange={(e) => { setPFNumber(e.target.value) }} type='email' placeholder='PF Number' className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' />

                    </div>




                </div>




            </form>




        {/* // </div> */}
       </>
    )
}

export default EmployementDetail