import { useEffect, useMemo, useState } from "react";
import { useGlobalContext } from "../Context/GlobalContext";

const UserList = ({ userType, fetchUrl, handleSelectedUser }) => {
  const { baseUrl, notifications, openToast } = useGlobalContext();
  const [users, setUsers] = useState(null);

  const sortedUsers = useMemo(() => {
    if (!users || notifications.length === 0) return users;

    return [...users].sort((a, b) => {
      if (notifications.includes(a.id) && !notifications.includes(b.id)) {
        return -1;
      } else if (
        !notifications.includes(a.id) &&
        notifications.includes(b.id)
      ) {
        return 1;
      }
      return 0;
    });
  }, [users, notifications]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(baseUrl + fetchUrl);
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setUsers(data);
      } else {
        const errorData = await response.json();
        openToast(errorData.message, "error");
      }
    } catch (error) {
      openToast("Failed to fetch users", "error");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col h-full justify-between">
      {!users ? (
        <div className="flex justify-center items-center h-full">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        sortedUsers.map((user) => (
          <div
            key={user.id}
            className="flex justify-start space-x-5 ml-2 space-y-2 hover:bg-purple-600 p-2 border border-gray-300 mb-2 rounded-lg shadow-lg bg-white cursor-pointer"
            onClick={() => handleSelectedUser(user)}
          >
            <div className="flex justify-center items-center rounded-full py-2 px-4 border border-gray-300 shadow-lg bg-purple-400">
              {user.name[0]}
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-sm font-normal text-black">{user.name}</p>
              {notifications.includes(user.id) && (
                <span className="float-left text-green-400 text-sm">
                  New Message
                </span>
              )}
            </div>
          </div>
        ))
      )}
      <div className="flex flex-row justify-between mt-15 p-2 rounded bg-gray-300">
        <div className="float-left text-left">Theme</div>
        <div className="float-left text-left">Settings</div>
      </div>
    </div>
  );
};

export default UserList;
