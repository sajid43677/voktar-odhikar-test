import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function SentNoticeOrReport() {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const onSubmit = async (data) => {
    console.log("Form submitted", data);
    const userData = {
      reportornotice: data.reason,
      receiver: data.receiver,
      type: data.type,
    };

    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_End + "admin/sendnoticeorreport/",
        userData,
        {
            //    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                withCredentials: true,
              }
      );

      if (res.status >= 200 && res.status <= 300) {
        console.log(res.data);
        alert("Notice/Report sent successfully!");
        // Redirect or perform any other actions after successful submission
        // router.push('');
      }
    } catch (error) {
      console.log(
        error.hasOwnProperty("response")
          ? error.response.data.message
          : error.message
      );
    }
  };

  return (
    <div>
            <h2 className="text-xl font-semibold mb-6 text-center text-white">
        Send Notice or Report
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
        <div className="form-control w-full max-w-md mb-4">
            <label className="label">
            <span className="label-text text-lg text-white">Reason</span>
            </label>
            <textarea
            className="textarea textarea-bordered w-full bg-inherit resize-none text-white"
            placeholder=""
            {...register("reason", { required: "This field is required" })}
            />
            <div className="label">
            <span className="label-text-alt text-red-600">
                {errors.reason?.message}
            </span>
            </div>
        </div>
        <div className="form-control w-full max-w-md mb-4">
            <label className="label">
            <span className="label-text text-lg text-white">Receiver</span>
            </label>
            <input
            className="input input-bordered w-full bg-inherit text-white"
            type="text"
            placeholder=""
            {...register("receiver", {
                required: "This field is required",
            })}
            />
            <div className="label">
            <span className="label-text-alt text-red-600">
                {errors.receiver?.message}
            </span>
            </div>
        </div>
        <div className="form-control w-full max-w-md mb-4">
            <label className="label">
            <span className="label-text text-lg text-white">Type</span>
            </label>
            <select
            className="select select-bordered w-full bg-inherit text-white"
            {...register("type", { required: "This field is required" })}
            >
            <option value="Notice">Notice</option>
            <option value="Report">Report</option>
            </select>
            <div className="label">
            <span className="label-text-alt text-red-600">
                {errors.type?.message}
            </span>
            </div>
        </div>
        <div className="mb-4">
            <button className="btn btn-outline w-full">Send</button>
        </div>
        </form>
    </div>
  );
}