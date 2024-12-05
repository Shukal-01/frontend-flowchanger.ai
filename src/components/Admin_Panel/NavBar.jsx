import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import menu from "../../Assets/Images/menu-fill.png";
import search from "../../Assets/Images/search.png";
import addBtn from "../../Assets/Images/addBtn.png";
import share from "../../Assets/Images/share.png";
import check from "../../Assets/Images/check.png";
import photo from "../../Assets/Images/photo.png";
import watch from "../../Assets/Images/watch.png";
import ring from "../../Assets/Images/ring.png";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { TbLogout2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";
import { useGlobalContext } from "../../Context/GlobalContext";

const NavBar = () => {
  const {flowChangerToken} = useAuthContext();
  const {baseUrl} = useGlobalContext();
  console.log(baseUrl);
  console.log(flowChangerToken);
  const [user , setUser] = useState([]);
 

  useEffect(()=>{
  const fetchData = async () =>{
    try{
      const result = await fetch(baseUrl + "user/",{
        headers : {
          'Authorization' : `Bearer ${flowChangerToken}`
        }
      });
      console.log(result);
  const response = await result.json();
  console.log(response);
  setUser(response);
    }
 catch(error){
  console.log("error while fetching user", error)
  setUser([]);
 }
  } 
  fetchData();
  },[])

  const handleProfileDropDown = () => {
    setProfileDropDown(!profileDropdown);
  };
  const [profileDropdown, setProfileDropDown] = useState(false);
  const { setIsAuthenticated } = useAuthContext();
  const handleLogout = () => {
    if (Cookies.get("flowChangerAuthToken")) {
      Cookies.remove("flowChangerAuthToken");
      setIsAuthenticated(false);
    }
  };

  const handleAddClass = () => {
    document.body.classList.toggle("custom-body-class");
  };
  const showDropdown = () => setProfileDropDown(true);
  const hideDropdown = () => setProfileDropDown(false);

  return (
    <div className="w-[100%] flex items-center justify-between border-b shadow-sm  navbar  py-[7px]  sticky top-0 bg-white z-10 px-2">
      <button onClick={handleAddClass}>
        <MenuIcon className="cancel-icon" />
        <CloseIcon className="menu-icon-navbar hidden" />
      </button>

      <div className="flex justify-between items-center ">
        <div className=" items-center gap-4 mr-7 flex ml-3">
          <div className="relative client-add">
            <input
              className="py-2.5 client-add  rounded-3xl pl-[10px] pr-[24px] focus-visible:outline-none  summary-border text-[13px] "
              type="text"
              placeholder="Search...."
            />
            <SearchIcon className="absolute newadd2 right-[8px] text-[10px] top-[14px] text-gray-500 h-8" />
          </div>
        </div>
        <div class="relative inline-block text-left mr-[10px]">
          {/* profile dropdown */}

          <img
            onMouseEnter={showDropdown}
            onClick={handleProfileDropDown}
            class="flex  justify-center items-center gap-x-1.5 rounded-[120%] w-6 h-10 p-4 bg-black text-white  text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-900 mr-[10px]"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            src={photo}
            alt=""
            className="cursor-pointer"
          />

          {profileDropdown && (
            <div
              onMouseEnter={showDropdown}
              onMouseLeave={hideDropdown}
              class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-[#27004a]  shadow-lg  focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabindex="-1"
            >
              <div class="p-[10px]" role="none">
                <div
                  class="block  text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-0"
                >
                  <p className="text-white hover:bg-white rounded-md hover:text-[#8a25b0] font-medium p-2">
                    {user.name}
                  </p>
                  <p className="text-white hover:bg-white rounded-md hover:text-[#8a25b0] font-medium p-2">
                    Role -{user.role}
                  </p>
                </div>
                <Link
                  to="/authentication/login"
                  type="submit"
                  class=" flex items-center justify-between w-full p-2 text-left text-sm font-medium text-white hover:bg-[white] hover:text-[red] rounded-md "
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-3"
                  onClick={handleLogout}
                >
                  Log out <TbLogout2 className="hover:text-[red]" />{" "}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;