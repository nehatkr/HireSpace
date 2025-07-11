import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignIn,
  useUser,
} from "@clerk/clerk-react";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);

  const [search, setSearch] = useSearchParams();
  const { user } = useUser();

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };
  return (
    <>
    <nav className="py-4 flex justify-between items-center fade-in sticky top-0 z-50 glass-effect rounded-xl mb-4">
      <Link>
        <img src="/logo.png" className="h-20 transition-transform duration-300 hover:scale-105" />
      </Link>

      <div className="flex gap-8">
        <SignedOut>
          <Button variant="outline" onClick={()=>setShowSignIn(true)} className="hover-lift group relative overflow-hidden">
            <span className="relative z-10">Login</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left opacity-20"></div>
          </Button>
        </SignedOut>
        <SignedIn>
          {user?.unsafeMetadata?.role === "recruiter" && (
            <Link to="/post-job">
          <Button variant="destructive" className="rounded-full hover-lift group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            <span className="relative z-10 flex items-center">
            <PenBox size={20} className="mr-2" />
            Post a job
            </span>
          </Button>
          </Link>
        )}
          <UserButton
           appearance={{
            elements: {
              avatarBox: "w-10 h-10 transition-transform duration-300 hover:scale-110",
            },
          }}
        >
          <UserButton.MenuItems>
            <UserButton.Link
              label="My Jobs"
              labelIcon={<BriefcaseBusiness size={15} />}
              href="/my-jobs"
            />
            <UserButton.Link
              label="Saved Jobs"
              labelIcon={<Heart size={15} />}
              href="/saved-job"
            />
            <UserButton.Action label="manageAccount" />
          </UserButton.MenuItems>

          </UserButton>
        </SignedIn>
      </div>
    </nav>
    {showSignIn && (
     <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 fade-in"
    onClick={handleOverlayClick}
      >
      <div className="scale-in">
      <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
      </div>
      </div>
      )}
</>
  );
};

export default Header;
