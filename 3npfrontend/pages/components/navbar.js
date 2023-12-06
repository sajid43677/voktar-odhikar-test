import React, { useState } from "react";

export default function Navbar() {
  const [isPopupMenuVisible, setPopupMenuVisible] = useState(false);

  const toggleMenu = () => {
    setPopupMenuVisible(!isPopupMenuVisible);
  };

  const signIn = () => {
    // Add your sign-in logic here
    alert("Sign In clicked");
  };

  return (
    <>
      <div className="navbar bg-white flex items-center justify-between">
        <div className="flex-1 px-3">
          <a className="text-green-950 text-xl">Voktar Odhikar</a>
        </div>
        <div className="flex-none">
          <button className="btn btn-outline text-l" onClick={signIn}>
            Sign-in
          </button>
        </div>
      </div>
    </>
  );
}
