import React,{useState} from 'react'
import Modal from 'react-responsive-modal'
import { useGlobalContext } from '../../../Context/GlobalContext';

const AbsentModal = ({id, setStatus, status,selecteddate,attendance }) => {
    const { baseUrl, openToast } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(false);
    

    async function confirmation() {
        try {
           setIsLoading(true);
           if (status == "") {
               openToast("Please Select Status", "error");
               return;
           }
           const result = await fetch(
               baseUrl + `attendance/status/${id}`,
               {
                   method: "PATCH",
                   headers: {
                       "Content-type": "application/json",
                   },
                   body: JSON.stringify({ status: status }),
               }
           );
           if (result.status == 200) {
               openToast("Updated Status Successfully", "success");
               setStatus("")
               attendance();
           } else {
               openToast("Something went wrong", "error");
           }
       } catch (error) {
           openToast("Something went wrong", "error");
       } finally {
           setIsLoading(false);
       }
   }


    return (
        <Modal open={status == "ABSENT"} onClose={() => setStatus("")} center >
            <div className="pt-5">
                <div className=" pl-0 pr-0 p-4 relative text-center">
                    <div className="">
                      <h2 className='font-bold text-[#130025] text-[20px]'>Sure You Want To Accept ?
                      </h2>
                      <p>Are you sure you want to accept this ??</p>
                    </div>
                </div>

                <div className='flex justify-around'>
                <button className={`second-btn  ${isLoading == true ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={confirmation}>
                    Yes,Confirm
                </button>
                <button className={`second-btn `} onClick={() => setStatus("")}>
                    Cancel
                </button>
                </div>

            </div>
        </Modal>
    )
}

export default AbsentModal