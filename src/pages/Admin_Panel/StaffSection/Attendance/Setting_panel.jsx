
import React, { useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";


import DownloadIcon from "@mui/icons-material/Download";
import SettingsIcon from "@mui/icons-material/Settings";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Switch } from "@mui/material";
import { div } from "framer-motion/client";

export default function Setting_panel() {
    const [isOpen, setIsOpen] = useState(false)
    const [smsEnabled, setSmsEnabled] = useState(false)
  
    return (
        <>
        <div className="flex justify-end items-center">
      <div className="w-full max-w-md mx-auto">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 focus:outline-none"
        >
          Logs {isOpen ? <IoChevronDownSharp className="float-right" /> : <IoChevronDownSharp className="float-right" />}
        </button>
  
        {isOpen && (
          <div className="bg-white shadow-lg rounded-lg mt-1 overflow-hidden">
            <div className="divide-y divide-gray-100">
             
              <div className="flex items-center justify-between p-4 hover:bg-gray-50">
                <span className="text-gray-700">Attendance</span>
                <div className="flex items-center text-gray-500">
                  <span>Selfie & Location</span>
                  <IoChevronDownSharp className="h-5 w-5 ml-2" />
                </div>
              </div>
  
             
              <div className="flex items-center justify-between p-4 hover:bg-gray-50">
                <span className="text-gray-700">Daily Work Entry</span>
                <div className="flex items-center text-gray-500">
                  <span>Enabled (11 Staffs)</span>
                  <IoChevronDownSharp className="h-5 w-5 ml-2" />
                </div>
              </div>
  
           
              <div className="flex items-center justify-between p-4 hover:bg-gray-50">
                <span className="text-gray-700">Weekly Holiday</span>
                <div className="flex items-center text-gray-500">
                  <span>Select</span>
                  <IoChevronDownSharp className="h-5 w-5 ml-2" />
                </div>
              </div>
  
         
              <div className="flex items-center justify-between p-4 hover:bg-gray-50">
                <span className="text-gray-700">Send SMS to Staff</span>
                <Switch
                  checked={smsEnabled}
                  onCheckedChange={setSmsEnabled}
                  className="ml-2"
                />
              </div>
  
            
              <div className="flex items-center justify-between p-4 hover:bg-gray-50">
                <span className="text-gray-700">Track In/Out Time</span>
                <span className="text-gray-500">Enabled</span>
              </div>
  
            
              <div className="flex items-center justify-between p-4 hover:bg-gray-50">
                <span className="text-gray-700">Device List</span>
                <div className="flex items-center text-gray-500">
                  <span>Select</span>
                  <IoChevronDownSharp className="h-5 w-5 ml-2" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
      </>
    )
  }
  


