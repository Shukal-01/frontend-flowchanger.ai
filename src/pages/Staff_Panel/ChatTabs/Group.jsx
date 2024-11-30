import { FaUserGroup } from "react-icons/fa6";
const Groups = () =>{
 return (
  <div
 
  className="flex justify-start items-center space-x-5 ml-2  hover:bg-purple-600 p-2 border border-gray-300 mb-2 rounded-lg shadow-lg bg-white cursor-pointer"
 
>
  <div className="flex justify-center items-center rounded-full py-2 px-4 border border-gray-300 shadow-lg bg-purple-400">
  <FaUserGroup/>
  </div>
  <div className="flex  w-full">
    <p className="text-sm font-normal text-black">
     Gyno
    </p>
    
  </div>
</div>
    )
}

export default Groups;