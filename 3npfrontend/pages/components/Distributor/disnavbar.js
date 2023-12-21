import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/pages/utils/authcontext";
import axios from "axios";
import { useEffect } from "react";
export default function DisNavbar() {
  const router = useRouter();
  const [isVerified, setisVerified] = useState(false);
  const { logout, user, homego } = useAuth();
  console.log(user);
  const fetchPro = async () => {
    if (user == null) {
      homego();
    }
    try {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_API_End + "distributor/checkDisVerification/",
        {
          withCredentials: true,
        }
      );

      console.log(res);

      //Check if the response status is successful (e.g., HTTP status code 200)
      if (res.status >= 200 && res.status < 300) {
        // You may want to store the authentication token or user information
        // in the state or context
        // For example:
        // localStorage.setItem("token", res.data.token);
        console.log(res);
        if (res.data.verified == "Yes") setisVerified(true);

        // Redirect the user to the appropriate page
      }
    } catch (error) {
      //console.log(error);
      console.log(
        error.hasOwnProperty("response")
          ? error.response.data.message
          : error.message
      );
      // Handle other errors (e.g., network issues, server errors)
      // You can show an error message, handle it in some way, etc.
    }
  };

  useEffect(() => {
    fetchPro();
    // Run the fetchPro function when the component mounts
  }, []);

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
          {isVerified && (
            <div className="badge badge-success badge-outline mr-1 badge-xs">
              verified
            </div>
          )}
          {!isVerified && (
            <div className="badge badge-warning badge-outline mr-1 badge-xs">
              Not verified
            </div>
          )}
          <a className="btn" onClick={signout}>
            Logout
          </a>
        </div>
      </div>
    </>
  );
}
