import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import CachedIcon from "@mui/icons-material/Cached";
import SearchIcon from "@mui/icons-material/Search";
import { useGlobalContext } from "../../../Context/GlobalContext";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import Select from "react-select";
import ClipLoader from "react-spinners/ClipLoader";
import { Modal } from "react-responsive-modal";
import ConfirmationModal from "../../../components/Staff/Modals/ConfirmationModal";

const Main = () => {
  const [open10, setOpen10] = useState(false);

  const onOpenModal10 = () => setOpen10(true);
  const onCloseModal10 = () => setOpen10(false);

  const { baseUrl, setRoleName, setRoleId, setEditPermissions, openToast } =
    useGlobalContext();
  const [roles, setRoles] = useState([]);
  const [exportFormat, setExportFormat] = useState("");
  const [rowsToShow, setRowsToShow] = useState(25);
  const [searchRoleName, setSearchRoleName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [allStaff, setAllStaff] = useState();

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleSelectChange = (event) => {
    setRowsToShow(Number(event.target.value));
  };

  const handleExport = () => {
    if (exportFormat === "CSV") exportCSV();
    else if (exportFormat === "PDF") exportPDF();
    else if (exportFormat === "Print") printRoles();
  };

  const exportCSV = () => {
    const csvData = roles
      .map((role) => `${role.role_name}, Total Users: 1`)
      .join("\n");
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "roles.csv");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Role List", 20, 10);
    roles.forEach((role, index) => {
      doc.text(
        `${index + 1}. ${role.role_name} (Total Users: 1)`,
        10,
        20 + index * 10
      );
    });
    doc.save("roles.pdf");
  };

  const printRoles = () => {
    const printContent = roles
      .map((role) => `${role.role_name} (Total Users: 1)`)
      .join("\n");
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`<pre>${printContent}</pre>`);
    newWindow.document.close();
    newWindow.print();
  };

  const fetchRoles = async () => {
    const result = await fetch(baseUrl + "role");
    setIsLoading(true);

    try {
      const result = await fetch(baseUrl + "role");
      if (result.status == 200) {
        const res = await result.json();
        setRoles(res.data);
      } else {
        console.log("An Error Occured");
      }
    } catch (error) {
      console.log("error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRole = async (id) => {
    setIsLoading(true);
    try {
      const result = await fetch(`${baseUrl}role/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", // Corrected the header spelling for consistency
        },
      });
      const res = await result.json();
      if (result.ok) {
        // Use result.ok instead of checking the status directly
        openToast(res.messsage);
        onCloseModal10();
        fetchRoles();
      } else {
        openToast(res.message);
      }
    } catch (error) {
      console.error("Error deleting department:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleSearchRole = async () => {
    const queryParams = new URLSearchParams({
      role_name: searchRoleName,
    }).toString();
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}role/search?${queryParams}`);
      console.log(response);
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setRoles(result);
      } else {
        console.log("error while fetching Roles");
      }
    } catch (error) {
      console.error("Error searching Roles:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
  const [taskStatus, setTaskStatus] = useState({
    name: "",
    color: "#000000",
    order: "",
    isHiddenFor: [],
    canBeChangedTo: [],
  });

  // Debounced search effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchRoleName.trim()) {
        handleSearchRole();
      } else {
        fetchRoles(); // Fetch all projects if search input is cleared
      }
    }, 3000);

    return () => clearTimeout(delayDebounceFn); // Cleanup function to clear the timeout
  }, [searchRoleName]);

  return (
    <div className=" pl-[10px] w-[100%] pr-2 mb-3 pb-4 pt-[10px]">
      <Link to="/addrole" className="allcrm-btn">
        {" "}
        <AddIcon className="addicon-all" /> New Role
      </Link>

      <div className="table-section mt-5 bg-white shadow-cs p-[20px]  rounded-lg ">
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

        <div className="bg-white rounded-lg w-full shadow-cs  overflow-x-auto">
          <table class="table-auto w-[100%] ">
            <thead className="bg-gray-300 shadow-cs">
              <tr className="role-row">
                <th className=" p-4 text-center roll-name font-medium text-[12px]">
                  Roll Name
                </th>
                <th className="text-center p-4 text-sm font-medium text-[12px] ">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading && roles.length === 0 ? (
                <tr className="h-[100px]">
                  <td
                    colSpan="9"
                    className="text-center text-gray-600 text-xl font-semibold py-4"
                  >
                    <ClipLoader color="#4A90E2" size={50} />
                  </td>
                </tr>
              ) : roles.length > 0 ? (
                roles.slice(0, rowsToShow).map((role, index) => {
                  return (
                    <tr
                      key={role.id}
                      className="border-b pb-2 border-[#dbdbdb]"
                    >
                      <td className="pt-4 pb-3 border-r border-[#dbdbdb] pl-3">
                        <Link to="/" className="text-[#27004a] text-[14px]">
                          {role.role_name}
                        </Link>
                        {/* <h6 className="text-[13px] pt-2 text-[#a5a1a1]">Total Users: <span>1</span></h6> */}
                      </td>
                      <td className="flex pt-4 gap-2 justify-center">
                        <Link
                          to="/editrole"
                          onClick={() => {
                            setRoleId(role.id);
                            setRoleName(role.role_name);
                            setEditPermissions(role.permissions);
                          }}
                        >
                          <BorderColorIcon className="text-[#27004a] font-light cursor-pointer text-[10px]]" />
                        </Link>
                        <button
                          onClick={() => {
                            onOpenModal10();
                          }}
                        >
                          <DeleteIcon className="text-red-500 cursor-pointer" />
                        </button>
                        {open10 && (
                          <ConfirmationModal
                            setClose={onCloseModal10}
                            id={role.id}
                            isLoading={isLoading}
                            callback={deleteRole}
                          />
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="h-[100px]">
                  <td
                    colSpan="2"
                    className="text-center text-red-500 text-xl font-semibold py-4"
                  >
                    No roles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between p-[10px] pl-0 pr-0 pb-[0] w-[100%] items-center  flex-col gap-2  sm:flex-row sm:gap-0">
          <p className=" text-[#a5a1a1] text-[14px]">
            Showing 1 to {rowsToShow} of {roles.length} entries{" "}
          </p>
          <div className="pagination flex gap-2 border pt-0 pl-4 pb-0 pr-4 rounded-md">
            <Link to="#" className="text-[12px]  pt-2 pb-[8px]">
              Previous
            </Link>
            <span className="text-[12px] bg-[#27004a] flex items-center  text-white pl-3 pr-3 ">
              1
            </span>
            <Link to="#" className="text-[12px]  pt-2 pb-[8px] ">
              Next
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
