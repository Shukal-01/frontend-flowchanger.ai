import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../../Context/GlobalContext';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';




const PersonalDetail = () => {

    const { baseUrl, selectedStaff, openToast } = useGlobalContext();
    const [isLoadingPersonalDetails, setIsLoadingPersonalDetails] = useState(false);
    const [isLoadingGovernmentIds, setIsLoadingGovernmentIds] = useState(false);

    const [personalDetailsUpdate, setPersonalDetailsUpdate] = useState({
        name: selectedStaff?.name,
        mobile: selectedStaff?.mobile,
        official_email: selectedStaff?.staffDetails?.official_email,
        date_of_birth: selectedStaff?.staffDetails?.date_of_birth,
        gender: selectedStaff?.staffDetails?.gender,
        date_of_joining: selectedStaff?.staffDetails?.date_of_joining,
        marital_status: selectedStaff?.staffDetails?.marital_status,
        guardian_name: selectedStaff?.staffDetails?.guardian_name,
        blood_group: selectedStaff?.staffDetails?.blood_group,
        emergency_contact_name: selectedStaff?.staffDetails?.emergency_contact_name,
        emergency_contact_mobile: selectedStaff?.staffDetails?.emergency_contact_mobile,
        emergency_contact_relation: selectedStaff?.staffDetails?.emergency_contact_relation,
        emergency_contact_address: selectedStaff?.staffDetails?.emergency_contact_address,
        current_address: selectedStaff?.staffDetails?.current_address,
        permanent_address: selectedStaff?.staffDetails?.permanent_address,
    });

    const [governmentIds, setGovernmentIds] = useState({
        aadhaar_number: selectedStaff?.staffDetails?.staff_bg_verification?.aadhaar_number,
        pan_number: selectedStaff?.staffDetails?.staff_bg_verification?.pan_number,
        uan_number: selectedStaff?.staffDetails?.staff_bg_verification?.uan_number,
        driving_license_number: selectedStaff?.staffDetails?.staff_bg_verification?.driving_license_number,
    });


    const updatePersonalDetails = async (e) => {
        setIsLoadingGovernmentIds(true);
        e.preventDefault();

        const data = {};

        // Add each field to the data object only if it's not an empty string
        if (personalDetailsUpdate.name) data.name = personalDetailsUpdate.name;
        if (personalDetailsUpdate.mobile) data.mobile = personalDetailsUpdate.mobile;
        if (personalDetailsUpdate.official_email) data.official_email = personalDetailsUpdate.official_email;
        if (personalDetailsUpdate.date_of_birth) data.date_of_birth = new Date(personalDetailsUpdate.date_of_birth).toISOString();
        if (personalDetailsUpdate.gender) data.gender = personalDetailsUpdate.gender;
        if (personalDetailsUpdate.guardian_name) data.guardian_name = personalDetailsUpdate.guardian_name;
        if (personalDetailsUpdate.blood_group) data.blood_group = personalDetailsUpdate.blood_group;
        if (personalDetailsUpdate.marital_status) data.marital_status = personalDetailsUpdate.marital_status;
        if (personalDetailsUpdate.emergency_contact_name) data.emergency_contact_name = personalDetailsUpdate.emergency_contact_name;
        if (personalDetailsUpdate.emergency_contact_mobile) data.emergency_contact_mobile = personalDetailsUpdate.emergency_contact_mobile;
        if (personalDetailsUpdate.emergency_contact_relation) data.emergency_contact_relation = personalDetailsUpdate.emergency_contact_relation;
        if (personalDetailsUpdate.emergency_contact_address) data.emergency_contact_address = personalDetailsUpdate.emergency_contact_address;
        if (personalDetailsUpdate.current_address) data.current_address = personalDetailsUpdate.current_address;
        if (personalDetailsUpdate.permanent_address) data.permanent_address = personalDetailsUpdate.permanent_address;

        try {
            const response = await fetch(baseUrl + "staff/" + selectedStaff?.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data) // send the formatted data
            });

            if (response.status === 200) {
                const result = await response.json();
                console.log(result);
                setPersonalDetailsUpdate({
                    name: result?.name,
                    mobile: result?.mobile,
                    official_email: result?.staffDetails?.official_email,
                    date_of_birth: result?.staffDetails?.date_of_birth,
                    gender: result?.staffDetails?.gender,
                    blood_group: result?.staffDetails?.blood_group,
                    marital_status: result?.staffDetails?.marital_status,
                    guardian_name: result?.staffDetails?.guardian_name,
                    emergency_contact_name: result?.staffDetails?.emergency_contact_name,
                    emergency_contact_mobile: result?.staffDetails?.emergency_contact_mobile,
                    emergency_contact_relation: result?.staffDetails?.emergency_contact_relation,
                    emergency_contact_address: result?.staffDetails?.emergency_contact_address,
                    current_address: result?.staffDetails?.current_address,
                    permanent_address: result?.staffDetails?.permanent_address
                })
                openToast("Personal Details updated Successfully", "success");
            }
            else {
                openToast("An error occurred while updating personal details", "error");
            }
        } catch (error) {
            console.error("Error updating personal details:", error);
            openToast("An error occurred while updating personal details", "error");
        }
        finally {
            setIsLoadingGovernmentIds(false);
        }
    };


    const { id } = useParams();
    // console.log(id)
    const formatDate = (date) => {
        if (!date) return ''; // Return an empty string if no date is provided
        const d = new Date(date);

        // Extract the date components
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        // Pad month and day with leading zeros if needed
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-'); // Format as "YYYY-MM-DD"
    };

    const getData = async (e) => {
        try {
            const response = await fetch(baseUrl + "staff/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                const result = await response.json();
                const filteredData = selectedStaff?.id
                    ? result.filter(item => item.id === selectedStaff.id) : result[0];
                setPersonalDetailsUpdate({
                    name: filteredData.name,
                    mobile: filteredData.mobile,
                    official_email: filteredData.official_email
                })
                console.log("Filtered data by ID:", filteredData);

                console.log("Data retrieved successfully:", result);
                // navigate("/admin/staff");
            } else {
                console.error("Failed to retrieve data:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("An error occurred while fetching data:", error);
        }
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
        getData();
    }, []);


    const [isEditable, setIsEditable] = useState(false);
    const handleEditClick = (e) => {
        e.preventDefault();
        if (isEditable) {
            updatePersonalDetails(e);
        }
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




    async function updateAllGovernmentIds() {
        setIsLoadingGovernmentIds(true);
        const idsToUpdate = [
            { idType: "aadhaar", value: governmentIds?.aadhaar_number },
            { idType: "pan", value: governmentIds?.pan_number },
            { idType: "driving_license", value: governmentIds?.driving_license_number },
            { idType: "uan", value: governmentIds?.uan_number }
        ];

        try {
            for (const { idType, value } of idsToUpdate) {
                if (value) {  // Only send the request if the value exists
                    const formData = new FormData();
                    formData.append(idType === "aadhaar" ? "aadhaar_number" : `${idType}_number`, value);

                    const response = await fetch(`${baseUrl}bg-verification/${selectedStaff.staffDetails.id}/verify/${idType}`, {
                        method: "PUT",
                        body: formData
                    });

                    if (response.status !== 201) {
                        throw new Error(`Failed to update ${idType}`);
                    }

                    const result = await response.json();
                    setGovernmentIds((prev) => ({
                        ...prev,
                        [`${idType}_number`]: result?.data?.[`${idType}_number`] || value,
                        [`${idType}_status`]: result?.data?.[`${idType}_verification_status`]
                    }));
                }
            }

            // Show success toast if all requests succeed
            openToast("All government IDs successfully updated", "success");
        } catch (error) {
            console.error("Error updating government IDs:", error);
            openToast("An error occurred while updating government IDs", "error");
        }
        finally {
            setIsLoadingGovernmentIds(false);
        }
    }




    return (
        <>
            {/* <div className='w-full p-[20px] pt-[80px] xl:p-[40px] relative xl:pt-[60px]    xl:pl-[320px] flex flex-col set-z  '> */}
            <div className='flex justify-between items-center  w-[100%] p-[30px] pr-0 xl:pr-[0px] pl-[0] top-0 bg-white'>
                <h3 className='font-medium '>Personal Details</h3>
            </div>

            <h2 className='bg-[#fff]  pt-[10px] pb-[10px] pl-[14px] rounded-md font-normal shadow-cs'>Basic Details</h2>
            <form className=' w-[100%] xl:w-[100%] m-auto mt-[30px] shadow-md  xl:p-[24px] p-[12px] border rounded-md  border-1' >
                <div className='flex w-[100%] gap-[10px] justify-between  xl:mb-4 mb-[6px] xl:flex-row flex-col'>
                    <div className='w-[100%] xl:w-[48%] 2xl:w-[48%]  '>
                        <label className='text-[14px]'>Name</label><br />
                        <input
                            value={personalDetailsUpdate.name}
                            onChange={(e) => setPersonalDetailsUpdate({ ...personalDetailsUpdate, name: e.target.value })} type='text' defaultValue={selectedStaff?.name}
                            placeholder='Enter Name'
                            className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] 	  placeholder:font-font-normal text-[14px]'
                            readOnly={!isEditable} // Input readOnly rahega jab tak isEditable false hai
                            style={{
                                backgroundColor: isEditable ? "#f4f5f9" : "#fff", // Background color bhi change hoga
                                border: isEditable ? "1px solid #F4F5F9" : ''
                            }}
                        />
                    </div>

                    <div className='w-[100%]  xl:w-[48%] 2xl:w-[48%] '>
                        <label className='text-[14px]'>Mobile</label><br />
                        <input
                            value={personalDetailsUpdate.mobile}
                            onChange={(e) => setPersonalDetailsUpdate({ ...personalDetailsUpdate, mobile: e.target.value })} type='number' defaultValue={selectedStaff?.mobile}
                            placeholder='Enter Mobile ' className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'
                            readOnly={!isEditable} // Input readOnly rahega jab tak isEditable false hai
                            style={{
                                backgroundColor: isEditable ? "#f4f5f9" : "#fff", // Background color bhi change hoga
                                border: isEditable ? "1px solid #F4F5F9" : ''
                            }}

                        />

                    </div>




                </div>

                <div className='flex w-[100%] gap-[10px] justify-between  xl:mb-4 mb-[6px] xl:flex-row flex-col'>
                    <div className='w-[100%] xl:w-[48%] 2xl:w-[48%]  '>
                        <label className='text-[14px]'>Personal Email ID</label><br />
                        <input value={personalDetailsUpdate.official_email}
                            onChange={(e) => setPersonalDetailsUpdate({ ...personalDetailsUpdate, official_email: e.target.value })} type='email' defaultValue={selectedStaff?.official_email}
                            placeholder='Enter Name' className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] 	  placeholder:font-font-normal text-[14px]'
                            readOnly={!isEditable} // Input readOnly rahega jab tak isEditable false hai
                            style={{
                                backgroundColor: isEditable ? "#f4f5f9" : "#fff", // Background color bhi change hoga
                                border: isEditable ? "1px solid #F4F5F9" : ''
                            }}
                        />
                    </div>

                    <div className='w-[100%]  xl:w-[48%] 2xl:w-[48%] '>
                        <label className='text-[14px]'>DOB</label><br />
                        <input
                            type='date'
                            placeholder='Enter Mobile'
                            value={formatDate(personalDetailsUpdate?.date_of_birth)}
                            onChange={(e) => {
                                console.log(e.target.value);
                                setPersonalDetailsUpdate({ ...personalDetailsUpdate, date_of_birth: e.target.value })
                            }}
                            className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'
                            readOnly={!isEditable} // Input readOnly rahega jab tak isEditable false hai
                            style={{
                                backgroundColor: isEditable ? "#f4f5f9" : "#fff", // Background color bhi change hoga
                                border: isEditable ? "1px solid #F4F5F9" : ''
                            }}

                        />
                    </div>





                </div>



                <div className='flex xl:flex-row flex-col w-[100%] gap-[10px] justify-between mb-[10px] '>
                    <div className='w-[100%]  xl:w-[48%] 2xl:w-[48%]'>
                        <label className='text-[14px]'>Gender</label><br />
                        <select
                            value={personalDetailsUpdate.gender}
                            onChange={(e) => setPersonalDetailsUpdate({ ...personalDetailsUpdate, gender: e.target.value })}
                            className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'
                            style={{
                                backgroundColor: isEditable ? "#f4f5f9" : "#fff", // Background color bhi change hoga
                                border: isEditable ? "1px solid #F4F5F9" : ''
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
                            value={personalDetailsUpdate?.marital_status}
                            onChange={(e) => setPersonalDetailsUpdate({ ...personalDetailsUpdate, marital_status: e.target.value })}
                            className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'
                            style={{
                                backgroundColor: isEditable ? "#f4f5f9" : "#fff", // Background color bhi change hoga
                                border: isEditable ? "1px solid #F4F5F9" : ''
                            }}

                        >
                            <option value={"Married"}>Married</option>
                            <option value={"Unmarried"}>Unmarried</option>

                        </select>
                    </div>


                </div>

                <div className='flex xl:flex-row flex-col w-[100%] gap-[10px] justify-between mb-[10px] '>
                    <div className='w-[100%]  xl:w-[48%] 2xl:w-[48%]'>
                        <label className='text-[14px]'>Blood Group</label><br />
                        <select value={personalDetailsUpdate?.blood_group}
                            onChange={(e) => setPersonalDetailsUpdate({ ...personalDetailsUpdate, blood_group: e.target.value })}
                            className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'
                            style={{
                                backgroundColor: isEditable ? "#f4f5f9" : "#fff", // Background color bhi change hoga
                                border: isEditable ? "1px solid #F4F5F9" : ''
                            }}

                        >
                            <option value={"A+"}>A+</option>
                            <option value={"A+"}>A+</option>
                            <option value={"A+"}>A+</option>
                            <option value={"A+"}>A+</option>
                            <option value={"A+"}>A+</option>
                            <option value={"A+"}>A+</option>
                            <option value={"A+"}>A+</option>
                        </select>
                    </div>
                    <div className='w-[100%]  xl:w-[48%] 2xl:w-[48%] '>
                        <label className='text-[14px]'>Guardian's Name                        </label><br />
                        <input type='text'
                            placeholder='Guardian s Name ' className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'
                            readOnly={!isEditable} // Input readOnly rahega jab tak isEditable false hai
                            style={{
                                backgroundColor: isEditable ? "#f4f5f9" : "#fff", // Background color bhi change hoga
                                border: isEditable ? "1px solid #F4F5F9" : ''
                            }}

                        />
                    </div>


                </div>


                <div className='flex xl:flex-row flex-col w-[100%] gap-[10px] justify-between mb-[10px] '>
                    <div className='w-[100%]  xl:w-[48%] 2xl:w-[48%]'>
                        <label className='text-[14px]'>Emergency Contact Name                        </label><br />
                        <input type='text'
                            value={personalDetailsUpdate.emergency_contact_name}
                            onChange={(e) => setPersonalDetailsUpdate({ ...personalDetailsUpdate, emergency_contact_name: e.target.value })}
                            placeholder='Contact Name' className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'
                            readOnly={!isEditable} // Input readOnly rahega jab tak isEditable false hai
                            style={{
                                backgroundColor: isEditable ? "#f4f5f9" : "#fff", // Background color bhi change hoga
                                border: isEditable ? "1px solid #F4F5F9" : ''
                            }}

                        />

                    </div>

                    <div className='w-[100%]  xl:w-[48%] 2xl:w-[48%] '>
                        <label className='text-[14px]'>Emergency Contact Mobile Number                        </label><br />
                        <input type='number'
                            value={personalDetailsUpdate.emergency_contact_mobile}
                            onChange={(e) => setPersonalDetailsUpdate({ ...personalDetailsUpdate, emergency_contact_mobile: e.target.value })}
                            placeholder='Enter Number' className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'
                            readOnly={!isEditable} // Input readOnly rahega jab tak isEditable false hai
                            style={{
                                backgroundColor: isEditable ? "#f4f5f9" : "#fff", // Background color bhi change hoga
                                border: isEditable ? "1px solid #F4F5F9" : ''
                            }}

                        />

                    </div>


                </div>

                <div className='flex xl:flex-row flex-col w-[100%] gap-[10px] justify-between mb-[10px] '>
                    <div className='w-[100%]  xl:w-[48%] 2xl:w-[48%]'>
                        <label className='text-[14px]'>Emergency Contact Relationship
                        </label><br />
                        <input type='text'
                            value={personalDetailsUpdate.emergency_contact_relation}
                            onChange={(e) => setPersonalDetailsUpdate({ ...personalDetailsUpdate, emergency_contact_relation: e.target.value })}
                            className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'
                            readOnly={!isEditable} // Input readOnly rahega jab tak isEditable false hai
                            style={{
                                backgroundColor: isEditable ? "#f4f5f9" : "#fff", // Background color bhi change hoga
                                border: isEditable ? "1px solid #F4F5F9" : ''
                            }}

                        />

                    </div>




                </div>

                <div className='w-[100%]  xl:w-[100%] 2xl:w-[100%]'>
                    <label className='text-[14px]'>Emergency Contact Address
                    </label><br />
                    <textarea type='text' rows="2"
                        defaultValue={personalDetailsUpdate.emergency_contact_address}
                        onChange={(e) => setPersonalDetailsUpdate({ ...personalDetailsUpdate, emergency_contact_address: e.target.value })}
                        className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'
                        readOnly={!isEditable} // Input readOnly rahega jab tak isEditable false hai
                        style={{
                            backgroundColor: isEditable ? "#f4f5f9" : "#fff", // Background color bhi change hoga
                            border: isEditable ? "1px solid #F4F5F9" : ''
                        }}
                    />
                </div>



                <div className='flex justify-end mt-4 p-3'>

                    <div className='flex gap-[20px] items-center '>
                        <button type='button' disabled={isLoadingPersonalDetails} className={'second-btn ' + (isLoadingPersonalDetails && "cursor-not-allowed animate-pulse")} onClick={
                            (e) => {
                                handleEditClick(e)
                            }
                        }

                        >
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
                        <input
                            type='text'
                            value={governmentIds?.aadhaar_number}
                            onChange={(e) => setGovernmentIds({ ...governmentIds, aadhaar_number: e.target.value })}
                            placeholder='Enter Aadhaar Number'
                            className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'
                            readOnly={!isEditable6}
                            aria-readonly={!isEditable6 ? 'true' : 'false'} // Added for accessibility
                            style={{
                                backgroundColor: isEditable6 ? "#F4F5F9" : "#fff",
                                border: isEditable6 ? "1px solid #F4F5F9" : '',
                            }}
                        />

                    </div>

                    <div className='w-[100%]  xl:w-[48%] 2xl:w-[48%] '>
                        <label className='text-[14px]'>PAN</label><br />
                        <input type='text'
                            value={governmentIds?.pan_number} onChange={(e) => setGovernmentIds({ ...governmentIds, pan_number: e.target.value })} placeholder='Enter PAN Number ' className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'
                            readOnly={!isEditable6} // Input readOnly rahega jab tak isEditable false hai
                            style={{
                                backgroundColor: isEditable6 ? "#f4f5f9" : "#fff", // Background color bhi change hoga
                                border: isEditable6 ? "1px solid #F4F5F9" : ''
                            }}

                        />
                    </div>




                </div>

                <div className='flex w-[100%] gap-[10px] justify-between  xl:mb-4 mb-[6px] xl:flex-row flex-col'>
                    <div className='w-[100%] xl:w-[48%] 2xl:w-[48%]  '>
                        <label className='text-[14px]'>Driving License
                        </label><br />
                        <input type='text'
                            value={governmentIds?.driving_license_number} onChange={(e) => setGovernmentIds({ ...governmentIds, driving_license_number: e.target.value })} placeholder='Enter  License Number' className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] 	  placeholder:font-font-normal text-[14px]'
                            readOnly={!isEditable6} // Input readOnly rahega jab tak isEditable false hai
                            style={{
                                backgroundColor: isEditable6 ? "#f4f5f9" : "#fff", // Background color bhi change hoga
                                border: isEditable6 ? "1px solid #F4F5F9" : ''
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
                                border: isEditable6 ? "1px solid #F4F5F9" : ''
                            }}

                        />
                    </div>




                </div>



                <div className='flex xl:flex-row flex-col w-[100%] gap-[10px] justify-between mb-[10px] '>
                    <div className='w-[100%]  xl:w-[48%] 2xl:w-[48%]'>
                        <label className='text-[14px]'>UAN</label><br />
                        <input type='text'
                            value={governmentIds?.uan_number} onChange={(e) => setGovernmentIds({ ...governmentIds, uan_number: e.target.value })} placeholder='Enter UAN Number' className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'
                            readOnly={!isEditable6} // Input readOnly rahega jab tak isEditable false hai
                            style={{
                                backgroundColor: isEditable6 ? "#f4f5f9" : "#fff", // Background color bhi change hoga
                                border: isEditable6 ? "1px solid #F4F5F9" : ''
                            }}

                        />

                    </div>




                </div>


                <div className='flex justify-end mt-4 p-3'>

                    <div className='flex gap-[20px] items-center '>
                        <button type='button' className='second-btn' onClick={() => {
                            if (isEditable6) {
                                updateAllGovernmentIds();
                            }
                            handleEditClick2();

                        }}>
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
                            value={personalDetailsUpdate.current_address}
                            onChange={(e) => setPersonalDetailsUpdate({ ...personalDetailsUpdate, current_address: e.target.value })}
                            rows="2" className=' rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] border border-1 focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'
                            readOnly={!isEditable7} // Input readOnly rahega jab tak isEditable false hai
                            style={{
                                backgroundColor: isEditable7 ? "#f4f5f9" : "#fff", // Background color bhi change hoga
                                border: isEditable7 ? "1px solid #F4F5F9" : ""
                            }}

                        />
                    </div>

                    <div className='w-[100%]  xl:w-[48%] 2xl:w-[48%] '>
                        <label className='text-[14px]'>Permanent Address
                        </label><br />
                        <textarea type='text' rows="2"
                            value={personalDetailsUpdate.permanent_address} onChange={(e) => setPersonalDetailsUpdate({ ...personalDetailsUpdate, permanent_address: e.target.value })}
                            className=' rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none border border-1 text-[#000] placeholder:font-font-normal text-[14px]'
                            readOnly={!isEditable7} // Input readOnly rahega jab tak isEditable false hai
                            style={{
                                backgroundColor: isEditable7 ? "#f4f5f9" : "#fff", // Background color bhi change hoga
                                border: isEditable7 ? "1px solid #F4F5F9" : ''
                            }}

                        />
                    </div>




                </div>

                <div className='flex justify-end mt-4 p-3'>

                    <div className='flex gap-[20px] items-center '>
                        <button type='button' className='second-btn' onClick={(e) => {
                            updatePersonalDetails(e);
                            handleEditClick3();
                        }}>
                            {isEditable7 ? "Save" : "Edit"}
                        </button>

                    </div>

                </div>







            </form>

            {/* // </div> */}
        </>
    )
}

export default PersonalDetail;