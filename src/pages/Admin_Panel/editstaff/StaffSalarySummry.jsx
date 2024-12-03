import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import WarningIcon from '@mui/icons-material/Warning';
import DownloadIcon from '@mui/icons-material/Download';
import SettingsIcon from '@mui/icons-material/Settings';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useParams } from 'react-router';
import { useGlobalContext } from "../../../Context/GlobalContext";
import PresentAndHalfDayModal from "../../../components/Edit_Staff/PresentAndHalfDayModal";

const StaffSalarySummry = () => {
    const { id } = useParams();
    // console.log(id)

    const { baseUrl, selectedStaff, openToast } = useGlobalContext();

    const [punchId, setPunchId] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const [fine, setFine] = useState({
        staffId: selectedStaff?.staffDetails?.id,
        lateEntryHour: "",
        excessBreakHour: "",
        earlyOutHour: "",
        lateEntryFineAmount: 0,
        lateEntryAmount: 1,
        excessBreakFineAmount: 0,
        excessBreakAmount: 1,
        earlyOutFineAmount: 0,
        earlyOutAmount: 1,
    });

    const [presentAndHalfDay, setPresntAndHalfDay] = useState({
        status: "",
        startTime: "",
        endTime: "",
        shiftId: "",
    })
    const [submitPresentAndHalfDay, setSubmitPresentAndHalfDay] = useState(false);

    console.log(presentAndHalfDay);

    function formatDate(date) {
        return date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }).replace(/,/, ','); // Add a comma after the month
    }

    console.log(punchId);
    // Function to open the modal
    const openModal = () => {
        setIsOpen(true);
    };

    // Function to close the modal 
    const closeModal = () => {
        setIsOpen(false);
    };

    const [isOpen2, setIsOpen2] = useState(false);

    // Function to open the modal 2
    const openModal2 = () => {
        setIsOpen2(true);
    };

    // Function to close the modal 2
    const closeModal2 = () => {
        setIsOpen2(false);
    };

    //salary2 dropdown
    const [isOpen3, setIsOpen3] = useState(false);

    const toggleDropdown3 = () => {
        setIsOpen3(!isOpen3);
    };

    //salary2 dropdown

    // Function to open the modal 6

    const [isOpen6, setIsOpen6] = useState(false);
    const openModal6 = () => {
        setIsOpen6(true);
    };

    // Function to close the modal 6
    const closeModal6 = () => {
        setIsOpen6(false);
    };


    //salary2 dropdown
    const [isOpen9, setIsOpen9] = useState(false);

    const toggleDropdown9 = () => {
        setIsOpen9(!isOpen9);
    };

    //salary2 dropdown




    // Function to open the modal 7

    const [isOpen0, setIsOpen0] = useState(false);
    const openModal0 = () => {
        setIsOpen0(true);
    };

    // Function to close the modal 7
    const closeModal0 = () => {
        setIsOpen0(false);
    };

    // Function to open the modal 12

    const [isOpen12, setIsOpen12] = useState(false);
    const openModal12 = () => {
        setIsOpen12(true);
    };

    // Function to close the modal 12
    const closeModal12 = () => {
        setIsOpen12(false);
    };


    // Function to open the modal 14

    const [isOpen14, setIsOpen14] = useState(false);
    const openModal14 = () => {
        setIsOpen14(true);
    };



    // Function to close the modal 14
    const closeModal14 = () => {
        setIsOpen14(false);
    };
    const [selectedMonth, setSelectedMonth] = useState(() => {
        const currentMonth = new Date();
        return {
            original: currentMonth.toISOString().slice(0, 7).split('-').reverse().join('/'),
            formatted: `${currentMonth.toLocaleString('default', { month: 'short' })}, ${currentMonth.getFullYear()}`  // Oct, 2024
        };
    });

    // Function to handle previous month click
    const handlePrevMonth = () => {
        const currentMonthDate = new Date(selectedMonth.original);
        currentMonthDate.setMonth(currentMonthDate.getMonth() - 1);

        setSelectedMonth({
            original: currentMonthDate.toISOString().slice(0, 7),
            formatted: `${currentMonthDate.toLocaleString('default', { month: 'short' })}, ${currentMonthDate.getFullYear()}`
        });
    };

    // Function to handle next month click
    const handleNextMonth = () => {
        const currentMonthDate = new Date(selectedMonth.original);
        currentMonthDate.setMonth(currentMonthDate.getMonth() + 1);

        setSelectedMonth({
            original: currentMonthDate.toISOString().slice(0, 7).split('-').reverse().join('/'),
            formatted: `${currentMonthDate.toLocaleString('default', { month: 'short' })}, ${currentMonthDate.getFullYear()}`
        });
    };

    // console.log(selectedMonth);
    console.log(selectedMonth);
    const [shiftDetails, setShiftDetails] = useState([]);

    const [date, setDate] = useState();

    const [attendanceRecord, setAttendanceRecord] = useState([]);
    async function fetchAttendanceSummary() {
        // e.preventDefault();

        try {
            const response = await fetch(baseUrl + `attendance/single/${selectedStaff?.staffDetails?.id}?type=month&date=${selectedMonth?.original}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();

            if (response.status === 200) {
                console.log(result);
                setAttendanceRecord(result?.attendanceRecords);
                // openModal6();
                // openToast("Attendance Mode created and updated Successfully", "success");
            }
            else {
                // openToast("An error occurred while creating and updating attendance mode", "error");
                console.log(result);
            }
        } catch (error) {
            console.error("Error creating and updating attendance mode:", error);
            // openToast("An error occurred while creating and updating attendance mode", "error");
        }
    }

    function formatDate(isoString) {
        const date = new Date(isoString);

        const day = date.toLocaleDateString('en-GB', { day: '2-digit' });
        const month = date.toLocaleDateString('en-GB', { month: 'short' });
        const weekday = date.toLocaleDateString('en-GB', { weekday: 'short' });

        return `${day} ${month} | ${weekday}`;
    }

    // console.log(selectedMonth);
    // console.log(shiftDetails);
    const [loading, setLoading] = useState(false);

    async function updateAttendanceStatus(commmenStatus) {
        setLoading(true)
        try {
            if (commmenStatus === "") {
                openToast("Please Select Status", "error")
                return
            }

            // console.log(commmenStatus);

            const result = await fetch(baseUrl + `attendance/status/${punchId}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ status: commmenStatus })
            })
            if (result.status == 200) {
                openToast("Updated Status Successfully", "success")
                setAttendanceRecord([]);
                fetchAttendanceSummary();
            }
            else {
                openToast("Something went wrong", "error")
            }
        } catch (error) {
            openToast("Something went wrong", "error")
        } finally {
            setLoading(false);
            if (commmenStatus === "PRESENT") {
                closeModal6();
            }
            if (commmenStatus === "ABSENT") {
                closeModal();
            }
            if (commmenStatus === "HALFDAY") {
                closeModal2();
            }
            if (commmenStatus === "PAIDLEAVE") {
                closeModal14();
            }
        }
    }
    async function updatePresentAndHalfDayAttendace(punchID, data) {
        try {
            if (data.status === "") {
                openToast("Please Select Status", "error")
                return
            }

            const result = await fetch(baseUrl + `attendance/status/${punchID}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
            if (result.status == 200) {
                openToast("Update " + data?.status + " Status Successfully", "success")
                setAttendanceRecord([]);
                fetchAttendanceSummary();
            }
            else {
                openToast("Something went wrong", "error")
            }
        } catch (error) {
            openToast("Something went wrong", "error")
        } finally {
            setLoading(false);
            if (presentAndHalfDay.status === "PRESENT") {
                closeModal6();
            }
            if (presentAndHalfDay.status === "HALFDAY") {
                closeModal2();
            }
            setPresntAndHalfDay({
                status: "",
                startTime: "",
                endTime: "",
                shiftId: "",
            });
        }
    }
    async function createFine() {
        try {


            // console.log(commmenStatus);

            const result = await fetch(baseUrl + `fine/create`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    punchRecordId: punchId,
                    staffId: selectedStaff?.staffDetails?.id,
                    lateEntryFineAmount: Number(fine.lateEntryFineAmount),
                    lateEntryAmount: Number(fine.lateEntryAmount),
                    excessBreakFineAmount: Number(fine.excessBreakFineAmount),
                    excessBreakAmount: Number(fine.excessBreakAmount),
                    earlyOutFineAmount: Number(fine.earlyOutFineAmount),
                    earlyOutAmount: Number(fine.earlyOutAmount),
                    totalAmount: (Number(fine.lateEntryFineAmount) + Number(fine.excessBreakFineAmount) + Number(fine.earlyOutFineAmount)),
                })
            })
            if (result.status == 201) {
                openToast("Create Fine Successfully", "success")
                setFine({
                    staffId: selectedStaff?.staffDetails?.id,
                    lateEntryHour: "",
                    excessBreakHour: "",
                    earlyOutHour: "",
                    lateEntryFineAmount: 0,
                    lateEntryAmount: 1,
                    excessBreakFineAmount: 0,
                    excessBreakAmount: 1,
                    earlyOutFineAmount: 0,
                    earlyOutAmount: 1,
                });
                setPunchId("");
                fetchAttendanceSummary();
                closeModal0();
            }
            else {
                openToast("Something went wrong", "error")
            }
        } catch (error) {
            openToast("Something went wrong", "error")
        }
    }
    const [overTime, setOverTime] = useState({
        staffId: selectedStaff?.staffDetails?.id,
        lateEntryHour: "",
        earlyOutHour: "",
        lateEntryFineAmount: 0,
        lateEntryAmount: 1,
        earlyOutFineAmount: 0,
        earlyOutAmount: 1,
    });
    async function createOvertime() {
        try {

            // console.log(commmenStatus);

            const result = await fetch(baseUrl + `overtime/create`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    punchRecordId: punchId,
                    staffId: selectedStaff?.staffDetails?.id,
                    lateEntryFineAmount: Number(fine.lateEntryFineAmount),
                    lateEntryAmount: Number(fine.lateEntryAmount),
                    earlyOutFineAmount: Number(fine.earlyOutFineAmount),
                    earlyOutAmount: Number(fine.earlyOutAmount),
                    totalAmount: (Number(fine.lateEntryFineAmount) + Number(fine.earlyOutFineAmount)),
                })
            })
            if (result.status == 201) {
                openToast("Create Overtime Fine Successfully", "success")
                setOverTime({
                    staffId: selectedStaff?.staffDetails?.id,
                    lateEntryHour: "",
                    earlyOutHour: "",
                    lateEntryFineAmount: 0,
                    lateEntryAmount: 1,
                    earlyOutFineAmount: 0,
                    earlyOutAmount: 1,
                });
                setPunchId("");
                fetchAttendanceSummary();
                closeModal12();
            }
            else {
                openToast("Something went wrong", "error")
            }
        } catch (error) {
            openToast("Something went wrong", "error")
        }
    }
    function calculateFinePerMinute(monthlySalary, workingDays, workingHoursPerDay) {
        if (monthlySalary <= 0 || workingDays <= 0 || workingHoursPerDay <= 0) {
            throw new Error("All inputs must be greater than zero.");
        }
        const finePerMinute = monthlySalary / (workingDays * workingHoursPerDay * 60);
        return finePerMinute.toFixed(2);
    }


    useEffect(() => {
        fetchAttendanceSummary();
    }, [selectedMonth])

    return (
        <div className='  w-full p-[20px] pt-[80px] xl:p-[40px] relative xl:pt-[100px]    xl:pl-[320px] flex flex-col '>
            <div className='flex  justify-between  '>
                <div className='flex gap-[10px] items-center'>
                    <h1 className='font-medium capitalize '>{selectedStaff?.name} <span>#136</span></h1>
                </div>

                <Link className='first-btn text-[14px] font-semibold flex items-center' to="/">Download Report</Link>

            </div>

            <div className='shadow p-[20px] rounded-md mt-[24px] '>

                <div className='flex gap-[14px] flex-col xl:flex-row lg:flex-row md:flex-row sm:flex-row  justify-between xl:items-center  '>
                    <div className='flex '>
                        {/* <input className='bg-transparent font-medium text-[14px]' type="date" /> */}
                        <div className="flex items-center gap-4">
                            <ArrowBackIosIcon onClick={handlePrevMonth} className="arrow-icon-back" />
                            <h2>{selectedMonth.formatted}</h2>
                            <ArrowForwardIosIcon onClick={handleNextMonth} className="arrow-icon-back" />
                        </div>
                    </div>
                    <div className='flex xl:items-center lg:items-end justify-between gap-[14px] flex-col xl:flex-row'>
                        <h2 className='text-[14px] font-medium'>Total Pending for Approval : {attendanceRecord?.filter(item => item?.isApproved === false)?.length}</h2>
                        <Link className='bg-[#8a25b0] text-center  text-[white] review-btn rounded-md' to="/">Approve All</Link>
                    </div>
                </div>
                <div className='mt-[16px] flex lg:gap-[30px] xl:gap-[30px] md:gap-[30px] md:flex-row lg:flex-row  xl:justify-start lg:justify-start md:justify-start    justify-between gap-[20px]'>

                    <div className="flex xl:gap-[20px] lg:gap-[20px] md:gap-[20px] justify-between xl:flex-row lg:flex-row md:flex-row flex-col gap-[10px]">
                        <div className=' total-staff-salary'>
                            <h2 className='text-[14px] font-normal text-[#000000bf]'>Day</h2>
                            <p className='text-[14px] font-medium'>{attendanceRecord?.length}</p>
                        </div>
                        <div className=' total-staff-salary'>
                            <h2 className='text-[14px] font-normal text-[#000000bf]'>Present</h2>
                            <p className='text-[14px] font-medium'>{attendanceRecord?.filter((record) => record?.status === "PRESENT")?.length}</p>
                        </div>
                        <div className=' total-staff-salary'>
                            <h2 className='text-[14px] font-normal text-[#000000bf]'>Absent</h2>
                            <p className='text-[14px] font-medium'>{attendanceRecord?.filter((record) => record?.status === "ABSENT")?.length}</p>
                        </div>
                    </div>

                    <div className="flex xl:gap-[20px] lg:gap-[20px] md:gap-[20px] justify-between xl:flex-row lg:flex-row md:flex-row flex-col gap-[10px]">
                        <div className=' total-staff-salary text-end xl:text-center lg:text-center md:text-center'>
                            <h2 className='text-[14px] font-normal text-[#000000bf]'>Half Day</h2>
                            <p className='text-[14px] font-medium'>{attendanceRecord?.filter((record) => record?.status === "HALFDAY")?.length}</p>
                        </div>
                        <div className=' total-staff-salary text-end xl:text-center lg:text-center md:text-center'>
                            <h2 className='text-[14px] font-normal text-[#000000bf]'>Overtime Hours</h2>
                            <p className='text-[14px] font-medium'>00.00</p>
                        </div>
                        <div className=' total-staff-salary text-end xl:text-center lg:text-center md:text-center'>
                            <h2 className='text-[14px] font-normal text-[#000000bf]'>Weekly Off</h2>
                            <p className='text-[14px] font-medium'>00:00</p>
                        </div>
                    </div>
                </div>
            </div>

            {
                attendanceRecord?.length > 0 && loading === false ? attendanceRecord?.map((record, index) => {
                    // console.log(record.id);
                    return (
                        <div key={record?.id} className='shadow p-[20px] mt-[18px] rounded-md'>
                            <div className='flex items-start justify-between  flex-col xl:flex-row lg:flex-row md:flex-row xl:items-center lg:items-center md:items-center gap-4 xl:gap-0 lg:gap-0 md:gap-0'>
                                <div>
                                    <h2 className='text-[16px]'>{formatDate(record.punchDate)}</h2>
                                    <p className='text-[#9c9797] text-[14px]'>0:00 hours</p>
                                    <p className="text-[#9c9797] text-[13px] whitespace-nowrap">Daily Shift (10:12 AM - NA)</p>
                                    <p className='text-[#8a25b0] font-medium text-[14px] mt-[10px]'>Add Note - Login</p>
                                </div>
                                <div className='flex gap-[18px] xl:flex-col flex-row md:flex-col lg:flex-col w-full justify-between xl:justify-start md:justify-start lg:justify-start '>
                                    <div className="flex gap-[20px] flex-col xl:flex-row lg:flex-row md:flex-row xl:justify-end lg:justify-end md:justify-end">

                                        <div className="flex xl:justify-center justify-start items-center">
                                            {/* Button to open modal */}
                                            <button
                                                onClick={() => {
                                                    openModal6();
                                                    setPunchId(record?.id);
                                                }}
                                                className={" btns px-6 py-3 text-[14px] font-medium rounded-md focus:outline-none xl:w-[200px]  lg:w-[200px] md:w-[140px] whitespace-nowrap shadow-lg " + (record?.status === "PRESENT" ? "bg-[#008000] text-white" : "bg-white text-black")}
                                            >
                                                P I Present
                                            </button>

                                            {/* Modal overlay and content */}
                                            {isOpen6 && (
                                                <PresentAndHalfDayModal type={"PRESENT"} modalHeading={`${selectedStaff?.name} ${formatDate(date)}`} isOpenModal={isOpen6} isCloseModal={closeModal6} punchRecordId={punchId} updateStatus={updatePresentAndHalfDayAttendace} />
                                            )}
                                        </div>

                                        <div className="flex justify-center items-center">
                                            {/* Button to open modal */}
                                            <button
                                                onClick={() => {
                                                    openModal2();
                                                    setPunchId(record?.id);
                                                }}
                                                className={" btns px-6 py-3 text-[14px] font-medium rounded-md focus:outline-none xl:w-[200px] lg:w-[200px] md:w-[140px] whitespace-nowrap shadow " + (record?.status === "HALFDAY" ? "bg-[#008000] text-white" : "bg-white text-black")}
                                            >
                                                HD I HalfDay
                                            </button>

                                            {/* Modal overlay and content */}
                                            {isOpen2 && (
                                                <PresentAndHalfDayModal type={"HALFDAY"} modalHeading={`${selectedStaff?.name} ${formatDate(date)}`} isOpenModal={isOpen2} isCloseModal={closeModal2} punchRecordId={punchId} updateStatus={updatePresentAndHalfDayAttendace} />
                                            )}
                                        </div>

                                        <div className="flex xl:justify-center justify-start items-center">
                                            {/* Button to open modal */}
                                            <button
                                                onClick={() => {
                                                    setDate(record?.punchDate);
                                                    setPunchId(record?.id);
                                                    openModal0();
                                                }}
                                                className={" btns px-6 py-3 text-[14px] font-medium rounded-md focus:outline-none xl:w-[200px] lg:w-[200px] md:w-[140px] whitespace-nowrap shadow bg-white text-black "}                                            >
                                                F I Fine
                                            </button>

                                            {/* Modal overlay and content */}
                                            {isOpen0 && (
                                                <div className="fixed inset-0 z-50 p-[10px] flex items-center justify-center bg-black bg-opacity-50">
                                                    <div className="bg-white rounded-lg shadow-lg max-w-lg w-full overflow-scroll h-[100%] p-6">
                                                        <div className=''>
                                                            <div className='mb-[20px]'>
                                                                <h2 className="text-xl text-[18px] text-[black] font-semibold  "> Fine </h2>
                                                                <p className=' text-[14px]'>{selectedStaff?.name} {formatDate(date)} I </p>
                                                            </div>

                                                            <div className='flex justify-between items-center mb-[10px]'>
                                                                <p className='text-[16px]  font-medium'>DAILY SHIFT</p>
                                                                <DeleteIcon className='del-icon2 text-[#89868d]' />
                                                            </div>


                                                        </div>

                                                        <div className=' p-[10px]   '>
                                                            <div className='flex items-center justify-between mb-[5px]'>
                                                                <p className='text-[14px] font-medium'>Late Entry</p>
                                                                <CloseIcon className='close-icon text-[#89868d]' />
                                                            </div>

                                                            <div className='flex items-center gap-[20px]'>

                                                                <div>
                                                                    <p className='text-[12px]'>Hours</p>
                                                                    {/* <p className='text-[14px] select-pe  pl-[30px] pr-[30px] pt-[6px] pb-[6px]  rounded-md'>00:41      hrs</p> */}
                                                                    <input type="time" name="" id="" className='text-[14px] select-pe  pl-[30px] pr-[30px] pt-[6px] pb-[6px]  rounded-md' value={fine.lateEntryHour} onChange={(e) => {
                                                                        const value = e.target.value;
                                                                        const [hours, minutes] = value.split(':').map(Number);
                                                                        const totalMinutes = hours * 60 + minutes;
                                                                        setFine({ ...fine, lateEntryHour: e.target.value, lateEntryFineAmount: (calculateFinePerMinute(30000, 22, 8) * totalMinutes).toFixed(2) });
                                                                    }} />
                                                                    <p className='text-[12px]' >Amount ₹ {fine.lateEntryFineAmount}</p>
                                                                </div>
                                                                <div className='flex gap-[28px] '>

                                                                    <div className="w-[100%]" >

                                                                        <select value={fine.lateEntryAmount} onChange={(e) => setFine({ ...fine, lateEntryAmount: e.target.value })} className='border border-[#c9c9c9] rounded-md pl-[20px] pr-[20px] pt-[6px] pb-[6px]  w-[100%] bg-[#ececec]   focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'>
                                                                            <option value={1}>1x Salary</option>
                                                                            <option value={2}>2x Salary</option>

                                                                        </select>
                                                                    </div>
                                                                    <div className=''>
                                                                        <p className='text-[14px]  rounded-md select-pe p-[6px] w-[124px]'>₹ {calculateFinePerMinute(30000, 22, 8)} Per Min</p>

                                                                    </div>

                                                                </div>
                                                            </div>


                                                        </div>
                                                        <div className='p-[10px] '>
                                                            <div className='flex items-center justify-between mb-[5px]'>
                                                                <p className='text-[14px] font-medium'>Excess Breaks</p>
                                                                <CloseIcon className='close-icon text-[#89868d]' />
                                                            </div>

                                                            <div className='flex items-center gap-[20px]'>

                                                                <div>
                                                                    <p className='text-[12px]'>Hours</p>
                                                                    <input type="time" name="" id="" className='text-[14px] select-pe  pl-[30px] pr-[30px] pt-[6px] pb-[6px]  rounded-md' value={fine.excessBreakHour} onChange={(e) => {
                                                                        const value = e.target.value;
                                                                        const [hours, minutes] = value.split(':').map(Number);
                                                                        const totalMinutes = hours * 60 + minutes;
                                                                        setFine({ ...fine, excessBreakHour: e.target.value, excessBreakFineAmount: (calculateFinePerMinute(30000, 22, 8) * totalMinutes).toFixed(2) });
                                                                    }} />
                                                                    {/* <p className='text-[14px] select-pe  pl-[30px] pr-[30px] pt-[6px] pb-[6px]  rounded-md'>00:41      hrs</p> */}
                                                                    <p className='text-[12px]' >Amount ₹ {fine.excessBreakFineAmount}</p>
                                                                </div>
                                                                <div className='flex gap-[28px] '>

                                                                    <div className="w-[100%]" >

                                                                        <select value={fine.excessBreakAmount} onChange={(e) => setFine({ ...fine, excessBreakAmount: e.target.value })} className='border border-[#c9c9c9] rounded-md pl-[20px] pr-[20px] pt-[6px] pb-[6px]  w-[100%] bg-[#ececec]   focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'>
                                                                            <option value={1}>1x Salary</option>
                                                                            <option value={2}>2x Salary</option>

                                                                        </select>

                                                                    </div>
                                                                    <div className=''>
                                                                        <p className='text-[14px]  rounded-md select-pe p-[6px] w-[124px]'>₹ {calculateFinePerMinute(30000, 22, 8)} Per Min</p>

                                                                    </div>

                                                                </div>
                                                            </div>


                                                        </div>
                                                        <div className='p-[10px] '>
                                                            <div className='flex items-center justify-between mb-[5px]'>
                                                                <p className='text-[14px] font-medium'>Early Out</p>
                                                                <CloseIcon className='close-icon text-[#89868d]' />
                                                            </div>

                                                            <div className='flex items-center gap-[20px]'>

                                                                <div>
                                                                    <p className='text-[12px]'>Hours</p>
                                                                    <input type="time" name="" id="" className='text-[14px] select-pe  pl-[30px] pr-[30px] pt-[6px] pb-[6px]  rounded-md' value={fine.earlyOutHour} onChange={(e) => {
                                                                        const value = e.target.value;
                                                                        const [hours, minutes] = value.split(':').map(Number);
                                                                        const totalMinutes = hours * 60 + minutes;
                                                                        setFine({ ...fine, earlyOutHour: e.target.value, earlyOutFineAmount: (calculateFinePerMinute(30000, 22, 8) * totalMinutes).toFixed(2) });
                                                                    }} />
                                                                    {/* <p className='text-[14px] select-pe  pl-[30px] pr-[30px] pt-[6px] pb-[6px]  rounded-md'>00:41      hrs</p> */}
                                                                    <p className='text-[12px]' >Amount ₹ {fine.earlyOutFineAmount}</p>
                                                                </div>
                                                                <div className='flex gap-[28px] '>

                                                                    <div className="w-[100%]" >

                                                                        <select value={fine.earlyOutAmount} onChange={(e) => setFine({ ...fine, earlyOutAmount: e.target.value })} className='border border-[#c9c9c9] rounded-md pl-[20px] pr-[20px] pt-[6px] pb-[6px]  w-[100%] bg-[#ececec]   focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'>
                                                                            <option value={1}>1x Salary</option>
                                                                            <option value={2}>2x Salary</option>

                                                                        </select>

                                                                    </div>
                                                                    <div className=''>
                                                                        <p className='text-[14px]  rounded-md select-pe p-[6px] w-[124px]'> ₹ {calculateFinePerMinute(30000, 22, 8)} Per Min</p>

                                                                    </div>

                                                                </div>
                                                            </div>


                                                        </div>
                                                        <div className='mt-[10px] mb-[10px]'>
                                                            <span className='text-[12px]'>Total Amount</span>
                                                            <p className='text-[14px]'>₹ {(parseFloat(fine.earlyOutFineAmount) + parseFloat(fine.lateEntryFineAmount) + parseFloat(fine.excessBreakFineAmount))}</p>
                                                        </div>
                                                        <div className='flex items-center mb-[20px] gap-[4px] '>
                                                            <input type="checkbox" />
                                                            <p className='text-[14px]'>Send SMS to Staff</p>
                                                        </div>

                                                        <div className="flex flex-col gap-[10px] ">
                                                            <button
                                                                onClick={() => {
                                                                    console.log(punchId);
                                                                    createFine();
                                                                }} className="px-4 py-2 bg-[#27004a] text-white rounded-md"
                                                            >
                                                                Apply Fine
                                                            </button>
                                                            <button
                                                                onClick={closeModal0}
                                                                className="px-4 py-2 bg-[#27004a] text-white rounded-md"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-[20px] flex-col xl:flex-row lg:flex-row md:flex-row xl:justify-end lg:justify-end md:justify-end">

                                        <div className="flex justify-center items-center">
                                            {/* Button to open modal */}
                                            <button
                                                onClick={() => {
                                                    setDate(record?.punchDate);
                                                    setPunchId(record?.id);
                                                    openModal12();
                                                }}
                                                className={" btns px-6 py-3 text-[14px] font-medium rounded-md focus:outline-none xl:w-[200px] lg:w-[200px] md:w-[140px] whitespace-nowrap shadow bg-white text-black "}         >
                                                OT I Overtime
                                            </button>

                                            {/* Modal overlay and content */}
                                            {isOpen12 && (
                                                <div className="fixed inset-0 z-50 p-[10px] flex items-center justify-center bg-black bg-opacity-50">
                                                    <div className="bg-white rounded-lg shadow-lg max-w-lg overflow-scroll w-full h-[100%] p-6">
                                                        <div className=''>
                                                            <div className='mb-[20px]'>
                                                                <h2 className="text-xl text-[18px] text-[#27004a] font-semibold  "> Overtime Day </h2>
                                                                <p className=' text-[14px]'>{selectedStaff?.name} {formatDate(date)}</p>
                                                            </div>

                                                            <div className='flex justify-between items-center mb-[10px]'>
                                                                <p className='text-[14px] font-medium'>DAILY SHIFT</p>
                                                                <DeleteIcon className='del-icon2 text-[#89868d]' />
                                                            </div>


                                                        </div>

                                                        <div className='p-[10px] '>
                                                            <div className='flex items-center justify-between mb-[5px]'>
                                                                <p className='text-[14px] font-medium'>Late Entry</p>
                                                                <CloseIcon className='close-icon text-[#89868d]' />
                                                            </div>

                                                            <div className='flex items-center gap-[20px]'>

                                                                <div>
                                                                    <p className='text-[12px]'>Hours</p>
                                                                    <input type="time" name="" id="" className='text-[14px] select-pe  pl-[30px] pr-[30px] pt-[6px] pb-[6px]  rounded-md' value={overTime.lateEntryHour} onChange={(e) => {
                                                                        const value = e.target.value;
                                                                        const [hours, minutes] = value.split(':').map(Number);
                                                                        const totalMinutes = hours * 60 + minutes;
                                                                        setOverTime({ ...overTime, lateEntryHour: e.target.value, lateEntryFineAmount: (calculateFinePerMinute(30000, 22, 8) * totalMinutes).toFixed(2) });
                                                                    }} />
                                                                    {/* <p className='text-[14px] select-pe  pl-[30px] pr-[30px] pt-[6px] pb-[6px]  rounded-md'>00:41      hrs</p> */}
                                                                    <p className='text-[12px]' >Amount ₹ {overTime.lateEntryFineAmount}</p>
                                                                </div>
                                                                <div className='flex gap-[28px] '>

                                                                    <div className="w-[100%]" >

                                                                        <select value={overTime.lateEntryAmount} onChange={(e) => setOverTime({ ...overTime, lateEntryAmount: e.target.value })} className='border border-[#c9c9c9] rounded-md pl-[20px] pr-[20px] pt-[6px] pb-[6px]  w-[100%] bg-[#ececec]   focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'>
                                                                            <option value={1}>1x Salary</option>
                                                                            <option value={2}>2x Salary</option>

                                                                        </select>

                                                                    </div>
                                                                    <div className=''>
                                                                        <p className='text-[14px]  rounded-md select-pe p-[6px] w-[124px]'>₹ {calculateFinePerMinute(30000, 22, 8)} Per Min</p>

                                                                    </div>

                                                                </div>
                                                            </div>


                                                        </div>
                                                        <div className='p-[10px] '>
                                                            <div className='flex items-center justify-between mb-[5px]'>
                                                                <p className='text-[14px] font-medium'>Early Out</p>
                                                                <CloseIcon className='close-icon text-[#89868d]' />
                                                            </div>

                                                            <div className='flex items-center gap-[20px]'>

                                                                <div>
                                                                    <p className='text-[12px]'>Hours</p>
                                                                    <input type="time" name="" id="" className='text-[14px] select-pe  pl-[30px] pr-[30px] pt-[6px] pb-[6px]  rounded-md' value={overTime.earlyOutHour} onChange={(e) => {
                                                                        const value = e.target.value;
                                                                        const [hours, minutes] = value.split(':').map(Number);
                                                                        const totalMinutes = hours * 60 + minutes;
                                                                        setOverTime({ ...overTime, earlyOutHour: e.target.value, earlyOutFineAmount: (calculateFinePerMinute(30000, 22, 8) * totalMinutes).toFixed(2) });
                                                                    }} />
                                                                    {/* <p className='text-[14px] select-pe  pl-[30px] pr-[30px] pt-[6px] pb-[6px]  rounded-md'>00:41      hrs</p> */}
                                                                    <p className='text-[12px]' >Amount ₹ {overTime.earlyOutFineAmount}</p>
                                                                </div>
                                                                <div className='flex gap-[28px] '>

                                                                    <div className="w-[100%]" >

                                                                        <select value={overTime.earlyOutAmount} onChange={(e) => setOverTime({ ...overTime, earlyOutAmount: e.target.value })} className='border border-[#c9c9c9] rounded-md pl-[20px] pr-[20px] pt-[6px] pb-[6px]  w-[100%] bg-[#ececec]   focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'>
                                                                            <option value={1}>1x Salary</option>
                                                                            <option value={2}>2x Salary</option>

                                                                        </select>

                                                                    </div>
                                                                    <div className=''>
                                                                        <p className='text-[14px]  rounded-md select-pe p-[6px] w-[124px]'> ₹ {calculateFinePerMinute(30000, 22, 8)} Per Min</p>

                                                                    </div>

                                                                </div>
                                                            </div>


                                                        </div>
                                                        <div className='mt-[10px] mb-[10px]'>
                                                            <span className='text-[12px]'>Total Amount</span>
                                                            <p className='text-[14px]'>₹ {(parseFloat(overTime.earlyOutFineAmount) + parseFloat(overTime.lateEntryFineAmount))}</p>
                                                        </div>
                                                        <div className='flex items-center mb-[20px] gap-[4px] '>
                                                            <input type="checkbox" />
                                                            <p className='text-[14px]'>Send SMS to Staff</p>
                                                        </div>


                                                        <div className="flex flex-col gap-[10px] ">
                                                            <button
                                                                onClick={() => {
                                                                    createOvertime();
                                                                }}

                                                                className="px-4 py-2 bg-[#27004a] text-white rounded-md"
                                                            >
                                                                Apply Overtime
                                                            </button>
                                                            <button
                                                                onClick={closeModal12}
                                                                className="px-4 py-2 bg-[#27004a] text-white rounded-md"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex justify-center items-center">
                                            {/* Button to open modal */}
                                            <button
                                                onClick={() => {
                                                    openModal14();
                                                    setPunchId(record?.id);
                                                }}
                                                className={"btns px-6 py-3 text-[14px] rounded-md focus:outline-none xl:w-[200px] lg:w-[200px] md:w-[138px] whitespace-nowrap shadow " + (record?.status === "PAIDLEAVE" ? "bg-[#008000] text-white" : "bg-white text-black")}
                                            >
                                                L I Paid Leave
                                            </button>

                                            {/* Modal overlay and content */}
                                            {isOpen14 && (
                                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                                    <div className="bg-white rounded-lg shadow-lg max-w-lg w-full h-[200px] p-6">
                                                        <h2 className="text-xl text-center text-[18px] text-[black] font-semibold mt-[28px] mb-[6px] ">Sure You Want To Accept ? </h2>
                                                        <p className='text-center mb-[16px] text-[14px]'>Are you sure you want to accept this ??</p>

                                                        <div className="flex justify-around ">
                                                            <button
                                                                onClick={() => {
                                                                    // console.log(record.id);
                                                                    updateAttendanceStatus("PAIDLEAVE");
                                                                }}
                                                                className="px-4 py-2 bg-[#8a25b0] text-white rounded-md"
                                                            >
                                                                Yes , Confirm
                                                            </button>
                                                            <button
                                                                onClick={closeModal14}
                                                                className="px-4 py-2 bg-[#8a25b0] text-white rounded-md"
                                                            >
                                                                No , Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex xl:justify-center lg:justify-center md:justify-center items-center justify-end">
                                            {/* Button to open modal */}
                                            <button
                                                onClick={() => {
                                                    openModal();
                                                    setPunchId(record?.id);
                                                }}
                                                className={" btns px-6 py-3 text-[14px] rounded-md focus:outline-none xl:w-[200px] lg:w-[200px] md:w-[138px] whitespace-nowrap shadow " + (record?.status === "ABSENT" ? "bg-[#DC3545] text-white" : "bg-white text-black")}
                                            >
                                                A I Absent
                                            </button>

                                            {/* Modal overlay and content */}
                                            {isOpen && (
                                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                                    <div className="bg-white rounded-lg shadow-lg max-w-lg w-full h-[200px] p-6">
                                                        <h2 className="text-xl text-center text-[18px] text-[black] font-semibold mt-[28px] mb-[6px] ">Sure You Want To Accept ? </h2>
                                                        <p className='text-center mb-[16px] text-[14px]'>Are you sure you want to accept this ??</p>

                                                        <div className="flex justify-around ">
                                                            <button
                                                                onClick={() => {
                                                                    // console.log(record.id);
                                                                    updateAttendanceStatus("ABSENT");
                                                                }}
                                                                className="px-4 py-2 bg-[#8a25b0] text-white rounded-md"
                                                            >
                                                                Yes , Confirm
                                                            </button>
                                                            <button
                                                                onClick={closeModal}
                                                                className="px-4 py-2 bg-[#8a25b0] text-white rounded-md"
                                                            >
                                                                No , Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
                    : (<div class="m-auto mt-10 border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-[#8a25b0]" />)
            }
        </div >
    )
}

export default StaffSalarySummry