import { MdOutlineClose } from "react-icons/md";
const AddMembers = ({onClose}) =>{
  
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Add Members</h2>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <MdOutlineClose />
              </button>
            </div>
       <hr />
            <div className="space-y-4">
              <div className='w-full text-center mt-3'><h2>Select members to add to group</h2></div>
              <div>

         

                <div className='w-full mb-2'>  
        <label for="mySelect" className='text-sm text-gray-600 mb-1 ml-2'>select members to add to group</label>  
        <select id="mySelect" className='w-full  border rounded-md p-1'>  
            <option value="option1" className="text-gray-500">select members</option>  
        </select>  
    </div> 
          
              </div>
            </div>
            {/* creating the border */}
    <div></div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      );

}

export default AddMembers;