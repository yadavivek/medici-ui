import React, { useEffect, useState } from "react";
import fetchClient from "../utils/fetchClient";
import {Link} from "react-router-dom";

interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
}

const UserTable: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetchClient.get("/api/user");
                console.log("user response ", response.data)
                setUsers(response?.data);
            } catch (error) {
                console.error("Error fetching users:", error);
                console.error("Error fetching users:", error?.response?.data?.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const deleteUser = async (id: string) => {
        try {
            await fetchClient.delete(`/api/user/${id}`);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    if (loading) return <p>Loading users...</p>;

    return (
        <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
            <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => (
                <tr key={user.id}>
                    <td className="border border-gray-300 px-4 py-2">{`${user.firstName} ${user.lastName}`}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                    <td className="border border-gray-300 px-4 py-2 flex space-x-4">
                        <button
                            onClick={() => deleteUser(user.id)}
                            className="bg-red-600 text-white px-4 py-2 rounded"
                        >
                            Delete
                        </button>
                        <Link
                            to={`/users/${user.id}/edit`}
                        >
                            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Edit</button>
                        </Link>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default UserTable;
