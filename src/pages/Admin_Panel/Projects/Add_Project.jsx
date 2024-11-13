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
import 'react-quill/dist/quill.snow.css'; // Quill styling
import { useGlobalContext } from "../../../Context/GlobalContext";
import CreatableSelect from "react-select/creatable";
import Select from 'react-select';

const Add_Project = () => {
  const { baseUrl } = useGlobalContext();
  const navigate = useNavigate()
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
    navigate("/project_summary")
  }
  const [clientData, setClientData] = useState(null);

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
      setClientData(res.data)
    }
    else {
      alert("An Error Occured")
    }
  }

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
      // console.log("---",res.name)
    }
    else {
      alert("An Error Occured")
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
    value: staff.id,
    label: staff.name,
  }));



  async function projectSubmit() {
    const plainTextDescription = (editorData || '').replace(/<\/?p>/g, '');
    const projectNameString = fetchProjectStatus.length > 0 ? fetchProjectStatus[0].project_name : ''; // Option 1, or use Option 2 as needed
    const result = await fetch(baseUrl + "project", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        project_name: projectName,
        customer: selectedClient,
        status: projectNameString,
        billing_type: billingType,
        total_rate: rate,
        estimated_hours: hours,
        department: members,
        start_date: date,
        deadline: deadline,
        description: plainTextDescription, // Send `editorData` here
        send_mail: sendEmail,
        tags: selectedTag
      })
    })
    if (result.status == 201) {
      const data = result.json()
      alert("Add Project Successfully")
    }
    else {
      alert("An Error Occured")
    }
  }

  useEffect(() => {
    console.log(editorData); // Check if `editorData` updates on every change
  }, [editorData]);

  return (
    <Tabs className="m-5 shadow rounded-lg">
      <TabList className="flex p-5 pb-[10px] gap-4 text-[20px] font-medium border-b border-[#B1B1B1] cursor-pointer ">
        <Tab className="hover:text-[#2568EC] project-tab hover:border-b pb-2 border-[#2568EC]">
          Project
        </Tab>
        <Tab className="hover:text-[#2568EC] hover:border-b pb-2 border-[#2568EC]">
          Project Settings
        </Tab>
      </TabList>

      <TabPanel className="m-5">
        <div className="w-[100%] space-y-5">
          <div className="space-y-2">
            <h1 className="font-medium">* Project Name</h1>
            <input
              className="h-[46px] w-[100%] border border-[#DBDCDE] rounded-md pl-2"
              type="text"
              onChange={(e) => { setProjectName(e.target.value) }}
            />
          </div>

          <div className="space-y-2">
            <h1 className="font-medium">* Customer</h1>
            <select onChange={(e) => { setSelectClient(e.target.value) }} className="w-[100%] h-[46px] bg-white border border-[#DBDCDE] rounded-md pl-5 ">
              <option value="">Select and begin typing</option>
              {
                clientData?.map((clientInformation, index) => {
                  return <option value={clientInformation.id}>{clientInformation.name}</option>
                })
              }

            </select>
          </div>

          <div className="font-medium flex gap-4 items-center">
            <input type="checkbox" />
            <h1>Calculate progress through tasks</h1>
          </div>

          <div className="space-y-2">
            <h1>Progress 0%</h1>
            <div className="h-7 bg-[#FBFBFB] border border-[#D9D9D9] rounded-md"></div>
          </div>

          <div className="flex w-[100%] gap-10">
            <div className="w-[50%] space-y-2">
              <h1>* Billing Type</h1>
              <select onChange={(e) => { setBillingType(e.target.value) }} className="h-[46px] w-[100%] bg-white border border-[#DBDCDE] rounded-md pl-5">
                <option value="Fixed Rate">Fixed rate</option>
                <option value="Project Hours">Project Hours</option>
                <option value="Task Hours Based on task hourly rate">Task Hours Based on task hourly rate</option>
              </select>
            </div>

            <div className="w-[50%] space-y-2">
              <h1>Status</h1>
              <select className="h-[46px] w-[100%] bg-white border border-[#DBDCDE] rounded-md pl-5">
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
            <h1 className="font-medium">Total Rate</h1>
            <input
              className="h-[46px] w-[100%] border border-[#DBDCDE] rounded-md pl-2"
              type="number"
              onChange={(e) => { setRate(parseInt(e.target.value) || 0) }}

            />
          </div>

          <div className="grid grid-rows-2 space-y-2">
            <div className="flex w-[100%] gap-10">
              <div className="w-[50%] space-y-2">
                <h1>Estimated Hours</h1>
                <input
                  className="h-[46px] w-[100%] border border-[#DBDCDE] rounded-md pl-2"
                  type="number"
                  onChange={(e) => { setHours(parseInt(e.target.value) || 0) }}
                />
              </div>

              <div className="w-[50%] space-y-2">
                <h1>Members</h1>

                <Select
                  isMulti
                  options={options}
                  onChange={(op) => { setMembers(op.map(o => o.value)) }}
                  placeholder="Select Members..."
                  className="w-full"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      minHeight: '46px',
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
                />



              </div>
            </div>

            <div className="flex w-[100%] gap-10">
              <div className="w-[50%] space-y-2">
                <h1>* Start Date</h1>
                <input
                  className="h-[46px] w-[100%] border border-[#DBDCDE] rounded-md px-2"
                  type="date"
                  onChange={(e) => { setDate(e.target.value) }}
                />
              </div>

              <div className="w-[50%] space-y-2">
                <h1>Deadline</h1>
                <input
                  className="h-[46px] w-[100%] border border-[#DBDCDE] rounded-md px-2"
                  type="date"
                  onChange={(e) => { setDeadLine(e.target.value) }}
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
                  minHeight: '40px',
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
            />
          </div>

          <div className="space-y-2">
            <h1 className="text-[18px] font-semibold">Description</h1>
            <ReactQuill
              value={editorData}
              onChange={setEditorData}
              modules={modules}
              formats={formats}
            />
          </div>

          <div className="space-x-3 border-b border-t border-[#B1B1B1] py-4">
            <input type="checkbox" onChange={(e) => setSendEmail(e.target.checked)} />
            <span className="font-medium">Send project created email</span>
          </div>

          <div className="flex justify-end gap-5 pb-10">
            <button onClick={handleCloseForm} className="bg-white text-[#511992] border border-[#511992] h-10 w-20 rounded-md">Cancel</button>
            <button className="bg-[#511992] text-white h-10 w-20 rounded-md" onClick={projectSubmit}>Save</button>
          </div>
        </div>
      </TabPanel>

      <TabPanel className="m-5">
        <Project_Setting closeform={handleCloseForm} />
      </TabPanel>
    </Tabs>
  );
};

export default Add_Project;