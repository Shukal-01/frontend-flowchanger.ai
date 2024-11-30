import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useParams } from 'react-router';


const BackgroundVerification = () => {
    const { id } = useParams();
    useEffect(() => {
        console.log("back", id)

    }, [])
    return (
        <>
            {/* // <div className='w-full p-[20px] pt-[80px] xl:p-[40px] relative xl:pt-[60px]    xl:pl-[320px] flex flex-col '> */}
            <div className='flex justify-between items-center  w-[100%] p-[30px] pl-[0] top-0 bg-white'>
                <h3 className='font-medium'>Background Verification</h3>
            </div>

            <div className='id-proof shadow-cs bg-white rounded-lg'>
                <h3 className='p-3 border border-b border-l-0 border-r-0 border-t-0 font-medium'>ID Proofs</h3>
                <Link className='flex justify-between items-center p-4  border-b border-[#dbdbdb] hover:bg-[#f0f8fd] ' to="/verify-aadhar ">
                    <h4 className='font-normal'>Aadhaar</h4>
                    <ArrowForwardIosIcon className='allarrow-verify' />
                </Link>

                <Link className='flex justify-between items-center p-4 border-b border-[#dbdbdb]  hover:bg-[#f0f8fd]' to="/verify-pan">
                    <h4 className='font-normal'>PAN</h4>
                    <ArrowForwardIosIcon className='allarrow-verify'/>
                </Link>
                <Link className='flex justify-between items-center p-4 border-b border-[#dbdbdb]  hover:bg-[#f0f8fd]' to="/driving-license">
                    <h4 className='font-normal'>Driving License</h4>
                    <ArrowForwardIosIcon className='allarrow-verify'/>
                </Link>
                <Link className='flex justify-between items-center p-4  border-b border-[#dbdbdb] hover:bg-[#f0f8fd]' to="/uan">
                    <h4 className='font-normal'>UAN</h4>
                    <ArrowForwardIosIcon className='allarrow-verify'/>
                </Link>
                <Link className='flex justify-between items-center p-4  border-b border-[#dbdbdb] hover:bg-[#f0f8fd]' to="/voter-id">
                    <h4 className='font-normal'>Voter ID</h4>
                    <ArrowForwardIosIcon className='allarrow-verify'/>
                </Link>
                <Link className='flex justify-between items-center p-4 border-b border-[#dbdbdb]  hover:bg-[#f0f8fd]' to="/face">
                    <h4 className='font-normal'>Face</h4>
                    <ArrowForwardIosIcon className='allarrow-verify'/>
                </Link>
                <Link className='flex justify-between items-center p-4 border-b border-[#dbdbdb] hover:bg-[#f0f8fd]' to="/address">
                    <h4 className='font-normal'>Address</h4>
                    <ArrowForwardIosIcon className='allarrow-verify'/>
                </Link> <Link className='flex justify-between items-center border-b border-[#dbdbdb] p-4  hover:bg-[#f0f8fd]' to="/past-employment-details">
                    <h4 className='font-normal'>Past Employment</h4>
                    <ArrowForwardIosIcon className='allarrow-verify'/>
                </Link>
            </div>
            {/* </div> */}
        </>
    )
}

export default BackgroundVerification