import React, { useState } from "react";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const DailyWorkEntry = ({ isOpen, setIsOpen }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleDisableAll = () => {
    console.log("Disable All clicked");
  };

  const handleSaveChanges = () => {
    console.log("Save Changes clicked");
  };

  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)} center>
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[22px] font-medium work-entry">
            Daily Work Entry
          </h2>
        </div>
        <h3 className="text-lg font-medium mb-2 providing">
          Select staff for providing access
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Note: Phone number is mandatory to give access.
        </p>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search Staff"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16l-4-4m0 0l4-4m-4 4h16"
            />
          </svg>
        </div>
        <div className="overflow-y-auto mb-4">
          {/* Staff listing */}
          <div className="flex items-center border-b py-2 pb-[14px] border-gray-200">
            <input
              type="checkbox"
              className=" text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 text-[16px] daily-heading-entry font-medium text-gray-700">
              Monthly Regular Staff (9)
            </label>
          </div>
          <div className="border-b border-[#dbdbdb] flex items-center justify-between pb-[16px] pt-[16px]">
            <div className="flex items-center gap-[6px]">
              <input type="checkbox" />
              <span>Abhishek Sevta</span>
            </div>
            <div>
              <p>9351738265</p>
            </div>
          </div>
          <div className="border-b border-[#dbdbdb] flex items-center justify-between pb-[16px] pt-[16px]">
            <div className="flex items-center gap-[6px]">
              <input type="checkbox" />
              <span>Abhishek Sevta</span>
            </div>
            <div>
              <p>9351738265</p>
            </div>
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
  );
};

export default DailyWorkEntry;
