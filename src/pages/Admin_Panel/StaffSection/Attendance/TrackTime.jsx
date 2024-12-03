import { useState } from "react"

import Modal from "react-responsive-modal";


export default function TimeTrackingModal() {
    // const [trackInOut, setTrackInOut] = useState(true)
    // const [requirePunchOut, setRequirePunchOut] = useState(false)
    const [isOn, setIsOn] = useState(false);
    // const [isOpen3, setIsOpen3] = useState(true)

    const toggleSwitch = () => {
        setIsOn(!isOn);
    };
    const [isOn1, setIsOn1] = useState(false);

    const toggleSwitch1 = () => {
        setIsOn1(!isOn1);
    };
    const [open, setOpen] = useState(true);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);




return(
    <div>
    <button onClick={onOpenModal}>Open modal</button>
    <Modal open={open} onClose={onCloseModal} center>
   
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h2 className="text-[24px] font-medium track-heading">Track In/Out Time</h2>
            </div>
            <div className="space-y-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between pb-[14px] border-b border-[#dbdbdb]">
                            <div>
                                <h3 className="text-xl track-heading">Track In & Out Time</h3>
                                <p className="text-muted-foreground staff-timeout">
                                    Record both In & Out time for all staff
                                </p>
                            </div>
                            <div className="flex items-center justify-between p-4  cursor-pointer">

                                <div
                                    className={`relative w-14 h-8 flex items-center rounded-full p-1 cursor-pointer ${isOn ? "bg-[#27004a]" : "bg-gray-300"
                                        }`}
                                    onClick={toggleSwitch}
                                >
                                    <div
                                        className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${isOn ? "translate-x-6" : "translate-x-0"
                                            }`}
                                    ></div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl track-heading">No attendance without punch-out</h3>
                                <p className="text-muted-foreground staff-timeout">
                                    Punch out is required to mark attendance
                                </p>
                            </div>
                            <div className="flex items-center justify-between p-4  cursor-pointer">

                                <div
                                    className={`relative w-14 h-8 flex items-center rounded-full p-1 cursor-pointer ${isOn1 ? "bg-[#27004a]" : "bg-gray-300"
                                        }`}
                                    onClick={toggleSwitch1}
                                >
                                    <div
                                        className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${isOn1 ? "translate-x-6" : "translate-x-0"
                                            }`}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="w-full text-lg p-[10px]  allcrm-btn  " size="lg">
                    Done
                </button>
            </div>
      
    </Modal>
</div>
)

   


}

