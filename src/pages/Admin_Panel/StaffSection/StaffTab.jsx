import React, { useEffect, useRef, useState } from "react";
import Search from "../../../Assets/Images/search.svg";
import Filter from "../../../Assets/Images/filter.svg";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../../Context/GlobalContext";
import ClipLoader from "react-spinners/ClipLoader";

const StaffTab = () => {
  const { baseUrl, setSelectedStaff } = useGlobalContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const [isLoading, setIsLoading] = useState(true);

  const [toggleDrop, setToggleDrop] = useState(false);
  const [staffStatus, setStaffStatus] = useState("All Staff");
  const [gender, setGender] = useState("Male");
  const [employeeType, setEmployeeType] = useState("All");
  const [selectedDepartmentName, setSelectedDepartmentName] = useState("");
  const [searchStaffName, setSearchStaffName] = useState("");
  const [departments, setDepartments] = useState([]);
  const [searchStaffMessage, setSearchStaffMessage] = useState(false);
  const dropdownRef = useRef(null);

  const staffDropDown = useRef(null);

  // function to filter the staff
  const FilterStaff = async () => {
    const queryParams = new URLSearchParams({
      status: staffStatus,
      gender: gender,
      type: employeeType,
    }).toString();
    setIsLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}staff/search-status?${queryParams}`
      );
      if (response.status === 200) {
        const result = await response.json();
        setStaffDetail(result);
      } else {
        console.log("error while fetching data");
        setStaffDetail([]);
      }
    } catch (error) {
      console.log(error);
      setStaffDetail([]);
    } finally {
      setIsLoading(false);
    }
  };

  function handledrop() {
    setToggleDrop(!toggleDrop);
  }

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Toggle function to show/hide dropdown
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const [staffDetail, setStaffDetail] = useState([]);
  const fetchRoles = async () => {
    const result = await fetch(baseUrl + "staff");
    console.log("reuslt---", result);
    setIsLoading(true);
    try {
      if (result.status == 200) {
        const res = await result.json();
        console.log(res);
        setStaffDetail(res);
        // console.log("---",res.name)
      } else {
        // openToast("An Error Occured")
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  //feature for searching the staff

  const fetchDepartments = async () => {
    try {
      const result = await fetch(baseUrl + "department");
      if (result.status == 200) {
        const res = await result.json();
        setDepartments(res.data);
      } else {
        console.log("failed to fetch department", result.status);
        setDepartments([]);
      }
    } catch (error) {
      console.log("error while fetching department", error);
      setDepartments([]);
    }
  };
  // handle search the staff
  const handleSearchStaff = async () => {
    const queryParams = new URLSearchParams();
    if (searchStaffName) queryParams.append("name", searchStaffName);
    if (selectedDepartmentName)
      queryParams.append("department_name", selectedDepartmentName);

    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}staff/search?${queryParams}`);
      console.log(response);
      console.log(response.status);
      if (response.status === 200) {
        const result = await response.json();
        setStaffDetail(result);
      } else {
        console.log("error while fetching staff");
      }
    } catch (error) {
      console.error("Error searching staff:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleFilterButtonClick = () => {
    FilterStaff();
    setDropdownOpen(false);
  };
  useEffect(() => {
    fetchRoles();
    fetchDepartments();
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleSearchStaff();
    }, 800); // Adjust the delay to 500ms

    return () => clearTimeout(debounceTimer);
  }, [searchStaffName, selectedDepartmentName]);
  // function to reset all filters
  const resetFilters = () => {
    console.log("Reset filters");
    setIsLoading(true);
    // Clear all filters
    setSearchStaffName("");
    setSelectedDepartmentName("");
    setStaffStatus("");
    setGender("");
    setEmployeeType("");

    // Fetch all staff data
    fetchRoles();
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
    if (staffDropDown.current && !staffDropDown.current.contains(e.target)) {
      setToggleDrop(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  return (
    <div className="staff-tab mt-[20px]">
      <div className="flex justify-between flex-col xl:flex-row lg:flex-col md:flex-col gap-[15px] lg:gap-[0px]">
        <div className="flex lg:gap-[20px]  flex-col gap-[10px] lg:flex lg:flex-row ">
          <div className="searching-input relative">
            <img src={Search} className="absolute left-2 top-3" />
            <input
              type="text"
              className="border rounded-md bg-[#F4F5F9] p-[8px] pl-[30px] w-[100%] lg:w-[225px] focus-visible:outline-none"
              placeholder="Search"
              value={searchStaffName}
              onChange={(e) => {
                setSearchStaffName(e.target.value);
              }}
            />
          </div>

          <select
            className="border rounded-md bg-[#F4F5F9] p-[8px] lg:w-[240px] w-[100%] focus-visible:outline-none text-sm"
            onChange={(e) => {
              setSelectedDepartmentName(e.target.value);
              handleSearchStaff(); // calling the searchStaff function here to prevent unnecessery API calls
            }}
          >
            {departments?.map((department) => (
              <option key={department?.name} value={department?.name}>
                {department?.department_name}
              </option>
            ))}
          </select>

          <div className="relative">
            <button
              className="flex gap-[10px] whitespace-nowrap justify-end items-center cursor-pointer"
              onClick={toggleDropdown}
            >
              <img
                src={Filter}
                className="w-[40px] h-[40px] bg-[#F4F5F9] rounded-full p-[10px]"
              />
              <h2 className="text-[14px] font-normal">More Filters</h2>
            </button>
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute w-[325px] mt-2 md:w-[400px] xl:w-[400px] lg:w-[400px] lg:left-[0px] p-[20px] bg-white border border-gray-200 rounded-md shadow-lg z-10"
              >
                <h2 className="border-b">More Filters</h2>
                <div className="flex gap-[10px] mt-2 items-center">
                  <label className="text-[13px] whitespace-nowrap w-[81px]">
                    Staff Status:
                  </label>
                  <select
                    className="border rounded-md bg-[#F4F5F9] p-[8px]  w-[100%] focus-visible:outline-none text-sm"
                    value={staffStatus}
                    onChange={(e) => setStaffStatus(e.target.value)}
                  >
                    <option>All Staff</option>
                    <option>Active</option>
                    <option>InActive</option>
                  </select>
                </div>
                <div className="flex gap-[10px] mt-2 items-center">
                  <label className="text-[13px] whitespace-nowrap w-[102px]">
                    Gender:
                  </label>
                  <select
                    className="border rounded-md bg-[#F4F5F9] p-[8px] w-full  focus-visible:outline-none text-sm"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Others</option>
                  </select>
                </div>
                <div className="flex gap-[10px] mt-2 items-center">
                  <label className="text-[13px] whitespace-nowrap w-[102px]">
                    Employee
                    <br /> Type:
                  </label>
                  <select
                    className="border rounded-md bg-[#F4F5F9] p-[8px] w-full  focus-visible:outline-none text-sm"
                    value={employeeType}
                    onChange={(e) => setEmployeeType(e.target.value)}
                  >
                    <option>All</option>
                    <option>Full Time</option>
                    <option>Permanent</option>
                    <option>Part Time</option>
                    <option>Consultant</option>
                    <option>Temporary</option>
                    <option>Probation</option>
                    <option>Contract</option>
                  </select>
                </div>

                <div className="flex w-[50%] mx-auto justify-between text-center mt-2">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                    }}
                    className="second-btn"
                  >
                    Close
                  </button>
                  <button
                    className="second-btn"
                    onClick={handleFilterButtonClick}
                  >
                    filter
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-[15px] justify-between lg:justify-start">
          {/* <button className='border border-1 pl-3 pr-3 rounded-md pt-2 pb-2 text-sm'>Update Staff</button> */}
          <div>
            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  onClick={handledrop}
                  className="inline-flex items-center w-full justify-center gap-x-1.5 rounded-md second-btn  text-sm  text-white shadow-sm"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  Add Staff
                  <svg
                    className="-mr-1 h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              {toggleDrop && (
                <div
                  ref={staffDropDown}
                  className="absolute right-0 z-10 mt-2 w-56 staff-page-res origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabindex="-1"
                >
                  <div className="py-1" role="none">
                    <Link
                      to="/add-one-staff"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-0"
                    >
                      Add One Staff
                    </Link>
                    <Link
                      to="#"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-1"
                    >
                      Add Mulitple Staff
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-[100%] p-0 h-[100%] overflow-y-auto flex rounded-md shadow overflow-x-auto border border-1 mt-4">
        <div className="bg-white">
          <table className="table-section w-full table-auto border border-[#dcdbdb] rounded-lg overflow-hidden border-collapse">
            <thead
              onClick={toggleAccordion}
              className='sticky bg-white set-shadow top-[-1px]  className="cursor-pointer  border border-gray-300 shadow-md"
               
'
            >
              <th className="border-r border-[#dbdbdb]">#</th>
              <th className="border-r border-[#dbdbdb]">Name</th>
              <th className="border-r border-[#dbdbdb]">Job Title</th>
              <th className="border-r border-[#dbdbdb]">Employee Id</th>
              <th className="border-r border-[#dbdbdb]">Employee Type</th>
              <th className="border-r border-[#dbdbdb]">Date of Joining</th>
              <th className="border-r border-[#dbdbdb]">Date of Birth</th>
              <th className="border-r border-[#dbdbdb]">Mobile Number</th>
              <th className="border-r border-[#dbdbdb]">Personal Email ID</th>
              <th className="border-r border-[#dbdbdb]">Marital Status</th>
              <th className="border-r border-[#dbdbdb]">Gender</th>
              <th className="border-r border-[#dbdbdb]">Current Address</th>
              <th className="border-r border-[#dbdbdb]">Aadhaar</th>
              <th className="border-r border-[#dbdbdb]">Pan</th>
              <th className="border-r border-[#dbdbdb]">Guardian Name</th>
              <th className="border-r border-[#dbdbdb]">
                Emergency Contact Name
              </th>
            </thead>
            <tbody>
              {isLoading && staffDetail?.length === 0 ? (
                <tr className="h-[100px]">
                  <td
                    colSpan="9"
                    className="text-center border-r border-[#dbdbdb] whitespace-nowrap text-gray-600 text-xl font-semibold py-4"
                  >
                    <ClipLoader color="#4A90E2" size={40} />
                  </td>
                </tr>
              ) : staffDetail && staffDetail.length > 0 ? (
                staffDetail?.map((staff, index) => (
                  <tr
                    key={index}
                    onClick={() => setSelectedStaff(staff)}
                    className="border"
                  >
                    <td className="border-r border-[#dbdbdb] p-[10px] whitespace-nowrap">
                      <input type="checkbox" />
                    </td>
                    <td className="border-r border-[#dbdbdb] p-[10px] whitespace-nowrap">
                      <Link
                        to={`/personal-detail/${staff.id}`}
                        className="text-[#8A25B0] font-medium"
                      >
                        {staff?.name}
                      </Link>
                    </td>
                    <td className="border-r border-[#dbdbdb] p-[10px] whitespace-nowrap">
                      {staff?.staffDetails?.job_title || "N/A"}
                    </td>
                    <td className="border-r border-[#dbdbdb] p-[10px] whitespace-nowrap">
                      N/A
                    </td>
                    <td className="border-r border-[#dbdbdb] p-[10px] whitespace-nowrap">
                      N/A
                    </td>
                    <td className="border-r border-[#dbdbdb] p-[10px] whitespace-nowrap">
                      {staff?.staffDetails?.date_of_joining
                        ? new Date(
                            staff?.staffDetails?.date_of_joining
                          ).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="border-r border-[#dbdbdb] p-[10px] whitespace-nowrap">
                      {staff?.date_of_birth
                        ? new Date(staff?.date_of_birth).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="border-r border-[#dbdbdb] p-[10px] whitespace-nowrap">
                      {staff?.mobile}
                    </td>
                    <td className="border-r border-[#dbdbdb] p-[10px] whitespace-nowrap">
                      {staff?.staffDetails?.official_email}
                    </td>
                    <td className="border-r border-[#dbdbdb] p-[10px] whitespace-nowrap">
                      {staff?.staffDetails?.gender || "N/A"}
                    </td>
                    <td className="border-r border-[#dbdbdb] p-[10px] whitespace-nowrap">
                      {staff?.staffDetails?.current_address || "N/A"}
                    </td>
                    <td className="border-r border-[#dbdbdb] p-[10px] whitespace-nowrap">
                      {staff?.staffDetails?.emergency_contact_name || "N/A"}
                    </td>
                    <td className="border-r border-[#dbdbdb] p-[10px] whitespace-nowrap">
                      {"N/A"}
                    </td>
                    <td className="border-r border-[#dbdbdb] p-[10px] whitespace-nowrap">
                      {"N/A"}
                    </td>
                    <td className="border-r border-[#dbdbdb] p-[10px] whitespace-nowrap">
                      {"N/A"}
                    </td>
                    <td className="border-r border-[#dbdbdb] p-[10px] whitespace-nowrap">
                      {"N/A"}
                    </td>
                    
                  </tr>
                ))
              ) : (
                // No Data State
                <tr className="h-[100px]">
                  <td
                    colSpan="9"
                    className="text-center text-red-500 text-xl font-semibold py-4"
                  >
                    No staff found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StaffTab;
