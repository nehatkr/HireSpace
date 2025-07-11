import Header from "@/components/header";
import { Outlet } from "react-router-dom";


const AppLayout = () => {
  return(
     <div className="relative">
    <div className="grid-background"></div>
    <main className="min-h-screen container relative z-10">
    <Header />
    <Outlet />
    </main>
    <footer className="p-6 text-center glass-effect mt-10 relative z-10 border-t border-white/20">
      <p className="text-gray-400 transition-colors duration-300 hover:text-white">
        Copyright &copy; 2025 HireSpace - Built with ❤️
      </p>
    </footer>
    </div>
  );
};

export default AppLayout;
