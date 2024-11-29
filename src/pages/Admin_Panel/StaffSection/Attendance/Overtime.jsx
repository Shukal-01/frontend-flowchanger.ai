import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";
import WarningIcon from '@mui/icons-material/Warning';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useGlobalContext } from '../../../../Context/GlobalContext';
import TimePicker from 'rc-time-picker';
import { pre } from 'framer-motion/client';
import Select from 'react-select';

const Overtime = () => {
    const { baseUrl, openToast } = useGlobalContext();
    const [isOn, setIsOn] = useState(false);
    const [overTimeType, setOverTimeType] = useState("Fixed Amount Per Minute");
    const [overTimeDetail, setOverTimeDetail] = useState([])
    const [staff, setStaff] = useState([]);
    const [allshift, setAllShift] = useState([]);
    const [selectShiftId, setSelectShiftId] = useState(null);
    const [staffPerMinSalary, setStaffPerMinSalary] = useState([]);
    const [updateDetail, setUpdateDetail] = useState([]);
    const [selectAllOverTime, setSelectAllOverTime] = useState(false);
    const [fixedOverTime, setfixedOverTime] = useState(0);


    const toggleSwitch = () => {
        setIsOn(!isOn);
    }


    function updateStaffOvertimePerMinuteState(
        staffList,
        setStaffPerMinSalary,
        workMonth,
        workYear,
        workingDays,
        workingHoursPerDay
    ) {
        // Helper function to calculate the fine per minute
        const calculateoverTimePerMinute = (monthlySalary, workingDays, workingHoursPerDay) => {
            const overTimePerMinute = monthlySalary / (workingDays * workingHoursPerDay * 60);
            return overTimePerMinute.toFixed(2);
        };

        // Helper function to filter salary details by month and year
        const filterSalaryByMonthAndYear = (salaryDetails, month, year) => {
            return salaryDetails?.find(detail => {
                const effectiveDate = new Date(detail?.effective_date);
                return (
                    effectiveDate?.getUTCMonth() + 1 === month &&
                    effectiveDate?.getFullYear() === year
                );
            });
        };

        // Iterate through all staff and calculate their fine per minute
        const updatedStaffFine = staffList.map(staff => {
            const salaryDetail = filterSalaryByMonthAndYear(staff?.staffDetails?.SalaryDetails, workMonth, workYear);

            if (!salaryDetail) {
                return {
                    staffId: staff?.staffDetails?.id,
                    overTimePerMinute: "0.00", // Default fine if no salary detail found
                };
            }

            return {
                staffId: staff?.staffDetails?.id,
                overTimePerMinute: calculateoverTimePerMinute(salaryDetail?.ctc_amount, workingDays, workingHoursPerDay),
            };
        });

        // Update the state with the calculated fines
        setStaffPerMinSalary(updatedStaffFine);
    }


    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    //salary dropdown
    const [isOpen1, setIsOpen1] = useState(false);

    const getData = async (e) => {
        try {
            const response = await fetch(baseUrl + "staff/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                const result = await response.json();
                setStaff(result);
                // console.log("Filtered data by ID:", filteredData);
                // console.log("Data retrieved successfully:", result);
                // navigate("/admin/staff");
            } else {
                console.error("Failed to retrieve data:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("An error occurred while fetching data:", error);
        }
    };


    async function fetchShiftDetails() {
        const result = await fetch(baseUrl + "shift");
        if (result.status == 200) {
            const data = await result.json();
            setAllShift(data.map((shift) => ({
                value: shift.id,
                label: `${shift.shiftName} (${shift.shiftStartTime} - ${shift.shiftEndTime})`,
            })));
        }
        else {
            openToast("No Record Found")
        }
    }

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
    const today = new Date();
    const defaultDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    // Initialize state with today's year, month, and date
    const [workTimeDate, setWorkTimeDate] = useState({
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        date: today.getDate(),
    });

    const handleDateChange = (e) => {
        const selectedDate = new Date(e.target.value); // Parse the selected date
        setWorkTimeDate({
            year: selectedDate.getFullYear(),
            month: selectedDate.getMonth() + 1, // Month is 0-based, so add 1
            date: selectedDate.getDate(),
        });
    };

    // console.log(fineDetail)

    async function fetchFineDetails() {
        try {
            const result = await fetch(baseUrl + `overtime?date=${workTimeDate.year}-${workTimeDate.month}-${workTimeDate.date}`)
            if (result.status == 200) {
                const res = await result.json();
                console.log("res", res)
                setOverTimeDetail(res.data)
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    async function updateMultipleStaffOvertime(overtTimeDetail) {
        try {
            if (overtTimeDetail.some(({ shiftIds }) => !shiftIds || shiftIds === "")) {
                openToast("Please Select Shift for all selected staff overtime", "warning");
                return;
            }
            const data = overtTimeDetail.map((overtime) => {
                const { totalAmount: prevTotalAmount = 0, lateOutOvertimeAmount: prevlateOutOvertimeAmount = 0 } =
                    overTimeDetail?.find(
                        (value) => value?.id === overtime?.id && value?.staffId === overtime?.staffId
                    ) || {}; // Use fallback to avoid destructuring undefined

                return {
                    id: overtime?.id,
                    staffId: overtime?.staffId,
                    punchRecordId: overtime?.punchRecordId,
                    lateOutOvertimeHoursTime: overtime?.lateOutOvertimeHoursTime || "",
                    lateOutOvertimeAmount: Number((overtime?.lateOutOvertimeAmount * overtime?.lateOutAmount).toFixed(2) || 0),
                    lateOutAmount: Number(overtime?.lateOutAmount || 1),
                    shiftIds: overtime.shiftIds ? overtime?.shiftIds : "",
                    totalAmount: Number(
                        (prevTotalAmount + overtime?.lateOutOvertimeAmount * overtime?.lateOutAmount - prevlateOutOvertimeAmount).toFixed(2) || 0
                    ),
                }
            })
            console.log(data, Array.isArray(data));
            // Perform the update
            const result = await fetch(baseUrl + `overtime`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    OvertimeUpdates: data
                })
            });

            // Handle the response
            if (result.ok) {
                openToast("Update Fine Successfully", "success");
                setOverTimeDetail([]);
                fetchFineDetails();
            } else {
                openToast("Something went wrong", "error");
            }
        } catch (error) {
            console.error("Error updating fine:", error); // Log the actual error for debugging
            openToast("Something went wrong", "error");
        }
    }

    useEffect(() => {
        fetchShiftDetails();
    }, [])

    useEffect(() => {
        if (!workTimeDate.year || !workTimeDate.month || !workTimeDate.date) {
            return;
        }
        fetchFineDetails();
    }, [workTimeDate])


    const fixedAmountOptions = [
        "Fixed Amount Per Minute",
        "Fixed Amount",
        "Half Day",
        "Full Day",
        "Regularize",
        "1x Salary",
        "1.5x Salary",
        "2x Salary"
    ];

    // console.log(dailyShift);
    // console.log(workTimeDate);

    function formatDate(isoString) {
        const date = new Date(isoString);
        const day = date.getDate(); // Extract day
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()]; // Extract and convert month to short name
        const year = date.getFullYear(); // Extract year
        return `${day} ${month}, ${year}`; // Combine in the desired format
    }

    // workTimeDate
    useEffect(() => {
        getData();
    }, []);
    useEffect(() => {
        updateStaffOvertimePerMinuteState(staff, setStaffPerMinSalary, workTimeDate.month, workTimeDate.year, 30, 8);

    }, [staff, workTimeDate])

    useEffect(() => {
        setUpdateDetail([...overTimeDetail?.map(fine => ({ id: fine.id, staffId: fine.staffId }))]);

    }, [selectAllOverTime])

    useEffect(() => {
        if (overTimeType === "Fixed Amount Per Minute" && fixedOverTime > 0 && selectAllOverTime === true) {
            setStaffPerMinSalary(staffPerMinSalary?.map(overtime => ({ staffId: overtime?.staffId, overTimePerMinute: fixedOverTime })));
        }

        if (overTimeType == "Fixed Amount" && fixedOverTime > 0 && selectAllOverTime === true) {
            setOverTimeDetail(
                overTimeDetail?.map(overtime => ({
                    id: overtime?.id,
                    staffId: overtime?.staffId,
                    lateOutOvertimeAmount: Number(fixedOverTime),
                    lateOutAmount: 1,
                    shiftIds: overtime?.shiftIds ? overtime?.shiftIds : "",
                    punchRecordId: overtime?.punchRecordId
                }))
            );
        }

        if (overTimeType === "Half Day" && selectAllOverTime === true) {
            setOverTimeDetail(
                overTimeDetail?.map(overtime => ({
                    id: overtime?.id,
                    staffId: overtime?.staffId,
                    lateOutOvertimeAmount: staffPerMinSalary?.find(
                        staff => staff?.staffId === overtime?.staffId
                    )?.overTimePerMinute * 0.5 * 8 * 60, // Half-day overtime logic
                    lateOutAmount: 1,
                    shiftIds: overtime?.shiftIds ? overtime?.shiftIds : "",
                    lateOutOvertimeHoursTime: "04:00",
                    punchRecordId: overtime?.punchRecordId
                }))
            );
        }

        if (overTimeType === "Full Day" && selectAllOverTime === true) {
            setUpdateDetail(
                overTimeDetail?.map(overtime => ({
                    id: overtime?.id,
                    staffId: overtime?.staffId,
                    lateOutOvertimeAmount: staffPerMinSalary?.find(
                        staff => staff?.staffId === overtime?.staffId
                    )?.overTimePerMinute * 8 * 60, // Full-day overtime logic
                    lateOutAmount: 1,
                    lateOutOvertimeHoursTime: "08:00",
                    shiftIds: overtime?.shiftIds ? overtime?.shiftIds : "",
                    punchRecordId: overtime?.punchRecordId
                }))
            );
        }

        if (overTimeType === "1x Salary" && selectAllOverTime === true) {
            setUpdateDetail(
                overTimeDetail?.map(overtime => ({
                    id: overtime?.id,
                    staffId: overtime?.staffId,
                    lateOutOvertimeAmount: staffPerMinSalary?.find(
                        staff => staff?.staffId === overtime?.staffId
                    )?.overTimePerMinute * 1 * 8 * 60, // 1x salary overtime logic
                    lateOutAmount: 1,
                    shiftIds: overtime?.shiftIds ? overtime?.shiftIds : "",
                    lateOutOvertimeHoursTime: "08:00",
                    punchRecordId: overtime?.punchRecordId
                }))
            );
        }

        if (overTimeType === "1.5x Salary" && selectAllOverTime === true) {
            setUpdateDetail(
                overTimeDetail?.map(overtime => ({
                    id: overtime?.id,
                    staffId: overtime?.staffId,
                    lateOutOvertimeAmount: staffPerMinSalary?.find(
                        staff => staff?.staffId === overtime?.staffId
                    )?.overTimePerMinute * 8 * 60, // 1.5x salary overtime logic
                    lateOutAmount: 1.5,
                    lateOutOvertimeHoursTime: "08:00",
                    shiftIds: overtime?.shiftIds ? overtime?.shiftIds : "",
                    punchRecordId: overtime?.punchRecordId
                }))
            );
        }

        if (overTimeType === "2x Salary" && selectAllOverTime === true) {
            setUpdateDetail(
                overTimeDetail?.map(overtime => ({
                    id: overtime?.id,
                    staffId: overtime?.staffId,
                    lateOutOvertimeAmount: staffPerMinSalary?.find(
                        staff => staff?.staffId === overtime?.staffId
                    )?.overTimePerMinute * 8 * 60, // 2x salary overtime logic
                    lateOutAmount: 2,
                    lateOutOvertimeHoursTime: "08:00",
                    shiftIds: overtime?.shiftIds ? [overtime?.shiftIds] : [],
                    punchRecordId: overtime?.punchRecordId
                }))
            );
        }

        if (overTimeType === "Regularize" && selectAllOverTime === true) {
            setUpdateDetail(
                overTimeDetail?.map(overtime => ({
                    id: overtime?.id,
                    staffId: overtime?.staffId,
                    lateOutOvertimeAmount: 0, // No overtime amount for regularize
                    lateOutAmount: 0,
                    lateOutOvertimeHoursTime: "00:00",
                    shiftIds: overtime?.shiftIds ? overtime?.shiftIds : "",
                    punchRecordId: overtime?.punchRecordId
                }))
            );
        }

        if (selectAllOverTime === false) {
            setfixedOverTime(0);
            setStaffPerMinSalary([]);
            updateStaffOvertimePerMinuteState(
                staff,
                setStaffPerMinSalary,
                workTimeDate.month,
                workTimeDate.year,
                30,
                8
            );
        }
    }, [overTimeType, fixedOverTime, selectAllOverTime]);

    console.log(updateDetail);
    console.log(staffPerMinSalary);
    console.log(fixedOverTime);
    return (
        <div className='w-full p-[20px]'>
            <div className=''>
                <Link className='text-[14px]' to="/attendence_summary"> <ArrowBackIcon className='arrow-back-icon' /> Back</Link>
            </div>
            <div className='flex justify-between items-center mt-[20px] mb-[20px]'>
                <h2 className='font-medium'>Review Overtime</h2>
                <div className="flex items-center justify-center gap-[6px]">
                    {/* Toggle Switch */}
                    <p>Send SMS to Staff</p>
                    <div
                        className={`${isOn ? 'bg-[#27004a]' : 'bg-gray-300'
                            } relative inline-block w-12 h-6 rounded-full transition-colors duration-300 ease-in-out cursor-pointer`}
                        onClick={toggleSwitch}
                    >
                        <span
                            className={`${isOn ? 'translate-x-6' : 'translate-x-0'
                                } inline-block w-6 h-6 bg-[#d5cdcd] rounded-full transform transition-transform duration-300 ease-in-out`}
                        />
                    </div>
                </div>

            </div>
            <div className='p-[8px] shadow-md rounded-md flex items-center justify-between mb-[20px]'>
                <input className='text-[14px]' type="date" defaultValue={defaultDate} onChange={handleDateChange} />
                {/* <p className='bg-[#edd0ca] p-[5px] text-[12px] border border-b border-[#e07964] text-[black] rounded-md'> <WarningIcon className='warning-icon text-[14px] text-[red] ' /> Approval pending for other  <Link className='text-[blue] ml-[10px]' to="/">View</Link> </p> */}
            </div>
            <div className='flex items-center gap-[10px] mb-[20px] '>
                <div className='flex items-center gap-[10px]  rounded-md p-[6px] font-medium select-pe'>
                    <input type="checkbox" checked={selectAllOverTime} onChange={() => {
                        setSelectAllOverTime(!selectAllOverTime);
                    }} />
                    <p className='text-[14px] whitespace-nowrap'>Select All</p>
                </div>
                <div className="relative inline-block text-left">
                    <select value={overTimeType} onChange={(e) => setOverTimeType(e.target.value)} className='select-pe rounded-md pl-[2px] text-[14px] p-[8px]'>
                        {fixedAmountOptions.map((item, index) => <option key={index} value={item}>{item}</option>)}
                    </select>
                </div>
                {
                    (overTimeType === "Fixed Amount Per Minute" || overTimeType === "Fixed Amount") && selectAllOverTime && <div className='flex items-center gap-[10px]  rounded-md p-[6px] font-medium select-pe'>
                        <input disabled={overTimeType === "Fixed Amount Per Minute" && overTimeType === "Fixed Amount"} type="number" name="" id="" value={fixedOverTime} onChange={(e) => setfixedOverTime(e.target.value)} />
                    </div>
                }
                <div>
                    <button className='p-2 pl-[20px] pr-[20px] border transition duration-200 bg-[#27004a] rounded-md text-[white] hover:bg-[#fff] hover:text-[#27004a] hover:border-[#27004a] hover:border' type='submit' onClick={() => updateMultipleStaffOvertime(updateDetail)}>Apply</button>
                </div>



            </div>
            {/* <div className=' w-32 flex gap-[10px] items-center mb-[20px]'>
                <Select
                    closeMenuOnSelect={false}
                    onChange={
                        handleChange
                    }
                    options={allshift}
                />
            </div> */}
            {
                workTimeDate.year == "" &&
                <div className="text-center">
                    <h2 className='text-[#ff0000] font-medium py-9 text-[20px]'>Please Select Date</h2>
                </div>

            }

            {
                overTimeDetail?.map((item, index) => {
                    return <div className='shadow-md rounded-md p-[20px] mb-[20px]  '>
                        <div className=' w-full flex gap-[10px] items-center mb-[20px]'>
                            <p className='text-[14px] whitespace-nowrap'>Select Shift</p>
                            <Select
                                onChange={(selectedOptions) => {
                                    setUpdateDetail((prev) => {
                                        // Find the existing entry based on `id` and `staffId`
                                        const exists = prev.find(
                                            (value) => value?.id === item?.id && value?.staffId === item?.staffId
                                        );

                                        // Filter out the existing entry if it exists
                                        const filteredPrev = prev.filter(
                                            (value) => !(value?.id === item?.id && value?.staffId === item?.staffId)
                                        );

                                        console.log(exists);

                                        // Prepare updated shifts


                                        // Add the new or updated entries back to the state
                                        return [...filteredPrev, { ...exists, shiftIds: selectedOptions?.value }];
                                    });
                                }}
                                options={allshift}
                                isClearable
                                placeholder="Select multiple shifts"
                            />
                        </div>
                        <div className='flex items-center gap-[16px] w-full'>
                            <input checked={updateDetail?.some((value) => (value?.id === item?.id && value?.staffId === item?.staffId))} onClick={() => {
                                setUpdateDetail((prev) => {
                                    // Check if the staffId already exists in the array
                                    const exists = prev.some((value) => (value?.id === item?.id && value?.staffId === item?.staffId));

                                    if (exists) {
                                        // Remove the existing entry
                                        return prev.filter((value) => (value?.id !== item?.id && value?.staffId !== item?.staffId));
                                    } else {
                                        // Add a new entry
                                        return [...prev, { id: item?.id, staffId: item?.staffId }];
                                    }
                                });
                            }} className='h-[12px]' type="checkbox" />
                            <div>
                                <h5 className='text-[14px]'>{staff?.find((staff) => staff?.staffDetails?.id === item?.staffId)?.name || "N/A"}</h5>
                                {/* <p className='text-[12px] text-[#ad9f9f]'>
                                    In: {item?.punchRecord?.punchIn?.punchInDate
                                        ? new Date(item.punchRecord.punchIn.punchInDate).toLocaleTimeString()
                                        : "N/A"} |
                                    Out: {item?.punchRecord?.punchOut?.punchOutDate
                                        ? new Date(item.punchRecord.punchOut.punchOutDate).toLocaleTimeString()
                                        : "N/A"}
                                </p> */}
                            </div>
                            <div className='flex gap-[20px] ml-[50px]'>
                                <div>
                                    <h5 className="text-[12px] font-medium">
                                        {(() => {
                                            const time = item?.lateOutOvertimeHoursTime || ""; // Ensure it's a string
                                            const [hours, minutes] = time.split(":");
                                            if (hours && minutes) {
                                                return hours !== "00"
                                                    ? `${hours} hr ${minutes} min Overtime`
                                                    : `${minutes} min Overtime`;
                                            }
                                            return "No Overtime"; // Fallback if time is invalid
                                        })()}
                                    </h5>
                                    <p className="text-[12px] text-[#ad9f9f]">
                                        {(() => {
                                            const time = item?.lateOutOvertimeHoursTime || ""; // Ensure it's a string
                                            const [hours, minutes] = time.split(":");
                                            if (hours && minutes) {
                                                return hours !== "00" ? `${hours} hr ${minutes} min` : `${minutes} min`;
                                            }
                                            return "No Time Recorded"; // Fallback if time is invalid
                                        })()}
                                    </p>
                                </div>
                                <div>
                                    {/* <h5 className='text-[12px] font-medium'>{formatDate(item?.createdAt)}</h5> */}
                                    <h5 className='text-[12px] font-medium'>Shift</h5>
                                    <p className="text-[12px] text-[#ad9f9f]">
                                        {(() => {
                                            console.log(allshift);
                                            const shiftLabel = allshift?.find((shift) => shift?.value === item?.shiftIds)?.label?.split("(")[0];
                                            console.log(allshift?.find((shift) => shift?.value === item?.shiftIds)); // Log for debugging
                                            return shiftLabel || 'No shift available'; // Provide a fallback value
                                        })()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='pt-[30px] flex justify-between  mb-20px '>
                            <div className='flex gap-[50px]'>
                                <div className='flex items-center gap-[10px]'>
                                    <input type="checkbox" checked={updateDetail?.some((value) => (value?.id === item?.id && value?.staffId === item?.staffId))} onClick={() => {
                                        setUpdateDetail((prev) => {
                                            // Check if the staffId already exists in the array
                                            const exists = prev.some((value) => (value?.id === item?.id && value?.staffId === item?.staffId));

                                            if (exists) {
                                                // Remove the existing entry
                                                return prev.filter((value) => (value?.id !== item?.id && value?.staffId !== item?.staffId));
                                            } else {
                                                // Add a new entry
                                                return [...prev, { id: item?.id, staffId: item?.staffId }];
                                            }
                                        });
                                    }} />
                                    <p className='text-[14px] font-medium'>Late Entry</p>
                                </div>
                                <div className='flex gap-[26px]'>
                                    <div>
                                        <p className='text-[12px]'>Hours</p>
                                        <TimePicker
                                            placeholder={item?.lateOutOvertimeHoursTime}
                                            disabled={!updateDetail?.some((value) => (value?.id === item?.id && value?.staffId === item?.staffId))}
                                            showSecond={false} format="HH:mm"
                                            inputReadOnly
                                            // value={updateDetail?.find((value) => (value?.id === item?.id && value?.staffId === item?.staffId))?.lateOutOvertimeHoursTime || item?.lateOutOvertimeHoursTime}
                                            onChange={(value) => {
                                                const [hours, minutes] = (value?.format('HH:mm') || "00:00")?.split(':')?.map(Number);
                                                const totalMinutes = hours * 60 + minutes;
                                                setUpdateDetail((prev) => {
                                                    // Check if the staffId already exists in the array
                                                    const exists = prev.find((value) => (value?.id === item?.id && value?.staffId === item?.staffId));
                                                    console.log(exists);
                                                    // Remove the existing entry
                                                    return [...prev.filter((value) => (value?.id !== item?.id && value?.staffId !== item?.staffId)), { ...exists, lateOutOvertimeHoursTime: value?.format("HH:mm"), lateOutOvertimeAmount: staffPerMinSalary?.find((perMinSalary) => perMinSalary?.staffId === item?.staffId)?.overTimePerMinute * totalMinutes }];
                                                });
                                            }}
                                            className='text-[14px] select-pe rounded-md' />
                                        {/* <p className='text-[14px] select-pe p-[5px] w-[124px] rounded-md'>00:37      hrs</p> */}
                                        <p className="text-[12px] mt-[8px]">
                                            Amount ₹{' '}
                                            {(() => {
                                                const detail = updateDetail?.find(
                                                    (value) => value?.id === item?.id && value?.staffId === item?.staffId
                                                );
                                                const fineAmount = detail?.lateOutOvertimeAmount || item?.lateOutOvertimeAmount || 0;
                                                const entryAmount = detail?.lateOutAmount || 1;
                                                return (fineAmount * entryAmount).toFixed(2);
                                            })()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className='text-[12px]'>Overtime Amount</p>
                                        <div className="relative inline-block text-left">
                                            {/* Button to open/close the dropdown */}
                                            <select value={updateDetail?.find((value) => (value?.id === item?.id && value?.staffId === item?.staffId))?.lateOutAmount || item?.lateOutAmount} disabled={!updateDetail?.some((value) => (value?.id === item?.id && value?.staffId === item?.staffId))} onChange={(e) => {
                                                setUpdateDetail((prev) => {
                                                    // Check if the staffId already exists in the array
                                                    const exists = prev.find((value) => (value?.id === item?.id && value?.staffId === item?.staffId));
                                                    console.log(exists);
                                                    // Remove the existing entry
                                                    return [...prev.filter((value) => (value?.id !== item?.id && value?.staffId !== item?.staffId)), { ...exists, lateOutAmount: Number(e.target.value) }];
                                                });
                                            }}
                                                className='border border-[#c9c9c9] rounded-md pl-[20px] pr-[20px] pt-[6px] pb-[6px]  w-[100%] bg-[#ececec]   focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'>
                                                <option value={1}>1x Salary</option>
                                                <option value={1.5}>1.5x Salary</option>
                                                <option value={2}>2x Salary</option>
                                                <option value={2.5}>2.5x Salary</option>
                                                <option value={3}>3x Salary</option>

                                            </select>


                                            {/* Dropdown menu */}

                                        </div>
                                    </div>
                                    <div className=''>
                                        <p className='text-[12px] invisible'>Overtime Amount</p>
                                        <p className='text-[14px] whitespace-nowrap select-pe p-[5px]  bg-[#eeeeee] rounded-md'> ₹ {(() => {
                                            console.log(staffPerMinSalary?.find((perMinSalary) => perMinSalary?.staffId === item?.staffId));
                                            return staffPerMinSalary?.find((perMinSalary) => perMinSalary?.staffId === item?.staffId)?.overTimePerMinute;
                                        })()}  Per Min</p>
                                    </div>



                                </div>
                            </div>
                            <div className='flex items-center'>
                                <button className='p-2 pl-[20px] pr-[20px] border transition duration-200 bg-[#27004a] rounded-md text-[white] hover:bg-[#fff] hover:text-[#27004a] hover:border-[#27004a] hover:border' onClick={() => {
                                    updateMultipleStaffOvertime(updateDetail.filter((value) => (value?.id === item?.id && value?.staffId === item?.staffId)));
                                }}>Save</button>
                            </div>

                        </div>
                    </div>
                })
            }
        </div>
    );
}

export default Overtime;