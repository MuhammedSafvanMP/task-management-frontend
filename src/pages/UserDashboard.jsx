import React from 'react'
import UserSidebar from '../components/userDashBoard/UserSidebar'
import { Outlet } from 'react-router-dom'

export default function UserDashboard() {
  return (
    <div className='flex'>
        <UserSidebar />
        <Outlet />
    </div>
  )
}
