import React from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-4">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Layout;