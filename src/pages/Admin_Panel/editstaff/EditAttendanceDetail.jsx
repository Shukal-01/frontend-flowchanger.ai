import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import biometric from '../../../Assets/Images/biometric.svg';
import gps from '../../../Assets/Images/gps.svg';
import qr from '../../../Assets/Images/qr-code.svg';
import rightimg from '../../../Assets/Images/right.svg';
import selfie from '../../../Assets/Images/selfie-img.svg';
import { useGlobalContext } from '../../../Context/GlobalContext';
import Select from 'react-select';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';



const EditAttendanceDetail = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { baseUrl, selectedStaff, openToast } = useGlobalContext();
    const [flexibleDays, setFlexibleDays] = useState([]);
    const [daysInMonth, setDaysInMonth] = useState([]);
    const [toogleStaffAttendance, setToogleStaffAttendance] = useState(selectedStaff?.staffDetails?.status || false);
    const [toggleSelfieAttendance, setToggleSelfieAttendance] = useState(selectedStaff?.staffDetails?.AttendenceMode?.selfie_attendance || false);
    const [toggleAllowPunchInMobile, setToggleAllowPunchInMobile] = useState(selectedStaff?.staffDetails?.AttendenceMode?.allow_punch_in_for_mobile || false);
    const [toggleQRAttendance, setToggleQRAttendance] = useState(selectedStaff?.staffDetails?.AttendenceMode?.qr_attendance || false);
    const [toggleGPSAttendance, setToggleGPSAttendance] = useState(selectedStaff?.staffDetails?.AttendenceMode?.gps_attendance || false);
    const [markLocation, setMarkLocation] = useState(selectedStaff?.staffDetails?.AttendenceMode?.mark_attendance || "Office");
    // console.log(markLocation, toggleAllowPunchInMobile, toggleGPSAttendance, toggleQRAttendance, toggleSelfieAttendance);
    const [openWeekDay, setOpenWeekDay] = useState("");
    const [shiftType, setShiftType] = useState("fixed");
    const parseTimeString = (timeString) => {
        // Check if the timeString is valid and formatted correctly
        if (!timeString || !timeString.includes(" hr : ")) {
            return { hr: "", min: "" };
        }
        const [hr, min] = timeString.split(" hr : ").map((val) => val.trim());
        return { hr, min: min.split(" ")[0] };
    };


    const [toggleAutoPresent, setToggleAutoPresent] = useState(selectedStaff?.staffDetails?.attendanceAutomationRule?.auto_absent || false);
    const [togglePresentOnPunch, setTogglePresentOnPunch] = useState(selectedStaff?.staffDetails?.attendanceAutomationRule?.present_on_punch || false);

    const [autoHalfDay, setAutoHalfDay] = useState(parseTimeString(selectedStaff?.staffDetails?.attendanceAutomationRule?.auto_half_day));
    const [mandatoryFullDayHour, setMandatoryFullDayHour] = useState(parseTimeString(selectedStaff?.staffDetails?.attendanceAutomationRule?.manadatory_full_day));
    const [mandatoryHalfDayHour, setMandatoryHalfDayHour] = useState(parseTimeString(selectedStaff?.staffDetails?.attendanceAutomationRule?.manadatory_half_day));
    const [shiftDetails, setShiftDetails] = useState(selectedStaff?.staffDetails?.shifts || []);
    const [selectMonShift, setSelectMonShift] = useState([]);
    const [selectTueShift, setSelectTueShift] = useState([]);
    const [selectWedShift, setSelectWedShift] = useState([]);
    const [selectThuShift, setSelectThuShift] = useState([]);
    const [selectFriShift, setSelectFriShift] = useState([]);
    const [selectSatShift, setSelectSatShift] = useState([]);
    const [selectSunShift, setSelectSunShift] = useState([]);

    const [hasWeekOff, setHasWeekOff] = useState({
        MonWeekOff: false,
        TueWeekOff: false,
        WedWeekOff: false,
        ThuWeekOff: false,
        FriWeekOff: false,
        SatWeekOff: false,
        SunWeekOff: false
    });

    const [dayWiseWeekOff, setDayWiseWeekOff] = useState([
        {
            day: "Mon",
            weekOff: {
                firstWeek: false,
                secondWeek: false,
                thirdWeek: false,
                fourthWeek: false,
                fifthWeek: false

            }
        },
        {
            day: "Tue",
            weekOff: {
                firstWeek: false,
                secondWeek: false,
                thirdWeek: false,
                fourthWeek: false,
                fifthWeek: false
            }
        },
        {
            day: "Wed",
            weekOff: {
                firstWeek: false,
                secondWeek: false,
                thirdWeek: false,
                fourthWeek: false,
                fifthWeek: false
            }
        },
        {
            day: "Thu",
            weekOff: {
                firstWeek: false,
                secondWeek: false,
                thirdWeek: false,
                fourthWeek: false,
                fifthWeek: false
            }
        },
        {
            day: "Fri",
            weekOff: {
                firstWeek: false,
                secondWeek: false,
                thirdWeek: false,
                fourthWeek: false,
                fifthWeek: false
            }
        },
        {
            day: "Sat",
            weekOff: {
                firstWeek: false,
                secondWeek: false,
                thirdWeek: false,
                fourthWeek: false,
                fifthWeek: false
            }
        },
        {
            day: "Sun",
            weekOff: {
                firstWeek: false,
                secondWeek: false,
                thirdWeek: false,
                fourthWeek: false,
                fifthWeek: false
            }
        }
    ]);
    const weekLabels = {
        firstWeek: "1st",
        secondWeek: "2nd",
        thirdWeek: "3rd",
        fourthWeek: "4th",
        fifthWeek: "5th",
    };
    const [openCalendar, setOpenCalendar] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(new Date())
    const [year, setYear] = useState(new Date().getFullYear())

    const months = [
        ["Jan", "Feb", "Mar"],
        ["Apr", "May", "Jun"],
        ["Jul", "Aug", "Sep"],
        ["Oct", "Nov", "Dec"],
    ]

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    }

    const handleMonthSelect = (monthIdx) => {
        const newDate = new Date(year, monthIdx)
        setSelectedMonth(newDate)
        setOpenCalendar(false)
    }

    const handleYearChange = (increment) => {
        setYear(year + increment)
    }

    // console.log(selectedMonth);

    const getWeekOffSummaryForDay = (day) => {
        const selectedDay = dayWiseWeekOff.find((item) => item.day === day);
        if (!selectedDay) {
            return `Invalid day: ${day}`;
        }

        const { weekOff } = selectedDay;
        const weeksOff = Object.entries(weekOff)
            .filter(([_, isOff]) => isOff)
            .map(([weekKey]) => weekLabels[weekKey])
            .join(", ");

        return `${day}: ${weeksOff ? `${weeksOff} Week Off` : "All Week off"}`;
    };
    const handleDayWeekOffChange = (day, week, checked) => {
        setDayWiseWeekOff(prevState => {
            // Update the specific day and week within the `dayWiseWeekOff` array
            const updatedDayWiseWeekOff = prevState.map(item => {
                if (item.day === day) {
                    return {
                        ...item,
                        weekOff: {
                            ...item.weekOff,
                            [week]: checked // Update the selected week for the day
                        }
                    };
                }
                return item;
            });
            return updatedDayWiseWeekOff;
        });
    };



    // console.log(dayWiseWeekOff); 
    async function fetchShiftDetails() {
        const result = await fetch(baseUrl + "shift");
        if (result.status == 200) {
            const data = await result.json();
            setShiftDetails(data)
        }
        else {
            openToast("No Record Found")
        }
    }

    const [openWeekOff, setOpenWeekOff] = useState(false);
    const [newShift, setNewShift] = useState({
        shiftName: "",
        shiftStartTime: "",
        shiftEndTime: "",
        punchInType: "ANYTIME",
        punchOutType: "ANYTIME",
        allowPunchInHours: 0,
        allowPunchInMinutes: 0,
        allowPunchOutHours: 0,
        allowPunchOutMinutes: 0,
    })

    const [selectedShift, setSelectedShift] = useState([]);
    const options = selectedShift?.map((seo) => ({
        value: seo?.shiftName,
        label: `${seo?.shiftName} | ${seo?.shiftStartTime} - ${seo?.shiftEndTime}`
    }));
    const isSelected = (shiftId) => selectedShift.some((s) => s.id === shiftId);
console.log(selectedStaff);
    async function updateAttendanceMode(e) {
        e.preventDefault();
        setIsLoading(true);
        const data = {
            staff_ids: [
                selectedStaff?.staffDetails?.id
            ],
            attendence_mode: {
                "selfie_attendance": toggleSelfieAttendance,
                "qr_attendance": toggleQRAttendance,
                "gps_attendance": toggleGPSAttendance,
                "mark_attendance": markLocation,
                "allow_punch_in_for_mobile": toggleAllowPunchInMobile
            }
        };

        try {
            const response = await fetch(baseUrl + "attendance/mode/", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();

            if (response.status === 200) {
                console.log(result);
                openToast("Attendance Mode created and updated Successfully", "success");
            }
            else {
                openToast("An error occurred while creating and updating attendance mode", "error");
            }
        } catch (error) {
            console.error("Error creating and updating attendance mode:", error);
            openToast("An error occurred while creating and updating attendance mode", "error");
        } finally {
            closeModal5();
            openModal6();
            setIsLoading(false);
        }
    }

    async function updateAttendanceAutomationRules(e) {
        e.preventDefault();
        setIsLoading(true);
        const data = {
            staff_ids: [selectedStaff?.staffDetails?.id],
            automation_rules: {
                auto_absent: toggleAutoPresent,
                present_on_punch: togglePresentOnPunch,
                auto_half_day: autoHalfDay.hr && autoHalfDay.min ? `${autoHalfDay.hr} hr : ${autoHalfDay.min} min` : "Not Set",
                mandatory_half_day: `${mandatoryHalfDayHour.hr} hr : ${mandatoryHalfDayHour.min} min`,
                mandatory_full_day: `${mandatoryFullDayHour.hr} hr : ${mandatoryFullDayHour.min} min`,
            }
        };

        try {
            const response = await fetch(baseUrl + "attendance/automation/", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();

            if (response.status === 200) {
                console.log(result);
                openToast("Attendance Automation Rules created and updated Successfully", "success");
            }
            else {
                openToast("An error occurred while creating and updating attendance automation rules", "error");
            }
        } catch (error) {
            console.error("Error creating and updating attendance automation rules:", error);
            openToast("An error occurred while creating and updating attendance automation rules", "error");
        } finally {
            closeModal7();
            openModal8();
            setIsLoading(false);
        }
    }

    let subtitle;
    // update work timing
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#000';

    }

    function closeModal() {
        setIsOpen(false);
    }
    // update work timing


    //update onclick shift modal
    const [modalIsOpen1, setIsOpen1] = React.useState(false);
    function openModal1() {
        setIsOpen1(true);
    }
    function afterOpenModal1() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#000';

    }

    function closeModal1() {
        setIsOpen1(false);
    }
    // update onclick shift modal


    // when onclick add shift
    const [modalIsOpen2, setIsOpen2] = React.useState(false);
    function openModal2() {
        setIsOpen2(true);
    }
    function afterOpenModal2() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#000';

    }

    function closeModal2() {
        setIsOpen2(false);
    }

    // when onclick add shift

    // onclick start timing

    const [modalIsOpen3, setIsOpen3] = React.useState(false);
    function openModal3() {
        setIsOpen3(true);
    }
    function afterOpenModal3() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#000';

    }

    function closeModal3() {
        setIsOpen3(false);
    }
    // onclick start timing


    // onclick update attendance 
    const [modalIsOpen5, setIsOpen5] = React.useState(false);
    function openModal5() {
        setIsOpen5(true);
    }
    function afterOpenModal5() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#000';

    }

    function closeModal5() {
        setIsOpen5(false);
    }

    // onclick update attendance

    // toggle switch
    const [isOn, setIsOn] = useState(false);

    // const handleToggle = () => {
    //     setToogleStaffAttendance(!toogleStaffAttendance);
    //     console.log(toogleStaffAttendance);
    //     setIsOn(!isOn);
    // };
    // toggle switch

    {/* when onclick update attendance modes for all staff */ }
    const [modalIsOpen6, setIsOpen6] = React.useState(false);
    function openModal6() {
        setIsOpen6(true);
    }
    function afterOpenModal6() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#000';

    }

    function closeModal6() {
        setIsOpen6(false);
    }

    {/* when onclick update attendance modes for all staff */ }

    {/* when onclick update automation rule for all staff */ }
    const [modalIsOpen7, setIsOpen7] = React.useState(false);
    function openModal7() {
        setIsOpen7(true);
    }
    function afterOpenModal7() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#000';

    }

    function closeModal7() {
        setIsOpen7(false);
    }

    {/* when onclick update automation rule for all staff */ }


    {/* when onclick update attendance modes  rule for all staff  successfull message*/ }

    const [modalIsOpen8, setIsOpen8] = React.useState(false);
    function openModal8() {
        setIsOpen8(true);
    }
    function afterOpenModal8() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#000';

    }

    function closeModal8() {
        setIsOpen8(false);
    }

    {/* when onclick update attendance modes  rule for all staff  successfull message*/ }

    //  onclick auto half day button

    const [modalIsOpen16, setIsOpen16] = React.useState(false);
    function openModal16() {
        setIsOpen16(true);
    }
    function afterOpenModal16() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#000';

    }

    function closeModal16() {
        setIsOpen16(false);
    }
    // onclick auto half day button



    // onclick mandatory half day button
    const [modalIsOpen17, setIsOpen17] = React.useState(false);
    function openModal17() {
        setIsOpen17(true);
    }
    function afterOpenModal17() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#000';

    }

    function closeModal17() {
        setIsOpen17(false);
    }
    // onclick mandatory half day button

    // onclick mandatory full day button
    const [modalIsOpen18, setIsOpen18] = React.useState(false);
    function openModal18() {
        setIsOpen18(true);
    }
    function afterOpenModal18() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#000';

    }

    function closeModal18() {
        setIsOpen18(false);
    }
    // onclick mandatory half day button

    const handleTimeChange = (value) => {

        const [hours, minutes] = value.split(":").map(Number);

        // Determine AM or PM
        const period = hours >= 12 ? "PM" : "AM";

        // Convert to 12-hour format
        const adjustedHours = hours % 12 || 12; // `12` for midnight and noon
        const formattedTime = `${adjustedHours}:${minutes < 10 ? `0${minutes}` : minutes} ${period}`;

        return formattedTime
    };

    // console.log(newShift);

    const handleCheckboxChange = (shift) => {
        setSelectedShift((prevSelected) => {
            if (isSelected(shift.id)) {
                // If already selected, remove from selectedShift
                return prevSelected.filter((s) => s.id !== shift.id);
            } else {
                // Otherwise, add to selectedShift
                return [...prevSelected, shift];
            }
        });
    };
    async function submitShift() {
        setIsLoading(true);
        try {
            const result = await fetch(baseUrl + "shift", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(newShift)
            });

            if (result.status === 201) {
                const data = await result.json();
                console.log(data);
                openToast("Add Shift Successfully", "success");
            } else {
                openToast("An Error Occurred", "error");
            }
        } catch (error) {
            console.error("Error submitting shift:", error);
            openToast("An Unexpected Error Occurred", "error");
        } finally {
            setIsLoading(false);
        }
    }


    useEffect(() => {
        fetchShiftDetails();
    }, [])
    useEffect(() => {
        setFlexibleDays([]);
    }, [selectedMonth])


    function getMatchingShiftIds(selectedShift, selectMonShift) {
        // Map to extract labels from selectMonShift
        const selectMonShiftlabel = selectMonShift?.map((shift) => shift?.label);
        const matchingShiftIds = selectedShift
            ?.filter((shift) => {
                const label = `${shift?.shiftName} | ${shift?.shiftStartTime} - ${shift?.shiftEndTime}`;
                return selectMonShiftlabel?.includes(label); // Check if label exists in selectMonShiftlabel
            })
            ?.map((shift) => shift?.id); // Extract only the id

        return matchingShiftIds;
    }


    async function createFixedShift(e) {
        setIsLoading(true);
        const data = {
            staffId: selectedStaff?.staffDetails?.id,
            shifts: [
                {
                    day: "Mon",
                    weekOff: hasWeekOff.MonWeekOff,
                    shifts: getMatchingShiftIds(selectedShift, selectMonShift),
                    ...(hasWeekOff.MonWeekOff && {
                        weekOne: dayWiseWeekOff?.find((day) => day.day === "Mon")?.weekOff?.firstWeek,
                        weekTwo: dayWiseWeekOff?.find((day) => day.day === "Mon")?.weekOff?.secondWeek,
                        weekThree: dayWiseWeekOff?.find((day) => day.day === "Mon")?.weekOff?.thirdWeek,
                        weekFour: dayWiseWeekOff?.find((day) => day.day === "Mon")?.weekOff?.fourthWeek,
                        weekFive: dayWiseWeekOff?.find((day) => day.day === "Mon")?.weekOff?.fifthWeek,
                    }),
                },
                {
                    day: "Tue",
                    weekOff: hasWeekOff.TueWeekOff,
                    shifts: getMatchingShiftIds(selectedShift, selectTueShift),
                    ...(hasWeekOff.TueWeekOff && {
                        weekOne: dayWiseWeekOff?.find((day) => day.day === "Tue")?.weekOff?.firstWeek,
                        weekTwo: dayWiseWeekOff?.find((day) => day.day === "Tue")?.weekOff?.secondWeek,
                        weekThree: dayWiseWeekOff?.find((day) => day.day === "Tue")?.weekOff?.thirdWeek,
                        weekFour: dayWiseWeekOff?.find((day) => day.day === "Tue")?.weekOff?.fourthWeek,
                        weekFive: dayWiseWeekOff?.find((day) => day.day === "Tue")?.weekOff?.fifthWeek,
                    }),
                },
                {
                    day: "Wed",
                    weekOff: hasWeekOff.WedWeekOff,
                    shifts: getMatchingShiftIds(selectedShift, selectWedShift),
                    ...(hasWeekOff.WedWeekOff && {
                        weekOne: dayWiseWeekOff?.find((day) => day.day === "Wed")?.weekOff?.firstWeek,
                        weekTwo: dayWiseWeekOff?.find((day) => day.day === "Wed")?.weekOff?.secondWeek,
                        weekThree: dayWiseWeekOff?.find((day) => day.day === "Wed")?.weekOff?.thirdWeek,
                        weekFour: dayWiseWeekOff?.find((day) => day.day === "Wed")?.weekOff?.fourthWeek,
                        weekFive: dayWiseWeekOff?.find((day) => day.day === "Wed")?.weekOff?.fifthWeek,
                    }),
                },
                {
                    day: "Thu",
                    weekOff: hasWeekOff.ThuWeekOff,
                    shifts: getMatchingShiftIds(selectedShift, selectThuShift),
                    ...(hasWeekOff.ThuWeekOff && {
                        weekOne: dayWiseWeekOff?.find((day) => day.day === "Thu")?.weekOff?.firstWeek,
                        weekTwo: dayWiseWeekOff?.find((day) => day.day === "Thu")?.weekOff?.secondWeek,
                        weekThree: dayWiseWeekOff?.find((day) => day.day === "Thu")?.weekOff?.thirdWeek,
                        weekFour: dayWiseWeekOff?.find((day) => day.day === "Thu")?.weekOff?.fourthWeek,
                        weekFive: dayWiseWeekOff?.find((day) => day.day === "Thu")?.weekOff?.fifthWeek,
                    }),
                },
                {
                    day: "Fri",
                    weekOff: hasWeekOff.FriWeekOff,
                    shifts: getMatchingShiftIds(selectedShift, selectFriShift),
                    ...(hasWeekOff.FriWeekOff && {
                        weekOne: dayWiseWeekOff?.find((day) => day.day === "Fri")?.weekOff?.firstWeek,
                        weekTwo: dayWiseWeekOff?.find((day) => day.day === "Fri")?.weekOff?.secondWeek,
                        weekThree: dayWiseWeekOff?.find((day) => day.day === "Fri")?.weekOff?.thirdWeek,
                        weekFour: dayWiseWeekOff?.find((day) => day.day === "Fri")?.weekOff?.fourthWeek,
                        weekFive: dayWiseWeekOff?.find((day) => day.day === "Fri")?.weekOff?.fifthWeek,
                    }),
                },
                {
                    day: "Sat",
                    weekOff: hasWeekOff.SatWeekOff,
                    shifts: getMatchingShiftIds(selectedShift, selectSatShift),
                    ...(hasWeekOff.SatWeekOff && {
                        weekOne: dayWiseWeekOff?.find((day) => day.day === "Sat")?.weekOff?.firstWeek,
                        weekTwo: dayWiseWeekOff?.find((day) => day.day === "Sat")?.weekOff?.secondWeek,
                        weekThree: dayWiseWeekOff?.find((day) => day.day === "Sat")?.weekOff?.thirdWeek,
                        weekFour: dayWiseWeekOff?.find((day) => day.day === "Sat")?.weekOff?.fourthWeek,
                        weekFive: dayWiseWeekOff?.find((day) => day.day === "Sat")?.weekOff?.fifthWeek,
                    }),
                },
                {
                    day: "Sun",
                    weekOff: hasWeekOff.SunWeekOff,
                    shifts: getMatchingShiftIds(selectedShift, selectSunShift),
                    ...(hasWeekOff.SunWeekOff && {
                        weekOne: dayWiseWeekOff?.find((day) => day.day === "Sun")?.weekOff?.firstWeek,
                        weekTwo: dayWiseWeekOff?.find((day) => day.day === "Sun")?.weekOff?.secondWeek,
                        weekThree: dayWiseWeekOff?.find((day) => day.day === "Sun")?.weekOff?.thirdWeek,
                        weekFour: dayWiseWeekOff?.find((day) => day.day === "Sun")?.weekOff?.fourthWeek,
                        weekFive: dayWiseWeekOff?.find((day) => day.day === "Sun")?.weekOff?.fifthWeek,
                    }),
                },
            ],
        };

        console.log(data);

        try {
            const response = await fetch(`${baseUrl}shift/fixed/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (response.status === 200) {
                // console.log(`Response data for ${shiftData.day}:`, result);
                openToast(
                    `Fixed Shift Updated or Added Successfully`,
                    "success"
                );
            } else {
                openToast(
                    `An error occurred while adding or updating Work Timing`,
                    "error"
                );
            }
        } catch (error) {
            console.error("Error submitting Work Timing:", error);
            openToast("An error occurred while adding or updating Work Timing", "error");
        } finally {
            closeModal();
            setIsLoading(false);
        }
    }
    async function createFlexibleShift(e) {
        setIsLoading(true);
        const data = {
            staffId: selectedStaff?.staffDetails?.id,
            shifts: flexibleDays.map(({ day, shifts, weekOff }) => ({
                dateTime: day,
                weekOff: weekOff,
                shifts: getMatchingShiftIds(selectedShift, shifts),
            })),
        };

        // console.log(data);
        try {
            const response = await fetch(`${baseUrl}shift/flexible/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (response.status === 200) {
                // console.log(`Response data for ${shiftData.day}:`, result);
                openToast(
                    `Flexible Shift Updated or Added Successfully`,
                    "success"
                );

                setFlexibleDays([]);
                closeModal()
            } else {
                openToast(
                    `An error occurred while adding or updating Flexible Shift Work Timing`,
                    "error"
                );
            }
        } catch (error) {
            console.error("Error submitting Flexible Shift Work Timing:", error);
            openToast("An error occurred while adding or updating Flexible Shift Work Timing", "error");
        } finally {
            setIsLoading(false);
            closeModal();
        }
    }

    const setDefaultWeekOffForDay = (day) => {
        setDayWiseWeekOff(prevState => {
            const updatedDayWiseWeekOff = prevState.map(item => {
                if (item.day === day) {
                    // Set all weeks to false for the specific day
                    return {
                        ...item,
                        weekOff: { allweek: false, firstWeek: false, secondWeek: false, thirdWeek: false, fourthWeek: false, fifthWeek: false }
                    };
                }
                return item;
            });
            return updatedDayWiseWeekOff;
        });
    };

    console.log(selectedMonth);
    useEffect(() => {
        const year = selectedMonth.getFullYear();
        const month = selectedMonth.getMonth();

        // Calculate days in the selected month
        const days = Array.from(
            { length: new Date(year, month + 1, 0).getDate() },
            (_, i) => i + 1
        );
        setDaysInMonth(days);
    }, [selectedMonth]);
    const getDayName = (date) => {
        return date.toLocaleDateString("en-US", { weekday: "short" });
    };

    // console.log(daysInMonth);

    // console.log(flexibleDays);

    // console.log(hasWeekOff);
    return (
        <>
            {/* <div className='w-full p-[20px] pt-[100px] xl:p-[40px] relative xl:pt-[100px]    xl:pl-[320px] flex flex-col '> */}
            <h2 className='bg-[#fff] pt-[10px] mt-[20px] pb-[10px]  rounded-lg font-normal'>Attendance Details</h2>

            <div className='mt-5'>
                <button type="button" onClick={openModal} className=" shadow-cs bg-white w-full flex items-center justify-between mb-4  text-start text-[14px]  text-[#000] p-4 rounded-md " id="menu-button" aria-expanded="true" aria-haspopup="true">
                    Update Work Timings <ArrowForwardIosIcon className='allarrow-verify' />

                </button>

                <button type="button" onClick={openModal5} className=" shadow-cs bg-white w-full flex items-center justify-between mb-4  text-start  text-[14px] text-[#000] p-4 rounded-md" id="menu-button" aria-expanded="true" aria-haspopup="true">
                    Update Attendance Modes <ArrowForwardIosIcon className='allarrow-verify' />

                </button>
                <button type="button" onClick={openModal7} className="  shadow-cs bg-white w-full flex items-center justify-between mb-4  text-start  text-[14px] text-[#000] p-4 rounded-md" id="menu-button" aria-expanded="true" aria-haspopup="true">
                    Update Automation Rules <ArrowForwardIosIcon className='allarrow-verify' />

                </button>

                <div className='  shadow-cs bg-white w-full mb-4  text-start text-[14px]  text-[#000] p-4 rounded-md flex justify-between'>
                    <div className='flex gap-[12px] items-center '>
                        <h4 className='m-0'>Staff Can View Own Attendance</h4>
                    </div>
                    <div className="flex items-center  ">
                        <div
                            onClick={() => setToogleStaffAttendance(!toogleStaffAttendance)}
                            className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors ${toogleStaffAttendance ? 'bg-[#27004a]' : 'bg-gray-300'
                                }`}
                        >
                            <div
                                className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${toogleStaffAttendance ? 'translate-x-6' : 'translate-x-0'
                                    }`}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>



            {/* update work timing */}
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                // style={customStyles}
                contentLabel="Example Modal"
                className="w-[96%] xl:w-[40%] absolute top-[50%] left-[50%] bottom-auto p-0 bg-[#fff]  shadow-md rounded-[10px] translate-x-[-50%] translate-y-[-50%]"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} className='border-b p-3   border-[#000] text-[14px]'> Update Work Timings</h2>
                <button onClick={closeModal} className='absolute right-[5px] top-[3px] font-semibold	  bg-[#27004a] rounded-full'><CloseIcon className='text-white' /></button>
                <Tabs className="p-[s0px] fixed-tab-section">
                    <TabList className="flex justify-around items-center mt-3 m-2 xl:m-2 mb-2 bg-[#fff] pt-[10px] pb-[10px] rounded-md">
                        <label className='text-[14px]'>Select Type</label>
                        <Tab className="cursor-pointer flex items-center gap-[10px]">
                            <input checked={shiftType === 'fixed'} type="radio" id="fixed" name='fixed' onChange={() => setShiftType('fixed')} className='rounded-full ' />
                            <label for="fixed" className='text-[14px]'> Fixed</label><br />
                        </Tab>
                        <Tab className="cursor-pointer flex items-center gap-[10px]">
                            <input checked={shiftType === 'flexible'} type="radio" id="flexible" name='fixed' onChange={() => setShiftType('flexible')} className='rounded-full ' />
                            <label for="flexible" className='text-[14px]'> Flexible</label><br />
                        </Tab>
                    </TabList>
                    <TabPanel>
                        <div className='first-panel'>
                            <div className="overflow-y-scroll h-[50vh]">
                                <table className='w-full'>
                                    <thead className='border-b border-[#000] '>
                                        <th className='p-3 text-[13px] font-medium'>Day </th>
                                        <th className='p-3 text-[13px] font-medium w-[45px]'>Weekoff </th>
                                        <th className='p-3 text-[13px] font-medium text-left'>Shifts</th>

                                    </thead>
                                    <tbody>
                                        <tr className=''>
                                            <td className='text-center text-[12px] font-normal'>Mon</td>
                                            <td className='p-3 text-center'>
                                                <input checked={hasWeekOff.MonWeekOff} onChange={() => {
                                                    if (hasWeekOff.MonWeekOff === false) {
                                                        setDefaultWeekOffForDay("Mon");
                                                    }
                                                    setOpenWeekDay("Monday");
                                                    setHasWeekOff({ ...hasWeekOff, "MonWeekOff": !hasWeekOff.MonWeekOff });
                                                    setOpenWeekOff(!openWeekOff);
                                                }} type="checkbox" />
                                            </td>
                                            <td className='pr-5 flex items-center '>
                                                <div className='w-[94%] flex flex-col gap-1 p-[5px]'>
                                                    {hasWeekOff.MonWeekOff === true && (
                                                        <div className="w-full  rounded-md p-[5px] mt-1 focus:outline-none text-[#000] xl:text-[14px] text-[12px] mr-[0px] ml-[7px]"
                                                        >{getWeekOffSummaryForDay("Mon")}</div>
                                                    )}
                                                    <Select
                                                        options={options}
                                                        isMulti
                                                        placeholder="Select Shift"
                                                        value={selectMonShift}
                                                        onChange={(selected) => setSelectMonShift(selected)}
                                                        onMenuOpen={() => selectedShift.length === 0 && openModal1()}
                                                        className="w-full  rounded-md p-[5px] mt-1 focus:outline-none text-[#000] xl:text-[14px] text-[12px] mr-[0px] ml-[7px]"
                                                        styles={{
                                                            control: (base) => ({
                                                                ...base,
                                                                minHeight: '40px',
                                                                // maxHeight: '30px',
                                                                // overflow: "scroll",
                                                                // scrollBehavior: "smooth",
                                                                // scrollbarWidth: "none",
                                                                // overflowX: "hidden",
                                                            }),
                                                            multiValue: (base) => ({
                                                                ...base,
                                                                backgroundColor: '#e5e7eb',
                                                            }),
                                                            multiValueLabel: (base) => ({
                                                                ...base,
                                                                color: '#000',
                                                                // height: '30px',
                                                                // display:"flex",
                                                                // flexDirection:"column",
                                                                // justifyContent:"center",
                                                                // alignItems: 'center',
                                                            }),
                                                            multiValueRemove: (base) => ({
                                                                ...base,
                                                                color: '#ff0000',
                                                                cursor: 'pointer',
                                                            }),
                                                        }}
                                                    />
                                                </div>
                                                <button className='bg-[#27004a] rounded-full ml-4'>
                                                    <AddIcon className="text-white" onClick={openModal1} />
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className=''>
                                            <td className='text-center text-[12px] font-normal'>Tue</td>
                                            <td className='p-3 text-center'>
                                                <input type="checkbox" value={hasWeekOff.TueWeekOff} onChange={() => {
                                                    if (hasWeekOff.TueWeekOff === false) {
                                                        setDefaultWeekOffForDay("Tue");
                                                    }
                                                    setOpenWeekDay("Tuesday");
                                                    setHasWeekOff({ ...hasWeekOff, "TueWeekOff": !hasWeekOff.TueWeekOff });
                                                    setOpenWeekOff(!openWeekOff);
                                                }} />
                                            </td>
                                            <td className='pr-5 flex items-center'>
                                                <div className='w-[94%] flex flex-col gap-1 p-[5px]'>
                                                    {hasWeekOff.TueWeekOff === true && (
                                                        <div className="w-full rounded-md p-[5px] mt-1 focus:outline-none text-[#000] xl:text-[14px] text-[12px] mr-[0px] ml-[7px]"
                                                        >{getWeekOffSummaryForDay("Tue")}</div>

                                                    )}
                                                    <Select
                                                        options={options}
                                                        isMulti
                                                        placeholder="Select Shift"
                                                        value={selectTueShift}
                                                        onChange={(selected) => setSelectTueShift(selected)}
                                                        onMenuOpen={() => selectedShift.length === 0 && openModal1()}
                                                        className="w-full  rounded-md p-[5px] mt-1 focus:outline-none text-[#000] xl:text-[14px] text-[12px] mr-[0px] ml-[7px]"
                                                        styles={{
                                                            control: (base) => ({
                                                                ...base,
                                                                minHeight: '40px',
                                                            }),
                                                            multiValue: (base) => ({
                                                                ...base,
                                                                backgroundColor: '#e5e7eb',
                                                            }),
                                                            multiValueLabel: (base) => ({
                                                                ...base,
                                                                color: '#000',
                                                            }),
                                                            multiValueRemove: (base) => ({
                                                                ...base,
                                                                color: '#ff0000',
                                                                cursor: 'pointer',
                                                            }),
                                                        }}
                                                    />
                                                </div>
                                                <button className='bg-[#27004a] rounded-full ml-4'>
                                                    <AddIcon className="text-white" onClick={openModal1} />
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className=''>
                                            <td className='text-center text-[12px] font-normal'>Wed</td>
                                            <td className='p-3 text-center'>
                                                <input type="checkbox" value={hasWeekOff.WedWeekOff} onChange={() => {
                                                    if (hasWeekOff.WedWeekOff === false) {
                                                        setDefaultWeekOffForDay("Wed");
                                                    }
                                                    setOpenWeekDay("Wednesday");
                                                    setHasWeekOff({ ...hasWeekOff, "WedWeekOff": !hasWeekOff.WedWeekOff });
                                                    setOpenWeekOff(!openWeekOff);
                                                }} />
                                            </td>
                                            <td className='pr-5 flex items-center'>
                                                <div className='w-[94%] flex flex-col gap-1 p-[5px]'>
                                                    {hasWeekOff.WedWeekOff === true && (
                                                        <div className="w-full rounded-md p-[5px] mt-1 focus:outline-none text-[#000] xl:text-[14px] text-[12px] mr-[0px] ml-[7px]"
                                                        >{getWeekOffSummaryForDay("Wed")}</div>

                                                    )}
                                                    <Select
                                                        options={options}
                                                        isMulti
                                                        placeholder="Select Shift"
                                                        value={selectWedShift}
                                                        onChange={(selected) => setSelectWedShift(selected)}
                                                        onMenuOpen={() => selectedShift.length === 0 && openModal1()}
                                                        className="w-full  rounded-md p-[5px] mt-1 focus:outline-none text-[#000] xl:text-[14px] text-[12px] mr-[0px] ml-[7px]"
                                                        styles={{
                                                            control: (base) => ({
                                                                ...base,
                                                                minHeight: '40px',
                                                            }),
                                                            multiValue: (base) => ({
                                                                ...base,
                                                                backgroundColor: '#e5e7eb',
                                                            }),
                                                            multiValueLabel: (base) => ({
                                                                ...base,
                                                                color: '#000',
                                                            }),
                                                            multiValueRemove: (base) => ({
                                                                ...base,
                                                                color: '#ff0000',
                                                                cursor: 'pointer',
                                                            }),
                                                        }}
                                                    />
                                                </div>
                                                <button className='bg-[#27004a] rounded-full ml-4'>
                                                    <AddIcon className="text-white" onClick={openModal1} />
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className=''>
                                            <td className='text-center text-[12px] font-normal'>Thu</td>
                                            <td className='p-3 text-center'>
                                                <input type="checkbox" value={hasWeekOff.ThuWeekOff} onChange={() => {
                                                    if (hasWeekOff.WedWeekOff === false) {
                                                        setDefaultWeekOffForDay("Thu");
                                                    }
                                                    setOpenWeekDay("Thursday");
                                                    setHasWeekOff({ ...hasWeekOff, "ThuWeekOff": !hasWeekOff.ThuWeekOff });
                                                    setOpenWeekOff(!openWeekOff);
                                                }} />
                                            </td>
                                            <td className='pr-5 flex items-center'>
                                                <div className='w-[94%] flex flex-col gap-1 p-[5px]'>
                                                    {hasWeekOff.ThuWeekOff === true && (
                                                        <div className="w-full  rounded-md p-[5px] mt-1 focus:outline-none text-[#000] xl:text-[14px] text-[12px] mr-[0px] ml-[7px]"
                                                        >{getWeekOffSummaryForDay("Thu")}</div>

                                                    )}
                                                    <Select
                                                        options={options}
                                                        isMulti
                                                        placeholder="Select Shift"
                                                        value={selectThuShift}
                                                        onChange={(selected) => setSelectThuShift(selected)}
                                                        onMenuOpen={() => selectedShift.length === 0 && openModal1()}
                                                        className="w-full rounded-md p-[5px] mt-1 focus:outline-none text-[#000] xl:text-[14px] text-[12px] mr-[0px] ml-[7px]"
                                                        styles={{
                                                            control: (base) => ({
                                                                ...base,
                                                                minHeight: '40px',
                                                            }),
                                                            multiValue: (base) => ({
                                                                ...base,
                                                                backgroundColor: '#e5e7eb',
                                                            }),
                                                            multiValueLabel: (base) => ({
                                                                ...base,
                                                                color: '#000',
                                                            }),
                                                            multiValueRemove: (base) => ({
                                                                ...base,
                                                                color: '#ff0000',
                                                                cursor: 'pointer',
                                                            }),
                                                        }}
                                                    />
                                                </div>
                                                <button className='bg-[#27004a] rounded-full ml-4'>
                                                    <AddIcon className="text-white" onClick={openModal1} />
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className=''>
                                            <td className='text-center text-[12px] font-normal'>Fri</td>
                                            <td className='p-3 text-center'>
                                                <input type="checkbox" value={hasWeekOff.FriWeekOff} onChange={() => {
                                                    if (hasWeekOff.WedWeekOff === false) {
                                                        setDefaultWeekOffForDay("Fri");
                                                    }
                                                    setOpenWeekDay("Friday");
                                                    setHasWeekOff({ ...hasWeekOff, "FriWeekOff": !hasWeekOff.FriWeekOff });
                                                    setOpenWeekOff(!openWeekOff);
                                                }} />
                                            </td>
                                            <td className='pr-5 flex items-center'>
                                                <div className='w-[94%] flex flex-col gap-1 p-[5px]'>
                                                    {hasWeekOff.FriWeekOff === true && (
                                                        <div className="w-full  rounded-md p-[5px] mt-1 focus:outline-none text-[#000] xl:text-[14px] text-[12px] mr-[0px] ml-[7px]"
                                                        >{getWeekOffSummaryForDay("Fri")}</div>

                                                    )}
                                                    <Select
                                                        options={options}
                                                        isMulti
                                                        placeholder="Select Shift"
                                                        value={selectFriShift}
                                                        onChange={(selected) => setSelectFriShift(selected)}
                                                        onMenuOpen={() => selectedShift.length === 0 && openModal1()}
                                                        className="w-full  rounded-md p-[5px] mt-1 focus:outline-none text-[#000] xl:text-[14px] text-[12px] mr-[0px] ml-[7px]"
                                                        styles={{
                                                            control: (base) => ({
                                                                ...base,
                                                                minHeight: '40px',
                                                            }),
                                                            multiValue: (base) => ({
                                                                ...base,
                                                                backgroundColor: '#e5e7eb',
                                                            }),
                                                            multiValueLabel: (base) => ({
                                                                ...base,
                                                                color: '#000',
                                                            }),
                                                            multiValueRemove: (base) => ({
                                                                ...base,
                                                                color: '#ff0000',
                                                                cursor: 'pointer',
                                                            }),
                                                        }}
                                                    />
                                                </div>
                                                <button className='bg-[#27004a] rounded-full ml-4'>
                                                    <AddIcon className="text-white" onClick={openModal1} />
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className=''>
                                            <td className='text-center text-[12px] font-normal'>Sat</td>
                                            <td className='p-3 text-center'>
                                                <input type="checkbox" value={hasWeekOff.SatWeekOff} onChange={() => {
                                                    if (hasWeekOff.WedWeekOff === false) {
                                                        setDefaultWeekOffForDay("Sat");
                                                    }
                                                    setOpenWeekDay("Saturday");
                                                    setHasWeekOff({ ...hasWeekOff, "SatWeekOff": !hasWeekOff.SatWeekOff });
                                                    setOpenWeekOff(!openWeekOff);
                                                }} />
                                            </td>
                                            <td className='pr-5 flex items-center'>
                                                <div className='w-[94%] flex flex-col gap-1 p-[5px]'>
                                                    {hasWeekOff.SatWeekOff === true && (
                                                        <div className="w-full  rounded-md p-[5px] mt-1 focus:outline-none text-[#000] xl:text-[14px] text-[12px] mr-[0px] ml-[7px]"
                                                        >{getWeekOffSummaryForDay("Sat")}</div>
                                                    )}
                                                    <Select
                                                        options={options}
                                                        isMulti
                                                        placeholder="Select Shift"
                                                        value={selectSatShift}
                                                        onChange={(selected) => setSelectSatShift(selected)}
                                                        onMenuOpen={() => selectedShift.length === 0 && openModal1()}
                                                        className="w-full  rounded-md p-[5px] mt-1 focus:outline-none text-[#000] xl:text-[14px] text-[12px] mr-[0px] ml-[7px]"
                                                        styles={{
                                                            control: (base) => ({
                                                                ...base,
                                                                minHeight: '40px',
                                                            }),
                                                            multiValue: (base) => ({
                                                                ...base,
                                                                backgroundColor: '#e5e7eb',
                                                            }),
                                                            multiValueLabel: (base) => ({
                                                                ...base,
                                                                color: '#000',
                                                            }),
                                                            multiValueRemove: (base) => ({
                                                                ...base,
                                                                color: '#ff0000',
                                                                cursor: 'pointer',
                                                            }),
                                                        }}
                                                    />
                                                </div>
                                                <button className='bg-[#27004a] rounded-full ml-4'>
                                                    <AddIcon className="text-white" onClick={openModal1} />
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className=''>
                                            <td className='text-center text-[12px] font-normal'>Sun</td>
                                            <td className='p-3 text-center'>
                                                <input type="checkbox" value={hasWeekOff.SunWeekOff} onChange={() => {
                                                    if (hasWeekOff.WedWeekOff === false) {
                                                        setDefaultWeekOffForDay("Sun");
                                                    }
                                                    setOpenWeekDay("Sunday"); setHasWeekOff({ ...hasWeekOff, "SunWeekOff": !hasWeekOff.SunWeekOff });
                                                    setOpenWeekOff(!openWeekOff);
                                                }} />
                                            </td>
                                            <td className='pr-5 flex items-center'>
                                                <div className='w-[94%] flex flex-col gap-1 p-[5px]'>
                                                    {hasWeekOff.SunWeekOff === true && (
                                                        <div className="w-full  rounded-md p-[5px] mt-1 focus:outline-none text-[#000] xl:text-[14px] text-[12px] mr-[0px] ml-[7px]"
                                                        >{getWeekOffSummaryForDay("Sun")}</div>
                                                    )}
                                                    <Select
                                                        options={options}
                                                        isMulti
                                                        placeholder="Select Shift"
                                                        value={selectSunShift}
                                                        onChange={(selected) => setSelectSunShift(selected)}
                                                        onMenuOpen={() => selectedShift.length === 0 && openModal1()}
                                                        className="w-full  rounded-md p-[5px] mt-1 focus:outline-none text-[#000] xl:text-[14px] text-[12px] mr-[0px] ml-[7px]"
                                                        styles={{
                                                            control: (base) => ({
                                                                ...base,
                                                                minHeight: '40px',
                                                            }),
                                                            multiValue: (base) => ({
                                                                ...base,
                                                                backgroundColor: '#e5e7eb',
                                                            }),
                                                            multiValueLabel: (base) => ({
                                                                ...base,
                                                                color: '#000',
                                                            }),
                                                            multiValueRemove: (base) => ({
                                                                ...base,
                                                                color: '#ff0000',
                                                                cursor: 'pointer',
                                                            }),
                                                        }}
                                                    />
                                                </div>
                                                <button className='bg-[#27004a] rounded-full ml-4'>
                                                    <AddIcon className="text-white" onClick={openModal1} />
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="pr-[10px] pb-3 flex gap-[10px] justify-end border-t pt-3">
                                <button className="first-btn" onClick={closeModal}>Cancel</button>
                                <button disabled={isLoading} className={"second-btn " + (isLoading && "opacity-50 animate-pulse cursor-not-allowed")} onClick={(e) => createFixedShift(e)}>Confirm</button>
                            </div>
                        </div>
                    </TabPanel>


                    <TabPanel>
                        <div className='first-panel'>

                            <div className="overflow-y-scroll h-[50vh]">
                                <div className="relative w-full h-fit flex justify-center items-center gap-2">
                                    <p>Select Month</p>
                                    <button
                                        onClick={() => setOpenCalendar(!openCalendar)}
                                        className="w-[300px] px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none"
                                    >
                                        {formatDate(selectedMonth)}
                                    </button>
                                    {openCalendar && (
                                        <div className="absolute top-10 z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                                            <div className="p-3">
                                                <div className="flex items-center justify-between mb-4">
                                                    <button
                                                        onClick={() => handleYearChange(-1)}
                                                        className="p-1 text-gray-600 hover:text-gray-900 focus:outline-none"
                                                    >
                                                        &lt;
                                                    </button>
                                                    <div className="font-semibold">{year}</div>
                                                    <button
                                                        onClick={() => handleYearChange(1)}
                                                        className="p-1 text-gray-600 hover:text-gray-900 focus:outline-none"
                                                    >
                                                        &gt;
                                                    </button>
                                                </div>
                                                <div className="grid grid-cols-3 gap-2">
                                                    {months.map((row, rowIndex) =>
                                                        row.map((month, colIndex) => {
                                                            const monthIdx = rowIndex * 3 + colIndex
                                                            const isSelected =
                                                                selectedMonth.getMonth() === monthIdx &&
                                                                selectedMonth.getFullYear() === year

                                                            return (
                                                                <button
                                                                    key={month}
                                                                    onClick={() => handleMonthSelect(monthIdx)}
                                                                    className={`py-2 text-sm font-medium rounded-md focus:outline-none ${isSelected
                                                                        ? 'bg-[#27004a] text-white'
                                                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                                                        }`}
                                                                >
                                                                    {month}
                                                                </button>
                                                            )
                                                        })
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <table className="w-full">
                                    <thead className="border-b border-[#000]">
                                        <tr>
                                            <th className="p-3 text-[13px] font-medium">Day</th>
                                            <th className="p-3 text-[13px] font-medium w-[45px]">Weekoff</th>
                                            <th className="p-3 text-[13px] font-medium text-left pl-[8px]">Shifts</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {daysInMonth?.map((day) => {
                                            const date = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), day + 1);
                                            const updateWeekOff = flexibleDays.filter((item) => item.day === date.toISOString());
                                            return (
                                                <tr key={date}>
                                                    <td className="text-center text-[12px] font-normal">
                                                        {`${date.toLocaleDateString('en-US', { month: 'short' })} ${String(day).padStart(1, '0')} | ${getDayName(date)}`}
                                                    </td>
                                                    <td className="p-3 text-center">
                                                        <input onChange={(e) => {
                                                            // console.log(updateWeekOff);
                                                            if (updateWeekOff.length > 0) {
                                                                setFlexibleDays([...flexibleDays.filter((item) => item.day !== date.toISOString()), { day: date.toISOString(), weekOff: !updateWeekOff[0].weekOff, shifts: [] }]);
                                                            }
                                                            else {
                                                                setFlexibleDays([...flexibleDays, { day: date.toISOString(), weekOff: true, shifts: [] }])
                                                            }
                                                        }} type="checkbox" />
                                                    </td>
                                                    <td className="pr-5">
                                                        {updateWeekOff.length > 0 && updateWeekOff[0].weekOff ? <div className="w-full  rounded-md p-[5px] mt-1 focus:outline-none text-[#000] xl:text-[14px] text-[12px] mr-[0px] ml-[7px]"
                                                        >Week Off</div> : <Select
                                                            isDisabled={updateWeekOff.weekOff}
                                                            options={options}
                                                            isMulti
                                                            placeholder="Select Shift"
                                                            value={updateWeekOff.length > 0 ? updateWeekOff[0].shifts : []}
                                                            onChange={(selected) => {
                                                                if (updateWeekOff.length > 0) {
                                                                    setFlexibleDays([...flexibleDays.filter((item) => item.day !== date.toISOString()), { day: date.toISOString(), weekOff: false, shifts: selected }]);
                                                                }
                                                                else {
                                                                    setFlexibleDays([...flexibleDays, { day: date.toISOString(), weekOff: false, shifts: selected }])
                                                                }
                                                            }}
                                                            onMenuOpen={() => selectedShift.length === 0 && openModal1()}
                                                            className="w-full  rounded-md p-[5px] mt-1 focus:outline-none text-[#000] xl:text-[14px] text-[12px] mr-[0px] ml-[7px]"
                                                            styles={{
                                                                control: (base) => ({
                                                                    ...base,
                                                                    minHeight: '40px',
                                                                    // maxHeight: '30px',
                                                                    // overflow: "scroll",
                                                                    // scrollBehavior: "smooth",
                                                                    // scrollbarWidth: "none",
                                                                    // overflowX: "hidden",
                                                                }),
                                                                multiValue: (base) => ({
                                                                    ...base,
                                                                    backgroundColor: '#e5e7eb',
                                                                }),
                                                                multiValueLabel: (base) => ({
                                                                    ...base,
                                                                    color: '#000',
                                                                    // height: '30px',
                                                                    // display:"flex",
                                                                    // flexDirection:"column",
                                                                    // justifyContent:"center",
                                                                    // alignItems: 'center',
                                                                }),
                                                                multiValueRemove: (base) => ({
                                                                    ...base,
                                                                    color: '#ff0000',
                                                                    cursor: 'pointer',
                                                                }),
                                                            }}
                                                        />}

                                                        {/* <select className="border rounded-md p-[5px] mt-1 w-[94%] bg-[#F4F5F9] focus:outline-none text-[#000] xl:text-[14px] text-[12px] ml-[7px] hover:bg-[#fff]">
                                                            <option>Select Shift</option>
                                                        </select> */}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div class="pr-[10px] pb-3 flex gap-[10px] justify-end border-t pt-3">
                                <button class="first-btn" onClick={closeModal}>Cancel</button>
                                <button disabled={isLoading} className={"second-btn " + (isLoading && "opacity-50 animate-pulse cursor-not-allowed")} onClick={() => createFlexibleShift()}>Update Flexible Shift Work Timings </button></div>
                        </div>
                    </TabPanel>

                </Tabs>
            </Modal>
            {/* Week Off Modal */}
            <Modal
                isOpen={openWeekOff}
                onAfterOpen={() => {
                    subtitle.style.color = '#000';
                }}
                onRequestClose={() => { setOpenWeekOff(false) }}
                // style={customStyles}
                contentLabel="Example Modal"
                className="w-[96%] xl:w-[40%] absolute top-[50%] left-[50%] bottom-auto p-0 bg-[#fff] shadow shadow-md rounded-[10px] translate-x-[-50%] translate-y-[-50%]"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} className='border-b p-3   border-[#000] text-[14px]'>{openWeekDay} - Week Offs</h2>
                <button onClick={() => setOpenWeekOff(false)} className='absolute right-[5px] top-[3px] font-semibold	  bg-[#27004a] rounded-full'><CloseIcon className='text-white' /></button>
                <div class="space-y-4 my-3 px-3">
                    {
                        [
                            { key: 'allweek', label: 'All Week' },
                            { key: 'firstWeek', label: '1st Week' },
                            { key: 'secondWeek', label: '2nd Week' },
                            { key: 'thirdWeek', label: '3rd Week' },
                            { key: 'fourthWeek', label: '4th Week' },
                            { key: 'fifthWeek', label: '5th Week' },
                        ].map((week) => {
                            const currentDay = dayWiseWeekOff.find(item => item.day === openWeekDay.slice(0, 3));  // Find the current day's weekOff data
                            console.log(currentDay);
                            return (
                                <div className="flex items-center justify-between space-x-2" key={week.key}>
                                    <label htmlFor={week.key} className="text-sm font-medium text-black">
                                        {week?.label}
                                    </label>
                                    <input
                                        type="checkbox"
                                        id={week.key}
                                        checked={currentDay ? currentDay.weekOff[week.key] : false} // Ensure we check for `currentDay`
                                        onChange={(e) => handleDayWeekOffChange(
                                            openWeekDay.slice(0, 3),
                                            week?.key,
                                            !currentDay?.weekOff[week.key]
                                        )}
                                        className="w-4 h-4"
                                    />
                                </div>
                            );
                        })
                    }
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-lg">
                    <button onClick={() => { setOpenWeekOff(false) }} id="confirmBtn" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#27004a] text-base font-medium text-white focus:outline-none  sm:ml-3 sm:w-auto sm:text-sm">
                        Confirm
                    </button>
                    <button onClick={() => {
                        console.log(dayWiseWeekOff);
                        setOpenWeekOff(false)
                    }} id="cancelBtn" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                        Cancel
                    </button>
                </div>
            </Modal>
            {/* update work timing */}



            <Modal
                isOpen={modalIsOpen1}
                onAfterOpen={afterOpenModal1}
                onRequestClose={closeModal1}
                // style={customStyles}
                contentLabel="Example Modal"
                className="w-[96%] xl:w-[40%] absolute top-[50%] left-[50%] bottom-auto p-0 bg-[#fff] shadow rounded-[10px] translate-x-[-50%] translate-y-[-50%]"

            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} className='border-b-1 p-3 text-[13px] xl:text-[15px] '>{openWeekDay} - Shifts</h2>
                <button onClick={closeModal1} className='absolute right-[5px] top-[3px] font-semibold	  bg-[#27004a] rounded-full'><CloseIcon className='text-white' /></button>
                <div className=''>

                    {/* {
                        shiftDetails?.map((op,index)=>{
                            return  <div className='flex justify-between items-center border-b py-3 px-3'>
                            <h3 className='text-[13px]'>{op.shiftName} | {op.shiftStartTime} - {op.shiftEndTime} </h3>
                            <input type="checkbox" value={selectedShift.filter(s=>s.id == op.id)[0]??false} onChange={(e)=>setSelectedShift((prev)=>{
                                return [...prev , ...shiftDetails?.filter((opt)=>opt.id===op.id)]
                            })}/>
                        </div>
                        })
                    } */}

                    <div className="h-[100px] overflow-y-scroll">
                        {shiftDetails?.map((op) => (
                            <div key={op.id} className="flex justify-between items-center border-b py-3 px-3">
                                <h3 className="text-[13px]">
                                    {op.shiftName} | {op.shiftStartTime} - {op.shiftEndTime}
                                </h3>
                                <input
                                    type="checkbox"
                                    checked={isSelected(op.id)}
                                    onChange={() => handleCheckboxChange(op)}
                                />
                            </div>
                        ))}
                    </div>
                    <Link to="" className='text-[#27004a] p-4 font-medium mt-3 w-full flex items-center text-[16px] xl:text-[15px]' onClick={openModal2} ><AddIcon /> Add Shift</Link><br />
                    <div className='text-end  flex pr-4 pb-3 gap-[10px] justify-end items-center' >
                        <button className='first-btn' onClick={closeModal1}>Cancel</button>
                        <button className='second-btn' onClick={closeModal1}>Confirm</button>
                    </div>
                </div>
            </Modal>


            <Modal
                isOpen={modalIsOpen2}
                onAfterOpen={afterOpenModal2}
                onRequestClose={closeModal2}
                // style={customStyles}
                contentLabel="Example Modal"
                className="w-[96%] xl:w-[40%] absolute top-[50%] left-[50%] bottom-auto p-0 bg-[#fff] shadow shadow-md rounded-[10px] translate-x-[-50%] translate-y-[-50%]"

            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} className='border-b-1 p-3 text-[13px] xl:text-[15px] '>Add New Shifts</h2>
                <button onClick={closeModal2} className='absolute right-[5px] top-[3px] font-semibold	  bg-[#27004a] rounded-full'><CloseIcon className='text-white' /></button>
                <div className=''>
                    <div className='modal-field p-[10px] border border-t'>
                        <label className='text-[13px] xl:text-[14px] font-medium'>Shift Name</label><br />
                        <input value={newShift?.shiftName} onChange={(e) => setNewShift({ ...newShift, shiftName: e.target.value })} type='text' className='border border-1 rounded-md p-[5px] mt-1 w-[100%] mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' /><br />
                        <label className='text-[13px] xl:text-[14px] font-medium'>Shift Start Time</label><br />
                        <input onChange={(e) => {
                            const selectedTime = handleTimeChange(e.target.value);
                            setNewShift({ ...newShift, shiftStartTime: selectedTime });
                        }} type="time" className='border border-1 rounded-md p-[5px] mt-1 w-[100%] mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' />
                        <br />
                        <label className='text-[13px] xl:text-[14px] font-medium'>Can Punch In</label><br />
                        <div className='flex  justify-between'>
                            <Tabs className="w-full">
                                <TabList className="w-full flex justify-between w-full gap-[20px]">
                                    <Tab className="w-[48%]">
                                        <div className='border border-1 cursor-pointer rounded-md w-full flex items-center gap-[10px] p-[8px] pl-[15px] mt-1 mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'>
                                            <input value="ANYTIME" onChange={(e) => setNewShift({ ...newShift, punchInType: e.target.value })} type="radio" id="anytime" name="select-timing" />
                                            <label for="anytime" className='text-[13px] xl:text-[14px] font-medium  cursor-pointer'>Anytime</label><br />
                                        </div>

                                    </Tab>
                                    <Tab className="w-[48%]">
                                        <div className='border border-1 cursor-pointer rounded-md w-full flex items-center gap-[10px] p-[8px] pl-[15px] mt-1 mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'>
                                            <input type="radio" value="ADDLIMIT" onChange={(e) => setNewShift({ ...newShift, punchInType: e.target.value })} id="limit" name="select-timing" />
                                            <label for="limit" className='text-[13px] xl:text-[14px] font-medium  cursor-pointer'>Add Limit</label><br />
                                        </div>
                                    </Tab>
                                </TabList>

                                <TabPanel></TabPanel>

                                <TabPanel>
                                    <label className='text-[13px] xl:text-[14px] font-medium'>Allow Punch In</label><br />
                                    <div className='flex gap-[3px] xl:gap-[30px] flex-col xl:flex-row lg:flex-row'>
                                        <div className='flex items-center gap-2'>
                                            <input value={newShift?.allowPunchInHours} type='number' onChange={(e) => setNewShift({ ...newShift, allowPunchInHours: Number(e.target.value) })} className='border border-1 rounded-md p-[5px] mt-1 w-[40px] mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' />
                                            <label for="limit" className='text-[13px] xl:text-[14px] font-medium  cursor-pointer'>Hours</label><br />

                                        </div>


                                        <div className='flex items-center gap-2'>
                                            <input value={newShift?.allowPunchInMinutes} type='number' onChange={(e) => setNewShift({ ...newShift, allowPunchInMinutes: Number(e.target.value) })} className='border border-1 rounded-md p-[5px] mt-1 w-[100px] mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' />
                                            <label for="limit" className='text-[13px] flex whitespace-nowrap xl:text-[14px] font-medium  cursor-pointer'>Minutes <span className='pl-[10px] xl:pl-[15px]'>Before Shift Start Time</span></label><br />

                                        </div>
                                    </div>

                                </TabPanel>

                            </Tabs>

                        </div>


                        <label className='text-[13px] xl:text-[14px] font-medium'>Shift End Time</label><br />

                        <input type="time" onChange={(e) => setNewShift({ ...newShift, shiftEndTime: e.target.value })} className='border border-1 rounded-md p-[5px] mt-1 w-[100%] mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' />
                        <label className='text-[13px] xl:text-[14px] font-medium'>Can Punch Out</label><br />
                        <div className=''>


                            <Tabs className="w-full">
                                <TabList className="w-full flex justify-between w-full gap-[20px]">
                                    <Tab className="w-[48%]">
                                        <div className='border border-1 cursor-pointer rounded-md w-[100%] flex items-center gap-[10px] p-[8px] pl-[15px] mt-1 mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'>
                                            <input type="radio" value="ANYTIME" onChange={(e) => setNewShift({ ...newShift, punchOutType: e.target.value })} id="anytime1" name="punching-timing" />
                                            <label className='text-[13px] xl:text-[14px] cursor-pointer font-medium' for="anytime1">Anytime</label><br />
                                        </div>


                                    </Tab>
                                    <Tab className="w-[48%]">
                                        <div className='border border-1 cursor-pointer rounded-md w-[100%] flex items-center gap-[10px] p-[8px] pl-[15px] mt-1 mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'>
                                            <input value="ADDLIMIT" onChange={(e) => setNewShift({ ...newShift, punchOutType: e.target.value })} type="radio" id="limit1" name="punching-timing" />
                                            <label className='text-[13px] xl:text-[14px]  cursor-pointer font-medium' for="limit1">Add Limit</label><br />
                                        </div>
                                    </Tab>
                                </TabList>

                                <TabPanel>

                                </TabPanel>
                                <TabPanel>
                                    <label className='text-[14px] font-medium'>Allow Punch Out</label><br />
                                    <div className='flex gap-[3px] xl:gap-[30px] flex-col xl:flex-row lg:flex-row'>
                                        <div className='flex items-center gap-2'>
                                            <input value={newShift?.allowPunchOutHours} type='number' onChange={(e) => setNewShift({ ...newShift, allowPunchOutHours: Number(e.target.value) })} className='border border-1 rounded-md p-[5px] mt-1 w-[40px] mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' />
                                            <label for="limit" className='text-[13px] xl:text-[14px] font-medium  cursor-pointer'>Hours</label><br />

                                        </div>


                                        <div className='flex items-center gap-2'>
                                            <input value={newShift?.allowPunchOutMinutes} type='number' onChange={(e) => setNewShift({ ...newShift, allowPunchOutMinutes: Number(e.target.value) })} className='border border-1 rounded-md p-[5px] mt-1 w-[100px] mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' />
                                            <label for="limit" className='text-[13px] flex whitespace-nowrap xl:text-[14px] font-medium  cursor-pointer'>Minutes <span className='pl-[10px] xl:pl-[15px]'>Before Shift Start Time</span></label><br />

                                        </div>
                                    </div>

                                </TabPanel>
                            </Tabs>


                        </div>
                    </div>

                    <div className='pr-[10px] pb-3 flex gap-[10px] justify-end border-t pt-3'>
                        <button className='first-btn' onClick={closeModal2}>Cancel</button>
                        <button disabled={isLoading} className={'second-btn ' + (isLoading && 'opacity-50 cursor-not-allowed')} onClick={submitShift}>Confirm</button>
                    </div>
                </div>
            </Modal>


            {/* onclick star timing ---- time modal */}
            <Modal
                isOpen={modalIsOpen3}
                onAfterOpen={afterOpenModal3}
                onRequestClose={closeModal3}
                // style={customStyles}
                contentLabel="Example Modal"
                className="w-[96%] xl:w-[40%] absolute top-[50%] left-[50%] bottom-auto p-0 bg-[#fff] shadow shadow-md rounded-[10px] translate-x-[-50%] translate-y-[-50%]"

            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} className='border border-b border-t-0 border-r-0 border-l-0 mb-4  p-3 text-[13px] xl:text-[14px] '>Select Time</h2>
                <button onClick={closeModal3} className='absolute right-[5px] top-[3px] font-semibold	  bg-[#27004a] rounded-full'><CloseIcon className='text-white' /></button>
                <div className=''>

                    <table className='p-[10px] table-timing w-full' >
                        <tbody className='flex justify-center w-full gap-[12px]'>
                            <tr className='flex flex-col w-[100px] h-[205px]  overflow-scroll overflow-x-hidden '>
                                <td className=''>00</td>
                                <td>01</td>
                                <td>02</td>
                                <td>03</td>
                                <td>04</td>
                                <td>05</td>
                                <td>06</td>
                                <td>07</td>
                            </tr>
                            <tr className='flex flex-col w-[100px] h-[205px] overflow-scroll overflow-x-hidden	'>
                                <td>00</td>
                                <td>01</td>
                                <td>02</td>
                                <td>03</td>
                                <td>04</td>
                                <td>05</td>
                                <td>06</td>
                                <td>07</td>
                            </tr>
                            <tr className='flex flex-col w-[100px]'>
                                <td>AM</td>
                                <td>PM</td>
                            </tr>
                        </tbody>
                        <h3 className='text-center pt-[25px] pb-[25px] text-[13px] xl:text-[14px]'>Selected Time: 12:00 PM</h3>
                    </table>

                    <div className='pr-[10px] pb-3 flex gap-[10px] justify-end border-t pt-3'>
                        <button className='first-btn' onClick={() => {
                            closeModal3();
                        }}>Cancel</button>
                        <button className='second-btn' >Okay</button>
                    </div>
                </div>
            </Modal>
            {/* onclick star timing ---- time modal */}


            {/* onclick update attendance modal */}
            <Modal
                isOpen={modalIsOpen5}
                onAfterOpen={afterOpenModal5}
                onRequestClose={closeModal5}
                // style={customStyles}
                contentLabel="Example Modal"
                className="w-[96%] xl:w-[40%] absolute top-[50%] left-[50%] bottom-auto p-0 bg-[#fff] shadow-cs rounded-[10px] translate-x-[-50%] translate-y-[-50%]"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} className='border-b p-3   border-[#000] text-[14px]'>Bulk Update Work Timings for All Staff</h2>
                <button onClick={closeModal5} className='absolute right-[5px] top-[3px] font-semibold	  bg-[#27004a] rounded-full'><CloseIcon className='text-white' /></button>
                <div className='pb-2'>
                    <div className='flex justify-between items-center p-[10px] pl-[20px] text-[13px] xl:text-[14px] bg-[#F0F6FE]'>
                        <h4 className='m-0'>Allow punch in from Staff App</h4>
                        <div className="flex items-center  ">
                            <div
                                onClick={() => setToggleAllowPunchInMobile(!toggleAllowPunchInMobile)}
                                className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors ${toggleAllowPunchInMobile ? 'bg-[#27004a]' : 'bg-gray-300'
                                    }`}
                            >
                                <div
                                    className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${toggleAllowPunchInMobile ? 'translate-x-6' : 'translate-x-0'
                                        }`}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-between items-center p-[10px] border border-b border-l-0 border-r-0 pl-[20px] text-[13px] xl:text-[14px] '>
                        <div className='flex gap-[12px] items-center '>
                            <img src={selfie} className='h-[25px] w-[25px]' />
                            <h4 className='m-0'>Selfie Attendance</h4>
                        </div>
                        <div className="flex items-center  ">
                            <div
                                onClick={() => setToggleSelfieAttendance(!toggleSelfieAttendance)}
                                className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors ${toggleSelfieAttendance ? 'bg-[#27004a]' : 'bg-gray-300'
                                    }`}
                            >
                                <div
                                    className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${toggleSelfieAttendance ? 'translate-x-6' : 'translate-x-0'
                                        }`}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-between items-center p-[10px] border border-t-0 border-b border-l-0 border-r-0 pl-[20px] text-[13px] xl:text-[14px] '>
                        <div className='flex gap-[12px] items-center '>
                            <img src={qr} className='h-[25px] w-[25px]' />
                            <h4 className='m-0'>QR Attendance</h4>
                        </div>
                        <div className="flex items-center  ">
                            <div
                                onClick={() => setToggleQRAttendance(!toggleQRAttendance)}
                                className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors ${toggleQRAttendance ? 'bg-[#27004a]' : 'bg-gray-300'
                                    }`}
                            >
                                <div
                                    className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${toggleQRAttendance ? 'translate-x-6' : 'translate-x-0'
                                        }`}
                                ></div>
                            </div>
                        </div>
                    </div>


                    <div className='flex justify-between items-center border-t-0 p-[10px] border border-b border-l-0 border-r-0 pl-[20px] text-[13px] xl:text-[14px] '>
                        <div className='flex gap-[12px] items-center '>
                            <img src={gps} className='h-[25px] w-[25px]' />
                            <h4 className='m-0'>GPS Attendance</h4>
                        </div>
                        <div className="flex items-center  ">
                            <div
                                onClick={() => setToggleGPSAttendance(!toggleGPSAttendance)}
                                className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors ${toggleGPSAttendance ? 'bg-[#27004a]' : 'bg-gray-300'
                                    }`}
                            >
                                <div
                                    className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${toggleGPSAttendance ? 'translate-x-6' : 'translate-x-0'
                                        }`}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <div className='p-4 pl-5 border border-b border-l-0 border-r-0 border-t-0'>
                        <label className='text-[13px] xl:text-[14px] font-medium'>Mark Attendance From</label>

                        <div className='flex gap-[12px] pt-3'>
                            <div className='flex items-center gap-[10px] border pl-3 pt-2 pb-2 pr-3 rounded-md'>
                                <input onClick={(e) => setMarkLocation(e.target.value)}
                                    type="radio" id="foroffice" name="office" value="Office" />
                                <label for="foroffice" className='text-[13px] xl:text-[14px]'>Office</label><br />
                            </div>
                            <div className='flex items-center gap-[10px] border pl-3 pt-2 pb-2 pr-3 rounded-md'>
                                <input onClick={(e) => setMarkLocation(e.target.value)}
                                    type="radio" id="anywhere" name="office" value="Anywhere" />
                                <label for="anywhere" className='text-[13px] xl:text-[14px]'>Anywhere</label><br />
                            </div>
                        </div>
                    </div>


                    <div className='p-4 pl-5 border border-b border-l-0 border-r-0 border-t-0 flex gap-[14px] items-center'>
                        <img src={biometric} />
                        <div>
                            <label className='text-[13px] xl:text-[14px] font-medium'>Biometric Devices</label><br />
                            <Link to="/biometric" className='text-[13px] xl:text-[14px] text-[#27004a] underline decoration-1'>Manage biometric devices</Link>
                        </div>

                    </div>

                    <div className="pr-[10px] pb-3 flex gap-[10px] justify-end border-t pt-3">
                        <button className="first-btn" onClick={(e) => {
                            closeModal5();
                        }}>Cancel</button>
                        <button className={"second-btn " + (isLoading && "opacity-50 cursor-not-allowed")} onClick={(e) => {
                            updateAttendanceMode(e);
                        }}>Update Attendance Modes for All Staff</button>
                    </div>

                </div>
            </Modal>

            {/* onclick update attendance modal */}

            {/* when onclick update attendance modes for all staff */}

            <Modal
                isOpen={modalIsOpen6}
                onAfterOpen={afterOpenModal6}
                onRequestClose={closeModal6}
                // style={customStyles}
                contentLabel="Example Modal"
                className="w-[96%] xl:w-[40%] absolute top-[50%] left-[50%] bottom-auto p-0 bg-[#fff] shadow shadow-md rounded-[10px] translate-x-[-50%] translate-y-[-50%]"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} className='border-b p-3   border-[#000] text-[14px]'>Bulk Update Work Timings for All Staff</h2>
                <button onClick={closeModal6} className='absolute right-[5px] top-[3px] font-semibold	  bg-[#27004a] rounded-full'><CloseIcon className='text-white' /></button>
                <div className='flex items-center justify-center flex-col gap-[10px] pt-[20px] pb-[20px]'>
                    <img src={rightimg} className='w-[65px]' />
                    <h3 className='text-center'>You have Successfully updated attendance modes</h3>
                    <button className='second-btn ' onClick={() => {
                        closeModal6();
                        closeModal5();
                    }}>Okay</button>
                </div>
            </Modal>

            {/* when onclick update attendance modes for all staff */}
            {/* onclick update automation rules */}
            <Modal
                isOpen={modalIsOpen7}
                onAfterOpen={afterOpenModal7}
                onRequestClose={closeModal7}
                // style={customStyles}
                contentLabel="Example Modal"
                className="w-[96%] xl:w-[40%] absolute top-[50%] left-[50%] bottom-auto p-0 bg-[#fff] shadow shadow-md rounded-[10px] translate-x-[-50%] translate-y-[-50%]"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} className='border-b p-3   border-[#000] text-[14px]'>Bulk Update Automation Rules for All Staff</h2>
                <button onClick={closeModal7} className='absolute right-[5px] top-[3px] font-semibold	  bg-[#27004a] rounded-full'><CloseIcon className='text-white' /></button>
                <div className='pb-2'>

                    <div className='flex justify-between items-center p-[10px] border border-b border-l-0 border-r-0 pl-[20px] text-[13px] xl:text-[14px] '>
                        <div className='flex gap-[12px] items-center '>
                            <img src={selfie} className='h-[25px] w-[25px]' />
                            <h4 className='m-0'>Auto Present at day start</h4>
                        </div>
                        <div className="flex items-center  ">
                            <div
                                onClick={() => setToggleAutoPresent(!toggleAutoPresent)}
                                className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors ${toggleAutoPresent ? 'bg-[#27004a]' : 'bg-gray-300'
                                    }`}
                            >
                                <div
                                    className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${toggleAutoPresent ? 'translate-x-6' : 'translate-x-0'
                                        }`}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-between items-center p-[10px] border border-t-0 border-b border-l-0 border-r-0 pl-[20px] text-[13px] xl:text-[14px] '>
                        <div className='flex gap-[12px] items-center '>
                            <img src={qr} className='h-[25px] w-[25px]' />
                            <h4 className='m-0'>Present on Punch In</h4>
                        </div>
                        <div className="flex items-center  ">
                            <div
                                onClick={() => setTogglePresentOnPunch(!togglePresentOnPunch)}
                                className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors ${togglePresentOnPunch ? 'bg-[#27004a]' : 'bg-gray-300'
                                    }`}
                            >
                                <div
                                    className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${togglePresentOnPunch ? 'translate-x-6' : 'translate-x-0'
                                        }`}
                                ></div>
                            </div>
                        </div>
                    </div>


                    <div className='flex justify-between items-center border-t-0 p-[10px] border border-b border-l-0 border-r-0 pl-[20px] text-[13px] xl:text-[14px] '>
                        <div className='flex gap-[12px] items-center '>
                            <img src={gps} className='h-[25px] w-[25px]' />
                            <h4 className='m-0'>Auto half day if late by</h4>
                        </div>
                        <div className="flex items-center  ">
                            <button className='first-btn' onClick={openModal16}>{(autoHalfDay.hr === "" && autoHalfDay.min === "") ? "Not Set" : autoHalfDay.hr + ":" + autoHalfDay.min}</button>
                        </div>
                    </div>

                    <div className='flex justify-between items-center border-t-0 p-[10px] border border-b border-l-0 border-r-0 pl-[20px] text-[13px] xl:text-[14px] '>
                        <div className='flex gap-[12px] items-center '>
                            <img src={gps} className='h-[25px] w-[25px]' />
                            <h4 className='m-0'>Mandatory half day hours</h4>
                        </div>
                        <div className="flex items-center  ">
                            <button className='first-btn' onClick={openModal17}>{(mandatoryHalfDayHour.hr === "" && mandatoryHalfDayHour.min === "") ? "Not Set" : mandatoryHalfDayHour.hr + ":" + mandatoryHalfDayHour.min}</button>
                        </div>
                    </div>

                    <div className='flex justify-between items-center border-t-0 p-[10px] border border-b border-l-0 border-r-0 pl-[20px] text-[13px] xl:text-[14px] '>
                        <div className='flex gap-[12px] items-center '>
                            <img src={gps} className='h-[25px] w-[25px]' />
                            <h4 className='m-0'>Mandatory full day hours</h4>
                        </div>
                        <div className="flex items-center  ">
                            <button className='first-btn' onClick={openModal18}>{(mandatoryFullDayHour.hr === "" && mandatoryFullDayHour.min === "") ? "Not Set" : mandatoryFullDayHour.hr + ":" + mandatoryFullDayHour.min}</button>

                        </div>
                    </div>



                    <div className="pr-[10px] pb-3 flex gap-[10px] justify-end  pt-3">
                        <button className="first-btn" onClick={closeModal7}>Cancel</button>
                        <button className={"second-btn " + (isLoading && "opacity-50 cursor-not-allowed")} onClick={(e) => {
                            updateAttendanceAutomationRules(e);
                        }} >Update Automation Rules for All Staff</button>
                    </div>

                </div>
            </Modal>

            {/* onclick update automation rules */}

            {/* when onclick update attendance mods for aall staff successfull msg */}
            <Modal
                isOpen={modalIsOpen8}
                onAfterOpen={afterOpenModal8}
                onRequestClose={closeModal8}
                // style={customStyles}
                contentLabel="Example Modal"
                className="w-[96%] xl:w-[40%] absolute top-[50%] left-[50%] bottom-auto p-0 bg-[#fff] shadow shadow-md rounded-[10px] translate-x-[-50%] translate-y-[-50%]"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} className='border-b p-3   border-[#000] text-[14px]'>Bulk Update Work Timings for All Staff</h2>
                <button onClick={closeModal8} className='absolute right-[5px] top-[3px] font-semibold	  bg-[#27004a] rounded-full'><CloseIcon className='text-white' /></button>
                <div className='flex items-center justify-center flex-col gap-[10px] pt-[20px] pb-[20px]'>
                    <img src={rightimg} className='w-[65px]' />
                    <h3 className='text-center'>You have Successfully updated attendance modes</h3>
                    <button className='second-btn' onClick={() => {
                        closeModal8();
                        closeModal7();
                    }}>Okay</button>
                </div>
            </Modal>


            {/* when onclick update attendance mods for aall staff successfull msg */}

            {/* onclick autohalf day minutes  button */}

            <Modal
                isOpen={modalIsOpen16}
                onAfterOpen={afterOpenModal16}
                onRequestClose={closeModal16}
                // style={customStyles}
                contentLabel="Example Modal"
                className="w-[96%] xl:w-[40%] absolute top-[50%] left-[50%] bottom-auto p-0 bg-[#fff] shadow shadow-md rounded-[10px] translate-x-[-50%] translate-y-[-50%]"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} className='border-b p-3   border-[#000] text-[14px]'>Auto half day if late by
                </h2>
                <button onClick={closeModal16} className='absolute right-[5px] top-[3px] font-semibold	  bg-[#27004a] rounded-full'><CloseIcon className='text-white' /></button>
                <div className='pb-2 p-[12px]'>

                    <label className="text-[13px] xl:text-[14px] font-medium">Select Duration</label>

                    <div className="flex gap-[3px] xl:gap-[30px] flex-col xl:flex-row lg:flex-row">
                        <div className="flex items-center gap-2">
                            <input value={autoHalfDay.hr} onChange={(e) => setAutoHalfDay((prev) => {
                                return {
                                    ...prev,
                                    hr: e.target.value
                                }
                            })} type="number" className="border border-1 rounded-md p-[5px] mt-1 w-[40px] mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]" />
                            <label for="limit" className="text-[13px] xl:text-[14px] font-medium  cursor-pointer">Hours</label><br />
                        </div>
                        <div className="flex items-center gap-2">
                            <input value={autoHalfDay.min} onChange={(e) => setAutoHalfDay((prev) => {
                                return {
                                    ...prev,
                                    min: e.target.value
                                }
                            })} type="number" className="border border-1 rounded-md p-[5px] mt-1 w-[100px] mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]" />
                            <label for="limit" className="text-[13px] flex whitespace-nowrap xl:text-[14px] font-medium  cursor-pointer">Minutes</label><br />
                        </div>
                    </div>



                    <div className="pr-[10px] pb-3 flex gap-[10px] justify-end  pt-3">
                        <button className="first-btn" onClick={closeModal16}>Turn Off</button>
                        <button className="second-btn" onClick={() => {
                            closeModal16();
                        }} >Confirm</button>
                    </div>

                </div>
            </Modal>


            {/* onclick autohalf day minutes  button */}


            {/* onclick mandatory half day minutes  button */}

            <Modal
                isOpen={modalIsOpen17}
                onAfterOpen={afterOpenModal17}
                onRequestClose={closeModal17}
                // style={customStyles}
                contentLabel="Example Modal"
                className="w-[96%] xl:w-[40%] absolute top-[50%] left-[50%] bottom-auto p-0 bg-[#fff] shadow shadow-md rounded-[10px] translate-x-[-50%] translate-y-[-50%]"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} className='border-b p-3   border-[#000] text-[14px]'>Mandatory half day hours

                </h2>
                <button onClick={closeModal17} className='absolute right-[5px] top-[3px] font-semibold	  bg-[#27004a] rounded-full'><CloseIcon className='text-white' /></button>
                <div className='pb-2 p-[12px]'>

                    <label className="text-[13px] xl:text-[14px] font-medium">Select Duration</label>

                    <div className="flex gap-[3px] xl:gap-[30px] flex-col xl:flex-row lg:flex-row">
                        <div className="flex items-center gap-2">
                            <input value={mandatoryHalfDayHour.hr} onChange={(e) => setMandatoryHalfDayHour((prev) => {
                                return {
                                    ...prev,
                                    hr: e.target.value
                                }
                            })} type="number" className="border border-1 rounded-md p-[5px] mt-1 w-[40px] mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]" />
                            <label for="limit" className="text-[13px] xl:text-[14px] font-medium  cursor-pointer">Hours</label><br />
                        </div>
                        <div className="flex items-center gap-2">
                            <input value={mandatoryHalfDayHour.min} onChange={(e) => setMandatoryHalfDayHour((prev) => {
                                return {
                                    ...prev,
                                    min: e.target.value
                                }
                            })} type="number" className="border border-1 rounded-md p-[5px] mt-1 w-[100px] mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]" />
                            <label for="limit" className="text-[13px] flex whitespace-nowrap xl:text-[14px] font-medium  cursor-pointer">Minutes</label><br />
                        </div>
                    </div>



                    <div className="pr-[10px] pb-3 flex gap-[10px] justify-end  pt-3">
                        <button className="first-btn" onClick={closeModal17}>Turn Off</button>
                        <button className="second-btn" onClick={closeModal17} >Confirm</button>
                    </div>

                </div>
            </Modal>


            {/* onclick mandatory half day minutes  button */}


            {/* onclick mandatory full day minutes  button */}

            <Modal
                isOpen={modalIsOpen18}
                onAfterOpen={afterOpenModal18}
                onRequestClose={closeModal18}
                // style={customStyles}
                contentLabel="Example Modal"
                className="w-[96%] xl:w-[40%] absolute top-[50%] left-[50%] bottom-auto p-0 bg-[#fff] shadow shadow-md rounded-[10px] translate-x-[-50%] translate-y-[-50%]"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} className='border-b p-3   border-[#000] text-[14px]'>Mandatory Full day hours

                </h2>
                <button onClick={closeModal18} className='absolute right-[5px] top-[3px] font-semibold	  bg-[#27004a] rounded-full'><CloseIcon className='text-white' /></button>
                <div className='pb-2 p-[12px]'>

                    <label className="text-[13px] xl:text-[14px] font-medium">Select Duration</label>

                    <div className="flex gap-[3px] xl:gap-[30px] flex-col xl:flex-row lg:flex-row">
                        <div className="flex items-center gap-2">
                            <input value={mandatoryFullDayHour.hr} onChange={(e) => setMandatoryFullDayHour((prev) => {
                                return {
                                    ...prev,
                                    hr: e.target.value
                                }
                            })} type="number" className="border border-1 rounded-md p-[5px] mt-1 w-[40px] mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]" />
                            <label for="limit" className="text-[13px] xl:text-[14px] font-medium  cursor-pointer">Hours</label><br />
                        </div>
                        <div className="flex items-center gap-2">
                            <input value={mandatoryFullDayHour.min} onChange={(e) => setMandatoryFullDayHour((prev) => {
                                return {
                                    ...prev,
                                    min: e.target.value
                                }
                            })} type="number" className="border border-1 rounded-md p-[5px] mt-1 w-[100px] mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]" />
                            <label for="limit" className="text-[13px] flex whitespace-nowrap xl:text-[14px] font-medium  cursor-pointer">Minutes</label><br />
                        </div>
                    </div>



                    <div className="pr-[10px] pb-3 flex gap-[10px] justify-end  pt-3">
                        <button className="first-btn" onClick={closeModal18}>Turn Off</button>
                        <button className="second-btn" onClick={closeModal18} >Confirm</button>
                    </div>

                </div>
            </Modal>


            {/* onclick mandatory full day minutes  button */}


            {/* </div> */}
        </>
    )
}

export default EditAttendanceDetail