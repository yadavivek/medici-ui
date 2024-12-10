import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    const logout = () => {
        sessionStorage.removeItem("authToken");
        window.location.href = "/login";
    };
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const token = sessionStorage.getItem("authToken");
        setIsLoggedIn(!!token); // Set true if token exists
    }, []);
    console.log("isLoggedIn ", isLoggedIn);

    return (
        <nav className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between">
                <div>
                    <Link to="/" className="text-xl font-bold">Medici App</Link>
                </div>
                <div>
                    <Link to="/register" className="mr-4">Register</Link>
                    <button
                        // className={`mr-4 px-4 py-2 rounded ${isLoggedIn ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}
                        className={`mr-4 px-4 py-2 rounded bg-green-500 hover:bg-green-600 ${isLoggedIn && "hidden"}`}
                        hidden={isLoggedIn}
                    >
                        <Link to="/login" className={isLoggedIn ? "pointer-events-none" : ""}>
                            Login
                        </Link>
                    </button>
                    <button
                        onClick={logout}
                        className={`bg-red-500 px-4 py-2 rounded hover:bg-red-600 ${!isLoggedIn && "hidden"}`}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
