import React from "react";

export default function ConfirmationModal({id,callback,loading,setClose}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
      <div className="bg-white rounded-lg shadow-cs max-w-lg w-full h-[200px] p-6">
        <h2 className="text-xl text-center text-[18px] text-[black] font-semibold mt-[28px] mb-[28px] ">
          Are you sure want to Delete this ?{" "}
        </h2>
    

        <div className="flex justify-around ">
          <button
            onClick={() => {
              callback(id)
            }}
            disabled={loading ?? false}
            className={`px-4 py-2 bg-[#27004a] text-[14px] text-white rounded-md ${
              loading ? "opacity-50" : ""
            }`}
          >
            {loading ? "Confirming..." : " Yes , Confirm"}
          </button>
          <button
            onClick={setClose}
            className="px-4 py-2 bg-[#27004a] text-[14px] text-white rounded-md"
          >
            No , Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
