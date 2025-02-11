import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import axiosInstance from "../../axios/Axios";
import toast from "react-hot-toast";

export default function UserTasks() {
  const [tasks, setTasks] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});
  const { user } = useAuth();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/tasks/users/${user._id}`);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error(error.res?.data?.message);
      }
    };

    fetchData();
  }, [user?._id]);

  const statusOptions = ["todo", "accept", "pending", "completed"];

  const handleChange = (id, newStatus) => {
    setSelectedStatus((prev) => ({
      ...prev,
      [id]: newStatus,
    }));
  };

  const handleSubmit = async (id) => {
    try {
      await axiosInstance.put(`/tasks/${id}`, { status: selectedStatus[id] || "todo" });
      toast.success("Status updated")
      setTasks(tasks.map(task => 
        task._id === id ? { ...task, status: selectedStatus[id] } : task
      ));

      setSelectedStatus((prev) => ({
        ...prev,
        [id]: "",
      }));
    } catch (error) {
      toast.error(error.res?.data?.message);
      console.log(error);
    }
  };

  return (
    <div className="p-6 w-full">
      <div className="relative flex flex-col w-full h-screen text-slate-700 bg-white shadow-md rounded-xl">
        <div className="relative mx-4 mt-4 text-slate-700 bg-white rounded-none">
          <div className="flex items-center justify-between"></div>
        </div>

        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">My Tasks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition-all"
              >
                <h3 className="text-sm text-gray-500 flex justify-between">
                  <span>{new Date(task.createdAt).toLocaleString()}</span>
                  <span>{task.userIds[0]?.name}</span>
                </h3>
                <h5 className="text-lg font-semibold text-gray-900 mt-2">
                  {task.title}
                </h5>
                <p className="text-sm text-gray-600">{task.text}</p>
                <div className="flex gap-3 mt-4 items-center">
                  <select
                    value={selectedStatus[task._id] || task.status}
                    onChange={(e) => handleChange(task._id, e.target.value)}
                    className="px-2 py-1 border rounded-md"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => handleSubmit(task._id)}
                    className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </div>
                <p className="text-sm text-gray-700 mt-2">Current Status: {task.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
