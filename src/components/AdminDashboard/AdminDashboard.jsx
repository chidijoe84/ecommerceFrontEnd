import React ,{useState} from 'react'
import "./AdminDashboard.css"
import Navbar from './navbar/Navbar'
import Sidebar from './sidebar/Sidebar'
import Main from './main/Main'
import { Outlet } from 'react-router-dom'


const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const openSidebar = () => {
    setSidebarOpen(true)
  }
  const closeSidebar = () => {
    setSidebarOpen(false)
  }
  return (
    <div className='dashboardContainer'>
      <Navbar  sidebarOpen={sidebarOpen} openSidebar={openSidebar}/>
        <Outlet />
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar}/>
    </div>
  )
}

export default AdminDashboard