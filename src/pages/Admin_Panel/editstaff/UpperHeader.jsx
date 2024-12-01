import React, { useState, useEffect } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import photo from '../../../Assets/Images/photo.png'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const UpperHeader = ({handleToggleEditSideBar,toggleEditSideBar}) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Use useEffect to add/remove the class to/from the body element
    useEffect(() => {
      if (toggleEditSideBar) {
        document.body.classList.add("editsidebar");
      } else {
        document.body.classList.remove("editsidebar");
      }
  
      // Cleanup function to remove the class if the component unmounts
      return () => {
        document.body.classList.remove("editsidebar");
      };
    }, [isSidebarOpen]);
  
    // Toggle the sidebar state
    // const toggleSidebar = () => {
    //   setIsSidebarOpen(!isSidebarOpen);
    // };

    const [toggleDrop, setToggleDrop] = useState(false);

    function handledrop() {
      setToggleDrop(!toggleDrop)
    }
  
    return (
        <div className='flex justify-between p-3 border-b shadow-md fixed top-0 w-full z-[1] bg-white'>
            <div className='flex gap-2 items-center'>
            <Link to='/staff-menu'>
                <ArrowBackIcon />
                </Link>
                <button  onClick={()=>{ handleToggleEditSideBar();}} className="toggle-btn-side">
                <MenuIcon className="menu-icon"/>
                <CloseIcon className="close-icon"/>
                 </button>
                 
                <img src={photo} className='h-[40px] w-[40px]' />
            </div>
            <div className='flex gap-2 items-center'>
                <span className='bg-[#effaf4] pt-2 pb-2 pl-6 pr-5 text-[#2db567] rounded-3xl'>Active</span>
                <div className='relative'>
                <button className='' onClick={handledrop} >
                    <MoreVertIcon/>
                </button>
                {
                toggleDrop &&
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                <div className="py-1" role="none">
                  <Link to="/add-one-staff" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-0">Mark Staff Inactive</Link>
                  <Link to="#" className="block px-4 py-2 text-sm text-red-700" role="menuitem" tabindex="-1" id="menu-item-1">Delete Staff</Link>
                </div>

              </div>
                }
                </div>
            </div>
        </div>
    )
}

export default UpperHeader