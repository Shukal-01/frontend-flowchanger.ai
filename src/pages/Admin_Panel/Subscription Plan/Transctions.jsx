import React from "react";
import CachedIcon from "@mui/icons-material/Cached";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { FiSearch } from "react-icons/fi";


const Transctions = () => {
  return (
    <div className="m-4">
     <div>
    
    <div className=" p-[10px] shadow-cs rounded-lg border border-[#dbdbdb]  ">

    <div className="flex items-center gap-2 justify-end mt-[10px]">
      <div className="relative client-add">
        <input
          className="p-[6px] client-add  rounded-2xl pl-[10px] pr-[24px] focus-visible:outline-none  summary-border text-[13px] py-2.5"
          type="text"
          placeholder="Search"
        />
        <FiSearch className="absolute newadd2 right-[8px] top-[14px] text-gray-500" />
      </div>

      <div className="bg-[#27004a] text-white px-7 py-[8px] rounded-md space-x-6 max-[463px]:flex max-[463px]:h-[40px]">
        <button>
          <CachedIcon />
        </button>
        <button>
          <KeyboardArrowDownIcon />
        </button>
      </div>
    </div>
    <div className="overflow-x-auto w-full">
      <table className="mt-8 w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 font-semibold text-[#27004a] whitespace-nowrap text-[12px] border-b text-center border-t border-r border-l border-[#DBDBDB] max-[600px]:text-[10px]">
              ID
            </th>
            <th className="px-4 py-2 font-semibold text-[#27004a] whitespace-nowrap text-[12px] border-b text-center border border-[#DBDBDB] max-[600px]:text-[10px]">
              User Name
            </th>
            <th className="px-4 py-2 font-semibold text-[#27004a] whitespace-nowrap text-[12px] border-b text-center border border-[#DBDBDB] max-[600px]:text-[10px]">
              Plan Name
            </th>
            <th className="px-4 py-2 font-semibold text-[#27004a] whitespace-nowrap text-[12px] border-b text-center border border-[#DBDBDB] max-[600px]:text-[10px]">
              Payment method
            </th>

            <th className="px-4 py-2 font-semibold text-[#27004a]  whitespace-nowrap text-[12px] border-b text-center border border-[#DBDBDB] max-[600px]:text-[10px]">
              Status
            </th>

            <th className="px-4 py-2 font-semibold text-[#27004a] whitespace-nowrap text-[12px] border-b text-center border border-[#DBDBDB] max-[600px]:text-[10px]">
              Charging Price
            </th>

            <th className="px-4 py-2 font-semibold text-[#27004a] whitespace-nowrap text-[12px] border-b text-center border border-[#DBDBDB] max-[600px]:text-[10px]">
              Features
            </th>

            <th className="px-4 py-2 font-semibold text-[#27004a] whitespace-nowrap text-[12px] border-b text-center border border-[#DBDBDB] max-[600px]:text-[10px]">
              Tenure
            </th>

            <th className="px-4 py-2 font-semibold text-[#27004a] whitespace-nowrap text-[12px] border-b text-center border border-[#DBDBDB] max-[600px]:text-[10px]">
              Started at
            </th>
            <th className="px-4 py-2 font-semibold text-[#27004a] whitespace-nowrap text-[12px] border-b text-center border border-[#DBDBDB] max-[600px]:text-[10px]">
              End Date
            </th>
          </tr>
        </thead>

        <tbody></tbody>
      </table>
      </div>
    </div>
  </div>
    </div>
  );
};

export default Transctions;
