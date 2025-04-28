import { SidebarMenu } from "../fragments/SidebarMenu";
import { AudienceTable, ResearchPartnerTable } from "../fragments/DataTable";
import { HeaderDashboard } from "../fragments/HeaderDashboard";
import { TableToolbar } from "../fragments/TableToolbar";
import { useLocation } from "react-router-dom";
import { SearchIcon, ListFilter, Plus } from "lucide-react";

export const DashboardLayout = ({}) => {
  const location = useLocation();
  const dashboardTitle = location.state?.title || "Dashboard";
  const mainTitle = "Daftar Riset Potensial Mitra";

  return (
    <div className="flex">
      <SidebarMenu />
      <main className="ml-64 w-full min-h-screen py-4 px-8 transition-all">
        {/* Main content harus nge-refer dari ROLE USER & SIDEBAR */}
        <HeaderDashboard title={dashboardTitle} />
        <h1 className="text-[#1f1f1f] text-3xl font-semibold mb-8">
          {mainTitle}
          {/*Menu ini harus sesuai dengan menu yang aktif di sidebar*/}
        </h1>
        <div className="">
          <TableToolbar />
          {/* Table sudah sejajar dengan button */}
          <ResearchPartnerTable />
        </div>
      </main>
    </div>
  );
};
