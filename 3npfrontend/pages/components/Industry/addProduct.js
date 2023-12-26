import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useAuth } from "./useauth";

export default function AddProduct() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      product_name: "",
      product_quantity: "",
      product_price: "",
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
    const product = {
      product_name: data.product_name,
      product_quantity: parseInt(data.product_quantity, 10),
      industry_price: parseInt(data.product_price, 10),
    };

    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_End + "industry/addIndustryProduct",
        product,
        {
    //      headers: { "Content-Type": "application/json" },
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
                  <span className="label-text text-lg">Product Quantity</span>
                </div>
                <input
                  className={`input input-bordered w-full max-w-xs bg-inherit input-sm ${
                    errors.product_quantity?.message ? "input-warning" : ""
                  }`}
                  placeholder="Type here"
                  type="number"
                  id="product_quantity"
                  {...register("product_quantity", {
                    validate: {
                      notEmpty: (fd) => {
                        return fd !== "" || "Field Cannot Be empty";
                      },
                    },
                  })}
                />
                <div className="label">
                  <span className="label-text-alt">
                    {errors.product_quantity?.message}
                  </span>
                </div>
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-lg">Product Price</span>
                </div>
                <input
                  className={`input input-bordered w-full max-w-xs bg-inherit input-sm ${
                    errors.product_quantity?.message ? "input-warning" : ""
                  }`}
                  placeholder="Type here"
                  type="number"
                  id="product_price"
                  {...register("product_price", {
                    validate: {
                      notEmpty: (fd) => {
                        return fd !== "" || "Field Cannot Be empty";
                      },
                    },
                  })}
                />
                <div className="label">
                  <span className="label-text-alt">
                    {errors.industry_price_price?.message || (isErr && errch)}
                  </span>
                </div>
              </label>
            </div>
            <div>
              <button className="btn btn-outline btn-xs">Add Product</button>
            </div>
            <div>
              {updated && (
                <a className="text-sm  text-green-600">Product Added</a>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}