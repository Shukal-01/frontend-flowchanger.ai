import React, { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SearchIcon from '@mui/icons-material/Search';
import { useGlobalContext } from '../../../../Context/GlobalContext';

const Worktime = () => {
    const { baseUrl, openToast } = useGlobalContext();
    const [workEntry, setWorkEntry] = useState()

    async function fetchWorkEntry() {
        const result = await fetch(baseUrl + "work-entry");
        if (result.status == 200) {
            const data = await result.json();
            console.log(data)
            setWorkEntry(data.data)
        }
        else {
            openToast("Internal Server Error", "error")
        }
    }
    useEffect(() => {
        fetchWorkEntry();
    }, [])
    return (
        <>
            <div className='w-full p-[20px]'>
                <div className=''>
                    <Link className='text-[14px]' to="/attendence_summary"> <ArrowBackIcon className='arrow-back-icon' /> Back</Link>
                </div>
                <div className='flex justify-between items-center mt-[20px] mb-[20px]'>
                    <h2 className='font-medium'>Daily Work Time</h2>
                    <Link className=' new-menubook p-[8px] text-[12px]  rounded-md  text-[blue]  flex items-center gap-[6px]' to="/"> <MenuBookIcon className='menu-book' />Download Report</Link>
                </div>
                <div className="relative shadow-md">
                    <SearchIcon className='absolute top-[10px] right-[7px]' />
                    <input className='w-full pr-[38px]  p-[10px] rounded-md search-staff ' type="text" placeholder='Search Staff ' />
                </div>


                {
                    workEntry && workEntry.length === 0 &&
                    <div className="text-center">
                        <h2 className='text-[#ff0000] font-medium py-9 text-[16px]'>No Work Entry Found</h2>
                    </div>

                }

                {
                    workEntry?.map((item, index) => {
                        return <div className='mt-[20px] mb-[20px] set-shadow rounded-md'>
                            <div className='p-[16px] font-medium '>
                                <h2 className='text-[16px] pb-2'>AMAN DESIGNER FC</h2>
                                <p className='text-[13px] pb-1 font-normal'><span>Work Name:-</span>   {item.work_name}</p>
                                <p className='text-[13px] pb-1 font-normal'><span>Work Description:-</span> {item.description}</p>
                                <p className='text-[13px] pb-1 font-normal'><span>Details:-</span> {item.units}</p>
                                <p className='text-[13px] pb-1 font-normal'><span>Entry Time:-</span> {new Date(item.createdAt).toLocaleString('en-US', { day: "numeric", month: "long", year: "numeric", hour: 'numeric', minute: 'numeric', hour12: true })} </p>
                            </div>

                        </div>
                    })
                }






            </div>
        </>
    )
}

export default Worktime