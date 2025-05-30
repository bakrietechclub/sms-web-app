import { SidebarMenu } from "../fragments/SidebarMenu";
import { HeaderDashboard } from "../fragments/HeaderDashboard";
import { useLocation, Outlet, Link } from "react-router-dom";

export const DashboardLayout = ({}) => {
  const location = useLocation();
  const dashboardTitle = location.state?.title || "Dashboard";

  return (
    <div className="flex">
      <SidebarMenu />
      <main className="ml-64 flex-1 min-h-screen py-4 px-8 transition-all overflow-x-hidden">
        <HeaderDashboard title={dashboardTitle} />
        <Outlet />
      </main>
    </div>
  );
};
