import React from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import fetchClient from "../utils/fetchClient";
import {toast} from "react-toastify";

const RegisterForm: React.FC = () => {
    const formik = useFormik({
        initialValues: {
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(3, "Username must be at least 3 characters")
                .max(20, "Username cannot exceed 20 characters")
                .required("Username is required"),
            firstName: Yup.string()
                .min(3, "Username must be at least 3 characters")
                .max(20, "Username cannot exceed 20 characters")
                .required("Username is required"),
            email: Yup.string().email("Invalid email").required("Email is required"),
            password: Yup.string()
                .min(8, "Password must be at least 8 characters")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    "Password must contain an uppercase letter, a lowercase letter, a number, and a special character"
                )
                .required("Password is required"),
            confirmPassword: Yup.string()
                .min(8, "Password must be at least 8 characters")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    "Password must contain an uppercase letter, a lowercase letter, a number, and a special character"
                )
                .required("Confirm Password is required"),
        }),
        onSubmit: async (values) => {
            try {
                if(values.password != values.confirmPassword) {
                    toast.error("Password must match with confirm password");
                    return;
                }
                const response = await fetchClient.post("/api/user", values);

                if (response) {
                    toast.success("User registered successfully!");
                    window.location.href = "/login";
                } else {
                    toast.error("Registration failed");
                }
            } catch (error) {
                // console.error("Error:", error);
                // console.error("Error:", error.response?.data?.errors);
                toast.error(error.response?.data?.errors || "Failed to register the user. Please try again.");
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
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
                    type="firstName"
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
                    type="lastName"
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
            <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    className="border rounded p-2 w-full"
                />
                {formik.errors.password && formik.touched.password && (
                    <div className="text-red-500">{formik.errors.password}</div>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Confirm Password</label>
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    className="border rounded p-2 w-full"
                />
                {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                    <div className="text-red-500">{formik.errors.confirmPassword}</div>
                )}
            </div>
            <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                Register
            </button>
        </form>
    );
};

export default RegisterForm;
