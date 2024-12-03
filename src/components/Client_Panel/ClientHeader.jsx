import React, { useState, useRef } from "react";
import menu from "../../Assets/Images/menu-fill.png";
import search from "../../Assets/Images/search.png";
import addBtn from "../../Assets/Images/addBtn.png";
import share from "../../Assets/Images/share.png";
import check from "../../Assets/Images/check.png";
import photo from "../../Assets/Images/photo.png";
import watch from "../../Assets/Images/watch.png";
import ring from "../../Assets/Images/ring.png";
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import parker from "../../Assets/Images/parker.jpg";
import { useGlobalContext } from "../../Context/GlobalContext";


const ClientHeader = ({ handleToggleSideBar, toggleSideBar }) => {

  const handleAddClass = () => {
    document.body.classList.toggle('custom-body-class');
  };

     //ClientHeader dropdown
     const [isOpen1, setIsOpen1] = useState(false);
     const fileInputRef = useRef(null);
 
     const toggleDropdown1 = () => {
         setIsOpen1(!isOpen1);
     };
     //ClientHeader dropdown

  return (
    <div className="w-[100%] flex items-center justify-between border-b shadow-sm  navbar  h-[11%]">
      <button onClick={handleAddClass}>
        <MenuIcon className="menu-icon-navbar hidden"/>
        <CloseIcon className="cancel-icon"/>
      </button>


      <div className=" items-center gap-4 mr-7 flex ml-3">
        <div className="relative">
          <input className="h-[42px] w-[150px] xl:w-[200px] lg:w-[200px] md:w-[200px] pr-[36px] pl-3 bg-[#fff] rounded-md border-[#DBDCDE] border focus:outline-none" type="text" placeholder="Search...." />
          <SearchIcon className="absolute right-[8px] top-[10px] cursor-pointer" />
        </div>
        <NotificationsIcon className="text-[red] cursor-pointer" />
        <div className="relative  flex justify-end items-center">
                            {/* Button to open/close the dropdown */}
                            <button
                                className=" items-center p-[6px] text-left text-[12px] text-sm   focus:outline-none"
                                onClick={toggleDropdown1}
                            >
                                <img className="h-[36px] w-[36px] rounded-full" src={parker}/>
                            </button>

                            {/* Dropdown menu */}
                            {isOpen1 && (
                                <div className="absolute w-[165px] z-10 mt-2  right-[0px] top-[40px] left-[-135px] bg-white border border-gray-200 rounded-md shadow-lg">
                                    <div className="preferences p-[10px]" role="menu" aria-orientation="vertical" aria-labelledby="options-menu  ">
                                      <div className="flex border-b border-[#ebf1f5] p-[10px] items-center justify-between">
                                        <img className="h-[36px] w-[36px] rounded-full" src={parker}/>
                                        <div>
                                          <p className="text-[12px]">same parker</p>
                                          <p className="text-[12px]">Client</p>
                                        </div>
                                      
                                      </div>
                                        <a
                                            href="#"
                                            className=" flex gap-[10px] items-center  p-[12px] newadd2 border-b border-[#ebf1f5] text-left text-sm text-black hover:bg-gray-100"
                                            role="menuitem"
                                        >
                                            <PersonIcon className="text-[#8d94a0] newadd2" /> My Profile
                                        </a>
                                        <a
                                            href="#"
                                            className="flex gap-[10px] items-center p-[12px] newadd2 border-b border-[#ebf1f5]  text-left text-sm text-black hover:bg-gray-100"
                                            role="menuitem"
                                        >
                                            <SettingsIcon className="text-[#8d94a0]  newadd3" />Preferences
                                        </a>
                                        <div className="flex items-center gap-[4px] mt-[10px]">
                                     
                                     <Link className="border rounded-md flex items-center text-[12px] gap-[6px] font-medium text-[red] border-[red] p-[4px]"><LogoutIcon className="newadd "/>Log Out</Link>
                                     </div>
                                   

                                    </div>
                            
                                </div>
                            )}
                        </div>


      </div>
    </div>
  );
};

export default ClientHeader;
