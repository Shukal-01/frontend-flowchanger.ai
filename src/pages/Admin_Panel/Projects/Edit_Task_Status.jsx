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
import Select from 'react-select';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';



const Edit_Task_Status = () => {
    let subtitle;
    const { baseUrl, openToast } = useGlobalContext();
    const [openIndex, setOpenIndex] = useState(null);
    const [allStaff, setAllStaff] = useState();
    const [allTaskStatus, setAllTaskStatus] = useState([]);
    console.log("all ", allTaskStatus)
    const [updateAllTaskStatus, setUpdateAllTaskStatus] = useState(false);
    const [taskStatus, setTaskStatus] = useState({
        name: "",
        color: "#000000",
        order: "",
        isHiddenFor: [],
        canBeChangedTo: [],
    })

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


    const fetchAllStaff = async () => {
        const response = await fetch(baseUrl + 'staff');
        const data = await response.json();
        setAllStaff(data?.map((staff) => {
            return {
                id: staff?.id,
                label: staff?.name
            }
        }));
    }
    const fetchAllTaskStatus = async () => {
        const response = await fetch(baseUrl + 'task/status');
        const data = await response.json();
        if (response.status == 200) {
            setAllTaskStatus(data)
        }
        else {

        }
        // console.log(data)
    }
    async function createNewTaskStatus(e) {
        // e.preventDefault(); // Uncomment this if using in a form submit event

        const data = {
            taskStatusName: taskStatus.name,
            statusColor: taskStatus.color,
            statusOrder: Number(taskStatus.order),
            isHiddenId: taskStatus.isHiddenFor?.map((staff) => staff?.value),
            canBeChangedId: taskStatus.canBeChangedTo
        };
        console.log("---", data);

        try {
            const response = await fetch(baseUrl + "task/status", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data) // Send the formatted data
            });
            const result = await response.json();
            console.log("result--", result)

            setUpdateAllTaskStatus(!updateAllTaskStatus)
            setTaskStatus({
                name: "",
                color: "#000000",
                order: "",
                isHiddenFor: [],
                canBeChangedTo: [],
            })
            if (response.status == 201) {
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
    }, [])
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
        subtitle.style.color = '#000';

    }

    function closeModal6() {
        setIsOpen6(false);
    }




    const [updateTaskAssigne, setUpdateTaskAssigne] = useState([]);

    const [staffDetail, setStaffDetail] = useState();
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



    const [selectedTaskStatus, setSelectedTaskStatus] = useState(''); // State for selected task status
    const [taskDataDetail, setTaskDetail] = useState([]);
    console.log("taskdatadetail", taskDataDetail);
    const [selectedTask, setSelectedTask] = useState([]);
    console.log("selectone", selectedTask);

    const [statusName, setStatusName] = useState();
    const [statusColor, setStatusColor] = useState();
    const [statusOrder, setStatusOrder] = useState();
    const [filter, setFilter] = useState();



    useEffect(() => {
        if (taskDataDetail) {
            setSelectedTask(taskDataDetail);  // Automatically copy the data to updateData
        }
        fetchStaffDetail();
    }, [taskDataDetail])


    async function updateDataTaskDetails() {
        const taskId = taskDataDetail?.id; // Get the task ID dynamically from `selectedTaskData`
        const result = await fetch(baseUrl + `task/detail/${taskId}`, {
            method: "PUT",
            headers: {
                'Content-type': "application/form-data"
            },
            body: JSON.stringify({ taskStatusName: statusName, statusColor: statusColor, statusOrder: statusOrder, isHiddenId: updateTaskAssigne, canBeChangedId: selectedTaskStatus })
        })
        if (result.status = 200) {
            const data = await result.json();
            console.log(data)
            openToast("Add Task Successfully", "success")
        }
        else {
            openToast("Internal Server Error", "error")
        }
    }
    // Initial selected IDs
    const [exportFormat, setExportFormat] = useState('');
    const handleExport = () => {
        if (exportFormat === 'CSV') exportCSV();
        else if (exportFormat === 'PDF') exportPDF();
        else if (exportFormat === 'Print') printDepartments();
    };

    const exportCSV = () => {
        const csvData = allTaskStatus.map(dep => `${dep.taskStatusName}, ${dep.statusColor}, ${dep.statusOrder}`).join('\n');
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'AllTaskStatus.csv');
    };

    const exportPDF = () => {
        const doc = new jsPDF();
        doc.text("AllTaskStatus", 20, 10);
        allTaskStatus.forEach((dep, index) => {
            doc.text(`${index + 1}. ${dep.taskStatusName},${dep.statusColor},${dep.statusOrder}`, 10, 20 + index * 10);
        });
        doc.save('AllTaskStatus.pdf');
    };

    const printDepartments = () => {
        const printContent = allTaskStatus.map(dep => `${dep.department_name} (Total Users: 1)`).join('\n');
        const newWindow = window.open();
        newWindow.document.write(`<pre>${printContent}</pre>`);
        newWindow.document.close();
        newWindow.print();
    };
    const [rowsToShow, setRowsToShow] = useState(25);
    const handleSelectChange = (event) => {
        setRowsToShow(Number(event.target.value));
    };


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
                                            <h2 className="text-lg font-semibold">Create new task status</h2>
                                        </div>

                                        {/* Modal Body */}
                                        <div className="p-4">
                                            <div className='w-[100%] xl:[48%] mb-[10px] '>
                                                <label className='text-[14px]'>*Status Name</label><br />
                                                <input value={taskStatus?.name} onChange={(e) => {
                                                    setTaskStatus({ ...taskStatus, name: e.target.value })
                                                }} type='text' placeholder='' className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#fff] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' />

                                            </div>
                                            <div className='w-full mb-[10px] '>
                                                <label className='text-[14px]'>*Status Color</label><br />
                                                <input type='color' value={taskStatus?.color} onChange={(e) => {
                                                    setTaskStatus({ ...taskStatus, color: e.target.value })
                                                }} placeholder='' className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#fff] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' />

                                            </div>
                                            <div className='w-[100%] xl:[48%] mb-[10px] '>
                                                <label className='text-[14px]'>*Status Order</label><br />
                                                <input value={taskStatus?.order} onChange={(e) => {
                                                    setTaskStatus({ ...taskStatus, order: e.target.value })
                                                }} type='text' placeholder='' className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#fff] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' />

                                            </div>
                                            <div className="mb-[10px] flex items-center gap-[6px]">
                                                <input type="checkbox" />
                                                <p>Default Filter</p>
                                            </div>
                                            <div className="w-full  mb-[26px]">
                                                <label className="text-[14px] block mb-1">Is hidden for</label>
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

                                            <div className='w-[100%]  mb-[20px]'>
                                                <label className='text-[14px]'>Can be changed to</label><br />
                                                <Select
                                                    isMulti
                                                    name="canBeChangedTo"
                                                    options={allTaskStatus?.map(({ id, taskStatusName }) => ({ label: taskStatusName, value: id }))}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    value={
                                                        taskStatus.canBeChangedTo?.map(value => {
                                                            const status = allTaskStatus?.find(option => option?.id === value);
                                                            return status ? { value: status?.id, label: status?.taskStatusName } : null;
                                                        }).filter(Boolean) // Filter out any null values in case no match is found
                                                    }
                                                    onChange={(selectedOptions) => {
                                                        setTaskStatus((prev) => ({
                                                            ...prev,
                                                            canBeChangedTo: selectedOptions?.map(option => option?.value), // Update state with selected values
                                                        }));
                                                    }}
                                                    styles={{
                                                        control: (base) => ({
                                                            ...base,
                                                            border: '1px solid #ccc',
                                                            borderRadius: '4px',
                                                            padding: '5px',
                                                            backgroundColor: '#F4F5F9',
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
                                <select
                                    onChange={handleSelectChange}
                                    className=' border border-[#e5e7eb] p-[8px]  shadow-sm mr-2 rounded-md pl-0 pr-3 focus:outline-none'>
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
                                className='border border-[#e5e7eb] p-2 pl-0 shadow-sm text-sm rounded-md  focus:outline-none'>
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



                    <div className="main-table-status">
                        <table className="table-auto w-full border border-gray-300 rounded-md table-status">
                            <thead
                                onClick={toggleTable}
                                className="set-shadow cursor-pointer"
                            >
                                <tr>
                                    <th className="p-3 text-center">#</th>
                                    <th className="p-3 text-center">Status Name</th>
                                    <th className="p-3 text-center">Status Color</th>
                                    <th className="p-3 text-center">Status Order</th>
                                    <th className="p-3 text-center">Status Defaulter Filter</th>
                                    <th className="p-3 text-center">Status can be changed to</th>
                                    <th className="p-3 text-center">Status in hidden for</th>
                                </tr>
                            </thead>
                            <tbody
                                className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen5 ? 'max-h-screen' : 'max-h-0'}`}
                            >
                                {
                                    allTaskStatus?.map((status, index) => (
                                        <tr className="border">
                                            <td className="p-3">{index + 1}</td>
                                            <td className="p-3">{status?.taskStatusName}</td>
                                            <td className="p-3">{status?.statusColor}</td>
                                            <td className="p-3">{status?.statusOrder}</td>
                                            <td className="p-3">Yes</td>
                                            <td className="p-3">In Progress</td>
                                            <td className="p-3">
                                                <div className="flex gap-2">
                                                    <button className="bg-[#27004a] p-3 rounded-md text-white"
                                                        onClick={() => {
                                                            setTaskDetail(status)
                                                            openModal6()
                                                        }


                                                        }>Edit</button>
                                                    <button className="bg-red-600 p-3 rounded-md text-white">Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        <div className='flex justify-between p-3 pt-5 w-[100%] items-center  flex-col gap-2  sm:flex-row sm:gap-0'>
                            <p className=' text-[#a5a1a1] text-[14px]'>Showing 1 to {rowsToShow} of {allTaskStatus?.length} entries</p>
                            <div className='pagination flex gap-2 border pt-0 pl-4 pb-0 pr-4 rounded-md'>
                                <Link to="#" className='text-[12px]  pt-2 pb-[8px]'>Previous</Link>
                                <span className='text-[12px] bg-[#511992] flex items-center  text-white pl-3 pr-3 '>1</span>
                                <Link to="#" className='text-[12px]  pt-2 pb-[8px] '>Next</Link>

                            </div>
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
                className="w-[96%] xl:w-[40%] absolute top-[50%] left-[50%] bottom-auto p-0 bg-[#fff] shadow shadow-md rounded-[10px] translate-x-[-50%] translate-y-[-50%]"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} className='border-b p-3   border-[#000] text-[14px]'>Edit New Task</h2>
                <button onClick={closeModal6} className='absolute right-[5px] top-[3px] font-semibold	  bg-[#511992] rounded-full'><CloseIcon className='text-white' /></button>



                <div className='first-panel'>
                    <div className="p-4">
                        <div className='w-[100%] xl:[48%] mb-[10px] '>
                            <label className='text-[14px]'>*Status Name</label><br />
                            <input type='text' placeholder='' onChange={(e) => setStatusName(e.target.value)} defaultValue={taskDataDetail.taskStatusName} className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#fff] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' />

                        </div>
                        <div className='w-[100%] xl:[48%] mb-[10px] '>
                            <label className='text-[14px]'>*Status Color</label><br />
                            <input type='text' placeholder='' onChange={(e) => setStatusColor(e.target.value)} defaultValue={taskDataDetail.statusColor} className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#fff] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' />

                        </div>
                        <div className='w-[100%] xl:[48%] mb-[10px] '>
                            <label className='text-[14px]'>*Status Order</label><br />
                            <input type='text' placeholder='' onChange={(e) => setStatusOrder(e.target.value)} defaultValue={taskDataDetail.statusOrder} className='border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#fff] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]' />

                        </div>
                        <div className="mb-[10px] flex items-center gap-[6px]">
                            <input type="checkbox" onChange={(e) => setFilter(e.target.checked)} />
                            <p>Default Filter</p>
                        </div>
                        <div className='w-[100%]  xl:[48%] mb-[26px]'>
                            <label className='text-[14px]'>is hidden for</label><br />
                            <Select
                                isMulti
                                options={staffDetail?.map(staff => ({
                                    value: staff.id,
                                    label: staff.name
                                }))}
                                defaultValue={staffDetail
                                    ?.filter(staff => taskDataDetail?.isHiddenId?.includes(staff.id))
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
                        <div className='w-[100%]  xl:[48%] mb-[20px]'>
                            <label className='text-[14px]'>Can be changed to</label><br />
                            <select
                                className="border border-1 rounded-md p-[5px] mt-1 w-[100%] bg-[#F4F5F9] focus:outline-none text-[#000] placeholder:font-font-normal text-[14px]"
                                defaultValue={taskDataDetail.canBeChangedId} // Set default value from state
                                onChange={(e) => setSelectedTaskStatus(e.target.value)} // Update state on change
                            >
                                <option value="">Nothing Selected</option>
                                {allTaskStatus?.map((status, index) => (
                                    <option key={status.id} value={status.id}>
                                        {status.taskStatusName}
                                    </option>
                                ))}
                            </select>

                        </div>
                    </div>


                    <div className="pr-[10px] pb-3 flex gap-[10px] justify-end border-t pt-3">
                        <button className="first-btn" onClick={closeModal6}>Cancel</button>
                        <button className="second-btn" onClick={updateDataTaskDetails}>Confirm</button>
                    </div>
                </div>




            </Modal>
        </div>
    );
};
export default Edit_Task_Status




