import React, { useEffect, useState } from 'react';
import Modal from 'react-responsive-modal';
import { MdDelete } from 'react-icons/md';
import { useGlobalContext } from '../../Context/GlobalContext';

const PresentAndHalfDayModal = ({
    type,
    modalHeading,
    isOpenModal,
    isCloseModal,
    updateStatus,
    punchRecordId,
}) => {
    const { openToast, shift: allShift } = useGlobalContext();
    const [updatedDetail, setUpdatedDetail] = useState({
        startTime: '',
        endTime: '',
        shifId: '',
    });
    const [loading, setLoading] = useState(false); // Loading state to disable button

    const convertTo12HourFormat = (time) => {
        const date = new Date(
            `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(
                2,
                '0'
            )}T${time}:00Z`
        );

        if (isNaN(date)) {
            console.error('Invalid date:', time);
            return '';
        }

        return date.toLocaleString('en-US', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    const handleSave = async () => {
        if (updatedDetail?.shifId==="") {
            openToast('Please Select Shift for ' + type + " status", 'warning');
            return;
        }
        const data = {
            status: type,
            ...updatedDetail,
            startTime:
                updatedDetail?.startTime !== '' ? new Date(convertTo12HourFormat(updatedDetail?.startTime)).toISOString() : '',
            endTime:
                updatedDetail.endTime !== '' ? new Date(convertTo12HourFormat(updatedDetail.endTime)).toISOString() : '',
        }

        try {
            setLoading(true); // Disable the button by setting loading to true
            await updateStatus(punchRecordId, data); // Update status using the async function
            setLoading(false); // Enable the button after the API call completes
            isCloseModal(); // Close modal after the API call
        } catch (error) {
            setLoading(false); // Enable the button in case of error
            openToast('Error occurred while updating status', 'error'); // Display error toast
        }
    };

    return (
        <Modal open={isOpenModal} onClose={isCloseModal} center className={'bg-transparent shadow-none'}>
            <div className="pt-5">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-[22px] font-medium text-gray-900">{type}</h1>
                        <p className="text-sm text-gray-600">{modalHeading}</p>
                    </div>
                </div>

                <div className="pl-0 pr-0 p-4 relative">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-[#000] mb-1">Shift Name</label>
                            <div className="relative">
                                <select
                                    value={updatedDetail.shifId}
                                    onChange={(e) => setUpdatedDetail({ ...updatedDetail, shifId: e.target.value })}
                                    className="focus:outline-none w-full px-3 py-2 border border-gray-200 rounded-md appearance-none bg-white text-gray-600 pr-10"
                                >
                                    {allShift.map((shift) => (
                                        <option key={shift.id} value={shift.id}>
                                            {`${shift.shiftName} (${shift.shiftStartTime} - ${shift.shiftEndTime})`}
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
                                <label className="block text-sm text-[#000] mb-1">Start Time</label>
                                <div className="relative">
                                    <input
                                        type="time"
                                        value={updatedDetail?.startTime}
                                        onChange={(e) => setUpdatedDetail({ ...updatedDetail, startTime: e.target.value })}
                                        placeholder="Start Time"
                                        className="focus:outline-none w-full px-3 py-2 border border-gray-200 rounded-md text-gray-600 placeholder-gray-400"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-[#000] mb-1">End Time</label>
                                <div className="relative">
                                    <input
                                        type="time"
                                        value={updatedDetail?.endTime}
                                        onChange={(e) => setUpdatedDetail({ ...updatedDetail, endTime: e.target.value })}
                                        placeholder="End Time"
                                        className="focus:outline-none w-full px-3 py-2 border border-gray-200 rounded-md text-gray-600 placeholder-gray-400"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    className={"second-btn w-full " + (loading ? 'cursor-not-allowed animate-pulse' : '')}
                    onClick={handleSave}
                    disabled={loading} // Disable the button if loading is true
                >
                    {loading ? 'Saving...' : 'Save'} {/* Display 'Saving...' text while loading */}
                </button>
            </div>
        </Modal>
    );
};

export default PresentAndHalfDayModal;
