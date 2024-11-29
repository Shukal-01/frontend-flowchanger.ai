import { useState } from "react";
import { TiPlus } from "react-icons/ti";
import { IoIosArrowForward } from "react-icons/io";



const AddMembersSidePanel = ({handleDeleteGroupClick,handleAddMembersModal}) =>{

 const [showSharedItemsMenu , setShowSharedItemsMenu] = useState(false);
 

 const handleSharedItems = () =>{
    setShowSharedItemsMenu((showSharedItems) => !showSharedItems)
 }

     return (

        <div className="w-72 bg-white border-l  border-gray-200 h-full flex flex-col ">
          <div className="flex flex-row justify-between mb-2 mx-2">
            <button className = "flex flex-row items-center justify-between w-[60px] ml-1 border bg-purple-600 rounded p-1" onClick={handleAddMembersModal}>
          <TiPlus className="text-white"/>
          <span className="text-white">Ad</span>
          </button>
          <button className="bg-gray-200 p-2 rounded text-black" onClick = {handleDeleteGroupClick}>
            Delete Group
          </button>
          </div>
         <div className="flex flex-col space-y-4">
         <div className="bg-gray-200 p-1 rounded-lg flex flex-row justify-between items-center mx-2 text-black">
            MEMBERS
            <IoIosArrowForward/>
          </div>
            <div className="relative mb-2">
            <div className="bg-gray-200 p-1 rounded-lg flex flex-row justify-between items-center mx-2  text-black">
            Shared Items
            <IoIosArrowForward onClick={handleSharedItems} className={`${showSharedItemsMenu?"rotate-90":"rotate-0"}`}/>
          </div>
          {showSharedItemsMenu && <div class="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
    <div class="py-1 flex flex-row " role="none">
     <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:text-purple-500" role="menuitem" tabindex="-1" id="menu-item-0" >Announcements</a>
      <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:text-purple-500" role="menuitem" tabindex="-1" id="menu-item-1" >Create Group</a>
    
    </div>
    <hr />
    <p className="w-full text-center my-3">Shared Photos</p>
  </div>}
          </div>
         </div>
        </div>
      );
    
    
   
}

export default AddMembersSidePanel;