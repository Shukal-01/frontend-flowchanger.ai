import React, { useState } from "react";
import CachedIcon from "@mui/icons-material/Cached";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import Modal from "react-responsive-modal";
import Select from "react-select";
import SearchIcon from "@mui/icons-material/Search";
import { IoMdArrowDropright } from "react-icons/io";



const Transctions = () => {



  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const [isOpen5, setIsOpen5] = useState(false);
  // Toggle the visibility of tbody
  const toggleTable = () => {
    setIsOpen5(!isOpen5);
  };



  const handleSelectChange = (event) => {
    setRowsToShow(Number(event.target.value));
  };

  const [exportFormat, setExportFormat] = useState("");

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
  const [rowsToShow, setRowsToShow] = useState(25);
  const [departments, setDepartments] = useState([])
  const [allStaff, setAllStaff] = useState();
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
  return (
    <div className="m-4">
     <div>
    
     <div className="w-full p-[20px] shadow-cs rounded-lg border border-[#dbdbdb]  ">
       <div className="flex items-center justify-between sm:flex-row flex-col gap-2 mb-3">
            <div className="flex items-center flex-wrap gap-2 sm:flex-row flex-col w-full">
              <select
                onChange={handleSelectChange}
                className=" border border-[#e5e7eb] p-[7px] text-[14px] shadow-sm rounded-md w-full sm:w-[60px] focus:outline-none"
              >
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="120">120</option>
              </select>
              <select
                onChange={(e) => setExportFormat(e.target.value)}
                className="border border-[#e5e7eb] p-[7px]  text-[14px] shadow-sm rounded-md w-full sm:w-[67px] focus:outline-none"
              >
                <option value="CSV">CSV</option>
                <option value="PDF">PDF</option>
                <option value="Print">Print</option>
              </select>

              <button
                onClick={handleExport}
                className="bg-[#27004a] text-white p-[7px] text-[14px] w-full sm:w-[83px] rounded-md cursor-pointer"
              >
                Export File
              </button>
              <button
                className="border border-[#e5e7eb] text-[14px] rounded-lg shadow-sm p-[7px] w-full sm:w-[123px]"
                onClick={onOpenModal}
              >
                Bulk Action <CachedIcon className="newsidebar-icon" />{" "}
              </button>
            </div>
            <div className="flex items-center relative flex-wrap gap-2 w-full justify-end">
              <input
                type="text"
                placeholder="Search"
                className="border border-1 p-[10px] h-[38px] pr-7
] rounded-3xl focus:outline-none w-[100%] md:w-[200px] text-[15px] text-[#000]"
              />
              <SearchIcon
                className="absolute right-[10px] search-icon    text-[#000]  font-thin text-[#dddddd;
]"
              />{" "}
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
                    <IoMdArrowDropright
                      className={`text-[20px] transition-transform duration-200 ${
                        isOpen5 ? "rotate-90 text-[black]" : "rotate-0"
                      }`}
                    />
                  </th>
                  <th className="p-3 text-center border-r border-[#dbdbdb] whitespace-nowrap">
                    ID
                  </th>
                  <th className="p-3 text-center border-r border-[#dbdbdb] whitespace-nowrap">
                    User Name
                  </th>
                  <th className="p-3 text-center border-r border-[#dbdbdb] whitespace-nowrap">
                    Plan Name
                  </th>
                  <th className="p-3 text-center border-r border-[#dbdbdb] whitespace-nowrap">
                    Payment Method
                  </th>
                  <th className="p-3 text-center border-r border-[#dbdbdb] whitespace-nowrap">
                    Status
                  </th>
                  <th className="p-3 text-center border-r border-[#dbdbdb] whitespace-nowrap">
                    Charging Price
                  </th>
                  <th className="p-3 text-center border-r border-[#dbdbdb] whitespace-nowrap">
                    Features
                  </th>
                  <th className="p-3 text-center border-r border-[#dbdbdb] whitespace-nowrap">
                    Tenure
                  </th>
                  <th className="p-3 text-center border-r border-[#dbdbdb] whitespace-nowrap">
                    Started at
                  </th>

                  <th className="p-3 text-center border-r border-[#dbdbdb] whitespace-nowrap">
                    End Date
                  </th>
                </tr>
              </thead>
              {/* Add transition for tbody */}
              <tbody
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  isOpen5 ? "max-h-screen" : "max-h-0"
                }`}
                style={{ display: isOpen5 ? "table-row-group" : "none" }}
              >
                <tr className="border">
                  <td className="border-r border-[#dbdbdb] whitespace-nowrap">
                    #
                  </td>
                  <td className=" border-r border-[#dbdbdb] whitespace-nowrap ">
                    1
                  </td>
                  <td className=" border-r border-[#dbdbdb] whitespace-nowrap ">
                    Karan
                  </td>
                  <td className=" border-r border-[#dbdbdb] whitespace-nowrap ">
                    N/A
                  </td>
                  <td className=" border-r border-[#dbdbdb] whitespace-nowrap ">
                    Phone Pay
                  </td>
                  <td className=" border-r border-[#dbdbdb] whitespace-nowrap ">
                    Yes
                  </td>
                  <td className=" border-r border-[#dbdbdb] whitespace-nowrap ">
                    N/A
                  </td>
                  <td className=" border-r border-[#dbdbdb] whitespace-nowrap ">
                    N/A
                  </td>
                  <td className=" border-r border-[#dbdbdb] whitespace-nowrap ">
                    N/A
                  </td>
                  <td className=" border-r border-[#dbdbdb] whitespace-nowrap ">
                    N/A
                  </td>
                  <td className=" border-r border-[#dbdbdb] whitespace-nowrap ">
                    12-02-2024
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  </div>
    </div>
  );
};

export default Transctions;
