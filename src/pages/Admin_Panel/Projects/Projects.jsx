import React, { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CachedIcon from '@mui/icons-material/Cached';
import SearchIcon from '@mui/icons-material/Search';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { useGlobalContext } from "../../../Context/GlobalContext";
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import ClipLoader from "react-spinners/ClipLoader";
import { Modal } from 'react-responsive-modal';
import Select from "react-select";
import { IoMdArrowDropright } from "react-icons/io";


const Projects = () => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [projectName, setProjectName] = useState("")

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  const [isOpen, setIsOpen] = useState(false);


  const [isOpen15, setIsOpen15] = useState(false);

  const toggleModal15 = () => {
    setIsOpen15(!isOpen15);
  };
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




  const toggleDropdown1 = () => setIsOpen1(!isOpen1);
  const { baseUrl, openToast } = useGlobalContext();
  const [isTableOpen, setIsTableOpen] = useState(false);
  const [projectDetails, setProjectDetails] = useState([]);
  const [departments, setDepartments] = useState([])
  const [exportFormat, setExportFormat] = useState('');

  const [rowsToShow, setRowsToShow] = useState(25);

  const toggleTable = () => {
    setIsTableOpen(!isTableOpen);
  };

  const handleSelectChange = (event) => {
    setRowsToShow(Number(event.target.value));
  };

  const handleExport = () => {
    if (exportFormat === 'CSV') exportCSV();
    else if (exportFormat === 'PDF') exportPDF();
    else if (exportFormat === 'Print') printDepartments();
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



  const printDepartments = () => {
    const printContent = departments.map(dep => `${dep.department_name} (Total Users: 1)`).join('\n');
    const newWindow = window.open();
    newWindow.document.write(`<pre>${printContent}</pre>`);
    newWindow.document.close();
    newWindow.print();
  };

  async function fetchProjectDetails() {
    try {
      const result = await fetch(baseUrl + "project");
      if (result.status === 200) {
        const res = await result.json();
        setProjectDetails(res.data);
        if (res.data && res.data.length > 0) {
          setIsTableOpen(true);
        }
      }
      else {
        const res = await result.json();
        console.log("an internal server error occured", res.message);
        setProjectDetails([]);
      }
    }
    catch (error) {
      console.error("failed to fetch projects", error);
      setProjectDetails([])
    }
  }

  useEffect(() => {
    fetchProjectDetails();
  }, []);

  // handle search projects
  const handleSearchProject = async () => {
    const queryParams = new URLSearchParams({
      project_name: projectName

    }).toString();
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}project/search-projectByName?${queryParams}`);
      console.log(response);
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setProjectDetails(result);
      } else {
        console.log("error while fetching project")
      }
    } catch (error) {
      console.error('Error searching project:', error);
    }
    finally {
      setIsLoading(false);
    }
  };

  // Debounced search effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (projectName.trim()) {
        handleSearchProject();
      } else {
        fetchProjectDetails(); // Fetch all projects if search input is cleared
      }
    }, 3000);

    return () => clearTimeout(delayDebounceFn); // Cleanup function to clear the timeout
  }, [projectName]);

  return (
    <div className="w-full px-4 py-6 bg-white ">
      <div className="mb-4">
        <Link
          to="/create-new-project"
          className=" text-sm  px-4 py-2 flex items-center gap-[4px] allcrm-btn w-[124px]"
        >
          <AddIcon className="addicon-all" /> New Project
        </Link>
      </div>

      <div className="p-[20px] border rounded-lg bg-white shadow-cs">
        <h2 className="font-medium mb-[10px] flex gap-[6px] items-center"> <LibraryBooksIcon />Projects</h2>


        <div className='flex mb-4 pl-[0px] justify-between p-3 flex-col gap-2  sm:flex-row sm:gap-0'>
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
              className='ml-2 bg-[#27004a] text-white p-[7px] text-[14px] rounded-md cursor-pointer'
            >
              Export File
            </button>
            <button className="border border-[#e5e7eb] text-[14px] ml-[10px] rounded-lg shadow-sm p-[7px] " onClick={onOpenModal} >Bulk Action  <CachedIcon className="newsidebar-icon" /> </button>
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
                {/* Button to close the modal */}

                <button className='second-btn'>Confirm </button>
              </div>

            </Modal>




          </div>

          <div className='right-side relative  w-[200px]'>
            <input type='text' placeholder='Search' className='border border-1  pl-3 h-[38px]  pr-7
] rounded-3xl focus:outline-none w-[100%] text-[15px] text-[#000]' />
            <SearchIcon className='absolute right-[10px] search-icon top-[12px]    text-[#000]  font-thin text-[#dddddd;
]'/>
          </div>
        </div>

        <div className="bg-white rounded-lg w-full shadow-cs border border-[#dcdbdb] overflow-x-auto">



          <table className="w-full table-auto border border-[#dcdbdb] rounded-lg overflow-hidden border-collapse">
            <thead
              className="cursor-pointer  border border-gray-300 shadow-md"
              onClick={toggleAccordion}
            >
              <tr>
                <th className="border-r p-2 flex justify-center items-center text-xs font-medium whitespace-nowrap text-center">
                  <IoMdArrowDropright className={`text-[20px] transition-transform duration-200 ${isOpen ? "rotate-90 text-[black]" : "rotate-0"}`}
                  />
                  <button className="p-[6px] rounded-lg bg-[orange]  mr-[7px] text-[white] ">To Do</button><span className="six-north">6</span>

                </th>
                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                  #
                </th>
                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                  Project Name
                </th>
                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                  Customer
                </th>
             
                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                  Progress
                </th>
                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                  Billing Type
                </th>
                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                  Status
                </th>
                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                  Total Rate
                </th>
                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                  Estimated Hours
                </th>
                <th className="p-2 border-r text-xs font-medium text-center whitespace-nowrap">
                  Members
                </th>
                <th className="p-2 border-r text-xs font-medium text-center whitespace-nowrap">
                  Tags
                </th>

                <th className="p-2 border-r text-xs font-medium text-center whitespace-nowrap">
                  Start Date
                </th>
                <th className="p-2 border-r text-xs font-medium text-center whitespace-nowrap">
                  Deadline
                </th>
                <th className="p-2 border-r text-xs font-medium text-center whitespace-nowrap">
                  Description
                </th>
              </tr>
            </thead>
            {isOpen && (
              <tbody>
                {
                  isLoading && projectDetails?.length === 0 ? (

                    <tr className="h-[100px]">
                      <td colSpan="9" className="text-center py-4">
                        <ClipLoader color="#4A90E2" size={50} />
                      </td>
                    </tr>
                  ) : projectDetails?.length > 0 ? (
                    projectDetails.map((project, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="text-center p-2 text-[12px]  border-r border-[#dbdbdb] whitespace-nowrap"><input type="checkbox" /></td>

                        <td className="text-center p-2 text-[12px]  border-r border-[#dbdbdb] whitespace-nowrap">{index + 1}</td>
                        <td className="text-center p-2 text-[12px]   border-r border-[#dbdbdb] whitespace-nowrap">{project.project_name}</td>
                        <td className="text-center p-2 text-[12px]   border-r border-[#dbdbdb] whitespace-nowrap">Customer</td>
                  
                        <td className="text-center p-2 text-[12px] border-r border-[#dbdbdb] whitespace-nowrap">0%</td>
                        <td className="text-center p-2 text-[12px]   border-r border-[#dbdbdb] whitespace-nowrap">Project Hours</td>
                        <td className="text-center p-2 text-[12px]   border-r border-[#dbdbdb] whitespace-nowrap">Flowchanger</td>
                        <td className="text-center p-2 text-[12px]   border-r border-[#dbdbdb] whitespace-nowrap">1</td>
                        <td className="text-center p-2 text-[12px]   border-r border-[#dbdbdb] whitespace-nowrap">1</td>
                        <td className="text-center p-2 text-[12px]   border-r border-[#dbdbdb] whitespace-nowrap">NA</td>


                        <td className="text-center p-2 text-[12px]   border-r border-[#dbdbdb] whitespace-nowrap">
                         
                          {project.tags.map((tag, i) => (
                            <span key={i} className="border rounded-md p-1 mr-2 text-[12px] inline-block">
                              {tag}
                            </span>
                          ))}
                        </td>
                        <td className="text-center p-2 text-[12px] border-r border-[#dbdbdb]  whitespace-nowrap">{project.start_date}</td>
                        <td className="text-center p-2 text-[12px] border-r border-[#dbdbdb]  whitespace-nowrap">{project.deadline}</td>
                        <td className="text-center p-2 text-[12px] border-r border-[#dbdbdb]  whitespace-nowrap">111</td>
                        {/* <td className="text-center p-2 text-[12px]  border-r border-[#dbdbdb] whitespace-nowrap">{project.status}</td> */}
                      </tr>
                    ))
                  ) : (
                    <tr className="h-[100px]">
                      <td colSpan="12" className="text-center text-red-500 text-sm font-semibold py-4">
                        No projects found.
                      </td>
                    </tr>)
                }
              </tbody>
            )}
          </table>




        </div>
        <div className='flex justify-between p-[14px] pb-[0] w-[100%] items-center  flex-col gap-2  sm:flex-row sm:gap-0'>
          <p className=' text-[#a5a1a1] text-[14px]'>Showing 1 to {rowsToShow} of {departments.length} entries</p>
          <div className='pagination flex gap-2 border pt-0 pl-4 pb-0 pr-4 rounded-md'>
            <Link to="#" className='text-[12px]  pt-2 pb-[8px]'>Previous</Link>
            <span className='text-[12px] bg-[#27004a] flex items-center  text-white pl-3 pr-3 '>1</span>
            <Link to="#" className='text-[12px]  pt-2 pb-[8px] '>Next</Link>

          </div>
        </div>
      </div>
    </div>
  );
}
export default Projects;