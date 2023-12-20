import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/pages/utils/authcontext";
export default function DisNavbar() {
  const router = useRouter();
  const [isPopupMenuVisible, setPopupMenuVisible] = useState(false);
  const { logout } = useAuth();

  const toggleMenu = () => {
    setPopupMenuVisible(!isPopupMenuVisible);
  };

  const signUp = () => {
    // Add your sign-in logic here
    router.push("signup");
  };
  const signIn = () => {
    // Add your sign-in logic here
    router.push("signin");
  };
  const home = () => {
    // Add your sign-in logic here
    router.push("/");
  };
  const signout = () => {
    logout();
  };

  return (
    <>
      <div className="navbar bg-white flex items-center justify-between relative">
        <div className="flex-1 px-3">
          <a className="text-green-950 text-xl" onClick={home}>
            Voktar Odhikar
          </a>
        </div>
        <div className="navbar-end">
          <a className="btn" onClick={signout}>
            Logout
          </a>
        </div>
      </div>
    </>
  );
}
