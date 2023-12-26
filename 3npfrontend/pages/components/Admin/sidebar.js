import React from "react";
import Products from "../Distributor/products";

import AllIndustryName from "./allindustryname";
import AllDistributorName from "./alldistributorname";
import RedListedDistributor from "./redlisteddistributor"
import RedListedIndustry from "./redlistedindustry"
import Profile from "./profile";
import SentNoticeOrReport from "./SentNoticeOrReport"
import VerifyOwnProfile from "./VerifyOwnProfile"
import AllAdmin from "./alladmin";

import { useState } from "react";
 
export default function Sidebar(props) {
  const [selectedIndex, setIndex] = useState(-1);
  const listselect = (fd, idx) => {
    if(selectedIndex==idx)
    {
      setIndex(-1);
    }
    else
    {
      setIndex(idx);
    }
    console.log(fd);
  };
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Page content here */}
          {selectedIndex === 0 && <AllAdmin />}
          {selectedIndex === 2 && <AllIndustryName />}
          {selectedIndex === 3 && <AllDistributorName />}
          {selectedIndex === 8 && <Profile />}
          {selectedIndex === 5 && <RedListedDistributor />}
          {selectedIndex === 6 && <RedListedIndustry />}
          {selectedIndex === 1 && <SentNoticeOrReport />}
          {selectedIndex === 4 && <VerifyOwnProfile />}
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
                <h4 className="font-semibold">John Doe</h4>
                <span className="text-xs text-gray-600">johndoe@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}