import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CachedIcon from "@mui/icons-material/Cached";
import SearchIcon from "@mui/icons-material/Search";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PersonIcon from "@mui/icons-material/Person";
import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import Select from "react-select";
import { useGlobalContext } from "../../../Context/GlobalContext";
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import { IoMdArrowDropright } from "react-icons/io";
import ConfirmationModal from "../../../components/Staff/Modals/ConfirmationModal";

const Edit_Task_Status = () => {
  let subtitle;
  const { baseUrl, openToast } = useGlobalContext();
  const [openIndex, setOpenIndex] = useState(null);
  const [allStaff, setAllStaff] = useState([]);
  const [taskStatus, setTaskStatus] = useState({
    name: "",
    color: "#000000",
    order: "",
    isHiddenFor: [],
    canBeChangedTo: [],
  });

  const customStyles = {
    control: (provided) => ({}),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#E2E8F0",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      fontSize: "14px",
    }),
    multiValueRemove: (provided) => ({}),
  };
  const [staffDetail, setStaffDetail] = useState();
  const fetchStaffDetail = async () => {
    try {
      const result = await fetch(baseUrl + "staff");
      console.log("reuslt---", result);
      if (result.status == 200) {
        const res = await result.json();
        setStaffDetail(res);
      } else {
        const error = await result.json();
        throw new Error(error.message || `HTTP Error: ${result.status}`);
      }
    } catch (error) {
      console.error("Error fetching staff Details:", error);
      if (error.message === "Failed to fetch") {
        openToast("Network error: Unable to connect to the server", "error");
      } else {
        openToast(error.message || "An unexpected error occurred", "error");
      }
    }
  };
  const [open11, setOpen11] = useState(false);
  // const [open101, setOpen101] = useState(false);
  console.log(open11);
  const onOpenModal11 = () => setOpen11(true);
  const onCloseModal11 = () => setOpen11(false);

  console.log(allStaff);
  // Function to handle accordion toggling
  const handleToggle = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // Close the accordion if clicked again
    } else {
      setOpenIndex(index); // Open the accordion
    }
  };
  //salary dropdown
  const [isOpen1, setIsOpen1] = useState(false);

  const toggleDropdown1 = () => {
    setIsOpen1(!isOpen1);
  };

  //salary dropdown

  //Toggle swich off on btn
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  const handleSelectChange = (event) => {
    setRowsToShow(Number(event.target.value));
  };
  const exportCSV = () => {
    const csvData = projectPriorityDetail.map(dep => `${dep.Priority_name}, ${dep.Priority_color}, ${dep.Priority_order}`).join('\n');
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'ProjectStatus.csv');
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("AllTaskStatus", 20, 10);
    projectPriorityDetail.forEach((dep, index) => {
      doc.text(`${index + 1}. ${dep.Priority_name},${dep.project_color},${dep.Priority_order}`, 10, 20 + index * 10);
    });
    doc.save('ProjectStatus.pdf');
  };
  async function fetchProjectPriority() {
    try {
      const result = await fetch(baseUrl + "project-Priority")
      if (result.status === 200) {
        const data = await result.json();
        console.log("+++++---priority", data.data)
        setProjectPriorityDetail(data?.data)
      }
      else {
        const data = await result.json();
        console.error(data.message || "An unexpected error occured")
        setProjectPriorityDetail([]);
      }
    }
    catch (error) {
      console.log("some error occured", error)
    }
  }
  const [projectPriorityDetail, setProjectPriorityDetail] = useState();
  console.log("ProjectPriority Detail", projectPriorityDetail)

  const printDepartments = () => {
    const printContent = projectPriorityDetail.map(dep => `${dep.Priority_name},${dep.Priority_color}, ${dep.Priority_order} (Total Users: 1)`).join('\n');
    const newWindow = window.open();
    newWindow.document.write(`<pre>${printContent}</pre>`);
    newWindow.document.close();
    newWindow.print();
  };

  const [rowsToShow, setRowsToShow] = useState(25);
  const handleExport = () => {
    if (exportFormat === 'CSV') exportCSV();
    else if (exportFormat === 'PDF') exportPDF();
    else if (exportFormat === 'Print') printDepartments();
  };
  const [exportFormat, setExportFormat] = useState('');

  //Toggle swich off on btn

  //Modal
  // State to control the visibility of the modal
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the modal
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  //Modal2
  // State to control the visibility of the modal
  const [isOpen3, setIsOpen3] = useState(false);

  // Function to toggle the modal
  const toggleModal3 = () => {
    setIsOpen3(!isOpen3);
  };

  //Modal2

  const [isOpen5, setIsOpen5] = useState(false);

  // Toggle the visibility of tbody
  const toggleTable = () => {
    setIsOpen5(!isOpen5);
  };
  // Array of accordion items
  const [modalIsOpen6, setIsOpen6] = React.useState(false);
  function openModal6() {
    setIsOpen6(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#000";
  }

  function closeModal6() {
    setIsOpen6(false);
  }
  return (
    <div className=" w-full  ">
      <div className="bg-[#fff] p-[10px]">
        <div className="p-[20px] rounded-lg shadow-cs  w-full">
          <div className="flex items-center gap-[14px] mb-[10px]">
            <div className="flex items-center justify-center text-[14px] h-[50px]">
              {/* Button to open the modal */}
              <button
                onClick={toggleModal}
                className="px-4 py-2 second-btn bg-blue-500 text-white rounded-md"
              >
                Add task status
              </button>

              {/* Modal (visible only when isOpen is true) */}
              {isOpen && (
                <div className="fixed inset-0 flex items-center z-[1] justify-center bg-gray-800 bg-opacity-50">
                  <div className="bg-white rounded-lg shadow-lg w-96">
                    {/* Modal Header */}
                    <div className="px-4 py-2 border-b">
                      <h2 className="text-lg font-semibold">
                        Create new task status
                      </h2>
                    </div>

                    {/* Modal Body */}
                    <div className="p-4">
                      <div className="w-[100%] xl:[48%] mb-[10px] ">
                        <label className="text-[14px]">*Status Name</label>
                        <br />
                        <input
                          type="text"
                          placeholder=""
                          className="border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#fff] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]"
                        />
                      </div>
                      <div className="w-[100%] xl:[48%] mb-[10px] ">
                        <label className="text-[14px]">*Status Color</label>
                        <br />
                        <input
                          type="color"
                          placeholder=""
                          className="border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#fff] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]"
                        />
                      </div>
                      <div className="w-[100%] xl:[48%] mb-[10px] ">
                        <label className="text-[14px]">*Status Order</label>
                        <br />
                        <input
                          type="text"
                          placeholder=""
                          className="border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#fff] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]"
                        />
                      </div>
                      <div className="mb-[10px] flex items-center gap-[6px]">
                        <input type="checkbox" />
                        <p>Default Filter</p>
                      </div>
                      <div className="w-[100%]  xl:[48%] mb-[26px]">
                        <label className="text-[14px]">is hidden for</label>
                        
                        <br />
                        <Select
                          isMulti
                          name="isHiddenFor"
                          options={allStaff?.map(({ id, label }) => ({
                            label: label,
                            value: id,
                          }))}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          value={taskStatus.isHiddenFor || []}
                          onChange={(selectedOptions) =>
                            setTaskStatus((prev) => ({
                              ...prev,
                              isHiddenFor: selectedOptions || [], // ensures an array even if no options are selected
                            }))
                          }
                          styles={customStyles}
                        />
                      </div>
                      <div className="w-[100%]  xl:[48%] mb-[20px]">
                        <label className="text-[14px]">Can be changed to</label>
                        <br />
                        <select className="border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]">
                          <option>Nothing Selected</option>
                        </select>
                      </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="px-4 py-2 border-t flex justify-end">
                      <button
                        onClick={toggleModal}
                        className="px-4 py-2 bg-[red]  text-white rounded-md mr-2"
                      >
                        Close
                      </button>
                      <button
                        onClick={toggleModal}
                        className=" second-btn bg-blue-500 text-white rounded-md"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between items-start gap-[10px] mb-[14px] flex-col xl:flex-row lg:flex-row md:flex-row ">
            <div className="flex gap-[10px]">
              <div className="relative inline-block text-left">
                {/* Button to open/close the dropdown */}
                <select
                  onChange={handleSelectChange}
                  className=' border border-[#e5e7eb] p-[7px] text-[14px]  shadow-sm mr-2 rounded-md  pr-3 focus:outline-none'>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="120">120</option>
                </select>

                {/* Dropdown menu */}
                {isOpen1 && (
                  <div className="absolute right-0 w-[100%] z-10 mt-2  origin-top-right left-[0px] bg-white border border-gray-200 rounded-md shadow-lg">
                    <div className="" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      <a
                        href="#"
                        className="block p-[5px] text-center text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        30
                      </a>
                      <a
                        href="#"
                        className="block p-[5px] text-center text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        40
                      </a>
                      <a
                        href="#"
                        className="block p-[5px] text-center text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        50
                      </a>
                    </div>
                  </div>
                )}
              </div>


              <select onChange={(e) => setExportFormat(e.target.value)}
                className='border border-[#e5e7eb] p-[7px] text-[14px] shadow-sm text-sm rounded-md  focus:outline-none'>
                <option value="CSV">CSV</option>
                <option value="PDF">PDF</option>
                <option value="Print">Print</option>
              </select>
              <button
                onClick={handleExport}
                className='ml-2 bg-[#27004a] text-sm pl-[25px] pr-[25px] text-white p-2 rounded-md cursor-pointer'

              >
                Export
              </button>
            </div>
            <div className="relative w-full xl:w-[300px] lg:w-[200px] md:w-[200px]">
              <input className="p-[6px] w-full rounded-2xl  summary-border text-[13px] " type="text" placeholder=" Search......." />
              <SearchIcon className="absolute newadd2 right-[8px] top-[8px]" />
            </div>
          </div>

          <div className="bg-white rounded-lg w-full shadow-cs border border-[#dcdbdb] overflow-x-auto">
            <table className="table-auto w-full  rounded-md table-status">
              <thead
                onClick={toggleTable}
                className="set-shadow  cursor-pointer"
              >
                <tr>
                  <th className="border-r p-3 flex justify-center items-center text-xs font-medium whitespace-nowrap text-center">
                    <IoMdArrowDropright className={`text-[20px] transition-transform duration-200 ${isOpen5 ? "rotate-90 text-[black]" : "rotate-0"}`}
                    />

                  </th>
                  <th className="p-3 text-center border-r border-[#dbdbdb] whitespace-nowrap">ID</th>
                  <th className="p-3 text-center border-r border-[#dbdbdb] whitespace-nowrap">Status Name</th>
                  <th className="p-3 text-center border-r border-[#dbdbdb] whitespace-nowrap">Status Color</th>
                  <th className="p-3 text-center border-r border-[#dbdbdb] whitespace-nowrap">Status Order</th>
                  <th className="p-3 text-center border-r border-[#dbdbdb] whitespace-nowrap">Status Default Filter</th>
                  <th className="p-3 text-center border-r border-[#dbdbdb] whitespace-nowrap">Status can be changed to</th>
                  <th className="p-3 text-center border-r border-[#dbdbdb] whitespace-nowrap">Action</th>

                </tr>
              </thead>
              {/* Add transition for tbody */}
              <tbody
                className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen5 ? "max-h-screen" : "max-h-0"
                  }`}
                style={{ display: isOpen5 ? "table-row-group" : "none" }}
              >
                <tr className="border">
                  <td className="border-r border-[#dbdbdb] whitespace-nowrap">#</td>
                  <td className=" border-r border-[#dbdbdb] whitespace-nowrap ">1</td>
                  <td className=" border-r border-[#dbdbdb] whitespace-nowrap ">Not Started</td>
                  <td className=" border-r border-[#dbdbdb] whitespace-nowrap ">#fff</td>
                  <td className=" border-r border-[#dbdbdb] whitespace-nowrap ">20</td>
                  <td className=" border-r border-[#dbdbdb] whitespace-nowrap ">Yes</td>
                  <td className=" border-r border-[#dbdbdb] whitespace-nowrap ">In Progress</td>
                  <td className=" border-r border-[#dbdbdb] whitespace-nowrap ">
                    <div className="flex justify-center items-center gap-2">
                      <button className=" " onClick={openModal6}>
                        <BorderColorIcon className="text-[#27004a]" />
                      </button>
                      <div>
                        <button onClick={() => {
                          setOpen11(true);
                        }}>
                          <DeleteIcon
                            className="text-red-500 cursor-pointer"
                          />
                        </button>
                        {open11 && <ConfirmationModal setClose={onCloseModal11}/>}
                  

                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* <Modal open={open11} onClose={() => {
        // onCloseModal11();
        setOpen11(false);
      }} center>
        <div className="flex items-center justify-center h-[120px]">
          <h2 className="text-[18px] font-medium text-center text-[#27004a]">Are you sure want to delete this</h2>

        </div>
        <div className="flex items-center justify-around ">
          <button className="allcrm-btn" >Yes , Confirm</button>
          <button className="allcrm-btn">No , Cancel</button>
        </div>
      </Modal> */}
     
      <Modal
        isOpen={modalIsOpen6}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal6}
        // style={customStyles}
        contentLabel="Example Modal"
        className="w-[96%] xl:w-[40%] absolute top-[50%] left-[50%] bottom-auto p-0 bg-[#fff]  shadow-md rounded-[10px] translate-x-[-50%] translate-y-[-50%]"
      >
        <h2
          ref={(_subtitle) => (subtitle = _subtitle)}
          className="border-b p-3   border-[#000] text-[14px]"
        >
          Edit New Task
        </h2>
        <button
          onClick={closeModal6}
          className="absolute right-[5px] top-[3px] font-semibold	  bg-[#27004a] rounded-full"
        >
          <CloseIcon className="text-white" />
        </button>

        <div className="first-panel">
          <div className="p-4 overflow-y-scroll ">
            <div className="w-[100%] xl:[48%] mb-[10px] ">
              <label className="text-[14px]">*Status Name</label>
              <br />
              <input
                type="text"
                placeholder=""
                className="border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#fff] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]"
              />
            </div>
            <div className="w-[100%] xl:[48%] mb-[10px] ">
              <label className="text-[14px]">*Status Color</label>
              <br />
              <input
                type="text"
                placeholder=""
                className="border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#fff] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]"
              />
            </div>
            <div className="w-[100%] xl:[48%] mb-[10px] ">
              <label className="text-[14px]">*Status Order</label>
              <br />
              <input
                type="text"
                placeholder=""
                className="border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#fff] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]"
              />
            </div>
            <div className="mb-[10px] flex items-center gap-[6px]">
              <input type="checkbox" />
              <p>Default Filter</p>
            </div>
            <div className="w-[100%]  xl:[48%] mb-[26px]">
              <label className="text-[14px]">is hidden for</label>
              <br />
              <select className="border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]">
                <option>Nothing Selected</option>
              </select>
            </div>
            <div className="w-[100%]  xl:[48%] mb-[20px]">
              <label className="text-[14px]">Can be changed to</label>
              <br />
              <select className="border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]">
                <option>Nothing Selected</option>
              </select>
            </div>
          </div>

          <div className="pr-[10px] pb-3 flex gap-[10px] justify-end border-t pt-3">
            <button className="first-btn" onClick={closeModal6}>
              Cancel
            </button>
            <button className="second-btn">Confirm</button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
export default Edit_Task_Status;
