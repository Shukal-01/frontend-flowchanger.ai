import { useEffect, useRef } from "react";
import { timeSince, formatMessageDate } from "../utils/helper"; // formatMessageDate is a new helper to format dates
import { useGlobalContext } from "../Context/GlobalContext";
import AddMembersSidePanel from "../pages/Client_Panel/Chats/AddMembersSidePanel";

function MessagesDisplay({ messages }) {
  const { id } = useGlobalContext();
  const chatContainerRef = useRef(null);
 

  // Helper to determine the date grouping for messages
  const groupMessagesByDate = (messages) => {
    const grouped = {
      today: [],
      yesterday: [],
      older: {},
    };

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    messages.forEach((message) => {
      const messageDate = new Date(message.timestamp);
      const isToday = messageDate.toDateString() === today.toDateString();
      const isYesterday =
        messageDate.toDateString() === yesterday.toDateString();

      if (isToday) {
        grouped.today.push(message);
      } else if (isYesterday) {
        grouped.yesterday.push(message);
      } else {
        const dateKey = messageDate.toLocaleDateString();
        if (!grouped.older[dateKey]) grouped.older[dateKey] = [];
        grouped.older[dateKey].push(message);
      }
    });

    return grouped;
  };

  const groupedMessages = groupMessagesByDate(messages);

  useEffect(() => {
    if (chatContainerRef.current && messages) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={chatContainerRef}
      className="p-4 rounded-lg flex flex-col flex-grow overflow-y-scroll custom-scrollbar"
    >
      {messages.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <p>No Messages</p>
        </div>
      ) : (
        <>
          {/* Render older messages with specific dates */}
          {Object.keys(groupedMessages.older).map((date) => (
            <div key={date}>
              <div className="text-center text-gray-500 my-2">{date}</div>
              {groupedMessages.older[date].map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isSender={message.senderId === id}
                />
              ))}
            </div>
          ))}

          {/* Render "Yesterday" messages */}
          {groupedMessages.yesterday.length > 0 && (
            <>
              <div className="text-center text-gray-500 my-2">Yesterday</div>
              {groupedMessages.yesterday.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isSender={message.senderId === id}
                />
              ))}
            </>
          )}
          {/* Render "Today" messages */}
          {groupedMessages.today.length > 0 && (
            <>
              <div className="text-center text-gray-500 my-2">Today</div>
              {groupedMessages.today.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isSender={message.senderId === id}
                />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
}

function MessageBubble({ message, isSender }) {
  return (
    <div
      className={`w-full flex ${
        isSender ? "justify-end" : "justify-start"
      } mb-2`}
    >
      <p className="bg-purple-600 text-white flex flex-col rounded-xl py-2 px-4 max-w-max float-right">
        <span>{message.content}</span>
        <span className="text-[10px] text-gray-300">
          {timeSince(message.timestamp)}
        </span>
      </p>
    </div>
  );
}

function ChatComponent({ messages }) {
  const {AddMembersPanel , setShowAddMembersPanel} = useGlobalContext(); 

  useEffect(()=>{
    console.log(AddMembersPanel);
  })
  if (!messages) {
    console.log("loading...");
    return (
      <div className="p-4 pt-0 rounded-lg flex flex-row justify-between flex-grow overflow-y-scroll custom-scrollbar h-[400px]">
        <div className="flex justify-center items-center h-full">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG paths here */}
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        {AddMembersPanel && 
       <AddMembersSidePanel />
  }
      </div>
    );
  } else {
    return <MessagesDisplay messages={messages} />;
  }
}

export default ChatComponent;
