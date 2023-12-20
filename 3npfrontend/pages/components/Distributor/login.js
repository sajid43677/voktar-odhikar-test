import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useAuth } from "@/pages/utils/authcontext";

export default function Login() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      Email: "",
      Password: "",
    },

    mode: "all",
  });
  const { register, handleSubmit, formState, reset, setValue } = form;
  const { errors } = formState;
  const [errch, seterrch] = useState("");
  const [isErr, setisErr] = useState(false);
  const { login } = useAuth();
  const onSubmit = async (data) => {
    console.log("Form submitted", data);
    const userData = {
      email: data.Email,
      password: data.Password,
    };

    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_End + "distributor/login/",
        userData,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
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
        console.log("cookie: " + document.cookie);
        login(
          res.data.name,
          userData.password,
          userData.email,
          document.cookie
        );
        router.push({
          pathname: "../Distributor/distributor",
        }); // Replace "/dashboard" with the actual URL
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
      reset();
      // Handle other errors (e.g., network issues, server errors)
      // You can show an error message, handle it in some way, etc.
    }
  };
  return (
    <>
      <div className="">
        <h2 className="text-xl font-semibold mb-6 text-center text-slate-900">
          Login
        </h2>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-lg text-slate-900">
                    Email
                  </span>
                </div>
                <input
                  className={`input input-bordered w-full max-w-xs bg-inherit input-sm ${
                    errors.Email?.message ? "input-warning" : ""
                  }`}
                  placeholder="Type here"
                  type="text"
                  id="Email"
                  {...register("Email", {
                    validate: {
                      notEmpty: (fd) => {
                        return fd !== "" || "Field Cannot Be empty";
                      },
                      notDefault: (fd) => {
                        return (
                          fd !== "john@email.com" ||
                          "Default email cannot be used"
                        );
                      },
                      emailPattarn: (fd) => {
                        return (
                          /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(fd) ||
                          "Invalid email"
                        );
                      },
                    },
                  })}
                />
                <div className="label">
                  <span className="label-text-alt">
                    {errors.Email?.message}
                  </span>
                </div>
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-lg text-slate-900">
                    Password
                  </span>
                </div>
                <input
                  className={`input input-bordered w-full max-w-xs bg-inherit input-sm ${
                    errors.Password?.message ? "input-warning" : ""
                  }`}
                  placeholder="Type here"
                  type="password"
                  id="Password"
                  {...register("Password", {
                    validate: {
                      notEmpty: (fd) => {
                        return fd !== "" || "Field Cannot Be empty";
                      },
                    },
                  })}
                />
                <div className="label">
                  <span className="label-text-alt">
                    {errors.Password?.message || (isErr && errch)}
                  </span>
                </div>
              </label>
            </div>
            <div>
              <button className="btn btn-outline mx-auto w-full">Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
