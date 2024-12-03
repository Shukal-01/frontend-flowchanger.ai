import React, { useState } from 'react'
import Modal from 'react-responsive-modal'
import { useGlobalContext } from '../../../Context/GlobalContext'
import { set } from 'react-hook-form';

const PresentModal = ({ id, setStatus, status,attendance,name,date }) => {
    console.log(id)
    const { baseUrl, shift, openToast } = useGlobalContext();
    const [shiftType, setShiftType] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    function combineDateWithTimeAndFormat(time) {
        const today = new Date();
        const formattedDate = today.toISOString().split("T")[0]; 
         const [hours, minutes] = time.split(":");
        const hour = parseInt(hours, 10);
        const period = hour >= 12 ? "PM" : "AM";
        const formattedHour = hour % 12 || 12;  
    
        const formattedTime = `${formattedHour}:${minutes} ${period}`;  
        return `${formattedDate} ${formattedTime}`;  
    }
    

    async function confirmation() {
         try {
            setIsLoading(true);
            if (status == "") {
                openToast("Please Select Status", "error");
                return;
            }
            const formattedStartTime = combineDateWithTimeAndFormat(startTime);
            const formattedEndTime = combineDateWithTimeAndFormat(endTime);
    
            const result = await fetch(
                baseUrl + `attendance/status/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({ status: status, startTime: new Date(formattedStartTime),
                        endTime:  new Date(formattedEndTime), }),
                }
            );
            if (result.status == 200) {
                openToast("Updated Status Successfully", "success");
                setStatus("")
                attendance()

            } else {
                openToast("Something went wrong", "error");
            }
        } catch (error) {
            openToast("Something went wrong", "error");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal open={status == "PRESENT"} onClose={() => setStatus("")} center >
            <div className="pt-5">
                <div className="flex justify-between items-center ">
                    <div>
                        <h1 className="text-[22px] font-medium text-gray-900">Present</h1>
                        <p className="text-sm text-gray-600">{name} | {date}</p>
                    </div>
                </div>

                <div className=" pl-0 pr-0 p-4 relative">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-[#000] mb-1">
                                Shift Name
                            </label>
                            <div className="relative">
                                <select
                                    value={shiftType}
                                    onChange={(e) => setShiftType(e.target.value)}
                                    className="focus:outline-none w-full  px-3 py-2 border border-gray-200 rounded-md appearance-none bg-white text-gray-600 pr-10"
                                >
                                    <option>Select Shift</option>
                                    {
                                        shift?.map((item) => {
                                            return <option value={item?.id}>{item?.shiftName}</option>
                                        })
                                    }
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-[#000] mb-1">
                                    Start Time
                                </label>
                                <div className="relative">
                                    <input
                                        type="time"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        placeholder="Start Time"
                                        className=" focus:outline-none  w-full px-3 py-2 border border-gray-200 rounded-md text-gray-600 placeholder-gray-400"
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-[#000] mb-1">
                                    End Time
                                </label>
                                <div className="relative">
                                    <input
                                        type="time"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        placeholder="End Time"
                                        className="focus:outline-none  w-full px-3 py-2 border border-gray-200 rounded-md text-gray-600 placeholder-gray-400"
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button className={`second-btn w-full ${isLoading==true ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={confirmation}>
                    Save
                </button>
            </div>
        </Modal>
    )
}

export default PresentModal