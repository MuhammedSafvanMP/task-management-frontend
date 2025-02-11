import React, { useEffect, useState } from "react";
import EditUser from "./edit/EditUser";
import CreateUser from "./create/CreateUser";
import axiosInstance from "../../axios/Axios";
import toast from "react-hot-toast";

export default function Users() {
    const [edit, setEdit] = useState(false);
    const [create, setCreate] = useState(false);
    const [userData, setUserData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [editId, setEditId] = useState(null)
    const limit = 5; 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(
                    `/users?page=${currentPage}&limit=${limit}`
                );
                setUserData(response.data.users);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("Error fetching users:", error);
                toast.error(error.res?.data?.message);

            }
        };
        fetchData();
    }, [currentPage, userData]); 


    const  handleDelete = async (id) => {        
        try {
            const response = await axiosInstance.delete(
                `/users/${id}`
            );
            toast.success("User deleted");
        } catch (error) {
            console.error("Error fetching users:", error);

        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    return (
        <div className="p-6 w-full">
            <div className="relative flex flex-col w-full h-[100vh] text-slate-700 bg-white shadow-md rounded-xl">
                <div className="relative mx-4 mt-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-slate-800">Users List</h3>
                        <button
                            onClick={() => setCreate(true)}
                            className="cursor-pointer flex items-center gap-2 rounded bg-slate-800 py-2.5 px-4 text-xs font-semibold text-white shadow-md transition-all hover:shadow-lg"
                            type="button"
                        >
                            Add User
                        </button>
                    </div>
                </div>

                <div className="p-0">
                    <table className="w-full mt-4 text-left table-auto min-w-max">
                        <thead>
                            <tr>
                                <th className="p-4 border-y border-slate-200 bg-slate-50">User</th>
                                <th className="p-4 border-y border-slate-200 bg-slate-50">Email</th>
                                <th className="p-4 border-y border-slate-200 bg-slate-50">Edit</th>
                                <th className="p-4 border-y border-slate-200 bg-slate-50">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.map((user) => (
                                <tr key={user._id}>
                                    <td className="p-4 border-b border-slate-200">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
                                                alt={user.name}
                                                className="h-9 w-9 rounded-full object-cover"
                                            />
                                            <div>
                                                <p className="text-sm font-semibold">{user.name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 border-b border-slate-200">{user.email}</td>
                                    <td className="p-4 border-b border-slate-200">
                                        <button
                                            onClick={() => {
                                                setEditId(user._id);
                                                setEdit(true);
                                            }}
                                            className="cursor-pointer px-2 py-1 text-xs font-bold text-white uppercase bg-blue-400 rounded-md"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                    <td className="p-4 border-b border-slate-200">
                                        <button onClick={() => handleDelete(user._id)} className="cursor-pointer px-2 py-1 text-xs font-bold text-white uppercase bg-red-700 rounded-md">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center justify-between p-3">
                    <p className="text-sm text-slate-500">
                        Page {currentPage} of {totalPages}
                    </p>
                    <div className="flex gap-1">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className={`rounded border border-slate-300 py-2.5 px-3 text-xs font-semibold ${
                                currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-slate-600"
                            }`}
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className={`rounded border border-slate-300 py-2.5 px-3 text-xs font-semibold ${
                                currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-slate-600"
                            }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Show EditUser component when edit is true */}
            {edit && <EditUser editId = {editId} onClose={() => setEdit(false)} />}
            {create && <CreateUser onClose={() => setCreate(false)} />}
        </div>
    );
}
