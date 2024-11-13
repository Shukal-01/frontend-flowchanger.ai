import ProfilePic from "../../../../Assets/Images/users.jpg";
import UserList from "../../../../components/UserList";
const Clients = ({ handleSelectedUser }) => {
  return (
    <UserList
      userType="Clients"
      fetchUrl={"/client"}
      handleSelectedUser={handleSelectedUser}
    />
  );
};

export default Clients;
