import React, { useState, useRef } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import MovieIcon from "@mui/icons-material/Movie";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import LinkIcon from "@mui/icons-material/Link";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const ClientTaskview = () => {
  //taskview dropdown
  const [isOpen1, setIsOpen1] = useState(false);
  const fileInputRef = useRef(null);

  const toggleDropdown1 = () => {
    setIsOpen1(!isOpen1);
  };
  //taskview dropdown

  // Create a reference for the file input

  // Function to handle button click and open file input dialog
  const handleUploadClick = () => {
    fileInputRef.current.click(); // Trigger click on input type="file"
  };

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    console.log("Selected file:", file);

    //upload file function

    // Create a reference for the file input

    // Function to handle button click and open file input dialog
    const handleUploadClick = () => {
      fileInputRef.current.click(); // Trigger click on input type="file"
    };

    // Function to handle file selection
    const handleFileChange = (event) => {
      const file = event.target.files[0]; // Get the selected file
      console.log("Selected file:", file);
    };
    //upload file function
  };

  return (
    <>
      <div className="w-[100%] flex p[0] view-not">
        <div className="w-[60%] pl-[30px] pt-[20px] h-[100vh] main-sixty overflow-scroll ">
          <div className="mb-[20px]">
            <p className="font-medium text-[22px] flex  items-center gap-[10px] short-video">
             Task Name
            </p>
          </div>
          <div className="mb-[20px]">
            <div className="w-[60%] status-set2 mb-[10px] flex  justify-between items-center">
              <p className="text-[#8c939f] text-[16px]">Task Status</p>
              <button className="text-[#000] text-[14px] p-[8px] rounded-lg hover:bg-[#f2f6f8]">
                Forward to Graphic Team
              </button>
            </div>
            <div className="w-[60%] status-set2 mb-[10px] flex  justify-between items-center">
              <p className="text-[#8c939f] text-[16px]">Task Type</p>
              <button className="text-[#000] text-[14px] p-[8px] rounded-lg hover:bg-[#f2f6f8]">
                Graphic
              </button>
            </div>
            <div className="w-[60%] status-set2 mb-[10px] flex justify-between items-center">
              <p className="text-[#8c939f] text-[16px]">Start Date</p>
              <p className="text-[#000] p-[8px] rounded-lg hover:bg-[#f2f6f8] text-[14px]">
                07/01/24
              </p>
            </div>
            <div className="w-[60%] status-set2 mb-[10px] flex justify-between items-center">
              <p className="text-[#8c939f] text-[16px]">Due Date</p>
              <p className="text-[#000] p-[8px] rounded-lg hover:bg-[#f2f6f8] text-[14px]">
                07/01/2024
              </p>
            </div>
            <div className="w-[60%] status-set2 mb-[10px] flex justify-between items-center">
              <p className="text-[#8c939f] text-[16px]">End Date</p>
              <p className="text-[#000] p-[8px] rounded-lg hover:bg-[#f2f6f8] text-[14px]">
                07/01/2024
              </p>
            </div>
            <div className="w-[60%] status-set2 mb-[10px] flex justify-between items-center">
              <p className="text-[#8c939f] text-[16px]">Select Project</p>
              <select
                name="options"
                id="dropdown"
                className="border border-gray-300 rounded-lg"
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>

            <div className="w-[60%] status-set2 mb-[10px] flex justify-between items-center">
              <p className="text-[#8c939f] text-[16px]">Assignee By</p>
              <p className="text-[#000] hover:bg-[#f2f6f8] p-[8px] rounded-lg  text-[16px]">
                Tej Partap Sir
              </p>
            </div>

            <div className="w-[60%] status-set2 mb-[10px] flex justify-between items-center">
              <p className="text-[#8c939f] text-[16px]">Tag</p>
              <p className="text-[#000] flex hover:bg-[#f2f6f8] p-[8px] rounded-lg items-center gap-[8px] bg text-[14px]">
                <span className="operational"></span>Demo
              </p>
            </div>
          </div>
          <div className="flex gap-[10px]    repeat-task">
            <button
              className="rounded-md substack-btn1 view-btns bg-[#f2f6f8] hover:text-[blue] flex gap-[5px] items-center p-[6px] text-[14px] text-[#8c939f]"
              type="submit"
            >
              <DoneAllIcon className="newadd3" />
              Add substack
            </button>
            <button
              className="rounded-md substack-btn1 view-btns bg-[#f2f6f8] hover:text-[blue] flex gap-[5px] items-center p-[6px] text-[14px] text-[#8c939f]"
              type="submit"
            >
              <LinkIcon className="newadd3" />
              Attach file
            </button>
          </div>

          <div className="pb-[10px] pt-[20px] flex items-center gap-[6px]">
            <StickyNote2Icon className="text-[#8c939f] newadd3" />
            <p className="text-[#8c939f]">Descrption</p>
          </div>

          <div className="p-[10px]">
            <p className="text-[14px]">
              If you or your teammates regularly work on repetitive tasks or
              participate in recurring events, you can create recurring
              activities in Bordio to automate the process and avoid manual
              scheduling. 🤖
            </p>
            <p className="text-[14px] mt-[20px] mb-[10px]">
              In this video you will learn:{" "}
            </p>
            <ul>
              <li className="list-disc ml-[54px] text-[14px]">
                How to assign tasks and events to your teammates
              </li>
              <li className="list-disc ml-[54px] text-[14px]">
                How to track their performance
              </li>
              <li className="list-disc ml-[54px] text-[14px]">
                How to manage team's workload
              </li>
              <li className="list-disc ml-[54px] text-[14px]">
                How to use waiting list
              </li>
            </ul>
            <p className="mt-[16px] repeat-task">And more... 🔥</p>

            <div className=" pt-[10px]">
              <div className="flex items-center mb-[20px] mt-[20px] justify-between">
                <p className="text-[#8c939f] flex items-center gap-[6px]">
                  {" "}
                  <AvTimerIcon className="text-[#8c939f] newadd3" />
                  Time blocks
                </p>
                <KeyboardArrowDownIcon className="h-[30px] w-[30px] bg-[#ebf1f5]  text-[#8c939f] rounded-2xl" />
              </div>
              <div>
                <div className="flex gap-[40px] items-center timeblock1">
                  <p className="text-[#8c939f] flex gap-[4px] items-center text-[14px]">
                    {" "}
                    <span className="h-[10px]w-[10px] p-[5px] rounded-2xl bg-[#27004a]"></span>
                    Spent time : <span className="five-hour">0:15h</span>
                    <span className="#8c939f">(100%)</span>
                  </p>
                  <div>
                    <p className="text-[#8c939f] flex gap-[4px] items-center  text-[14px]">
                      <span className="h-[10px]w-[10px] p-[5px] rounded-2xl bg-[#27004a73]"></span>
                      Estimate time : <span className="five-hour1">0:15h</span>
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-5 bg-gray-200 rounded-lg py-3 px-2">
                    <div>Start Timer</div>
                    <div>Task Reminder</div>
                    <div>Responsible me</div>
                </div>
                <div className="mt-3 ml-2">Add Time Block</div>
                <div className="w-[100%] mt-[20px] mb-[20px]">
                  <p className="w-[100%] bg-[#27004a] h-[7px]  rounded-2xl"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[40%] main-fourty bg-[#f5f8fa]  h-[100vh] p-[20px]">
          <div>
            <div className="pb-[30px] border-b border-[#ebf1f5]">
              <button
                className="rounded-2xl view-btns bg-[#e0e6eb] hover:text-[blue]  flex gap-[5px] items-center p-[6px] text-[14px] text-[#8c939f]"
                type="submit"
              >
                <NotificationsIcon className="newadd3" />
                Following{" "}
                <span className="h-[22px] w-[1px] bg-[#8c939f]"></span>{" "}
                <span>1 Follower</span>
              </button>
            </div>
            <div className="flex justify-end flex-col created-task h-[400px] ">
              <div className="flex justify-center">
                <button
                  className="rounded-2xl view-btns bg-[#e0e6eb] hover:text-[blue] w-[70px] justify-center  flex gap-[5px] items-center p-[6px] text-[14px] text-[#8c939f]"
                  type="submit"
                >
                  25 Sep
                </button>
              </div>
              <div className="flex items-center justify-between mt-[20px] mb-[20px]">
                <p className="text-[14px] text-[#8c939f]">
                  karan 33 created a task
                </p>
                <p className="text-[14px] text-[#8c939f]">11:59</p>
              </div>
              <div className="relative">
                <div>
                  {/* Hidden file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }} // Hide the input element
                  />
                  {/* Button to open the file input dialog */}
                  <button
                    className="absolute top-[10px] left-[10px]"
                    type="button"
                    onClick={handleUploadClick}
                  >
                    <AttachFileIcon className="text-[#8c939f]" />
                  </button>
                </div>

                <input
                  className="bg-[#fff] border pr-[38px] border-text-[#e0e6eb] focus-visible:outline-none p-[10px] pl-[34px] w-[100%] rounded-md"
                  type="text"
                />
                <ArrowForwardIosIcon className="absolute bg-[#27004a] cursor-pointer text-[white] rounded-2xl p-[3px] right-[10px] top-[10px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientTaskview;
