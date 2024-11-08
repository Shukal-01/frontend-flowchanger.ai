import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import { set } from "react-hook-form";

const SOCKET_SERVER_URL = "http://localhost:5000";

export const MainContext = createContext();
export const GlobalContext = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const baseUrl = "http://localhost:5000/api/";
  const [staffTab, setStaffTab] = useState(0);
  const [name, setName] = useState("");
  const [depId, setDepId] = useState("");
  const [roleName, setRoleName] = useState("");
  const [roleId, setRoleId] = useState("");
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [editPermissions, setEditPermissions] = useState({
    clients_permissions: {
      view_global: false,
      create: false,
      edit: false,
      delete: false,
    },
    projects_permissions: {
      view_global: false,
      create: false,
      edit: false,
      delete: false,
    },
    report_permissions: { view_global: false, view_time_sheets: false },
    staff_role_permissions: {
      view_global: false,
      create: false,
      edit: false,
      delete: false,
    },
    settings_permissions: { view_global: false, view_time_sheets: false },
    staff_permissions: {
      view_global: false,
      create: false,
      edit: false,
      delete: false,
    },
    task_permissions: {
      view_global: false,
      create: false,
      edit: false,
      delete: false,
    },
    sub_task_permissions: {
      view_global: false,
      create: false,
      edit: false,
      delete: false,
    },
    chat_module_permissions: { grant_access: false },
    ai_permissions: { grant_access: false },
  });

  const openToast = (msg, flag) => {
    toast(msg, { type: flag });
  };

  const fetchDetails = async () => {
    const response = await fetch(baseUrl + "/staff");

    if (response.status == 200) {
      const data = response.json();
      setSelectedStaff(data);
    }
  };

  // chatting section logic starts here

  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [currRoom, setCurrRoom] = useState(null);
  const [id, setId] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showChatSection, setShowChatSection] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  useEffect(() => {
    if (Cookies.get("flowChangerAuthToken")) {
      const socketInstance = io(SOCKET_SERVER_URL);
      setSocket(socketInstance);

      socketInstance.on("connect", () => {
        socketInstance.emit("setup", {
          token: Cookies.get("flowChangerAuthToken"),
        });
      });

      return () => {
        socketInstance.disconnect();
      };
    }
  }, []);
  useEffect(() => {
    if (socket) {
      socket.on("message_received", (data) => {
        if (currRoom && data.roomId === currRoom.id) {
          setMessages((prevMessages) => [...(prevMessages || []), data]);
        } else {
          console.log("new notification", data.sender.id);
          setNotifications((prevNotifications) =>
            prevNotifications.includes(data.sender.id)
              ? prevNotifications
              : [...prevNotifications, data.sender.id]
          );
        }
      });
    }

    return () => {
      if (socket) socket.off("message_received");
    };
  }, [socket, currRoom]);

  const fetchOneOnOneChat = async (id) => {
    try {
      const response = await fetch(`${baseUrl}chat/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("flowChangerAuthToken")}`,
        },
      });
      console.log(response);
      if (!response.status == 200) {
        openToast(`Failed to fetch chat`, "error");
      } else {
        const room = await response.json();
        socket.emit("join_room", room.id);
        setCurrRoom(room);
        setId(room.userId);
        setMessages(room.messages ?? []);
      }
    } catch (error) {
      console.log(error);
      openToast("Something went wrong", "error");
    }
  };

  const sendMessage = async () => {
    try {
      setIsSendingMessage(true);
      if (message != "") {
        console.log(message, currRoom.id);
        const response = await fetch(`${baseUrl}message/send`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("flowChangerAuthToken")}`,
          },
          body: JSON.stringify({ content: message, roomId: currRoom.id }),
        });

        if (!response.status == 200) {
          openToast(`${(await response.json()).error}`, "error");
        } else {
          const { message, room, users } = await response.json();
          setMessages([...messages, message]);
          socket.emit("send_message", {
            message: message,
            room: room,
            users: users,
          });
        }
        setMessage("");
      }
    } catch (error) {
      openToast("Something went wrong", "error");
    } finally {
      setIsSendingMessage(false);
    }
  };
  const handleSelectedUser = (user) => {
    if (notifications.includes(user.id)) {
      notifications.splice(notifications.indexOf(user.id), 1);
    }
    setSelectedUser(user);
    setMessages(null);
    fetchOneOnOneChat(user.id);
    setShowChatSection(true);
  };
  // chatting section logic ends here

  return (
    <MainContext.Provider
      value={{
        selectedTab,
        setSelectedTab,
        staffTab,
        openToast,
        setStaffTab,
        baseUrl,
        name,
        setName,
        depId,
        setDepId,
        roleName,
        setRoleName,
        roleId,
        setRoleId,
        editPermissions,
        setEditPermissions,
        selectedStaff,
        setSelectedStaff,
        fetchDetails,
        socket,
        messages,
        setSelectedUser,
        selectedUser,
        setMessages,
        fetchOneOnOneChat,
        message,
        setMessage,
        sendMessage,
        setId,
        id,
        notifications,
        setNotifications,
        handleSelectedUser,
        setShowChatSection,
        showChatSection,
        isSendingMessage,
        setIsSendingMessage,
      }}
    >
      {children}
      <ToastContainer />
    </MainContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(MainContext);
};
