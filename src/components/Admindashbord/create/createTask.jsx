import React, { useState, useEffect } from "react";
import axiosInstance from "../../../axios/Axios";
import toast from "react-hot-toast";

export default function CreateTask({ onClose }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [userIds, setUserIds] = useState([]); 
  const [userData, setUserData] = useState([]); 

  useEffect(() => {
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
        ? prevUserIds.filter((userId) => userId !== id) 
        : [...prevUserIds, id] 
    );
  };

  const handleSubmit = async () => {
    try {
      await axiosInstance.post(`/tasks`, {
        title,
        text,
        userIds,
      });
      toast.success("Task Created");
      onClose();
    } catch (error) {
      toast.error(error);
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
                  <span className="text-sm text-gray-700">{user.name}</span>
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
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

