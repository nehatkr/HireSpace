import Header from "@/components/header";
import { Outlet } from "react-router-dom";


const AppLayout = () => {
  return(
     <div>
    <div className="grid-background"></div>
    <main className="min-h-screen container">
    <Header />
    <Outlet />
    </main>
    <div className="p-6 text-center bg-gray-800 mt-10 absolute left-0 right-0 " >Copywrite &copy; 2025 HireSpace</div>
    </div>
  );
};

export default AppLayout;
