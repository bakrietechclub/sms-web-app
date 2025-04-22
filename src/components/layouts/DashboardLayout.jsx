import SidebarMenu from "../fragments/SidebarMenu";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      <SidebarMenu />
      <main className="ml-64 w-full min-h-screen bg-gray-50 p-8 transition-all">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
