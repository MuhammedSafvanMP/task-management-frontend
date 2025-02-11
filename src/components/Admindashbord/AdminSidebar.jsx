import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
 
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";
import { FaTasks } from "react-icons/fa";
import { useAuth } from "../../context/authContext";


 
export function AdminSidebar() {

  const { logout } = useAuth();

  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 flex items-center gap-4 p-4">
        <img src="https://docs.material-tailwind.com/img/logo-ct-dark.png" alt="brand" className="h-8 w-8" />
        <Typography variant="h5" color="blue-gray">
          Dashboard
        </Typography>
      </div>
      <List>
    
        <hr className="my-2 border-blue-gray-50" />
        <NavLink to={'/'}>
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
           Dashboard
          <ListItemSuffix>
          </ListItemSuffix>
        </ListItem>
        </NavLink>

        <NavLink to={'/admin-dashboard/users'}>

        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
            Users
        </ListItem>
        </NavLink>

        <NavLink to={'/admin-dashboard/tasks'}>
        <ListItem>
          <ListItemPrefix>
            <FaTasks className="h-5 w-5" />
          </ListItemPrefix>
            Tasks
        </ListItem>
        </NavLink>

        <ListItem className="cursor-pointer">
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem onClick={logout} className="cursor-pointer">
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
   
    </Card>
  );
}
