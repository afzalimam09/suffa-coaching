import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/_admin/Header";
import "./admin.css";

const AdminLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

export default AdminLayout;
