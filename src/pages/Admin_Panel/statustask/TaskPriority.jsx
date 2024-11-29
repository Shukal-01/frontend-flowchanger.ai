import React, { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CachedIcon from '@mui/icons-material/Cached';
import SearchIcon from '@mui/icons-material/Search';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PersonIcon from '@mui/icons-material/Person';
import Modal from 'react-modal';
import CloseIcon from '@mui/icons-material/Close';
import { useGlobalContext } from "../../../Context/GlobalContext";
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from "@mui/icons-material/Delete";
import { IoMdArrowDropright } from "react-icons/io";
import ConfirmationModal from "../../../components/Staff/Modals/ConfirmationModal";




const TaskPriority = () => {
    
  const [open11, setOpen11] = useState(false);

  const onOpenModal11 = () => setOpen11(true);
  const onCloseModal11 = () => setOpen11(false);
    const [openIndex, setOpenIndex] = useState(null);
    const { baseUrl, openToast } = useGlobalContext();

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
    }

    //Toggle swich off on btn

    //Modal
    // State to control the visibility of the modal
    const [isOpen, setIsOpen] = useState(false);

    // Function to toggle the modal
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    //Modal2
    //Modal
    // State to control the visibility of the modal
    const [isOpen3, setIsOpen3] = useState(false);

    // Function to toggle the modal
    const toggleModal3 = () => {
        setIsOpen3(!isOpen3);
    };

    //Modal2


    const [isOpen5, setIsOpen5] = useState(true);

    // Toggle the visibility of tbody
    const toggleTable = () => {
        setIsOpen5(!isOpen5);
    };

    let subtitle;

    const [modalIsOpen6, setIsOpen6] = React.useState(false);
    function openModal6() {
        setIsOpen6(true);
    }
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#000';

    }

    function closeModal6() {
        setIsOpen6(false);
    }

    const [priorityName, setPriorityName] = useState();
    async function submitPriority() {
        try {
            const result = await fetch(baseUrl + "task/priority", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ taskPriorityName: priorityName })
            })
            if (result.status == 201) {
                const data = await result.json();
                openToast(data.message, "success");
                toggleModal();
            }
            else {
                const error = await result.json();
                openToast(error.message || "internal server error", "error")
            }
        }
        catch (error) {
            console.error("Error in POST request:", error);

            // Specific handling for "Failed to fetch"
            if (error.message === "Failed to fetch") {
                openToast("Network error: Unable to connect to the server", "error");
            } else {
                openToast(error.message || "An unexpected error occurred", "error");
            }
        }
    }


    const [priorityHeading, setPriorityHeading] = useState([]);
    console.log("priority", priorityHeading)
    async function fetchPriority() {
        try {
            const result = await fetch(baseUrl + "task/priority");
            if (result.status == 200) {
                const res = await result.json()
                console.log("---", res)
                setPriorityHeading(res.taskPriority);

            } else {
                const error = await result.json()
                throw new Error(error.message || "Internal Server Error", "error")
            }
        }
        catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        fetchPriority();
    }, [])


    const [exportFormat, setExportFormat] = useState('');
    const handleExport = () => {
        if (exportFormat === 'CSV') exportCSV();
        else if (exportFormat === 'PDF') exportPDF();
        else if (exportFormat === 'Print') printDepartments();
    };

    const exportCSV = () => {
        const csvData = priorityHeading.map(dep => `${dep.taskPriorityName}`).join('\n');
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'Priority Name.csv');
    };

    const exportPDF = () => {
        const doc = new jsPDF();
        doc.text("Priority Name", 20, 10);
        priorityHeading.forEach((dep, index) => {
            doc.text(`${index + 1}. ${dep.taskPriorityName}`, 10, 20 + index * 10);
        });
        doc.save('Priority Name.pdf');
    };

    const printDepartments = () => {
        const printContent = priorityHeading.map(dep => `${dep.taskPriorityName} `).join('\n');
        const newWindow = window.open();
        newWindow.document.write(`<pre>${printContent}</pre>`);
        newWindow.document.close();
        newWindow.print();
    };
    const [rowsToShow, setRowsToShow] = useState(25);
    const handleSelectChange = (event) => {
        setRowsToShow(Number(event.target.value));
    };

    function openModal6() {
        setIsOpen6(true);
    }
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#000';

    }

    function closeModal6() {
        setIsOpen6(false);
    }

    const [selectedPriority, setSelectedPriority] = useState();
    console.log(selectedPriority)
    const handlePrioritySelect = (opt) => {
        console.log(opt)
        setSelectedPriority(opt);
        openModal6();
    };

    const [updatePriority, setUpdatePriority] = useState("");
    console.log(updatePriority)
    async function updateTaskPriority() {
        const taskPriorityId = selectedPriority.id;
        console.log(taskPriorityId)
        try {
            const result = await fetch(baseUrl + `task/priority/${taskPriorityId}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ taskPriorityName: updatePriority })
            });
            const data = await result.json();
            console.log(data)
            if (result.status == 200) {
                openToast("Update Task Name Successfully", "success")
            }
            else {
                const error = await result.json();
                throw new Error(error.message || `HTTP Error: ${result.status}`);
            }
        }
        catch (error) {
            console.error("Error fetching task status:", error);
        }
    }

    const [open8, setOpen8] = useState(false);

    const onOpenModal8 = () => setOpen8(true);
    const onCloseModal8 = () => setOpen8(false);

    return (
        <div className=" w-full  ">
            <div className="bg-[#fff] p-[10px] ">
                <div className="p-[20px] rounded-md set-shadow w-full">
                    <div className="flex items-center gap-[14px] mb-[10px]">
                        <div className="flex items-center justify-center text-[14px] h-[50px]">
                            {/* Button to open the modal */}
                            <button
                                onClick={toggleModal}
                                className="px-4 py-2 second-btn bg-blue-500 text-white rounded-md"
                            >
                                Add Task Priority
                            </button>

                            {/* Modal (visible only when isOpen is true) */}
                            {isOpen && (
                                <div className="fixed z-[1] inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                                    <div className="bg-white rounded-lg shadow-lg w-96">
                                        {/* Modal Header */}
                                        <div className="px-4 py-2 border-b">
                                            <h2 className="text-lg font-semibold">Create New Priority</h2>
                                        </div>

                                        {/* Modal Body */}
                                        <div className="p-4">
                                            <div className='w-[100%] xl:[48%] mb-[10px] '>
                                                <label className='text-[14px]'>*Priority Name</label><br />
                                                <input type='text' onChange={(e) => setPriorityName(e.target.value)} placeholder='' className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#fff] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' />

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
                                                onClick={submitPriority}
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
                            <thead onClick={toggleTable} className="set-shadow cursor-pointer">
                                <tr>
                                    <th className="border-r p-3 flex justify-center items-center text-xs font-medium whitespace-nowrap text-center">
                                        <IoMdArrowDropright className={`text-[20px] transition-transform duration-200 ${isOpen5 ? "rotate-90 text-[black]" : "rotate-0"}`}
                                        />


                                    </th>
                                    <th className="p-3 text-center border-r border-[#dbdbdb] whitespace-nowrap ">ID</th>
                                    <th className="p-3 text-center border-r border-[#dbdbdb] whitespace-nowrap ">Priority Name</th>
                                    <th className="p-3 text-center border-r border-[#dbdbdb] whitespace-nowrap ">Action</th>
                                </tr>
                            </thead>
                            <tbody
                                className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen5 ? "table-row-group" : "hidden"
                                    }`}
                            >
                                {priorityHeading?.map((priorityName, index) => (
                                    <tr key={index} className="border">
                                        <td className="border-r border-[#dbdbdb] text-left whitespace-nowrap">#</td>
                                        <td className="p-3 text-center border-r border-[#dbdbdb] whitespace-nowrap ">{index + 1}</td>
                                        <td className="p-3 text-center border-r border-[#dbdbdb] whitespace-nowrap ">{priorityName.taskPriorityName}</td>
                                        <td className="p-3 text-center border-r border-[#dbdbdb] whitespace-nowrap ">
                                            <div className="flex gap-2 justify-center">
                                                <button className="rounded-md text-white"
                                                    onClick={() => handlePrioritySelect(priorityName)}
                                                >
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
                                ))}
                            </tbody>
                        </table>


                    
                    </div>
                    <div className='flex justify-between p-3 pt-5 w-[100%] items-center  flex-col gap-2  sm:flex-row sm:gap-0'>
                            <p className=' text-[#a5a1a1] text-[14px]'>Showing 1 to {rowsToShow} of {priorityHeading?.length} entries</p>
                            <div className='pagination flex gap-2 border pt-0 pl-4 pb-0 pr-4 rounded-md'>
                                <Link to="#" className='text-[12px]  pt-2 pb-[8px]'>Previous</Link>
                                <span className='text-[12px] bg-[#27004a] flex items-center  text-white pl-3 pr-3 '>1</span>
                                <Link to="#" className='text-[12px]  pt-2 pb-[8px] '>Next</Link>

                            </div>
                        </div>

                </div>
            </div>
            <Modal
                isOpen={modalIsOpen6}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal6}
                // style={customStyles}
                contentLabel="Example Modal"
                className="w-[96%] xl:w-[40%] absolute top-[50%] left-[50%] bottom-auto p-0 bg-[#fff]  shadow-md rounded-[10px] translate-x-[-50%] translate-y-[-50%]"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} className='border-b p-3   border-[#000] text-[14px]'>Edit Task Priority</h2>
                <button onClick={closeModal6} className='absolute right-[5px] top-[3px] font-semibold	  bg-[#511992] rounded-full'><CloseIcon className='text-white' /></button>



                <div className='first-panel'>
                    <div className="p-4">
                        <div className='w-[100%] xl:[48%] mb-[10px] '>
                            <label className='text-[14px]'>*Task Priority Name</label><br />
                            <input type='text' placeholder='' onChange={(e) => setUpdatePriority(e.target.value)} defaultValue={selectedPriority?.taskPriorityName} className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#fff] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' />

                        </div>
                    </div>


                    <div className="pr-[10px] pb-3 flex gap-[10px] justify-end border-t pt-3">
                        <button className="first-btn" onClick={closeModal6}>Cancel</button>
                        <button className="second-btn" onClick={updateTaskPriority}>Confirm</button>
                    </div>
                </div>




            </Modal>
        </div>
    )
}

export default TaskPriority;