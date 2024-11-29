
import { MdGroups2 } from "react-icons/md";
import { useEffect } from "react";
import { useGlobalContext } from "../../Context/GlobalContext";
import { GoArrowLeft } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import ChatComponent from "../../components/ChatComponent";
import { BsSendFill } from "react-icons/bs";
import { TfiRulerAlt } from "react-icons/tfi";

const GroupChat = () =>{
  console.log("i am in groupchat component")
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
    
    AddMembersPanel , 
    handleAddMembersPanel,
  
    isSendingMessage,
  } = useGlobalContext();

  useEffect(()=>{
    console.log(AddMembersPanel);
  })
          return (
            <>
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between mt-5 md:mt-0  border-b pb-[6px]">
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
                    {selectedUser && selectedUser?.name
                      ? selectedUser?.name[0]
                      : "N/A"}
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-md font-normal mt-2">
                      {selectedUser?.name ?? "Not available"}
                    </h2>
                    <p className="text-sm text-gray-300">
                      last seen 3 hours ago
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2" onClick={handleAddMembersPanel}>
                  <IoSettingsOutline className="  text-purple-600 h-[33px] w-[25px]" />
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
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 mr-2">
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
            </>
          )        
        
}

export default GroupChat;
