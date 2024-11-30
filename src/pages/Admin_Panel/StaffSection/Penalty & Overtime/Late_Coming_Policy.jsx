import React, { useEffect, useState } from "react";
import Search from "../../../../Assets/Images/search.png";
import Filter from "../../../../Assets/Images/filter.svg";
import CloseIcon from "@mui/icons-material/Close";
import file from '../../../../Assets/Images/file.png'
import { useGlobalContext } from "../../../../Context/GlobalContext";
import { saveAs } from 'file-saver';
import ClipLoader from "react-spinners/ClipLoader";


const Late_Coming_Policy = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fileUpldoad, setFileUpldoad] = useState(false);
  const { baseUrl, fetchStaff, staffDetail } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchStaff();
  }, [])

  const exportToCSV = () => {
    // Define the CSV headers
    const headers = [
      'Index',
      'Name',
      'Job Title',
      'Allowed Early Days',
      'Grace Period (mins)',
      'Deduction Rate',
      'Deduction Type',
    ];

    // Map over the data to create CSV rows
    const rows = staffDetail.map((item, index) => {
      const earlyLeavePolicy = item?.staffDetails?.LateComingPolicy[0] ?? {}; // Adjusted for Early Leave Policy
      return [
        index + 1,
        item?.name || 'N/A',
        item?.staffDetails?.job_title || 'N/A',
        earlyLeavePolicy?.waiveOffDays ?? 'N/A',
        earlyLeavePolicy?.gracePeriodMins ?? 'N/A',
        earlyLeavePolicy?.fineAmountMins ?? 'N/A',
        earlyLeavePolicy?.fineType ?? 'N/A',
      ];
    });

    // Combine headers and rows for CSV format
    const csvData = [headers, ...rows].map(row => row.join(',')).join('\n');

    // Create a Blob and download the file
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'Late Coming Policy.csv');
  };


  return (
    <div className="Early-Leaving-Policy mt-[20px]">
      <div className="flex justify-between flex-col xl:flex-row lg:flex-col  md:flex-col gap-[15px] lg:gap-[0px]">
        <div className="flex lg:gap-[20px] flex-col gap-[10px] lg:flex lg:flex-row">
          <div className="searching-input relative">
            <img src={Search} className="absolute left-2 top-3" />
            <input
              type="text"
              className="border rounded-md bg-[#F4F5F9] p-[8px] pl-[30px] w-[100%] lg:w-[225px] focus-visible:outline-none"
              placeholder="Search"
            />
          </div>

          <select className="border rounded-md bg-[#F4F5F9] p-[8px] lg:w-[240px] w-[100%] focus-visible:outline-none text-sm">
            <option>All Departments</option>
          </select>

          <div className="flex gap-[10px] whitespace-nowrap justify-end items-center cursor-pointer">
            <img
              src={Filter}
              className="w-[40px] h-[40px] bg-[#F4F5F9] rounded-full p-[10px]"
            />
            <h2 className="text-[14px] font-normal	">More Filters</h2>
          </div>
        </div>
        <div className="flex gap-[15px] justify-between lg:justify-start">
          <div>
            <div className="relative inline-block text-left">
              <div>
                <button
                  onClick={() => setIsOpen(true)}
                  type="button"
                  className=" second-btn w-full    text-white shadow-sm"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  Update Late Coming Policy
                </button>

                {isOpen && (
                  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white 2xl:w-[40%] xl:w-[55%] lg:w-[65%] md:w-[84%] sm:w-[100%] rounded-lg border border-[#B1B1B1]">
                      <div className="flex items-center justify-around h-[75px] shadow bg-[#F0F6FE]">
                        <h1 className="text-[25px] text-[#0E2040] font-medium">
                          Import Late Coming Policy for all Staff
                        </h1>
                        <button onClick={() => setIsOpen(false)}>
                          <CloseIcon />
                        </button>
                      </div>

                      <div className="space-y-7 mx-10 my-6">
                        <div className="flex items-center justify-between">
                          <h1 className="font-medium">
                            Step 1. Download Late Coming Policy template
                          </h1>
                          <button onClick={exportToCSV} className="text-[12px] px-2 py-1 rounded-sm border-2 border-dashed border-[#B1B1B1] text-[#B1B1B1]">
                            Download Template
                          </button>
                        </div>

                        <div className="flex items-center justify-between ">
                          <h1 className="font-medium">
                            Step 2. Edit downloaded file and add Late Coming Policy details
                          </h1>
                        </div>

                        <div className="flex items-center justify-between  ">
                          <h1 className="font-medium">
                            Step 3. Upload your Edited file
                          </h1>
                          <button
                            onClick={() => setFileUpldoad(true)}
                            className="text-[12px] px-2 py-1 rounded-sm border-2 border-dashed border-[#B1B1B1] text-[#B1B1B1]"
                          >
                            Update Late coming Policy
                          </button>
                        </div>

                        {fileUpldoad && (
                          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                            <div className="bg-white 2xl:w-[40%] xl:w-[55%] lg:w-[65%] md:w-[84%] sm:w-[100%] rounded-lg border border-[#B1B1B1]">
                              <div className="flex items-center justify-around h-[75px] shadow bg-[#F0F6FE]">
                                <h1 className="text-[25px] text-[#0E2040] font-medium">
                                  Import Late Coming Policy for all Staff
                                </h1>
                                <button onClick={() => setFileUpldoad(false)}>
                                  <CloseIcon />
                                </button>
                              </div>

                              <div className="w-[78%] h-[218px] flex flex-col items-center justify-center bg-[#FAFAFA] mx-[80px] my-8 border-2 border-dotted rounded-md">
                                <img src={file} alt="" />
                                <h1 className="text-[15px] font-medium">
                                  Click or drag file to this area to upload
                                </h1>
                                <h1 className="text-[13px]">
                                  Supported formats : xls,xlsx file formats are
                                  supported
                                </h1>
                              </div>

                              <div className="w-[78%] h-[50px] flex flex-col items-center justify-center bg-[#FAFAFA] mx-[80px] my-8 border-2 border-dotted rounded-md">
                                <h1 className="text-[30px] text-[#B1B1B1]">
                                  Upload File
                                </h1>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-[100%] p-0 h-[300px] overflow-y-auto flex rounded-md shadow overflow-scroll border border-1 mt-4 '>
        <div className='w-full   '>
          <table className="table-section w-full">
            <thead className="border border-1 ">
              <th>#</th>
              <th>Name</th>
              <th>Job Title</th>
              <th>Allowed Early Days</th>
              <th>Grace Period (mins)</th>
              <th>Deduction Rate</th>
              <th>Deduction Type</th>
            </thead>
            <tbody>
              {
                isLoading && staffDetail.length === 0 ? (<tr className="h-[100px]">
                  <td colSpan="9" className="text-center text-gray-600 text-xl font-semibold py-4">
                    <ClipLoader color="#4A90E2" size={50} />
                  </td>
                </tr>
                ) : staffDetail && staffDetail.length > 0 ? (

                  staffDetail?.map((items) => {
                    const overTime = items?.staffDetails?.LateComingPolicy[0]
                    return <tr className="border">
                      <td className="border-r border-[#dbdbdb] whitespace-nowrap">
                        <input type="checkbox" className="border border-1 rounded-md " />
                      </td>
                      <td className="border-r border-[#dbdbdb] whitespace-nowrap">{items.name}</td>
                      <td className="border-r border-[#dbdbdb] whitespace-nowrap">{items?.staffDetails?.job_title}</td>
                      <td className="border-r border-[#dbdbdb] whitespace-nowrap">{overTime?.waiveOffDays ?? "N/A"}</td>
                      <td className="border-r border-[#dbdbdb] whitespace-nowrap">{overTime?.gracePeriodMins ?? "N/A"}</td>
                      <td className="border-r border-[#dbdbdb] whitespace-nowrap">{overTime?.fineAmountMins ?? "N/A"}</td>
                      <td className="border-r border-[#dbdbdb] whitespace-nowrap">{overTime?.fineType ?? "N/A"}</td>

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
      </div>
    </div>
  );
};

export default Late_Coming_Policy;
