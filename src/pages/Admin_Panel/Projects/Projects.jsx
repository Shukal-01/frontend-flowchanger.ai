import React, { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CachedIcon from '@mui/icons-material/Cached';
import SearchIcon from '@mui/icons-material/Search';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { useGlobalContext } from "../../../Context/GlobalContext";


const Projects = () => {
  const [isOpen1, setIsOpen1] = useState(false);
 

  const toggleDropdown1 = () => setIsOpen1(!isOpen1);

  
  const { baseUrl } = useGlobalContext();
const [isTableOpen, setIsTableOpen] = useState(false);
const [projectDetails, setProjectDetails] = useState([]);

const toggleTable = () => {
  setIsTableOpen(!isTableOpen);
};

async function fetchProjectDetails() {
  const result = await fetch(baseUrl + "project");
  if (result.status === 200) {
    const res = await result.json();
    setProjectDetails(res.data);
  } else {
    alert("An Error Occurred");
  }
}

useEffect(() => {
  fetchProjectDetails();
}, []);

return (
  <div className="p-4 bg-white shadow-lg rounded-md">
    <div className="mb-4">
    <Link
          to="/create-new-project"
          className="text-white text-sm bg-purple-600 hover:bg-purple-700 rounded-lg px-4 py-2 flex items-center gap-2 w-[150px]"
        >
          <AddIcon /> New Project
        </Link>
    </div>

    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h2 className="font-medium mb-4 flex items-center gap-2">
        <LibraryBooksIcon /> Projects
      </h2>

      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4">
          <div className="relative">
            <button
              className="flex items-center text-sm font-normal text-black rounded-md p-2"
              onClick={toggleDropdown1}
            >
              25 <KeyboardArrowDownIcon />
            </button>
            {isOpen1 && (
              <div className="absolute left-0 w-20 mt-2 bg-white border rounded-md shadow-md z-10">
                {[30, 40, 50].map((num) => (
                  <a
                    key={num}
                    href="#"
                    className="block p-2 text-sm text-center text-gray-700 hover:bg-gray-100"
                  >
                    {num}
                  </a>
                ))}
              </div>
            )}
          </div>
          <button className="relative p-2 text-sm font-medium border rounded-md flex items-center gap-1">
            Export <CachedIcon />
          </button>
        </div>
        <div className="relative">
          <input
            className="p-2 pr-8 rounded-2xl border border-gray-300 text-sm"
            type="text"
            placeholder="Search..."
          />
          <SearchIcon className="absolute right-3 top-2 text-gray-500" />
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="min-w-full">
          <div className="mb-4 w-full">
            <div className="w-full">
              <table className="w-full border-collapse">
                <thead className="bg-gray-200 cursor-pointer" onClick={toggleTable}>
                  <tr>
                    <th className="text-[12px] text-center p-2 border-r font-medium w-[5%]whitespace-nowrap">#</th>
                    <th className="text-[12px] text-center p-2 border-r font-medium w-[20%]whitespace-nowrap">Project Name</th>
                    <th className="text-[12px] text-center p-2 border-r font-medium w-[15%]whitespace-nowrap">Customer</th>
                    <th className="text-[12px] text-center p-2 border-r font-medium w-[20%]">Tags</th>
                    <th className="text-[12px] text-center p-2 border-r font-medium w-[15%]whitespace-nowrap">Start Date</th>
                    <th className="text-[12px] text-center p-2 border-r font-medium w-[15%]whitespace-nowrap">Deadline</th>
                    <th className="text-[12px] text-center p-2 border-r font-medium w-[10%]whitespace-nowrap">Members</th>
                    <th className="text-[12px] text-center p-2 border-r font-medium w-[10%]whitespace-nowrap">Status</th>
                  </tr>
                </thead>
                {isTableOpen && (
                  <tbody>
                    {projectDetails?.map((project, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="text-center p-2 text-[12px] w-[5%] whitespace-nowrap">{index + 1}</td>
                        <td className="text-center p-2 text-[12px] w-[20%]whitespace-nowrap">{project.project_name}</td>
                        <td className="text-center p-2 text-[12px] w-[15%]whitespace-nowrap">Customer</td>
                        <td className="text-center p-2 text-[12px] w-[20%]whitespace-nowrap">
                          {project.tags.map((tag, i) => (
                            <span key={i} className="border rounded-md p-1 mr-2 text-[12px] inline-block">
                              {tag}
                            </span>
                          ))}
                        </td>
                        <td className="text-center p-2 text-[12px] w-[15%]whitespace-nowrap">{project.start_date}</td>
                        <td className="text-center p-2 text-[12px] w-[15%]whitespace-nowrap">{project.deadline}</td>
                        <td className="text-center p-2 text-[12px] w-[10%]whitespace-nowrap">Members</td>
                        <td className="text-center p-2 text-[12px] w-[10%]whitespace-nowrap">{project.status}</td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
export default Projects;
