import React, { useEffect, useState } from "react";
import EditTask from "./edit/EditTask";
import CreateTask from "./create/createTask";
import axiosInstance from "../../axios/Axios";
import toast from "react-hot-toast";

export default function Tasks() {
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/tasks`);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error(error.res?.data?.message);
      }
    };

    fetchData();
  }, [tasks]);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/tasks/${id}`);
      toast.success("Task deleted");
      setTasks((prev) => prev.filter((task) => task._id !== id)); 
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error(error.res?.data?.message);

    }
  };

  return (
    <div className="p-6 w-full">
      <div className="relative flex flex-col w-full h-screen text-slate-700 bg-white shadow-md rounded-xl">
        <div className="relative mx-4 mt-4 text-slate-700 bg-white rounded-none">
          <div className="flex items-center justify-between">
            <div></div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                onClick={() => setCreate(true)}
                className="flex items-center gap-2 rounded bg-slate-800 py-2.5 px-4 text-xs font-semibold text-white shadow-md hover:shadow-lg"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>

        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Todo Tasks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tasks
              .map((task) => (
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
                  <div className="flex gap-5 mt-4">
                    <button
                      onClick={() => {
                        setEditId(task._id);
                        setEdit(true);
                      }}
                      className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                    <button
                    >
                      { task.status}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {edit && <EditTask editId={editId} onClose={() => setEdit(false)} />}
      {create && <CreateTask onClose={() => setCreate(false)} />}
    </div>
  );
}
