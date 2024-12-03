import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import Modal from 'react-responsive-modal';


export default function DailyWorkEntry({ initialStaff = [] }) {
    const [isOpen, setIsOpen] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedStaff, setSelectedStaff] = useState([])

    const filteredStaff = initialStaff.filter(staff =>
        staff.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const toggleStaffSelection = (id) => {
        setSelectedStaff(prev =>
            prev.includes(id) ? prev.filter(staffId => staffId !== id) : [...prev, id]
        )
    }

    const handleDisableAll = () => {
        setSelectedStaff([])
    }

    const handleSaveChanges = () => {
        console.log("Selected staff:", selectedStaff)
        setIsOpen(false)
    }

    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    if (!isOpen) return null


    return (
      


            <>

                <button onClick={onOpenModal}>Open modal</button>
                <div className=''>
                <Modal open={open} onClose={onCloseModal} center>
                  
                        <div className="">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-[22px] font-medium work-entry">Daily Work Entry</h2>
                         
                            
                            </div>
                            <h3 className="text-lg font-medium mb-2 providing">Select staff for providing access</h3>
                            <p className="text-sm text-gray-500 mb-4">Note: Phone number is mandatory to give access.</p>
                            <div className="relative mb-4">
                                <input
                                    type="text"
                                    placeholder="Search Staff"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                                />
                                <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 " />
                            </div>
                            <div className=" overflow-y-auto mb-4">

                                <div className="flex items-center border-b py-2 pb-[18px] border-gray-200 ">

                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label className="ml-2 text-[16px] daily-heading-entry font-medium text-gray-700">Monthly Regular Staff (9)</label>


                                </div>
                                <div className="flex items-center justify-between border-b py-2 pb-[18px] pt-[20px] border-gray-200 ">
                                    <div className='flex items-center'>

                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label className="ml-2 text-[16px]  text-gray-700 daily-heading-entry">Abhishek Sevta</label>
                                    </div>
                                    <div>
                                        <p className='daily-heading-entry'>9351738265</p>
                                    </div>


                                </div>
                                <div className="flex items-center justify-between border-b py-2 pb-[18px] pt-[20px] border-gray-200 ">
                                    <div className='flex items-center'>

                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 text-blue-600  border-gray-300 rounded"
                                        />
                                        <label className="ml-2 text-[16px]  text-gray-700 daily-heading-entry">Abhishek Sevta</label>
                                    </div>
                                    <div>
                                        <p className='daily-heading-entry'>9351738265</p>
                                    </div>


                                </div>
                                <div className="flex items-center justify-between border-b py-2 pb-[18px] pt-[20px] border-gray-200 ">
                                    <div className='flex items-center'>

                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 text-blue-600  border-gray-300 rounded"
                                        />
                                        <label className="ml-2 text-[16px]  text-gray-700 daily-heading-entry">Abhishek Sevta</label>
                                    </div>
                                    <div>
                                        <p className='daily-heading-entry'>9351738265</p>
                                    </div>


                                </div>
                                <div className="flex items-center justify-between border-b py-2 pb-[18px] pt-[20px] border-gray-200 ">
                                    <div className='flex items-center'>

                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 text-blue-600  border-gray-300 rounded"
                                        />
                                        <label className="ml-2 text-[16px]  text-gray-700 daily-heading-entry">Abhishek Sevta</label>
                                    </div>
                                    <div>
                                        <p className='daily-heading-entry'>9351738265</p>
                                    </div>


                                </div>
                                <div>

                                </div>
                            </div>
                            <div className="flex space-x-4 space-work">
                                <button
                                    onClick={handleDisableAll}
                                    className="flex-1 px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                >
                                    Disable All
                                </button>
                                <button
                                    onClick={handleSaveChanges}
                                    className="flex-1 px-4 py-2 bg-[#27004a] text-white rounded-md hover:bg-none hover:border border-[#27004a] focus:outline-none  focus:ring-opacity-50"
                                >
                                    Save Changes
                                </button>
                            </div>
                       
                    </div>
                </Modal>
                </div>
                </>
      
    )
}

