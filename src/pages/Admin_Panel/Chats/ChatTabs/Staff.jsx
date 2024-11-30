import UserList from "../../../../components/UserList";
const Staff = ({ handleSelectedUser }) => {
  return (
    <UserList
      userType="Staff"
      fetchUrl="/staff"
      handleSelectedUser={handleSelectedUser}
    />
  );
};

export default Staff;
