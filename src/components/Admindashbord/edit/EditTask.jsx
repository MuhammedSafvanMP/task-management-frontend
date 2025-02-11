import React, { useState, useEffect } from "react";
import axiosInstance from "../../../axios/Axios";
import toast from "react-hot-toast";

export default function EditTask({ onClose, editId }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [userIds, setUserIds] = useState([]); 
  const [userData, setUserData] = useState([]); 
  
  const id = editId;
  useEffect(() => {


    if (!editId) return; 

    const handleFetchAuser = async () => {
      try {
        const response = await axiosInstance.get(`/tasks/${id}`);
        const taskData = response.data;          
        if (userData) {
          setTitle(taskData.title);  
          setText(taskData.text); 
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error(error.res?.data?.message);
      }
    };

    handleFetchAuser();

    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/users`);
        setUserData(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error(error.res?.data?.message);
      }
    };
    fetchData();
  }, []);

  const handleCheckboxChange = (id) => {
    setUserIds((prevUserIds) =>
      prevUserIds.includes(id)
        ? prevUserIds.filter((userId) => userId !== id) // Remove if already selected
        : [...prevUserIds, id] // Add if not selected
    );
  };

  const handleSubmit = async () => {
    try {
      await axiosInstance.put(`/tasks/${id}`, {
        title,
        text,
        userIds,
      });
      toast.success("Task edited");
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(error.res?.data?.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md w-1/3">
        <h2 className="text-lg font-semibold pb-2">Create New User</h2>

        <div className="w-full max-w-sm flex flex-col gap-4">
          <input
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2"
            placeholder="Content"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* Assign Users Section */}
          <div className="border p-3 rounded-md">
            <h3 className="text-sm font-medium text-gray-700">Assign to:</h3>
            <div className="mt-2 max-h-40 overflow-y-auto">
              {userData.map((user) => (
                <label key={user._id} className="flex items-center gap-2 py-1">
                  <input
                    type="checkbox"
                    checked={userIds.includes(user._id)}
                    onChange={() => handleCheckboxChange(user._id)}
                    className="w-4 h-4 text-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{user?.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

