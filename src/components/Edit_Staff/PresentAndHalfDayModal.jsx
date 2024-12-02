import React, { useEffect, useState } from 'react'
import Modal from 'react-responsive-modal'
import { MdDelete } from "react-icons/md";
import { useGlobalContext } from '../../Context/GlobalContext';

const PresentAndHalfDayModal = ({ type, modalHeading, isOpenModal, isCloseModal }) => {
    const { baseUrl, openToast } = useGlobalContext();
    const [updatedDetail, setUpdatedDetail] = useState({
        startTime: "",
        endTime: "",
        shifId: "",
    });
    console.log(updatedDetail);
    
    const [allShift, setAllShift] = useState([]);
    async function fetchShiftDetails() {
        const result = await fetch(baseUrl + "shift");
        if (result.status == 200) {
            const data = await result.json();
            console.log(data);
            setAllShift(data.map((shift) => ({
                value: shift.id,
                label: `${shift.shiftName} (${shift.shiftStartTime} - ${shift.shiftEndTime})`,
            })));
        }
        else {
            openToast("No Record Found")
        }
    }

    useEffect(() => {
        fetchShiftDetails();
    }, [type]);

    console.log(allShift);

    return (
        <Modal open={isOpenModal} onClose={isCloseModal} center className={"bg-transparent shadow-none"} >
            <div className="pt-5">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-[22px] font-medium text-gray-900">{type}</h1>
                        <p className="text-sm text-gray-600">{modalHeading}</p>
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
                                    value={updatedDetail.shifId}
                                    onChange={(e) => setUpdatedDetail({ ...updatedDetail, shifId: e.target.value })}
                                    className="focus:outline-none w-full  px-3 py-2 border border-gray-200 rounded-md appearance-none bg-white text-gray-600 pr-10"
                                >
                                    {allShift.map((shift) => (
                                        <option key={shift.value} value={shift.value}>
                                            {shift.label}
                                        </option>
                                    ))}
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
                                        value={updatedDetail?.startTime}
                                        onChange={(e) => setUpdatedDetail({ ...updatedDetail, startTime: e.target.value })}
                                        placeholder="Start Time"
                                        className=" focus:outline-none  w-full px-3 py-2 border border-gray-200 rounded-md text-gray-600 placeholder-gray-400"
                                    />
                                    {/* <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div> */}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-[#000] mb-1">
                                    End Time
                                </label>
                                <div className="relative">
                                    <input
                                        type="time"
                                        value={updatedDetail?.endTime}
                                        onChange={(e) => setUpdatedDetail({ ...updatedDetail, endTime: e.target.value })}
                                        placeholder="End Time"
                                        className="focus:outline-none  w-full px-3 py-2 border border-gray-200 rounded-md text-gray-600 placeholder-gray-400"
                                    />
                                    {/* <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="second-btn w-full">
                    Save
                </button>
            </div>
        </Modal>
    )
}

export default PresentAndHalfDayModal