
import React, { useState } from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Setting_panel() {
  const [isOpen, setIsOpen] = useState(false)
  const [smsEnabled, setSmsEnabled] = useState(false)
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  return (
    <>
      <div className="flex justify-end items-center">
        <div className="w-full max-w-md mx-auto">
         
              <div className="bg-white shadow-cs rounded-lg weekly-sms mt-1 overflow-hidden">
              <div className="divide-y divide-gray-100">

                <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer ">
                  <span className="text-gray-700 enable-staff-panel">Attendance</span>
                  <div className="flex items-center text-gray-500">
                    <span className="enable-staff-panel">Selfie & Location</span>
                    <KeyboardArrowRightIcon className="h-5 w-5 ml-2" />
                  </div>
                </div>


                <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer ">
                  <span className="text-gray-700 enable-staff-panel">Daily Work Entry</span>
                  <div className="flex items-center text-gray-500">
                    <span className="enable-staff-panel">Enabled (11 Staffs)</span>
                    <KeyboardArrowRightIcon className="h-5 w-5 ml-2" />
                  </div>
                </div>


                <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer ">
                  <span className="text-gray-700 enable-staff-panel">Weekly Holiday</span>
                  <div className="flex items-center text-gray-500">
                    <span className="enable-staff-panel">Select</span>
                    <KeyboardArrowRightIcon className="h-5 w-5 ml-2" />
                  </div>
                </div>


                <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer">
                  <span className="text-gray-700 enable-staff-panel">Send SMS to Staff</span>
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


                <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer ">
                  <span className="text-gray-700 enable-staff-panel">Track In/Out Time</span>
                  <span className="text-gray-500 enable-staff-panel">Enabled</span>
                </div>


                <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer ">
                  <span className="text-gray-700 enable-staff-panel">Device List</span>
                  <div className="flex items-center text-gray-500">
                    <span className="enable-staff-panel">Select</span>
                    <KeyboardArrowRightIcon className="h-5 w-5 ml-2" />
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}



