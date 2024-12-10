import React from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import fetchClient from "../utils/fetchClient";
import {toast} from "react-toastify";

const LoginForm: React.FC = () => {
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(3, "Username must be at least 3 characters")
                .max(20, "Username cannot exceed 20 characters")
                .required("Username is required"),
            password: Yup.string().required("Password is required"),
        }),
        onSubmit: async (values) => {
            try {
                const response = await fetchClient.post("/api/user/login", values);

                console.log("login response ", response);
                if (response) {
                    // const data = await response.data();
                    sessionStorage.setItem("authToken", response?.data?.token);
                    toast.success("Login successful!");
                    window.location.href = "/";
                } else {
                    toast.error("Invalid credentials!");
                }
            } catch (error) {
                console.error("Error:", error);
                console.error("Error:", error?.response?.data?.message);
                toast.error(error?.response?.data?.message || "An error occurred during login");
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
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
            <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                Login
            </button>
        </form>
    );
};

export default LoginForm;
