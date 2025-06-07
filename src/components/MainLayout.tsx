import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
