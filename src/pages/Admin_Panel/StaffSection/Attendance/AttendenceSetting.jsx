import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react'
import Modal from 'react-responsive-modal';


export default function AttendanceSettings() {
    const [isOpen, setIsOpen] = useState(true)
    const [selectedType, setSelectedType] = useState('selfie')
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
  

    if (!isOpen) return null

    return (


        <div>
            <button onClick={onOpenModal}>Open modal</button>
            <Modal open={open} onClose={onCloseModal} center>
                <div className=" ">
                    <div className="">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-[22px] acc-setting font-medium">Attendance Settings</h2>
                         
                        </div>

                        {/* Auto Attendance Section */}
                        <div className="mb-8">
                            <h3 className="text-xl font-medium mb-4">Auto Attendance</h3>
                            <label className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 mb-4">
                                <input
                                    type="radio"
                                    name="attendance"
                                    value="auto"
                                    checked={selectedType === 'auto'}
                                    onChange={() => setSelectedType('auto')}
                                    className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                    disabled
                                />
                                <div className="space-y-1">
                                    <p className="font-medium text-gray-700">Mark Present by Default</p>
                                    <p className="text-gray-500">Default auto present, can be changed manually</p>
                                </div>
                            </label>

                            <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-600">
                                Note: Attendance cannot be set to Auto as you have managers with attendance access
                            </div>
                        </div>

                        {/* Manual Attendance Section */}
                        <div className="mb-8">
                            <h3 className="text-xl font-medium mb-4">Manual Attendance</h3>
                            <label className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 mb-4">
                                <input
                                    type="radio"
                                    name="attendance"
                                    value="manual"
                                    checked={selectedType === 'manual'}
                                    onChange={() => setSelectedType('manual')}
                                    className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                />
                                <div className="space-y-1">
                                    <p className="font-medium text-gray-700">Manual Attendance</p>
                                    <p className="text-gray-500">Attendance is neutral by default, should be marked manually</p>
                                </div>
                            </label>

                            {/* Location Based Option */}
                            <label className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 mb-4">
                                <input
                                    type="radio"
                                    name="attendance"
                                    value="location"
                                    checked={selectedType === 'location'}
                                    onChange={() => setSelectedType('location')}
                                    className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                />
                                <div className="space-y-1">
                                    <p className="font-medium text-gray-700">Location Based</p>
                                    <p className="text-gray-500">Staff can mark their own attendance. Location will be captured automatically</p>
                                </div>
                            </label>

                            {/* Selfie & Location Based Option */}
                            <label className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200">
                                <input
                                    type="radio"
                                    name="attendance"
                                    value="selfie"
                                    checked={selectedType === 'selfie'}
                                    onChange={() => setSelectedType('selfie')}
                                    className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                />
                                <div className="space-y-1">
                                    <p className="font-medium text-gray-700">Selfie & Location Based</p>
                                    <p className="text-gray-500">Staff can mark their own attendance with Selfie. Location will be captured automatically</p>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>


    )
}

