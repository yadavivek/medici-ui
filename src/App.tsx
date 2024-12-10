import React from "react";
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Dashboard from "./pages/Dashboard";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
import UpdateUserForm from "./components/UpdateUserForm";

const App: React.FC = () => {
    return (
        <>
            <ToastContainer
                position="top-right" // Default position
                autoClose={3000} // Default auto close time in ms
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Navbar />
            <div className="container mx-auto p-4">
                <Routes>
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/users/:id/edit" element={<UpdateUserForm />}/>
                </Routes>
            </div>
            <Footer />
        </>
    );
};

export default App;
