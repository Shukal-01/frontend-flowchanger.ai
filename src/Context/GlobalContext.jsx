import React, { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

export const MainContext = createContext();
export const GlobalContext = ({ children }) => {

  

  const [activeSubmenu, setActiveSubmenu] = useState(false);
  const [selectedSidebarTab, setSelectedSidebarTab] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  // const baseUrl = "https://fc-prod-testing.onrender.com/api/"
  const baseUrl= "https://fc-production-testing.onrender.com/api/"
  console.log(baseUrl)
  const [staffTab, setStaffTab] = useState(0);
  const [name, setName] = useState("");
  const [depId, setDepId] = useState("");
  const [editPermissions, setEditPermissions] = useState({
    clients_permissions: { view_global: false, create: false, edit: false, delete: false },
    projects_permissions: { view_global: false, create: false, edit: false, delete: false },
    report_permissions: { view_global: false, view_time_sheets: false },
    staff_role_permissions: { view_global: false, create: false, edit: false, delete: false },
    settings_permissions: { view_global: false, view_time_sheets: false },
    staff_permissions: { view_global: false, create: false, edit: false, delete: false },
    task_permissions: { view_global: false, create: false, edit: false, delete: false },
    sub_task_permissions: { view_global: false, create: false, edit: false, delete: false },
    chat_module_permissions: { grant_access: false },
    ai_permissions: { grant_access: false }
  });

  const [roleName, setRoleName] = useState("");
  const [roleId, setRoleId] = useState("");
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [branchData,setBranchData]=useState("");
  // console.log(selectedStaff)

  const fetchDetails = async () => {
    const response = await fetch(baseUrl + "/staff");

    if (response.status == 200) {
      const data = response.json();
      setSelectedStaff(data)
    }
  }

  const openToast = (msg, flag) => {
    toast(msg, { type: flag });
  };

  const [staffDetail, setStaffDetail] = useState([]);
  const fetchStaff = async () => {
    const result = await fetch(baseUrl + "staff")
    console.log("reuslt---", result)
    try {
      if (result.status == 200) {
        const res = await result.json();
        console.log(res);
        setStaffDetail(res)
      }
      else {
        console.log("An Error Occured")
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  console.log("staff", staffDetail)

  useEffect(() => {
    fetchStaff();
  }, [])
  useEffect(() => {
    console.log(staffTab);
    console.log(selectedTab);
  }, [selectedTab, staffTab]);

  return (
    <MainContext.Provider value={{ selectedTab, setSelectedTab, selectedSidebarTab, setSelectedSidebarTab, staffTab, openToast, setStaffTab, baseUrl, name, setName, depId, setDepId, roleName, setRoleName, roleId, setRoleId, editPermissions, setEditPermissions, selectedStaff, setSelectedStaff, fetchDetails, fetchStaff, staffDetail, activeSubmenu, setActiveSubmenu,branchData,setBranchData }}>
      {children}
      <ToastContainer />
    </MainContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(MainContext)
}

