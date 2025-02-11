import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axios/Axios";
import toast from "react-hot-toast";

export default function EditUser({ onClose, editId }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!editId) return; 

    const handleFetchAuser = async () => {
      const id = editId
      try {
        const response = await axiosInstance.get(`/users/${id}`);
        const userData = response.data;          
        if (userData) {
          setName(userData.name);  
          setEmail(userData.email); 
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error(error.res?.data?.message);
      }
    };

    handleFetchAuser();
    
  }, [editId]); 

  const handleEdit = async () => {
    try {
      await axiosInstance.put(`/users/${editId}`, { name, email });
      toast.success("User edited");
      onClose();
    } catch (error) {
      toast.error(error.res?.data?.message);
      console.error("Error updating user:", error);
    }
  };

  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md w-1/3">
        <h2 className="text-lg font-semibold pb-2">Edit User</h2>

        <div className="w-full max-w-sm min-w-[200px] flex flex-col gap-4">
          <input
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex gap-3">
          <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
            Close
          </button>
          <button onClick={handleEdit} className="mt-4 bg-blue-400 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
