import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../../../Context/GlobalContext";
import RemoveIcon from '@mui/icons-material/Remove';
import SellIcon from '@mui/icons-material/Sell';
import AddIcon from "@mui/icons-material/Add";
import Select from 'react-select';
import { useNavigate } from "react-router";


const TaskForm = () => {

  function handleCloseForm() {
    navigate("/task")
  }
  const navigate = useNavigate();
    const { baseUrl, openToast } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(false);
    const [fetchTaskData, setFetchTaskData] = useState([]);
    const [isTableOpen, setIsTableOpen] = useState(false);
    const [allTaskStatus, setAllTaskStatus] = useState();
    const [updateDueDate, setUpdateDueDate] = useState();
    const [projectDetails, setProjectDetails] = useState([]);
    const [updateTaskAssigne, setUpdateTaskAssigne] = useState([]);
    const [staffDetail, setStaffDetail] = useState();
    const [selectedTaskStatusId, setSelectedTaskStatusId] = useState(""); // State for selected task status ID


    const removeDiv = (indexToRemove) => {
        setDivs(divs.filter((_, index) => index !== indexToRemove)); // Filter out the div with the given index
      };
    const handleTableOpen = () => {
        setIsTableOpen((prevState) => !prevState);
      };
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

    const [divs, setDivs] = useState([{}]); // Start with one empty object

    const addNewDiv = () => {
        setDivs([...divs, {}]); // Add a new empty object to the state array
      };
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
//   const [selectedTaskStatusId, setSelectedTaskStatusId] = useState(""); // State for selected task status ID
  const [selectedTaskPriorityId, setSelectedTaskPriorityId] = useState(""); // Stores the selected priority ID as a string
  const [selectedStaffIds, setSelectedStaffIds] = useState([]); // Array to hold selected staff IDs



 
    return (
        <div className='w-[100%] flex justify-center mt-[30px] mb-[30px] items-center h-[100%]'>
           
                <div className="bg-white p-6 rounded-lg shadow-cs w-[80%] relative h-[100%]  ">
                    <h2 className="text-lg font-semibold mb-[16px]">Add new Task</h2>
                    <form action="" onSubmit={submitTask}>
                        <div className="w-[100%]">

                            <div className="w-[100%]">

                                <label className='text-[13px] xl:text-[14px] text-[#000000ba] font-medium'>Task Name</label><br />
                                <input type='text' onChange={(e) => setTaskName(e.target.value)} className='border border-1 rounded-md p-[5px] mt-1 w-[100%] mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' required />    <br />
                            </div>
                            <div className="flex gap-[8px]">

                                <div className="w-[100%]" >
                                    <label className='text-[13px] xl:text-[14px] text-[#000000ba] font-medium'>Task Status</label>    <br />
                                    <select
                                        onChange={(e) => setSelectedTaskStatusId(e.target.value)} // Store only the selected ID as a string
                                        className="border border-1 rounded-md p-[5px] mt-1 w-[100%] mb-[10px] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]"
                                        required
                                    >
                                        <option value="">Please Select Task Status</option>
                                        {allTaskStatus?.map((status) => (

                                            <option key={status?.id} value={status?.id}>
                                                {status?.taskStatusName}
                                            </option>
                                        ))}
                                    </select>


                                </div>

                            </div>
                            <div className="flex gap-[8px]">
                                <div className="w-[50%]">
                                    <label className='text-[13px] xl:text-[14px] text-[#000000ba] font-medium'>Start Date</label>    <br />
                                    <input type='date' onChange={(e) => setStartDate(e.target.value)} className='border border-1 rounded-md p-[5px] mt-1 w-[100%]  mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' required />    <br />
                                </div>
                                <div className="w-[50%]">
                                    <label className='text-[13px] xl:text-[14px] text-[#000000ba] font-medium'>End Date</label>    <br />
                                    <input type='date' onChange={(e) => setEndDate(e.target.value)} className='border border-1 rounded-md p-[5px] mt-1 w-[100%] mb-[10px]   focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' />    <br />
                                </div>
                            </div>
                            <div className="flex gap-[8px]">
                                <div className="w-[50%]">
                                    <label className='text-[13px] xl:text-[14px] text-[#000000ba] font-medium'>Due Date</label>    <br />
                                    <input type='date' onChange={(e) => setUpdateDueDate(e.target.value)} className='border border-1 rounded-md p-[5px] mt-1 w-[100%] mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' />    <br />
                                </div>
                                <div className="w-[50%]">

                                    <label className='text-[13px] xl:text-[14px] text-[#000000ba] font-medium'>Select Project</label>    <br />
                                    <select
                                        onChange={(e) => setSelectedProjectId(e.target.value)}
                                        className="border border-1 rounded-md p-[5px] mt-1 w-[100%] mb-[10px] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]"
                                        required>
                                        <option value="">- Select Project -</option> {/* Placeholder option */}
                                        {projectDetails?.map((project) => (
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
                                    <select onChange={(e) => setSelectedDepartmentId(e.target.value)} className='border border-1 rounded-md p-[5px] mt-1 mb-[10px] w-full  focus:outline-none text-[#000] placeholder:font-font-normal xl:text-[14px] text-[12px] mr-[0px]   hover:bg-[#fff]' required>
                                        <option>Select Department</option>
                                        {departments?.map(department => (
                                            <option key={department.id} value={department.id}>
                                                {department.department_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="w-[50%]">
                                    <label className='text-[13px] xl:text-[14px] text-[#000000ba] font-medium'>Task Priority</label>    <br />
                                    <select
                                        onChange={(e) => setSelectedTaskPriorityId(e.target.value)} // Set only the selected ID
                                        className="border border-1 rounded-md p-[5px] mt-1 mb-[10px] w-full focus:outline-none text-[#000] placeholder:font-font-normal xl:text-[14px] text-[12px] mr-[0px] hover:bg-[#fff]"
                                        required >
                                        <option value="">Select Task Priority</option> {/* Placeholder option */}
                                        {taskPriority?.map((priority) => (
                                            <option key={priority.id} value={priority.id}>
                                                {priority.taskPriorityName}
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
                                            label: staff.name,
                                        }))}
                                        onChange={(selectedOptions) => {
                                            const selectedIds = selectedOptions?.map(option => option.value) || [];
                                            console.log("Selected IDs:", selectedIds);
                                            setUpdateTaskAssigne(selectedIds);
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
                                        required />

                                </div>
                                <label className='text-[13px] xl:text-[14px] text-[#000000ba] font-medium'>Task Description</label><br />
                                <textarea type='text' onChange={(e) => setTaskDescription(e.target.value)} className='border border-1 rounded-md p-[5px] mt-1 w-[100%] mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' required />    <br />
                                <div className="w-[100%]">
                                    <label className='text-[13px] xl:text-[14px] text-[#000000ba] font-medium mb-3'><SellIcon className='sell-icon' />Task Tag</label><br />
                                    <input type='text' onChange={(e) => setTag(e.target.value)} className=' mb-[10px]  pr-2 focus:outline-none tag-input mt-2' placeholder='Tag' required />    <br />
                                </div>


                            </div>




                            <div>
                                <label className='text-[13px] xl:text-[14px] text-[#000000ba] font-medium'>Attach File</label><br />
                                <div className='relative'>
                                    <input type='file' onChange={(e) => setAttachFile(e.target.value)} className='border border-1 rounded-md p-[5px] mt-1 w-[100%] mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' />
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
                                                required />

                                            {/* Remove Button for every div */}
                                            <button onClick={() => removeDiv(index)} className='  rounded plus-icon'>
                                                <RemoveIcon />
                                            </button>
                                        </div>
                                    </div>
                                ))}


                            </div>
                            {/* <DescriptionEditer /> */}

                            <div className='pr-[10px] pb-[0] flex gap-[10px] items-center justify-end border-t pt-3'>

                            <button onClick={handleCloseForm} className="bg-white text-[#27004a] border border-[#27004a] h-10 w-20 rounded-md">Cancel</button>
                                
                              
                                <button className='second-btn' >Save </button>
                            </div>
                        </div>
                    </form>

                </div>
        
        </div>
    )
}

export default TaskForm