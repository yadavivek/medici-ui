import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";
import fetchClient from "../utils/fetchClient";

const UpdateUserForm: React.FC = () => {
    const {id} = useParams<{ id: string }>(); // Get user ID from route params
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const formik = useFormik({
        initialValues: {
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            // name: Yup.string().required("Name is required"),
            email: Yup.string().email("Invalid email address").required("Email is required"),
        }),
        onSubmit: async (values) => {
            try {
                console.log("Updating record")
                await fetchClient.put(`/api/user/${id}`, values); // Update user API call
                toast.success("User updated successfully!");
                navigate("/"); // Redirect to another page after successful update
            } catch (error) {
                console.error("Error updating user:", error);
                console.error("Error updating user:", error?.response?.data?.errors);
                toast.error(JSON.stringify(error?.response?.data?.errors) || "Failed to update user. Please try again.");
            }
        },
    });

    console.log("Formik errors:", formik.errors);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetchClient.get(`api/user/${id}`); // Fetch user details
                await formik.setValues({
                    username: response.data.username,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                    password: response.data.password,
                });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user details:", error);
                toast.error("Failed to load user details.");
                navigate("/"); // Redirect if user details cannot be loaded
            }
        };

        fetchUser();
    }, [id, navigate]);

    if (loading) return <p>Loading user details...</p>;

    return (
        <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Update User</h2>
            <div className="mb-4">
                <label className="block text-gray-700">username</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    className="border rounded p-2 w-full"
                />
                {formik.errors.username && formik.touched.username && (
                    <div className="text-red-500">{formik.errors.username}</div>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">First Name</label>
                <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                    className="border rounded p-2 w-full"
                />
                {formik.errors.firstName && formik.touched.firstName && (
                    <div className="text-red-500">{formik.errors.firstName}</div>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Last Name</label>
                <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    className="border rounded p-2 w-full"
                />
                {formik.errors.lastName && formik.touched.lastName && (
                    <div className="text-red-500">{formik.errors.lastName}</div>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    className="border rounded p-2 w-full"
                />
                {formik.errors.email && formik.touched.email && (
                    <div className="text-red-500">{formik.errors.email}</div>
                )}
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Update
            </button>
        </form>
    );
};

export default UpdateUserForm;
