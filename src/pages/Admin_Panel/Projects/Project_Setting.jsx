import React from "react";

const Project_Setting = ({closeform}) => {
  const permissions = [
    { id: 1, label: "Allow customer to view tasks" },
    { id: 2, label: "Allow customer to create tasks" },
    {
      id: 3,
      label: "Allow customer to edit tasks (only tasks created from contact)",
    },
    { id: 4, label: "Allow customer to comment on project tasks" },
    { id: 5, label: "Allow customer to view task comments" },
    { id: 6, label: "Allow customer to view task attachments" },
    { id: 7, label: "Allow customer to view task checklist items" },
    { id: 8, label: "Allow customer to upload attachments on tasks" },
    { id: 9, label: "Allow customer to view task total logged time" },
    { id: 10, label: "Allow customer to view finance overview" },
    { id: 11, label: "Allow customer to open discussions" },
    { id: 12, label: "Allow customer to view milestones" },
    { id: 13, label: "Allow customer to view Gantt" },
    { id: 14, label: "Allow customer to view timesheets" },
    { id: 15, label: "Allow customer to view activity log" },
    { id: 16, label: "Allow customer to view team members" },
    { id: 17, label: "Hide project tasks on main tasks table (admin area)" },
  ];
  return (
    <div className="m-0 xl:m-5 lg:5  ">
      <div className="space-y-4">
        <div className="space-y-2">
          <h1>* Send contacts notifications</h1>
          <select className="h-[46px] w-[100%] bg-white border text-[13px] border-[#DBDCDE] rounded-md pl-5">
            <option value="">
              To all contacts with notifications for projects enabled
            </option>
          </select>
        </div>

        <div className="space-y-2">
          <h1>Visible Tabs</h1>
          <select className="h-[46px] w-[100%] bg-white border text-[13px] border-[#DBDCDE] rounded-md pl-5">
            <option value="">
              Tasks, Timesheets, Milestones, Files, Discussions, Gantt, TIckets,
              Notes, Activity
            </option>
          </select>
        </div>
      </div>

      <div className=" mt-6  border-t border-b border-[#B1B1B1]">
        {permissions.map((permission, index) => (
          <div key={permission.id}>
            <div className="space-x-2 py-3">
              <input className="bg-[#511992]" type="checkbox" />
              <span
                className="text-[14px] "
                style={{ fontSize: permission.fontSize }}
              >
                {permission.label}
              </span>
            </div>

            {/* Render hr element only between items */}
            {index < permissions.length - 1 && (
              <hr className="text-[#B1B1B1]" />
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-5 py-10">
        <button onClick={closeform} className="bg-white text-[#27004a] border border-[#27004a] h-10 w-20 rounded-md">
          Cancel
        </button>
        <button className="allcrm-btn">
          Save
        </button>
      </div>
    </div>
  );
};

export default Project_Setting;