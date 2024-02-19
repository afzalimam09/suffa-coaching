import { Outlet } from "react-router-dom";
import Navbar from "../components/_public/Navbar";
import Footer from "../components/_public/Footer";

const PublicLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default PublicLayout;
