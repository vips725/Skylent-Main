import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen w-full bg-stone-50 grid grid-cols-[220px_1fr] gap-4 p-4">
      
      {/* Sidebar */}
      <div className="h-full sticky top-4">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="min-h-full">
        <Outlet />
      </div>

    </div>
  );
};

export default AdminLayout;