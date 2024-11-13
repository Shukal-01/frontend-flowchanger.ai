import ProfilePic from "../../../Assets/Images/Profile.png";
const Staff = ({handleShowChatSection,handleSelectedStaff}) =>{

    const staffMembers = [
      { id: 1, name: "Flowchanger Agency", message: "hii", imgSrc: ProfilePic },
      { id: 2, name: "Flowchanger Agency", message: "hii", imgSrc: ProfilePic },
      { id: 3, name: "Flowchanger Agency", message: "hii", imgSrc: ProfilePic },
      { id: 4, name: "Flowchanger Agency", message: "hii", imgSrc: ProfilePic },
      { id: 5, name: "Flowchanger Agency", message: "hii", imgSrc: ProfilePic }
    ];
  
  return (<>
  <div className="flex flex-col h-full justify-between">
  {
    staffMembers.map(staff=>{
      return (
        <div className="flex justify-start space-x-5 ml-2 space-y-2 hover:bg-purple-600 p-2 border border-gray-300 mb-2 rounded-lg shadow-lg bg-white" onClick = {()=>{handleShowChatSection();handleSelectedStaff(staff)}}>
              <div className="flex justify-center items-center rounded-full  h-10 w-10 border border-gray-300 shadow-lg bg-purple-400">
                <img src={staff.imgSrc} className="w-full h-full rounded-full" alt={staff.name} />
              </div>
              <div className="flex flex-col justify-center items-center">
                <p className="text-sm font-normal text-black">{staff.name}</p>
                <p className="float-left  w-full text-gray-400" >{staff.message}</p>
              </div>
      </div>
      )
    })
  }
  <div className="flex flex-row justify-between  mt-15 p-2 rounded bg-gray-300">
  <div className="float-left text-left">Theme</div>
  <div className="float-left text-left">Settings</div>
  </div>
  </div>
  </>
  )
  
  }
  
  export default Staff;