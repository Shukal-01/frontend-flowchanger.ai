import React from "react";
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

const NavBar = ({ handleToggleSideBar, toggleSideBar }) => {

  const handleAddClass = () => {
    document.body.classList.toggle('custom-body-class');
  };

  return (
    <div className="w-[100%]  pt-[10px] pb-[10px] xl:pl-[31px] lg:pl-[31px] pr-[2px] flex items-center justify-between border-b shadow-sm pl-[14px] navbar">
      <button onClick={handleAddClass}>

        <MenuIcon className="menu-icon"/>
        <CloseIcon className="cancel-icon"/>
      </button>


      <div className=" items-center gap-4 mr-7 flex ml-3">
        <div className="relative">
          <input className="h-[42px] w-[150px] xl:w-[200px] lg:w-[200px] md:w-[200px] pr-[36px] pl-3 bg-[#F4F5F9] rounded-md border-[#DBDCDE] border focus:outline-none" type="text" placeholder="Search...." />
          <SearchIcon className="absolute right-[8px] top-[10px] cursor-pointer" />
        </div>
        <img src={photo} alt="" className="cursor-pointer" />
        
</div>
    </div>
  );
};

export default NavBar;
