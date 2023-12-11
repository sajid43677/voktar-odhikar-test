import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function Products() {
  const headerColumns = ["", "Product", "Price", "Quantity Stored", ""];
  const [products, setProducts] = useState({});
  const [isProfile, setIsProfile] = useState(false);
  const fetchPro = async () => {
    try {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_API_End + "distributor/viewinventory/"
      );

      console.log(res);

      //Check if the response status is successful (e.g., HTTP status code 200)
      if (res.status >= 200 && res.status < 300) {
        // You may want to store the authentication token or user information
        // in the state or context
        // For example:
        // localStorage.setItem("token", res.data.token);
        console.log(res.data);
        setProducts(res.data);
        console.log(products);
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
                products.map((content, index) => (
                  <tr>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-bold">
                            {content.product_name}
                          </div>
                          <div className="text-sm opacity-50">
                            {content.distributor_name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {content.distributor_price}
                      <br />
                    </td>
                    <td>{content.product_quantity}</td>
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
