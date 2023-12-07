import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isPopupMenuVisible, setPopupMenuVisible] = useState(false);

  const toggleMenu = () => {
    setPopupMenuVisible(!isPopupMenuVisible);
  };

  const signIn = () => {
    // Add your sign-in logic here
    router.push("signup");
  };
  const home = () => {
    // Add your sign-in logic here
    router.push("/");
  };

  return (
    <>
      <div className="navbar bg-white flex items-center justify-between relative">
        <div className="flex-1 px-3">
          <a className="text-green-950 text-xl" onClick={home}>
            Voktar Odhikar
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>Sign In</summary>
                <ul className="p-2 bg-base-100 rounded-t-none z-10">
                  <li>
                    <a onClick={signIn}>Sign Up</a>
                  </li>
                  <li>
                    <a>Sign In</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
