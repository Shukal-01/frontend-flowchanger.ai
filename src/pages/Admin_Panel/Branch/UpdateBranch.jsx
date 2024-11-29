import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../../../Context/GlobalContext'
import ClipLoader from "react-spinners/ClipLoader";
import { s } from 'framer-motion/client';

const UpdateBranch = ({ id, item }) => {
    const { baseUrl, openToast, branchData } = useGlobalContext();
    console.log(branchData)
    const navigate = useNavigate()
    const [branchName, setBranchName] = useState("")

    async function updateBranchDetails() {
        try {
            const result = await fetch(baseUrl + `branch/${branchData?.id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ branchName: branchName })
            })
            if (result.status == 200) {
                openToast("Branch Name Updated Successfully", "success")
                navigate("/branch-details")
            }
            else {
                openToast("Something went wrong", "error")
            }
        } catch (error) {
            openToast("Something went wrong", "error")
        }
     
    }

    return (
        <div className='addnewrole  pl-[10px] w-[100%] pr-2 mb-3 pb-4'>
            <h2 className='text-[#27004a] font-medium text-[18px]'>Update  Branch Name</h2>

            <div className='w-[100%]'>
                <div className='bg-[#fff] w-[100%] md:w-[80%] xl:w-[50%] lg:w-[50%] set-shadow p-3 mt-2 rounded-md'>
                    <label>Branch Name </label><br />
                    <input defaultValue={branchData?.branchName} type='text' onChange={(e) => setBranchName(e.target.value)} className='mt-2 border border-1 pl-3 h-[43px] pr-7
    ] rounded-md focus:outline-none w-[100%] text-[15px] text-[#aeabab]'/>


                    <div className='text-end mt-3 flex gap-[10px] justify-end'>
                        <Link to="/branch-details" className='first-btn flex items-center pt-2 py-2 pl-5 pr-5 rounded-md text-white hover:bg-[#7526d1]'>
                            Cancel
                        </Link>
                        <button className="second-btn pt-2 py-2 pl-5 pr-5 rounded-md text-white hover:bg-[#7526d1] " onClick={updateBranchDetails}>Update</button>
                    </div>
                </div>
            </div>
        </div>)
}

export default UpdateBranch