import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
    return (
        <div>
            <Navbar />
            <main style={{ padding: "2rem", minHeight: "80vh" }}>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;