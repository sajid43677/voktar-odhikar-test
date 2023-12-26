import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useAuth } from "@/pages/utils/Distributor/authcontext";
import { useEffect } from "react";

export default function ReportAdmin() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      receiver: "",
      reportornotice: "",
      type: "",
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
    const report = {
      receiver: data.receiver,
      reportornotice: data.reportornotice,
      type: data.type,
    };

    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_End + "distributor/reportadmin",
        report,
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
        process.env.NEXT_PUBLIC_API_End + "distributor/viewiAdminlist/",
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
        process.env.NEXT_PUBLIC_API_End + "distributor/viewiAdminlistReg/",
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
                    <span className="label-text text-lg ">
                      Whom to send report
                    </span>
                  </div>
                  <select
                    className={`input input-bordered w-full max-w-xs bg-inherit input-sm ${
                      errors.receiver?.message ? "select-warning" : ""
                    }`}
                    name="receiver"
                    id="receiver"
                    {...register("receiver", {
                      validate: {
                        notEmpty: (fd) => {
                          return fd !== "Select Reciever" || "Select reciever";
                        },
                        notEmpty2: (fd) => {
                          return fd !== "" || "Select reciever";
                        },
                      },
                    })}
                  >
                    <option disabled selected>
                      Select Reciever
                    </option>

                    {!isToggleChecked &&
                      isProfile &&
                      redlisted &&
                      redlisted.map((content, index) => (
                        <option value={content.name}>{content.name}</option>
                      ))}
                  </select>
                  <div className="label">
                    <span className="label-text-alt">
                      {errors.receiver?.message}
                    </span>
                  </div>
                </label>
              </div>
              <div>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-lg">Reason</span>
                  </div>
                  <input
                    className={`input input-bordered w-full max-w-xs bg-inherit input-lg ${
                      errors.reportornotice?.message ? "input-warning" : ""
                    }`}
                    placeholder="Type here"
                    type="text"
                    id="reportornotice"
                    {...register("reportornotice", {
                      validate: {
                        notEmpty: (fd) => {
                          return fd !== "" || "Field Cannot Be empty";
                        },
                      },
                    })}
                  />
                  <div className="label">
                    <span className="label-text-alt">
                      {errors.reportornotice?.message}
                    </span>
                  </div>
                </label>
              </div>
              <div>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-lg ">Report Type</span>
                  </div>
                  <select
                    className={`input input-bordered w-full max-w-xs bg-inherit input-sm ${
                      errors.type?.message ? "select-warning" : ""
                    }`}
                    name="type"
                    id="type"
                    {...register("type", {
                      validate: {
                        notEmpty: (fd) => {
                          return (
                            fd !== "Select Your type" || "Select a report type"
                          );
                        },
                        notEmpty2: (fd) => {
                          return fd !== "" || "Select a type";
                        },
                      },
                    })}
                  >
                    <option disabled selected>
                      Select Your type
                    </option>
                    <option value="Report">Report</option>
                    <option value="Notice">Notice</option>
                  </select>
                  <div className="label">
                    <span className="label-text-alt">
                      {errors.type?.message}
                    </span>
                  </div>
                </label>
              </div>
              <div>
                <button className="btn btn-outline mx-auto w-full">
                  Send Report
                </button>
              </div>
              <div>
                {updated && (
                  <a className="text-sm  text-green-600">Report Send</a>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
