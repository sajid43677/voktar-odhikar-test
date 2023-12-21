import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "@/pages/utils/authcontext";

export default function Profile(props) {
  const [isProfile, setisProfile] = useState(false);
  const [Profile, setProfile] = useState();
  const { user, homego } = useAuth();
  const fetchPro = async () => {
    if (user == null) {
      homego();
    }
    const userData = {
      email: user.email,
      password: user.password,
    };
    console.log(userData);
    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_End + "distributor/login/",
        userData,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
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
        setisProfile(true);
        setProfile(res.data);
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

  return (
    <>
      <div>
        {isProfile && (
          <ul className="list-decimal justify-center items-center">
            <li>Username: {Profile.name}</li>
            <li>Email: {Profile.email}</li>
            <li>License: {Profile.license_number}</li>
            <li>Region: {Profile.region}</li>
            <li>Role: {Profile.role}</li>
          </ul>
        )}
      </div>
    </>
  );
}
