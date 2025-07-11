import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const navigateUser = (currRole) => {
    navigate(currRole === "recruiter" ? "/post-job" : "/jobs");
  };

  const handleRoleSelection = async (role) => {
    await user
      .update({ unsafeMetadata: { role } })
      .then(() => {
        console.log(`Role updated to: ${role}`);
        navigateUser(role);
      })
      .catch((err) => {
        console.error("Error updating role:", err);
      });
  };

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigateUser(user.unsafeMetadata.role);
    }
  }, [user]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-32 fade-in">
      <h2 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter slide-up animate-pulse-slow">
        I am a...
      </h2>
      <div className="mt-16 grid grid-cols-2 gap-6 w-full md:px-40 slide-up stagger-1">
        <Button
          variant="blue"
          className="h-36 text-2xl hover-lift group relative overflow-hidden glass-effect border-0"
          onClick={() => handleRoleSelection("candidate")}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 transform scale-0 group-hover:scale-100 transition-transform duration-500 rounded-lg"></div>
          <span className="relative z-10 font-semibold">
          Candidate
          </span>
        </Button>
        <Button
          variant="destructive"
          className="h-36 text-2xl hover-lift group relative overflow-hidden glass-effect border-0"
          onClick={() => handleRoleSelection("recruiter")}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-pink-500 transform scale-0 group-hover:scale-100 transition-transform duration-500 rounded-lg"></div>
          <span className="relative z-10 font-semibold">
          Recruiter
          </span>
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;