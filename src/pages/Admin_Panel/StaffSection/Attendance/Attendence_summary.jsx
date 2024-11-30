import { a, div } from "framer-motion/client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WarningIcon from "@mui/icons-material/Warning";
import DownloadIcon from "@mui/icons-material/Download";
import SettingsIcon from "@mui/icons-material/Settings";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import CloseIcon from "@mui/icons-material/Close";
import { useGlobalContext } from "../../../../Context/GlobalContext";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import { set } from "react-hook-form";
import { IoChevronDownSharp } from "react-icons/io5";
import { Switch } from "@mui/material";


const Attendence_summary = () => {
    
  const { baseUrl, openToast, fetchStaff, staffDetail } = useGlobalContext();
  const [isOpen, setIsOpen] = useState(false);
  const [smsEnabled, setSmsEnabled] = useState(false)
//   const [isOpen6, setIsOpen6] = useState(false)

  const [lateEntryHours, setLateEntryHours] = useState();
  const [lateEntrySalaryTime, setLateEntrySalaryTime] = useState(0);
  const [lateEntryAmount, setLateEntryAmount] = useState(0);
  const [excessBreakHours, setExcessBreakHours] = useState();
  const [excessBreakTime, setExcessBreakTime] = useState(0);
  const [excessBreakAmount, setExcessBreakAmount] = useState(0);
  const [earlyOutHours, setEarlyOutHours] = useState();
  const [earlyOutTime, setEarlyOutTime] = useState(0);
  const [earlyOutAmount, setEarlyOutAmount] = useState(0);
  const [fineTotalAmount, setFineTotalAmount] = useState(0);
  const [sendStaffId, setSendStaffId] = useState("");
  const [sendOverTimeStaffId, setSendOverTimeStaffId] = useState("");
  const [selectedStaffSalary, setSelectedStaffSalary] = useState(0);
  const [time, setTime] = useState(null);
  const [overTotalAmount, setOverTotalAmount] = useState(0);
  const [staffName, setStaffName] = useState();

  const [overTimelateHour, setOverTimelateHour] = useState();
  const [overTimeSalaryTime, setOverTimeSalaryTime] = useState();
  const [overTimeLateOutAmount, setOverTimeLateOutAmount] = useState(0);

  const [overTimeEarlyHour, setOverTimeEarlyHour] = useState();
  const [overTimeEarlySalaryTime, setOverTimeEarlySalaryTime] = useState();
  const [overTimeEarlyOutAmount, setOverTimeEarlyAmount] = useState(0);
  const [applyPunchRecordId, setApplyPunchRecordId] = useState();
  const [applyOvertimePunchRecordId, setApplyOvertimePunchRecordId] =

    useState();
    

  function calculateTotalMinutes(timeString) {
    const [hours, minutes] = timeString?.split(":")?.map(Number);
    return hours * 60 + minutes;
  }

  function calculateFinePerMinute(
    monthlySalary,
    workingDays,
    workingHoursPerDay
  ) {
    const finePerMinute =
      monthlySalary / (workingDays * workingHoursPerDay * 60);
    return finePerMinute.toFixed(2);
  }

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

  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);

  const today = new Date();

  // Format for the input field's value (YYYY-MM-DD)
  const formattedForInput = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  // Format for display/state (DD/MM/YYYY)
  const formattedForDisplay = `${String(today.getDate()).padStart(
    2,
    "0"
  )}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;

  const [summaryDate, setSummaryDate] = useState(formattedForInput);

  const handleChange = (e) => {
    const newDate = e.target.value; // Format is YYYY-MM-DD
    const [year, month, day] = newDate.split("-");
    const formattedDisplay = `${day}/${month}/${year}`;
    console.log(`Selected date in DD/MM/YYYY: ${formattedDisplay}`);
    setSummaryDate(newDate);
  };

  const inputDate = summaryDate;

  const date = new Date(inputDate);

  const day = String(date.getDate()).padStart(2, "0"); // Ensure 2-digit day
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  console.log(formattedDate);

  async function fetchAttendanceDetail() {
    const inputDate = summaryDate;

    const date = new Date(inputDate);

    const day = String(date.getDate()).padStart(2, "0"); // Ensure 2-digit day
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    const result = await fetch(
      baseUrl + `attendance/summary?type=day&date=${formattedDate}`,
      { cache: "no-store" }
    );
    console.log(result);
    if (result.status == 200) {
      const res = await result.json();
      console.log("------", res);
      setAttendance(res.records);
    }
  }
  useEffect(() => {
    if (summaryDate) {
      fetchAttendanceDetail();
    }
  }, [summaryDate]);
  const [selectedStatus, setSelectedStatus] = useState("");
  async function confirmation(item) {
    setLoading(true);
    try {
      if (selectedStatus == "") {
        openToast("Please Select Status", "error");
        return;
      }

      const result = await fetch(
        baseUrl + `attendance/status/${item.punchRecord.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ status: selectedStatus }),
        }
      );
      if (result.status == 200) {
        openToast("Updated Status Successfully", "success");
        fetchAttendanceDetail();
      } else {
        openToast("Something went wrong", "error");
      }
    } catch (error) {
      openToast("Something went wrong", "error");
    } finally {
      setLoading(false);
      closeModal(); // Close the modal after completion
    }
  }
  const [departments, setDepartments] = useState([]);
  const fetchDepartments = async () => {
    try {
      const result = await fetch(baseUrl + "department");
      const res = await result.json();
      console.log(res);
      if (result.status === 200) {
        setDepartments(res.data);
      } else {
        console.log(res.message || "An unexpected error occured", "error");
      }
    } catch (error) {
      console.log("Fetch error:", error.message || error);
      console.log(error.message || "An unexpected error occurred.");
    } finally {
    }
  };

  console.log(departments);

  useEffect(() => {
    fetchDepartments();
    fetchStaff();
  }, []);

  console.log("staff", staffDetail);

  async function fineId(id) {
    const staffSalary = staffDetail?.filter(
      (item) => item.staffDetails.id === id
    )[0];
    openModal0();
    setSendStaffId(id);
    const staffname = staffDetail?.filter(
      (item) => item.staffDetails.id === id
    )[0]?.name;
    setStaffName(staffname);
    setSelectedStaffSalary(
      staffSalary?.staffDetails?.SalaryDetails[0]?.ctc_amount
    );
  }

  async function overTimeId(id) {
    const staffSalary = staffDetail?.filter(
      (item) => item.staffDetails.id === id
    )[0];
    // console.log(staffSalary?.staffDetails?.SalaryDetails[0]?.ctc_amount);
    openModal12();
    const staffname = staffDetail?.filter(
      (item) => item.staffDetails.id === id
    )[0]?.name;
    setStaffName(staffname);
    setSendOverTimeStaffId(id);
    setSelectedStaffSalary(
      staffSalary?.staffDetails?.SalaryDetails[0]?.ctc_amount
    );
  }
  function formatSummaryDate(summaryDate) {
    const [year, month, day] = summaryDate.split("-"); // Split the date into components
    return `${day}-${month}-${year}`; // Rearrange to dd-mm-yyyy
  }
  // calculating in minutes
  const handleChangeTime = (value, amount) => {
    const formattedTime = value?.format("HH:mm");
    const totalMinutes = calculateTotalMinutes(formattedTime);
    setLateEntryHours(value?.format("HH:mm"));
    setLateEntryAmount(amount * totalMinutes);
    console.log(totalMinutes); // Logs time in minutes
  };
  const handleChangeTimeExcessBreak = (value, amount) => {
    const formattedTime = value.format("HH:mm");
    const totalMinutes = calculateTotalMinutes(formattedTime);
    setExcessBreakHours(value?.format("HH:mm"));
    setExcessBreakAmount(amount * totalMinutes);
    console.log(totalMinutes); // Logs time in minutes
  };
  const handleChangeTimeEarlyOut = (value, amount) => {
    const formattedTime = value.format("HH:mm");
    const totalMinutes = calculateTotalMinutes(formattedTime);
    setEarlyOutHours(value?.format("HH:mm"));
    setEarlyOutAmount(amount * totalMinutes);
    console.log(totalMinutes); // Logs time in minutes
  };
  const handleChangeOverTime = (value, amount) => {
    const formattedTime = value?.format("HH:mm");
    const totalMinutes = calculateTotalMinutes(formattedTime);
    setOverTimelateHour(value?.format("HH:mm"));
    console.log(amount);
    setOverTimeLateOutAmount(amount * totalMinutes);
    console.log(totalMinutes); // Logs time in minutes
  };

  // calculating in minutes
  const [perMinSalary, setPerMinSalary] = useState(0);
  const [perMinSalaryExcessBreak, setPerMinSalaryExcessBreak] = useState(0);
  const [perMinSalaryEarlyOut, setPerMinSalaryEarlyOut] = useState(0);
  const [perMinSalaryOverTime, setPerMinSalaryOverTime] = useState(0);
  const [perMinSalaryEarlyOutOverTime, setPerMinSalaryEarlyOutOverTime] =
    useState(0);

  const calculateTotalFineHours = (records) => {
    let totalMinutes = 0;
    console.log(records);

    records.forEach(({ punchRecord }) => {
      const { fine } = punchRecord;

      if (fine) {
        const timeToMinutes = (time) => {
          if (!time) return 0; // Null or undefined time
          const [hours, minutes] = time.split(":").map(Number);
          return hours * 60 + minutes;
        };
        console.log(
          fine.lateEntryFineHoursTime,
          fine.earlyOutFineHoursTime,
          fine.excessBreakFineHoursTime
        );
        totalMinutes += timeToMinutes(fine.lateEntryFineHoursTime);
        totalMinutes += timeToMinutes(fine.earlyOutFineHoursTime);
        totalMinutes += timeToMinutes(fine.excessBreakFineHoursTime);
      }
    });

    // Convert total minutes back to HH:mm format
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const calculateTotalOvertimeHours = (records) => {
    let totalMinutes = 0;
    console.log(records, "Received Records");

    records.forEach((record) => {
      const punchRecord = record.punchRecord || {};
      const Overtime = punchRecord.Overtime || null;

      if (Overtime) {
        // Helper function to convert time to minutes
        const timeToMinutes = (time) => {
          if (!time || typeof time !== "string") {
            console.warn("Invalid or missing time:", time);
            return 0; // Handle null, undefined, or invalid time
          }
          if (time.includes(":")) {
            const [hours, minutes] = time.split(":").map(Number);
            return hours * 60 + minutes;
          }
          if (time.includes(".")) {
            const [hours, fractional] = time.split(".").map(Number);
            const minutes = Math.round((fractional / 10) * 60);
            return hours * 60 + minutes;
          }
          console.warn("Unexpected time format:", time);
          return 0;
        };

        // Safely convert overtime times to minutes
        const earlyTime = timeToMinutes(Overtime.earlyCommingEntryHoursTime);
        const lateTime = timeToMinutes(Overtime.lateOutOvertimeHoursTime);

        console.log("Converted Times:", { earlyTime, lateTime });

        totalMinutes += earlyTime + lateTime;
      }
    });

    // Convert total minutes back to HH:mm format
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const totalOvertime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    console.log(`Total Overtime: ${totalOvertime}`);
    return totalOvertime;
  };

  useEffect(() => {
    const totalSalary =
      Number(lateEntryAmount) +
        Number(excessBreakAmount) +
        Number(earlyOutAmount) || 0;
    setFineTotalAmount(totalSalary);
  }, [lateEntryAmount, excessBreakAmount, earlyOutAmount]);

  const handleChangeTimeEarlyIn = (value, amount) => {
    const formattedTime = value?.format("HH:mm");
    const totalMinutes = calculateTotalMinutes(formattedTime);
    setOverTimeEarlyHour(value?.format("HH:mm"));
    setOverTimeEarlyAmount(amount * totalMinutes);
    console.log(totalMinutes); // Logs time in minutes
  };

  useEffect(() => {
    setPerMinSalary(calculateFinePerMinute(selectedStaffSalary, 30, 8));
    setPerMinSalaryExcessBreak(
      calculateFinePerMinute(selectedStaffSalary, 30, 8)
    );
    setPerMinSalaryEarlyOut(calculateFinePerMinute(selectedStaffSalary, 30, 8));
    setPerMinSalaryOverTime(calculateFinePerMinute(selectedStaffSalary, 30, 8));
    setPerMinSalaryEarlyOutOverTime(
      calculateFinePerMinute(selectedStaffSalary, 30, 8)
    );
  }, [selectedStaffSalary]);

  async function applyFine() {
    console.log(applyPunchRecordId);
    const data = {
      lateEntryFineHoursTime: lateEntryHours,
      lateEntryFineAmount: Number(lateEntrySalaryTime),
      lateEntryAmount: lateEntryAmount,
      excessBreakFineHoursTime: excessBreakHours,
      excessBreakFineAmount: Number(excessBreakTime),
      excessBreakAmount: excessBreakAmount,
      earlyOutFineHoursTime: earlyOutHours,
      earlyOutFineAmount: Number(earlyOutTime),
      earlyOutAmount: earlyOutAmount,
      totalAmount: fineTotalAmount,
      staffId: sendStaffId,
      punchRecordId: applyPunchRecordId,
    };
    const result = await fetch(baseUrl + `fine/create`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (result.ok) {
      openToast("Fine Applied Successfully", "success");
      closeModal0();
    } else {
      openToast("Something went wrong", "error");
    }
  }

  async function applyOverTime() {
    const data = {
      earlyCommingEntryHoursTime: overTimeEarlyHour,
      lateOutOvertimeHoursTime: overTimelateHour,
      earlyCommingEntryAmount: Number(overTimeEarlyOutAmount),
      earlyEntryAmount: Number(overTimeEarlySalaryTime),
      lateOutOvertimeAmount: Number(overTimeLateOutAmount),
      lateOutAmount: Number(overTimeSalaryTime),
      totalAmount: Number(
        overTimeLateOutAmount * overTimeSalaryTime +
          overTimeEarlyOutAmount * overTimeEarlySalaryTime
      ),
      staffId: sendOverTimeStaffId,
      punchRecordId: applyOvertimePunchRecordId,
    };
    const result = await fetch(baseUrl + `overtime/create`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (result.ok) {
      openToast("OverTime Applied Successfully", "success");
      closeModal12();
    } else {
      openToast("Something went wrong", "error");
    }
  }

  const [fine, setFine] = useState();
  const [overtime, setOverTime] = useState();
  console.log(overtime);

  async function fetchFineDetails() {
    try {
      const result = await fetch(baseUrl + "fine/all");

      if (result.status == 200) {
        const res = await result.json();
        console.log("res", res);
        setFine(res);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchOverTimeDetails() {
    try {
      const result = await fetch(baseUrl + "overtime");
      if (result.status == 200) {
        const res = await result.json();
        console.log("res", res);
        setOverTime(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchFineDetails();
    fetchOverTimeDetails();
  }, []);

  const [others, setOthers] = useState([]);

  useEffect(() => {
    if (departments.length && attendance.length) {
      setOthers(
        attendance?.filter((a) => a.punchRecord?.staff?.departmentId == null)
      );
      console.log(others);
    }
  }, [departments, attendance]);

  return (
    <div className="p-[20px] w-full work-fine">
      <div className="flex  justify-between satisfy-summary  ">
        <div className="flex gap-[10px] summary-bold">
          <h1 className="font-semibold">Attendence Summary</h1>
        </div>
        <div className="flex gap-[10px] summary-bold2">
          <Link className=" text-[#8e54c2] text-[14px] font-semibold" to="#">
            Unprocessed Logs <FilterListIcon className="icon-filter" />
          </Link>
          <Link className=" text-[#8e54c2] text-[14px] font-semibold" to="#">
            Daily Report <DownloadIcon className="icon-filter" />
          </Link>
          <button
            onClick={() => setIsOpen6(!isOpen6)}
            className=" text-[#8e54c2] text-[14px] font-semibold "
            to="#"
          >
            Setting <SettingsIcon className="icon-filter" />
          </button>
          {isOpen6 &&
          <div className="bg-white shadow-lg rounded-lg mt-1 overflow-hidden">
            <div className="divide-y divide-gray-100">
             
              <div className="flex items-center justify-between p-4 hover:bg-gray-50">
                <span className="text-gray-700">Attendance</span>
                <div className="flex items-center text-gray-500">
                  <span>Selfie & Location</span>
                  <IoChevronDownSharp className="h-5 w-5 ml-2" />
                </div>
              </div>
  
             
              <div className="flex items-center justify-between p-4 hover:bg-gray-50">
                <span className="text-gray-700">Daily Work Entry</span>
                <div className="flex items-center text-gray-500">
                  <span>Enabled (11 Staffs)</span>
                  <IoChevronDownSharp className="h-5 w-5 ml-2" />
                </div>
              </div>
  
           
              <div className="flex items-center justify-between p-4 hover:bg-gray-50">
                <span className="text-gray-700">Weekly Holiday</span>
                <div className="flex items-center text-gray-500">
                  <span>Select</span>
                  <IoChevronDownSharp className="h-5 w-5 ml-2" />
                </div>
              </div>
  
         
              <div className="flex items-center justify-between p-4 hover:bg-gray-50">
                <span className="text-gray-700">Send SMS to Staff</span>
                <Switch
                  checked={smsEnabled}
                  onCheckedChange={setSmsEnabled}
                  className="ml-2"
                />
              </div>
  
            
              <div className="flex items-center justify-between p-4 hover:bg-gray-50">
                <span className="text-gray-700">Track In/Out Time</span>
                <span className="text-gray-500">Enabled</span>
              </div>
  
            
              <div className="flex items-center justify-between p-4 hover:bg-gray-50">
                <span className="text-gray-700">Device List</span>
                <div className="flex items-center text-gray-500">
                  <span>Select</span>
                  <IoChevronDownSharp className="h-5 w-5 ml-2" />
                </div>
              </div>
            </div>
          </div>}
        </div>
      </div>

      <div className="bg-[#fff] shadow-cs p-[20px] rounded-md mt-[24px] ">
        <div className="flex gap-[14px] justify-between items-center review-summary  ">
          <div className="flex ">
            <input
              className="bg-transparent font-medium text-[14px]"
              type="date"
              value={summaryDate} // Set value in YYYY-MM-DD
              onChange={handleChange} // Update state on change
            />
          </div>
          <div className="flex items-center justify-between gap-[14px] approval-new ">
            <h2 className="text-[14px] font-medium">
              Total Pending for Approval :
              {attendance &&
                attendance?.filter((item) => !item?.punchRecord?.isApproved)
                  .length}
            </h2>
            <Link
              className="bg-[#27004a] text-[white] review-btn rounded-md"
              to="#"
            >
              Review
            </Link>
          </div>
        </div>
        <div className="mt-[16px] flex gap-[30px] summary-bold1">
          <div className="total-staff w-[15%] new-staff3">
            <h2 className="text-[14px] font-normal text-[#000000bf]">
              Total Staff
            </h2>
            <p className="text-[14px] font-semibold">{attendance?.length}</p>
          </div>
          <div className="total-staff w-[15%] new-staff3">
            <h2 className="text-[14px] font-normal text-[#000000bf]">
              Present
            </h2>
            <p className="text-[14px] font-semibold">
              {
                attendance?.filter(
                  (item) => item?.punchRecord?.status === "PRESENT"
                ).length
              }
            </p>
          </div>
          <div className="total-staff w-[15%] new-staff3">
            <h2 className="text-[14px] font-normal text-[#000000bf]">Absent</h2>
            <p className="text-[14px] font-semibold">
              {
                attendance?.filter(
                  (item) => item?.punchRecord?.status === "ABSENT"
                ).length
              }
            </p>
          </div>
          <div className="total-staff w-[15%] new-staff3">
            <h2 className="text-[14px] font-normal text-[#000000bf]">
              Half Day
            </h2>
            <p className="text-[14px] font-semibold">
              {
                attendance?.filter(
                  (item) => item?.punchRecord?.status === "HALFDAY"
                ).length
              }
            </p>
          </div>
          <div className="total-staff w-[15%] new-staff3">
            <h2 className="text-[14px] font-normal whitespace-nowrap text-[#000000bf]">
              Overtime Hours
            </h2>
            <p className="text-[14px] font-semibold">
              {attendance.length ? calculateTotalOvertimeHours(attendance) : 0}
            </p>
          </div>
          <div className="total-staff w-[15%] new-staff3">
            <h2 className="text-[14px] font-normal text-[#000000bf]">
              Fine Hours
            </h2>
            <p className="text-[14px] font-semibold">
              {attendance.length ? calculateTotalFineHours(attendance) : 0}
            </p>
          </div>
          <div className="total-staff1 w-[15%]">
            <h2 className="text-[14px] font-normal text-[#000000bf]">
              Paid Leave
            </h2>
            <p className="text-[14px] font-semibold">
              {
                attendance?.filter(
                  (item) => item?.punchRecord?.status === "PAIDLEAVE"
                ).length
              }
            </p>
          </div>
        </div>
      </div>
      <div className="bg-[#ffff] shadow-cs p-[20px] rounded-md mt-[24px] flex gap-[10px] over-new">
        <Link
          to="/worktime"
          className="total-staff text-[#27004a]  text-[14px] font-medium  transition hover:text-[#8e54c2]"
        >
          Daily Work Entry
        </Link>
        <Link
          to="/reviewfine"
          className="total-staff  text-[#27004a]  text-[14px] font-medium transition hover:text-[#8e54c2]"
        >
          Fine
        </Link>
        <Link
          to="/overtime"
          className=" total-staff  text-[#27004a] text-[14px] font-medium  transition hover:text-[#8e54c2]"
        >
          Overtime
        </Link>
      </div>
      <div className="relative pb-2">
        <SearchIcon className="absolute top-[34px] right-[7px]" />
        <input
          className="bg-[#ffff] shadow-cs w-full pr-[38px] mt-[24px] p-[10px] rounded-md search-staff "
          type="text"
          placeholder="Search Staff by Name , Phone Number or Employee ID"
        />
      </div>
      {departments.length &&
        attendance.length &&
        departments.map((d) => {
          const rec = attendance?.filter(
            (a) => a.punchRecord?.staff?.departmentId == d.id
          );
          return (
            <div className="flex flex-col gap-[10px] mt-[0px]">
              <h1 className="pt-2">
                {d.department_name} ({rec.length})
              </h1>
              {rec.map((item, index) => {
                return (
                  <>
                    <div className="shadow p-[20px]  rounded-md shadow-cs">
                      <div className="flex items-start justify-between  flex-col xl:flex-row lg:flex-row md:flex-row xl:items-center lg:items-center md:items-center gap-4 xl:gap-0 lg:gap-0 md:gap-0">
                        <div>
                          <p className="text-[16px]">
                            {item?.punchRecord?.staff?.User?.name}
                          </p>
                          <p className="text-[16px]">
                            {item?.punchRecord?.staff?.User?.email}
                          </p>
                          <p className="text-[red] text-[14px]">
                            {item?.punchRecord?.status}
                          </p>
                          <p className="text-[#27004a] font-medium text-[14px] mt-[10px] w-[150px]">
                            Add Note - Login
                          </p>
                        </div>

                        <div className="flex gap-[18px] xl:flex-col flex-row md:flex-col lg:flex-col set-workd w-full justify-between xl:justify-start md:justify-start lg:justify-start ">
                          <div className="flex gap-[20px] flex-col xl:flex-row lg:flex-row md:flex-row xl:justify-end lg:justify-end md:justify-end">
                            <div className="flex xl:justify-center justify-start items-center">
                              {/* Button to open modal */}
                              <button
                                onClick={() => {
                                  setSelectedStatus("PRESENT");
                                  openModal();
                                }}
                                className={`btns px-6 py-3 text-[14px]  font-medium rounded-md 
                                                    focus:outline-none xl:w-[200px] lg:w-[200px] md:w-[140px] whitespace-nowrap shadow-md 
                                                    ${
                                                      item?.punchRecord
                                                        ?.status === "PRESENT"
                                                        ? "bg-[#008000] text-white"
                                                        : "bg-[#fff] text-[#000]"
                                                    }`}
                              >
                                P I Present
                              </button>
                            </div>

                            <div className="flex justify-center items-center">
                              {/* Button to open modal */}
                              <button
                                onClick={() => {
                                  setSelectedStatus("HALFDAY");
                                  openModal();
                                }}
                                className={`btns px-6 py-3 text-[14px]  font-medium rounded-md 
                                                    focus:outline-none xl:w-[200px] lg:w-[200px] md:w-[140px] whitespace-nowrap shadow-md 
                                                    ${
                                                      item?.punchRecord
                                                        ?.status === "HALFDAY"
                                                        ? "bg-[#008000] text-white"
                                                        : "bg-[#fff] text-[#000]"
                                                    }`}
                              >
                                HD I HalfDay
                              </button>
                            </div>

                            <div className="flex xl:justify-center justify-start items-center">
                              {/* Button to open modal */}
                              <button
                                onClick={() => {
                                  fineId(item?.staffId);
                                  setApplyPunchRecordId(item?.punchRecord?.id);
                                }}
                                className=" btns px-6 py-3 text-[14px] text-[#27004a] font-medium bg-[white] rounded-md focus:outline-none xl:w-[200px] lg:w-[200px] md:w-[140px] whitespace-nowrap shadow"
                              >
                                F I Fine
                              </button>

                              {/* Modal overlay and content */}
                              {isOpen0 && (
                                <div className="fixed inset-0 z-50 p-[10px] flex items-center justify-center bg-black bg-opacity-50">
                                  <div className="bg-white rounded-lg shadow-lg max-w-lg w-full overflow-y-scroll h-[100%] p-6 scroll-bar-design">
                                    <div className="">
                                      <div className="mb-[20px]">
                                        <h2 className="text-xl text-[18px] text-[black] font-semibold  ">
                                          {" "}
                                          Fine{" "}
                                        </h2>
                                        <p className=" text-[14px]">
                                          {staffName} I{" "}
                                          {formatSummaryDate(summaryDate)}
                                        </p>
                                      </div>

                                      <div className="flex justify-between items-center mb-[10px]">
                                        <p className="text-[16px]  font-medium">
                                          DAILY SHIFT
                                        </p>
                                        {/* <DeleteIcon className='del-icon2 text-[#89868d] cursor-pointer' /> */}
                                      </div>
                                    </div>

                                    <div className="  ">
                                      <div className="flex items-center justify-between mb-[5px]">
                                        <p className="text-[14px] font-medium">
                                          Late Entry
                                        </p>
                                        {/* <CloseIcon className='close-icon text-[#89868d]' /> */}
                                      </div>

                                      <div className="flex items-center gap-[20px] mb-2">
                                        <div className="w-[33%]">
                                          <p className="text-[12px]">Hours</p>
                                          <TimePicker
                                            showSecond={false}
                                            defaultValue={null}
                                            className="xxx"
                                            onChange={(e) =>
                                              handleChangeTime(e, perMinSalary)
                                            }
                                            format="HH:mm"
                                            inputReadOnly
                                          />
                                          <p className="text-[12px]">
                                            Amount{" "}
                                            {(
                                              lateEntryAmount *
                                              lateEntrySalaryTime
                                            ).toFixed(2)}{" "}
                                          </p>
                                        </div>
                                        <div className="flex gap-[28px] w-[66%]">
                                          <div className="w-[100%]">
                                            <select
                                              onChange={(e) => {
                                                setLateEntrySalaryTime(
                                                  e.target.value
                                                );
                                              }}
                                              className="border border-[#c9c9c9] rounded-md pr-[20px] pt-[6px] pb-[6px]  w-[100%]   focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]"
                                            >
                                              <option value={1}>
                                                1x Salary
                                              </option>
                                              <option value={1.5}>
                                                1.5x Salary
                                              </option>
                                            </select>
                                          </div>
                                          <div className="">
                                            {/* {Number(calculateFinePerMinute(selectedStaffSalary, 30, 8))}  */}
                                            <p className="text-[14px]  rounded-md select-pe p-[6px] w-[124px]">
                                              {perMinSalary} Per Min
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className=" ">
                                      <div className="flex items-center justify-between mb-[5px]">
                                        <p className="text-[14px] font-medium">
                                          Excess Breaks
                                        </p>
                                        {/* <CloseIcon className='close-icon text-[#89868d]' /> */}
                                      </div>

                                      <div className="flex items-center gap-[20px] mb-2">
                                        <div className="w-[33%]">
                                          <p className="text-[12px]">Hours</p>
                                          {/* <input type="time" onChange={(e) => { setExcessBreakHours(e.target.value) }} className='text-[14px]  rounded-md select-pe p-[6px] w-[100%] ' /> */}
                                          <TimePicker
                                            showSecond={false}
                                            defaultValue={null}
                                            className="xxx"
                                            onChange={(e) =>
                                              handleChangeTimeExcessBreak(
                                                e,
                                                perMinSalaryExcessBreak
                                              )
                                            }
                                            format="HH:mm"
                                            inputReadOnly
                                          />

                                          <p className="text-[12px]">
                                            Amount{" "}
                                            {(
                                              excessBreakAmount *
                                              excessBreakTime
                                            ).toFixed(2)}
                                          </p>
                                        </div>
                                        <div className="flex gap-[28px] w-[66%]">
                                          <div className="w-[100%]">
                                            <select
                                              onChange={(e) => {
                                                setExcessBreakTime(
                                                  e.target.value
                                                );
                                              }}
                                              className="border border-[#c9c9c9] rounded-md pr-[20px] pt-[6px] pb-[6px]  w-[100%]   focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]"
                                            >
                                              <option value={1}>
                                                1x Salary
                                              </option>
                                              <option value={1.5}>
                                                1.5x Salary
                                              </option>
                                            </select>
                                          </div>
                                          <div className="">
                                            <p className="text-[14px]  rounded-md select-pe p-[6px] w-[124px]">
                                              {perMinSalary} Per Min
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className=" ">
                                      <div className="flex items-center justify-between mb-[5px]">
                                        <p className="text-[14px] font-medium">
                                          Early Out
                                        </p>
                                        {/* <CloseIcon className='close-icon text-[#89868d]' /> */}
                                      </div>

                                      <div className="flex items-center gap-[20px] mb-2">
                                        <div className="w-[33%]">
                                          <p className="text-[12px]">Hours</p>
                                          {/* <input type="time" onChange={(e) => { setEarlyOutHours(e.target.value) }} className='text-[14px]  rounded-md select-pe p-[6px] w-[100%] ' /> */}
                                          <TimePicker
                                            showSecond={false}
                                            defaultValue={null}
                                            className="xxx"
                                            onChange={(e) =>
                                              handleChangeTimeEarlyOut(
                                                e,
                                                perMinSalaryEarlyOut
                                              )
                                            }
                                            format="HH:mm"
                                            inputReadOnly
                                          />
                                          <p className="text-[12px]">
                                            Amount{" "}
                                            {(
                                              earlyOutAmount * earlyOutTime
                                            ).toFixed(2)}
                                          </p>
                                        </div>
                                        <div className="flex gap-[28px] w-[66%]">
                                          <div className="w-[100%]">
                                            <select
                                              onChange={(e) => {
                                                setEarlyOutTime(e.target.value);
                                              }}
                                              className="border border-[#c9c9c9] rounded-md pr-[20px] pt-[6px] pb-[6px]  w-[100%]   focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]"
                                            >
                                              <option value={1}>
                                                1x Salary
                                              </option>
                                              <option value={1.5}>
                                                1.5x Salary
                                              </option>
                                            </select>
                                          </div>
                                          <div className="">
                                            <p className="text-[14px]  rounded-md select-pe p-[6px] w-[124px]">
                                              {perMinSalary} Per Min
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="mt-[10px] mb-[10px]">
                                      <span className="text-[12px]">
                                        Total Amount
                                      </span>
                                      <p className="text-[14px]">
                                        {fineTotalAmount}
                                      </p>
                                    </div>
                                    <div className="flex items-center mb-[20px] gap-[4px] ">
                                      <input type="checkbox" />
                                      <p className="text-[14px]">
                                        Send SMS to Staff
                                      </p>
                                    </div>

                                    <div className="flex flex-col gap-[10px] ">
                                      <button
                                        onClick={() => {
                                          console.log(item.punchRecord);
                                          applyFine();
                                        }}
                                        className="px-4 py-2 bg-[#27004a] border border-[#27004a] transition-all text-white rounded-md hover:text-[#27004a] hover:bg-[#ffff] "
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
                                // onClick={openModal12}
                                onClick={() => {
                                  console.log(
                                    item?.punchRecord?.id,
                                    "ggfjjhgjgjhg798----"
                                  );
                                  overTimeId(item?.staffId);
                                  setApplyPunchRecordId(item?.punchRecord?.id);
                                }}
                                className=" btns px-6 py-3 text-[14px] text-black font-medium bg-[white] rounded-md focus:outline-none xl:w-[200px] lg:w-[200px] md:w-[140px] whitespace-nowrap shadow"
                              >
                                OT I Overtime
                              </button>

                              {/* Modal overlay and content */}
                              {isOpen12 && (
                                <div className="fixed inset-0 z-50 p-[10px] flex items-center justify-center bg-black bg-opacity-50">
                                  <div className="bg-white rounded-lg shadow-lg max-w-lg w-full overflow-y-scroll h-[100%] p-6 scroll-bar-design">
                                    <div className="">
                                      <div className="mb-[20px]">
                                        <h2 className="text-xl text-[18px] text-[black] font-semibold  ">
                                          {" "}
                                          OverTime Day{" "}
                                        </h2>
                                        <p className=" text-[14px]">
                                          {staffName} I{" "}
                                          {formatSummaryDate(summaryDate)}
                                        </p>
                                      </div>

                                      <div className="flex justify-between items-center mb-[10px]">
                                        <p className="text-[16px]  font-medium">
                                          DAILY SHIFT
                                        </p>
                                        {/* <DeleteIcon className='del-icon2 text-[#89868d] cursor-pointer' /> */}
                                      </div>
                                    </div>

                                    <div className="  ">
                                      <div className="flex items-center justify-between mb-[5px]">
                                        <p className="text-[14px] font-medium">
                                          Late Out
                                        </p>
                                        {/* <CloseIcon className='close-icon text-[#89868d]' /> */}
                                      </div>

                                      <div className="flex items-center gap-[20px] mb-2">
                                        <div className="w-[33%]">
                                          <p className="text-[12px]">Hours</p>
                                          <TimePicker
                                            showSecond={false}
                                            defaultValue={null}
                                            className="xxx"
                                            onChange={(e) =>
                                              handleChangeOverTime(
                                                e,
                                                perMinSalaryOverTime
                                              )
                                            }
                                            format="HH:mm"
                                            inputReadOnly
                                          />

                                          <p className="text-[12px]">
                                            Amount{" "}
                                            {(
                                              overTimeLateOutAmount *
                                              overTimeSalaryTime
                                            ).toFixed(2)}{" "}
                                          </p>
                                        </div>
                                        <div className="flex gap-[28px] w-[66%]">
                                          <div className="w-[100%]">
                                            <select
                                              onChange={(e) => {
                                                setOverTimeSalaryTime(
                                                  e.target.value
                                                );
                                              }}
                                              className="border border-[#c9c9c9] rounded-md pr-[20px] pt-[6px] pb-[6px]  w-[100%]   focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]"
                                            >
                                              <option value={1}>
                                                1x Salary
                                              </option>
                                              <option value={1.5}>
                                                1.5x Salary
                                              </option>
                                            </select>
                                          </div>
                                          <div className="">
                                            <p className="text-[14px]  rounded-md select-pe p-[6px] w-[124px]">
                                              {perMinSalaryOverTime} Per Min
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className=" ">
                                      <div className="flex items-center justify-between mb-[5px]">
                                        <p className="text-[14px] font-medium">
                                          Early In
                                        </p>
                                        {/* <CloseIcon className='close-icon text-[#89868d]' /> */}
                                      </div>

                                      <div className="flex items-center gap-[20px] mb-2">
                                        <div className="w-[33%]">
                                          <p className="text-[12px]">Hours</p>
                                          <TimePicker
                                            showSecond={false}
                                            defaultValue={null}
                                            className="xxx"
                                            onChange={(e) =>
                                              handleChangeTimeEarlyIn(
                                                e,
                                                perMinSalaryEarlyOutOverTime
                                              )
                                            }
                                            format="HH:mm"
                                            inputReadOnly
                                          />

                                          <p className="text-[12px]">
                                            Amount{" "}
                                            {(
                                              overTimeEarlyOutAmount *
                                              overTimeEarlySalaryTime
                                            ).toFixed(2)}
                                          </p>
                                        </div>
                                        <div className="flex gap-[28px] w-[66%]">
                                          <div className="w-[100%]">
                                            <select
                                              onChange={(e) => {
                                                setOverTimeEarlySalaryTime(
                                                  e.target.value
                                                );
                                              }}
                                              className="border border-[#c9c9c9] rounded-md pr-[20px] pt-[6px] pb-[6px]  w-[100%]   focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]"
                                            >
                                              <option value={1}>
                                                1x Salary
                                              </option>
                                              <option value={1.5}>
                                                1.5x Salary
                                              </option>
                                            </select>
                                          </div>
                                          <div className="">
                                            <p className="text-[14px]  rounded-md select-pe p-[6px] w-[124px]">
                                              {perMinSalaryEarlyOutOverTime} Per
                                              Min
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="mt-[10px] mb-[10px]">
                                      <span className="text-[12px]">
                                        Total Amount
                                      </span>
                                      <p className="text-[14px]">
                                        {(
                                          overTimeLateOutAmount *
                                            overTimeSalaryTime +
                                          overTimeEarlyOutAmount *
                                            overTimeEarlySalaryTime
                                        ).toFixed(2)}
                                      </p>
                                    </div>
                                    <div className="flex items-center mb-[20px] gap-[4px] ">
                                      <input type="checkbox" />
                                      <p className="text-[14px]">
                                        Send SMS to Staff
                                      </p>
                                    </div>

                                    <div className="flex flex-col gap-[10px] ">
                                      <button
                                        onClick={applyOverTime}
                                        className="px-4 py-2 bg-[#27004a] border border-[#27004a] transition-all text-white rounded-md hover:text-[#27004a] hover:bg-[#ffff] "
                                      >
                                        Apply OverTime
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
                                  setSelectedStatus("PAIDLEAVE");
                                  openModal();
                                }}
                                className={`btns px-6 py-3 text-[14px]  font-medium rounded-md 
                                                    focus:outline-none xl:w-[200px] lg:w-[200px] md:w-[140px] whitespace-nowrap shadow-md 
                                                    ${
                                                      item?.punchRecord
                                                        ?.status === "PAIDLEAVE"
                                                        ? "bg-[#008000] text-white"
                                                        : "bg-[#fff] text-[#000]"
                                                    }`}
                              >
                                L I Paid Leave
                              </button>

                              {/* Modal overlay and content */}
                              {isOpen14 && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
                                  <div className="bg-white rounded-lg shadow-lg max-w-lg w-full h-[200px] p-6">
                                    <h2 className="text-xl text-center text-[18px] text-[black] font-semibold mt-[28px] mb-[6px] ">
                                      Sure You Want To Accept ?{" "}
                                    </h2>
                                    <p className="text-center mb-[16px] text-[14px]">
                                      Are you sure you want to accept this ??
                                    </p>

                                    <div className="flex justify-around ">
                                      <button className="px-4 py-2 bg-[#27004a] text-white rounded-md">
                                        Yes , Confirm
                                      </button>
                                      <button
                                        onClick={closeModal14}
                                        className="px-4 py-2 bg-[#27004a] text-white rounded-md"
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
                                  setSelectedStatus("ABSENT");
                                  openModal();
                                }}
                                className={`btns px-6 py-3 text-[14px]  font-medium rounded-md 
                                                    focus:outline-none xl:w-[200px] lg:w-[200px] md:w-[140px] whitespace-nowrap shadow-md 
                                                    ${
                                                      item?.punchRecord
                                                        ?.status === "ABSENT"
                                                        ? "bg-[#d62727] text-white"
                                                        : "bg-[#fff] text-[#000]"
                                                    }`}
                              >
                                A I Absent
                              </button>

                              {/* Modal overlay and content */}
                              {isOpen && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
                                  <div className="bg-white rounded-lg shadow-lg max-w-lg w-full h-[200px] p-6">
                                    <h2 className="text-xl text-center text-[18px] text-[black] font-semibold mt-[28px] mb-[6px] ">
                                      Sure You Want To Accept ?{" "}
                                    </h2>
                                    <p className="text-center mb-[16px] text-[14px]">
                                      Are you sure you want to accept this ??
                                    </p>

                                    <div className="flex justify-around ">
                                      <button
                                        onClick={() => {
                                          confirmation(item);
                                        }}
                                        disabled={loading}
                                        className={`px-4 py-2 bg-[#27004a] text-white rounded-md ${
                                          loading ? "opacity-50" : ""
                                        }`}
                                      >
                                        {loading
                                          ? "Confirming..."
                                          : " Yes , Confirm"}
                                      </button>
                                      <button
                                        onClick={closeModal}
                                        className="px-4 py-2 bg-[#27004a] text-white rounded-md"
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
                  </>
                );
              })}
              {/* <p className='bg-[#fff] shadow-cs four'>4</p> */}
            </div>
          );
        })}

      {!summaryDate && attendance.length === 0 && (
        <div className="text-center">
          <h2 className="text-[#ff0000] font-medium py-9 text-[20px]">
            Please Select Date
          </h2>
        </div>
      )}

      {others.length > 0 && (
        <div>
          <div className="mt-0 pt-4">Other Departments ({others.length})</div>

          {others.map((item, index) => {
            return (
              <>
                <div className="shadow p-[20px] mt-[7px] rounded-md shadow-cs">
                  <div className="flex items-start justify-between  flex-col xl:flex-row lg:flex-row md:flex-row xl:items-center lg:items-center md:items-center gap-4 xl:gap-0 lg:gap-0 md:gap-0">
                    <div>
                      <p className="text-[16px]">
                        {item?.punchRecord?.staff?.User?.name}
                      </p>
                      <p className="text-[16px]">
                        {item?.punchRecord?.staff?.User?.email}
                      </p>
                      <p className="text-[red] text-[14px]">
                        {item?.punchRecord?.status}
                      </p>
                      <p className="text-[#27004a] font-medium text-[14px] mt-[10px] w-[150px]">
                        Add Note - Login
                      </p>
                    </div>

                    <div className="flex gap-[18px] xl:flex-col flex-row md:flex-col lg:flex-col set-workd w-full justify-between xl:justify-start md:justify-start lg:justify-start ">
                      <div className="flex gap-[20px] flex-col xl:flex-row lg:flex-row md:flex-row xl:justify-end lg:justify-end md:justify-end">
                        <div className="flex xl:justify-center justify-start items-center">
                          {/* Button to open modal */}
                          <button
                            onClick={() => {
                              setSelectedStatus("PRESENT");
                              openModal();
                            }}
                            className={`btns px-6 py-3 text-[14px]  font-medium rounded-md 
                                                    focus:outline-none xl:w-[200px] lg:w-[200px] md:w-[140px] whitespace-nowrap shadow-md 
                                                    ${
                                                      item?.punchRecord
                                                        ?.status === "PRESENT"
                                                        ? "bg-[#008000] text-white"
                                                        : "bg-[#fff] text-[#000]"
                                                    }`}
                          >
                            P I Present
                          </button>
                        </div>

                        <div className="flex justify-center items-center">
                          {/* Button to open modal */}
                          <button
                            onClick={() => {
                              setSelectedStatus("HALFDAY");
                              openModal();
                            }}
                            className={`btns px-6 py-3 text-[14px]  font-medium rounded-md 
                                                    focus:outline-none xl:w-[200px] lg:w-[200px] md:w-[140px] whitespace-nowrap shadow-md 
                                                    ${
                                                      item?.punchRecord
                                                        ?.status === "HALFDAY"
                                                        ? "bg-[#008000] text-white"
                                                        : "bg-[#fff] text-[#000]"
                                                    }`}
                          >
                            HD I HalfDay
                          </button>
                        </div>

                        <div className="flex xl:justify-center justify-start items-center">
                          {/* Button to open modal */}
                          <button
                            onClick={() => {
                              fineId(item?.staffId);
                            }}
                            className=" btns px-6 py-3 text-[14px] text-[#27004a] font-medium bg-[white] rounded-md focus:outline-none xl:w-[200px] lg:w-[200px] md:w-[140px] whitespace-nowrap shadow"
                          >
                            F I Fine
                          </button>

                          {/* Modal overlay and content */}
                          {isOpen0 && (
                            <div className="fixed inset-0 z-50 p-[10px] flex items-center justify-center bg-black bg-opacity-50">
                              <div className="bg-white rounded-lg shadow-lg max-w-lg w-full overflow-y-scroll h-[100%] p-6 scroll-bar-design">
                                <div className="">
                                  <div className="mb-[20px]">
                                    <h2 className="text-xl text-[18px] text-[black] font-semibold  ">
                                      {" "}
                                      Fine{" "}
                                    </h2>
                                    <p className=" text-[14px]">
                                      {staffName} I{" "}
                                      {formatSummaryDate(summaryDate)}
                                    </p>
                                  </div>

                                  <div className="flex justify-between items-center mb-[10px]">
                                    <p className="text-[16px]  font-medium">
                                      DAILY SHIFT
                                    </p>
                                    {/* <DeleteIcon className='del-icon2 text-[#89868d] cursor-pointer' /> */}
                                  </div>
                                </div>

                                <div className="  ">
                                  <div className="flex items-center justify-between mb-[5px]">
                                    <p className="text-[14px] font-medium">
                                      Late Entry
                                    </p>
                                    {/* <CloseIcon className='close-icon text-[#89868d]' /> */}
                                  </div>

                                  <div className="flex items-center gap-[20px] mb-2">
                                    <div className="w-[33%]">
                                      <p className="text-[12px]">Hours</p>
                                      <TimePicker
                                        showSecond={false}
                                        defaultValue={null}
                                        className="xxx"
                                        onChange={(e) =>
                                          handleChangeTime(e, perMinSalary)
                                        }
                                        format="HH:mm"
                                        inputReadOnly
                                      />
                                      <p className="text-[12px]">
                                        Amount{" "}
                                        {(
                                          lateEntryAmount * lateEntrySalaryTime
                                        ).toFixed(2)}{" "}
                                      </p>
                                    </div>
                                    <div className="flex gap-[28px] w-[66%]">
                                      <div className="w-[100%]">
                                        <select
                                          onChange={(e) => {
                                            setLateEntrySalaryTime(
                                              e.target.value
                                            );
                                          }}
                                          className="border border-[#c9c9c9] rounded-md pr-[20px] pt-[6px] pb-[6px]  w-[100%]   focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]"
                                        >
                                          <option value={1}>1x Salary</option>
                                          <option value={1.5}>
                                            1.5x Salary
                                          </option>
                                        </select>
                                      </div>
                                      <div className="">
                                        {/* {Number(calculateFinePerMinute(selectedStaffSalary, 30, 8))}  */}
                                        <p className="text-[14px]  rounded-md select-pe p-[6px] w-[124px]">
                                          {perMinSalary} Per Min
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className=" ">
                                  <div className="flex items-center justify-between mb-[5px]">
                                    <p className="text-[14px] font-medium">
                                      Excess Breaks
                                    </p>
                                    {/* <CloseIcon className='close-icon text-[#89868d]' /> */}
                                  </div>

                                  <div className="flex items-center gap-[20px] mb-2">
                                    <div className="w-[33%]">
                                      <p className="text-[12px]">Hours</p>
                                      {/* <input type="time" onChange={(e) => { setExcessBreakHours(e.target.value) }} className='text-[14px]  rounded-md select-pe p-[6px] w-[100%] ' /> */}
                                      <TimePicker
                                        showSecond={false}
                                        defaultValue={null}
                                        className="xxx"
                                        onChange={(e) =>
                                          handleChangeTimeExcessBreak(
                                            e,
                                            perMinSalaryExcessBreak
                                          )
                                        }
                                        format="HH:mm"
                                        inputReadOnly
                                      />

                                      <p className="text-[12px]">
                                        Amount{" "}
                                        {(
                                          excessBreakAmount * excessBreakTime
                                        ).toFixed(2)}
                                      </p>
                                    </div>
                                    <div className="flex gap-[28px] w-[66%]">
                                      <div className="w-[100%]">
                                        <select
                                          onChange={(e) => {
                                            setExcessBreakTime(e.target.value);
                                          }}
                                          className="border border-[#c9c9c9] rounded-md pr-[20px] pt-[6px] pb-[6px]  w-[100%]   focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]"
                                        >
                                          <option value={1}>1x Salary</option>
                                          <option value={1.5}>
                                            1.5x Salary
                                          </option>
                                        </select>
                                      </div>
                                      <div className="">
                                        <p className="text-[14px]  rounded-md select-pe p-[6px] w-[124px]">
                                          {perMinSalary} Per Min
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className=" ">
                                  <div className="flex items-center justify-between mb-[5px]">
                                    <p className="text-[14px] font-medium">
                                      Early Out
                                    </p>
                                    {/* <CloseIcon className='close-icon text-[#89868d]' /> */}
                                  </div>

                                  <div className="flex items-center gap-[20px] mb-2">
                                    <div className="w-[33%]">
                                      <p className="text-[12px]">Hours</p>
                                      {/* <input type="time" onChange={(e) => { setEarlyOutHours(e.target.value) }} className='text-[14px]  rounded-md select-pe p-[6px] w-[100%] ' /> */}
                                      <TimePicker
                                        showSecond={false}
                                        defaultValue={null}
                                        className="xxx"
                                        onChange={(e) =>
                                          handleChangeTimeEarlyOut(
                                            e,
                                            perMinSalaryEarlyOut
                                          )
                                        }
                                        format="HH:mm"
                                        inputReadOnly
                                      />
                                      <p className="text-[12px]">
                                        Amount{" "}
                                        {(
                                          earlyOutAmount * earlyOutTime
                                        ).toFixed(2)}
                                      </p>
                                    </div>
                                    <div className="flex gap-[28px] w-[66%]">
                                      <div className="w-[100%]">
                                        <select
                                          onChange={(e) => {
                                            setEarlyOutTime(e.target.value);
                                          }}
                                          className="border border-[#c9c9c9] rounded-md pr-[20px] pt-[6px] pb-[6px]  w-[100%]   focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]"
                                        >
                                          <option value={1}>1x Salary</option>
                                          <option value={1.5}>
                                            1.5x Salary
                                          </option>
                                        </select>
                                      </div>
                                      <div className="">
                                        <p className="text-[14px]  rounded-md select-pe p-[6px] w-[124px]">
                                          {perMinSalary} Per Min
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-[10px] mb-[10px]">
                                  <span className="text-[12px]">
                                    Total Amount
                                  </span>
                                  <p className="text-[14px]">
                                    {fineTotalAmount}
                                  </p>
                                </div>
                                <div className="flex items-center mb-[20px] gap-[4px] ">
                                  <input type="checkbox" />
                                  <p className="text-[14px]">
                                    Send SMS to Staff
                                  </p>
                                </div>

                                <div className="flex flex-col gap-[10px] ">
                                  <button
                                    onClick={applyFine}
                                    className="px-4 py-2 bg-[#27004a] border border-[#27004a] transition-all text-white rounded-md hover:text-[#27004a] hover:bg-[#ffff] "
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
                            // onClick={openModal12}
                            onClick={() => {
                              overTimeId(item?.staffId);
                            }}
                            className=" btns px-6 py-3 text-[14px] text-black font-medium bg-[white] rounded-md focus:outline-none xl:w-[200px] lg:w-[200px] md:w-[140px] whitespace-nowrap shadow"
                          >
                            OT I Overtime
                          </button>

                          {/* Modal overlay and content */}
                          {isOpen12 && (
                            <div className="fixed inset-0 z-50 p-[10px] flex items-center justify-center bg-black bg-opacity-50">
                              <div className="bg-white rounded-lg shadow-lg max-w-lg w-full overflow-y-scroll h-[100%] p-6 scroll-bar-design">
                                <div className="">
                                  <div className="mb-[20px]">
                                    <h2 className="text-xl text-[18px] text-[black] font-semibold  ">
                                      {" "}
                                      OverTime Day{" "}
                                    </h2>
                                    <p className=" text-[14px]">
                                      {staffName} I{" "}
                                      {formatSummaryDate(summaryDate)}
                                    </p>
                                  </div>

                                  <div className="flex justify-between items-center mb-[10px]">
                                    <p className="text-[16px]  font-medium">
                                      DAILY SHIFT
                                    </p>
                                    {/* <DeleteIcon className='del-icon2 text-[#89868d] cursor-pointer' /> */}
                                  </div>
                                </div>

                                <div className="  ">
                                  <div className="flex items-center justify-between mb-[5px]">
                                    <p className="text-[14px] font-medium">
                                      Late Out
                                    </p>
                                    {/* <CloseIcon className='close-icon text-[#89868d]' /> */}
                                  </div>

                                  <div className="flex items-center gap-[20px] mb-2">
                                    <div className="w-[33%]">
                                      <p className="text-[12px]">Hours</p>
                                      <TimePicker
                                        showSecond={false}
                                        defaultValue={null}
                                        className="xxx"
                                        onChange={(e) =>
                                          handleChangeOverTime(
                                            e,
                                            perMinSalaryOverTime
                                          )
                                        }
                                        format="HH:mm"
                                        inputReadOnly
                                      />

                                      <p className="text-[12px]">
                                        Amount{" "}
                                        {(
                                          overTimeLateOutAmount *
                                          overTimeSalaryTime
                                        ).toFixed(2)}{" "}
                                      </p>
                                    </div>
                                    <div className="flex gap-[28px] w-[66%]">
                                      <div className="w-[100%]">
                                        <select
                                          onChange={(e) => {
                                            setOverTimeSalaryTime(
                                              e.target.value
                                            );
                                          }}
                                          className="border border-[#c9c9c9] rounded-md pr-[20px] pt-[6px] pb-[6px]  w-[100%]   focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]"
                                        >
                                          <option value={1}>1x Salary</option>
                                          <option value={1.5}>
                                            1.5x Salary
                                          </option>
                                        </select>
                                      </div>
                                      <div className="">
                                        <p className="text-[14px]  rounded-md select-pe p-[6px] w-[124px]">
                                          {perMinSalaryOverTime} Per Min
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className=" ">
                                  <div className="flex items-center justify-between mb-[5px]">
                                    <p className="text-[14px] font-medium">
                                      Early In
                                    </p>
                                    {/* <CloseIcon className='close-icon text-[#89868d]' /> */}
                                  </div>

                                  <div className="flex items-center gap-[20px] mb-2">
                                    <div className="w-[33%]">
                                      <p className="text-[12px]">Hours</p>
                                      <TimePicker
                                        showSecond={false}
                                        defaultValue={null}
                                        className="xxx"
                                        onChange={(e) =>
                                          handleChangeTimeEarlyIn(
                                            e,
                                            perMinSalaryEarlyOutOverTime
                                          )
                                        }
                                        format="HH:mm"
                                        inputReadOnly
                                      />

                                      <p className="text-[12px]">
                                        Amount{" "}
                                        {(
                                          overTimeEarlyOutAmount *
                                          overTimeEarlySalaryTime
                                        ).toFixed(2)}
                                      </p>
                                    </div>
                                    <div className="flex gap-[28px] w-[66%]">
                                      <div className="w-[100%]">
                                        <select
                                          onChange={(e) => {
                                            setOverTimeEarlySalaryTime(
                                              e.target.value
                                            );
                                          }}
                                          className="border border-[#c9c9c9] rounded-md pr-[20px] pt-[6px] pb-[6px]  w-[100%]   focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]"
                                        >
                                          <option value={1}>1x Salary</option>
                                          <option value={1.5}>
                                            1.5x Salary
                                          </option>
                                        </select>
                                      </div>
                                      <div className="">
                                        <p className="text-[14px]  rounded-md select-pe p-[6px] w-[124px]">
                                          {perMinSalaryEarlyOutOverTime} Per Min
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-[10px] mb-[10px]">
                                  <span className="text-[12px]">
                                    Total Amount
                                  </span>
                                  <p className="text-[14px]">
                                    {(
                                      overTimeLateOutAmount *
                                        overTimeSalaryTime +
                                      overTimeEarlyOutAmount *
                                        overTimeEarlySalaryTime
                                    ).toFixed(2)}
                                  </p>
                                </div>
                                <div className="flex items-center mb-[20px] gap-[4px] ">
                                  <input type="checkbox" />
                                  <p className="text-[14px]">
                                    Send SMS to Staff
                                  </p>
                                </div>

                                <div className="flex flex-col gap-[10px] ">
                                  <button
                                    onClick={applyOverTime}
                                    className="px-4 py-2 bg-[#27004a] border border-[#27004a] transition-all text-white rounded-md hover:text-[#27004a] hover:bg-[#ffff] "
                                  >
                                    Apply OverTime
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
                              setSelectedStatus("PAIDLEAVE");
                              openModal();
                            }}
                            className={`btns px-6 py-3 text-[14px]  font-medium rounded-md 
                                                    focus:outline-none xl:w-[200px] lg:w-[200px] md:w-[140px] whitespace-nowrap shadow-md 
                                                    ${
                                                      item?.punchRecord
                                                        ?.status === "PAIDLEAVE"
                                                        ? "bg-[#008000] text-white"
                                                        : "bg-[#fff] text-[#000]"
                                                    }`}
                          >
                            L I Paid Leave
                          </button>

                          {/* Modal overlay and content */}
                          {isOpen14 && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
                              <div className="bg-white rounded-lg shadow-lg max-w-lg w-full h-[200px] p-6">
                                <h2 className="text-xl text-center text-[18px] text-[black] font-semibold mt-[28px] mb-[6px] ">
                                  Sure You Want To Accept ?{" "}
                                </h2>
                                <p className="text-center mb-[16px] text-[14px]">
                                  Are you sure you want to accept this ??
                                </p>

                                <div className="flex justify-around ">
                                  <button className="px-4 py-2 bg-[#27004a] text-white rounded-md">
                                    Yes , Confirm
                                  </button>
                                  <button
                                    onClick={closeModal14}
                                    className="px-4 py-2 bg-[#27004a] text-white rounded-md"
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
                              setSelectedStatus("ABSENT");
                              openModal();
                            }}
                            className={`btns px-6 py-3 text-[14px]  font-medium rounded-md 
                                                    focus:outline-none xl:w-[200px] lg:w-[200px] md:w-[140px] whitespace-nowrap shadow-md 
                                                    ${
                                                      item?.punchRecord
                                                        ?.status === "ABSENT"
                                                        ? "bg-[#e02929] text-white"
                                                        : "bg-[#fff] text-[#000]"
                                                    }`}
                          >
                            A I Absent
                          </button>

                          {/* Modal overlay and content */}
                          {isOpen && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
                              <div className="bg-white rounded-lg shadow-lg max-w-lg w-full h-[200px] p-6">
                                <h2 className="text-xl text-center text-[18px] text-[black] font-semibold mt-[28px] mb-[6px] ">
                                  Sure You Want To Accept ?{" "}
                                </h2>
                                <p className="text-center mb-[16px] text-[14px]">
                                  Are you sure you want to accept this ??
                                </p>

                                <div className="flex justify-around ">
                                  <button
                                    onClick={() => {
                                      confirmation(item);
                                    }}
                                    disabled={loading}
                                    className={`px-4 py-2 bg-[#27004a] text-white rounded-md ${
                                      loading ? "opacity-50" : ""
                                    }`}
                                  >
                                    {loading
                                      ? "Confirming..."
                                      : " Yes , Confirm"}
                                  </button>
                                  <button
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-[#27004a] text-white rounded-md"
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
              </>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Attendence_summary;
