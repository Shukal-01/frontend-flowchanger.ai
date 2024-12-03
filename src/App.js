import React, { useEffect, useState } from "react";
import "./Assets/css/roledetail.css";
import "./Assets/css/Admin.css";
import "../src/Assets/css/new.css";
import "../src/Assets/css/customer.css";
import "../src/Assets/css/subscribe.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useNavigate,
} from "react-router-dom";
import NavBar from "./components/Admin_Panel/NavBar";
import SideBar from "./components/Admin_Panel/SideBar";
// import Project from "./pages/Admin_Panel/Projects/Project_Data";
import Role_Details from "./pages/Admin_Panel/Roles/RoleDetails";
// import Project_Progress from "../src/pages/Client_Panel/Project_Progress";
import AddRole from "./pages/Admin_Panel/Roles/Add_Role";
import AddDepartment from "../src/pages/Admin_Panel/Department/AddDepartment";
import EditRole from "./pages/Admin_Panel/Roles/EditRole";
import EditDepartment from "../src/pages/Admin_Panel/Department/EditDepartment";
import StaffMenu from "./pages/Admin_Panel/StaffSection/StaffMenu";
import AddOneStaff from "./pages/Admin_Panel/StaffSection/AddOneStaff";
import PersonalDetail from "../src/pages/Admin_Panel/editstaff/PersonalDetail";
import BankDetails from "../src/pages/Admin_Panel/editstaff/EditBankDetail";
import Editattendance from "../src/pages/Admin_Panel/editstaff/EditAttendanceDetail";
import EmployementDetail from "../src/pages/Admin_Panel/editstaff/EmployementDetail";
import UserPermission from "../src/pages/Admin_Panel/editstaff/UserPermission";
import EditLeavePolicies from "../src/pages/Admin_Panel/editstaff/EditLeavePolicies";
import CustomDetail from "../src/pages/Admin_Panel/editstaff/CustomDetail";
import BackgroundVerification from "../src/pages/Admin_Panel/editstaff/BackgroundVerification";
import VerifyAadhaar from "../src/pages/Admin_Panel/editstaff/VerifyAadhaar";
import VerifyPan from "../src/pages/Admin_Panel/editstaff/VerifyPan";
import DrivingLicense from "./pages/Admin_Panel/editstaff/VerifyDrivingLicense";
import VerifyUan from "../src/pages/Admin_Panel/editstaff/VerifyUan";
import VerifyFace from "../src/pages/Admin_Panel/editstaff/VerifyFace";
import VerifyAddress from "./pages/Admin_Panel/editstaff/VerifyAddress";
import UpperHeader from "../src/pages/Admin_Panel/editstaff/UpperHeader";
import SidebarEditStaff from "../src/pages/Admin_Panel/editstaff/SidebarEditStaff";
import Salary_Details from "./pages/Admin_Panel/StaffSection/Salary_Details";
import MultiStepForm from "../src/pages/Admin_Panel/authentication/steps/multistepform";
import Attendence_summary from "./pages/Admin_Panel/StaffSection/Attendance/Attendence_summary";
import Worktime from "./pages/Admin_Panel/StaffSection/Attendance/Worktime";
import Reviewfine from "./pages/Admin_Panel/StaffSection/Attendance/Reviewfine";
import Overtime from "./pages/Admin_Panel/StaffSection/Attendance/Overtime";
import Project_Summary from "./pages/Admin_Panel/Projects/Project_Summary";
import ProjectsOverview from "./pages/Admin_Panel/Projects/Project_overview";
import Projects from "./pages/Admin_Panel/Projects/Projects";
import Taskview from "../src/pages/Admin_Panel/Tasks/All_Task";
import Clients from "../src/pages/Admin_Panel/Clients/Clients";
import NewTicket from "./pages/Admin_Panel/Projects/NewTicketForm";
import Add_Project from "./pages/Admin_Panel/Projects/Add_Project";
// import Customer_Navbar from "./Customer Panel/Components/Customer_Navbar";
// import Customer_Footer from "./Customer Panel/Components/Customer_Footer";
import EditSalaryDetails from "../src/pages/Admin_Panel/editstaff/EditSalaryDetails";
import EditPenalty from "../src/pages/Admin_Panel/editstaff/EditPenalty";
import SalaryOverview from "../src/pages/Admin_Panel/editstaff/SalaryOverview";
import StaffSalarySummry from "../src/pages/Admin_Panel/editstaff/StaffSalarySummry";
import Calender from "./pages/Admin_Panel/Calender/Calender";
import Editprofile from "../src/pages/Admin_Panel/profile/Editprofile";
import Task_Status from "./pages/Admin_Panel/Projects/Task_Status";
import Edit_Task_Status from "../src/pages/Admin_Panel/Tasks/Edit_Task_Status";
import Edit_Project from "./pages/Admin_Panel/Projects/Edit_Project";
import Project_Progress from "./pages/Client_Panel/Projects/Project_Progress";
import Meeting from "./pages/Admin_Panel/Calender/Meeting";
import RequestPassword from "./pages/Admin_Panel/authentication/steps/RequestPassword";
import CalenderDay from "./pages/Admin_Panel/Calender/CalenderDay";
import CalenderYear from "./pages/Admin_Panel/Calender/CalenderYear";
import Notes from "./pages/Client_Panel/Notes/Notes";
import ExpenseEdit from "./pages/Admin_Panel/ExpensesClient/ExpenseEdit";
import ExpensePage from "./pages/Admin_Panel/ExpensesClient/ExpensePage";
import AddNewClient from "../src/pages/Admin_Panel/Clients/AddNewClient";
import EditClient from "../src/pages/Admin_Panel/Clients/EditClient";
import Subscription from "../src/pages/Admin_Panel/Subscription Plan/Subscription";
import Buy_plan from "../src/pages/Admin_Panel/Subscription Plan/Pricing Plans/Plan";
import CalenderWeekly from "./pages/Admin_Panel/Calender/CalenderWeekly";
// import Task from "./Admin/pages/Project/Task";
import Task from "./pages/Admin_Panel/Projects/Task";
import ClientHeader from "./components/Client_Panel/ClientHeader";
import SidebarClient from "./components/Client_Panel/SidebarClient";
// import AddNewTask from "./Admin/pages/Projects/AddNewTask";
import DepartmentDetail from "../src/pages/Admin_Panel/Department/DepartmentDetails";
import PayrollMenu from "../src/pages/Admin_Panel/payroll/PayrollMenu";
import CalenderHeader from "./pages/Admin_Panel/Calender/CalenderHeader";
import RunPayroll from "../src/pages/Admin_Panel/payroll/RunPayroll";
import StatusMainPage from "../src/pages/Admin_Panel/statustask/StatusMainPage";
import Department_Details from "../src/pages/Admin_Panel/Department/DepartmentDetails";
import AdminChatInterface from "./pages/Admin_Panel/Chats/AdminChatInterFace";
import StaffChatInterface from "./pages/Staff_Panel/StaffChatInterface";
import ClientChatInterface from "./pages/Client_Panel/ClientChatInterFace";
import ResetPassword from "./pages/Admin_Panel/authentication/steps/ResetPassword";
import LoginPage from "../src/pages/Admin_Panel/authentication/steps/login";
import ProtectedRoute from "./ProtectedRoute";
import DashBoard from "./pages/Admin_Panel/DashBoard";
import { useAuthContext } from "./Context/AuthContext";
import VerifyVoterID from "./pages/Admin_Panel/editstaff/VerfiyVoterID";
import PastEmploymentDetail from "./pages/Admin_Panel/editstaff/PastEmploymentDetail";
import ContactInformation from "./pages/Admin_Panel/Clients/ContactInformation";
import Documents from "./pages/Admin_Panel/editstaff/Documents";
import TaskForm from "./pages/Admin_Panel/Tasks/Task_deatail/TaskForm";
import ClientTaskview from "./pages/Client_Panel/Task/ClientTaskview";
// import StatusMainPage from "../src/pages/Admin_Panel/statustask/StatusMainPage";
import Project_Invoice from "./pages/Client_Panel/Projects/Project_Invoice";
import ClientTaskView from "../src/pages/Client_Panel/Task/ClientTaskview";
import Client_Project from "./pages/Client_Panel/Projects/ClientProject";
import ProjectSummary from "./pages/Client_Panel/Projects/ProjectSummary";
import BranchDetails from "./pages/Admin_Panel/Branch/BranchDetails";
import AddBranch from "./pages/Admin_Panel/Branch/AddBranch";
import UpdateBranch from "./pages/Admin_Panel/Branch/UpdateBranch";
import Setting_panel from "./pages/Admin_Panel/StaffSection/Attendance/Setting_panel";
import ClientDashBoard from "./pages/Client_Panel/ClientDashBoard";
import DailyWorkEntry from "./pages/Admin_Panel/StaffSection/Attendance/DailyWorkEntry";
import AttendenceSetting from "./pages/Admin_Panel/StaffSection/Attendance/AttendenceSetting";
import TrackTime from "./pages/Admin_Panel/StaffSection/Attendance/TrackTime";


const App = () => {
  const [toggleSideBar, setToggleSideBar] = useState(true);
  const [toggleEditSideBar, setToggleEditSideBar] = useState(false);
  const [toggleRunTab, setToggleRunTab] = useState(false);
  const [selectedPayrollTab, setSelectedPayrollTab] = useState(null);

  const handleToggleEditSideBar = () => {
    setToggleEditSideBar((toggleEditSideBar) => !toggleEditSideBar);
  };

  useEffect(() => {
    console.log(selectedPayrollTab);
  }, [selectedPayrollTab]);

  const handleToggleSideBar = () => {
    setToggleSideBar(!toggleSideBar);
  };

  function AuthLayout() {
    return (
      <>
        <Outlet />
      </>
    );
  }

  function AdminLayout() {
    return (
      <>
        <div className="flex max-h-screen">
          <SideBar />
          <div className="w-[100%] xl:w-[80%] lg:w-[80%] admin-sidebar-set max-h-screen ">
            <NavBar />
            <div className="p-[10px] h-[95vh]  w-full md:h-[90%] overflow-y-scroll content-container">
              <Outlet />
            </div>
          </div>
        </div>
      </>
    );
  }

  function Editstaff() {
    return (
      <>
        <div className=" ">
          <UpperHeader
            toggleEditSideBar={toggleEditSideBar}
            handleToggleEditSideBar={handleToggleEditSideBar}
          />
          <div className="flex min-h-screen overflow-y-scroll content-container">
            <SidebarEditStaff toggleEditSideBar={toggleEditSideBar} />
            <div
              className={`w-full p-[20px] pt-[80px] xl:pl-[20px] xl:p-[40px] relative xl:pt-[60px] h-screen   
        ${
          !toggleEditSideBar ? "xl:pl-[320px]" : "xl:pl-[0px]"
        } flex flex-col set-z`}
            >
              <Outlet />
            </div>
          </div>
        </div>
      </>
    );
  }

  // function CustomerPanel() {
  //   return (
  //     <>
  //       <Customer_Navbar />
  //       <Outlet />
  //       <Customer_Footer />
  //     </>
  //   );
  // }

  function Client_Panel() {
    return (
      <>
        <div className="flex max-h-screen ">
          {toggleSideBar && <SidebarClient toggleSideBar={toggleSideBar} />}

          {/* container for navbar and outlet */}
          <div
            className={`flex flex-col  flex-grow overflow-hidden max-h-screen`}
          >
            <ClientHeader
              handleToggleSideBar={handleToggleSideBar}
              toggleSideBar={toggleSideBar}
            />
            <main className="flex-1 z-[1]    h-[90%] overflow-y-scroll content-container">
              <div className="mx-auto px-4 pl-3 pr-3 py-8 lg:px-4 view-not  ">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </>
    );
  }

  function Calender_Layout() {
    return (
      <>
        <div className="flex  w-full  flex-row">
          <div className="flex min-h-screen ">
            <SideBar />
          </div>
          <div className="w-full">
            <NavBar />
            <>
              <CalenderHeader />
              <Outlet />
            </>
          </div>
        </div>
      </>
    );
  }

  function Payroll_Summary() {
    return (
      <>
        <div className="flex box-border overflow-hidden ">
          <SideBar />
          <div
            className={`${
              !toggleSideBar ? "w-[calc(100%-20%)]" : "w-full"
            } flex-grow-0`}
          >
            <NavBar
              className="w-full"
              toggleRunTab={toggleRunTab}
              setToggleRunTab={setToggleRunTab}
              selectedPayrollTab={selectedPayrollTab}
            />
            <div className=" pb-10 w-full h-lvh payroll-menu overflow-y-auto">
              <PayrollMenu
                className="w-full"
                toggleRunTab={toggleRunTab}
                setToggleRunTab={setToggleRunTab}
                setSelectedPayrollTab={setSelectedPayrollTab}
              />
              {/* <Outlet /> */}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<DashBoard />} />
            <Route path="/project-overview" element={<ProjectsOverview />} />
            <Route path="/new-ticket" element={<NewTicket />} />
            <Route path="/addnewclient" element={<AddNewClient />} />
            <Route path="/editclient" element={<EditClient />} />
            <Route path="/staff-menu" element={<StaffMenu />} />
            <Route path="/addrole" element={<AddRole />} />
            {/* <Route path="/role" element={<Role_Details />} /> */}
            <Route path="/editrole" element={<EditRole />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/role-detail" element={<Role_Details />} />
            <Route path="/editdepartment" element={<EditDepartment />} />
            <Route path="/add-one-staff" element={<AddOneStaff />} />
            <Route path="/department-details" element={<DepartmentDetail />} />
            <Route path="/branch-details" element={<BranchDetails />} />
            <Route path="/add-branch" element={<AddBranch />} />
            <Route path="/update-branch" element={<UpdateBranch />} />
            <Route path="/salary_Details" element={<Salary_Details />} />
            <Route path="/overtime" element={<Overtime />} />
            <Route path="/reviewfine" element={<Reviewfine />} />
            <Route path="/worktime" element={<Worktime />} />
            <Route
              path="/attendence_summary"
              element={<Attendence_summary />}
            />
            <Route path="/setting-panel" element={<Setting_panel />} />
            <Route path="/daily-work-entry" element={<DailyWorkEntry />} />
            <Route path="/attendence-setting" element={<AttendenceSetting />} />
            <Route path="/tracktime" element={<TrackTime />} />

            <Route path="/project_summary" element={<Project_Summary />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/overtime" element={<Overtime />} />
            <Route path="/clients" element={<Clients />} />
            {/* <Route path="/projectprogress" element={<Project_Progress />} /> */}
            {/* <Route path="/addnewtask" element={<AddNewTask />} /> */}
            {/* <Route path="/taskdata" element={<Task_Data />} /> */}
            <Route path="/task" element={<Task />} />
            <Route path="/adddepartment" element={<AddDepartment />} />
            <Route path="/create-new-project" element={<Add_Project />} />
            <Route
              path="/department-details"
              element={<Department_Details />}
            />
            <Route path="/taskstatus" element={<Task_Status />} />
            <Route path="chats/admin" element={<AdminChatInterface />} />

            {/* <Route path="chats/client/login" element={<ClientLogin />} /> */}

            <Route path="chats/staff" element={<StaffChatInterface />} />

            <Route path="/status-main-page" element={<StatusMainPage />} />
            <Route path="/edittaskstatus" element={<Edit_Task_Status />} />
            <Route path="/edit-project" element={<Edit_Project />} />
            {/* <Route path="/task" element={<Task />} /> */}
            <Route path="/editprofile" element={<Editprofile />} />
            <Route path="/taskstatus" element={<Task_Status />} />

            {/* <Route path="/projectprogress" element={<Project_Progress />} /> */}
            <Route path="/expenseedit" element={<ExpenseEdit />} />
            <Route path="/expensepage" element={<ExpensePage />} />
            <Route path="/subscription-plan" element={<Subscription />} />
            <Route path="/subscription-plan/buy-plan" element={<Buy_plan />} />
            <Route
              path="/contact-information"
              element={<ContactInformation />}
            />
            <Route path="/taskform" element={<TaskForm />} />
          </Route>
        </Route>

        <Route element={<Editstaff />}>
          <Route path="/personal-detail/:id" element={<PersonalDetail />} />
          <Route path="/bank-detail/:id" element={<BankDetails />} />
          <Route path="/attendance-detail/:id" element={<Editattendance />} />
          <Route path="/employee-detail/:id" element={<EmployementDetail />} />
          <Route path="/user-permission/:id" element={<UserPermission />} />
          <Route
            path="/leavepolicy-detail/:id"
            element={<EditLeavePolicies />}
          />
          <Route path="/custom-detail/:id" element={<CustomDetail />} />
          <Route
            path="/salary-details-edit/:id"
            element={<EditSalaryDetails />}
          />
          <Route path="/edit-penalty/:id" element={<EditPenalty />} />
          <Route path="/salary-overview/:id" element={<SalaryOverview />} />
          <Route path="/staff-salary-summary" element={<StaffSalarySummry />} />
          <Route path="/documents" element={<Documents />} />
          <Route
            path="/background-verification"
            element={<BackgroundVerification />}
          />
          <Route path="/verify-aadhar" element={<VerifyAadhaar />} />

          <Route
            path="/background-verification/:id"
            element={<BackgroundVerification />}
          />
          <Route path="/verify-aadhar" element={<VerifyAadhaar />} />
          <Route path="/verify-pan" element={<VerifyPan />} />
          <Route path="/driving-license" element={<DrivingLicense />} />
          <Route path="/uan" element={<VerifyUan />} />
          <Route path="/face" element={<VerifyFace />} />
          <Route path="/address" element={<VerifyAddress />} />
          <Route
            path="/past-employment-details"
            element={<PastEmploymentDetail />}
          />
          <Route path="/voter-id" element={<VerifyVoterID />} />
        </Route>

        <Route
          path="/background-verification"
          element={<BackgroundVerification />}
        />
        <Route path="/verify-aadhar" element={<VerifyAadhaar />} />
        {/* </Route> */}

        <Route element={<Payroll_Summary />}>
          <Route path="/run-payroll" element={<RunPayroll />} />
          <Route path="/payroll-menu" element={<PayrollMenu />} />
        </Route>
        <Route element={<Calender_Layout />}>
          <Route path="/calender" element={<Calender />} />
          <Route path="/meeting" element={<Meeting />} />
          <Route path="/day-wise" element={<CalenderDay />} />
          <Route path="/year-wise" element={<CalenderYear />} />
          <Route path="/week-wise" element={<CalenderWeekly />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/authentication" element={<MultiStepForm />} />
          <Route path="/authentication/login" element={<LoginPage />} />
          <Route path="/authentication/reset" element={<ResetPassword />} />
          <Route
            path="/authentication/request-password"
            element={<RequestPassword />}
          />
        </Route>
        <Route path="/clientpanel" element={<Client_Panel />}>
          <Route index element={<ClientDashBoard />} />
          <Route path="chats" element={<ClientChatInterface />} />
          <Route path="taskview" element={<ClientTaskView />} />
          <Route path="project_summary" element={<ProjectSummary />} />
          <Route path="projects" element={<Client_Project />} />
          <Route path="project_invoice" element={<Project_Invoice />} />
          <Route path="notes" element={<Notes />} />
        </Route>

        {/* <Route element={<CustomerPanel />}>
          <Route path="/customer-panel"></Route>
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
