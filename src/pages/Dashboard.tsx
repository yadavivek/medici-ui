import React from "react";
import UserTable from "../components/UserTable";

const Dashboard: React.FC = () => {
    console.log("here");
    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>
            <UserTable />
        </div>
    );
};

export default Dashboard;
