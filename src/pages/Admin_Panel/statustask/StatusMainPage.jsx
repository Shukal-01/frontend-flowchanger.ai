import React from 'react'
import Edit_Task_Status from '../../../pages/Admin_Panel/Projects/Edit_Task_Status'
import TaskType from './TaskType'
import ProjectStatus from './ProjectStatus'
import ProjectType from './ProjectType'
import ProjectPriority from './ProjectPriority'
import TaskPriority from './TaskPriority'

const StatusMainPage = () => {
  return (
    <div>
        <Edit_Task_Status />
        <TaskPriority/>
        <ProjectStatus />
        <ProjectPriority />
        {/* <ProjectType /> */}
        {/* <TaskType /> */}
    </div>
  )
}

export default StatusMainPage