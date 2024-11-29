import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CachedIcon from "@mui/icons-material/Cached";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGlobalContext } from '../../../Context/GlobalContext';
import DeleteBranch from '../../../components/Staff/Modals/DeleteBranch';
import ClipLoader from "react-spinners/ClipLoader";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

const BranchDetails = () => {

    const { baseUrl, openToast, setBranchData } = useGlobalContext();
    const [id, setId] = useState(null);
    const [branchDetail, setBranchDetail] = useState([]);
    const [rowsToShow, setRowsToShow] = useState(25);
    const [exportFormat, setExportFormat] = useState("CSV");



    async function fetchBranchDetails() {
        try {
            const result = await fetch(baseUrl + "branch");
            if (result.status == 200) {
                const res = await result.json();
                setBranchDetail(res);
            }
        }
        catch (error) {
            console.log("error", error)
        }
    }

    async function deleteBranchDetails(id) {
        try {
            const result = await fetch(baseUrl + `branch/${id}`, {
                method: "DELETE"
            });
            if (result.status == 200) {
                openToast("Delete Branch Successfully", "success");
                setId(null);
                fetchBranchDetails();
            }
            else {
                openToast("Something went wrong", "error");
            }
        } catch (error) {
            console.log("error", error)
        }

    }

    useEffect(() => {
        fetchBranchDetails();
    }, [])

    const handleExport = () => {
        if (exportFormat === "CSV") exportCSV();
        else if (exportFormat === "PDF") exportPDF();
        else if (exportFormat === "Print") printBranch();
    };

    const exportCSV = () => {
        const headers = ["Branch Name", "Total Users"];
        const csvData = [
            headers.join(","), // Add headers
            ...branchDetail.map((dep) => `${dep.branchName}`),
        ].join("\n");
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, "BranchDetail.csv");
    };


    const exportPDF = () => {
        const doc = new jsPDF();
        doc.text("Branch Details", 20, 10);
        branchDetail.forEach((dep, index) => {
            doc.text(
                `${index + 1}. ${dep.branchName} `,
                10,
                20 + index * 10
            );
        });
        doc.save("BranchDetail.pdf");
    };

    const printBranch = () => {
        const printWindow = window.open("", "_blank");
        const printContent = `
            <html>
                <head><title>Print Branch Details</title></head>
                <body>
                    <h3>Branch Details</h3>
                    <table border="1" cellspacing="0" cellpadding="5">
                        <thead>
                            <tr>
                                <th>Branch Name</th>
                                <th>Total Users</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${branchDetail
                                .map(
                                    (row) =>
                                        `<tr><td>${row.branchName}</td><td>${row.totalUsers}</td></tr>`
                                )
                                .join("")}
                        </tbody>
                    </table>
                </body>
            </html>
        `;
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
    };


    const handleSelectChange = (event) => {
        setRowsToShow(Number(event.target.value));
    };




    return (
        <div className="p-[10px] top-[95px] pl-[10px] w-[100%] pr-2 mb-3 pb-4">
            <DeleteBranch id={id} setId={setId} deleteBranch={deleteBranchDetails} />
            <Link
                to="/add-branch"
                className="allcrm-btn "
            >
                <AddIcon className="addicon-all" /> New Branch
            </Link>

            <div className="table-section mt-5 bg-white shadow-cs p-[20px]  rounded-lg ">
                <div className="flex mb-4 justify-between flex-col gap-2  sm:flex-row sm:gap-0">
                    <div className="left-side ">
                        <select
                            onChange={handleSelectChange}
                            className=" border border-[#e5e7eb] p-[7px]  shadow-sm mr-2 rounded-md text-[14px]  pr-3 focus:outline-none"
                        >
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="120">120</option>
                        </select>
                        <select
                            onChange={(e) => setExportFormat(e.target.value)}
                            className="border border-[#e5e7eb] p-[7px] shadow-sm rounded-md text-[14px] pr-3 focus:outline-none"
                        >
                            <option value="CSV">CSV</option>
                            <option value="PDF">PDF</option>
                            <option value="Print">Print</option>
                        </select>

                        <button
                            onClick={handleExport}
                            className="ml-2 bg-[#27004a] text-[14px] text-white p-[7px] rounded-md cursor-pointer"
                        >
                            Export File
                        </button>
                    </div>

                    <div className="right-side relative  w-[200px]">
                        <input
                            type="text"
                            placeholder="Search"
                            className="border rounded-3xl border-1 pl-3 h-[38px] pr-7
  ] focus:outline-none w-[100%] text-[15px] text-[#aeabab]"
                            name="searchDepartment"

                        />
                        <SearchIcon
                            className="absolute right-[10px] search-icon top-[12px]   text-[#aeabab]  font-thin text-[#dddddd;
  ]"
                        />
                    </div>
                </div>
                <div className='bg-white rounded-lg w-full shadow-cs  overflow-x-auto'>
                    <table class="table-auto w-[100%] p-[10px]">
                        <thead className="bg-[#ffff] ">
                            <tr>
                                <th className="text-center p-4 border-b border-[#dbdbdb] roll-name text-sm font-medium ">
                                    Branch Name
                                </th>
                                <th className="text-center border-b border-[#dbdbdb]  p-4 text-sm font-medium ">Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                branchDetail?.length === 0 ? (
                                    <tr className="h-[70px]">
                                        <td
                                            colSpan="9"
                                            className="text-center text-gray-600 text-xl font-semibold py-4"
                                        >
                                            <ClipLoader color="#4A90E2" size={40} />
                                        </td>
                                    </tr>
                                ) : branchDetail && branchDetail?.length > 0 ? (

                                    branchDetail?.map((item, index) => {
                                        return <tr className="border-b  border-[#dbdbdb] pb-2">
                                            <td className="pt-4 pb-3 pl-3 border-r border-[#dbdbdb]">
                                                <div  className="text-[#27004a] text-[14px]">
                                                    {item?.branchName}
                                                </div>

                                            </td>
                                            <td className="flex pt-4 gap-2 justify-center">
                                                <Link
                                                    to="/update-branch"
                                                >
                                                    <BorderColorIcon className="text-[#27004a] font-light cursor-pointer text-[10px]"
                                                        onClick={() => setBranchData(item)}
                                                    />
                                                </Link>
                                                <button >
                                                    <DeleteIcon
                                                        onClick={() => setId(item?.id)}
                                                        className="text-red-500 cursor-pointer"
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    })

                                )
                                    : (
                                        // No Data State
                                        <tr className="h-[100px]">
                                            <td
                                                colSpan="9"
                                                className="text-center text-red-500 text-xl font-semibold py-4"
                                            >
                                                No staff found.
                                            </td>
                                        </tr>
                                    )

                            }


                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between p-[16px] pb-[0] pl-0 pr-0 w-[100%] items-center  flex-col gap-2  sm:flex-row sm:gap-0">
                    <p className=" text-[#a5a1a1] text-[14px]">
                        Showing 1 to  entries
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
    )
}

export default BranchDetails