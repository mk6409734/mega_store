import React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";

export const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      {/* <MobileSidebar
        isCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
      /> */}

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};
