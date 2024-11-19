import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";
import WarningIcon from '@mui/icons-material/Warning';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useGlobalContext } from '../../../../Context/GlobalContext';

const ReviewFine = () => {
  const [isOn, setIsOn] = useState(false);
  const [date, setDate] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

const Reviewfine = () => {
    const { baseUrl, openToast } = useGlobalContext();
    const [isOn, setIsOn] = useState(false);

      {/* Header Section */}
      <div className="flex justify-between items-center mt-5 mb-5">
        <h2 className="font-medium">Daily Work Time</h2>
        <div className="flex items-center gap-2">
          <p>Send SMS to Staff</p>
          <div
            className={`${
              isOn ? 'bg-green-500' : 'bg-gray-300'
            } relative inline-block w-12 h-6 rounded-full cursor-pointer`}
            onClick={toggleSwitch}
          >
            <span
              className={`${
                isOn ? 'translate-x-6' : 'translate-x-0'
              } inline-block w-6 h-6 bg-gray-200 rounded-full transition-transform`}
            />
          </div>
        </div>
      </div>

      {/* Date and Approval Section */}
      <div className="p-2 shadow-md rounded-md flex justify-between mb-5">
        <input value={date} className="text-sm" type="date" />
        <p className="bg-red-100 p-1 text-xs border border-red-300 rounded-md">
          <WarningIcon className="text-red-500 text-sm" /> Approval pending for other
          <Link className="text-blue-500 ml-2" to="/">View</Link>
        </p>
      </div>

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    //salary dropdown
    const [isOpen1, setIsOpen1] = useState(false);



    const toggleDropdown1 = () => {
        setIsOpen1(!isOpen1);
    };

    //salary dropdown

    //salary2 dropdown
    const [isOpen2, setIsOpen2] = useState(false);



    const toggleDropdown2 = () => {
        setIsOpen2(!isOpen2);
    };

    //salary2 dropdown
    const [workTimeDate, setWorkTimeDate] = useState({
        year: "",
        month: "",
        date: "",
    });

    const handleDateChange = (e) => {
        const selectedDate = new Date(e.target.value); // Parse the selected date
        setWorkTimeDate({
            year: selectedDate.getFullYear(),
            month: selectedDate.getMonth() + 1, // Month is 0-based, so add 1
            date: selectedDate.getDate(),
        });
    };
    const [fineDetail, setFineDetail] = useState()
    console.log(fineDetail)
    async function fetchFineDetails() {
        try {
            const result = await fetch(baseUrl + `fine?date=${workTimeDate.year}-${workTimeDate.month}-${workTimeDate.date}`)
            if (result.status == 200) {
                const res = await result.json();
                console.log("res",res)
                setFineDetail(res)
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!workTimeDate.year || !workTimeDate.month || !workTimeDate.date) {
            return;
        }
        fetchFineDetails()
    }, [workTimeDate])

    return (
        <div className='w-full p-[20px]'>
            <div className=''>
                <Link className='text-[14px]' to="/attendence_summary"> <ArrowBackIcon className='back-arrow text-[blue]' /> Back</Link>
            </div>
          )}
        </div>
        <button className="bg-purple-800 text-white rounded-md p-1" type="submit">
          Apply
        </button>
      </div>

            </div>
            <div className='p-[8px] shadow-md rounded-md flex items-center justify-between mb-[20px]'>
                <input className='text-[14px]' type="date" onChange={handleDateChange} />
                <p className='bg-[#edd0ca] p-[5px] text-[12px] border border-b border-[#e07964] text-[black] rounded-md'> <WarningIcon className='warning-icon text-[14px] text-[red] ' /> Approval pending for other  <Link className='text-[blue] ml-[10px]' to="/">View</Link> </p>
            </div>
            <div className='flex items-center gap-[10px] mb-[20px] '>
                <div className='flex items-center gap-[10px] w-[105px] rounded-md p-[6px] font-medium select-pe'>
                    <input type="checkbox" />
                    <p className='text-[14px]'>Select All</p>


                </div>

                <div className="relative inline-block text-left">
                    {/* Button to open/close the dropdown */}
                    <button
                        className="flex items-center gap-[5px] p-[6px] text-[14px]  w-full  text-sm font-medium text-[black] select-pe  rounded-md  focus:outline-none"
                        onClick={toggleDropdown}
                    >
                        Fixed Amount <KeyboardArrowDownIcon />
                    </button>

                    {/* Dropdown menu */}
                    {isOpen && (
                        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right left-[0px] bg-white border border-gray-200 rounded-md shadow-cs">
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    role="menuitem"
                                >
                                    Option 1
                                </a>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    role="menuitem"
                                >
                                    Option 2
                                </a>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    role="menuitem"
                                >
                                    Option 3
                                </a>
                            </div>
                        </div>
                    )}
                </div>

                <div>
                    <button className='apply-btn bg-[#27004a] rounded-md text-[white]' type='submit'>Apply</button>
                </div>



            </div>
            <div className='flex gap-[10px] items-center mb-[20px]'>
                <input type="checkbox" />
                <p className='text-[14px]'>DAILY SHIFT I 10:00 AM - 6:30 PM</p>
            </div>

            {/* {
                fineDetail?.map((item, index) => {
                    return <div className='shadow-md rounded-md p-[20px] mb-[20px]  '>
                        <div className='flex items-center gap-[16px] w-full'>
                            <input className='h-[12px]' type="checkbox" />
                            <div>
                                <h5 className='text-[14px]'>{item?.name || "N/A"}</h5>
                                <p className='text-[12px] text-[#ad9f9f]' >in {new Date(item?.punchRecord?.punchIn?.punchInDate).toLocaleTimeString()} I Out {new Date(item?.punchRecord?.punchIn?.punchOut).toLocaleTimeString()}</p>
                            </div>
                            <div className='flex gap-[20px] ml-[50px]'>
                                <div>
                                    <h5 className='text-[12px] font-medium'>37 min late</h5>
                                    <p className='text-[12px] text-[#ad9f9f]' >37 min</p>
                                </div>
                                <div>
                                    <h5 className='text-[12px] font-medium'>23 Sep, 2024</h5>
                                    <p className='text-[12px] text-[#ad9f9f]' >DAILY SHIFT</p>
                                </div>
                            </div>
                        </div>
        
                        <div className='p-[30px] flex justify-between  mb-20px '>
                            <div className='flex gap-[50px]'>
                                <div className='flex items-center gap-[10px]'>
                                    <input type="checkbox" />
                                    <p className='text-[14px] font-medium'>Late Entry</p>
        
                                </div>
                                <div className='flex gap-[26px]'>
                                    <div>
                                        <p className='text-[12px]'>Hours</p>
                                        <p className='text-[14px] select-pe p-[5px] w-[124px] rounded-md'>00:37      hrs</p>
                                        <p className='text-[12px]' >Amount $ 48.37</p>
                                    </div>
                                    <div>
                                        <p className='text-[12px]'>Fine Amount</p>
                                        <div className="relative inline-block text-left">
                                            <button
                                                className=" w-[164px] items-center p-[6px] text-left text-[12px] text-sm font-normal text-[black] select-pe  rounded-md  focus:outline-none"
                                                onClick={toggleDropdown1}
                                            >
                                                1x Salary <KeyboardArrowDownIcon className='new-arrow1' />
                                            </button>
        
                                            {isOpen1 && (
                                                <div className="absolute right-0 w-[100%] z-10 mt-2  origin-top-right left-[0px] bg-white border border-gray-200 rounded-md shadow-cs">
                                                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                        <a
                                                            href="#"
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            role="menuitem"
                                                        >
                                                            Option 1
                                                        </a>
                                                        <a
                                                            href="#"
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            role="menuitem"
                                                        >
                                                            Option 2
                                                        </a>
                                                        <a
                                                            href="#"
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            role="menuitem"
                                                        >
                                                            Option 3
                                                        </a>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
        
        
        
                                    </div>
                                    <div className='flex items-center'>
                                        <p className='text-[14px] select-pe p-[5px] w-[124px] bg-[#eeeeee] rounded-md'>$ 78.44  Per Hour</p>
                                    </div>
        
        
        
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <button className='apply-btn bg-[#27004a] rounded-md text-[white]' type='submit'>Save</button>
                            </div>
        
                        </div>
                    </div>
                    
                })
            } */}

           


          
            <div>
              <h5 className="text-xs font-medium">23 Sep, 2024</h5>
              <p className="text-xs text-gray-500">DAILY SHIFT</p>
            </div>
          </div>
        </div>
        {/* Details Section */}
        <div className="p-5 flex justify-between">
          <div className="flex gap-8">
            <div className="flex items-center gap-2">
              <input value="Valid Content" type="checkbox" />
              <p className="text-sm font-medium">Late Entry</p>
            </div>
            <div className="flex gap-6">
              <div>
                <p className="text-xs">Hours</p>
                <p className="text-sm bg-gray-100 p-1 rounded-md">00:37 hrs</p>
                <p className="text-xs">$48.37</p>
              </div>
              <div>
                <p className="text-xs">Fine Amount</p>
                <button
                  className="w-40 p-1 text-left text-sm rounded-md bg-gray-200"
                  onClick={toggleDropdown1}
                >
                  1x Salary <KeyboardArrowDownIcon />
                </button>
                {isOpen1 && (
                  <div className="absolute z-10 mt-2 w-40 bg-white border rounded-md shadow-md">
                    <div className="py-1">
                      <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Option 1
                      </a>
                      <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Option 2
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <button className="bg-purple-800 text-white rounded-md p-1" type="submit">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewFine;
