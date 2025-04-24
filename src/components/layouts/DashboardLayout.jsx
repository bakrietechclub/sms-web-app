import { SidebarMenu } from "../fragments/SidebarMenu";
import { DataTable } from "../fragments/DataTable";
import { HeaderDashboard } from "../fragments/HeaderDashboard";

import { SearchIcon, ListFilter, Plus } from "lucide-react";

export const DashboardLayout = ({}) => {
  return (
    <div className="flex">
      <SidebarMenu />
      <main className="ml-64 w-full min-h-screen py-4 px-8 transition-all">
        {/* Main content harus nge-refer dari ROLE USER & SIDEBAR */}
        <HeaderDashboard title="Universitas, Lembaga (NGO) & Komunitas" />
        <h1 className="text-[#1f1f1f] text-3xl font-semibold mb-8">
          Daftar Riset Potensial Mitra
          {/*Menu ini harus sesuai dengan menu yang aktif di sidebar*/}
        </h1>
        <div className="flex items-center justify-end gap-4 mb-3">
          <div className="relative w-1/4">
            <input
              type="text"
              placeholder="Cari..."
              className="w-full p-2 pl-10 border border-gray-300 rounded-md mb-4"
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-4.5 w-5 h-5 text-gray-400" />
          </div>
          <button className="flex gap-3 items-center border border-[#CCCCCC] text-[#999999] hover:bg-[#E6E6E6] px-4 py-2 rounded-md mb-4 ml-2 ease-in-out duration-300 cursor-pointer">
            <ListFilter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex gap-3 items-center bg-[#0D4690] text-[#FFFFFF] px-4 py-2 rounded-md mb-4 ml-2 cursor-pointer hover:bg-[#0C3F82] ease-in-out duration-300">
            <Plus className="w-4 h-4" />
            Tambah
          </button>
        </div>
        <div className="">
          {/* Table sudah sejajar dengan button */}
          <DataTable />
        </div>
      </main>
    </div>
  );
};
