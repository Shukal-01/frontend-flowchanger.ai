import React from 'react'
import Modal from 'react-responsive-modal'


const DeleteBranch = ({ id, setId, deleteBranch }) => {

    return (
        <Modal open={id} onClose={() => setId(null)} center >
            <div className='bg-white rounded-lg  max-w-lg w-full h-[200px] p-6'>
                <div className="flex items-center justify-center ">
                    <h2 className="text-[18px] pt-[20px] font-medium text-center text-[#27004a]">Are you sure want to delete this Branch</h2>
                </div>
                <div className="flex items-center justify-around p-[10px] gap-2 mt-[27px]">
                    <button onClick={() => deleteBranch(id)} className="px-4 py-2 bg-[#27004a] text-white rounded-md ">Yes , Confirm</button>
                    <button className="px-4 py-2 bg-[#27004a] text-white rounded-md " onClick={() => setId(null)}>No , Cancel</button>
                </div>
            </div>
        </Modal>
    )
}

export default DeleteBranch