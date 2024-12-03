import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import DownloadIcon from "@mui/icons-material/Download";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import WarningIcon from "@mui/icons-material/Warning";
import ShareIcon from "@mui/icons-material/Share";
import DescriptionIcon from "@mui/icons-material/Description";
import LockIcon from "@mui/icons-material/Lock";
import PaidIcon from "@mui/icons-material/Paid";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import PrintIcon from "@mui/icons-material/Print";
import { IoMdArrowDropright } from "react-icons/io";

const RunPayroll = ({ toggleRunTab }) => {
  let subtitle;

  useEffect(() => {
    console.log(toggleRunTab);
  }, [toggleRunTab]);

  const [toggleDrop11, setToggleDrop11] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    console.log(toggleRunTab);
  }, [toggleRunTab]);

  function handledrop11() {
    setToggleDrop11(!toggleDrop11);
  }

  const [toggleDrop37, setToggleDrop37] = useState(false);

  function handledrop37() {
    setToggleDrop37(!toggleDrop37);
  }

  const [toggleDrop38, setToggleDrop38] = useState(false);

  function handledrop38() {
    setToggleDrop38(!toggleDrop38);
  }

  const [modalIsOpen9, setIsOpen9] = React.useState(false);
  function openModal9() {
    setIsOpen9(true);
  }
  function afterOpenModal9() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#000";
  }

  function closeModal9() {
    setIsOpen9(false);
  }

  const [modalIsOpen10, setIsOpen10] = React.useState(false);
  function openModal10() {
    setIsOpen10(true);
  }
  function afterOpenModal10() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#000";
  }

  function closeModal10() {
    setIsOpen10(false);
  }

  const [modalIsOpen12, setIsOpen12] = React.useState(false);
  function openModal12() {
    setIsOpen12(true);
  }
  function afterOpenModal12() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#000";
  }

  function closeModal12() {
    setIsOpen12(false);
  }

  const [modalIsOpen13, setIsOpen13] = React.useState(false);
  function openModal13() {
    setIsOpen13(true);
  }
  function afterOpenModal13() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#000";
  }

  function closeModal13() {
    setIsOpen13(false);
  }

  const [modalIsOpen14, setIsOpen14] = React.useState(false);
  function openModal14() {
    setIsOpen14(true);
  }
  function afterOpenModal14() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#000";
  }

  function closeModal14() {
    setIsOpen14(false);
  }

  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDrop = (dropdown) => {
    setActiveDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  const handleClickOutside = (event) => {
    handleClickOutside2(event);
    if (!event.target.closest(".dropdown-container")) {
      setActiveDropdown(null);
    }
  };

  const handleClickOutside2 = (event) => {
    if (!event.target.closest(".pay-slip2")) {
      setToggleDrop37(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="mt-[20px] ">
      <div className="flex flex-col py-3 mt-3">
        <div className="flex justify-between items-start  flex-col xl:flex-row lg:flex-row  xl:items-center lg:items-center md:flex-col gap-[15px] lg:gap-[0px]">
          <div className="flex gap-[20px] flex-col xl:flex-row lg:flex-row w-full">
            <button
              className="text-[14px] font-normal flex items-center gap-[8px] whitespace-nowrap xl:p-[0] lg:p-[0]  xl:bg-[#fff] lg:bg-[#fff]  bg-[#f4f5f9] p-[9px] rounded-[9px]"
              onClick={openModal10}
            >
              <DescriptionIcon className="sheet-icon" />
              Salary Sheet
            </button>

            <button
              className="text-[14px] font-normal flex items-center gap-[8px] whitespace-nowrap xl:p-[0] lg:p-[0]  xl:bg-[#fff] lg:bg-[#fff]  bg-[#f4f5f9] p-[9px] rounded-[9px]"
              onClick={openModal12}
            >
              <LockIcon className="sheet-icon" />
              Finalize Payroll
            </button>

            <button
              className="text-[14px] font-normal flex items-center gap-[8px] whitespace-nowrap xl:p-[0] lg:p-[0]  xl:bg-[#fff] lg:bg-[#fff]  bg-[#f4f5f9] p-[9px] rounded-[9px]"
              onClick={openModal13}
            >
              <PaidIcon className="sheet-icon" />
              Save Payment
            </button>

            <button
              className="text-[14px] font-normal flex items-center gap-[8px] whitespace-nowrap xl:p-[0] lg:p-[0]  xl:bg-[#fff] lg:bg-[#fff]  bg-[#f4f5f9] p-[9px] rounded-[9px]"
              onClick={openModal14}
            >
              <CreditScoreIcon className="sheet-icon" />
              Pay Online
            </button>

            <div className="relative flex">
              <button
                className=" text-[14px] font-normal flex w-full items-center gap-[8px] whitespace-nowrap xl:p-[0] lg:p-[0]  xl:bg-[#fff] lg:bg-[#fff]  bg-[#f4f5f9] p-[9px] rounded-[9px]"
                onClick={handledrop38}
              >
                <PrintIcon className="sheet-icon" />
                Pay Slips
              </button>
              {toggleDrop38 && (
                <div
                  className="absolute w-[98%] xl:w-[300px] xl:left-[-270px]  lg:w-[200px] lg:left-[-100px]  md:w-[200px] md:left-[-100px] left-[4px] right-0 z-10 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white set-shadow ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabindex="-1"
                >
                  <div className="py-1" role="none">
                    <NavLink
                      to="#"
                      className=" hover:bg-[#e3e3e3] px-4 py-2 text-sm text-gray-700 flex gap-[10px] items-center"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-1"
                    >
                      <DownloadIcon className="text-[#27004a] font-normal text-[18px]" />{" "}
                      Download Pay Slip
                    </NavLink>
                    <NavLink
                      to="#"
                      className=" hover:bg-[#e3e3e3] px-4 py-2 text-sm text-gray-700 flex gap-[10px] items-center"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-0"
                    >
                      <ShareIcon className="text-[#27004a] font-normal text-[18px]" />{" "}
                      Share Pay Slip
                    </NavLink>
                  </div>
                </div>
              )}
            </div>

            <div className="relative text-end ">
              <button
                className="pay-slip2 bg-[#e5e7eb] text-[#000] p-[3px] text-[16px] font-normal rounded-md"
                onClick={handledrop37}
              >
                <MoreVertIcon />
              </button>

              {toggleDrop37 && (
                <div
                  className="absolute w-[98%] xl:w-[300px] xl:left-[-270px]  lg:w-[200px] lg:left-[-100px]  md:w-[200px] md:left-[-100px] left-[4px] right-0 z-10 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white set-shadow ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabindex="-1"
                >
                  <div className="py-1" role="none">
                    <NavLink
                      to="/calender"
                      className=" hover:bg-[#e3e3e3] px-4 py-2 text-sm text-gray-700 flex gap-[10px] items-center"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-1"
                    >
                      <UploadFileIcon className="text-[#27004a] font-normal text-[18px]" />{" "}
                      Import Earnings
                    </NavLink>
                    <NavLink
                      to="/day-wise"
                      className=" hover:bg-[#e3e3e3] px-4 py-2 text-sm text-gray-700 flex gap-[10px] items-center"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-0"
                    >
                      <UploadFileIcon className="text-[#27004a] font-normal text-[18px]" />{" "}
                      Import Deductions
                    </NavLink>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button className="second-btn mb-2" onClick={openModal9}>
            Filter
          </button>
        </div>
        <div className="flex justify-between items-start   xl:items-center lg:items-center gap-[10px] flex-col xl:flex-row lg:flex-row mb-4">
          <div className="relative xl:w-[240px] lg:w-[240px] w-full">
            <input
              type="text"
              placeholder="Search"
              className="border rounded-full pr-[40px]  p-[8px] w-[100%]  focus-visible:outline-none"
            />
            <SearchIcon className="absolute right-[10px] top-[10px] text-gray-500" />
          </div>

          <div className="flex items-center gap-[10px]">
            <input
              type="checkbox"
              onClick={handledrop11}
              id="breakdown"
              name="breakdown"
              value="breakdown"
            />
            <label for="breakdown"> Show Salary Breakdown</label>
          </div>
        </div>
      </div>

      <div className=" mt-5 ">
        {/* <div className="mt-5"> */}

        <div className="bg-white  rounded-lg  shadow-cs border border-[#dcdbdb] overflow-x-auto  h[100%]">
          <table className="w-full table-auto border border-[#dcdbdb] rounded-lg overflow-hidden border-collapse">
            <thead className="cursor-pointer  border border-gray-300 shadow-md">
              <th className="border-r p-[10px] flex justify-center text-xs font-medium whitespace-nowrap text-center">
                #
              </th>

              <th className="border-r p-[10px] text-xs font-medium whitespace-nowrap text-center">
                <div className="flex">
                  Name
                  <div className="relative dropdown-container">
                    <button onClick={() => handleDrop("name")}>
                      <FilterListIcon className="filter-icon" />
                    </button>

                    {activeDropdown === "name" && (
                      <div
                        className="absolute left-[0px] z-10 text-left mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        tabIndex="-1"
                      >
                        <div className="py-1" role="none">
                          <Link
                            to="/add-one-staff"
                            className="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            tabIndex="-1"
                            id="menu-item-0"
                          >
                            Sort A to Z
                          </Link>
                          <Link
                            to="#"
                            className="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            tabIndex="-1"
                            id="menu-item-1"
                          >
                            Sort Z to A
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </th>
              <th className="border-r p-[10px] text-xs font-medium whitespace-nowrap text-center">
                <div className="flex">
                  Job Title
                  <div className="relative dropdown-container">
                    <button onClick={() => handleDrop("jobTitle")}>
                      <FilterListIcon className="filter-icon" />
                    </button>

                    {activeDropdown === "jobTitle" && (
                      <div
                        className="absolute left-[0px] z-10 text-left mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        tabIndex="-1"
                      >
                        <div className="py-1" role="none">
                          <Link
                            to="/add-one-staff"
                            className="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            tabIndex="-1"
                            id="menu-item-0"
                          >
                            Sort A to Z
                          </Link>
                          <Link
                            to="#"
                            className="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            tabIndex="-1"
                            id="menu-item-1"
                          >
                            Sort Z to A
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </th>
              <th className="border-r p-[10px] text-xs font-medium whitespace-nowrap text-center">
                <div className="flex">
                  Payroll Finalized
                  <div className="relative dropdown-container">
                    <button onClick={() => handleDrop("payroll")}>
                      <FilterListIcon className="filter-icon" />
                    </button>

                    {activeDropdown === "payroll" && (
                      <div
                        className="absolute left-[0px] z-10 text-left mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        tabIndex="-1"
                      >
                        <div className="py-1" role="none">
                          <Link
                            to="/add-one-staff"
                            className="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            tabIndex="-1"
                            id="menu-item-0"
                          >
                            Sort A to Z
                          </Link>
                          <Link
                            to="#"
                            className="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            tabIndex="-1"
                            id="menu-item-1"
                          >
                            Sort Z to A
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </th>
              <th className="border-r p-[10px] text-xs font-medium whitespace-nowrap text-center">
                <div className="flex">
                  CTC
                  <div className="relative dropdown-container">
                    <button onClick={() => handleDrop("ctc")}>
                      <FilterListIcon className="filter-icon" />
                    </button>

                    {activeDropdown === "ctc" && (
                      <div
                        className="absolute left-[0px] z-10 text-left mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        tabIndex="-1"
                      >
                        <div className="py-1" role="none">
                          <Link
                            to="/add-one-staff"
                            className="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            tabIndex="-1"
                            id="menu-item-0"
                          >
                            Sort A to Z
                          </Link>
                          <Link
                            to="#"
                            className="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            tabIndex="-1"
                            id="menu-item-1"
                          >
                            Sort Z to A
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </th>

              <th className="border-r p-[10px] text-xs font-medium whitespace-nowrap text-center">
                <div className="flex">
                  Payables
                  <div className="relative dropdown-container">
                    <button onClick={() => handleDrop("payables")}>
                      <FilterListIcon className="filter-icon" />
                    </button>

                    {activeDropdown === "payables" && (
                      <div
                        className="absolute left-[0px] z-10 text-left mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        tabIndex="-1"
                      >
                        <div className="py-1" role="none">
                          <Link
                            to="/add-one-staff"
                            className="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            tabIndex="-1"
                            id="menu-item-0"
                          >
                            Sort A to Z
                          </Link>
                          <Link
                            to="#"
                            className="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            tabIndex="-1"
                            id="menu-item-1"
                          >
                            Sort Z to A
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </th>

              <th className="border-r p-[10px] text-xs font-medium whitespace-nowrap text-center">
                <div className="flex">
                  Total Salary
                  <div className="relative dropdown-container">
                    <button onClick={() => handleDrop("totalsalary")}>
                      <FilterListIcon className="filter-icon" />
                    </button>

                    {activeDropdown === "totalsalary" && (
                      <div
                        className="absolute left-[0px] z-10 text-left mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        tabIndex="-1"
                      >
                        <div className="py-1" role="none">
                          <Link
                            to="/add-one-staff"
                            className="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            tabIndex="-1"
                            id="menu-item-0"
                          >
                            Sort A to Z
                          </Link>
                          <Link
                            to="#"
                            className="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            tabIndex="-1"
                            id="menu-item-1"
                          >
                            Sort Z to A
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </th>

              <th className="border-r p-[10px] text-xs font-medium whitespace-nowrap text-center">
                <div className="flex">
                  Paid
                  <div className="relative dropdown-container">
                    <button onClick={() => handleDrop("paid")}>
                      <FilterListIcon className="filter-icon" />
                    </button>

                    {activeDropdown === "paid" && (
                      <div
                        className="absolute left-[0px] z-10 text-left mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        tabIndex="-1"
                      >
                        <div className="py-1" role="none">
                          <Link
                            to="/add-one-staff"
                            className="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            tabIndex="-1"
                            id="menu-item-0"
                          >
                            Sort A to Z
                          </Link>
                          <Link
                            to="#"
                            className="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            tabIndex="-1"
                            id="menu-item-1"
                          >
                            Sort Z to A
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </th>

              <th className="border-r p-[10px] text-xs font-medium whitespace-nowrap text-center">
                <div className="flex">
                  Pending
                  <div className="relative dropdown-container">
                    <button onClick={() => handleDrop("pending")}>
                      <FilterListIcon className="filter-icon" />
                    </button>

                    {activeDropdown === "pending" && (
                      <div
                        className="absolute left-[0px] z-10 text-left mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        tabIndex="-1"
                      >
                        <div className="py-1" role="none">
                          <Link
                            to="/add-one-staff"
                            className="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            tabIndex="-1"
                            id="menu-item-0"
                          >
                            Sort A to Z
                          </Link>
                          <Link
                            to="#"
                            className="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            tabIndex="-1"
                            id="menu-item-1"
                          >
                            Sort Z to A
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </th>

              <th className="border-r p-[10px] text-xs font-medium whitespace-nowrap text-center">
                <div className="flex">
                  Slip Shared
                  <div className="relative dropdown-container">
                    <button onClick={() => handleDrop("slip")}>
                      <FilterListIcon className="filter-icon" />
                    </button>

                    {activeDropdown === "slip" && (
                      <div
                        className="absolute left-[0px] z-10 text-left mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        tabIndex="-1"
                      >
                        <div className="py-1" role="none">
                          <Link
                            to="/add-one-staff"
                            className="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            tabIndex="-1"
                            id="menu-item-0"
                          >
                            Sort A to Z
                          </Link>
                          <Link
                            to="#"
                            className="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            tabIndex="-1"
                            id="menu-item-1"
                          >
                            Sort Z to A
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </th>

              {/* <th className="border-r p-[10px] text-xs font-medium whitespace-nowrap text-center">
                <div className="flex">
                  Bank/UPI Verified
                  <div className="relative dropdown-container">
                    <button onClick={() => handleDrop("bank")}>
                      <FilterListIcon className="filter-icon" />
                    </button>

                    {activeDropdown === "bank" && (
                      <div
                        className="absolute left-[0px] z-10 text-left mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        tabIndex="-1"
                      >
                        <div className="py-1" role="none">
                          <Link
                            to="/add-one-staff"
                            className="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            tabIndex="-1"
                            id="menu-item-0"
                          >
                            Sort A to Z
                          </Link>
                          <Link
                            to="#"
                            className="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            tabIndex="-1"
                            id="menu-item-1"
                          >
                            Sort Z to A
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </th> */}

              {toggleDrop11 && (
                <>
                  <th className="border-r p-[10px] text-xs font-medium whitespace-nowrap text-center">
                    <div className="flex">
                      Total Earnings
                      <div className="relative dropdown-container">
                        <button onClick={() => handleDrop("total-earning")}>
                          <FilterListIcon className="filter-icon" />
                        </button>

                        {activeDropdown === "total-earning" && (
                          <div
                            className="absolute left-[0px] z-10 text-left mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                            tabIndex="-1"
                          >
                            <div className="py-1" role="none">
                              <Link
                                to="/add-one-staff"
                                className="block px-4 py-2 text-sm text-gray-700"
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-0"
                              >
                                Sort A to Z
                              </Link>
                              <Link
                                to="#"
                                className="block px-4 py-2 text-sm text-gray-700"
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-1"
                              >
                                Sort Z to A
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </th>

                  <th className="border-r p-[10px] text-xs font-medium whitespace-nowrap text-center">
                    <div className="flex">
                      Basic Salary
                      <div className="relative dropdown-container">
                        <button onClick={() => handleDrop("basic-salary")}>
                          <FilterListIcon className="filter-icon" />
                        </button>

                        {activeDropdown === "basic-salary" && (
                          <div
                            className="absolute left-[0px] z-10 text-left mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                            tabIndex="-1"
                          >
                            <div className="py-1" role="none">
                              <Link
                                to="/add-one-staff"
                                className="block px-4 py-2 text-sm text-gray-700"
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-0"
                              >
                                Sort A to Z
                              </Link>
                              <Link
                                to="#"
                                className="block px-4 py-2 text-sm text-gray-700"
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-1"
                              >
                                Sort Z to A
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </th>

                  <th className="border-r p-[10px] text-xs font-medium whitespace-nowrap text-center">
                    <div className="flex">
                      Work Basis Payment
                      <div className="relative dropdown-container">
                        <button onClick={() => handleDrop("work-base")}>
                          <FilterListIcon className="filter-icon" />
                        </button>

                        {activeDropdown === "work-base" && (
                          <div
                            className="absolute left-[0px] z-10 text-left mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                            tabIndex="-1"
                          >
                            <div className="py-1" role="none">
                              <Link
                                to="/add-one-staff"
                                className="block px-4 py-2 text-sm text-gray-700"
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-0"
                              >
                                Sort A to Z
                              </Link>
                              <Link
                                to="#"
                                className="block px-4 py-2 text-sm text-gray-700"
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-1"
                              >
                                Sort Z to A
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </th>

                  <th className="border-r p-[10px] text-xs font-medium whitespace-nowrap text-center">
                    <div className="flex">
                      Incentives
                      <div className="relative dropdown-container">
                        <button onClick={() => handleDrop("incentives")}>
                          <FilterListIcon className="filter-icon" />
                        </button>

                        {activeDropdown === "incentives" && (
                          <div
                            className="absolute left-[0px] z-10 text-left mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                            tabIndex="-1"
                          >
                            <div className="py-1" role="none">
                              <Link
                                to="/add-one-staff"
                                className="block px-4 py-2 text-sm text-gray-700"
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-0"
                              >
                                Sort A to Z
                              </Link>
                              <Link
                                to="#"
                                className="block px-4 py-2 text-sm text-gray-700"
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-1"
                              >
                                Sort Z to A
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </th>
                  <th className="border-r p-[10px] text-xs font-medium whitespace-nowrap text-center">
                    <div className="flex">
                      Reimbrusments
                      <div className="relative dropdown-container">
                        <button onClick={() => handleDrop("Reimbrusments")}>
                          <FilterListIcon className="filter-icon" />
                        </button>

                        {activeDropdown === "Reimbrusments" && (
                          <div
                            className="absolute left-[0px] z-10 text-left mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                            tabIndex="-1"
                          >
                            <div className="py-1" role="none">
                              <Link
                                to="/add-one-staff"
                                className="block px-4 py-2 text-sm text-gray-700"
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-0"
                              >
                                Sort A to Z
                              </Link>
                              <Link
                                to="#"
                                className="block px-4 py-2 text-sm text-gray-700"
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-1"
                              >
                                Sort Z to A
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </th>
                  <th className="border-r p-[10px] text-xs font-medium whitespace-nowrap text-center">
                    <div className="flex">
                      Bonus
                      <div className="relative dropdown-container">
                        <button onClick={() => handleDrop("Bonus")}>
                          <FilterListIcon className="filter-icon" />
                        </button>

                        {activeDropdown === "Bonus" && (
                          <div
                            className="absolute left-[0px] z-10 text-left mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                            tabIndex="-1"
                          >
                            <div className="py-1" role="none">
                              <Link
                                to="/add-one-staff"
                                className="block px-4 py-2 text-sm text-gray-700"
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-0"
                              >
                                Sort A to Z
                              </Link>
                              <Link
                                to="#"
                                className="block px-4 py-2 text-sm text-gray-700"
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-1"
                              >
                                Sort Z to A
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </th>
                  <th className="border-r p-[10px] text-xs font-medium whitespace-nowrap text-center">
                    <div className="flex">
                      Overtime Pay
                      <div className="relative dropdown-container">
                        <button onClick={() => handleDrop("Overtime")}>
                          <FilterListIcon className="filter-icon" />
                        </button>

                        {activeDropdown === "Overtime" && (
                          <div
                            className="absolute left-[0px] z-10 text-left mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                            tabIndex="-1"
                          >
                            <div className="py-1" role="none">
                              <Link
                                to="/add-one-staff"
                                className="block px-4 py-2 text-sm text-gray-700"
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-0"
                              >
                                Sort A to Z
                              </Link>
                              <Link
                                to="#"
                                className="block px-4 py-2 text-sm text-gray-700"
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-1"
                              >
                                Sort Z to A
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </th>
                  <th className="border-r p-[10px] text-xs font-medium whitespace-nowrap text-center">
                    <div className="flex">
                      Other Earnings
                      <div className="relative dropdown-container">
                        <button onClick={() => handleDrop("Earnings")}>
                          <FilterListIcon className="filter-icon" />
                        </button>

                        {activeDropdown === "Earnings" && (
                          <div
                            className="absolute left-[0px] z-10 text-left mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                            tabIndex="-1"
                          >
                            <div className="py-1" role="none">
                              <Link
                                to="/add-one-staff"
                                className="block px-4 py-2 text-sm text-gray-700"
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-0"
                              >
                                Sort A to Z
                              </Link>
                              <Link
                                to="#"
                                className="block px-4 py-2 text-sm text-gray-700"
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-1"
                              >
                                Sort Z to A
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </th>
                  <th className="border-r p-[10px] text-xs font-medium whitespace-nowrap text-center">
                    <div className="flex">
                      Employee PF
                      <div className="relative dropdown-container">
                        <button onClick={() => handleDrop("Employee")}>
                          <FilterListIcon className="filter-icon" />
                        </button>

                        {activeDropdown === "Employee" && (
                          <div
                            className="absolute left-[0px] z-10 text-left mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                            tabIndex="-1"
                          >
                            <div className="py-1" role="none">
                              <Link
                                to="/add-one-staff"
                                className="block px-4 py-2 text-sm text-gray-700"
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-0"
                              >
                                Sort A to Z
                              </Link>
                              <Link
                                to="#"
                                className="block px-4 py-2 text-sm text-gray-700"
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-1"
                              >
                                Sort Z to A
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </th>
                  <th className="border-r p-[10px] text-xs font-medium whitespace-nowrap text-center">
                    <div className="flex">
                      Employee ESI
                      <div className="relative dropdown-container">
                        <button onClick={() => handleDrop("EmployeeESI")}>
                          <FilterListIcon className="filter-icon" />
                        </button>

                        {activeDropdown === "EmployeeESI" && (
                          <div
                            className="absolute left-[0px] z-10 text-left mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                            tabIndex="-1"
                          >
                            <div className="py-1" role="none">
                              <Link
                                to="/add-one-staff"
                                className="block px-4 py-2 text-sm text-gray-700"
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-0"
                              >
                                Sort A to Z
                              </Link>
                              <Link
                                to="#"
                                className="block px-4 py-2 text-sm text-gray-700"
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-1"
                              >
                                Sort Z to A
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </th>
                  <th className="border-r p-[10px] text-xs font-medium whitespace-nowrap text-center">
                    <div className="flex">
                      PF EDLI & Admin Charges
                      <div className="relative dropdown-container">
                        <button onClick={() => handleDrop("edli")}>
                          <FilterListIcon className="filter-icon" />
                        </button>

                        {activeDropdown === "edli" && (
                          <div
                            className="absolute left-[0px] z-10 text-left mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                            tabIndex="-1"
                          >
                            <div className="py-1" role="none">
                              <Link
                                to="/add-one-staff"
                                className="block px-4 py-2 text-sm text-gray-700"
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-0"
                              >
                                Sort A to Z
                              </Link>
                              <Link
                                to="#"
                                className="block px-4 py-2 text-sm text-gray-700"
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-1"
                              >
                                Sort Z to A
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </th>
                  <th className="border-r p-[10px] text-xs font-medium whitespace-nowrap text-center">
                    <div className="flex">
                      Employee LWF
                      <div className="relative dropdown-container">
                        <button onClick={() => handleDrop("em-lwf")}>
                          <FilterListIcon className="filter-icon" />
                        </button>

                        {activeDropdown === "em-lwf" && (
                          <div
                            className="absolute left-[0px] z-10 text-left mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                            tabIndex="-1"
                          >
                            <div className="py-1" role="none">
                              <Link
                                to="/add-one-staff"
                                className="block px-4 py-2 text-sm text-gray-700"
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-0"
                              >
                                Sort A to Z
                              </Link>
                              <Link
                                to="#"
                                className="block px-4 py-2 text-sm text-gray-700"
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-1"
                              >
                                Sort Z to A
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </th>
                  <th className="border-r p-[10px] text-xs font-medium whitespace-nowrap text-center">
                    <div className="flex">
                      Professional Tax
                      <div className="relative dropdown-container">
                        <button onClick={() => handleDrop("professional")}>
                          <FilterListIcon className="filter-icon" />
                        </button>

                        {activeDropdown === "professional" && (
                          <div
                            className="absolute left-[0px] z-10 text-left mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                            tabIndex="-1"
                          >
                            <div className="py-1" role="none">
                              <Link
                                to="/add-one-staff"
                                className="block px-4 py-2 text-sm text-gray-700"
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-0"
                              >
                                Sort A to Z
                              </Link>
                              <Link
                                to="#"
                                className="block px-4 py-2 text-sm text-gray-700"
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-1"
                              >
                                Sort Z to A
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </th>
                  <th className="border-r p-[10px] text-xs font-medium whitespace-nowrap text-center">
                    <div className="flex">
                      Late Fine
                      <div className="relative dropdown-container">
                        <button onClick={() => handleDrop("latefine")}>
                          <FilterListIcon className="filter-icon" />
                        </button>

                        {activeDropdown === "latefine" && (
                          <div
                            className="absolute left-[0px] z-10 text-left mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                            tabIndex="-1"
                          >
                            <div className="py-1" role="none">
                              <Link
                                to="/add-one-staff"
                                className="block px-4 py-2 text-sm text-gray-700"
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-0"
                              >
                                Sort A to Z
                              </Link>
                              <Link
                                to="#"
                                className="block px-4 py-2 text-sm text-gray-700"
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-1"
                              >
                                Sort Z to A
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </th>
                  <th className="border-r p-[10px] text-xs font-medium whitespace-nowrap text-center">
                    <div className="flex">
                      Early Fine
                      <div className="relative dropdown-container">
                        <button onClick={() => handleDrop("earlyfine")}>
                          <FilterListIcon className="filter-icon" />
                        </button>

                        {activeDropdown === "earlyfine" && (
                          <div
                            className="absolute left-[0px] z-10 text-left mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                            tabIndex="-1"
                          >
                            <div className="py-1" role="none">
                              <Link
                                to="/add-one-staff"
                                className="block px-4 py-2 text-sm text-gray-700"
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-0"
                              >
                                Sort A to Z
                              </Link>
                              <Link
                                to="#"
                                className="block px-4 py-2 text-sm text-gray-700"
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-1"
                              >
                                Sort Z to A
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </th>
                  <th className="border-r p-[10px] text-xs font-medium whitespace-nowrap text-center">
                    <div className="flex">
                      Other Deductions
                      <div className="relative dropdown-container">
                        <button onClick={() => handleDrop("Deductions")}>
                          <FilterListIcon className="filter-icon" />
                        </button>

                        {activeDropdown === "Deductions" && (
                          <div
                            className="absolute left-[0px] z-10 text-left mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                            tabIndex="-1"
                          >
                            <div className="py-1" role="none">
                              <Link
                                to="/add-one-staff"
                                className="block px-4 py-2 text-sm text-gray-700"
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-0"
                              >
                                Sort A to Z
                              </Link>
                              <Link
                                to="#"
                                className="block px-4 py-2 text-sm text-gray-700"
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-1"
                              >
                                Sort Z to A
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </th>
                  <th className="border-r p-[10px] text-xs font-medium whitespace-nowrap text-center">
                    <div className="flex">
                      Loan Payment
                      <div className="relative dropdown-container">
                        <button onClick={() => handleDrop("loan")}>
                          <FilterListIcon className="filter-icon" />
                        </button>

                        {activeDropdown === "loan" && (
                          <div
                            className="absolute left-[0px] z-10 text-left mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                            tabIndex="-1"
                          >
                            <div className="py-1" role="none">
                              <Link
                                to="/add-one-staff"
                                className="block px-4 py-2 text-sm text-gray-700"
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-0"
                              >
                                Sort A to Z
                              </Link>
                              <Link
                                to="#"
                                className="block px-4 py-2 text-sm text-gray-700"
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-1"
                              >
                                Sort Z to A
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </th>
                  <th className="border-r p-[10px] text-xs font-medium whitespace-nowrap text-center">
                    <div className="flex">
                      Pending
                      <div className="relative dropdown-container">
                        <button onClick={() => handleDrop("pending")}>
                          <FilterListIcon className="filter-icon" />
                        </button>

                        {activeDropdown === "pending" && (
                          <div
                            className="absolute left-[0px] z-10 text-left mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                            tabIndex="-1"
                          >
                            <div className="py-1" role="none">
                              <Link
                                to="/add-one-staff"
                                className="block px-4 py-2 text-sm text-gray-700"
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-0"
                              >
                                Sort A to Z
                              </Link>
                              <Link
                                to="#"
                                className="block px-4 py-2 text-sm text-gray-700"
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-1"
                              >
                                Sort Z to A
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </th>
                </>
              )}
            </thead>
            <tbody>
              <tr className="border">
                <td className="border-r p-[10px] text-xs font-medium whitespace-nowrap text-center">
                  <input
                    type="checkbox"
                    className="border border-1 rounded-md"
                  />
                </td>
                <td className="border-r p-[10px] text-xs font-medium whitespace-nowrap text-center">
                  N/A
                </td>
                <td className="border-r p-[10px] text-xs font-medium whitespace-nowrap text-center">
                  N/A
                </td>
                <td className="border-r p-[10px] text-xs font-medium whitespace-nowrap text-center">
                  {" "}
                  N/A
                </td>
                <td className="border-r p-[10px] text-xs font-medium whitespace-nowrap text-center">
                  N/A
                </td>
                <td className="border-r p-[10px] text-xs font-medium whitespace-nowrap text-center">
                  N/A
                </td>
                <td className="border-r p-[10px] text-xs font-medium whitespace-nowrap text-center">
                  {" "}
                  N/A
                </td>
                <td className="border-r p-[10px] text-xs font-medium whitespace-nowrap text-center">
                  {" "}
                  N/A
                </td>
                <td className="border-r p-[10px] text-xs font-medium whitespace-nowrap text-center">
                  {" "}
                  N/A
                </td>
                <td className="border-r p-[10px] text-xs font-medium whitespace-nowrap text-center">
                  {" "}
                  N/A
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-full mb-0">
          <h2 className="whitespace-nowrap pt-[10px] pb-[10px]  text-left pl-2">
            Grand Total
          </h2>
        </div>
        {/* </div> */}
      </div>

      <Modal
        isOpen={modalIsOpen9}
        onAfterOpen={afterOpenModal9}
        onRequestClose={closeModal9}
        // style={customStyles}
        contentLabel="Example Modal"
        className="w-[96%] xl:w-[40%] absolute top-[50%] left-[50%] bottom-auto p-0 bg-[#fff] shadow-md rounded-[10px] translate-x-[-50%] translate-y-[-50%]"
      >
        <h2
          ref={(_subtitle) => (subtitle = _subtitle)}
          className="border-b p-3     text-[14px]   rounded-b-none rounded-t-lg"
        >
          Apply Filters
        </h2>
        <button
          onClick={closeModal9}
          className="absolute right-[5px] top-[3px] font-semibold	  bg-[#27004a] rounded-full"
        >
          <CloseIcon className="text-white" />
        </button>
        <div className="pb-2 p-[10px]">
          <div className="mb-2">
            <label htmlFor="" className="text-[14px] font-medium">
              Payroll Month
            </label>
            <br />
            <input
              type="date"
              className="border rounded-md  p-[8px]  w-[100%] focus-visible:outline-none text-sm"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="" className="text-[14px] font-medium">
              Salary Type
            </label>
            <br />
            <select className="border rounded-md  p-[8px] w-[100%] focus-visible:outline-none text-sm">
              <option>All Branches</option>
              <option>Demo Main Branchs</option>
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="" className="text-[14px] font-medium">
              Company Branches
            </label>
            <br />
            <select className="border rounded-md   p-[8px] w-[100%] focus-visible:outline-none text-sm">
              <option>All Branches</option>
              <option>Demo Main Branchs</option>
            </select>
          </div>

          <div className="mb-2">
            <label htmlFor="" className="text-[14px] font-medium">
              Departments
            </label>
            <br />
            <select className="border rounded-md   p-[8px]  w-[100%] focus-visible:outline-none text-sm">
              <option>All Departments</option>
              <option>Website</option>
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="" className="text-[14px] font-medium">
              Date of Joining
            </label>
            <br />
            <input
              type="date"
              className="border rounded-md   p-[8px] w-[100%] focus-visible:outline-none text-sm"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="" className="text-[14px] font-medium">
              Date of Living
            </label>
            <br />
            <input
              type="date"
              className="border rounded-md  p-[8px]   w-[100%] focus-visible:outline-none text-sm"
            />
          </div>
          <div className="  mb-2   flex items-end ">
            <div className="flex  items-center gap-[10px]">
              <input
                type="checkbox"
                id="incentive"
                name="incentive"
                value="incentive"
              />
              <label for="incentive"> Show Incentive Staff</label>
            </div>
          </div>

          <div className="flex justify-end p-2 gap-[10px] border-t">
            <button className="first-btn" onClick={closeModal9}>
              Reset
            </button>
            <button className="second-btn">Apply</button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalIsOpen10}
        onAfterOpen={afterOpenModal10}
        onRequestClose={closeModal10}
        // style={customStyles}
        contentLabel="Example Modal"
        className="w-[96%] xl:w-[40%] absolute top-[50%] left-[50%] bottom-auto p-0 bg-[#fff] shadow-md rounded-[10px] translate-x-[-50%] translate-y-[-50%]"
      >
        <h2
          ref={(_subtitle) => (subtitle = _subtitle)}
          className="border-b p-3     text-[14px]   bg-[#F0F6FE] rounded-t-lg  rounded-b-none"
        >
          No Staff Selected
        </h2>
        <button
          onClick={closeModal10}
          className="absolute right-[5px] top-[3px] font-semibold	  bg-[#27004a] rounded-full"
        >
          <CloseIcon className="text-white" />
        </button>
        <div className="pb-2 p-[10px]">
          <div className="text-center pt-[30px] pb-[30px]">
            <WarningIcon className="text-red-600 transition warning-icon" />
            <p className="mt-3">
              Please select staff to download salary sheet.
            </p>
          </div>

          <div className="flex justify-end p-2 gap-[10px] border-t">
            <button className="second-btn">Okay</button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalIsOpen12}
        onAfterOpen={afterOpenModal12}
        onRequestClose={closeModal12}
        // style={customStyles}
        contentLabel="Example Modal"
        className="w-[96%] xl:w-[40%] absolute top-[50%] left-[50%] bottom-auto p-0 bg-[#fff] shadow-md rounded-[10px] translate-x-[-50%] translate-y-[-50%]"
      >
        <h2
          ref={(_subtitle) => (subtitle = _subtitle)}
          className="border-b p-3     text-[14px]   bg-[#F0F6FE] rounded-t-lg  rounded-b-none"
        >
          No Staff Selected
        </h2>
        <button
          onClick={closeModal12}
          className="absolute right-[5px] top-[3px] font-semibold	  bg-[#27004a] rounded-full"
        >
          <CloseIcon className="text-white" />
        </button>
        <div className="pb-2 p-[10px]">
          <div className="text-center pt-[30px] pb-[30px]">
            <WarningIcon className="text-red-600 transition warning-icon" />
            <p className="mt-3">Please select staff to Finalize Payroll</p>
          </div>

          <div className="flex justify-end p-2 gap-[10px] border-t">
            <button className="second-btn">Okay</button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalIsOpen13}
        onAfterOpen={afterOpenModal13}
        onRequestClose={closeModal13}
        // style={customStyles}
        contentLabel="Example Modal"
        className="w-[96%] xl:w-[40%] absolute top-[50%] left-[50%] bottom-auto p-0 bg-[#fff] shadow-md rounded-[10px] translate-x-[-50%] translate-y-[-50%]"
      >
        <h2
          ref={(_subtitle) => (subtitle = _subtitle)}
          className="border-b p-3     text-[14px]   bg-[#F0F6FE] rounded-t-lg  rounded-b-none"
        >
          No Staff Selected
        </h2>
        <button
          onClick={closeModal13}
          className="absolute right-[5px] top-[3px] font-semibold	  bg-[#27004a] rounded-full"
        >
          <CloseIcon className="text-white" />
        </button>
        <div className="pb-2 p-[10px]">
          <div className="text-center pt-[30px] pb-[30px]">
            <WarningIcon className="text-red-600 transition warning-icon" />
            <p className="mt-3">Please select staff to save salary payment.</p>
          </div>

          <div className="flex justify-end p-2 gap-[10px] border-t">
            <button className="second-btn">Okay</button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalIsOpen14}
        onAfterOpen={afterOpenModal14}
        onRequestClose={closeModal14}
        // style={customStyles}
        contentLabel="Example Modal"
        className="w-[96%] xl:w-[40%] absolute top-[50%] left-[50%] bottom-auto p-0 bg-[#fff] shadow-md rounded-[10px] translate-x-[-50%] translate-y-[-50%]"
      >
        <h2
          ref={(_subtitle) => (subtitle = _subtitle)}
          className="border-b p-3     text-[14px]   bg-[#F0F6FE] rounded-t-lg  rounded-b-none"
        >
          No Staff Selected
        </h2>
        <button
          onClick={closeModal14}
          className="absolute right-[5px] top-[3px] font-semibold	  bg-[#27004a] rounded-full"
        >
          <CloseIcon className="text-white" />
        </button>
        <div className="pb-2 p-[10px]">
          <div className="text-center pt-[30px] pb-[30px]">
            <WarningIcon className="text-red-600 transition warning-icon" />
            <p className="mt-3">Please select staff to pay salary online.</p>
          </div>

          <div className="flex justify-end p-2 gap-[10px] border-t">
            <button className="second-btn">Okay</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RunPayroll;
