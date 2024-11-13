import React ,{useState} from "react";
import { useAuthContext } from "../../Context/AuthContext";
import Cookies from 'js-cookie';
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
  const [profileDropdown , setProfileDropDown] = useState(false);
  const {setIsAuthenticated} = useAuthContext();

 const handleProfileDropDown = () =>{
   setProfileDropDown(!profileDropdown);
 }

 const handleLogout = () =>{
 if(Cookies.get('flowChangerAuthToken')){
  Cookies.remove('flowChangerAuthToken')
   setIsAuthenticated(false);
 }
 }

  const handleAddClass = () => {
    document.body.classList.toggle('custom-body-class');
  };

  return (
    <div className="w-[100%]  pt-[10px] pb-[10px] xl:pl-[31px] lg:pl-[31px] pr-[2px] flex items-center justify-between border-b shadow-sm pl-[14px] navbar">
      <button onClick={handleAddClass}>

        <MenuIcon className="menu-icon"/>
        <CloseIcon className="cancel-icon"/>
      </button>

      <div className="flex justify-between items-center">
      <div className=" items-center gap-4 mr-7 flex ml-3">
        <div className="relative">
          <input className="h-[42px] w-[150px] xl:w-[200px] lg:w-[200px] md:w-[200px] pr-[36px] pl-3 bg-[#F4F5F9] rounded-md border-[#DBDCDE] border focus:outline-none" type="text" placeholder="Search...." />
          <SearchIcon className="absolute right-[8px] top-[10px] cursor-pointer" />
        </div>
        <img src={photo} alt="" className="cursor-pointer" />
</div>
<div class="relative inline-block text-left">

    {/* profile dropdown */}
    <div onClick = {handleProfileDropDown} class="flex  justify-center items-center gap-x-1.5 rounded-[120%] w-6 h-10 p-4 bg-black text-white  text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-900" id="menu-button" aria-expanded="true" aria-haspopup="true">
      T
    </div>
{profileDropdown && <div class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-black  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
    <div class="py-1" role="none">
      <div  class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-0">
      <p className="text-white hover:bg-slate-500 p-2">tp</p>
      <p className="text-white hover:bg-slate-500 p-2">Role - Admin</p>
      </div>
     <button type="submit" class="block bg-gray-800 w-full px-4 py-2 text-left text-sm  text-white hover:bg-slate-500" role="menuitem" tabindex="-1" id="menu-item-3" onClick ={handleLogout}>Log out</button>
      
    </div>
  </div>
  }
</div>
    </div>
    </div>
  );
};

export default NavBar;
