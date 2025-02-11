import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRotute from './utils/PrivateRotute';
import RoleBasedRoute from './utils/RoleBasedRoute';
import UserDashboard from './pages/UserDashboard';
import UserTasks from './components/userDashBoard/UseTasks';
import DashBordStatus from './components/Admindashbord/DashBordStatus';
import Users from './components/Admindashbord/Users';
import Tasks from './components/Admindashbord/Tasks';

export default function App() {
  return (
    <Routes>
      <Route  path='/'  element = {<Navigate to={'/admin-dashboard'} />} />
      <Route path='/login' element = { < Login /> } />
      <Route  path='/admin-dashboard' element = {
        <PrivateRotute >
          <RoleBasedRoute requiredRole={['admin']}>
         < AdminDashboard /> 
          </RoleBasedRoute>
        </PrivateRotute>
         } > 
           <Route index element = {<DashBordStatus />} />
           <Route path='/admin-dashboard/users' element = {<Users />} />
           <Route path='/admin-dashboard/tasks' element = {<Tasks />} />

         </Route>
      <Route  path='/user-dashboard' element = {   <UserDashboard /> } > 
           <Route path='/user-dashboard/tasks' element = {<UserTasks />} />
      </Route>
    </Routes>
  )
}
