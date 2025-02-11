import React from 'react'
import { Outlet } from 'react-router-dom'
import { AdminSidebar } from '../components/Admindashbord/AdminSidebar'

export default function AdminDashboard() {
  return (
    <div className='flex '>
      <AdminSidebar />
      <Outlet />
     </div>
  )
}
