import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useAuth } from "@/pages/utils/authcontext";

export default function RedListtheIndustry(props) {
  console.log(props.Industry);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: props.Industry.name,
      reason: '',
      role: 'Industry',
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
    const { name } = form.getValues();
    const reason = {
      name: name,
      reason: data.reason,
      role:'Industry'
    };

    console.log(reason);

    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_End + "admin/rediststheindustryanddistributor",
        reason,
        {
          headers: { "Content-Type": "application/json" },
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
  return (
    <>
      <div className="">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-lg">Reason</span>
                </div>
                <input
                  className={`input input-bordered w-full max-w-xs bg-inherit input-sm ${
                    errors.reason?.message ? "input-warning" : ""
                  }`}
                  placeholder="Type here"
                  type="text"
                  id="reason"
                  {...register("reason", {
                    validate: {
                      notEmpty: (fd) => {
                        return fd !== "" || "Field Cannot Be empty";
                      },
                    },
                  })}
                />
                <div className="label">
                  <span className="label-text-alt">
                    {errors.reason?.message || (isErr && errch)}
                  </span>
                </div>
              </label>
            </div>
            <div>
              <button className="btn btn-outline btn-xs">RedList</button>
            </div>
            <div>
              {updated && (
                <a className="text-sm  text-green-600">Industry Added to RedList</a>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}