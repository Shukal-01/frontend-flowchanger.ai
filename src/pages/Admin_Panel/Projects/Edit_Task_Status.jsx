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
import { useGlobalContext } from "../../../Context/GlobalContext";
import Select from "react-select";
import { RiEditLine } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";

const Edit_Task_Status = () => {
  let subtitle;
  const { baseUrl } = useGlobalContext();
  const [openIndex, setOpenIndex] = useState(null);
  const [allStaff, setAllStaff] = useState();
  const [allTaskStatus, setAllTaskStatus] = useState([]);
  const [updateAllTaskStatus, setUpdateAllTaskStatus] = useState(false);
  const [taskStatus, setTaskStatus] = useState({
    name: "",
    color: "#000000",
    order: "",
    isHiddenFor: [],
    canBeChangedTo: [],
  });

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#F4F5F9",
      borderColor: "#E2E8F0",
      minHeight: "38px",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#E2E8F0",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      fontSize: "14px",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#4A5568",
      ":hover": {
        backgroundColor: "#CBD5E0",
        color: "#2D3748",
      },
    }),
  };

  const fetchAllStaff = async () => {
    const response = await fetch(baseUrl + "staff");
    const data = await response.json();
    setAllStaff(
      data?.map((staff) => {
        return {
          id: staff?.id,
          label: staff?.name,
        };
      })
    );
  };
  const fetchAllTaskStatus = async () => {
    const response = await fetch(baseUrl + "task/status");
    const data = await response.json();
    if (response.status == 200) {
      setAllTaskStatus(data);
    } else {
    }
    // console.log(data)
  };
  async function createNewTaskStatus(e) {
    // e.preventDefault(); // Uncomment this if using in a form submit event

    const data = {
      taskStatusName: taskStatus.name,
      statusColor: taskStatus.color,
      statusOrder: Number(taskStatus.order),
      isHiddenId: taskStatus.isHiddenFor?.map((staff) => staff?.value),
      canBeChangedId: taskStatus.canBeChangedTo,
    };
    console.log(data);

    try {
      const response = await fetch(baseUrl + "task/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Send the formatted data
      });

      const result = await response.json();

      setUpdateAllTaskStatus(!updateAllTaskStatus);
      setTaskStatus({
        name: "",
        color: "#000000",
        order: "",
        isHiddenFor: [],
        canBeChangedTo: [],
      });
      if (response.ok) {
        console.log("Task created successfully:", result);
      } else {
        console.error("Failed to create task:", result);
        alert("An error occurred during task creation.");
      }
    } catch (error) {
      console.error("Error in fetch request:", error);
      alert("An unexpected error occurred.");
    }
  }

  useEffect(() => {
    fetchAllStaff();
    fetchAllTaskStatus();
  }, []);
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

  console.log(allTaskStatus);

  const toggleDropdown1 = () => {
    setIsOpen1(!isOpen1);
  };

  //salary dropdown

  //Toggle swich off on btn
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

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
        <div className="p-[20px] rounded set-shadow w-full">
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
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
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
                          value={taskStatus?.name}
                          onChange={(e) => {
                            setTaskStatus({
                              ...taskStatus,
                              name: e.target.value,
                            });
                          }}
                          type="text"
                          placeholder=""
                          className="border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#fff] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]"
                        />
                      </div>
                      <div className="w-full mb-[10px] ">
                        <label className="text-[14px]">*Status Color</label>
                        <br />
                        <input
                          type="color"
                          value={taskStatus?.color}
                          onChange={(e) => {
                            setTaskStatus({
                              ...taskStatus,
                              color: e.target.value,
                            });
                          }}
                          placeholder=""
                          className="border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#fff] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]"
                        />
                      </div>
                      <div className="w-[100%] xl:[48%] mb-[10px] ">
                        <label className="text-[14px]">*Status Order</label>
                        <br />
                        <input
                          value={taskStatus?.order}
                          onChange={(e) => {
                            setTaskStatus({
                              ...taskStatus,
                              order: e.target.value,
                            });
                          }}
                          type="text"
                          placeholder=""
                          className="border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#fff] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]"
                        />
                      </div>
                      <div className="mb-[10px] flex items-center gap-[6px]">
                        <input type="checkbox" />
                        <p>Default Filter</p>
                      </div>
                      <div className="w-full  mb-[26px]">
                        <label className="text-[14px] block mb-1">
                          action
                        </label>
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

                      <div className="w-[100%]  mb-[20px]">
                        <label className="text-[14px]">Can be changed to</label>
                        <br />
                        <Select
                          isMulti
                          name="canBeChangedTo"
                          options={allTaskStatus?.map(
                            ({ id, taskStatusName }) => ({
                              label: taskStatusName,
                              value: id,
                            })
                          )}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          value={
                            taskStatus.canBeChangedTo
                              ?.map((value) => {
                                const status = allTaskStatus?.find(
                                  (option) => option?.id === value
                                );
                                return status
                                  ? {
                                      value: status?.id,
                                      label: status?.taskStatusName,
                                    }
                                  : null;
                              })
                              .filter(Boolean) // Filter out any null values in case no match is found
                          }
                          onChange={(selectedOptions) => {
                            setTaskStatus((prev) => ({
                              ...prev,
                              canBeChangedTo: selectedOptions?.map(
                                (option) => option?.value
                              ), // Update state with selected values
                            }));
                          }}
                          styles={{
                            control: (base) => ({
                              ...base,
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                              padding: "5px",
                              backgroundColor: "#F4F5F9",
                            }),
                          }}
                        />
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
                        onClick={(e) => {
                          createNewTaskStatus(e);
                          toggleModal();
                        }}
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
                <button
                  className=" items-center p-[6px] text-left text-[12px] text-sm font-normal text-[black] select-pe  rounded-md  focus:outline-none"
                  onClick={toggleDropdown1}
                >
                  25 <KeyboardArrowDownIcon className="newadd" />
                </button>

                {/* Dropdown menu */}
                {isOpen1 && (
                  <div className="absolute right-0 w-[100%] z-10 mt-2  origin-top-right left-[0px] bg-white border border-gray-200 rounded-md shadow-lg">
                    <div
                      className=""
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
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

              <p className=" relative p-[7px] text-[12px] w-[100px] font-medium summary-border rounded-md  ">
                {" "}
                Export{" "}
                <CachedIcon className="absolute cursor-pointer right-[5px] top-[9px] newadd2" />{" "}
              </p>
            </div>
            <div className="relative w-full xl:w-[300px] lg:w-[200px] md:w-[200px]">
              <input
                className="p-[6px] w-full rounded-2xl  summary-border text-[13px] "
                type="text"
                placeholder=" Search......."
              />
              <SearchIcon className="absolute newadd2 right-[8px] top-[8px]" />
            </div>
          </div>

          <div className="main-table-status">
            <table className="table-auto w-full border border-gray-300 rounded-md table-status">
              <thead
                onClick={toggleTable}
                className="set-shadow cursor-pointer"
              >
                <tr>
                  <th className="p-3 text-center">ID</th>
                  <th className="p-3 text-center">Status Name</th>
                  <th className="p-3 text-center">Status Color</th>
                  <th className="p-3 text-center">Status Order</th>
                  <th className="p-3 text-center">Status Defaulter Filter</th>
                  <th className="p-3 text-center">Status can be changed to</th>
                  <th className="p-3 text-center">action</th>
                </tr>
              </thead>
              <tbody
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  isOpen5 ? "max-h-screen" : "max-h-0"
                }`}
              >
                {allTaskStatus?.map((status, index) => (
                  <tr className="border">
                    <td className="p-3">{status?.id}</td>
                    <td className="p-3">{status?.taskStatusName}</td>
                    <td className="p-3">{status?.statusColor}</td>
                    <td className="p-3">{status?.statusOrder}</td>
                    <td className="p-3">Yes</td>
                    <td className="p-3">In Progress</td>
                    <td className="p-3">
                      <div className="flex justify-center">
                        <button
                          className="p-3 rounded-md text-white"
                          onClick={openModal6}
                        >
                          <RiEditLine className="text-[#27004a] text-xl"/>
                        </button>
                        <button className=" p-3 rounded-md text-white">
                        <RiDeleteBin6Line className="text-red-600 text-xl"/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen6}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal6}
        // style={customStyles}
        contentLabel="Example Modal"
        className="w-[96%] xl:w-[40%] absolute top-[50%] left-[50%] bottom-auto p-0 bg-[#fff] shadow shadow-md rounded-[10px] translate-x-[-50%] translate-y-[-50%]"
      >
        <h2
          ref={(_subtitle) => (subtitle = _subtitle)}
          className="border-b p-3   border-[#000] text-[14px]"
        >
          Edit New Task
        </h2>
        <button
          onClick={closeModal6}
          className="absolute right-[5px] top-[3px] font-semibold	  bg-[#511992] rounded-full"
        >
          <CloseIcon className="text-white" />
        </button>

        <div className="first-panel">
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
