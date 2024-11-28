import { useState } from "react";
import { FaUserGroup } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { BsSendFill } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { TfiAnnouncement } from "react-icons/tfi";
import { MdGroups2 } from "react-icons/md";
import Groups from "./Chats/ChatTabs/Groups";
import profilePic from "../../Assets/Images/Profile.png";
import ChatAnnouncementsModal from "./Chats/ChatAnnouncements";
import NewGroupChatModal from "./Chats/NewGroupModal";
import AddMembersSidePanel from "./Chats/AddMembersSidePanel";
import DeleteGroup from "./Chats/DeleteGroup";
import AddMembers from "./Chats/AddMembersModal";


const ClientChatInterface = () => {
  const [showChatSection , setShowChatSection] = useState(false);
  const [toggleSettings , setToggleSettings] = useState(false);
  const [showAnnouncementsModal, setShowAnnouncementsModal] = useState(false);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [AddMembersPanel , setShowAddMembersPanel] = useState(false);
  const [showDeleteGroupModal , setShowDeleteGroupModal] = useState(false);
  const [showAddMemberModal , setShowAddMemberModal] = useState(false);

  const handleAddMembersPanel = () =>{
    setShowAddMembersPanel(AddMembersPanel => !AddMembersPanel)
  }

  const handleAddMembersModal = () =>{
    setShowAddMemberModal(showAddMemberModal => !showAddMemberModal)
  }

  const handleToggleSettings = () =>{
    setToggleSettings((toggleSettings)=> !toggleSettings)
  }
  const handleAnnouncementsClick = () => {
   
    setShowAnnouncementsModal(true);
    setToggleSettings(false); // Close the settings menu when opening modal
  };
  const handleCreateGroupClick = () => {
    
    setShowCreateGroupModal(true);
    setToggleSettings(false); // Close the settings menu when opening modal
  };
  const handleDeleteGroupClick = () => {
    
    setShowDeleteGroupModal(true);
     // Close the settings menu when opening modal
  };

  const handleShowChatSection = () =>{
     setShowChatSection(!showChatSection);
  }

  return (
    <div class=" p-4 h-[calc(100vh-4rem)] ">
      {/* <!-- Container for Chat Section --> */}
      <div class="flex   shadow-lg rounded-lg p-6 h-full parent-container bg-white ">
        {/* <!-- Left Section: Members List --> */}
        <div class = {`w-full ${showChatSection?"hidden" : "block"} md:w-1/3 flex flex-col border-r-2  h-full bg-white`}>
        <div className="flex flex-row justify-start items-center space-x-3 border-b  pb-5 mb-2">
          <div className="border rounded-full border-green-500">
          <img src={profilePic} alt="" className="w-9 h-9 rounded-full"/>
          </div>
           <p className="text-xl font-medium">Kanika Arora</p>
        </div>
        {/* container for settings and search members */}
        <div className = "flex flex-row justify-between h-[50px] items-center" >
          {/* <!-- Search Bar --> */}
          <div class="flex items-center bg-white rounded-full shadow-lg  mb-2 border border-gray-300 mt-2.5 w-[80%]">
            <input
              type="text"
              placeholder="Search members..."
              class="bg-transparent outline-none w-full pl-2 py-1 text-sm font-normal"
            />
            <IoSearch className="text-[30px] pr-2 mt-1 text-gray-400"/>
          </div>
          <div className="relative">
            <div className="bg-purple-600 text-white p-1 rounded-lg">
          <IoSettingsOutline className="text-white text-[30px] mt-1" onClick={handleToggleSettings}/>
          </div>
          {toggleSettings && <div class="absolute  z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none -right-20" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
    <div class="py-1" role="none">
    <a href="#" class=" px-4 py-2 text-sm text-gray-700 flex flex-row items-center" role="menuitem" tabindex="-1" id="menu-item-0" onClick={handleAnnouncementsClick}><TfiAnnouncement className="mr-2"/>Announcements</a>
      <a href="#" class=" px-4 py-2 text-sm text-gray-700 flex flex-row items-center" role="menuitem" tabindex="-1" id="menu-item-1" onClick={handleCreateGroupClick}><MdGroups2 className="mr-2"/>Create Group</a>
    
    </div>
  </div>}
          </div>

          
          </div>

          {/* <!-- Member List --> */}
          <div className="flex flex-col h-full flex-grow overflow-y-auto">
          <div class="mb-4 w-full md:w-[80%]   grid grid-cols-3  ">
           <div className=" p-3 flex justify-start items-center text-gray-400 hover:text-black">Groups</div>
          </div>
          <div className="w-full h-full flex-grow flex flex-col justify-between space-y-2">
            <Groups handleShowChatSection={handleShowChatSection} /> 
           </div>
           
           
          {/* member column in ChatSection */}
           </div>
        </div>

        {/* <!-- Right Section: Chat Window --> */}
        <div class={`w-2/3 h-full ${showChatSection?"block":"hidden"} md:flex flex-col flex-grow chat-section ml-0`}>
          {/* <!-- Chat Header --> */}
          <div className="flex flex-col h-full">
    <div className="float-left" onClick = {()=>{setShowChatSection(false)}}><GoArrowLeft /></div>
      <div className="flex items-center justify-between mt-5 md:mt-0 mb-4 border-b pb-6">
        <div className="flex flex-row justify-start items-center w-[50%] space-x-3 relative">
          <FaUserGroup className=" text-[40px] text-purple-600" />
        </div>
         <div className=" p-1 rounded-lg text-white">
          <IoSettingsOutline className="text-purple-600 text-[30px] mt-1" onClick={handleAddMembersPanel}/>
          </div>
    
          
        </div>
        <div className = "flex flex-row justify-between flex-1">
          <div></div>
         
        {AddMembersPanel && 
       <AddMembersSidePanel handleDeleteGroupClick = {handleDeleteGroupClick} handleAddMembersModal={handleAddMembersModal}/>
  }
 
        </div>
 
      </div>
      <div className="mt-4 flex items-center space-x-2 rounded-xl bg-gray-200">
      <div class="relative w-full">
  <input type="text" placeholder="Search members..." class="w-full border rounded-lg p-2 pr-10" />
  <div class="absolute inset-y-0 right-0 flex items-center pr-3">
  <IoSettingsOutline className="text-gray-500 text-2xl"/>
  </div>
</div>
 <button className="bg-blue-500 text-white p-2 rounded-lg"><BsSendFill /></button>
</div>
</div>
</div>
{/* modal for create group chat and announcements  */}
{showAnnouncementsModal && (
        <ChatAnnouncementsModal 
          onClose={() => setShowAnnouncementsModal(false)} 
        />
      )}
{showCreateGroupModal && (
        <NewGroupChatModal 
          onClose={() => setShowCreateGroupModal(false)} 
        />
      )}
{showDeleteGroupModal && (
        <DeleteGroup
          onClose={() => setShowDeleteGroupModal(false)} 
        />
      )}
{showAddMemberModal && (
        <AddMembers
          onClose={() => setShowAddMemberModal(false)} 
        />
      )}
</div>

  );
};

export default ClientChatInterface;