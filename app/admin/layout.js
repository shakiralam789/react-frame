"use client";
import React, { useState } from "react";
import Header from "./partial/Header";
import SidebarMenu from "./partial/SidebarMenu/SidebarMenu";
import PrivateLayout from "@/components/PrivateLayout";

const sidebarMenu = [
  { title: "Dashboard", icon: "dashboard", link: "/admin/dashboard" },
  {
    title: "Users",
    icon: "users",
    link: "/admin/users",
  },
  { title: "Components", icon: "components", link: "/admin/components" },
];

export default function Layout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <div className="flex h-screen bg-gray-light">
      <SidebarMenu
        menuItems={sidebarMenu}
        isCollapsed={isCollapsed}
        toggleCollapse={toggleCollapse}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 2xl:p-8">
          {/* <PrivateLayout> */}
          {children}
          {/* </PrivateLayout> */}
        </main>
      </div>
    </div>
  );
}
