import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import group from "../../../Assets/Images/Group.svg";
import attendance from "../../../Assets/Images/attendance.svg";
import bank from "../../../Assets/Images/bank.svg";
import salary from "../../../Assets/Images/salary.svg";
import leave from "../../../Assets/Images/leave.svg";
import penalty from "../../../Assets/Images/penalty.svg";
import permission from "../../../Assets/Images/permission.svg";
import StaffTab from "./StaffTab";
import AttendanceTab from "./AttendanceTab";
import Penalty_Overtime from "./Penalty & Overtime/Penalty_Overtime";
import BankDetails from "./BankDetails";
import SalaryDetails from "./SalaryDetails";
import LeaveBalance from "./LeaveBalance";
import Permission from "./Permisson";
import { useGlobalContext } from "../../../Context/GlobalContext";
import PeopleIcon from '@mui/icons-material/People';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';

const   StaffMenu = () => {
  const {staffTab,setStaffTab} = useGlobalContext()
  return (
    <div className="staff-menu ">
      <h3 className="text-[20px]  font-[Nunito]">My Staff</h3>

      <div className="tab-section mt-[30px]">
      <Tabs selectedIndex={staffTab} onSelect={(index) => setStaffTab(index)}>
          <TabList className="flex   w-[100%] overflow-x-auto  bg-[#FFFFFF]  rounded-[12px]  p-[4px] pb-[4px]  set-shadow ">
            <Tab>
              <div className="flex items-center  whitespace-nowrap mr-[20px]">
                {/* <img src={group} /> */}
                <PeopleIcon className="staff-icon"/>
                <h2 className="text-sm text-[#B1B1B1]  ml-[10px]">Staff</h2>
              </div>
            </Tab>
            <Tab>
              <div className="flex items-center  whitespace-nowrap mr-[20px]">
                {/* <img src={attendance} /> */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="staff-icon lucide lucide-book-check"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><path d="m9 9.5 2 2 4-4"/></svg>
                <h2 className="text-sm text-[#B1B1B1]  ml-[10px]">
                  Attendance{" "}
                </h2>
              </div>
            </Tab>
            <Tab>
              <div className="flex items-center  whitespace-nowrap mr-[20px]">
                {/* <img src={bank} /> */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="staff-icon lucide lucide-landmark"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>
                <h2 className="text-sm text-[#B1B1B1]  ml-[10px]">
                  Bank Details
                </h2>
              </div>
            </Tab>
            <Tab>
              <div className="flex items-center  whitespace-nowrap mr-[20px]">
                {/* <img src={salary} /> */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="staff-icon lucide lucide-indian-rupee"><path d="M6 3h12"/><path d="M6 8h12"/><path d="m6 13 8.5 8"/><path d="M6 13h3"/><path d="M9 13c6.667 0 6.667-10 0-10"/></svg>
                <h2 className="text-sm text-[#B1B1B1]  ml-[10px]">
                  Salary Details
                </h2>
              </div>
            </Tab>
            <Tab>
              <div className="flex items-center whitespace-nowrap mr-[20px]">
                {/* <img src={leave} /> */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="staff-icon lucide lucide-baggage-claim"><path d="M22 18H6a2 2 0 0 1-2-2V7a2 2 0 0 0-2-2"/><path d="M17 14V4a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v10"/><rect width="13" height="8" x="8" y="6" rx="1"/><circle cx="18" cy="20" r="2"/><circle cx="9" cy="20" r="2"/></svg>
                <h2 className="text-sm text-[#B1B1B1]  ml-[10px]">
                  Leave Balances & Policy
                </h2>
              </div>
            </Tab>
            <Tab>
              <div className="flex items-center  whitespace-nowrap mr-[20px]">
                {/* <img src={penalty} /> */}
                <PriceCheckIcon className="staff-icon"/>
                <h2 className="text-sm text-[#B1B1B1]  ml-[10px]">
                  Penalty & Overtime{" "}
                </h2>
              </div>
            </Tab>
            <Tab>
              <div className="flex items-center  whitespace-nowrap mr-[20px]">
                {/* <img src={permission} /> */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="staff-icon lucide lucide-user-round-check"><path d="M2 21a8 8 0 0 1 13.292-6"/><circle cx="10" cy="8" r="5"/><path d="m16 19 2 2 4-4"/></svg>        
                <h2 className="text-sm text-[#B1B1B1]  ml-[10px]">     
                          Permissions
                </h2>
              </div>
            </Tab>
          </TabList>

          <TabPanel>
            <StaffTab />
          </TabPanel>

          <TabPanel>
            <AttendanceTab />
          </TabPanel>
          <TabPanel>
            <BankDetails/>
          </TabPanel>
          <TabPanel>
            <SalaryDetails/>
          </TabPanel>
          <TabPanel>
            <LeaveBalance/>
          </TabPanel>

          <TabPanel>
            <Penalty_Overtime />
          </TabPanel>
        
          
          <TabPanel>
            <Permission />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default StaffMenu;
