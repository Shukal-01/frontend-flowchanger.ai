import React, { useState, useRef, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Project_Setting from "./Project_Setting";
import SellIcon from "@mui/icons-material/Sell";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PrintIcon from '@mui/icons-material/Print';
import { FaGalacticSenate } from "react-icons/fa6";
import { useNavigate } from "react-router";
import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css'; // Quill styling
import { useGlobalContext } from "../../../Context/GlobalContext";
import CreatableSelect from "react-select/creatable";
import Select from 'react-select';
import { FaArrowLeft } from "react-icons/fa";
import {Link} from "react-router-dom";
import { div } from "framer-motion/client";

const Add_Project = () => {
  const { baseUrl,openToast} = useGlobalContext();
  const navigate = useNavigate();
  const [editorData, setEditorData] = useState('');
  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean'] // Remove formatting button
    ]
  };

  const formats = [
    'header', 'font', 'list', 'bullet',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'script', 'align', 'link', 'image', 'video'
  ];

  const [formData, setformData] = useState({
    projectName: "",
    customer: "",
    calculateProgress: false,
    billingType: "",
    status: "",
    totalRate: "",
    startDate: "",
    deadline: "",
    members: "",
    tags: "",
    description: "",
    sendEmail: false,
  })

  function handleCloseForm() {
    navigate("/projects")
  }
  const [clientData, setClientData] = useState([]);

  const handleChange = (selectedOptions) => {
    // Extract only the `value` from each selected option
    const tagValues = selectedOptions.map(option => option.value);
    setSelectedTag(tagValues);  // Set the values in the state
  };


  const fetchDetail = async () => {
    const result = await fetch(baseUrl + "client");
    if (result.status == 200) {
      const res = await result.json();
      console.log(res)
      setClientData(res)
    }
    else {
      openToast("An Error Occured","error")
      // alert("An Error Occured")
    }
  }

  useEffect(()=>{
   console.log(clientData)
  },[]);

  useEffect(() => {
    fetchDetail();
    fetchRoles()
  }, [])


  const [staffDetail, setStaffDetail] = useState();
  const fetchRoles = async () => {
    const result = await fetch(baseUrl + "staff")
    console.log("reuslt---", result)
    if (result.status == 200) {
      const res = await result.json();
      setStaffDetail(res)
      console.log("---",res.name)
    }
    else {
      // openToast("An Error Occured")
    }

  }
  const [tags, setTags] = useState([
    { value: "thumbnail", label: "thumbnail" },
    { value: "youtube", label: "youtube" },
    { value: "youtube thumbnail", label: "youtube thumbnail" },
    { value: "carousel", label: "carousel" },
    { value: "RE-DESIGN", label: "REDESIGN" },
    { value: "Ads", label: "Ads" },
    { value: "drdcrcrc", label: "drdcrcrc" },
  ]);
  const [selectedTag, setSelectedTag] = useState([])

  const [projectName, setProjectName] = useState();
  const [billingType, setBillingType] = useState();
  const [rate, setRate] = useState();
  const [hours, setHours] = useState();
  const [date, setDate] = useState();
  const [deadline, setDeadLine] = useState();
  const [selectedClient, setSelectClient] = useState();
  const [sendEmail, setSendEmail] = useState(false);
  const [members, setMembers] = useState([])


  const [selectedStatus, setSelectedStatus] = useState([]);
  const [fetchProjectStatus, setFetchProjectStatus] = useState([]);
  async function fetchProjectDetails() {
    const result = await fetch(baseUrl + "project-status");
    const data = await result.json();
    console.log(data)
    setFetchProjectStatus(data.data)
  }

  useEffect(() => {
    fetchProjectDetails();
  }, [])


  const options = staffDetail?.map((staff) => ({
    value: staff.staffDetails?.id,
    label: staff.name,
  }));

  console.log(staffDetail);
  console.log(clientData);  



  async function projectSubmit(e) {
    e.preventDefault();
    const plainTextDescription = (editorData || '').replace(/<\/?p>/g, '');
     console.log(
      selectedClient
     )
    const projectNameString = fetchProjectStatus.length > 0 ? fetchProjectStatus[0].project_name : ''; // Option 1, or use Option 2 as needed
    const result = await fetch(baseUrl + "project/create", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        project_name: projectName,
        customerId: selectedClient,
        status: projectNameString,
        billing_type: billingType,
        total_rate: rate,
        estimated_hours: hours,
        staffId: members,
        start_date: date,
        deadline: deadline,
        description: plainTextDescription, // Send `editorData` here
        send_mail: sendEmail,
        tags: selectedTag
      })
    })
    console.log(result);
    const data =await result.json()
    if (result.status == 201) {
     openToast(data.msg||"Add Project Successfully", "success")
    }
    else {

     console.log(data.msg);
      openToast(data.msg||"error occured","error")
    }
  }

  useEffect(() => {
    console.log(editorData); // Check if `editorData` updates on every change
  }, [editorData]);

  // useEffect(()=>{
  //  console.log(clientData.clientInformation)
  // },[])
  useEffect(()=>{
  console.log(clientData)
  },[])

  return (
    <div className="max-w-[80%] mx-auto">
      
    <Tabs className="m-5 shadow-cs rounded-lg">
      <div className="">
    {/* <Link to = "/clients"><FaArrowLeft /></Link> */}
    </div>
      <TabList className="flex p-[14px] gap-4 text-[16px] font-medium border-b border-[#B1B1B1] cursor-pointer ">
        <Tab className="py-2 hover:border-b-1 hover:border-[#27004a] text-md font-medium">
          Project
        </Tab>
        <Tab className="text-gray-600 py-2 text-md font-medium hover:border-b-1 hover:border-[#27004a]">
          Project Settings
        </Tab>
      </TabList>

      <TabPanel className="m-5">
      <form action="" onSubmit = {projectSubmit}>
        <div className="w-[100%]  space-y-5">
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">* Project Name</label>
            <input  
              className="h-[35px] w-[100%] border border-[#DBDCDE] focus-visible:outline-none  rounded-md pl-2 "
              type="text"
              onChange={(e) => { setProjectName(e.target.value) }}
             name = "projectname"
             required
    
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">* Customer</label>
            <select
  onChange={(e) => setSelectClient(e.target.value)}
  className="w-[100%]  bg-white border border-[#DBDCDE] focus-visible:outline-none rounded-md pl-5 h-[35px]"
>
  {clientData?.map((clientInformation, index) => {
    console.log(clientInformation?.name, clientInformation.clientDetails?.id); // Logs name and clientDetails.id

    return (
      <option key={index} value={clientInformation.clientDetails?.id }>
        {clientInformation?.name ?? "n/a"}
      </option>
    );
  })}
</select>
          </div>

          <div className="font-medium flex gap-3 items-center">
            <input type="checkbox" name = "progress" required/>
            <label for = "text-[13px] font-medium progress-through ">Calculate progress through tasks</label>  
          </div>

          <div className="space-y-2">
            <h1 className="text-sm font-medium text-gray-700">Progress 0%</h1>
            <div className="h-[6px] bg-[#27004a] border border-[#D9D9D9] rounded-md"></div>
          </div>

          <div className="flex w-[100%] gap-10">
            <div className="w-[50%] space-y-2">
              <label className="text-sm font-medium text-gray-700">* Billing Type</label>
              <select onChange={(e) => { setBillingType(e.target.value) }} className="h-[40px] w-[100%] focus-visible:outline-none bg-white border border-[#DBDCDE] rounded-md pl-5" name = "billingType" required>
                <option value="Fixed Rate">Fixed rate</option>
                <option value="Project Hours">Project Hours</option>
                <option value="Task Hours Based on task hourly rate">Task Hours Based on task hourly rate</option>
              </select>
            </div>

            <div className="w-[50%] space-y-2">
              <label className="text-sm font-medium text-gray-700">Status</label>
              <select className="h-[40px] w-[100%] focus-visible:outline-none bg-white border border-[#DBDCDE] rounded-md pl-5" name = "status" required>
                <option value="">In Progress</option>
                {
                  fetchProjectStatus?.map((s) => {
                    return <option value={s.id}>
                      {s.project_name}
                    </option>
                  })
                }
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Total Rate</label>
            <input
            name = "totalRate"
              className="h-[35px] w-[100%] border border-[#DBDCDE] focus-visible:outline-none rounded-md pl-2"
              type="number"
              onChange={(e) => { setRate(parseInt(e.target.value) || 0) }}
                required

            />
          </div>

          <div className="grid grid-rows-2 space-y-2">
            <div className="flex w-[100%] gap-10">
              <div className="w-[50%] space-y-2">
                <label className="text-sm font-medium text-gray-700">Estimated Hours</label>
                <input
                  className="h-[40px] w-[100%] focus-visible:outline-none border border-[#DBDCDE] rounded-md pl-2"
                  type="number"
                  name = "estimatedHours"
                  onChange={(e) => { setHours(parseInt(e.target.value) || 0) }}
                required
                />
              </div>

              <div className="w-[50%] space-y-2">
                <label className="text-sm font-medium text-gray-700">Members</label>

                <Select
                  isMulti
                  options={options}
                  onChange={(op) => { setMembers(op.map(o => o.value)) }}
                  placeholder="Select Members..."
                  className="focus-visible:outline-none"
                  name = "membersF"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      maxHeight: '40px',
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
                  required
                />



              </div>
            </div>

            <div className="flex w-[100%] gap-10">
              <div className="w-[50%] space-y-2">
                <label className="text-sm font-medium text-gray-700">* Start Date</label>
                <input
                  className="h-[35px] w-[100%] border border-[#DBDCDE] rounded-md px-2"
                  type="date"
                  name = "startDate"
                  onChange={(e) => { setDate(e.target.value) }}
                  required
                />
              </div>

              <div className="w-[50%] space-y-2">
                <label className="text-sm font-medium text-gray-700">Deadline</label>
                <input
                  className="h-[35px] w-[100%] border border-[#DBDCDE] rounded-md px-2"
                  type="date"
                  name = "deadline"
                  onChange={(e) => { setDeadLine(e.target.value) }}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-[10px]">
            <SellIcon />
            {/* <span className="font-medium pl-2">Tags</span> */}
            <CreatableSelect
              isMulti
              options={tags}
              onChange={handleChange}
              placeholder="Select or add tags..."
              className="tag-selector w-full"
              styles={{
                control: (provided) => ({
                  ...provided,
                  minHeight: '35px',
                  border: '1px solid #d1d5db',
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
              required
            />
          </div>

          {/* <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <ReactQuill
              value={editorData}
              onChange={setEditorData}
              modules={modules}
              formats={formats}
            />
          </div> */}

          <div className="space-x-3 border-b border-t border-[#B1B1B1] py-4">
            <input type="checkbox" onChange={(e) => setSendEmail(e.target.checked)} />
            <span className="text-sm font-medium text-gray-700">Send project created email</span>
          </div>

          <div className="flex justify-end gap-5  pb-[20px] ">
            <button onClick={handleCloseForm} className="bg-white text-[#27004a] border border-[#27004a] h-10 w-20 rounded-md">Cancel</button>
            <button type= "submit" className="second-btn" >Save</button>
          </div>
        </div>
        </form>
      </TabPanel>

      <TabPanel className="m-5">
        <Project_Setting closeform={handleCloseForm} />
      </TabPanel>
    </Tabs>
    </div>
  );
};

export default Add_Project;