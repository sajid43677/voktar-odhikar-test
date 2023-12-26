import React from "react";
import Products from "./products";
import Profiles from "./profiles";
import Redlisted from "./redlisted";
import ProductReq from "./productreq";
import Fileup from "./fileupload";
import SentNoticeOrReport from "./reportandnotice";
import AllIndustryName from "./allIndustry";
import AllDistributorName from "./allDistributors";
import AllAdminName from "./allAdmin";
import { useState } from "react";
import Myprofile from "./myprofile";

export default function Sidebar(props) {
  const [selectedIndex, setIndex] = useState(-1);
  const listselect = (fd, idx) => {
    
    if(selectedIndex==idx)
    {
      setIndex(-1);
    }
    else
    {setIndex(idx);}
    console.log(fd);
  };
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Page content here */}
          {selectedIndex === 0 && <AllIndustryName />}
          {selectedIndex === 1 && <AllDistributorName />}
          {selectedIndex === 2 && <AllAdminName />}
          {selectedIndex === 3 && <Products />}
          {selectedIndex === 4 && <Fileup />}
          {selectedIndex === 5 && <ProductReq />}
          {selectedIndex === 6 && <Redlisted />}
          {selectedIndex === 7 && <SentNoticeOrReport />}
          {selectedIndex === 8 && <Myprofile />}
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