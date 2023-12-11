import React from "react";
import Products from "./products";
import { useState } from "react";
import Profile from "./profile";
import { useEffect } from "react";
import axios from "axios";
import RedlistedInd from "./redlisted";
import Delquant from "./delquantity";

export default function Sidebar(props) {
  const [selectedIndex, setIndex] = useState(-1);
  const [isProfile, setisProfile] = useState(false);
  const [Profiles, setProfile] = useState();
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
        console.log(Profiles);
        // Redirect the user to the appropriate page
      }
    } catch (error) {
      console.log(error);
      alert("Wrong Email or Password");
      // Handle other errors (e.g., network issues, server errors)
      // You can show an error message, handle it in some way, etc.
    }
  };
  useEffect(() => {
    // Run the fetchPro function when the component mounts
    console.log(props);
    fetchPro();
  }, []);

  console.log(props);
  const listselect = (fd, idx) => {
    setIndex(idx);
    console.log(fd);
  };
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Page content here */}
          {selectedIndex === 0 && (
            <Products email={props.email} password={props.password} />
          )}
          {selectedIndex === 5 && (
            <Profile email={props.email} password={props.password} />
          )}
          {selectedIndex === 1 && <RedlistedInd />}
          {selectedIndex === 2 && <Delquant />}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul
            style={{ height: "91vh" }}
            className="menu p-4 w-80  bg-base-200 text-base-content"
          >
            {/* Sidebar content here */}
            {/* <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li> */}
            {props.items.map((content, index) => (
              <div>
                <li
                  key={index}
                  style={{ fontSize: `${props.textSize}px` }}
                  className={`hover:bg-slate-700 rounded-md ${
                    selectedIndex === index ? "bg-slate-600" : ""
                  }`}
                  onClick={() => listselect(content, index)}
                >
                  <a>{content}</a>
                </li>
                <hr className="my-3" />
              </div>
            ))}
          </ul>
          <div className="border-t flex p-3">
            <div
              className={`
              flex justify-between items-center
               transition-all "w-52 ml-3" 
          `}
            >
              <div className="leading-4">
                <h4 className="font-semibold">{isProfile && Profiles.name}</h4>
                <span className="text-xs text-gray-600">{props.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
