import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import AddProduct from "./addProduct";

export default function Products() {
  const headerColumns = ["", "Product", "Price", "Quantity Stored"];
  const [products, setProducts] = useState({});
  const [isProfile, setIsProfile] = useState(false);
  const [Sdata, setSdata] = useState("");
  const [issearch, setissearch] = useState(false);

  const onSubmit = (data) => {
    console.log("Form submitted", data);
    setissearch(true);
    setSdata(data.SearchData);
  };

  const form = useForm({
    defaultValues: {
      SearchData: "",
    },

    mode: "all",
  });
  const { register, handleSubmit, formState, reset, setValue } = form;
  const { errors } = formState;
  const fetchPro = async () => {
    try {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_API_End + "industry/viewallindustryproduct/",
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
        setProducts(res.data);
        console.log(products);
        setIsProfile(true);
      }
    } catch (error) {
      console.log(
        error.hasOwnProperty("response")
          ? error.response.data.message
          : error.message
      );
      //alert("Wrong Email or Password");
      // Handle other errors (e.g., network issues, server errors)
      // You can show an error message, handle it in some way, etc.
    }
  };
  useEffect(() => {
    fetchPro();
    // Run the fetchPro function when the component mounts
  }, []);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isadd, setisadd] = useState(false);

  // ... (your existing functions)

  const see = (pro) => {
    console.log(pro);
    setSelectedProduct(pro);
  };

  const addPro = () => {
    setisadd(true);
  };
  return (
    <>
      <div>
        <div className="overflow-x-auto">
          {selectedProduct == null && !isadd && (
            <div class=" h-screen  w-full m-2">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div class="max-w-sm">
                  <div className="label">
                    <span className="label-text text-sm">Search Product</span>
                  </div>
                  <div class="flex space-x-4">
                    <div class="flex rounded-md overflow-hidden w-full">
                      <input
                        class="input input-bordered w-full max-w-xs bg-inherit input-sm"
                        {...register("SearchData")}
                      />
                      <button class="btn btn-outline mx-auto btn-sm">Go</button>
                    </div>
                  </div>
                  <div className="label">
                    <span className="label-text-alt">
                      {errors.SearchData?.message}
                    </span>
                  </div>
                </div>
              </form>
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
                      <button
                        className="btn btn-ghost "
                        onClick={() => addPro()}
                      >
                        Add Product
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {isProfile &&
                    products.map(
                      (content, index) =>
                        (!issearch ||
                          (typeof Sdata === "string" &&
                            content.product_name
                              .toLowerCase()
                              .includes(Sdata.toLowerCase())) ||
                          !Sdata) && (
                          <tr>
                            <th>{index + 1}</th>
                            <td>
                              <div className="flex items-center gap-3">
                                <div>
                                  <div className="font-bold">
                                    {content.product_name}
                                  </div>
                                  <div className="text-sm opacity-50">
                                    {content.industry_name}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              {content.industry_price}
                              <br />
                            </td>
                            <td>{content.product_quantity}</td>
                            {/* <th>
                              <button
                                className="btn btn-ghost btn-xs"
                                onClick={() => see(content)}
                              >
                                Update
                              </button>
                            </th> */}
                          </tr>
                        )
                    )}
                </tbody>
                {/* foot */}
              </table>
            </div>
          )}
          {/* {selectedProduct && (
            <div className="flex-grow bg-base-500 flex items-center justify-center mt-4 mb-4">
              <EditProduct product={selectedProduct}></EditProduct>
            </div>
          )} */}
          {isadd && (
            <div className="flex-grow bg-base-500 flex items-center justify-center mt-4 mb-4">
              <AddProduct></AddProduct>
            </div>
          )}
        </div>
      </div>
    </>
  );
}