import { useState } from "react";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { IoCall } from "react-icons/io5";
import Groups from "./ChatTabs/Group";
import { FaUserGroup } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { BsSendFill } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import Staff from "./ChatTabs/Staff";
import profile from "../../../src/Assets/Images/Profile.png";
import { useGlobalContext } from "../../Context/GlobalContext";
import Admin from "./ChatTabs/Admin";
import { timeSince } from "../../utils/helper";
import ChatComponent from "../../components/ChatComponent";
import Loader from "../../components/Loader";

const StaffChatInterface = () => {
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
    isSendingMessage,
  } = useGlobalContext();
  const [chatTab, setChatTab] = useState("admins");

  return (
    <div class=" overflow-hidden ">
      {/* <!-- Container for Chat Section --> */}
      <div class="flex   shadow-lg rounded-lg  h-[calc(100vh-50px)] parent-container bg-white">
        {/* <!-- Left Section: Members List --> */}
        
           <div
           className={`w-full ${
             showChatSection ? "hidden sm:block" : "block"
           } md:w-1/3 flex flex-col border-r-2 h-full bg-white overflow-hidden`}
             
        >
          <div className="flex flex-row justify-start items-center space-x-3 border-b  pb-5 mb-2">
            <div className="border rounded-full border-green-500">
              <img src={profile} alt="" className="w-9 h-9 rounded-full" />
            </div>
            <p className="text-xl font-medium">Kanika Arora</p>
          </div>
          {/* <!-- Search Bar --> */}
          <div class="flex items-center bg-white rounded-full shadow-lg  mb-2 border border-gray-300 mt-3 mx-3">
            <input
              type="text"
              placeholder="Search members..."
              class="bg-transparent outline-none w-full pl-2 py-1 text-sm font-normal"
            />
            <IoSearch className="text-[30px] pr-2 mt-1 text-gray-400" />
          </div>

          {/* <!-- Member List --> */}
          <div className="flex flex-col h-full flex-grow overflow-y-auto px-3">
            <div class="mb-4 w-full md:w-[80%]   grid grid-cols-3  ">
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
                <Admin handleSelectedUser={handleSelectedUser} />
              ) : (
                <Groups />
              )}
        

            {/* member column in ChatSection */}
          </div>
        </div>
        {/* <!-- Right Section: Chat Window --> */}

       <div className={`md:w-2/3  md:flex flex-col flex-grow ${
    showChatSection ? "block sm:block" : "hidden sm:block"
  } chat-section`}>
          {!showChatSection && (
            <div className="flex justify-center items-center h-full">
              <p className="text-lg font-semibold text-gray-400">
                Select a user to start chatting
              </p>
            </div>
          )}
          {showChatSection && (
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between mt-5 md:mt-0 mb-4 border-b pb-[6px]">
                <div className="flex flex-row justify-start items-center w-[70%] md:w-[50%] space-x-3 relative rounded-[100%]">
                  <div
                    className="float-left"
                    onClick={() => {
                      setShowChatSection(false);
                    }}
                  >
                    <GoArrowLeft className="size-5" />
                  </div>
                  <div className="flex justify-center items-center rounded-full  py-2 px-4 border border-gray-300 shadow-lg bg-purple-400">
                    {/* <img
                    src={staff.imgSrc}
                    className="w-10 h-10"
                    alt={staff.name}
                  /> */}
                    {selectedUser.name[0]}
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-md font-normal mt-2">
                      {selectedUser.name}
                    </h2>
                    <p className="text-sm text-gray-300">
                      last seen 3 hours ago
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <HiOutlineSpeakerWave className=" text-purple-600 h-[30px] w-[30px]" />
                  <IoCall className="  text-purple-600 h-[30px] w-[25px]" />
                </div>
              </div>
              <ChatComponent messages={messages} />
              <div className="mt-4 flex items-center  rounded-xl">
                <div class="relative w-[96%]">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Send Message..."
                    class="w-full border rounded-lg p-2 pr-10"
                  />
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3">
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
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffChatInterface;
