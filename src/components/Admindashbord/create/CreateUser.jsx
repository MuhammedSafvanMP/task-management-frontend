import React, { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../../axios/Axios";

export default function CreateUser({ onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    try {
      await axiosInstance.post(`/users`, { name, email });
      toast.success('User created');
      onClose();  
    } catch (error) {
      console.log(error);
      toast.error(error.res?.data?.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md w-1/3">
        <h2 className="text-lg font-semibold pb-2">Create new User</h2>

        <div className="w-full max-w-sm min-w-[200px] flex flex-col gap-4">
          <input
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />




        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-400 text-white px-4 py-2 rounded cursor-pointer"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

