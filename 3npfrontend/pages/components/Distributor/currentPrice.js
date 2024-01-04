import React from "react";

import { useState } from "react";

import { useEffect } from "react";

import { useAuth } from "@/pages/utils/Distributor/authcontext";
import { useRouter } from "next/router";

import VegandFruit from "./vegandfruit";
import FishAndMeat from "./meatandfish";

export default function Sidebar(props) {
  const [selectedIndex, setIndex] = useState(-1);
  const [isProfile, setisProfile] = useState(false);
  const [Profiles, setProfile] = useState();
  const { user } = useAuth();
  const router = useRouter();
  const fetchPro = async () => {
    if (user == null) {
      router.push("../signin");
    }
    // try {
    //   const res = await axios.post(
    //     process.env.NEXT_PUBLIC_API_End + "distributor/login/",
    //     userData
    //   );

    //   console.log(res);

    //   //Check if the response status is successful (e.g., HTTP status code 200)
    //   if (res.status >= 200 && res.status < 300) {
    //     // You may want to store the authentication token or user information
    //     // in the state or context
    //     // For example:
    //     // localStorage.setItem("token", res.data.token);
    //     console.log(res);
    //     setisProfile(true);
    //     setProfile(res.data);
    //     console.log(Profiles);
    //     // Redirect the user to the appropriate page
    //   }
    // } catch (error) {
    //   console.log(error);

    //   // Handle other errors (e.g., network issues, server errors)
    //   // You can show an error message, handle it in some way, etc.
    // }
  };
  useEffect(() => {
    fetchPro();
    // Run the fetchPro function when the component mounts
  }, []);
  const listinfos = ["Vegitable and Fruits", "Fish and Meat"];

  const listselect = (fd, idx) => {
    if (selectedIndex === idx) setIndex(-1);
    else setIndex(idx);
    console.log(fd);
  };
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Page content here */}
          {selectedIndex === 0 && <VegandFruit />}
          {selectedIndex === 1 && <FishAndMeat />}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-max  bg-base-200 text-base-content">
            {/* Sidebar content here */}
            {/* <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li> */}
            {listinfos.map((content, index) => (
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
        </div>
      </div>
    </>
  );
}
