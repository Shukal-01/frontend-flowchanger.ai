import React, { useEffect, useState, useRef } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "@davzon/react-country-state-city";
import { useGlobalContext } from "../../../Context/GlobalContext";
import { State } from "country-state-city";

const EditSalaryDetails = () => {

  const { baseUrl, selectedStaff, openToast } = useGlobalContext();
  const statesLWF = [
    { state: "Andaman and Nicobar Islands", employeelwf: 0, employerlwf: 0 },
    { state: "Andhra Pradesh", employeelwf: 2.5, employerlwf: 5.83 },
    { state: "Arunachal Pradesh", employeelwf: 0, employerlwf: 0 },
    { state: "Assam", employeelwf: 0, employerlwf: 0 },
    { state: "Bihar", employeelwf: 0, employerlwf: 0 },
    { state: "Chandigarh", employeelwf: 5, employerlwf: 20 },
    { state: "Chhattisgarh", employeelwf: 2.5, employerlwf: 7.5 },
    { state: "Dadra and Nagar Haveli", employeelwf: 0, employerlwf: 0 },
    { state: "Daman and Diu", employeelwf: 0, employerlwf: 0 },
    { state: "Delhi", employeelwf: 0.13, employerlwf: 0.38 },
    { state: "Goa", employeelwf: 10, employerlwf: 30 },
    { state: "Gujarat", employeelwf: 1, employerlwf: 2 },
    { state: "Haryana", employeelwf: 20, employerlwf: 40 },
    { state: "Himachal Pradesh", employeelwf: 0, employerlwf: 0 },
    { state: "Jammu and Kashmir", employeelwf: 0, employerlwf: 0 },
    { state: "Jharkhand", employeelwf: 0, employerlwf: 0 },
    { state: "Karnataka", employeelwf: 1.67, employerlwf: 3.33 },
    { state: "Kerala", employeelwf: 50, employerlwf: 50 },
    { state: "Ladakh", employeelwf: 0, employerlwf: 0 },
    { state: "Lakshadweep", employeelwf: 0, employerlwf: 0 },
    { state: "Madhya Pradesh", employeelwf: 1.67, employerlwf: 5 },
    { state: "Maharashtra", employeelwf: 4.17, employerlwf: 12.5 },
    { state: "Manipur", employeelwf: 0, employerlwf: 0 },
    { state: "Meghalaya", employeelwf: 0, employerlwf: 0 },
    { state: "Mizoram", employeelwf: 0, employerlwf: 0 },
    { state: "Nagaland", employeelwf: 0, employerlwf: 0 },
    { state: "Odisha", employeelwf: 1.67, employerlwf: 3.33 },
    { state: "Puducherry", employeelwf: 0, employerlwf: 0 },
    { state: "Punjab", employeelwf: 5, employerlwf: 20 },
    { state: "Rajasthan", employeelwf: 0, employerlwf: 0 },
    { state: "Sikkim", employeelwf: 0, employerlwf: 0 },
    { state: "Tamil Nadu", employeelwf: 1.67, employerlwf: 3.33 },
    { state: "Telangana", employeelwf: 0.17, employerlwf: 0.42 },
    { state: "Tripura", employeelwf: 0, employerlwf: 0 },
    { state: "Uttar Pradesh", employeelwf: 0, employerlwf: 0 },
    { state: "Uttarakhand", employeelwf: 0, employerlwf: 0 },
    { state: "West Bengal", employeelwf: .50, employerlwf: 2.5 },
  ];

  const initialOptions = [
    { id: 1, label: 'None' },
    {
      id: 2,
      label: '₹ 1800 Limit',
      items: [
        { id: 'basic', label: 'BASIC', checked: false },
        { id: 'hra', label: 'HRA', checked: false },
        { id: 'da', label: 'Dearness Allowance', checked: false },
        { id: 'overtime', label: 'Overtime', checked: false },
        { id: 'incentive', label: 'Incentive', checked: false },
      ]
    },
    {
      id: 3,
      label: '12% Variable',
      items: [
        { id: 'basic_var', label: 'BASIC', checked: false },
        { id: 'hra_var', label: 'HRA', checked: false },
         { id: 'da_var', label: 'Dearness Allowance', checked: false },
        { id: 'overtime_var', label: 'Overtime', checked: false },
        { id: 'incentive_var', label: 'Incentive', checked: false },
      ]
    },
  ]
  const initialOptions2 = [
    { id: 1, label: 'None' },
    {
      id: 2,
      label: '0.75% Variable',
      items: [
        { id: 'basic_var', label: 'BASIC', checked: false },
        { id: 'hra_var', label: 'HRA', checked: false },
        { id: 'da_var', label: 'Dearness Allowance', checked: false },
        { id: 'overtime_var', label: 'Overtime', checked: false },
        { id: 'incentive_var', label: 'Incentive', checked: false },
      ]
    },
  ]
  const initialOptions3 = [
    { id: 1, label: 'None' },
    {
      id: 2,
      label: '3.25% Variable',
      items: [
        { id: 'basic_var', label: 'BASIC', checked: false },
        { id: 'hra_var', label: 'HRA', checked: false },
        { id: 'da_var', label: 'Dearness Allowance', checked: false },
        { id: 'overtime_var', label: 'Overtime', checked: false },
        { id: 'incentive_var', label: 'Incentive', checked: false },
      ]
    },
  ]

  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);

  const [calEmployerPF, setCalEmployerPF] = useState(0);
  const [calEmployeePF, setCalEmployeePF] = useState(0);
  const [calEmployerESI, setCalEmployerESI] = useState(0);
  const [calEmployeeESI, setCalEmployeeESI] = useState(0);
  const [calEmployerPFEDLIAndAdminCharges, setEmployerPFEDLIAndAdminCharges] = useState(0);

  const [includeEmployerPF, setIncludeEmployerPF] = useState(false);
  const [includeEmployerESI, setIncludeEmployerESI] = useState(false);
  const [includeEmployerLWF, setIncludeEmployerLWF] = useState(false);


  const [options1, setOptions1] = useState(initialOptions);
  const [options2, setOptions2] = useState(initialOptions3);
  const [options3, setOptions3] = useState(initialOptions);
  const [options4, setOptions4] = useState(initialOptions2);

  const [selectedOption1, setSelectedOption1] = useState(options1[0]);
  const [selectedOption2, setSelectedOption2] = useState(options2[0]);
  const [selectedOption3, setSelectedOption3] = useState(options3[0]);
  const [selectedOption4, setSelectedOption4] = useState(options4[0]);
  const [selectedOption5, setSelectedOption5] = useState("None");

  const toggleDropdown1 = () => setIsOpen1(!isOpen1);
  const toggleDropdown2 = () => setIsOpen2(!isOpen2);
  const toggleDropdown3 = () => setIsOpen3(!isOpen3);
  const toggleDropdown4 = () => setIsOpen4(!isOpen4);

  const handleOptionClick = (option, setSelectedOption) => {
    if (!option?.items) {
      setSelectedOption(option); // Set only the clicked option in selectedOption
    } else {
      setSelectedOption((prevSelected) => (prevSelected?.id === option.id ? null : option));
    }
  };

  const handleNestedOptionClick = (e, selectedOption, itemId, setSelectedOption) => {
    e.stopPropagation(); // Prevent event bubbling
    setSelectedOption((prevSelected) => {
      if (!prevSelected || prevSelected.id !== selectedOption.id) return prevSelected;
      return {
        ...prevSelected,
        items: prevSelected.items.map((item) =>
          item.id === itemId ? { ...item, checked: !item.checked } : item
        ),
      };
    });
  };



  // console.log(selectedOption1, selectedOption2, selectedOption3, selectedOption4);

  const renderOption = (option, depth = 0, selectedOption, setSelectedOption) => (
    <li key={option.id} className={`pl-${depth * 4}`}>
      <div
        className="flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
        onClick={() => handleOptionClick(option, setSelectedOption)}
      >
        {option.items && option.items.length > 0 && (
          <span className={`w-4 h-4 mr-2 transition-transform ${selectedOption?.id === option.id ? 'rotate-90' : ''}`}>
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </span>
        )}
        <span className={`flex-grow ${selectedOption?.id === option.id ? 'font-medium' : ''}`}>
          {option.label}
        </span>
        {selectedOption?.id === option.id && !option.items && (
          <span className="w-4 h-4 ml-2 text-indigo-600">
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </span>
        )}
      </div>
      {selectedOption?.id === option.id && option.items && (
        <ul className="ml-4">
          {option.items.map((item) => (
            <li key={item.id} className="flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">
              <input
                type="checkbox"
                checked={selectedOption.items.find((i) => i.id === item.id)?.checked || false}
                onChange={(e) => handleNestedOptionClick(e, selectedOption, item.id, setSelectedOption)}
                className="mr-2"
              />
              <span>{item.label}</span>
              {selectedOption.items.find((i) => i.id === item.id)?.checked && (
                <span className="w-4 h-4 ml-auto text-indigo-600">
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );






  console.log(selectedStaff);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectSalaryType, setSelectSalaryType] = useState("Per Month");
  const [selectSalaryStructure, setSelectSalaryStructure] = useState("");
  const [totalCTC, setTotalCTC] = useState(0);

  const [isOpenAllowance, setIsOpenAllowance] = useState(false);
  const [isOpenDeduction, setIsOpenDeduction] = useState(false);

  const [isModalAllowanceOpen, setIsModalAllowanceOpen] = useState(false);
  const [isModalDeductionOpen, setIsModalDeductionOpen] = useState(false);
  const [searchAllowance, setSearchAllowance] = useState('');
  const [searchDeduction, setSearchDeduction] = useState('');
  const [customAllowance, setCustomAllowance] = useState('');
  const [customDeduction, setCustomDeduction] = useState('');
  const [allowances, setAllowances] = useState([
    "Basic",
    "HRA",
    "Dearness Allowance",
    "Accommodation and Food",
    "Bonus and Incentives",
    "Cash Allowance",
    "CCA",
    "Children Education Allowance",
    "Conveyance Allowance",
    "Distance Allowance",
    "Education Allowance",
    "Entertainment Allowance",
    "Fuel Allowance",
    "Helper Allowance",
    "Hill Allowance",
    "Internet Allowance",
    "Laptop Allowance",
    "Leave Encashment",
    "LTA",
    "Management Allowance",
    "Meal Allowance",
    "Medical Allowance",
    "Mediclaim & Insurance",
    "Night Shift Allowance",
    "Other Allowance",
    "Personal Allowance",
    "Phone Allowance",
    "Project Allowance",
    "Paid Leave Allowance",
    "Admin Allowance",
    "Driver Allowance",
    "Long Service Allowance",
    "Gratuity Earned",
    "Washing Allowance",
    "Warden Allowance",
    "Uniform Allowance",
    "Underground Allowance",
    "Travel Allowance",
    "Refreshment Allowance",
    "Servant Allowance",
    "Shift Allowance",
    "Site Allowance",
    "Special Allowance",
    "Special Compensatory Allowance",
    "Stationary Allowance",
    "Statutory Bonus",
    "Supervisor Allowance",
    "Telephone & Internet Reimbursement",
    "Transport Allowance"
  ]);
  const [deductions, setDeductions] = useState([
    "Medical Insurance Premium",
    "Food Deduction",
    "Benevolent Fund",
    "Term Insurance",
    "Group Accidental Policy & WC",
    "Gratuity",
    "Statutory Bonus Deduction",
    "Security Deposit",
    "Uniform Deduction",
    "Transport Charges",
    "Miscellaneous Deduction"
  ]);

  const [selectedAllowance, setSelectedAllowance] = useState(() =>
    selectedStaff?.staffDetails?.Earning?.map(({ heads }) => heads) || []
  );

  const [selectedDeduction, setSelectedDeduction] = useState(() =>
    selectedStaff?.staffDetails?.Deduction?.map(({ heads }) => heads) || []
  );


  const [calEarning, setCalEarning] = useState([]);
  const [calCompliances, setCalCompliances] = useState([]);
  const [calDeductions, setCalDeductions] = useState([]);

  const handleChange = (type, name, value, field) => {
    const setData = type === "earnings"
      ? setCalEarning
      : type === "compliances"
        ? setCalCompliances
        : setCalDeductions;

    setData(prev => {
      const existingItem = prev.find(item => item.name === name); // Check if the item already exists

      if (existingItem) {
        // If the item exists, update it
        return prev.map(item =>
          item.name === name
            ? { ...item, [field]: field === "amount" ? Number(value) : value }
            : item
        );
      } else {
        // If the item does not exist, add a new item
        const newItem = {
          name,
          [field]: field === "amount" ? Number(value) : value,
        };
        return [...prev, newItem]; // Add the new item to the array
      }
    });
  };

  const allowanceDropdownRef = useRef(null);
  const deductionDropdownRef = useRef(null);
  const searchInputAllowanceRef = useRef(null);
  const searchInputDeductionRef = useRef(null);

  const filteredAllowances = allowances.filter(allowance =>
    allowance.toLowerCase().includes(searchAllowance.toLowerCase())
  );
  const filteredDeductions = deductions.filter(deduction =>
    deduction.toLowerCase().includes(searchDeduction.toLowerCase())
  );

  const calculateCheckedItemsTotal = (calEarning = [], selectedOption, percentage = 100) => {
    // Extract checked items' labels from `selectedOption.items` if available
    const checkedItemIds = (selectedOption?.items || [])
      ?.filter(item => item?.checked) // Only include items where `checked` is true
      ?.map(item => item?.label?.toLowerCase()); // Get the labels of checked items


    // Filter `calEarning` to include only items with IDs that are in `checkedItemIds`
    const filteredEarnings = calEarning?.filter(item => checkedItemIds?.includes(item?.name?.toLowerCase()));

    // Calculate the total with the percentage applied
    const total = filteredEarnings?.reduce((sum, item) => {
      return sum + ((parseFloat(item?.amount) || 0) * (percentage / 100));
    }, 0);

    return total;
  };

  const calculateCTC = (earnings = [], compliances = [], deductions = []) => {
    const sumAmounts = (arr) => arr.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0);
    const totalEarnings = sumAmounts(earnings);
    let totalCTC;

    const calculateCompliances = (arr, percentage) =>
      arr.reduce((total, item) => total + (parseFloat(item.amount) * (percentage / 100) || 0), 0);

    let totalOtherCompliances = 0;

    // Ensure `selectedOption1` has items and a valid label before calculating
    if (selectedOption1?.label && selectedOption1?.label !== "None" && Array.isArray(selectedOption1.items)) {
      setCalEmployerPF(calculateCheckedItemsTotal(calEarning, selectedOption1, 12))
      totalOtherCompliances = calculateCheckedItemsTotal(calEarning, selectedOption1, 12);
    }
    if (selectedOption2?.label && selectedOption2?.label !== "None" && Array.isArray(selectedOption2.items)) {
      setCalEmployerESI(calculateCheckedItemsTotal(calEarning, selectedOption2, 3.25))
      totalOtherCompliances = totalOtherCompliances + calculateCheckedItemsTotal(calEarning, selectedOption2, 3.25);
    }
    if (selectedOption3?.label && selectedOption3?.label !== "None" && Array.isArray(selectedOption3.items)) {
      setCalEmployeePF(calculateCheckedItemsTotal(calEarning, selectedOption3, 12))
      totalOtherCompliances = totalOtherCompliances + calculateCheckedItemsTotal(calEarning, selectedOption3, 12);
    }
    if (selectedOption4?.label && selectedOption4?.label !== "None" && Array.isArray(selectedOption4.items)) {
      setCalEmployeeESI(calculateCheckedItemsTotal(calEarning, selectedOption4, 3.25))
      totalOtherCompliances = totalOtherCompliances + calculateCheckedItemsTotal(calEarning, selectedOption4, 0.75);
    }

    const pfCompliance = compliances.find(compliance => compliance.name === "PF EDLI & Admin Charges");

    if (pfCompliance) {
      console.log(compliances);
      const otherCompliances = totalOtherCompliances;
      if (compliances[0]?.calculation === "None") {
        setEmployerPFEDLIAndAdminCharges(0)
        totalOtherCompliances = otherCompliances;
      }
      else {
        setEmployerPFEDLIAndAdminCharges(totalEarnings * (1 / 100))
        totalOtherCompliances = otherCompliances + totalEarnings * (1 / 100);
      }
    }



    totalCTC = totalEarnings + totalOtherCompliances;

    return parseFloat(totalCTC).toFixed(2);
  };

  console.log(totalCTC);
  useEffect(() => {
    setTotalCTC(calculateCTC(calEarning, calCompliances, calDeductions))
  }, [calEarning, calCompliances, calDeductions, selectedOption1, selectedOption2, selectedOption3, selectedOption4])


  // useEffect(() => {
  //   if (includeEmployerPF) {
  //     setTotalCTC(Number(totalCTC) + Number(calculateCheckedItemsTotal(calEarning, selectedOption1, 12)))

  //   }
  //   else {
  //     setTotalCTC(totalCTC - calculateCheckedItemsTotal(calEarning, selectedOption1, 12))
  //   }
  // }, [includeEmployerPF])

  // useEffect(() => {
  //   if (includeEmployerESI) {
  //     setTotalCTC(totalCTC + calculateCheckedItemsTotal(calEarning, selectedOption2, 3.25)
  //     )
  //   }
  //   else {
  //     setTotalCTC(totalCTC - calculateCheckedItemsTotal(calEarning, selectedOption2, 3.25))
  //   }
  // }, [includeEmployerESI])
  // useEffect(() => {
  //   if (includeEmployerLWF) {
  //     setTotalCTC(Number(totalCTC) + Number(statesLWF.find(state => state.name === stateName)?.employeelwf) + Number(statesLWF.find(state => state.name === stateName)?.employerlwf))
  //   }
  //   else {
  //     setTotalCTC(Number(totalCTC) + Number(statesLWF.find(state => state.name === stateName)?.employeelwf) + Number(statesLWF.find(state => state.name === stateName)?.employerlwf))
  //   }
  // }, [includeEmployerLWF])

  useEffect(() => {
    function handleClickOutside(event) {
      if ((allowanceDropdownRef.current && !allowanceDropdownRef.current.contains(event.target))) {
        setIsOpenAllowance(false);
      }
      if (deductionDropdownRef.current && !deductionDropdownRef.current.contains(event.target)) {
        setIsOpenDeduction(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  // console.log(calCompliances, calDeductions, calEarning);

  useEffect(() => {
    if (isOpenAllowance && searchInputAllowanceRef.current) {
      searchInputAllowanceRef.current.focus();
    }
  }, [isOpenAllowance]);
  useEffect(() => {
    if (isOpenDeduction && searchInputDeductionRef.current) {
      searchInputDeductionRef.current.focus();
    }
  }, [isOpenDeduction]);


  const handleAddCustomAllowance = () => {
    if (customAllowance.trim() !== '' && !allowances.includes(customAllowance.trim())) {
      setAllowances(prevAllowances => [...prevAllowances, customAllowance.trim()]);
      setSelectedAllowance((prev) => [...prev, customAllowance])
      setCustomAllowance('');
      setIsModalAllowanceOpen(false);
      setIsOpenAllowance(true);
    }
  };
  const handleAllCustomDeduction = () => {
    if (customDeduction.trim() !== '' && !deductions.includes(customDeduction.trim())) {
      setDeductions(prevDeductions => [...prevDeductions, customDeduction.trim()]);
      setSelectedDeduction((prev) => [...prev, customDeduction])
      setCustomDeduction('');
      setIsModalDeductionOpen(false);
      setIsOpenDeduction(true);
    }
  };


  // Format the selected month to display as "Month, Year"
  const formatMonthYear = (value) => {
    const [year, month] = value.split("-");
    const date = new Date(year, month - 1); // JS months are 0-indexed
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  // Initialize with the current month and year in YYYY-MM format
  useEffect(() => {
    const date = new Date();
    const formattedMonth = date.toISOString().slice(0, 7); // "YYYY-MM"
    setSelectedMonth(formattedMonth);
  }, []);




  const [stateid, setstateid] = useState(0);
  const [stateName, setstateName] = useState("");
  const [toggleButton, settoggleButton] = useState({
    addAllowances1: false,
    Employer_PF_Contribution: false,
    Employer_PF_Contribution2: false,
    Employer_ESI_Contribution: false,
    Employer_ESI_Contributio2: false,
    addAllowances2: false,
  });

  const handletoggleButton = (button) => {
    settoggleButton((prev) => ({
      ...prev,
      [button]: !prev[button], // Toggle the boolean value
    }));
  };

  console.log(selectedStaff);

  async function createORUpdateSalaryDetails(e) {
    const data = {
      effective_date: selectedMonth,
      salary_type: selectSalaryType,
      ctc_amount: Number(totalCTC),
      employer_pf: Number(calEmployerPF),
      employer_esi: Number(calEmployerESI),
      employee_pf: Number(calEmployeePF),
      employee_esi: Number(calEmployeeESI),
      employer_lwf: Number(calCompliances?.find(item => item?.name === "Employer LWF")?.calculation),
      employee_lwf: Number(calCompliances?.find(item => item?.name === "Employee LWF")?.calculation),
      earnings: calEarning?.map((item) => ({ heads: item?.name, calculation: item?.calculation, amount: item?.amount })),
      deductions: calDeductions?.map((item) => ({ heads: item?.name, calculation: item?.calculation, amount: item?.amount })),
    };
    console.log(data);
    try {
      const response = await fetch(
        `${baseUrl}salary`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data, staffId: selectedStaff?.staffDetails?.id }),
        }
      );

      console.log("Response from backend:", response);

      if (response.ok) {  // Changed to response.ok to handle all 2xx responses
        const result = await response.json();
        console.log("Response data:", result);

        // Show success toast and close modal
        openToast("Salary details successfully updated or created", "success");
      }
      else {
        // Show error toast if response status is not 2xx
        openToast("An error occurred while adding or updating Salary", "error");
      }
    } catch (error) {
      console.error("Error submitting Salary:", error);
      openToast("An error occurred while adding or updating Salary", "error");
    }
  }
  async function createNewEarningField(heads) {

    const data = {};
    console.log(heads);
    const response = await fetch(baseUrl + "earnings/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        staffId: selectedStaff?.staffDetails?.id,
        heads: heads
      }) // send the formatted data
    });

    console.log(response);

    if (response.status === 201) {
      const result = await response.json()
      console.log(result);
      // alert("edit Custom Field Successfully");
    } else {
      // alert("An error occurred");
    }
  }
  async function createNewDeductionField(heads) {

    const data = {};
    const response = await fetch(baseUrl + "deduction/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        staffId: selectedStaff?.staffDetails?.id,
        heads: heads
      }) // send the formatted data
    });

    console.log(response);

    if (response.status === 201) {
      const result = await response.json()
      console.log(result.data);
      // alert("edit Custom Field Successfully");
    } else {
      // alert("An error occurred");
    }
  }

  console.log(calEarning, calCompliances, calDeductions);

  return (
    <div className="salary-details layout   w-full  pt-[20px]      flex flex-col">
      <div className="flex items-center justify-between  xl:pb-6  ">
        <h1 className="  font-medium ">
          Salary Details Import Settings
        </h1>
        <div className="mt-2 xl:mt-0">

          <button onClick={() => { createORUpdateSalaryDetails() }} className="second-btn">
            Update
          </button>
        </div>
      </div>

      <div className="flex justify-between whitespace-normal flex-wrap gap-[10px]">
        <div className="xl:basis-1/5 lg:basis-5/12 md:basis-5/12 sm:basis-5/12 basis-full">
          <label className="text-[14px]">Effective Date of Change</label><br />
          <input value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} type='month' className="mt-[5px]   border border-[#D9D9D9] text-[14px] bg-white  p-1 rounded-md focus:outline-none w-full" />
        </div>
        <div className="xl:basis-1/5 lg:basis-5/12 md:basis-5/12 sm:basis-5/12 basis-full	">
          <label className="text-[14px]">Salary Type</label><br />
          <select value={selectSalaryType} onChange={(e) => setSelectSalaryType(e.target.value)} className="mt-[5px]  text-[15px]  border border-[#D9D9D9] bg-white p-1  rounded-md focus:outline-none w-full">
            <option value={"Per Month"}>
              Per Month
            </option>
            <option value={"Per Day"}>
              Per Day
            </option>
            <option value={"Per Hour"}>
              Per Hour
            </option>
          </select>
        </div>
        <div className="xl:basis-1/5 lg:basis-5/12 md:basis-5/12 sm:basis-5/12 basis-full">
          <label className="text-[14px]">Salary Structure
          </label><br />
          <select value={selectSalaryStructure} onChange={(e) => { setSelectSalaryStructure(e.target.value) }} className="mt-[5px] text-[15px]  border border-[#D9D9D9] bg-white p-1  rounded-md focus:outline-none w-full">
            <option value={"Salary Box Provided Breakdown"}>
              Salary Box Provided Breakdown
            </option>
            <option value={"Custom"}>
              Custom
            </option>

          </select>
        </div>
        <div className="xl:basis-1/5 lg:basis-5/12 md:basis-5/12 sm:basis-5/12 basis-full">
          <label className="text-[14px]">CTC Amount</label><br />
          <div className="relative">
            <span className="absolute top-[10px] left-[4px]">₹</span>
            <input disabled={true} value={totalCTC} onChange={(e) => setTotalCTC(e.target.value)} type="number" placeholder="Enter Amount" className="mt-[5px] text-[14px] pl-[20px]   border border-[#D9D9D9] bg-white p-1  rounded-md focus:outline-none w-full" />
          </div>
        </div>


      </div>

      {/*--Earnings Part--*/}
      <div className="">
        <h1 className="bg-[#fff] shadow-cs text-[13px] xl:text-[14px] rounded-md font-normal mt-[20px] p-[10px]">Earnings</h1>
        <div className="flex xl:mt-12 mt-[20px] xl:ml-16 ml-0">
          <div className="w-[100%] xl:w-[50%] space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-[16px] font-semibold">Heads</span>
              <h1 className="text-[16px] font-semibold">Calculation</h1>
            </div>

            {selectedAllowance?.map((allowance, idx) => (
              <div className="flex items-center justify-between" key={allowance}>
                <span className="text-[13px] xl:text-[14px] font-normal">{allowance}</span>
                <select
                  value={calEarning.find(item => item.name === allowance)?.calculation || ""}
                  onChange={(e) => handleChange("earnings", allowance, e.target.value, "calculation")}
                  className="px-4 py-2 border border-[#D9D9D9] bg-white text-sm pl-[8px] pr-[6px] rounded-md focus:outline-none w-[160px]"
                >
                  <option value="On Attendance">On Attendance</option>
                  <option value="Flat Rate">Flat Rate</option>
                  {/* Add more options if needed */}
                </select>
              </div>
            ))}

            {/* Add Allowances Button */}
            <div className="flex items-center justify-between relative">
              <div className="relative w-64" ref={allowanceDropdownRef}>
                <button
                  className="w-full text-left rounded-md shadow-sm focus:outline-none"
                  onClick={() => setIsOpenAllowance(!isOpenAllowance)}
                  aria-haspopup="true"
                  aria-expanded={isOpenAllowance}
                >
                  + Add Allowances
                </button>
                {isOpenAllowance && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={searchAllowance}
                      onChange={(e) => setSearchAllowance(e.target.value)}
                    />
                    <ul className="max-h-60 overflow-auto" role="listbox">
                      {filteredAllowances.map((allowance, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setIsOpenAllowance(false);
                            console.log(allowance);
                            if (!selectedAllowance.includes(allowance)) {
                              createNewEarningField(allowance);
                              setSelectedAllowance(prev => [...prev, allowance]);
                            }
                          }}
                          role="option"
                        >
                          {allowance}
                        </li>
                      ))}
                    </ul>
                    <div className="p-2 border-t border-gray-300">
                      <button
                        className="w-full px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md"
                        onClick={() => {
                          setIsModalAllowanceOpen(true);
                          setIsOpenAllowance(false);
                        }}
                      >
                        + Add Custom Allowance
                      </button>
                    </div>
                  </div>
                )}
                {isModalAllowanceOpen && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                      <h2 className="text-xl font-bold mb-4">Add Custom Allowance</h2>
                      <input
                        type="text"
                        placeholder="Enter Custom Allowance Name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
                        value={customAllowance}
                        onChange={(e) => {
                          setCustomAllowance(e.target.value)
                        }}
                      />
                      <div className="flex justify-end space-x-2">
                        <button
                          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                          onClick={() => setIsModalAllowanceOpen(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                          onClick={handleAddCustomAllowance}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-[100%] xl:w-[50%] space-y-[18px] flex items-end justify-start flex-col">
            <div className="flex items-center justify-between">
              <span className="text-[16px] font-semibold">Amount</span>
            </div>

            {selectedAllowance?.map((allowance) => (
              <div className="flex items-center justify-between" key={allowance}>
                <div className="relative">
                  <span className="absolute top-[6px] left-[4px]">₹</span>
                  <input
                    value={calEarning.find(item => item.name === allowance)?.amount || ""}
                    onChange={(e) => handleChange("earnings", allowance, e.target.value, "amount")}
                    type="number"
                    placeholder="Enter Amount"
                    className="px-4 py-2 w-[160px] border border-[#D9D9D9] bg-white text-sm pl-[16px] rounded-md pr-[6px] focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*--Compliances Part--*/}

      <div className=" xl:mt-12 mt-[0px]" >
        <h1 className="bg-[#fff] shadow-cs  rounded-md   text-[13px] xl:text-[14px] font-normal mt-[20px] p-[10px]">
          Compliances
        </h1>

        <div className="flex xl:mt-12 mt-[20px] xl:ml-16 ml-0 gap-[30px] flex-col xl:flex-row lg:flex-row md:flex-row ">
          <div className="xl:w-[50%] w-[100%] space-y-5">
            <div className="flex items-center  justify-between   ">
              <span className="text-[13px] xl:text-[13px] font-semibold">
                Employer Contributions
              </span>
              <h1 className="text-[13px] xl:text-[13px] font-semibold">Select Components</h1>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[13px] xl:text-[14px] font-normal">Employer PF</span>
              <div className="relative w-40">
                <button
                  onClick={toggleDropdown1}
                  className="flex items-center justify-between w-full px-4 py-2 pl-[8px] pr-[6px] text-sm font-medium text-left bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  aria-expanded={isOpen1}
                >
                  <span>{selectedOption1?.label || 'Select an option'}</span>
                  <span className="w-5 h-5 ml-2 -mr-1 text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  </span>
                </button>

                {isOpen1 && (
                  <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
                    <ul className="py-1 overflow-auto text-base rounded-md max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {Array.isArray(options1) && options1?.map(option => renderOption(option, 0, selectedOption1, setSelectedOption1, setOptions1))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Dropdown 2: PF EDLI & Admin Charges */}
            <div className="flex items-center justify-between">
              <span className="text-[13px] xl:text-[14px] font-normal">PF EDLI & Admin Charges</span>
              <select
                className="px-4 py-2 text-sm w-[160px] border border-[#D9D9D9] bg-white font-medium  pl-[8px] pr-[6px] rounded-md focus:outline-none"
                onChange={(e) => handleChange("compliances", "PF EDLI & Admin Charges", e.target.value, "calculation")}
              >
                <option value={"None"}>None</option>
                <option value={"1% Variable"}>1% Variable</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[13px] xl:text-[14px] font-normal">Employer ESI</span>
              <div className="relative w-40">
                <button
                  onClick={toggleDropdown2}
                  className="flex items-center justify-between w-full px-4 py-2 pl-[8px] pr-[6px] text-sm font-medium text-left bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  aria-expanded={isOpen2}
                >
                  <span>{selectedOption2?.label || 'Select an option'}</span>
                  <span className="w-5 h-5 ml-2 -mr-1 text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  </span>
                </button>

                {isOpen2 && (
                  <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
                    <ul className="py-1 overflow-auto text-base rounded-md max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {Array.isArray(options2) && options2?.map(option => renderOption(option, 0, selectedOption2, setSelectedOption2, setOptions2))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[13px] xl:text-[14px] font-normal">Employer LWF</span>
              {/* <StateSelect
                value={stateid}
                className="px-4 py-2 border border-[#D9D9D9] bg-white text-sm pl-[8px] pr-[6px] rounded-md focus:outline-none w-[160px]"
                countryid={101}
                onChange={(e) => {
                  setstateid(e.id)
                  // console.log(statesLWF);
                  handleChange("compliances", "Employer LWF", e.name, "state")
                  handleChange("compliances", "Employer LWF", statesLWF?.filter((state) => state.state === e.name)[0]?.employerlwf, "calculation")
                  handleChange("compliances", "Employee LWF", e.name, "state")
                  handleChange("compliances", "Employee LWF", statesLWF?.filter((state) => state.state === e.name)[0]?.employeelwf, "calculation")
                }}
                placeHolder="Select State"
              /> */}
              <select value={stateName} onChange={(e) => {
                setstateName(e.target.value)
                handleChange("compliances", "Employer LWF", e.target.value, "state")
                handleChange("compliances", "Employer LWF", statesLWF?.filter((state) => state.state === e.target.value)[0]?.employerlwf, "calculation")
                handleChange("compliances", "Employee LWF", e.target.value, "state")
                handleChange("compliances", "Employee LWF", statesLWF?.filter((state) => state.state === e.target.value)[0]?.employeelwf, "calculation")
              }} placeHolder="Select State"
                className="px-4 py-2 border border-[#D9D9D9] bg-white text-sm pl-[8px] pr-[6px] rounded-md focus:outline-none w-[160px]"
              >
                {statesLWF?.map((state) => (
                  <option value={state.state}>{state.state}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="xl:w-[50%] w-[100%] space-y-5 ">
            <div className="flex items-center  justify-between   ">
              <span className="text-[13px] xl:text-[13px] font-semibold">
                Included in CTC
              </span>
              <h1 className="text-[13px] xl:text-[13px] font-semibold">Amount</h1>
            </div>

            {["Employer PF", "PF EDLI & Admin Charges", "Employer ESI", "Employer LWF"].map((label, index) => (
              <div key={index} className="flex items-center justify-between">
                {index === 1 ? (
                  <>
                    <h3> {includeEmployerPF ? "Yes" : "No"}</h3>
                    <div className="relative">
                      <span className="absolute top-[6px] left-[4px]">₹</span>
                      <input value={calEmployerPFEDLIAndAdminCharges} disabled={true} onChange={(e) => handleChange("compliances", label, e.target.value, "amount")}
                        type="number" placeholder="Enter Amount" className="px-4 py-2 w-[160px] border border-[#D9D9D9] bg-white text-sm pl-[16px] rounded-md pr-[6px] focus:outline-none" />
                    </div>
                  </>
                ) : (
                  <>
                    <input type="checkbox" value={
                      index === 0 ? includeEmployerPF :
                        index === 2 ? includeEmployerESI :
                          index === 3 ? includeEmployerLWF : ""
                    }
                      onChange={(e) => index === 0 ? setIncludeEmployerPF(!includeEmployerPF) : index === 2 ? setIncludeEmployerESI(!includeEmployerESI) : index === 3 ? setIncludeEmployerLWF(!includeEmployerLWF) : ""

                      } />
                    <div className="relative">
                      <span className="absolute top-[6px] left-[4px]">₹</span>
                      <input
                        value={
                          index === 0 ? calEmployerPF :
                            index === 1 ? calEmployerPFEDLIAndAdminCharges :
                              index === 2 ? calEmployerESI : calCompliances?.find(({ name }) => name === label)?.calculation
                        }
                        disabled={true}
                        type="number"
                        placeholder="Enter Amount"
                        className="px-4 py-2 w-[160px] text-sm border border-[#D9D9D9] bg-white  pl-[16x] rounded-md pr-[6px] focus:outline-none"
                        onChange={(e) => handleChange("compliances", label, e.target.value, "amount")}
                      />
                    </div>
                  </>
                )}
              </div>
            ))}

          </div>
        </div>

        <div className="flex xl:mt-12 mt-[20px] xl:ml-16 ml-0 gap-[30px]">
          {/* Employee Contributions Section */}
          <div className="xl:w-[50%] w-[100%] space-y-5 ml-0 gap-[30px]">
            <div className="flex items-center justify-between">
              <span className="text-[13px] xl:text-[13px] font-semibold">Employee Contributions</span>
              <h1 className="text-[13px] xl:text-[13px] font-semibold">Calculation</h1>
            </div>

            {/* Employee PF Dropdown */}
            <div className="flex items-center justify-between">
              <span className="text-[13px] xl:text-[14px] font-normal">Employee PF</span>
              <div className="relative w-40">
                <button
                  onClick={toggleDropdown3}
                  className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  aria-expanded={isOpen3}
                >
                  <span>{selectedOption3?.label || 'Select an option'}</span>
                  <span className="w-5 h-5 ml-2 -mr-1 text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  </span>
                </button>

                {isOpen3 && (
                  <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
                    <ul className="py-1 overflow-auto text-base rounded-md max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {Array.isArray(options3) && options3?.map(option => renderOption(option, 0, selectedOption3, setSelectedOption3, setOptions3))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Employee ESI Dropdown */}
            <div className="flex items-center justify-between">
              <span className="text-[13px] xl:text-[14px] font-normal">Employee ESI</span>
              <div className="relative w-40">
                <button
                  onClick={toggleDropdown4}
                  className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  aria-expanded={isOpen4}
                >
                  <span>{selectedOption4?.label || 'Select an option'}</span>
                  <span className="w-5 h-5 ml-2 -mr-1 text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  </span>
                </button>

                {isOpen4 && (
                  <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
                    <ul className="py-1 overflow-auto text-base rounded-md max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {Array.isArray(options4) && options4?.map(option => renderOption(option, 0, selectedOption4, setSelectedOption4, setOptions4))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[13px] xl:text-[14px] font-normal">Professional Tax</span>
              <StateSelect
                className="px-4 py-2 border border-[#D9D9D9] bg-white text-sm pl-[8px] pr-[6px] rounded-md focus:outline-none w-[160px]"
                countryid={101}
                onChange={(e) => {
                  setstateid(e.id);
                  handleChange("compliances", "Professional Tax", e.name, "state"); // Track state changes if needed
                }}
                placeHolder="Select State"
              />
            </div>

            {/* Employee LWF Dropdown */}
            <div className="flex items-center justify-between">
              <span className="text-[13px] xl:text-[14px] font-normal">Employee LWF</span>
              {/* <StateSelect
                value={stateid}
                className="px-4 py-2 border border-[#D9D9D9] bg-white text-sm pl-[8px] pr-[6px] rounded-md focus:outline-none w-[160px]"
                countryid={101}
                onChange={(e) => {
                  setstateid(e.id);
                  handleChange("compliances", "Employer LWF", e.name, "state")
                  handleChange("compliances", "Employer LWF", statesLWF?.filter((state) => state.state === e.name)[0]?.employerlwf, "calculation")
                  handleChange("compliances", "Employee LWF", e.name, "state")
                  handleChange("compliances", "Employee LWF", statesLWF?.filter((state) => state.state === e.name)[0]?.employeelwf, "calculation")

                }}
                placeHolder="Select State"
              /> */}
              <select value={stateName} onChange={(e) => {
                setstateName(e.target.value)
                handleChange("compliances", "Employer LWF", e.target.value, "state")
                handleChange("compliances", "Employer LWF", statesLWF?.filter((state) => state.state === e.target.value)[0]?.employerlwf, "calculation")
                handleChange("compliances", "Employee LWF", e.target.value, "state")
                handleChange("compliances", "Employee LWF", statesLWF?.filter((state) => state.state === e.target.value)[0]?.employeelwf, "calculation")
              }} placeHolder="Select State"
                className="px-4 py-2 border border-[#D9D9D9] bg-white text-sm pl-[8px] pr-[6px] rounded-md focus:outline-none w-[160px]"
              >
                {statesLWF?.map((state) => (
                  <option value={state.state}>{state.state}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Amount Section */}
          <div className="xl:w-[50%] w-[100%] space-y-5">
            <div className="flex items-center justify-end">
              <h1 className="text-[13px] xl:text-[13px] font-semibold">Amount</h1>
            </div>

            {/* Input Fields for Amounts */}
            {[...Array(4)].map((_, index) => (
              <div className={"flex items-center justify-end " + (index === 2 && "invisible")} key={index}>
                <div className="relative">
                  <span className="absolute top-[6px] left-[4px]">₹</span>
                  <input
                    value={
                      index === 0 ? calEmployeePF :
                        index === 1 ? calEmployeeESI : index === 3 ?
                          calCompliances?.find(({ name }) => name === "Employee LWF")?.calculation
                          : ""
                    }
                    disabled={true}
                    type="number"
                    placeholder="Enter Amount"
                    className="px-4 py-2 w-[160px] border border-[#D9D9D9] bg-white text-sm pl-[16px]  rounded-md pr-[6px] focus:outline-none"
                    onChange={(e) => handleChange("deductions", `Amount ${index + 1}`, e.target.value, "amount")}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>

      {/*--Deductions Part--*/}
      <div className="">
        <h1 className="bg-[#fff] shadow-cs rounded-md  text-[13px] xl:text-[14px] font-normal mt-[20px] p-[10px]">Deductions</h1>
        <div className="flex xl:mt-12 mt-[20px] xl:ml-16 ml-0 ">
          <div className="w-[100%] xl:w-[50%] space-y-5 ">
            <div className="flex items-center justify-between ">
              <span className="text-[16px] font-semibold">Heads</span>
              <h1 className="text-[16px] font-semibold">Calculation</h1>
            </div>

            {selectedDeduction.length === 0 && (
              <div className="flex items-center justify-between">No Deduction data</div>
            )}
            {selectedDeduction.length > 0 && selectedDeduction?.map((deduction) => <div key={deduction} className="flex items-center justify-between">
              <span className="text-[13px] xl:text-[14px] font-normal">{deduction}</span>
              <select
                value={calDeductions.find(item => item.name === deduction)?.calculation || ""}
                onChange={(e) => handleChange("deduction", deduction, e.target.value, "calculation")}
                name=""
                id=""
                className=" px-4 py-2 border border-[#D9D9D9] bg-white text-sm pl-[8px] pr-[6px] rounded-md focus:outline-none w-[160px]"
              >
                <option value="On Attendance">On Attendance</option>
                <option value="Flat Rate">Flat Rate</option>
              </select>
            </div>
            )}
            {/* <div className="flex items-center justify-between">
              <span className="        text-[13px] xl:text-[14px] font-normal">BASIC</span>
              <select
                name=""
                id=""
                className=" px-4 py-2 border border-[#D9D9D9] bg-white text-sm pl-[8px] pr-[6px] rounded-md focus:outline-none w-[160px]"
              >
                <option value="On Attendance">On Attendance</option>
              </select>
            </div>

            <div className="flex items-center justify-between   ">
              <span className="        text-[13px] xl:text-[14px] font-normal
">HRA</span>
              <select
                name=""
                id=""
                className="h-[25px] w-[117px] border  border-[#D9D9D9] bg-white text-[10px] pl-4 rounded-md focus:outline-none"
              >
                <option value="On Attendance">On Attendance</option>
              </select>
            </div>

            <div className="flex items-center justify-between   ">
              <span className="        text-[13px] xl:text-[14px] font-normal
">
                Dearness Allowance
              </span>
              <select
                name=""
                id=""
                className=" px-4 py-2 border border-[#D9D9D9] bg-white text-sm pl-[8px] pr-[6px] rounded-md focus:outline-none w-[160px]"
              >
                <option value="On Attendance">On Attendance</option>
              </select>
            </div> */}

            <div className="flex items-center  justify-between relative ">
              <div className="relative w-64" ref={deductionDropdownRef}>
                <button
                  className="w-full text-left rounded-md shadow-sm focus:outline-none"
                  onClick={() => setIsOpenDeduction(!isOpenDeduction)}
                  aria-haspopup="true"
                  aria-expanded={isOpenDeduction}
                >
                  + Add Deductions
                </button>
                {isOpenDeduction && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    <>
                      <input
                        ref={searchInputDeductionRef}
                        type="text"
                        placeholder="Search"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={searchDeduction}
                        onChange={(e) => setSearchDeduction(e.target.value)}
                      />
                    </>
                    <ul className="max-h-60 overflow-auto" role="listbox">
                      {filteredDeductions.map((deduction) => (
                        <li
                          key={deduction}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            // console.log(`Selected: ${allowance}`);
                            setIsOpenDeduction(false);
                            createNewDeductionField(deduction);
                            if (!selectedDeduction.includes(deduction)) {
                              setSelectedDeduction(prev => [...prev, deduction])
                            }
                          }}
                          role="option"
                        >
                          {deduction}
                        </li>
                      ))}
                    </ul>
                    <div className="p-2 border-t border-gray-300">
                      <button
                        className="w-full px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md"
                        onClick={() => {
                          setIsModalDeductionOpen(true);
                          setIsOpenDeduction(false);
                        }}
                      >
                        + Add Custom Deduction
                      </button>
                    </div>
                  </div>
                )}

                {isModalDeductionOpen && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                      <h2 className="text-xl font-bold mb-4">Add Custom Deductions</h2>
                      <input
                        type="text"
                        placeholder="Enter Custom Deduction Name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
                        value={customDeduction}
                        onChange={(e) => {
                          setCustomDeduction(e.target.value)
                        }}
                      />
                      <div className="flex justify-end space-x-2">
                        <button
                          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                          onClick={() => setIsModalDeductionOpen(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                          onClick={handleAllCustomDeduction}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-[100%] xl:w-[50%] space-y-[18px] flex items-end justify-start flex-col">
            <div className="flex items-center justify-between ">
              <span className="text-[16px] font-semibold">Amount</span>
            </div>

            {selectedDeduction?.map((deduction) => <div key={deduction} className="flex items-center justify-between">
              <div className="relative">
                <span className="absolute top-[6px] left-[4px]">₹</span>
                <input value={calDeductions.find(item => item.name === deduction)?.amount || ""}
                  onChange={(e) => handleChange("deductions", deduction, e.target.value, "amount")}
                  type="number" placeholder="Enter Amount" className="px-4 py-2 w-[160px] border border-[#D9D9D9] bg-white text-sm pl-[16px] rounded-md pr-[6px] focus:outline-none" />
              </div>
            </div>)}
            {/* <div className="flex items-center justify-between">
              <div className="relative">
                <span className="absolute top-[6px] left-[4px]">₹</span>
                <input type="number" placeholder="Enter Amount" className="px-4 py-2 w-[160px] border border-[#D9D9D9] bg-white text-sm pl-[8px] rounded-md pr-[6px] focus:outline-none" />
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <div className="flex justify-between  bg-[#fff] shadow-cs rounded-md   text-[13px] xl:text-[14px] font-normal mt-[20px] p-[10px]">
        <h3 className="font-medium">Total CTC: -</h3>
        <h3 className="font-medium">₹ {totalCTC} /{selectSalaryType}</h3>
      </div>

      {/*--Scroll Pages--*/}
      <div className="xl:mt-14 mt-[20px]">
        <h1 className="text-center mb-[10px]">Showing 1-1 of 1 staff</h1>
        <div className="flex justify-center items-center gap-3">
          <button className="border border-[#27004a] rounded-mdtext-[#CFCFCF] p-[18px] text-center relative rounded-md  hover:bg-[#27004a] hover:text-white">
            <ArrowBackIosIcon className="absolute top-[6px] left-[10px]" />
          </button>
          <button className="border border-[#27004a] bg-[#27004a] rounded-mdtext-[#CFCFCF] p-[18px] text-center relative rounded-md">
            <span className="absolute top-[6px] left-[15px] text-white " >1</span>
          </button>
          <button className="border border-[#27004a] rounded-mdtext-[#CFCFCF] p-[18px] text-center relative rounded-md hover:bg-[#27004a] hover:text-white">
            <ArrowForwardIosIcon className="absolute top-[6px] left-[6px]" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditSalaryDetails