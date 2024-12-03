import { useState } from "react";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { IoCall } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { BsSendFill } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import profile from "../../Assets/Images/profile.svg";
import { useGlobalContext } from "../../Context/GlobalContext";
import { timeSince } from "../../utils/helper";
import ChatComponent from "../../components/ChatComponent";
import Loader from "../../components/Loader";
import Groups from "../Staff_Panel/ChatTabs/Group";
import Admin from "../Staff_Panel/ChatTabs/Admin";
import ChatAnnouncementsModal from "./Chats/ChatAnnouncements";
import NewGroupChatModal from "./Chats/NewGroupModal";
import AddMembersSidePanel from "./Chats/AddMembersSidePanel";
import DeleteGroup from "./Chats/DeleteGroup";
import AddMembers from "./Chats/AddMembersModal";
import { MdGroups2 } from "react-icons/md";
import { TfiAnnouncement } from "react-icons/tfi";
import GroupChat from "./GroupChat";


const ClientChatInterFace = () => {
  const {
    setSelectedUser,
    messages,
    fetchOneOnOneChat,
    selectedUser,
    setMessages,
    message,
    setMessage,
    sendMessage,
    showChatSection,
    setShowChatSection,
    id,
    setId,
    handleSelectedUser,
    toggleSettings,
    showAnnouncementsModal, 
    setShowAnnouncementsModal,
    showCreateGroupModal, 
    setShowCreateGroupModal,
    AddMembersPanel , 
    setShowAddMembersPanel,
    showDeleteGroupModal , 
    setShowDeleteGroupModal,
    showAddMemberModal , 
    setShowAddMemberModal,
    handleAddMembersModal,
    handleAddMembersPanel,
    handleAnnouncementsClick,
    handleCreateGroupClick,
    handleDeleteGroupClick,
    handleToggleSettings,
    isSendingMessage,
  } = useGlobalContext();
  const [chatTab, setChatTab] = useState("admins");
 

 

  return (
    <div class=" overflow-hidden ">
      {/* <!-- Container for Chat Section --> */}
      <div class="flex   shadow-lg rounded-lg h-[90vh]  parent-container bg-white">
        {/* <!-- Left Section: Members List --> */}
        <div
      className={`w-full ${
        showChatSection ? "hidden sm:block" : "block"
      } md:w-1/3 flex flex-col border-r-2 h-full bg-white overflow-hidden `}
        >
          <div className="flex flex-row justify-start items-center space-x-3 border-b  pb-5 mb-2">
            <div className="border rounded-full border-green-500">
              <img src={profile} alt="" className="w-9 h-9 rounded-full" />
            </div>
            <p className="text-xl font-medium">Kanika Arora</p>
          </div>
          {/* <!-- Search Bar --> */}
          <div className="flex flex-row justify-between items-center space-x-2 mx-4">
          <div class="flex items-center bg-white rounded-full shadow-lg  mb-2 border border-gray-300   mt-3 w-[90%]">
            <input
              type="text"
              placeholder="Search members..."
              class="bg-transparent outline-none w-full pl-2 py-2 text-sm font-normal   "
            />
            <IoSearch className="text-[30px] pr-2 mt-1 text-gray-400" />
          </div>
          <div className="relative mt-1">
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
          <div className="flex flex-col  overflow-y-auto  flex-grow  px-3 mb-4">
            <div class="mb-4  xs:w-[100%] md:w-[80%] flex flex-row justify-start space-x-2  ">
              <div
                className="p-3 flex justify-start text-gray-400 items-center hover:text-black"
                onClick={() => {
                  setChatTab("admins");
                }}
              >
                Admins
              </div>
              <div
                className=" p-3 flex justify-start items-center text-gray-400 hover:text-black"
                onClick={() => {
                  setChatTab("groups");
                }}
              >
                Groups
              </div>
            </div>
            
              {chatTab === "admins" ? (
                <>
                <Admin handleSelectedUser={handleSelectedUser} />
                </>
              ) : (
                <Groups />
              )}
            

            {/* member column in ChatSection */}
          </div>
        </div>
        {/* <!-- Right Section: Chat Window --> */}

        <div
  className={`md:w-2/3  md:flex flex-col flex-grow ${
    showChatSection ? "block sm:block" : "hidden sm:block"
  } chat-section`}
>
  {chatTab === "admins" ? (
    !showChatSection ? (
      <div className="flex justify-center items-center h-full">
        <p className="text-lg font-semibold text-gray-400">
          Select a user to start chatting
        </p>
      </div>
    ) : (
      <div className="h-full flex flex-col ">
        {/* Chat Header */}
        <div className="flex items-center justify-between mt-5 md:mt-0 border-b pb-[6px]">
          <div className="flex flex-row justify-start items-center w-[70%] md:w-[50%] space-x-3 relative rounded-[100%]">
            <div
              className="float-left cursor-pointer"
              onClick={() => setShowChatSection(false)}
            >
              <GoArrowLeft className="size-5" />
            </div>
            <div className="flex justify-center items-center rounded-full py-2 px-4 border border-gray-300 shadow-lg bg-purple-400">
              {selectedUser && selectedUser.name
                ? selectedUser.name[0]
                : "N/A"}
            </div>
            <div className="flex flex-col">
              <h2 className="text-md font-normal mt-2">
                {selectedUser.name ?? "Not available"}
              </h2>
              <p className="text-sm text-gray-300">last seen 3 hours ago</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <HiOutlineSpeakerWave className="text-purple-600 h-[30px] w-[30px]" />
            <IoCall className="text-purple-600 h-[30px] w-[25px]" />
            
          </div>
        </div>
        {/* Chat Component */}
        <div className="flex flex-col justify-between h-full">
        <ChatComponent messages={messages} />
        {/* Message Input */}
        <div className="mt-4 flex items-center rounded-xl">
          <div className="relative w-[96%]">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Send Message..."
              className="w-full border rounded-lg p-2 pr-10"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <IoSettingsOutline className="text-gray-500 text-2xl" />
            </div>
          </div>
          <button
            onClick={sendMessage}
            disabled={isSendingMessage}
            className={`bg-purple-500 text-white flex justify-center items-center p-2 py-3 rounded-xl w-[4%] ${
              isSendingMessage && "opacity-50"
            }`}
          >
            <BsSendFill />
          </button>
        </div>
        </div>
      </div>
    )
  ) : (
    <GroupChat />
  )}
</div>

      </div>
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

export default ClientChatInterFace;