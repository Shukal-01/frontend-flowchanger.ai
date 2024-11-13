import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../../Context/GlobalContext';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';

const PersonalDetail = () => {

    const { baseUrl, selectedStaff } = useGlobalContext();

    const { id } = useParams();
    console.log(id)
    const formatDate = (date) => {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    };

    const [basicDetail, setBasicDetail] = useState({
        name: "", // or a default value
        job_title: "",
        branch: "",
        mobile: "",
        login_otp: "",
        gender: "",
        official_email: "",
        date_of_joining: "",
        date_of_birth: "",
        current_address: "",
        permanent_address: "",
        emergency_contact_name: "",
        emergency_contact_mobile: "",
        emergency_contact_relation: "",
        emergency_contact_address: "",
    });
    useEffect(() => {
        console.log(selectedStaff)
    }, [])

    const [isEditable, setIsEditable] = useState(false);
    const handleEditClick = () => {
        setIsEditable(!isEditable);
    };

    const [inputValue, setInputValue] = useState("--");
    const handleInputChange = (e) => {
        setInputValue(e.target.value); // Update the value of input field
    };



    const [isEditable6, setIsEditable6] = useState(false);
    const handleEditClick2 = () => {
        setIsEditable6(!isEditable6);
    }

    const [isEditable7, setIsEditable7] = useState(false);
    const handleEditClick3 = () => {
        setIsEditable7(!isEditable7);
    }



    return (
        <div className='w-full p-[20px] pt-[80px] xl:p-[40px] relative xl:pt-[60px]    xl:pl-[320px] flex flex-col set-z  '>
            <div className='flex justify-between items-center  w-[100%] p-[20px]  pr-0 xl:pr-[0px] pl-[0] top-0 bg-white'>
                <h3 className='font-medium'>Personal Details</h3>
            </div>

            <h2 className='bg-[#f6f9fa] pt-[10px] pb-[10px] pl-[14px] rounded-md font-normal shadow'>Basic Details</h2>
            <form className=' w-[100%] xl:w-[100%] m-auto mt-[30px] shadow-md  xl:p-[24px] p-[12px] border rounded-md  border-1' >
                <div className='flex w-[100%] gap-[10px] justify-between  xl:mb-4 mb-[6px] xl:flex-row flex-col'>
                    <div className='w-[100%] xl:w-[48%] 2xl:w-[48%]  '>
                        <label className='text-[14px]'>Name</label><br />
                        <input type='text' defaultValue={selectedStaff?.name}
                            placeholder='Enter Name'
                            className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] 	  placeholder:font-font-normal text-[14px]'
                            readOnly={!isEditable} // Input readOnly rahega jab tak isEditable false hai
                            style={{
                                backgroundColor: isEditable ? "#f4f5f9" : "#fff", // Background color bhi change hoga
                                border: isEditable ? "1px solid #F4F5F9" : '#000'
                            }}
                        />
                    </div>

                    <div className='w-[100%]  xl:w-[48%] 2xl:w-[48%] '>
                        <label className='text-[14px]'>Mobile</label><br />
                        <input type='number' defaultValue={selectedStaff?.mobile}
                            placeholder='Enter Mobile ' className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'
                            readOnly={!isEditable} // Input readOnly rahega jab tak isEditable false hai
                            style={{
                                backgroundColor: isEditable ? "#f4f5f9" : "#fff", // Background color bhi change hoga
                                border: isEditable ? "1px solid #F4F5F9" : '#000'
                            }}

                        />

                    </div>




                </div>

                <div className='flex w-[100%] gap-[10px] justify-between  xl:mb-4 mb-[6px] xl:flex-row flex-col'>
                    <div className='w-[100%] xl:w-[48%] 2xl:w-[48%]  '>
                        <label className='text-[14px]'>Personal Email ID</label><br />
                        <input type='email' defaultValue={selectedStaff?.official_email}
                            placeholder='Enter Name' className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] 	  placeholder:font-font-normal text-[14px]'
                            readOnly={!isEditable} // Input readOnly rahega jab tak isEditable false hai
                            style={{
                                backgroundColor: isEditable ? "#f4f5f9" : "#fff", // Background color bhi change hoga
                                border: isEditable ? "1px solid #F4F5F9" : '#000'
                            }}
                        />
                    </div>

                    <div className='w-[100%]  xl:w-[48%] 2xl:w-[48%] '>
                        <label className='text-[14px]'>DOB</label><br />
                        <input
                            type='date'
                            placeholder='Enter Mobile'
                            defaultValue={selectedStaff?.date_of_birth ? formatDate(selectedStaff.date_of_birth) : ''}
                            className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'
                            readOnly={!isEditable} // Input readOnly rahega jab tak isEditable false hai
                            style={{
                                backgroundColor: isEditable ? "#f4f5f9" : "#fff", // Background color bhi change hoga
                                border: isEditable ? "1px solid #F4F5F9" : '#000'
                            }}

                        />
                    </div>





                </div>



                <div className='flex xl:flex-row flex-col w-[100%] gap-[10px] justify-between mb-[10px] '>
                    <div className='w-[100%]  xl:w-[48%] 2xl:w-[48%]'>
                        <label className='text-[14px]'>Gender</label><br />
                        <select
                            defaultValue={selectedStaff?.gender}
                            className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'
                            style={{
                                backgroundColor: isEditable ? "#f4f5f9" : "#fff", // Background color bhi change hoga
                                border: isEditable ? "1px solid #F4F5F9" : '1px solid #F4F5F9'
                            }}

                        >
                            <option value={"Male"}>Male</option>
                            <option value={"Female"}>Female</option>
                            <option value={"Other"}>Others</option>

                        </select>
                    </div>

                    <div className='w-[100%]  xl:w-[48%] 2xl:w-[48%] '>
                        <label className='text-[14px]'>Maritial Status</label><br />
                        <select
                            className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'
                            style={{
                                backgroundColor: isEditable ? "#f4f5f9" : "#fff", // Background color bhi change hoga
                                border: isEditable ? "1px solid #F4F5F9" : '1px solid #F4F5F9'
                            }}

                        >
                            <option>Married</option>
                            <option>Unmarried</option>

                        </select>
                    </div>


                </div>

                <div className='flex xl:flex-row flex-col w-[100%] gap-[10px] justify-between mb-[10px] '>
                    <div className='w-[100%]  xl:w-[48%] 2xl:w-[48%]'>
                        <label className='text-[14px]'>Blood Group</label><br />
                        <select
                            className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'
                            style={{
                                backgroundColor: isEditable ? "#f4f5f9" : "#fff", // Background color bhi change hoga
                                border: isEditable ? "1px solid #F4F5F9" : '1px solid #F4F5F9'
                            }}

                        >
                            <option>A+</option>
                            <option>A+</option>
                            <option>A+</option>
                            <option>A+</option>
                            <option>A+</option>
                            <option>A+</option>
                            <option>A+</option>
                        </select>
                    </div>
                    <div className='w-[100%]  xl:w-[48%] 2xl:w-[48%] '>
                        <label className='text-[14px]'>Guardian's Name                        </label><br />
                        <input type='text'
                            defaultValue={selectedStaff?.guardian_name ? selectedStaff?.guardian_name : ""} placeholder='Guardian s Name ' className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'
                            readOnly={!isEditable} // Input readOnly rahega jab tak isEditable false hai
                            style={{
                                backgroundColor: isEditable ? "#f4f5f9" : "#fff", // Background color bhi change hoga
                                border: isEditable ? "1px solid #F4F5F9" : '#000'
                            }}

                        />
                    </div>


                </div>


                <div className='flex xl:flex-row flex-col w-[100%] gap-[10px] justify-between mb-[10px] '>
                    <div className='w-[100%]  xl:w-[48%] 2xl:w-[48%]'>
                        <label className='text-[14px]'>Emergency Contact Name                        </label><br />
                        <input type='text'
                            defaultValue={selectedStaff?.emergency_contact_name} placeholder='Contact Name' className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'
                            readOnly={!isEditable} // Input readOnly rahega jab tak isEditable false hai
                            style={{
                                backgroundColor: isEditable ? "#f4f5f9" : "#fff", // Background color bhi change hoga
                                border: isEditable ? "1px solid #F4F5F9" : '#000'
                            }}

                        />

                    </div>

                    <div className='w-[100%]  xl:w-[48%] 2xl:w-[48%] '>
                        <label className='text-[14px]'>Emergency Contact Mobile Number                        </label><br />
                        <input type='number'
                            defaultValue={selectedStaff?.emergency_contact_mobile} placeholder='Enter Number' className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'
                            readOnly={!isEditable} // Input readOnly rahega jab tak isEditable false hai
                            style={{
                                backgroundColor: isEditable ? "#f4f5f9" : "#fff", // Background color bhi change hoga
                                border: isEditable ? "1px solid #F4F5F9" : '#000'
                            }}

                        />

                    </div>


                </div>

                <div className='flex xl:flex-row flex-col w-[100%] gap-[10px] justify-between mb-[10px] '>
                    <div className='w-[100%]  xl:w-[48%] 2xl:w-[48%]'>
                        <label className='text-[14px]'>Emergency Contact Relationship
                        </label><br />
                        <input type='email'
                            defaultValue={selectedStaff?.emergency_contact_relation} className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'
                            readOnly={!isEditable} // Input readOnly rahega jab tak isEditable false hai
                            style={{
                                backgroundColor: isEditable ? "#f4f5f9" : "#fff", // Background color bhi change hoga
                                border: isEditable ? "1px solid #F4F5F9" : '#000'
                            }}

                        />

                    </div>




                </div>

                <div className='w-[100%]  xl:w-[100%] 2xl:w-[100%]'>
                    <label className='text-[14px]'>Emergency Contact Address
                    </label><br />
                    <textarea type='text' rows="2"
                        defaultValue={selectedStaff?.emergency_contact_address} className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'
                        readOnly={!isEditable} // Input readOnly rahega jab tak isEditable false hai
                        style={{
                            backgroundColor: isEditable ? "#f4f5f9" : "#fff", // Background color bhi change hoga
                            border: isEditable ? "1px solid #F4F5F9" : '#000'
                        }}

                    />


                </div>



                <div className='flex justify-end mt-4 p-3'>

                    <div className='flex gap-[20px] items-center '>
                        <button type='button' className='second-btn' onClick={handleEditClick}>
                            {isEditable ? "Save" : "Edit"}
                        </button>

                    </div>

                </div>

            </form>



            <h2 className='bg-[#f6f9fa] pt-[10px] pb-[10px] pl-[14px] rounded-md font-normal shadow mt-7'>Government IDs
            </h2>
            <form className=' w-[100%] xl:w-[100%] m-auto mt-[30px] shadow-md  xl:p-[24px] p-[12px] border rounded-md  border-1' >
                <div className='flex w-[100%] gap-[10px] justify-between  xl:mb-4 mb-[6px] xl:flex-row flex-col'>
                    <div className='w-[100%] xl:w-[48%] 2xl:w-[48%]  '>
                        <label className='text-[14px]'>Aadhaar</label><br />
                        <input type='number'
                            defaultValue={selectedStaff?.staff_bg_verification?.aadhaar_number || ""} placeholder='Enter Aadhaar Number' className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] 	  placeholder:font-font-normal text-[14px]'
                            readOnly={!isEditable6} // Input readOnly rahega jab tak isEditable false hai
                            style={{
                                backgroundColor: isEditable6 ? "#f4f5f9" : "#fff", // Background color bhi change hoga
                                border: isEditable6 ? "1px solid #F4F5F9" : '#000'
                            }}

                        />
                    </div>

                    <div className='w-[100%]  xl:w-[48%] 2xl:w-[48%] '>
                        <label className='text-[14px]'>PAN</label><br />
                        <input type='text'
                            defaultValue={selectedStaff?.staff_bg_verification?.pan_number} placeholder='Enter PAN Number ' className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'
                            readOnly={!isEditable6} // Input readOnly rahega jab tak isEditable false hai
                            style={{
                                backgroundColor: isEditable6 ? "#f4f5f9" : "#fff", // Background color bhi change hoga
                                border: isEditable6 ? "1px solid #F4F5F9" : '#000'
                            }}

                        />
                    </div>




                </div>

                <div className='flex w-[100%] gap-[10px] justify-between  xl:mb-4 mb-[6px] xl:flex-row flex-col'>
                    <div className='w-[100%] xl:w-[48%] 2xl:w-[48%]  '>
                        <label className='text-[14px]'>Driving License
                        </label><br />
                        <input type='text'
                            defaultValue={selectedStaff?.staff_bg_verification?.driving_license_number} placeholder='Enter  License Number' className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] 	  placeholder:font-font-normal text-[14px]'
                            readOnly={!isEditable6} // Input readOnly rahega jab tak isEditable false hai
                            style={{
                                backgroundColor: isEditable6 ? "#f4f5f9" : "#fff", // Background color bhi change hoga
                                border: isEditable6 ? "1px solid #F4F5F9" : '#000'
                            }}

                        />
                    </div>

                    <div className='w-[100%]  xl:w-[48%] 2xl:w-[48%] '>
                        <label className='text-[14px]'>Voter ID
                        </label><br />
                        <input type='text'
                            defaultValue={selectedStaff?.staff_bg_verification?.voter_id} placeholder='Enter Voter ID ' className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'
                            readOnly={!isEditable6} // Input readOnly rahega jab tak isEditable false hai
                            style={{
                                backgroundColor: isEditable6 ? "#f4f5f9" : "#fff", // Background color bhi change hoga
                                border: isEditable6 ? "1px solid #F4F5F9" : '#000'
                            }}

                        />
                    </div>




                </div>



                <div className='flex xl:flex-row flex-col w-[100%] gap-[10px] justify-between mb-[10px] '>
                    <div className='w-[100%]  xl:w-[48%] 2xl:w-[48%]'>
                        <label className='text-[14px]'>UAN</label><br />
                        <input type='text'
                            defaultValue={selectedStaff?.staff_bg_verification?.uan_number} placeholder='Enter UAN Number' className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'
                            readOnly={!isEditable6} // Input readOnly rahega jab tak isEditable false hai
                            style={{
                                backgroundColor: isEditable6 ? "#f4f5f9" : "#fff", // Background color bhi change hoga
                                border: isEditable6 ? "1px solid #F4F5F9" : '#000'
                            }}

                        />

                    </div>




                </div>


                <div className='flex justify-end mt-4 p-3'>

                    <div className='flex gap-[20px] items-center '>
                        <button type='button' className='second-btn' onClick={handleEditClick2}>
                            {isEditable6 ? "Save" : "Edit"}
                        </button>

                    </div>

                </div>




            </form>

            <h2 className='bg-[#f6f9fa] pt-[10px] pb-[10px] pl-[14px] rounded-md font-normal shadow mt-7'>Address Details
            </h2>
            <form className=' w-[100%] xl:w-[100%] m-auto mt-[30px] shadow-md  xl:p-[24px] p-[12px] border rounded-md  border-1' >
                <div className='flex w-[100%] gap-[10px] justify-between  xl:mb-4 mb-[6px] xl:flex-row flex-col'>
                    <div className='w-[100%] xl:w-[48%] 2xl:w-[48%]  '>
                        <label className='text-[14px]'>Current Address
                        </label><br />
                        <textarea type='text'
                            defaultValue={selectedStaff?.staff_bg_verification?.current_address} rows="2" className=' rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'
                            readOnly={!isEditable7} // Input readOnly rahega jab tak isEditable false hai
                            style={{
                                backgroundColor: isEditable7 ? "#f4f5f9" : "#fff", // Background color bhi change hoga
                                border: isEditable7 ? "1px solid #F4F5F9" : "1px solid #F4F5F9"
                            }}

                        />
                    </div>

                    <div className='w-[100%]  xl:w-[48%] 2xl:w-[48%] '>
                        <label className='text-[14px]'>Permanent Address
                        </label><br />
                        <textarea type='text' rows="2"
                            defaultValue={selectedStaff?.staff_bg_verification?.permanent_address} className=' rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'
                            readOnly={!isEditable7} // Input readOnly rahega jab tak isEditable false hai
                            style={{
                                backgroundColor: isEditable7 ? "#f4f5f9" : "#fff", // Background color bhi change hoga
                                border: isEditable7 ? "1px solid #F4F5F9" : '1px solid #F4F5F9'
                            }}

                        />
                    </div>




                </div>

                <div className='flex justify-end mt-4 p-3'>

                    <div className='flex gap-[20px] items-center '>
                        <button type='button' className='second-btn' onClick={handleEditClick3}>
                            {isEditable7 ? "Save" : "Edit"}
                        </button>

                    </div>

                </div>







            </form>

        </div>
    )
}

export default PersonalDetail