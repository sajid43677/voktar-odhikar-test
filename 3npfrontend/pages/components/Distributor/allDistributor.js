import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function ShowDis() {
  const headerColumns = ["", "Name", "Phone-number", "Region"];
  const [redlisted, setredlisted] = useState({});
  const [redlistedR, setredlistedR] = useState({});
  const [isProfile, setIsProfile] = useState(false);
  const [isProfiler, setIsProfiler] = useState(false);
  const fetchPro = async () => {
    try {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_API_End + "distributor/viewiDistributorlist/",
        { withCredentials: true }
      );

      console.log(res);

      //Check if the response status is successful (e.g., HTTP status code 200)
      if (res.status >= 200 && res.status < 300) {
        // You may want to store the authentication token or user information
        // in the state or context
        // For example:
        // localStorage.setItem("token", res.data.token);
        console.log(res.data);
        setredlisted(res.data);
        console.log(redlisted);
        setIsProfile(true);
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
    try {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_API_End +
          "distributor/viewiDistributorlistReg/",
        { withCredentials: true }
      );

      console.log(res);

      //Check if the response status is successful (e.g., HTTP status code 200)
      if (res.status >= 200 && res.status < 300) {
        // You may want to store the authentication token or user information
        // in the state or context
        // For example:
        // localStorage.setItem("token", res.data.token);
        console.log(res.data);
        setredlistedR(res.data);
        console.log(redlisted);
        setIsProfiler(true);
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
  const [isToggleChecked, setIsToggleChecked] = useState(false);
  useEffect(() => {
    fetchPro();
    // Run the fetchPro function when the component mounts
  }, []);
  return (
    <>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-xs table-pin-rows table-pin-cols">
            {/* head */}
            <thead>
              <tr>
                {headerColumns.map((column, index) => (
                  <th key={index} className="text-xl ">
                    {column}
                  </th>
                ))}
                <th>
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">My Region</span>
                      <input
                        type="checkbox"
                        className="toggle"
                        checked={isToggleChecked}
                        onChange={() => setIsToggleChecked(!isToggleChecked)}
                      />
                    </label>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {!isToggleChecked &&
                isProfile &&
                redlisted.map((content, index) => (
                  <tr>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-bold">{content.name}</div>
                          <div className="text-sm opacity-50"></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {content.phone_number}

                      <br />
                    </td>
                    <td>{content.region}</td>
                  </tr>
                ))}
              {/*region*/}
              {isToggleChecked &&
                isProfiler &&
                redlistedR.map((content, index) => (
                  <tr>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-bold">{content.name}</div>
                          <div className="text-sm opacity-50"></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {content.phone_number}

                      <br />
                    </td>
                    <td>{content.region}</td>
                  </tr>
                ))}
            </tbody>
            {/* foot */}
          </table>
        </div>
      </div>
    </>
  );
}
