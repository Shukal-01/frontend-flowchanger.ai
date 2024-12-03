import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from '@mui/icons-material/Remove';
import SellIcon from '@mui/icons-material/Sell';
import { useGlobalContext } from "../../../Context/GlobalContext";
import Select from 'react-select';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Modal } from 'react-responsive-modal';
import CloseIcon from '@mui/icons-material/Close';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ClipLoader from "react-spinners/ClipLoader";
import CachedIcon from '@mui/icons-material/Cached';
import SearchIcon from '@mui/icons-material/Search';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import { IoMdArrowDropright } from "react-icons/io";

const Task = () => {

 
  const handleExport = () => {
    if (exportFormat === 'CSV') exportCSV();
    else if (exportFormat === 'PDF') exportPDF();
    else if (exportFormat === 'Print') printDepartments();
  };
  const handleSelectChange = (event) => {
    setRowsToShow(Number(event.target.value));
  };
  const exportCSV = () => {
    const csvData = departments.map(dep => `${dep.department_name}, Total Users: 1`).join('\n');
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'departments.csv');
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Department List", 20, 10);
    departments.forEach((dep, index) => {
      doc.text(`${index + 1}. ${dep.department_name} (Total Users: 1)`, 10, 20 + index * 10);
    });
    doc.save('departments.pdf');
  };

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };




  const printDepartments = () => {
    const printContent = departments.map(dep => `${dep.department_name} (Total Users: 1)`).join('\n');
    const newWindow = window.open();
    newWindow.document.write(`<pre>${printContent}</pre>`);
    newWindow.document.close();
    newWindow.print();
  };

  const [isOpen, setIsOpen] = useState(false);


  const [exportFormat, setExportFormat] = useState('');
  
  const [rowsToShow, setRowsToShow] = useState(25);
  const [allStaff, setAllStaff] = useState();
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#F4F5F9',
      borderColor: '#E2E8F0',
      minHeight: '38px',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#E2E8F0',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      fontSize: '14px',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#4A5568',
      ':hover': {
        backgroundColor: '#CBD5E0',
        color: '#2D3748',
      },
    }),
  };
  const [taskStatus, setTaskStatus] = useState({
    name: "",
    color: "#000000",
    order: "",
    isHiddenFor: [],
    canBeChangedTo: [],
  })

  const { baseUrl, openToast } = useGlobalContext();
  const [isTableOpen, setIsTableOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // handle open the accordian
  const handleTableOpen = () => {
    setIsTableOpen((prevState) => !prevState);
  };
  //modal
  const [isOpen15, setIsOpen15] = useState(false);

  const toggleModal15 = () => {
    setIsOpen15(!isOpen15);
  };
  const addNewDiv = () => {
    setDivs([...divs, {}]); // Add a new empty object to the state array
  };

  // Function to add a new div

  // State to store the list of file input divs
  const [divs, setDivs] = useState([{}]); // Start with one empty object


  // Function to remove a specific div
  const removeDiv = (indexToRemove) => {
    setDivs(divs.filter((_, index) => index !== indexToRemove)); // Filter out the div with the given index
  };
  const [open10, setOpen10] = useState(false);

  const onOpenModal10 = () => setOpen10(true);
  const onCloseModal10 = () => setOpen10(false);


  function closeModal15() {
    setIsOpen15(false);
  }


  const [allTaskStatus, setAllTaskStatus] = useState();
  const fetchAllTaskStatus = async () => {

    try {
      const response = await fetch(baseUrl + 'task/status');
      if (response.status === 200) {
        const data = await response.json();
        console.log("taskData:", data);
        setAllTaskStatus(data.taskStatus);
      }
      else {
        const error = await response.json();
        console.error(error.message || `HTTP Error: ${response.status}`);
        setAllTaskStatus([]);
      }
    }
    catch (error) {
      console.error("Error fetching task status:", error);
      setAllTaskStatus([]);
    }
  }

  const [departments, setDepartments] = useState([])
  const fetchDepartments = async () => {
    try {
      const result = await fetch(baseUrl + "department")
      if (result.status == 200) {
        const res = await result.json();
        setDepartments(res.data)

      }
      else {
        console.error("Error fetching departments:", result.status);
        setDepartments([]);
      }
    }
    catch (error) {
      console.error("Error fetching departments:", error);
      setDepartments([]);
    }
  }





  const [taskPriority, setTaskPriority] = useState([]);
  const fetchTaskPriority = async () => {
    try {
      const result = await fetch(baseUrl + "task/priority")
      if (result.status == 200) {
        const res = await result.json();
        console.log(res);
        setTaskPriority(res.data)

      }
      else {
        const error = await result.json();
        console.log(error.message, "error")
        setTaskPriority([]);
      }

    }
    catch (error) {
      console.log("error", error);
      setTaskPriority([]);
    }
  }

  const [selectedTag, setSelectedTag] = useState([])
  const [staffDetail, setStaffDetail] = useState();
  const handleChange = (selectedOptions) => {
    setSelectedTag(selectedOptions);
  };
  const options = staffDetail?.map((staff) => ({
    value: staff.id,
    label: staff.name,
  }));

  const fetchStaffDetail = async () => {
    try {
      const result = await fetch(baseUrl + "staff")
      console.log("reuslt---", result)
      if (result.status == 200) {
        const res = await result.json();
        setStaffDetail(res)
      }
      else {
        const res = await result.json();
        console.log("error while fetching satff", res.message);
        setStaffDetail([]);
      }

    }
    catch (error) {
      console.error("error", error.message);
      setStaffDetail([]);
    }

  }

  const [projectDetails, setProjectDetails] = useState([]);
  async function fetchProjectDetails() {
    try {
      const result = await fetch(baseUrl + "project");
      console.log("---", result)
      if (result.status == 200) {
        const res = await result.json();
        console.log(res)
        setProjectDetails(res.data)
      }
      else {
        console.error("Error fetching projects:", result.status);
        setProjectDetails([]);
      }
    }
    catch (error) {
      console.error("Error fetching Projects", error);
      setProjectDetails([]);
    }
  }


  let subtitle;
  const [taskName, setTaskName] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [dueDate, setDueDate] = useState();
  const [taskDescription, setTaskDescription] = useState();
  const [tag, setTag] = useState();
  const [attachFile, setAttachFile] = useState();
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(""); // New state for selected department
  const [selectedProjectId, setSelectedProjectId] = useState(""); // New state for selected project
  const [selectedTaskStatusId, setSelectedTaskStatusId] = useState(""); // State for selected task status ID
  const [selectedTaskPriorityId, setSelectedTaskPriorityId] = useState(""); // Stores the selected priority ID as a string
  const [selectedStaffIds, setSelectedStaffIds] = useState([]); // Array to hold selected staff IDs


  async function submitTask() {
    console.log(selectedTaskStatusId)
    const result = await fetch(baseUrl + "task/detail", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ taskName: taskName, startDate: startDate, endDate: endDate, dueDate: dueDate, taskDescription: taskDescription, attachFile: attachFile, taskStatusId: selectedTaskStatusId, selectDepartmentId: selectedDepartmentId, taskPriorityId: selectedTaskPriorityId, selectProjectId: selectedProjectId, taskAssign: selectedStaffIds, taskTag: tag })
    })
    if (result.status == 201) {
      const data = await result.json();
      openToast(data.message, "success")
    }
    else {
      const error = await result.json();
      openToast(error.message, "error")
    }
  }


  const [fetchTaskData, setFetchTaskData] = useState([]);
  async function fetchTaskDetails() {
    setIsLoading(true);
    try {
      const result = await fetch(baseUrl + "task/detail")
      if (result.status === 200) {
        const data = await result.json();
        console.log(data.taskDetail)
        setFetchTaskData(data.taskDetail);
        setIsTableOpen(true);
      }
      else {
        const error = await result.json();
        console.log(error.message, "error")
        setFetchTaskData([]);
      }
    }
    catch (error) {
      console.log("error", error)
      setFetchTaskData([]);
    }
    finally {
      setIsLoading(false);
    }
  }

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
  const [selectedTaskData, setSelectedTaskData] = useState();
  console.log("task all data", selectedTaskData)
  const [updateData, setUpdateData] = useState();
  console.log("Updated Data", updateData)

  useEffect(() => {
    if (selectedTaskData) {
      setUpdateData(selectedTaskData);  // Automatically copy the data to updateData
    }
  }, [selectedTaskData])



  const [updateTaskName, setUpdateTaskName] = useState();
  const [updateTaskStatus, setUpdateTaskStatus] = useState(selectedTaskData?.taskStatusId || "");
  const [updateStartDate, setUpdateStartDate] = useState();
  const [updateEndDate, setUpdateEndDate] = useState();
  const [updateDueDate, setUpdateDueDate] = useState();
  const [updateSelectProject, setUpdateSelectProject] = useState(selectedTaskData?.selectProjectId || "");
  const [updateDepartment, setUpdateDepartment] = useState();
  const [updateTaskPriority, setUpdateTaskPriority] = useState(selectedTaskData?.taskPriorityId || "");
  const [updateTaskAssigne, setUpdateTaskAssigne] = useState([]);
  const [updateTaskDescription, setUpdateTaskDescription] = useState();
  const [updateTaskTag, setUpdateTaskTag] = useState();
  const [updateTaskAttachFile, setUpdateTaskAttachFile] = useState();




  useEffect(() => {
    setUpdateTaskStatus(selectedTaskData?.taskStatusId || "");
    setUpdateSelectProject(selectedTaskData?.selectProjectId || "");
    setUpdateTaskPriority(selectedTaskData?.taskPriorityId || "");
  }, [selectedTaskData]);



  async function updateDataTaskDetails() {
    const taskId = selectedTaskData?.id; // Get the task ID dynamically from `selectedTaskData`
    const result = await fetch(baseUrl + `task/detail/${taskId}`, {
      method: "PUT",
      headers: {
        'Content-type': "application/form-data"
      },
      body: JSON.stringify({ taskName: updateTaskName, startDate: updateStartDate, endDate: updateEndDate, dueDate: updateDueDate, selectProjectId: updateSelectProject, taskDescription: updateTaskDescription, taskTag: updateTaskTag, attachFile: updateTaskAttachFile, selectDepartmentId: updateDepartment, taskStatusId: updateTaskStatus, taskPriorityId: updateTaskPriority, taskAssign: updateTaskAssigne })
    })
    const data = await result.json();
    if (result.status = 200) {
      console.log(data)
      openToast(data.message, "success")
    }
    else {
      openToast(data.message, "error")
    }
  }

  useEffect(() => {
    fetchStaffDetail();
    fetchAllTaskStatus();
    fetchDepartments();
    fetchTaskPriority();
    fetchProjectDetails();
    fetchTaskDetails();
  }, [])
  return (
    <div className="w-full px-4 py-6">
      <div className=" w-[108px] mb-[20px]">
        {/* Button to open the modal */}
        <Link to="/taskform"
          className=" gap-[4px] p-[8px]  allcrm-btn flex items-center text-[14px] focus-visible:outline-none"
         
        >
          <AddIcon className="newadd" /> New Task
        </Link>

        {/* Modal */}
      
      </div>


      <div className="bg-white border border-[#e5e7eb] shadow-cs rounded-lg p-[20px] ">

        <h2 className="font-medium mb-[10px] flex gap-[6px] items-center"> <LibraryBooksIcon />Task</h2>
        <div className='flex mb-4 justify-between p-3 flex-col gap-2 pl-[0] sm:flex-row sm:gap-0'>
          <div className='left-side '>
            <select
              onChange={handleSelectChange}
              className=' border border-[#e5e7eb] p-[7px] text-[14px]  shadow-sm mr-2 rounded-md  focus:outline-none'>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="120">120</option>

            </select>

            <select onChange={(e) => setExportFormat(e.target.value)}
              className='border border-[#e5e7eb] p-[7px]  text-[14px] shadow-sm rounded-md  focus:outline-none'>
              <option value="CSV">CSV</option>
              <option value="PDF">PDF</option>
              <option value="Print">Print</option>
            </select>

            <button
              onClick={handleExport}
              className='ml-2 bg-[#27004a] export-project-btn text-white p-[7px] text-[14px] rounded-md cursor-pointer'
            >
              Export File
            </button>
            <button className="border border-[#e5e7eb] export-project-btn text-[14px] ml-[10px] rounded-lg shadow-sm p-[7px] " onClick={onOpenModal} >Bulk Action  <CachedIcon className="newsidebar-icon" /> </button>
            <Modal open={open} onClose={onCloseModal} center>
              <div className="border-b border-[#dbdbdb] pb-[20px]">
                <h2>Bulk Actions</h2>
              </div>
              <div className="flex items-center gap-[8px] mt-[32px] mb-[32px]">
                <input type="checkbox" />
                <p className="text-[14px]">Mass Delete</p>
              </div>
              <div className="w-[100%]">


                <Select
                  isMulti
                  name="isHiddenFor"
                  options={allStaff?.map(({ id, label }) => ({ label: label, value: id }))}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  value={taskStatus.isHiddenFor || []}
                  onChange={(selectedOptions) =>
                    setTaskStatus((prev) => ({
                      ...prev,
                      isHiddenFor: selectedOptions || [] // ensures an array even if no options are selected
                    }))
                  }
                  styles={customStyles}
                />
              </div>

              <p className="text-[red] text-[14px] mt-[10px]">if you do not select any groups assigned to the selected customers will be removed.</p>

              <div className='pr-[10px] pb-3 flex gap-[10px] justify-end mt-[24px]'>

                <button className='second-btn'>Confirm </button>
              </div>

            </Modal>




          </div>

          <div className='right-side relative  w-[200px]'>
            <input type='text' placeholder='Search' className='border border-1 p-[10px] h-[38px] pr-7
] rounded-3xl focus:outline-none w-[100%] text-[15px] text-[#000]' />
            <SearchIcon className='absolute right-[10px] search-icon    text-[#000]  font-thin text-[#dddddd;
]'/>
          </div>
        </div>
        <div className=" bg-white rounded-lg w-full shadow-cs border border-[#dcdbdb]  overflow-x-auto">
          <table className="w-full table-auto border border-[#dcdbdb] rounded-lg overflow-hidden border-collapse">
            {/* Table Header - Acts as Toggle Button */}
            <thead className=" cursor-pointer border border-gray-300 shadow-md " onClick={toggleAccordion}
            >
              <tr>
                <th className="border-r p-2   flex justify-center items-center text-xs font-medium whitespace-nowrap text-center">
                  <IoMdArrowDropright className={`text-[20px] transition-transform duration-200 ${isOpen ? "rotate-90 text-[black]" : "rotate-0"}`}
                  />
                  <button className="p-[6px] rounded-lg bg-[orange]  mr-[7px] text-[white] ">To Do</button><span className="six-north">6</span>

                </th>
                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                  #
                </th>
                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                  Name
                </th>
                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                  Status
                </th>
                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                  Start Date
                </th>
                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                  End Date
                </th>
                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                  Due Date
                </th>
                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                </th>
                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                Select Project
                </th>
                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                  Select Department
                </th>
                <th className="p-2 text-xs font-medium text-center">
                  Priority
                </th>
                <th className="p-2 text-xs font-medium text-center">
                 Assignee
                </th>
                <th className="p-2 text-xs font-medium text-center">
                  Description
                </th>
                <th className="p-2 text-xs font-medium text-center">
                  Tag
                </th>
              </tr>
            </thead>

            {/* Table Body - Collapsible Content */}

            {isOpen && (
              <tbody className={`transition-body ${isOpen ? "open" : ""}`}  >
                {fetchTaskData?.map((s, index) => (
                  <tr key={index} className="rounded-lg border-b border-[#e5e7eb]">
                    <td className="text-[12px] border-r border-[#dbdbdb] font-medium p-2 min-w-[100px] text-left whitespace-nowrap">
                      <Link className="textcomplete">N/A</Link>
                    </td>
                    <td className="text-[12px]  border-r border-[#dbdbdb] font-medium p-2 min-w-[60px] text-left">{index + 1}</td>
                    <td className="text-[12px]  border-r border-[#dbdbdb] font-medium p-2 min-w-[150px] text-left whitespace-nowrap">
                      <Link to="/taskview" className="textcomplete">{s.taskName}</Link>
                    </td>
                    <td className="text-[12px]  border-r border-[#dbdbdb] font-medium p-2 min-w-[120px] text-left whitespace-nowrap">
                      {s.startDate}
                    </td>
                    <td className="text-[12px]  border-r border-[#dbdbdb] font-medium p-2 min-w-[120px] text-left whitespace-nowrap">
                      {s.endDate}
                    </td>
                    <td className="text-[12px]  border-r border-[#dbdbdb] font-medium p-2 min-w-[120px] text-left whitespace-nowrap">
                      13-08-2024
                    </td>
                    <td className="text-[12px]  border-r border-[#dbdbdb] font-medium p-2 min-w-[100px] text-left whitespace-nowrap">
                      <button className="bg-[#c4bfbf]  border-r border-[#dbdbdb] text-white rounded-lg p-[6px]">N/A</button>
                    </td>
                    <td className="text-[12px] font-medium  border-r border-[#dbdbdb] p-2 min-w-[80px] text-left">N/A</td>
                    <td className="text-[12px] font-medium  border-r border-[#dbdbdb] p-2 min-w-[100px] text-left whitespace-nowrap">
                      <Link className="highred">
                        N/A
                      </Link>
                    </td>
                    <td className="text-[12px] font-medium  border-r border-[#dbdbdb] p-2 min-w-[100px] text-left whitespace-nowrap">
                      <div className="flexjustify-center">
                        <button onClick={() => {
                          setSelectedTaskData(s);
                          openModal2(); // Call the function here
                        }}><BorderColorIcon /></button>
                     
                      </div>
                    </td>
                  </tr>
                ))} 
                {/* <tr>
                  <td>Hello</td>
                  <td>Hello</td>
                  <td>Hello</td>
                  <td>Hello</td>
                  <td>Hello</td>
                  <td>Hello</td>
                  <td>Hello</td>
                  <td>Hello</td>
                  
                </tr> */}
              </tbody>

              
         
            )}

          
          </table>

       



        </div>
        <div className='flex justify-between p-[10px] pb-[0] w-[100%] items-center  flex-col gap-2  sm:flex-row sm:gap-0'>
            <p className=' text-[#a5a1a1] text-[14px]'>Showing 1 to {rowsToShow} of {departments.length} entries</p>
            <div className='pagination flex gap-2 border pt-0 pl-4 pb-0 pr-4 rounded-md'>
              <Link to="#" className='text-[12px]  pt-2 pb-[8px]'>Previous</Link>
              <span className='text-[12px] bg-[#27004a] flex items-center  text-white pl-3 pr-3 '>1</span>
              <Link to="#" className='text-[12px]  pt-2 pb-[8px] '>Next</Link>

            </div>
          </div>



        {/* onclick Update task */}
        <Modal
          isOpen={modalIsOpen2}
          onAfterOpen={afterOpenModal2}
          onRequestClose={closeModal2}
          // style={customStyles}
          contentLabel="Example Modal"
          className="w-[96%] xl:w-[40%] absolute top-[50%] left-[50%] bottom-auto p-0 bg-[#fff] shadow rounded-[10px] translate-x-[-50%] translate-y-[-50%]"

        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)} className='border-b-1 shadow p-3 text-[13px] xl:text-[15px] '>Update Task</h2>
          <button onClick={closeModal2} className='absolute right-[5px] top-[3px] font-semibold	  bg-[#511992] rounded-full'><CloseIcon className='text-white' /></button>
          <div className=''>
            <div className="bg-white p-6    relative h-[400px]  overflow-y-scroll">
              <div className="w-[100%]">

                <div className="w-[100%]">

                  <label className='text-[13px] xl:text-[14px] text-[#000000ba] font-medium'>Task Name</label><br />
                  <input type='text' onChange={(e) => setUpdateTaskName(e.target.value)} defaultValue={updateData?.taskName} className='border border-1 rounded-md p-[5px] mt-1 w-[100%] mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' />    <br />
                </div>
                <div className="flex gap-[8px]">

                  <div className="w-[100%]" >
                    <label className='text-[13px] xl:text-[14px] text-[#000000ba] font-medium'>Task Status</label>    <br />
                    <select
                      onChange={(e) => setUpdateTaskStatus(e.target.value)} // Set the selected task status ID
                      value={updateTaskStatus}  // Set current state as the value to stay in sync
                      className="border border-1 rounded-md p-[5px] mt-1 w-[100%] mb-[10px] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]"
                    >
                      <option value="">Please Select Task Status</option>
                      {allTaskStatus?.map((status) => (
                        <option key={status.id} value={status.id}>
                          {status.taskStatusName}
                        </option>
                      ))}
                    </select>



                  </div>

                </div>
                <div className="flex gap-[8px]">
                  <div className="w-[50%]">
                    <label className='text-[13px] xl:text-[14px] text-[#000000ba] font-medium'>Start Date</label>    <br />
                    <input type='date' onChange={(e) => setUpdateStartDate(e.target.value)} defaultValue={updateData?.startDate} className='border border-1 rounded-md p-[5px] mt-1 w-[100%]  mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' />    <br />
                  </div>
                  <div className="w-[50%]">
                    <label className='text-[13px] xl:text-[14px] text-[#000000ba] font-medium'>End Date</label>    <br />
                    <input type='date' onChange={(e) => setUpdateEndDate(e.target.value)} defaultValue={updateData?.endDate} className='border border-1 rounded-md p-[5px] mt-1 w-[100%] mb-[10px]   focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' />    <br />
                  </div>
                </div>
                <div className="flex gap-[8px]">
                  <div className="w-[50%]">
                    <label className='text-[13px] xl:text-[14px] text-[#000000ba] font-medium'>Due Date</label>    <br />
                    <input type='date' onChange={(e) => setUpdateDueDate(e.target.value)} defaultValue={updateData?.dueDate} className='border border-1 rounded-md p-[5px] mt-1 w-[100%] mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' />    <br />
                  </div>
                  <div className="w-[50%]">

                    <label className='text-[13px] xl:text-[14px] text-[#000000ba] font-medium'>Select Project</label>    <br />
                    <select
                      onChange={(e) => setUpdateSelectProject(e.target.value)} // Update `updateSelectProject` when the selection changes
                      value={updateSelectProject}  // Use `updateSelectProject` as the value to stay in sync
                      className="border border-1 rounded-md p-[5px] mt-1 w-[100%] mb-[10px] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]"
                    >
                      <option value="">- Select Project -</option>
                      {projectDetails.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.project_name}
                        </option>
                      ))}
                    </select>

                  </div>
                </div>
                <div className="w-[100%] flex gap-[10px]">
                  <div className="w-[50%]">
                    <label className='text-[13px] xl:text-[14px] text-[#000000ba] font-medium'>Select Department</label>    <br />
                    <select onChange={(e) => setUpdateDepartment(e.target.value)} defaultValue={updateData?.selectDepartmentId} className='border border-1 rounded-md p-[5px] mt-1 mb-[10px] w-full  focus:outline-none text-[#000] placeholder:font-font-normal xl:text-[14px] text-[12px] mr-[0px]   hover:bg-[#fff]'>
                      <option>Select Department</option>
                      {departments.map(department => (
                        <option key={department.id} value={department.id}>
                          {department.department_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-[50%]">
                    <label className='text-[13px] xl:text-[14px] text-[#000000ba] font-medium'>Task Priority</label>    <br />
                    <select
                      onChange={(e) => setUpdateTaskPriority(e.target.value)} // Update `updateTaskPriority` on selection change
                      value={updateTaskPriority}  // Use `updateTaskPriority` as the value to stay in sync
                      className="border border-1 rounded-md p-[5px] mt-1 mb-[10px] w-full focus:outline-none text-[#000] placeholder:font-font-normal xl:text-[14px] text-[12px] mr-[0px] hover:bg-[#fff]"
                    >
                      <option value="">Select Task Priority</option>
                      {taskPriority?.map((priority) => (
                        <option key={priority?.id} value={priority?.id}>
                          {priority?.taskPriorityName}
                        </option>
                      ))}
                    </select>

                  </div>
                </div>
                <div className="">


                  <div className="w-[100%]">
                    <label className='text-[13px] xl:text-[14px] text-[#000000ba] font-medium'>Task Assignee</label>    <br />
                    <Select
                      isMulti
                      options={staffDetail?.map(staff => ({
                        value: staff.id,
                        label: staff.name
                      }))}
                      defaultValue={staffDetail
                        ?.filter(staff => selectedTaskData?.taskAssign?.includes(staff.id))
                        .map(staff => ({
                          value: staff.id,
                          label: staff.name
                        }))
                      }
                      onChange={(selectedOptions) => {
                        const selectedIds = selectedOptions?.map(option => option.value) || [];
                        setUpdateTaskAssigne(selectedIds);  // Update `updateTaskAssigne` with selected IDs
                      }}
                      placeholder="Select Members..."
                      className="w-full"
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          minHeight: '46px',
                          border: '1px solid #DBDCDE',
                        }),
                        multiValue: (provided) => ({
                          ...provided,
                          backgroundColor: '#e5e7eb',
                          borderRadius: '4px',
                        }),
                        multiValueLabel: (provided) => ({
                          ...provided,
                          fontSize: '0.875rem',
                        }),
                        multiValueRemove: (provided) => ({
                          ...provided,
                          color: '#4b5563',
                          cursor: 'pointer',
                        }),
                      }}
                    />


                  </div>
                  <label className='text-[13px] xl:text-[14px] text-[#000000ba] font-medium'>Task Description</label><br />
                  <textarea type='text' onChange={(e) => { setUpdateTaskDescription(e.target.value) }} defaultValue={updateData?.taskDescription} className='border border-1 rounded-md p-[5px] mt-1 w-[100%] mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' />    <br />

                  <div className="w-[100%]">
                    <label className='text-[13px] xl:text-[14px] text-[#000000ba] font-medium mb-3'><SellIcon className='sell-icon' />Task Tag</label><br />
                    <input type='text' onChange={(e) => { setUpdateTaskTag(e.target.value) }} defaultValue={updateData?.taskTag} className=' mb-[10px]  pr-2 focus:outline-none tag-input mt-2' placeholder='Tag' />    <br />
                  </div>
                </div>




                <div>
                  <label className='text-[13px] xl:text-[14px] text-[#000000ba] font-medium'>Attach File</label><br />
                  <div className='relative'>
                    <input type='file' onChange={(e) => setUpdateTaskAttachFile(e.target.value)} className='border border-1 rounded-md p-[5px] mt-1 w-[100%] mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' />
                    <button onClick={addNewDiv} >
                      <AddIcon className='plus-icon' />
                    </button>
                  </div>
                </div>

                <div>
                  {/* Dynamically render each div */}
                  {divs.map((_, index) => (
                    <div key={index} className='mb-[10px]'>
                      <label className='text-[13px] xl:text-[14px] font-medium'>Attach File {index + 1}</label><br />
                      <div className='relative'>
                        <input
                          type='file'
                          className='border border-1 rounded-md p-[5px] mt-1 w-[100%] mb-[10px] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'
                        />

                        {/* Remove Button for every div */}
                        <button onClick={() => removeDiv(index)} className='  rounded plus-icon'>
                          <RemoveIcon />
                        </button>
                      </div>
                    </div>
                  ))}


                </div>
              </div>


            </div>

            <div className='pr-[10px] pb-3 flex gap-[10px] justify-end border-t pt-3'>
              <button className='first-btn' onClick={closeModal2}>Cancel</button>
              <button className='second-btn' onClick={updateDataTaskDetails}>Confirm</button>
            </div>
          </div>
        </Modal>
        {/* onclick Update task */}


      </div>
    </div>
  );
}

export default Task;