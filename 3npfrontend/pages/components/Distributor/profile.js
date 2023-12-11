import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function Profile(props) {
  const [isProfile, setisProfile] = useState(false);
  const [Profile, setProfile] = useState();
  const fetchPro = async () => {
    const userData = {
      email: props.email,
      password: props.password,
    };
    console.log(userData);
    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_End + "distributor/login/",
        userData
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
      alert("Wrong Email or Password");
      // Handle other errors (e.g., network issues, server errors)
      // You can show an error message, handle it in some way, etc.
    }
  };
  useEffect(() => {
    // Run the fetchPro function when the component mounts
    fetchPro();
    console.log(props);
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
