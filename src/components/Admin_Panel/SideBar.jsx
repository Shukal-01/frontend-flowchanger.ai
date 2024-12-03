import React, { useState, useEffect } from "react";
import logo from "../../Assets/Images/logo.png";
import home from "../../Assets/Images/home.png";
import project from "../../Assets/Images/project.png";
import task from "../../Assets/Images/task.png";
import client from "../../Assets/Images/client.png";
import report from "../../Assets/Images/report.png";
import staff from "../../Assets/Images/staff.png";
import setting from "../../Assets/Images/setting.png";
import { Link, NavLink } from "react-router-dom";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HomeIcon from "@mui/icons-material/Home";
import CloseIcon from "@material-ui/icons/Close";
import SettingsIcon from "@material-ui/icons/Settings";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { useGlobalContext } from "../../Context/GlobalContext";

const SideBar = ({ toggleSideBar }) => {
  const {
    activeSubmenu,
    setActiveSubmenu,
    selectedSidebarTab,
    setSelectedSidebarTab,
  } = useGlobalContext();

  useEffect(() => {
    console.log(activeSubmenu, selectedSidebarTab);
  }, [activeSubmenu, selectedSidebarTab]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const [isMenuOpen1, setIsMenuOpen1] = useState(false);
  const toggleMenu1 = () => setIsMenuOpen1(!isMenuOpen1);

  const [isMenuOpen2, setIsMenuOpen2] = useState(false);
  const toggleMenu2 = () => setIsMenuOpen2(!isMenuOpen2);

  const [isMenuOpen3, setIsMenuOpen3] = useState(false);
  const toggleMenu3 = () => setIsMenuOpen3(!isMenuOpen3);

  const [isMenuOpen4, setIsMenuOpen4] = useState(false);
  const toggleMenu4 = () => setIsMenuOpen4(!isMenuOpen4);

  const [isMenuOpen5, setIsMenuOpen5] = useState(false);
  const toggleMenu5 = () => setIsMenuOpen5(!isMenuOpen5);

  const [isMenuOpen6, setIsMenuOpen6] = useState(false);
  const toggleMenu6 = () => setIsMenuOpen6(!isMenuOpen6);

  const [isMenuOpen7, setIsMenuOpen7] = useState(false);
  const toggleMenu7 = () => setIsMenuOpen7(!isMenuOpen7);

  const [isMenuOpen8, setIsMenuOpen8] = useState(false);
  const toggleMenu8 = () => setIsMenuOpen8(!isMenuOpen8);

  const [isMenuOpen9, setIsMenuOpen9] = useState(false);
  const toggleMenu9 = () => setIsMenuOpen9(!isMenuOpen9);

  const [isMenuOpen10, setIsMenuOpen10] = useState(false);
  const toggleMenu10 = () => setIsMenuOpen10(!isMenuOpen9);

  //setup sidebar

  // State to manage sidebar visibility
  const [isOpen, setIsOpen] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  //setup sidebar

  const handleActiveSubmenu = () => {
    if (selectedSidebarTab === "staff") {
      setActiveSubmenu((prev) => !prev);
    } else {
      setActiveSubmenu(false);
    }
  };
  // Handle page selection
  const handlePageClick = (page) => {
    setSelectedPage(page);
    setIsOpen(true); // Keep sidebar open on page selection
  };

  const [selectedPage, setSelectedPage] = useState(""); // Track active page

  return (
    // <div className="sidebar w-[250px] xl:w-[244px] lg:w-[300px] md:w-[300px] bg-[#27004a] h-full p-[10px] ">

    <div className="sidebar flex-shrink-0 w-[100%] xl:w-[20%] lg:w-[20%] md:w-[300px] bg-[#27004a]  p-[10px]  h-[95vh] md:h-[100vh]   overflow-y-scroll content-container">
      <div className="flex xl:justify-center lg:justify-center  p-[20px]">
        <img src={logo} alt="" className="w-[120px]" />
      </div>
      <ul className="pl-[2px] pr-[2px] pt-[0px] pb-[20px]">
        <li
          onClick={() => {
            setSelectedSidebarTab("dashboard");
            handleActiveSubmenu();
          }}
          className={`flex items-center gap-[10px] hover:bg-[#fff] mb-[5px] hover:text-[#8a25b0] p-[10px]   rounded-md  transition-all ${
            selectedSidebarTab === "dashboard"
              ? "bg-white text-[#8a25b0]"
              : "text-white"
          }`}
        >
          {/* <img src={home} /> */}
          <HomeIcon />

          <Link to="/" className="">
            Dashboard
          </Link>
        </li>

        <div className="">
          <Link
            to="/projects"
            className={`flex items-center gap-[10px] mb-[5px]  p-[10px] hover:bg-[#fff] rounded-md hover:text-[#8a25b0] transition-all ${
              selectedSidebarTab === "project"
                ? "bg-white [#8a25b0] text-[#8a25b0]"
                : "text-white"
            }`}
            onClick={() => {
              setSelectedSidebarTab("project");
              handleActiveSubmenu();
            }}
          >
            {/* <img src={project} alt="" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-folder-kanban"
            >
              <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
              <path d="M8 10v4" />
              <path d="M12 10v2" />
              <path d="M16 10v6" />
            </svg>
            <button onClick={toggleMenu} className=" ">
              Project
            </button>
          </Link>
        </div>

        <div className="">
          <Link
            to="/task"
            onClick={() => {
              setSelectedSidebarTab("task");
              handleActiveSubmenu();
            }}
            className={`flex items-center gap-[10px]  p-[10px] hover:bg-[#fff] rounded-md hover:text-[#8a25b0] transition-all ${
              selectedSidebarTab === "task"
                ? "bg-white text-[#8a25b0]"
                : "text-white"
            }`}
          >
            {/* <img src={task} alt="" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-file-check"
            >
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path d="m9 15 2 2 4-4" />
            </svg>
            <button onClick={toggleMenu1} className=" ">
              Task
            </button>
          </Link>

          <div
            className={`overflow-hidden transition-max-height duration-300 ease-in-out mt-[5px] ${
              isMenuOpen1 ? "max-h-screen" : "max-h-0"
            }`}
          >
            {/* <Link to="#"
              className="w-full ml-[40px] text-left py-[10px] flex items-center gap-[10px] pl-[0px] whitespace-nowrap  text-white   transition-all	rounded-md"
            >
              <ArrowForwardIosIcon className="arrow-icon-sidebar" />
              Sub Menu
            </Link> */}
          </div>
        </div>

        <div className="">
          <Link
            to="/clients"
            className={`flex items-center gap-[10px] p-[10px] hover:bg-[#fff] rounded-md hover:text-[#8a25b0] transition-all ${
              selectedSidebarTab === "client"
                ? "bg-white text-[#8a25b0]"
                : "text-white"
            }`}
            onClick={() => {
              setSelectedSidebarTab("client");
              handleActiveSubmenu();
            }}
          >
            {/* <img src={client} alt="" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-user"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <button onClick={toggleMenu2} className=" ">
              Client
            </button>
          </Link>

          <div
            className={`overflow-hidden transition-max-height duration-300 ease-in-out mt-[5px] ${
              isMenuOpen2 ? "max-h-screen" : "max-h-0"
            }`}
          >
            {/* <Link to="#"
              className="w-full ml-[40px] text-left py-[10px] flex items-center gap-[10px] pl-[0px] whitespace-nowrap  text-white   transition-all	rounded-md"
            >
              <ArrowForwardIosIcon className="arrow-icon-sidebar"/>
              Sub Menu
            </Link> */}
          </div>
        </div>

        <div className="">
          <div
            onClick={() => {
              setSelectedSidebarTab("report");
            }}
            className={`flex items-center gap-[10px]  p-[10px] hover:bg-[#fff] rounded-md hover:text-[#8a25b0] transition-all ${
              selectedSidebarTab === "report"
                ? "bg-white text-[#8a25b0]"
                : "text-white"
            }`}
          >
            {/* <img src={report} alt="" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-clipboard-minus"
            >
              <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <path d="M9 14h6" />
            </svg>
            <button onClick={toggleMenu3} className=" ">
              Report
            </button>
          </div>

          <div
            className={`overflow-hidden transition-max-height duration-300 ease-in-out mt-[5px] ${
              isMenuOpen3 ? "max-h-screen" : "max-h-0"
            }`}
          >
            {/* <Link to="#"
              className="w-full ml-[40px] text-left py-[10px] flex items-center gap-[10px] pl-[0px] whitespace-nowrap  text-white   transition-all	rounded-md"
            >
              <ArrowForwardIosIcon className="arrow-icon-sidebar"/>
              Sub Menu
            </Link> */}
          </div>
        </div>

        <div>
          {/* Main Staff Tab */}
          <Link
            to="/staff-menu"
            onClick={() => setSelectedSidebarTab("staff")} // Set selected tab
            className={`flex items-center gap-[10px] p-[10px]  hover:bg-[#fff] rounded-md hover:text-[#8a25b0] transition-all ${
              selectedSidebarTab === "staff"
                ? "bg-white mb-[5px] text-[#8a25b0]"
                : "text-white"
            }`}
          >
            <div className="flex justify-between items-center gap-3 w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-users"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Staff
              <button
                onClick={handleActiveSubmenu}
                className="ml-auto focus:outline-none"
              >
                {activeSubmenu ? (
                  <FaChevronDown className="text-sm" />
                ) : (
                  <FaChevronRight className="text-sm" />
                )}
              </button>
            </div>
          </Link>

          {/* Submenu */}
          {activeSubmenu && (
            <div className="transition-all duration-300 ease-in-out mt-[5px] overflow-hidden">
              <div>
                <Link
                  to="/payroll-menu"
                  onClick={() => {
                    setSelectedSidebarTab("payroll-menu");
                  }}
                  className={`w-full text-left py-[10px] flex items-center gap-[10px] pl-[40px] whitespace-nowrap transition-all rounded-md overflow-hidden ${
                    selectedSidebarTab === "payroll-menu"
                      ? "bg-white text-[#8a25b0]"
                      : "text-white"
                  }`}
                >
                  <FaChevronRight className="arrow-icon-sidebar" />
                  Payroll
                </Link>
              </div>
              <div>
                <Link
                  to="/attendence_summary"
                  onClick={() => {
                    setSelectedSidebarTab("attendance");
                  }}
                  className={`w-full text-left py-[10px] flex items-center gap-[10px] pl-[40px] whitespace-nowrap transition-all rounded-md overflow-hidden ${
                    selectedSidebarTab === "attendance"
                      ? "bg-white text-[#8a25b0]"
                      : "text-white"
                  }`}
                >
                  <FaChevronRight className="arrow-icon-sidebar" />
                  Attendance
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="">
          <Link
            onClick={() => {
              setSelectedSidebarTab("role");
              handleActiveSubmenu();
            }}
            to="/role-detail"
            className={`flex items-center gap-[10px] mt-[5px]  p-[10px] hover:bg-[#fff] rounded-md hover:text-[#8a25b0] transition-all ${
              selectedSidebarTab === "role"
                ? "bg-white text-[#8a25b0]"
                : "text-white"
            }`}
          >
            {/* <img src={staff} alt="" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-user-cog"
            >
              <circle cx="18" cy="15" r="3" />
              <circle cx="9" cy="7" r="4" />
              <path d="M10 15H6a4 4 0 0 0-4 4v2" />
              <path d="m21.7 16.4-.9-.3" />
              <path d="m15.2 13.9-.9-.3" />
              <path d="m16.6 18.7.3-.9" />
              <path d="m19.1 12.2.3-.9" />
              <path d="m19.6 18.7-.4-1" />
              <path d="m16.8 12.3-.4-1" />
              <path d="m14.3 16.6 1-.4" />
              <path d="m20.7 13.8 1-.4" />
            </svg>
            <button onClick={toggleMenu5} className=" ">
              Role
            </button>
          </Link>

          <div
            className={`overflow-hidden transition-max-height duration-300 ease-in-out mt-[5px] ${
              isMenuOpen5 ? "max-h-screen" : "max-h-0"
            }`}
          >
            {/* 
            <Link to="#"
              className="w-full ml-[40px] text-left py-[10px] flex items-center gap-[10px] pl-[0px] whitespace-nowrap  text-white   transition-all	rounded-md"
            >
              <ArrowForwardIosIcon className="arrow-icon-sidebar"/>
              Sub Menu
            </Link> */}
          </div>
        </div>

        <div className="">
          <Link
            to="/department-details"
            onClick={() => {
              setSelectedSidebarTab("department");
              handleActiveSubmenu();
            }}
            className={`flex items-center gap-[10px]  p-[10px] hover:bg-[#fff] rounded-md hover:text-[#8a25b0] transition-all ${
              selectedSidebarTab === "department"
                ? "bg-white text-[#8a25b0]"
                : "text-white"
            }`}
          >
            {/* <img src={staff} alt="" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-git-fork rotate-180	"
            >
              <circle cx="12" cy="18" r="3" />
              <circle cx="6" cy="6" r="3" />
              <circle cx="18" cy="6" r="3" />
              <path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9" />
              <path d="M12 12v3" />
            </svg>
            <button onClick={toggleMenu6} className=" ">
              Department
            </button>
          </Link>
        </div>

        <div className="">
          <Link
            to="/branch-details"
            onClick={() => {
              setSelectedSidebarTab("branch");
              handleActiveSubmenu();
            }}
            className={`flex items-center gap-[10px] mt-[5px] p-[10px] hover:bg-[#fff] rounded-md hover:text-[#8a25b0] transition-all ${
              selectedSidebarTab === "branch"
                ? "bg-white text-[#8a25b0]"
                : "text-white"
            }`}
          >
            {/* <img src={staff} alt="" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-git-fork rotate-180	"
            >
              <circle cx="12" cy="18" r="3" />
              <circle cx="6" cy="6" r="3" />
              <circle cx="18" cy="6" r="3" />
              <path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9" />
              <path d="M12 12v3" />
            </svg>
            <button onClick={toggleMenu10} className=" ">
              Branch
            </button>
          </Link>
        </div>

        <div className="mt-[5px] mb-[5px]">
          <Link
            onClick={() => {
              setSelectedSidebarTab("subscription-plan");
              handleActiveSubmenu();
            }}
            to="/subscription-plan"
            className={`flex items-center gap-[10px]  p-[10px] hover:bg-[#fff] rounded-md hover:text-[#8a25b0] transition-all ${
              selectedSidebarTab === "subscription-plan"
                ? "bg-white text-[#8a25b0]"
                : "text-white"
            }`}
          >
            {/* <img src={staff} alt="" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-thumbs-up"
            >
              <path d="M7 10v12" />
              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
            </svg>
            <button onClick={toggleMenu7} className="whitespace-nowrap ">
              Subscriptions Plan
            </button>
          </Link>

          {/* <div
            className={`overflow-hidden transition-max-height duration-300 ease-in-out mt-[5px] ${isMenuOpen7 ? 'max-h-screen' : 'max-h-0'
              }`}
          >

            <Link to="#"
              className="w-full ml-[40px] text-left py-[10px] flex items-center gap-[10px] pl-[0px] whitespace-nowrap  text-white   transition-all	rounded-md"
            >
              <ArrowForwardIosIcon className="arrow-icon-sidebar"/>
              Sub Menu
            </Link>



          </div> */}
        </div>

        <div className="">
          {/* <div onClick={() => { setSelectedSidebarTab("settings") }} className={`flex items-center gap-[10px]  p-[10px] hover:bg-[#fff] rounded-md hover:text-[#8a25b0] transition-all ${selectedSidebarTab === "settings" ? "bg-white text-[#8a25b0]" : "text-white"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
            <button
              onClick={toggleMenu8}
              className=" "
            >
              Setting
            </button>

          </div>  */}

          {/* <div
            className={`overflow-hidden transition-max-height duration-300 ease-in-out mt-[5px] ${isMenuOpen8 ? 'max-h-screen' : 'max-h-0'
              }`}
          >

            <Link to="#"
              className="w-full ml-[40px] text-left py-[10px] flex items-center gap-[10px] pl-[0px] whitespace-nowrap  text-white   transition-all	rounded-md"
            >
              <ArrowForwardIosIcon className="arrow-icon-sidebar"/>
              Sub Menu
            </Link>



          </div> */}
        </div>

        {/* <div className="">
          <Link to="/status-main-page" className="flex items-center gap-[10px] text-white p-[10px] hover:bg-[#fff] rounded-md hover:text-[#8a25b0] transition-all	">
           
            <button
              onClick={toggleMenu8}
              className=" "
              Status
            </button>

          </Link>

        </div> */}

        <div className="flex h-auto">
          {/* Toggle button */}
          <button
            onClick={toggleSidebar}
            className="flex items-center w-full gap-[10px] text-white p-[10px] hover:bg-[#fff] rounded-md hover:text-[#8a25b0] transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-settings"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Setup
          </button>

          {/* Sidebar */}
          <div
            className={`fixed top-[53px] md:top-0 w-[500px] lg:w-[270px]  left-0 h-[100vh]  text-white z-10 transform ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out`}
          >
            <div className="w-full h-full bg-[#27004a] opacity-100">
              {/* Close Button bg-[#27004a]*/}
              <div className="p-4 flex items-center justify-end text-lg font-bold">
                <button onClick={toggleSidebar}>
                  <CloseIcon />
                </button>
              </div>

              {/* Sidebar Links */}
              <ul className="p-4">
                <Link
                  to="/status-main-page"
                  onClick={() => handlePageClick("status")}
                  className={`p-2 flex items-center gap-[6px]  mb-[10px] rounded-lg cursor-pointer ${
                    selectedPage === "status"
                      ? "bg-white text-[purple]"
                      : "hover:bg-white hover:text-[purple]"
                  }`}
                >
                  <HomeIcon className="newsidebar-icon" />
                  Status Manager
                </Link>
                <Link
                  onClick={() => handlePageClick("home")}
                  className={`p-2 flex items-center  gap-[6px] mb-[10px] rounded-lg cursor-pointer ${
                    selectedPage === "home"
                      ? "bg-white text-[purple]"
                      : "hover:bg-white hover:text-[purple]"
                  }`}
                >
                  <SettingsIcon className="newsidebar-icon" />
                  Setting
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default SideBar;
