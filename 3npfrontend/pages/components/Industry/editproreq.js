import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useAuth } from "./useauth";

export default function EditProReq(props) {
  console.log(props.product);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      product_name: props.product.product_name,
      delivered_quantity: props.product.delivered_quantity,
      requested_quantity: props.product.requested_quantity,
    },

    mode: "all",
  });
  const { register, handleSubmit, formState, reset, setValue } = form;
  const { errors } = formState;
  const [errch, seterrch] = useState("");
  const [updated, setupdated] = useState(false);
  const [isErr, setisErr] = useState(false);

  const { login } = useAuth();
  const onSubmit = async (data) => {
    const delQuan = {
      product_name: data.product_name,
      delivered_quantity: parseInt(data.delivered_quantity, 10),
    };
    const reqQuan = {
      product_name: data.product_name,
      requested_quantity: parseInt(data.requested_quantity, 10),
    };

    console.log(delQuan);
    console.log(reqQuan);

    try {
      const res = await axios.patch(
        process.env.NEXT_PUBLIC_API_End + "industry/updatereqproduct",
        reqQuan,
        {
       //   headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.status >= 200 && res.status < 300) {
        // Replace "/dashboard" with the actual URL
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

    try {
      const res = await axios.patch(
        process.env.NEXT_PUBLIC_API_End + "industry/updatedelproduct",
        delQuan,
        {
    //      headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.status >= 200 && res.status < 300) {
        // Replace "/dashboard" with the actual URL
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
    if (isErr === false) setupdated(true);
  };
  const dltProduct = async () => {
    try {
      const res = await axios.delete(
        process.env.NEXT_PUBLIC_API_End +
          `industry/deletereq?product_name=${props.product.product_name}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.status >= 200 && res.status < 300) {
        // Replace "/dashboard" with the actual URL
        router.push("../Industry/industry");
      }
    } catch (error) {
      console.log(error);
      //alert("Wrong Email or Password");

      // Handle other errors (e.g., network issues, server errors)
      // You can show an error message, handle it in some way, etc.
    }
  };
  return (
    <>
      <div className="flex justify-between">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-lg">Product Name</span>
                </div>
                <input
                  className={`input input-bordered w-full max-w-xs bg-inherit input-sm ${
                    errors.product_name?.message ? "input-warning" : ""
                  }`}
                  placeholder="Type here"
                  type="text"
                  id="product_name"
                  {...register("product_name", {
                    validate: {
                      notEmpty: (fd) => {
                        return fd !== "" || "Field Cannot Be empty";
                      },
                    },
                  })}
                />
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
                  <span className="label-text text-lg">Requested Quantity</span>
                </div>
                <input
                  className={`input input-bordered w-full max-w-xs bg-inherit input-sm ${
                    errors.requested_quantity?.message ? "input-warning" : ""
                  }`}
                  placeholder="Type here"
                  type="number"
                  id="product_quantity"
                  {...register("requested_quantity", {
                    validate: {
                      notEmpty: (fd) => {
                        return fd !== "" || "Field Cannot Be empty";
                      },
                    },
                  })}
                />
                <div className="label">
                  <span className="label-text-alt">
                    {errors.requested_quantity?.message}
                  </span>
                </div>
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-lg">Delivered Quantity</span>
                </div>
                <input
                  className={`input input-bordered w-full max-w-xs bg-inherit input-sm ${
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
                    },
                  })}
                />
                <div className="label">
                  <span className="label-text-alt">
                    {errors.delivered_quantity?.message || (isErr && errch)}
                  </span>
                </div>
              </label>
            </div>
            <div>
              <button className="btn btn-outline btn-xs">Update</button>
            </div>
            <div>
              {updated && (
                <a className="text-sm  text-green-600">Product Data Updated</a>
              )}
            </div>
          </form>
        </div>
        <div className="flex items-end">
          <button
            className="btn btn-sm btn-outline btn-warning ml-50"
            onClick={dltProduct}
          >
            Delete Request
          </button>
        </div>
      </div>
    </>
  );
}