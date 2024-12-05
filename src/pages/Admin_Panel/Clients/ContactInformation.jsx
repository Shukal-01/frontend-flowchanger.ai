import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CachedIcon from '@mui/icons-material/Cached';
import SearchIcon from '@mui/icons-material/Search';
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import { useGlobalContext } from '../../../Context/GlobalContext';
import { Modal } from 'react-responsive-modal';
import Select from "react-select";
import { IoMdArrowDropright } from "react-icons/io";



const ContactInformation = () => {

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal15 = () => {
        setIsOpen15(!isOpen15);
    };
    const [isOpen15, setIsOpen15] = useState(false);
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

    const [allStaff, setAllStaff] = useState();

    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const handleSelectChange = (event) => {
        setRowsToShow(Number(event.target.value));
    };
    const [rowsToShow, setRowsToShow] = useState(25);

    const [exportFormat, setExportFormat] = useState("");
    const [departments, setDepartments] = useState([])

    const handleExport = () => {
        if (exportFormat === "CSV") exportCSV();
        else if (exportFormat === "PDF") exportPDF();
        else if (exportFormat === "Print") printDepartments();
    };

    const exportCSV = () => {
        const csvData = departments
            .map((dep) => `${dep.department_name}, Total Users: 1`)
            .join("\n");
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, "departments.csv");
    };

    const exportPDF = () => {
        const doc = new jsPDF();
        doc.text("Department List", 20, 10);
        departments.forEach((dep, index) => {
            doc.text(
                `${index + 1}. ${dep.department_name} (Total Users: 1)`,
                10,
                20 + index * 10
            );
        });
        doc.save("departments.pdf");
    };

    const printDepartments = () => {
        const printContent = departments
            .map((dep) => `${dep.department_name} (Total Users: 1)`)
            .join("\n");
        const newWindow = window.open();
        newWindow.document.write(`<pre>${printContent}</pre>`);
        newWindow.document.close();
        newWindow.print();
    };

    const [clientData, setClientData] = useState([])
    const { baseUrl, openToast } = useGlobalContext()
    const fetchDetail = async () => {
        const result = await fetch(baseUrl + "client");
        if (result.status == 200) {
            const res = await result.json();
            console.log(res)
            setClientData(res)
        }
        else {
            openToast(result.message);
        }
    }

    useEffect(() => {
        fetchDetail();
    }, [])
    const [isOn, setIsOn] = useState(false);

    const toggleSwitch = () => {
        setIsOn(!isOn);
    }
    const [isOn2, setIsOn2] = useState(false);

    const toggleSwitch2 = () => {
        setIsOn2(!isOn2);
    }
    const [isOn3, setIsOn3] = useState(false);

    const toggleSwitch3 = () => {
        setIsOn3(!isOn3);
    }
    return (
        <div className='table-section mt-[40px] ml-[20px] mr-[20px] bg-white shadow-cs p-[20px] rounded-lg '>
           
                <h2 className='font-medium text-[18px]'>Contact Information</h2>

                <div className='flex mb-4 justify-between p-3 flex-col gap-2 pl-[0] sm:flex-row sm:gap-0'>
          <div className='left-side '>
            <select
              onChange={handleSelectChange}
              className=' border border-[#e5e7eb] p-[7px] text-[14px]  shadow-sm  mr-0 sm:mr-2  rounded-md  focus:outline-none'>
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


                <div className=' bg-white rounded-lg w-full shadow-cs border border-[#dcdbdb]  overflow-x-auto'>
                    <table className='w-full table-auto border border-[#dcdbdb] rounded-lg overflow-hidden border-collapse'>
                        <thead className=' cursor-pointer border border-gray-300 shadow-md ' onClick={toggleAccordion} >


                            <tr>
                                <th className="border-r p-2 flex justify-center text-xs font-medium whitespace-nowrap text-center">
                                    <IoMdArrowDropright className={`text-[20px] transition-transform duration-200 ${isOpen ? "rotate-90 text-[black]" : "rotate-0"}`}
                                    />

                                </th>
                                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                                    #
                                </th>
                                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                                    Name
                                </th>
                                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                                    Company
                                </th>
                                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                                    Primary Contact
                                </th>
                                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                                    Primary Email
                                </th>
                                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                                    Phone
                                </th>
                                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                                    Active
                                </th>
                                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                                    Groups
                                </th>
                                <th className="border-r p-2 text-xs font-medium whitespace-nowrap text-center">
                                    Date Created
                                </th>
                                <th className="p-2 text-xs font-medium text-center">
                                    Action
                                </th>
                            </tr>


                        </thead>
                        {isOpen && (
                            <tbody className={`transition-body ${isOpen ? "open" : ""}`}>

                                {clientData?.map((client, index) => {
                                    return <tr className='border'>

                                        <td>{client.name}</td>
                                        <td>pa</td>
                                        <td>{client.email}</td>
                                        <td>brandpa</td>
                                        <td>{client.mobile}</td>
                                        <td>Demo</td>
                                        <td>4 Weeks ago</td>
                                        <td>
                                            <div
                                                className={`${isOn3 ? 'bg-[#27004a]' : 'bg-[#e6e0e0]'
                                                    } relative inline-block w-12 h-6 rounded-full transition-colors duration-300 ease-in-out cursor-pointer`}
                                                onClick={toggleSwitch3}
                                            >
                                                <span
                                                    className={`${isOn3 ? 'translate-x-6 mr-[21px] ' : 'translate-x-0 mr-[21px]'
                                                        } inline-block w-6 h-6 bg-[#d5cdcd] rounded-full transform transition-transform duration-300 ease-in-out`}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        )}
                    </table>
                </div>

          
            <div className='flex justify-between p-3 pt-5 w-[100%] items-center  flex-col gap-2  sm:flex-row sm:gap-0'>
            <p className=' text-[#a5a1a1] text-[14px]'>Showing 1 to {rowsToShow} of {departments.length} entries</p>
            <div className='pagination flex gap-2 border pt-0 pl-4 pb-0 pr-4 rounded-md'>
              <Link to="#" className='text-[12px]  pt-2 pb-[8px]'>Previous</Link>
              <span className='text-[12px] bg-[#27004a] flex items-center  text-white pl-3 pr-3 '>1</span>
              <Link to="#" className='text-[12px]  pt-2 pb-[8px] '>Next</Link>

            </div>
          </div>
        </div>
    )
}

export default ContactInformation