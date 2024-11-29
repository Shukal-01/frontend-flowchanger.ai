import { MdOutlineClose } from "react-icons/md";
const DeleteGroup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">crm.flowchanger.com says</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <MdOutlineClose />
          </button>
        </div>
        <hr />
        <div className="space-y-4">
          <div className="w-full text-center mt-3">
            <h2>Are you sure you want to delete this group</h2>
          </div>

        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            cancel
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
            confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteGroup;
