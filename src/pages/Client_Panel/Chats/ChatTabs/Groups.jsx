import { FaUserGroup } from "react-icons/fa6";
const Groups = () =>{
 return (
        <div className="flex justify-start space-x-5 ml-3 hover:bg-slate-300 p-1">
        <div className="flex justify-center items-center rounded-full p-2  h-10 w-10">
        <FaUserGroup className="text-purple-600 text-[50px] h-10"/>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-md font-normal text-black">Gyno</h2>
        </div>
</div>
    )
}

export default Groups;