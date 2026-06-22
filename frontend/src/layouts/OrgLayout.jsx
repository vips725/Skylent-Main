import { Outlet } from "react-router-dom";
import OrganizationSidebar from "../components/OrganizationSidebar";

const OrgLayout = () => {
  return (
    <div className="min-h-screen w-full bg-stone-50 grid grid-cols-[220px_1fr] gap-4 p-4">
      <div className="h-full sticky top-4"><OrganizationSidebar /></div>
      <div className="min-h-full overflow-auto"><Outlet /></div>
    </div>
  );
};

export default OrgLayout;