import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useAuth } from "@/pages/utils/authcontext";

export default function EditProduct(props) {
  console.log(props.product);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      product_name: props.product.product_name,
      product_quantity: props.product.product_quantity,
      product_price: props.product.distributor_price,
    },

    mode: "all",
  });
  const { register, handleSubmit, formState, reset, setValue } = form;
  const { errors } = formState;
  const [errch, seterrch] = useState("");
  const [isErr, setisErr] = useState(false);
  const { login } = useAuth();
  const onSubmit = async (data) => {};
  return (
    <>
      <div className="">
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
                  type="text"
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
                    {errors.product_quantity?.message || (isErr && errch)}
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
                  type="text"
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
                    {errors.product_price?.message || (isErr && errch)}
                  </span>
                </div>
              </label>
            </div>
            <div>
              <button className="btn btn-outline btn-xs">Update</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
