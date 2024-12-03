import React, { useEffect, useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DownloadIcon from "@mui/icons-material/Download";
import SettingsIcon from "@mui/icons-material/Settings";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Link } from "react-router-dom";
import DailyWorkEntry from "./DailyWorkEntry";
import TrackTime from "./TrackTime";
import AttendenceSetting from "./AttendenceSetting";

export default function SettingPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDailyWork, setOpenDailyWork] = useState(false);
  const [openTrackTime, setOpenTrackTime] = useState(false);
  const [openAttendenceSetting, setOpenAttendenceSetting] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [isOn, setIsOn] = useState(false);
  useEffect(() => {
    console.log(openDailyWork);
  }, [openDailyWork]);
  useEffect(() => {
    console.log(openTrackTime);
  }, [openTrackTime]);
  useEffect(() => {
    console.log(openAttendenceSetting);
  }, [openAttendenceSetting]);

  const onOpenModal = () => setOpenDailyWork(true);
  // const onOpenModal = () => setOpenTrackTime(true);

  return (
    <div className="relative text-right">
      <DailyWorkEntry
        isOpen={openDailyWork}
        setIsOpen={setOpenDailyWork} // Pass state and handler as props
      />

      <TrackTime open={openTrackTime} setOpen={setOpenTrackTime} />
      <AttendenceSetting
        open={openAttendenceSetting}
        setOpen={setOpenAttendenceSetting}
      />

      <div className="flex justify-between gap-2 md:gap-5 flex-wrap items-center">
        <div className="flex gap-[10px] summary-bold">
          <h1 className="font-semibold summary-attend whitespace-nowrap">
            Attendence Summary
          </h1>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            className=" text-[#8e54c2] mr-[10px] text-[14px] font-semibold"
            to="#"
          >
            Unprocessed Logs <FilterListIcon className="icon-filter" />
          </button>
          <button
            className=" text-[#8e54c2] mr-[10px] text-[14px] font-semibold"
            to="#"
          >
            Daily Report <DownloadIcon className="icon-filter" />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className=" text-[#8e54c2] mr-[10px] text-[14px] font-semibold "
            to="#"
          >
            Setting <SettingsIcon className="icon-filter" />
          </button>
        </div>
      </div>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute z-10 mt-2 bg-white border rounded-md shadow-lg right-[24px] w-[500px]">
          <ul>
            <li className="p[0] ">
              <Link
                onClick={() => setOpenAttendenceSetting(true)}
                className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer "
              >
                <span className="text-gray-700 enable-staff-panel">
                  Attendance
                </span>
                <div className="flex items-center text-gray-500">
                  <span className="enable-staff-panel">Selfie & Location</span>
                  <KeyboardArrowRightIcon className="h-5 w-5 ml-2" />
                </div>
              </Link>
            </li>
            <li className="p-[0]">
              <Link
                to="#"
                onClick={() => setOpenDailyWork(true)}
                className="flex  items-center justify-between p-4 hover:bg-gray-50 cursor-pointer "
              >
                <span
                  className="text-gray-700 enable-staff-panel"
                  // Open the modal on click
                >
                  Daily Work Entry
                </span>

                <div className="flex items-center text-gray-500">
                  <span className="enable-staff-panel">
                    Enabled (11 Staffs)
                  </span>
                  <KeyboardArrowRightIcon className="h-5 w-5 ml-2" />
                </div>
              </Link>
            </li>
            <li className="p-[0]">
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer ">
                <span className="text-gray-700 enable-staff-panel">
                  Weekly Holiday
                </span>
                <div className="flex items-center text-gray-500">
                  <span className="enable-staff-panel">Select</span>
                  <KeyboardArrowRightIcon className="h-5 w-5 ml-2" />
                </div>
              </div>
            </li>
            <li className="p-[0]">
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer">
                <span className="text-gray-700 enable-staff-panel">
                  Send SMS to Staff
                </span>
                <div
                  className={`relative w-14 h-8 flex items-center rounded-full p-1 cursor-pointer ${
                    isOn ? "bg-[#27004a]" : "bg-gray-300"
                  }`}
                  onClick={toggleSwitch}
                >
                  <div
                    className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${
                      isOn ? "translate-x-6" : "translate-x-0"
                    }`}
                  ></div>
                </div>
              </div>
            </li>
            <li className="p-[0] ">
              <Link
                onClick={() => setOpenTrackTime(true)}
                className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer "
              >
                <span className="text-gray-700 enable-staff-panel">
                  Track In/Out Time
                </span>
                <span className="text-gray-500 enable-staff-panel">
                  Enabled
                </span>
              </Link>
            </li>
            <li className="p-[0]">
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer ">
                <span className="text-gray-700 enable-staff-panel">
                  Device List
                </span>
                <div className="flex items-center text-gray-500">
                  <span className="enable-staff-panel">Select</span>
                  <KeyboardArrowRightIcon className="h-5 w-5 ml-2" />
                </div>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
