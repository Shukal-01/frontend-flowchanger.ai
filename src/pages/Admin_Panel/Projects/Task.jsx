import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
// import DescriptionEditer from './DescriptionEditer';
import RemoveIcon from '@mui/icons-material/Remove';
import SellIcon from '@mui/icons-material/Sell';
import { useGlobalContext } from "../../../Context/GlobalContext";
import Select from 'react-select';

const Task = () => {
  const { baseUrl } = useGlobalContext();
  
 
    const [isOpen, setIsOpen] = useState(false);
  
    const handleToggle = () => {
      setIsOpen((prevState) => !prevState);
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

  function closeModal15() {
    setIsOpen15(false);
  }
  //modal7


  // Array of accordion item
  const [allTaskStatus, setAllTaskStatus] = useState();
  const fetchAllTaskStatus = async () => {
    const response = await fetch(baseUrl + 'task/status');
    const data = await response.json();
    setAllTaskStatus(data)
  }

  const [departments, setDepartments] = useState([])
  const fetchDepartments = async () => {
    const result = await fetch(baseUrl + "department")

    if (result.status == 200) {
      const res = await result.json();
      setDepartments(res.data)

    }
    else {
      alert("An Error Occured")
    }

  }

  const [taskPriority, setTaskPriority] = useState([]);
  const fetchTaskPriority = async () => {
    const result = await fetch(baseUrl + "task/priority")

    if (result.status == 200) {
      const res = await result.json();
      setTaskPriority(res)

    }
    else {
      alert("An Error Occured")
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
    const result = await fetch(baseUrl + "staff")
    console.log("reuslt---", result)
    if (result.status == 200) {
      const res = await result.json();
      setStaffDetail(res)
    }
    else {
      alert("An Error Occured")
    }

  }

  const[projectDetails,setProjectDetails]=useState([]);
    async function fetchProjectDetails(){
        const result=await fetch(baseUrl+"project");
        console.log("---",result)
        if (result.status == 200) {
            const res = await result.json();
            console.log(res)
            setProjectDetails(res.data)
          }
          else {
            alert("An Error Occured")
          }
    }

    useEffect(() => {
    fetchStaffDetail();
    fetchAllTaskStatus();
    fetchDepartments();
    fetchTaskPriority();
    fetchProjectDetails();
  }, [])

  const[taskName,setTaskName]=useState();
  // const


  const accordionItems = [
    {
      title:
        <div>
          <table className="w-full">
            <thead className="tablehead">
              <tr className="rounded-lg">

                <th className="text-[12px] font-medium p-[8px] w-[100px] border-r whitespace-nowrap "><button className="p-[6px] rounded-lg bg-[orange]  mr-[7px] text-[white] ">To Do</button><span className="six-north">6</span></th>


                <th className="text-[12px] border-r w-[60px]  font-medium p-[8px]   text-left">#</th>


                <th className="text-[12px] w-[220px] p-[8px] border-r font-medium whitespace-nowrap    text-left">Task Name</th>


                <th className="text-[12px] font-medium p-[8px] w-[120px] border-r whitespace-nowrap  text-left">Start Date</th>


                <th className="text-[12px] font-medium p-[8px] w-[120px] border-r whitespace-nowrap	text-left">Due Date</th>



                <th className="text-[12px] font-medium p-[8px] w-[120px] border-r whitespace-nowrap	text-left">End Date</th>
                <th className="text-[12px] font-medium p-[8px] w-[100px] border-r whitespace-nowrap	text-left">Assigned to</th>
                <th className="text-[12px] font-medium p-[8px] w-[80px] border-r whitespace-nowrap	text-left">Tags</th>
                <th className="text-[12px] font-medium p-[8px] w-[100px] border-r whitespace-nowrap	text-left">Priority</th>










              </tr>
            </thead>
          </table>
        </div>,
      content: (
        <table className="w-full " >
          <tbody>

            <tr className="rounded-lg border-b border-[#e5e7eb]">

              <td className="text-[12px] font-medium p-[8px] w-[100px] text-left  whitespace-nowrap"><Link className="textcomplete">Complete</Link></td>


              <td className="text-[12px]  w-[60px]  font-medium p-[8px] text-left ">#</td>


              <td className="text-[12px] w-[220px] p-[8px]  text-left font-medium whitespace-nowrap"><Link to="/taskview" className="textcomplete">Soul relation intro</Link></td>


              <td className="text-[12px] font-medium p-[8px] text-left w-[120px]  whitespace-nowrap	">13-08-2024</td>


              <td className="text-[12px] font-medium p-[8px] text-left w-[120px]  whitespace-nowrap	">13-08-2024</td>



              <td className="text-[12px] font-medium p-[8px] text-left w-[120px]  whitespace-nowrap	">13-08-2024</td>
              <td className="text-[12px] font-medium p-[8px] w-[100px] text-left  whitespace-nowrap	"><button className="bg-[#c4bfbf] text-white rounded-lg p-[6px]">Ads</button></td>
              <td className="text-[12px] font-medium p-[8px] w-[80px] text-left whitespace-nowrap	">-</td>
              <td className="text-[12px] font-medium p-[8px] w-[100px] text-left whitespace-nowrap	"><Link className="highred">High</Link></td>










            </tr>
            <tr className="rounded-lg border-b border-[#e5e7eb]">

              <td className="text-[12px] font-medium p-[8px] w-[100px] text-left  whitespace-nowrap"><Link className="textcomplete">Complete</Link></td>


              <td className="text-[12px]  w-[60px]  font-medium p-[8px] text-left ">#</td>


              <td className="text-[12px] w-[220px] p-[8px]  text-left font-medium whitespace-nowrap"><Link to="/taskview" className="textcomplete">Soul relation intro</Link></td>


              <td className="text-[12px] font-medium p-[8px] text-left w-[120px]  whitespace-nowrap	">13-08-2024</td>


              <td className="text-[12px] font-medium p-[8px] text-left w-[120px]  whitespace-nowrap	">13-08-2024</td>



              <td className="text-[12px] font-medium p-[8px] text-left w-[120px]  whitespace-nowrap	">13-08-2024</td>
              <td className="text-[12px] font-medium p-[8px] w-[100px] text-left  whitespace-nowrap	"><button className="bg-[#c4bfbf] text-white rounded-lg p-[6px]">Ads</button></td>
              <td className="text-[12px] font-medium p-[8px] w-[80px] text-left whitespace-nowrap	">-</td>
              <td className="text-[12px] font-medium p-[8px] w-[100px] text-left whitespace-nowrap	"><Link className="highred2">Medium</Link></td>










            </tr>

          </tbody>





        </table>

      )
    },

    //   { title: "2", content: "This is the content for item 2" },
    //     { title: "3", content: "This is the content for item 3" },

  ];

  return (
    <div className="w-full px-4 py-6 overflow-x-auto">
      <div className=" h-[30px] mb-5">
        {/* Button to open the modal */}
        <button
          className="bg-[#27004a] p-[8px] text-white flex items-center text-[12px] focus-visible:outline-none  rounded-md "
          onClick={toggleModal15}
        >
          <AddIcon className="newadd" /> New Task
        </button>

        {/* Modal */}
        {isOpen15 && (
          <div className="fixed inset-0 flex items-center justify-center p-[14px] z-50 bg-gray-800 bg-opacity-75">
            <div className="bg-white p-6 rounded shadow-cs w-[550px] relative h-[100%] overflow-scroll">
              <h2 className="text-lg font-semibold mb-[16px]">Add new Task</h2>
              <div className="w-[100%]">

                <div className="w-[100%]">

                  <label className='text-[13px] xl:text-[14px] text-[#000000ba] font-medium'>Task Name</label><br />
                  <input type='text' className='border border-1 rounded-md p-[5px] mt-1 w-[100%] mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' />    <br />
                </div>
                <div className="flex gap-[8px]">

                  <div className="w-[100%]" >
                    <label className='text-[13px] xl:text-[14px] text-[#000000ba] font-medium'>Task Status</label>    <br />
                    <select className='border border-1 rounded-md p-[5px] mt-1 w-[100%] mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]'>
                      <option>Please Select Task Status</option>
                      {
                        allTaskStatus?.map((s, index) => {
                          return <option>{s?.taskStatusName}</option>
                        })
                      }
                    </select>
                  </div>

                </div>
                <div className="flex gap-[8px]">
                  <div className="w-[50%]">
                    <label className='text-[13px] xl:text-[14px] text-[#000000ba] font-medium'>Start Date</label>    <br />
                    <input type='date' className='border border-1 rounded-md p-[5px] mt-1 w-[100%]  mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' />    <br />
                  </div>
                  <div className="w-[50%]">
                    <label className='text-[13px] xl:text-[14px] text-[#000000ba] font-medium'>End Date</label>    <br />
                    <input type='date' className='border border-1 rounded-md p-[5px] mt-1 w-[100%] mb-[10px]   focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' />    <br />
                  </div>
                </div>
                <div className="flex gap-[8px]">
                  <div className="w-[50%]">
                    <label className='text-[13px] xl:text-[14px] text-[#000000ba] font-medium'>Due Date</label>    <br />
                    <input type='date' className='border border-1 rounded-md p-[5px] mt-1 w-[100%] mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' />    <br />
                  </div>
                  <div className="w-[50%]">

                    <label className='text-[13px] xl:text-[14px] text-[#000000ba] font-medium'>Select Project</label>    <br />
                    <select className='border border-1 rounded-md p-[5px] mt-1 mb-[10px] w-full  focus:outline-none text-[#000] placeholder:font-font-normal xl:text-[14px] text-[12px] mr-[0px]   hover:bg-[#fff]'>
                      <option>Select Project</option>
                     {
                      projectDetails?.map((s,index)=>{
                        return <option value={s.id}>{s.project_name}</option>
                      })
                     }
                    </select>
                  </div>
                </div>
                <div className="w-[100%] flex gap-[10px]">
                  <div className="w-[50%]">
                    <label className='text-[13px] xl:text-[14px] text-[#000000ba] font-medium'>Select Department</label>    <br />
                    <select className='border border-1 rounded-md p-[5px] mt-1 mb-[10px] w-full  focus:outline-none text-[#000] placeholder:font-font-normal xl:text-[14px] text-[12px] mr-[0px]   hover:bg-[#fff]'>
                      <option>Department</option>
                      {
                        departments?.map((s, index) => {
                          return <option>{s.department_name}</option>
                        })
                      }

                    </select>
                  </div>
                  <div className="w-[50%]">
                    <label className='text-[13px] xl:text-[14px] text-[#000000ba] font-medium'>Task Priority</label>    <br />
                    <select className='border border-1 rounded-md p-[5px] mt-1 mb-[10px] w-full  focus:outline-none text-[#000] placeholder:font-font-normal xl:text-[14px] text-[12px] mr-[0px]   hover:bg-[#fff]'>
                      <option>Select Task Priority</option>
                      {
                        taskPriority?.map((s, index) => {
                          return <option>{s.taskPriorityName}</option>
                        })
                      }
                    </select>
                  </div>
                </div>
                <div className="">


                  <div className="w-[100%]">
                    <label className='text-[13px] xl:text-[14px] text-[#000000ba] font-medium'>Task Assignee</label>    <br />
                    <Select
                      isMulti
                      options={options}
                      onChange={handleChange}
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
                  <textarea type='text' className='border border-1 rounded-md p-[5px] mt-1 w-[100%] mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' />    <br />

                  <div className="w-[100%]">
                    <label className='text-[13px] xl:text-[14px] text-[#000000ba] font-medium mb-3'><SellIcon className='sell-icon' />Task Tag</label><br />
                    <input type='text' className=' mb-[10px]  pr-2 focus:outline-none tag-input mt-2' placeholder='Tag' />    <br />
                  </div>


                </div>




                <div>
                  <label className='text-[13px] xl:text-[14px] text-[#000000ba] font-medium'>Attach File</label><br />
                  <div className='relative'>
                    <input type='file' className='border border-1 rounded-md p-[5px] mt-1 w-[100%] mb-[10px]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' />
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
                {/* <div className='flex'>
                                    <input type='number' placeholder='22' className='border border-1 rounded-md p-[5px] mt-1 w-[100%]  focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' />    <br />
                                    <select className='border border-1 rounded-md p-[5px] mt-1 w-[94%]   focus:outline-none text-[#000] placeholder:font-font-normal xl:text-[14px] text-[12px] mr-[0px] ml-[7px] hover:bg-[#fff]'>
                                        <option>Months</option>
                                        <option>Weekly</option>
                                        <option>Daily</option>
                                        <option>Hourly</option>
                                    </select>
                                </div> */}


                {/* <DescriptionEditer /> */}

                <div className='pr-[10px] pb-3 flex gap-[10px] justify-end border-t pt-3'>
                  {/* Button to close the modal */}
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={toggleModal15}
                  >
                    Close Modal
                  </button>
                  <button className='second-btn'>Save </button>
                </div>
              </div>


            </div>
          </div>
        )}
      </div>

      <div className="bg-white shadow-cs rounded-lg keyframe1">
      <div className="overflow-x-auto">
        <table className="w-full min-w-max">
          {/* Table Header - Acts as Toggle Button */}
          <thead className="tablehead cursor-pointer bg-gray-400" onClick={handleToggle}>
            <tr className="rounded-lg">
              <th className="text-[12px] font-medium p-2 min-w-[100px] border-r whitespace-nowrap">
                <button className="p-[6px] rounded-lg bg-[orange] mr-2 text-white">
                  To Do
                </button>
                <span className="six-north">6</span>
              </th>
              <th className="text-[12px] font-medium p-2 min-w-[60px] border-r text-left">#</th>
              <th className="text-[12px] font-medium p-2 min-w-[220px] border-r text-left">
                Task Name
              </th>
              <th className="text-[12px] font-medium p-2 min-w-[120px] border-r text-left">
                Start Date
              </th>
              <th className="text-[12px] font-medium p-2 min-w-[120px] border-r text-left">
                Due Date
              </th>
              <th className="text-[12px] font-medium p-2 min-w-[120px] border-r text-left">
                End Date
              </th>
              <th className="text-[12px] font-medium p-2 min-w-[100px] border-r text-left">
                Assigned to
              </th>
              <th className="text-[12px] font-medium p-2 min-w-[80px] border-r text-left">
                Tags
              </th>
              <th className="text-[12px] font-medium p-2 min-w-[100px] text-left">
                Priority
              </th>
            </tr>
          </thead>

          {/* Table Body - Collapsible Content */}
          {isOpen && (
            <tbody>
              {[...Array(2)].map((_, index) => (
                <tr key={index} className="rounded-lg border-b border-[#e5e7eb]">
                  <td className="text-[12px] font-medium p-2 min-w-[100px] text-left whitespace-nowrap">
                    <Link className="textcomplete">Complete</Link>
                  </td>
                  <td className="text-[12px] font-medium p-2 min-w-[60px] text-left">#</td>
                  <td className="text-[12px] font-medium p-2 min-w-[220px] text-left whitespace-nowrap">
                    <Link to="/taskview" className="textcomplete">Soul relation intro</Link>
                  </td>
                  <td className="text-[12px] font-medium p-2 min-w-[120px] text-left whitespace-nowrap">
                    13-08-2024
                  </td>
                  <td className="text-[12px] font-medium p-2 min-w-[120px] text-left whitespace-nowrap">
                    13-08-2024
                  </td>
                  <td className="text-[12px] font-medium p-2 min-w-[120px] text-left whitespace-nowrap">
                    13-08-2024
                  </td>
                  <td className="text-[12px] font-medium p-2 min-w-[100px] text-left whitespace-nowrap">
                    <button className="bg-[#c4bfbf] text-white rounded-lg p-[6px]">Ads</button>
                  </td>
                  <td className="text-[12px] font-medium p-2 min-w-[80px] text-left">-</td>
                  <td className="text-[12px] font-medium p-2 min-w-[100px] text-left whitespace-nowrap">
                    <Link className={index === 0 ? "highred" : "highred2"}>
                      {index === 0 ? "High" : "Medium"}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>

    </div>
  );
}

export default Task;