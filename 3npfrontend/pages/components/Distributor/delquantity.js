import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function Delquant() {
  const headerColumns = [
    "",
    "Distributor Name",
    "Product Name",
    "Delivered Quantity",
    "",
  ];
  const [redlisted, setredlisted] = useState({});
  const [isProfile, setIsProfile] = useState(false);
  const fetchPro = async () => {
    try {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_API_End + "distributor/deliveredquantity/"
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
      alert("Wrong Email or Password");
      // Handle other errors (e.g., network issues, server errors)
      // You can show an error message, handle it in some way, etc.
    }
  };
  useEffect(() => {
    // Run the fetchPro function when the component mounts
    fetchPro();
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
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {isProfile &&
                redlisted.map((content, index) => (
                  <tr>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-bold">
                            {content.distributor_name}
                          </div>
                          <div className="text-sm opacity-50"></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {content.product_name}

                      <br />
                    </td>
                    <td>{content.delivered_quantity}</td>
                    <th>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </th>
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
