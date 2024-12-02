import React,{useState  } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../../../Context/GlobalContext'

const AddBranch = () => {
    const navigate = useNavigate();
    const { baseUrl, openToast } = useGlobalContext();
    const [branchName, setBranchName] = React.useState("");
    const [isLoading, setIsLoading] = useState(false); 
    async function addBranch() {
        try {
            setIsLoading(true)
            const result = await fetch(baseUrl + "branch", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ branchName: branchName })
            });
            if (result.status == 201) {
                openToast("Branch Added Successfully", "success");
                navigate("/branch-details");
            }
            else {
                openToast("Something went wrong", "error");
            }
        }
        catch (error) {
            console.log("error", error)
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <div className='addnewrole  pl-[10px] w-[100%] pr-2 mb-3 pb-4'>
            <h2 className='text-[#27004a] font-medium text-[18px]'>Add New Branch</h2>

            <div className='w-[100%]'>
                <div className='bg-[#fff] w-[100%] md:w-[80%] xl:w-[50%] lg:w-[50%] set-shadow p-3 mt-2 rounded-md'>
                    <label>Branch Name</label><br />
                    <input type='text' className='mt-2 border border-1 pl-3 h-[43px] pr-7
            ] rounded-md focus:outline-none w-[100%] text-[15px] text-[#aeabab]' onChange={(e) => setBranchName(e.target.value)} />
                    <div className='text-end mt-3 flex gap-[10px] justify-end'>
                        <Link to="/branch-details" className='first-btn flex items-center pt-2 py-2 pl-5 pr-5 rounded-md text-white hover:bg-[#7526d1]'>
                            Cancel
                        </Link>
                        <button className={`${isLoading==true ? 'opacity-50 cursor-not-allowed' : ''}
                        second-btn pt-2 py-2 pl-5 pr-5 rounded-md text-white hover:bg-[#7526d1]`}
                         onClick={addBranch}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddBranch