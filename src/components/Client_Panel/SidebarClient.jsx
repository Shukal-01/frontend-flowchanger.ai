import React, { useState } from "react";
import logo from "../../Assets/Images/logo.png";
import home from "../../Assets/Images/home.png";
import project from "../../Assets/Images/project.png";
import task from "../../Assets/Images/task.png";
import client from "../../Assets/Images/client.png";
import report from "../../Assets/Images/report.png";
import staff from "../../Assets/Images/staff.png";
import setting from "../../Assets/Images/setting.png";
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useGlobalContext } from "../../Context/GlobalContext";
const SidebarClient = ({ toggleSideBar }) => {
  const { activeSubmenu, setActiveSubmenu, selectedSidebarTab, setSelectedSidebarTab } = useGlobalContext();


   

  return (
    <div className="sidebar w-[250px]  lg:w-[300px] md:w-[300px] bg-[#27004a] h-[100vh] p-[10px] flex-shrink-0">

 
      <div className="flex xl:justify-center lg:justify-center  p-[20px]">
        <img src={logo} alt="" className="w-[120px]" />
      </div>
      <ul className="pl-[2px] pr-[2px] pt-[0px] pb-[20px]">
        <Link to="/clientpanel" onClick={() => { setSelectedSidebarTab("dashboard") }} className={`flex items-center gap-[10px] hover:bg-[#fff] mb-[5px] hover:text-[#8a25b0] p-[10px]   rounded-md  transition-all ${selectedSidebarTab === "dashboard" ? "bg-white text-[#8a25b0]" : "text-white"}`} >
          <img src={home} />
          <button  className="">Dashboard</button>
        </Link>
        <Link to="/clientpanel/chats" onClick={() => { setSelectedSidebarTab("chat") }} className={`flex items-center gap-[10px] hover:bg-[#fff] mb-[5px] hover:text-[#8a25b0] p-[10px]   rounded-md  transition-all ${selectedSidebarTab === "chat" ? "bg-white text-[#8a25b0]" : "text-white"}`}>
          <img src={home} />
          <button  className="">Chat</button>
        </Link>


        <div className="">
          <Link to = "/clientpanel/projects" onClick={() => { setSelectedSidebarTab("projects") }} className={`flex items-center gap-[10px] hover:bg-[#fff] mb-[5px] hover:text-[#8a25b0] p-[10px]   rounded-md  transition-all ${selectedSidebarTab === "projects" ? "bg-white text-[#8a25b0]" : "text-white"}`}>
            <img src={project} alt="" />
            <button >
              Projects
            </button>

          </Link>

          {/* <div
            className={`overflow-hidden transition-max-height duration-300 ease-in-out mt-[5px] `}
          >

            <button to="#"
              className="w-full ml-[40px] text-left py-[10px] flex items-center gap-[10px] pl-[0px] whitespace-nowrap  text-white   transition-all	rounded-md"
            >
              <ArrowForwardIosIcon className="arrow-icon-sidebar"/>
              Task
            </button>
</div> */}
        </div>

        <div className="">
          <Link to="/clientpanel/taskview" onClick={() => { setSelectedSidebarTab("task") }} className={`flex items-center gap-[10px] hover:bg-[#fff] mb-[5px] hover:text-[#8a25b0] p-[10px]   rounded-md  transition-all ${selectedSidebarTab === "task" ? "bg-white text-[#8a25b0]" : "text-white"}`}>
            <img src={task} alt="" />
            <button 
            >
              Task
            </button>

          </Link>

      
        </div>
        <div className="">
          <Link to = "/clientpanel/notes" onClick={() => { setSelectedSidebarTab("notes") }} className={`flex items-center gap-[10px] hover:bg-[#fff] mb-[5px] hover:text-[#8a25b0] p-[10px]   rounded-md  transition-all ${selectedSidebarTab === "notes" ? "bg-white text-[#8a25b0]" : "text-white"}`}>
            <img src={task} alt="" />
            <button 
            >
              Notes
            </button>

          </Link>

      
        </div>
        <div className="">
          <Link  to = "/clientpanel/project_invoice" onClick={() => { setSelectedSidebarTab("invoice") }} className={`flex items-center gap-[10px] hover:bg-[#fff] mb-[5px] hover:text-[#8a25b0] p-[10px]   rounded-md  transition-all ${selectedSidebarTab === "invoice" ? "bg-white text-[#8a25b0]" : "text-white"}`}>
            <img src={task} alt="" />
            <button
            >
              Invoice
            </button>

          </Link>

      
        </div>


      

       
      </ul>
    </div>
  );
};

export default SidebarClient;
