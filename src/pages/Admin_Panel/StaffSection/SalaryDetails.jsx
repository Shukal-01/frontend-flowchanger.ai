import React, { useEffect, useState } from "react";
import Search from "../../../Assets/Images/search.svg";
import Filter from "../../../Assets/Images/bi_filter.svg";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import { useGlobalContext } from "../../../Context/GlobalContext";
import { saveAs } from 'file-saver';
import ClipLoader from "react-spinners/ClipLoader";

const SalaryDetails = () => {
  const { baseUrl, fetchStaff, staffDetail } = useGlobalContext();

  useEffect(() => {
    fetchStaff();
  }, [])

  console.log("first", staffDetail)

  let subtitle;
  // toggle switch
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };
  // toggle switch

  const [toggleDrop, setToggleDrop] = useState(false);

  function handledrop() {
    setToggleDrop(!toggleDrop);
  }
  const [isLoading, setIsLoading] = useState(true);
  // when onclick update staff
  const [modalIsOpen9, setIsOpen9] = React.useState(false);
  function openModal9() {
    setIsOpen9(true);
  }
  function afterOpenModal9() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#000";
  }

  function closeModal9() {
    setIsOpen9(false);
  }
  // when onclick update staff

  const exportToCSV = () => {
    // Define CSV headers to match the table columns
    const headers = [
      'Index',
      'Name',
      'Job Title',
      'CTC',
      'Basic',
      'Employer PF Contribution',
      'Employer ESI Contribution',
      'EDLI & Admin Charges',
      'Employer LWF Contribution',
      'Employee PF',
      'Employee ESI',
      'Employee LWF',
      'Professional Tax',
    ];

    // Map over `staffDetail` to create rows with table data
    const rows = staffDetail.map((item, index) => {
      const salaryDetail = item?.staffDetails?.SalaryDetails[item.staffDetails?.SalaryDetails?.length - 1] || {};

      return [
        index + 1,
        item?.name || 'N/A',
        item?.staffDetails?.job_title || 'N/A',
        ` ${salaryDetail?.ctc_amount ?? "N/A"}`,
        'Basic',  // Replace this if you have actual 'Basic' data
        ` ${salaryDetail?.employee_pf ?? "N/A"}`,
        ` ${salaryDetail?.employer_esi ?? "N/A"}`,
        'N/A',  // Placeholder for EDLI & Admin Charges
        ` ${salaryDetail?.employer_lwf ?? "N/A"}`,
        ` ${salaryDetail?.employee_pf ?? "N/A"}`,
        ` ${salaryDetail?.employee_esi ?? "N/A"}`,
        ` ${salaryDetail?.tds ?? "N/A"}`,
        ` ${salaryDetail?.professional_tax ?? "N/A"}`  // Replace this if you have professional tax data
      ];
    });

    // Combine headers and rows for CSV format
    const csvData = [headers, ...rows].map(row => row.join(',')).join('\n');

    // Create a Blob and initiate download
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'SalaryDetails.csv');
  };



  return (
    <div className="staff-tab mt-[20px]">
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

          <input
            type="date"
            className="border rounded-md bg-[#F4F5F9] p-[8px] pl-[30px] w-[100%] lg:w-[225px] focus-visible:outline-none"
          />

       
        </div>
        <div className="flex gap-[15px] justify-between lg:justify-start">
          <button
            className="border border-1 pl-3 pr-3 rounded-md pt-2 pb-2 setwer text-sm second-btn"
            onClick={openModal9}
          >
            Update Staff Salary
          </button>
        </div>
      </div>

      <div className='w-[100%] p-0 h-[100%] overflow-y-auto flex rounded-md shadow overflow-scroll border border-1 mt-4 '>
        <div className='w-full   '>
          <table className="table-section  w-full">
            <thead className="border border-1 ">
              <th>#</th>
              <th>Name</th>
              <th>Job Title</th>
              <th>CTC</th>
              <th>Basic</th>
              <th>Employer PF Contribution </th>
              <th>Employer ESI Contribution</th>
              <th>EDLI & Admin Charges</th>
              <th>Employer LWF Contribution</th>
              <th>Employee PF</th>
              <th>Employee ESI</th>
              <th>Employee LWF</th>
              <th>Professional Tax</th>
            </thead>
            <tbody>

              {

                isLoading && staffDetail?.length === 0 ? (
                  <tr className="h-[100px]">
                  <td colSpan="8" className="text-center text-gray-600 text-sm font-semibold py-4 mx-auto">
                  <ClipLoader color="#4A90E2" size={50} />
                  </td>
                </tr>
                ) : staffDetail && staffDetail?.length > 0 ? (


                  staffDetail?.map((item, index) => {
                    const salaryDetail = item?.staffDetails?.SalaryDetails[item.staffDetails?.SalaryDetails?.length - 1]
                    console.log(salaryDetail)
                    return <tr className='border'>
                      <td className="border-r border-[#dbdbdb] whitespace-nowrap">
                        <input type="checkbox" className="border border-1 rounded-md " />
                      </td>
                      <td className="border-r border-[#dbdbdb] whitespace-nowrap">{item?.name}</td>
                      <td className="border-r border-[#dbdbdb] whitespace-nowrap">{item?.staffDetails?.job_title}</td>
                      <td className="border-r border-[#dbdbdb] whitespace-nowrap">₹ {salaryDetail?.ctc_amount ?? "N/A"}</td>
                      <td className="border-r border-[#dbdbdb] whitespace-nowrap">Basic</td>
                      <td className="border-r border-[#dbdbdb] whitespace-nowrap">₹ {salaryDetail?.employee_pf ?? "N/A"}</td>
                      <td className="border-r border-[#dbdbdb] whitespace-nowrap">₹ {salaryDetail?.employer_esi ?? "N/A"}</td>
                      <td className="border-r border-[#dbdbdb] whitespace-nowrap">N/A</td>
                      <td className="border-r border-[#dbdbdb] whitespace-nowrap">₹ {salaryDetail?.employer_lwf ?? "N/A"}</td>
                      <td className="border-r border-[#dbdbdb] whitespace-nowrap">₹ {salaryDetail?.employee_pf ?? "N/A"}</td>
                      <td className="border-r border-[#dbdbdb] whitespace-nowrap">₹ {salaryDetail?.employee_esi ?? "N/A"}</td>
                      <td className="border-r border-[#dbdbdb] whitespace-nowrap">₹ {salaryDetail?.tds ?? "N/A"}</td>
                      <td className="border-r border-[#dbdbdb] whitespace-nowrap">₹ {salaryDetail?.employee_pf ?? "N/A"}</td>


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

      {/* when onclick update staff */}

      <Modal
        isOpen={modalIsOpen9}
        onAfterOpen={afterOpenModal9}
        onRequestClose={closeModal9}
        // style={customStyles}
        contentLabel="Example Modal"
        className="w-[96%] xl:w-[40%] absolute top-[50%] left-[50%] bottom-auto p-0 bg-[#fff] shadow-md rounded-[10px] translate-x-[-50%] translate-y-[-50%]"
      >
        <h2
          ref={(_subtitle) => (subtitle = _subtitle)}
          className="border-b p-3     text-[14px] text-center bg-[#F0F6FE] rounded-t-lg rounded-r-lg rounded-b-none"
        >
          Update Multiple Staff Salary
        </h2>
        <button
          onClick={closeModal9}
          className="absolute right-[5px] top-[3px] font-semibold	  bg-[#511992] rounded-full"
        >
          <CloseIcon className="text-white" />
        </button>
        <div className="pb-2">
          <p className="p-[10px] pl-[14px] pr-[14px] text-[12px] text-center">
            You need to setup your{" "}
            <Link to="/salary_Details" className="text-[#8A25B0]">
              Salary Details Import Settings.
            </Link>{" "}
            Only Earnings and Deductions set from Settings section can be
            updated through file upload.
          </p>

          <div className="flex justify-between items-center p-[10px] border border-b border-l-0  border-t-0 border-r-0 pl-[20px] text-[13px] xl:text-[14px] ">
            <div className="flex gap-[0px] items-center ">
              <h4 className="m-0 font-medium">
                Step 1. Download current salary of selected employees.
              </h4>
            </div>
            <div className="flex items-center  ">
              <button
                onClick={exportToCSV}
                className="whitespace-nowrap outline-dashed p-1 rounded-md text-[13px] outline-1 outline-offset-1"
              >
                Download Template
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center p-[10px] border border-b border-l-0 border-t-0 border-r-0 pl-[20px] text-[13px] xl:text-[14px] ">
            <div className=" ">
              <h4 className="m-0 font-medium ">
                Step 2. Edit staff salary details.
              </h4>
              <p className="text-[10px] xl:text-[12px] pl-3 pt-2">
                Please refer to instructions sheet in download template for
                formatting guide
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center p-[10px] border border-b border-l-0  border-t-0 border-r-0 pl-[20px] text-[13px] xl:text-[14px] ">
            <div className="flex gap-[0px] items-center ">
              <h4 className="m-0 font-medium">
                Step 3.  Upload new Salary details
              </h4>
            </div>
            <div className="flex items-center  ">
              <button className="outline-dashed p-1 rounded-md text-[13px] outline-1 outline-offset-1">
                Upload Staff List
              </button>
              {/* <input type='file' placeholder='ddjfksj'/> */}
            </div>
          </div>
        </div>
      </Modal>
      {/* when onclick update staff
       */}
    </div>
  );
};

export default SalaryDetails;
