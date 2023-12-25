import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/pages/utils/authcontext";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function UploadLisence() {
  const router = useRouter();
  const [isVerified, setisVerified] = useState(false);
  const { logout, user, homego } = useAuth();

  const form = useForm({
    defaultValues: {
      license: {},
    },
    mode: "all",
  });
  const { register, handleSubmit, formState, watch, reset } = form;
  const { errors, isDirty } = formState;

  const [errch, seterrch] = useState("");
  const [isErr, setisErr] = useState(false);
  console.log(user);
  const fetchPro = async () => {
    if (user == null) {
      homego();
    }
    try {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_API_End + "distributor/checkDisVerification/",
        {
          withCredentials: true,
        }
      );

      console.log(res);

      //Check if the response status is successful (e.g., HTTP status code 200)
      if (res.status >= 200 && res.status < 300) {
        // You may want to store the authentication token or user information
        // in the state or context
        // For example:
        // localStorage.setItem("token", res.data.token);
        console.log(res);
        if (res.data.verified == "Yes") setisVerified(true);

        // Redirect the user to the appropriate page
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

  const onSubmit = async (data) => {
    const userData = {
      file_location_name: data.license[0],
    };
    console.log("Form submitted", userData);

    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_End + "distributor/uplodlicensedis",
        userData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      console.log(res);

      // Check if the response status is successful (e.g., HTTP status code 200)
      if (res.status >= 200 && res.status < 300) {
        // You may want to store the authentication token or user information
        // in the state or context
        // For example:
        // localStorage.setItem("token", res.data.token);
        // Redirect the user to the appropriate page
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

  useEffect(() => {
    fetchPro();
    // Run the fetchPro function when the component mounts
  }, []);

  return (
    <>
      {isVerified && (
        <div className="toast toast-center toast-middle ">
          <div className="alert alert-info text-5xl">
            <span>You are already</span>
          </div>
          <div className="alert alert-success text-5xl">
            <span>verified</span>
          </div>
        </div>
      )}
      {!isVerified && (
        <div className="bg-base-500 flex items-center justify-center mt-4 mb-4">
          <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-lg">License</span>
                  </div>
                  <input
                    className="file-input file-input-bordered file-input-sm w-full max-w-xs bg-inherit"
                    type="file"
                    id="license"
                    {...register("license", {
                      required: "Select a file",
                      validate: {
                        validFileFormat: (fd) => {
                          return (
                            fd[0].type === "application/pdf" ||
                            "File must be pdf"
                          );
                        },
                      },
                    })}
                  />
                  <div className="label">
                    <span className="label-text-alt">
                      {errors.license?.message}
                    </span>
                  </div>
                </label>
              </div>
              <div>
                <button className="btn btn-outline mx-auto w-full">
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
