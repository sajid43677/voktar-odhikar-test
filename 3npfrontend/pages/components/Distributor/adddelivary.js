import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useAuth } from "@/pages/utils/authcontext";
import { useEffect } from "react";

export default function AddDelivary() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      product_name: "",
      delivered_quantity: 0,
    },

    mode: "all",
  });
  const { register, handleSubmit, formState, reset, setValue } = form;
  const { errors } = formState;
  const [errch, seterrch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [updated, setupdated] = useState(false);
  const [isErr, setisErr] = useState(false);

  const { login } = useAuth();
  const onSubmit = async (data) => {
    const delpro = {
      product_name: data.product_name,
      delivered_quantity: parseInt(data.delivered_quantity, 10),
    };

    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_End + "distributor/delivaryproduct",
        delpro,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.status >= 200 && res.status < 300) {
        // Replace "/dashboard" with the actual URL
        setupdated(true);
        reset();
      }
    } catch (error) {
      console.log(error);
      //alert("Wrong Email or Password");

      seterrch(
        error.hasOwnProperty("response")
          ? Array.isArray(error.response.data.message)
            ? error.response.data.message[0]
            : error.response.data.message
          : error.message
      );
      setisErr(true);
      console.log(errch);
      // Handle other errors (e.g., network issues, server errors)
      // You can show an error message, handle it in some way, etc.
    }
  };

  const [redlisted, setredlisted] = useState({});
  const [redlistedR, setredlistedR] = useState({});
  const [isProfile, setIsProfile] = useState(false);
  const [isProfiler, setIsProfiler] = useState(false);
  const fetchPro = async () => {
    try {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_API_End + "distributor/viewinventory/",
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
  };
  const [isToggleChecked, setIsToggleChecked] = useState(false);
  useEffect(() => {
    fetchPro();
    // Run the fetchPro function when the component mounts
  }, []);

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="flex justify-between">
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* <div>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-lg">Whom to report</span>
                  </div>
                  <input
                    className={`input input-bordered w-full max-w-xs bg-inherit input-sm ${
                      errors.receiver?.message ? "input-warning" : ""
                    }`}
                    placeholder="Type here"
                    type="text"
                    id="receiver"
                    {...register("receiver", {
                      validate: {
                        notEmpty: (fd) => {
                          return fd !== "" || "Field Cannot Be empty";
                        },
                      },
                    })}
                  />
                  <div className="label">
                    <span className="label-text-alt">
                      {errors.receiver?.message}
                    </span>
                  </div>
                </label>
              </div> */}
              <div>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-lg ">Select Product</span>
                  </div>
                  <select
                    className={`input input-bordered w-full max-w-xs bg-inherit input-sm ${
                      errors.product_name?.message ? "select-warning" : ""
                    }`}
                    name="product_name"
                    id="product_name"
                    {...register("product_name", {
                      validate: {
                        notEmpty: (fd) => {
                          setSelectedProduct(fd);
                          return fd !== "Select Product" || "Select product";
                        },
                        notEmpty2: (fd) => {
                          return fd !== "" || "Select product";
                        },
                      },
                    })}
                  >
                    <option disabled selected>
                      Select Product
                    </option>

                    {isProfile &&
                      redlisted &&
                      redlisted.map((content, index) => (
                        <option value={content.product_name}>
                          {content.product_name}
                        </option>
                      ))}
                  </select>
                  <div className="label">
                    <span className="label-text-alt">
                      {errors.product_name?.message}
                    </span>
                  </div>
                </label>
              </div>
              <div>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-lg">
                      Delivered Quantity
                    </span>
                  </div>
                  <input
                    className={`input input-bordered w-full max-w-xs bg-inherit input-lg ${
                      errors.delivered_quantity?.message ? "input-warning" : ""
                    }`}
                    placeholder="Type here"
                    type="number"
                    id="delivered_quantity"
                    {...register("delivered_quantity", {
                      validate: {
                        notEmpty: (fd) => {
                          return fd !== "" || "Field Cannot Be empty";
                        },
                        quantity: (fd) => {
                          const currq = parseInt(fd, 10);
                          var maxq = 0;
                          redlisted.forEach((product) => {
                            if (product.product_name === selectedProduct) {
                              maxq = product.product_quantity;
                            }
                          });
                          return fd <= maxq || "Quantity not available";
                        },
                      },
                    })}
                  />
                  <div className="label">
                    <span className="label-text-alt">
                      {errors.delivered_quantity?.message || errch}
                    </span>
                  </div>
                </label>
              </div>

              <div>
                <button className="btn btn-outline mx-auto w-full">
                  Add Delivered
                </button>
              </div>
              <div>
                {updated && (
                  <a className="text-sm  text-green-600">Delivered Added</a>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
