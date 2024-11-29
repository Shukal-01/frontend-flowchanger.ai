import UserList from "../../../components/UserList";

const Admin = ({ handleSelectedUser }) => {
  return (
    <UserList
      userType="Admin"
      fetchUrl="/admin"
      handleSelectedUser={handleSelectedUser}
    />
  );
};

export default Admin;
